import { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Directory, File, Paths } from 'expo-file-system'
import { MANIFEST_URL, packageState, type LocalPackage, type Manifest, type PackageMeta, type PackageState } from './packages'

const REGISTRY_KEY = 'ig_map_packages'
const TILES_DIR = 'tiles'

function tilesDir(): Directory {
  return new Directory(Paths.document, TILES_DIR)
}

export function packageFile(id: string): File {
  return new File(tilesDir(), `${id}.pmtiles`)
}

async function readRegistry(): Promise<Record<string, LocalPackage>> {
  try {
    const raw = await AsyncStorage.getItem(REGISTRY_KEY)
    return raw ? (JSON.parse(raw) as Record<string, LocalPackage>) : {}
  } catch {
    return {}
  }
}

async function writeRegistry(reg: Record<string, LocalPackage>): Promise<void> {
  try { await AsyncStorage.setItem(REGISTRY_KEY, JSON.stringify(reg)) } catch {}
}

export interface OfflinePackagesApi {
  manifest: Manifest | null
  local: Record<string, LocalPackage>
  progress: Record<string, number>
  error: string | null
  /** Повторная загрузка манифеста: при сбое сети экрану нужна кнопка, а не совет уйти и вернуться. */
  reload: () => void
  stateOf: (meta: PackageMeta) => PackageState
  readyIds: Set<string>
  download: (meta: PackageMeta) => Promise<void>
  remove: (meta: PackageMeta) => Promise<void>
}

/**
 * Скачивание и учёт офлайн-пакетов карты. Файлы лежат в документах приложения,
 * реестр — в AsyncStorage: так состояние переживает перезапуск, а сам файл не индексируется галереей.
 */
export function useOfflinePackages(): OfflinePackagesApi {
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [local, setLocal] = useState<Record<string, LocalPackage>>({})
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const reload = useCallback(() => {
    setError(null)
    setManifest(null)
    setAttempt((n) => n + 1)
  }, [])

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLocal(await readRegistry())
      try {
        const res = await fetch(MANIFEST_URL, { cache: 'no-store' })
        const json = (await res.json()) as Manifest
        if (alive) setManifest(json)
      } catch {
        if (alive) setError('manifest')
      }
    })()
    return () => { alive = false }
  }, [attempt])

  const download = useCallback(async (meta: PackageMeta) => {
    setError(null)
    setProgress((p) => ({ ...p, [meta.id]: 0 }))
    try {
      const dir = tilesDir()
      if (!dir.exists) dir.create({ intermediates: true })
      const target = packageFile(meta.id)
      if (target.exists) target.delete()

      const task = File.createDownloadTask(meta.url, target, {
        onProgress: ({ bytesWritten, totalBytes }) => {
          const total = totalBytes || meta.sizeBytes
          setProgress((p) => ({ ...p, [meta.id]: total ? bytesWritten / total : 0 }))
        },
      })
      await task.downloadAsync()

      const entry: LocalPackage = {
        id: meta.id,
        version: manifest?.version ?? 1,
        sizeBytes: target.size ?? meta.sizeBytes,
        savedAt: new Date().toISOString().slice(0, 10),
      }
      const next = { ...(await readRegistry()), [meta.id]: entry }
      await writeRegistry(next)
      setLocal(next)
    } catch {
      setError(meta.id)
    } finally {
      setProgress((p) => {
        const next = { ...p }
        delete next[meta.id]
        return next
      })
    }
  }, [manifest])

  const remove = useCallback(async (meta: PackageMeta) => {
    try {
      const f = packageFile(meta.id)
      if (f.exists) f.delete()
    } catch {}
    const reg = await readRegistry()
    delete reg[meta.id]
    await writeRegistry(reg)
    setLocal(reg)
  }, [])

  const stateOf = useCallback(
    (meta: PackageMeta) => packageState(meta, local[meta.id], manifest?.version ?? 1, progress[meta.id] != null),
    [local, manifest, progress],
  )

  const readyIds = new Set(
    Object.values(local)
      .filter((l) => l.version === (manifest?.version ?? l.version))
      .map((l) => l.id),
  )

  return { manifest, local, progress, error, reload, stateOf, readyIds, download, remove }
}

import type { Lang } from '../i18n/strings'

/** Манифест офлайн-пакетов карты, лежит рядом со сборками на нашем сервере. */
export const MANIFEST_URL = 'https://guide.getastrodaily.com/tiles/index.json'

export interface PackageMeta {
  id: string
  url: string
  sizeBytes: number
  sha256: string
  /** [minLng, minLat, maxLng, maxLat] */
  bbox: [number, number, number, number]
  maxZoom: number
  title: Record<Lang, string>
  subtitle: Record<Lang, string>
}

export interface Manifest {
  version: number
  source: string
  attribution: string
  packages: PackageMeta[]
}

/** Что приложение знает о пакете на устройстве. */
export interface LocalPackage {
  id: string
  version: number
  sizeBytes: number
  savedAt: string
}

export type PackageState = 'absent' | 'downloading' | 'ready' | 'outdated'

export function packageState(
  meta: PackageMeta,
  local: LocalPackage | undefined,
  manifestVersion: number,
  downloading: boolean,
): PackageState {
  if (downloading) return 'downloading'
  if (!local) return 'absent'
  return local.version === manifestVersion ? 'ready' : 'outdated'
}

/** Точка внутри охвата пакета. bbox задан как [minLng, minLat, maxLng, maxLat]. */
export function bboxContains(bbox: PackageMeta['bbox'], lat: number, lng: number): boolean {
  const [minLng, minLat, maxLng, maxLat] = bbox
  return lng >= minLng && lng <= maxLng && lat >= minLat && lat <= maxLat
}

/**
 * Какой из скачанных пакетов покрывает точку. Если подходит несколько — берём тот,
 * чей охват меньше: он детальнее для этого места.
 */
export function packageForPoint(
  packages: PackageMeta[],
  ready: Set<string>,
  lat: number,
  lng: number,
): PackageMeta | null {
  const area = (b: PackageMeta['bbox']) => Math.abs(b[2] - b[0]) * Math.abs(b[3] - b[1])
  const fits = packages.filter((p) => ready.has(p.id) && bboxContains(p.bbox, lat, lng))
  if (fits.length === 0) return null
  return fits.sort((a, b) => area(a.bbox) - area(b.bbox))[0]
}

export function formatSize(bytes: number, lang: Lang): string {
  const mb = bytes / (1024 * 1024)
  const value = mb >= 100 ? Math.round(mb) : Math.round(mb * 10) / 10
  if (lang === 'zh') return `${value} MB`
  return lang === 'en' ? `${value} MB` : `${value} МБ`
}

/** Доля загрузки 0..1 — защищена от нулевого и неизвестного размера. */
export function downloadProgress(written: number, total: number): number {
  if (!total || total <= 0) return 0
  return Math.min(1, Math.max(0, written / total))
}

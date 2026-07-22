import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { UI, LANGS, type Lang, type UiKey } from '../i18n/strings'
import type { ContentPack } from '../lib/contentTypes'
import { pickFreshPack } from '../lib/pickFreshPack'
import { fetchContentPack } from './api'
import { loadCachedPack, saveCachedPack, loadLang, saveLang } from './cache'

interface Ctx { pack: ContentPack | null; lang: Lang; setLang: (l: Lang) => void; t: (k: UiKey) => string; ready: boolean; offlineFirstRun: boolean }
const C = createContext<Ctx | null>(null)
export const useContent = (): Ctx => { const v = useContext(C); if (!v) throw new Error('useContent вне провайдера'); return v }

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [pack, setPack] = useState<ContentPack | null>(null)
  const [lang, setLangState] = useState<Lang>('ru')
  const [ready, setReady] = useState(false)
  const [offlineFirstRun, setOffline] = useState(false)

  useEffect(() => {
    (async () => {
      const [cached, savedLang] = await Promise.all([loadCachedPack(), loadLang()])
      if (savedLang && LANGS.includes(savedLang)) setLangState(savedLang)
      if (cached) setPack(cached)
      setReady(true)
      const fetched = await fetchContentPack()
      const fresh = pickFreshPack(cached, fetched)
      if (fresh) { setPack(fresh); if (fresh !== cached) await saveCachedPack(fresh) }
      else if (!cached) setOffline(true)
    })()
  }, [])

  const setLang = useCallback((l: Lang) => { setLangState(l); saveLang(l) }, [])
  const t = useCallback((k: UiKey) => UI[lang][k] ?? UI.ru[k] ?? k, [lang])
  return <C.Provider value={{ pack, lang, setLang, t, ready, offlineFirstRun }}>{children}</C.Provider>
}

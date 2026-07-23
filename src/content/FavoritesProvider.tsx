import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { favKey, toggle, isFav, type FavKind } from '../lib/favorites'
const KEY = 'ig_favs'
interface Ctx { favs: Set<string>; toggleFav: (k: FavKind, slug: string) => void; isFavorite: (k: FavKind, slug: string) => boolean; ready: boolean }
const C = createContext<Ctx | null>(null)
export const useFavorites = (): Ctx => { const v = useContext(C); if (!v) throw new Error('useFavorites вне провайдера'); return v }
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favs, setFavs] = useState<Set<string>>(new Set())
  const [ready, setReady] = useState(false)
  useEffect(() => { (async () => {
    try { const s = await AsyncStorage.getItem(KEY); if (s) setFavs(new Set(JSON.parse(s) as string[])) } catch {}
    setReady(true)
  })() }, [])
  const persist = useCallback((next: Set<string>) => { AsyncStorage.setItem(KEY, JSON.stringify([...next])).catch(() => {}) }, [])
  const toggleFav = useCallback((k: FavKind, slug: string) => {
    setFavs((prev) => { const next = toggle(prev, favKey(k, slug)); persist(next); return next })
  }, [persist])
  const isFavorite = useCallback((k: FavKind, slug: string) => isFav(favs, favKey(k, slug)), [favs])
  return <C.Provider value={{ favs, toggleFav, isFavorite, ready }}>{children}</C.Provider>
}

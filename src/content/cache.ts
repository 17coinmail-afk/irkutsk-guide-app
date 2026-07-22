import AsyncStorage from '@react-native-async-storage/async-storage'
import type { ContentPack } from '../lib/contentTypes'
import type { Lang } from '../i18n/strings'
const PACK = 'ig_pack_v1'; const LANG = 'ig_lang'
export async function loadCachedPack(): Promise<ContentPack | null> {
  try { const s = await AsyncStorage.getItem(PACK); return s ? JSON.parse(s) as ContentPack : null } catch { return null }
}
export async function saveCachedPack(p: ContentPack): Promise<void> {
  try { await AsyncStorage.setItem(PACK, JSON.stringify(p)) } catch {}
}
export async function loadLang(): Promise<Lang | null> {
  try { return (await AsyncStorage.getItem(LANG)) as Lang | null } catch { return null }
}
export async function saveLang(l: Lang): Promise<void> { try { await AsyncStorage.setItem(LANG, l) } catch {} }

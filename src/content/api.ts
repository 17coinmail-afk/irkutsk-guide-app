import type { ContentPack } from '../lib/contentTypes'
const BASE = 'https://irkutsk.getastrodaily.com'
export async function fetchContentPack(): Promise<ContentPack | null> {
  try {
    const res = await fetch(`${BASE}/api/content-pack`)
    if (!res.ok) return null
    const json = await res.json()
    if (typeof json?.version !== 'number' || !json?.data?.places) return null
    return json as ContentPack
  } catch { return null }
}

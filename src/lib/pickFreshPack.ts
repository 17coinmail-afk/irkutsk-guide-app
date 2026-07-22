import type { ContentPack } from './contentTypes'
export function pickFreshPack(cached: ContentPack | null, fetched: ContentPack | null): ContentPack | null {
  if (!cached) return fetched
  if (!fetched) return cached
  return fetched.version > cached.version ? fetched : cached
}

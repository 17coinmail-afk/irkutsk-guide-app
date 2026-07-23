export type FavKind = 'place' | 'route'
export const favKey = (kind: FavKind, slug: string): string => `${kind}:${slug}`
export function toggle(set: Set<string>, key: string): Set<string> {
  const next = new Set(set)
  if (next.has(key)) next.delete(key); else next.add(key)
  return next
}
export const isFav = (set: Set<string>, key: string): boolean => set.has(key)

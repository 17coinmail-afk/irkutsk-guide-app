const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/**
 * Uint8Array → base64 без Buffer и btoa: в RN их может не быть.
 * Через эту функцию проходит каждый байт офлайн-карты, поэтому она отдельная и покрыта тестами.
 */
export function toBase64(bytes: Uint8Array): string {
  let out = ''
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i]
    const b1 = bytes[i + 1]
    const b2 = bytes[i + 2]
    out += CHARS[b0 >> 2]
    out += CHARS[((b0 & 3) << 4) | ((b1 ?? 0) >> 4)]
    out += b1 === undefined ? '=' : CHARS[((b1 & 15) << 2) | ((b2 ?? 0) >> 6)]
    out += b2 === undefined ? '=' : CHARS[b2 & 63]
  }
  return out
}

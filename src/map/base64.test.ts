import { describe, it, expect } from 'vitest'
import { toBase64 } from './base64'

// Кодировка критична: через неё проходит каждый байт карты. Ошибка здесь = пустая карта.
describe('toBase64', () => {
  const enc = (s: string) => toBase64(new Uint8Array([...s].map((c) => c.charCodeAt(0))))

  it('кодирует как эталон', () => {
    expect(enc('Man')).toBe('TWFu')
    expect(enc('hello world')).toBe('aGVsbG8gd29ybGQ=')
  })
  it('добивает хвост знаками равенства', () => {
    expect(enc('a')).toBe('YQ==')
    expect(enc('ab')).toBe('YWI=')
    expect(enc('abc')).toBe('YWJj')
  })
  it('переживает нулевые и максимальные байты', () => {
    expect(toBase64(new Uint8Array([0, 0, 0]))).toBe('AAAA')
    expect(toBase64(new Uint8Array([255, 255, 255]))).toBe('////')
  })
  it('пустой вход — пустая строка', () => {
    expect(toBase64(new Uint8Array([]))).toBe('')
  })
  it('совпадает с Buffer на случайных данных', () => {
    const bytes = new Uint8Array(Array.from({ length: 300 }, (_, i) => (i * 37 + 11) % 256))
    expect(toBase64(bytes)).toBe(Buffer.from(bytes).toString('base64'))
  })
})

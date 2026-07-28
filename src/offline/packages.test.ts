import { describe, it, expect } from 'vitest'
import {
  packageState, bboxContains, packageForPoint, formatSize, downloadProgress,
  type PackageMeta,
} from './packages'

const core: PackageMeta = {
  id: 'core', url: 'https://x/core.pmtiles', sizeBytes: 54_266_787, sha256: 'a',
  bbox: [102.2, 51.3, 108.1, 53.7], maxZoom: 14,
  title: { ru: 'Ядро', en: 'Core', zh: '核心' },
  subtitle: { ru: '…', en: '…', zh: '…' },
}
const far: PackageMeta = {
  ...core, id: 'far', sizeBytes: 9_203_638, bbox: [107.5, 52.9, 110.3, 56.1],
}

describe('состояние пакета', () => {
  it('нет на устройстве', () => {
    expect(packageState(core, undefined, 1, false)).toBe('absent')
  })
  it('качается сейчас', () => {
    expect(packageState(core, undefined, 1, true)).toBe('downloading')
  })
  it('готов, если версия совпала с манифестом', () => {
    expect(packageState(core, { id: 'core', version: 1, sizeBytes: 1, savedAt: '' }, 1, false)).toBe('ready')
  })
  it('устарел, если на сервере новая версия карт', () => {
    expect(packageState(core, { id: 'core', version: 1, sizeBytes: 1, savedAt: '' }, 2, false)).toBe('outdated')
  })
})

describe('покрытие точки', () => {
  it('Иркутск попадает в ядро', () => {
    expect(bboxContains(core.bbox, 52.28, 104.28)).toBe(true)
  })
  it('Северобайкальск в ядро не попадает', () => {
    expect(bboxContains(core.bbox, 55.63, 109.33)).toBe(false)
    expect(bboxContains(far.bbox, 55.63, 109.33)).toBe(true)
  })
  it('берётся только скачанный пакет', () => {
    expect(packageForPoint([core, far], new Set(), 52.28, 104.28)).toBeNull()
    expect(packageForPoint([core, far], new Set(['core']), 52.28, 104.28)?.id).toBe('core')
  })
  it('при пересечении охватов выигрывает более узкий', () => {
    // Ольхон попадает в оба bbox; far меньше по площади
    const p = packageForPoint([core, far], new Set(['core', 'far']), 53.2, 107.6)
    expect(p?.id).toBe('far')
  })
  it('за пределами всех пакетов — null', () => {
    expect(packageForPoint([core, far], new Set(['core', 'far']), 55.75, 37.62)).toBeNull()
  })
})

describe('форматирование и прогресс', () => {
  it('размер в мегабайтах', () => {
    expect(formatSize(54_266_787, 'ru')).toBe('51.8 МБ')
    expect(formatSize(9_203_638, 'en')).toBe('8.8 MB')
  })
  it('прогресс зажат в 0..1', () => {
    expect(downloadProgress(0, 100)).toBe(0)
    expect(downloadProgress(50, 100)).toBe(0.5)
    expect(downloadProgress(200, 100)).toBe(1)
  })
  it('неизвестный размер не даёт NaN', () => {
    expect(downloadProgress(10, 0)).toBe(0)
  })
})

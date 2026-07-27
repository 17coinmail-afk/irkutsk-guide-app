import { describe, it, expect } from 'vitest'
import { staggerDelay, headerProgress, indicatorGeometry, DURATION, SPRING } from './motion'

describe('staggerDelay', () => {
  it('шаг 40 мс', () => {
    expect(staggerDelay(0)).toBe(0)
    expect(staggerDelay(3)).toBe(120)
  })
  it('потолок в шесть шагов — длинные списки не ждут', () => {
    expect(staggerDelay(99)).toBe(240)
  })
  it('отрицательный индекс не даёт отрицательную задержку', () => {
    expect(staggerDelay(-2)).toBe(0)
  })
  it('reduceMotion обнуляет каскад', () => {
    expect(staggerDelay(4, { reduceMotion: true })).toBe(0)
  })
})

describe('headerProgress', () => {
  it('зажимается в 0..1 и линеен внутри интервала', () => {
    expect(headerProgress(0, 60, 140)).toBe(0)
    expect(headerProgress(100, 60, 140)).toBeCloseTo(0.5, 5)
    expect(headerProgress(999, 60, 140)).toBe(1)
  })
  it('оттягивание вниз (отрицательный скролл) держит шапку скрытой', () => {
    expect(headerProgress(-120, 60, 140)).toBe(0)
  })
  it('вырожденный интервал не даёт NaN', () => {
    expect(headerProgress(80, 100, 100)).toBe(0)
    expect(headerProgress(120, 100, 100)).toBe(1)
  })
})

describe('indicatorGeometry', () => {
  it('складывает ширины предыдущих чипов и зазоры', () => {
    expect(indicatorGeometry([60, 80, 40], 8, 0)).toEqual({ x: 0, width: 60 })
    expect(indicatorGeometry([60, 80, 40], 8, 1)).toEqual({ x: 68, width: 80 })
    expect(indicatorGeometry([60, 80, 40], 8, 2)).toEqual({ x: 156, width: 40 })
  })
  it('индекс вне диапазона схлопывает индикатор', () => {
    expect(indicatorGeometry([60], 8, 5)).toEqual({ x: 0, width: 0 })
    expect(indicatorGeometry([60], 8, -1)).toEqual({ x: 0, width: 0 })
  })
  it('до измерения ширин индикатор нулевой', () => {
    expect(indicatorGeometry([], 8, 0)).toEqual({ x: 0, width: 0 })
  })
})

describe('константы', () => {
  it('длительности зафиксированы спекой', () => {
    expect(DURATION).toMatchObject({ press: 120, appear: 260, header: 220, kenBurns: 30000 })
  })
  it('все пружины на нативном драйвере', () => {
    for (const cfg of Object.values(SPRING)) expect(cfg.useNativeDriver).toBe(true)
  })
})

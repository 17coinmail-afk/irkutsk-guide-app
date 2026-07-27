/**
 * Разбивка остановок маршрута по дням: ContentPack хранит только длительность и список
 * остановок, поэтому дни считаем равномерно — по ceil(остановок / дней) на день.
 */
export function stopsPerDay(stopCount: number, days: number): number {
  if (stopCount <= 0 || days <= 0) return 0
  return Math.ceil(stopCount / days)
}

/** Номер дня (с единицы), к которому относится остановка с индексом `index`. */
export function dayOfStop(index: number, stopCount: number, days: number): number {
  const per = stopsPerDay(stopCount, days)
  if (per === 0) return 1
  return Math.min(days, Math.floor(index / per) + 1)
}

/** Нужен ли разделитель «День N» перед остановкой с этим индексом. */
export function isDayBreak(index: number, stopCount: number, days: number): boolean {
  if (days <= 1) return false
  if (index === 0) return true
  return dayOfStop(index, stopCount, days) !== dayOfStop(index - 1, stopCount, days)
}

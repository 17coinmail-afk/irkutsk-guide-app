import { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'

/** Отражает системную настройку «уменьшить движение». Пока не определено — считаем false (анимации ок). */
export function useReduceMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    let mounted = true
    AccessibilityInfo.isReduceMotionEnabled().then((v) => { if (mounted) setReduced(v) }).catch(() => {})
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (v) => setReduced(v))
    return () => { mounted = false; sub.remove() }
  }, [])
  return reduced
}

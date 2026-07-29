// Клиент AI-помощника. Разделяет исходы: ответ / «не настроен» (503) / ошибка.
import type { Lang } from '../i18n/strings'

const BASE = 'https://irkutsk.getastrodaily.com'

export interface ChatMsg { role: 'user' | 'assistant'; content: string }
export type AssistantResult =
  | { ok: true; reply: string }
  | { ok: false; kind: 'unconfigured' | 'error' }

/**
 * Работает ли помощник вообще. Спрашиваем при открытии экрана: раньше приложение
 * приглашало задать вопрос, а «скоро заработает» показывало уже после отправки —
 * пользователь набирал текст впустую.
 *
 * Сеть недоступна → считаем недоступным: без интернета помощник всё равно не ответит.
 */
export async function probeAssistant(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/assistant`, { method: 'GET' })
    if (!res.ok) return false
    const json = await res.json()
    return json?.available === true
  } catch {
    return false
  }
}

export async function sendAssistant(messages: ChatMsg[], lang: Lang): Promise<AssistantResult> {
  try {
    const res = await fetch(`${BASE}/api/assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang, messages }),
    })
    if (res.status === 503) return { ok: false, kind: 'unconfigured' }
    if (!res.ok) return { ok: false, kind: 'error' }
    const json = await res.json()
    if (typeof json?.reply !== 'string' || !json.reply.trim()) return { ok: false, kind: 'error' }
    return { ok: true, reply: json.reply.trim() }
  } catch {
    return { ok: false, kind: 'error' }
  }
}

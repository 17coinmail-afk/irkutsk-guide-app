import React, { useRef, useState } from 'react'
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useContent } from '../src/content/ContentProvider'
import { ScreenHeader } from '../src/components/ScreenHeader'
import { sendAssistant, type ChatMsg } from '../src/lib/assistantApi'
import { colors, space, font, fontFamily, radius, shadow } from '../src/theme/tokens'

interface Bubble { id: string; role: 'user' | 'assistant' | 'system'; text: string }

export default function Assistant() {
  const { t, lang } = useContent()
  const insets = useSafeAreaInsets()
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const listRef = useRef<FlatList>(null)
  const [msgs, setMsgs] = useState<Bubble[]>([{ id: 'intro', role: 'system', text: t('assistantIntro') }])

  const send = async () => {
    const text = input.trim()
    if (!text || busy) return
    const userBubble: Bubble = { id: `u${Date.now()}`, role: 'user', text }
    const next = [...msgs, userBubble]
    setMsgs(next)
    setInput('')
    setBusy(true)
    // История для API — только реальные реплики (без системного интро).
    const history: ChatMsg[] = next.filter((m) => m.role !== 'system').map((m) => ({ role: m.role as 'user' | 'assistant', content: m.text }))
    const res = await sendAssistant(history, lang)
    const reply: Bubble =
      res.ok
        ? { id: `a${Date.now()}`, role: 'assistant', text: res.reply }
        : { id: `a${Date.now()}`, role: 'system', text: res.kind === 'unconfigured' ? t('assistantUnconfigured') : t('assistantError') }
    setMsgs((m) => [...m, reply])
    setBusy(false)
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }))
  }

  return (
    <View style={s.wrap}>
      <ScreenHeader title={t('assistantTitle')} subtitle={t('assistantSub')} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={insets.top + 44}>
        <FlatList
          ref={listRef}
          data={msgs}
          keyExtractor={(m) => m.id}
          contentContainerStyle={s.list}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => {
            if (item.role === 'system') return <View style={s.sys}><Text style={s.sysTxt}>{item.text}</Text></View>
            const mine = item.role === 'user'
            return (
              <View style={[s.bubble, mine ? s.mine : s.theirs]}>
                <Text style={mine ? s.mineTxt : s.theirsTxt}>{item.text}</Text>
              </View>
            )
          }}
          ListFooterComponent={busy ? (
            <View style={s.thinking}><ActivityIndicator color={colors.turquoise} /><Text style={s.thinkingTxt}>{t('assistantThinking')}</Text></View>
          ) : null}
        />
        <View style={[s.inputBar, { paddingBottom: insets.bottom + space.sm }]}>
          <TextInput
            style={s.input}
            value={input}
            onChangeText={setInput}
            placeholder={t('assistantPlaceholder')}
            placeholderTextColor={colors.textDim}
            multiline
            onSubmitEditing={send}
          />
          <Pressable style={[s.sendBtn, (!input.trim() || busy) && s.sendDisabled]} onPress={send} disabled={!input.trim() || busy}>
            <Ionicons name="arrow-up" size={22} color={colors.bg} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  list: { padding: space.md, gap: space.sm },
  sys: { backgroundColor: colors.surfaceAlt, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: space.md, marginVertical: space.xs },
  sysTxt: { color: colors.textMuted, fontFamily: fontFamily.body, fontSize: font.scale.body, lineHeight: 21 },
  bubble: { maxWidth: '86%', paddingHorizontal: space.md, paddingVertical: space.sm, borderRadius: radius.lg },
  mine: { alignSelf: 'flex-end', backgroundColor: colors.turquoise, borderBottomRightRadius: radius.sm },
  theirs: { alignSelf: 'flex-start', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderBottomLeftRadius: radius.sm },
  mineTxt: { color: colors.bg, fontFamily: fontFamily.bodyMedium, fontSize: font.scale.bodyLg, lineHeight: 22 },
  theirsTxt: { color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, lineHeight: 22 },
  thinking: { flexDirection: 'row', alignItems: 'center', gap: space.sm, padding: space.md },
  thinkingTxt: { color: colors.textDim, fontFamily: fontFamily.body, fontSize: font.scale.small },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', gap: space.sm, paddingHorizontal: space.md, paddingTop: space.sm, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  input: { flex: 1, maxHeight: 120, color: colors.text, fontFamily: fontFamily.body, fontSize: font.scale.bodyLg, backgroundColor: colors.surfaceAlt, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: space.md, paddingVertical: space.sm },
  sendBtn: { width: 44, height: 44, borderRadius: radius.pill, backgroundColor: colors.turquoise, alignItems: 'center', justifyContent: 'center', ...shadow.glow },
  sendDisabled: { backgroundColor: colors.border, ...({ shadowOpacity: 0 } as object) },
})

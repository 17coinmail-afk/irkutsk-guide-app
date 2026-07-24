import React from 'react'
import { FlatList, StyleSheet, type ListRenderItemInfo } from 'react-native'
import { space } from '../theme/tokens'

const DEFAULT_ITEM_WIDTH = 224
const GAP = space.sm

export interface CarouselProps<T> {
  data: T[]
  keyExtractor: (item: T) => string
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement
  itemWidth?: number
}

/** Горизонтальная лента compact-карточек с приятным «прилипанием» к элементам. */
export function Carousel<T>({ data, keyExtractor, renderItem, itemWidth = DEFAULT_ITEM_WIDTH }: CarouselProps<T>) {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      snapToInterval={itemWidth + GAP}
      decelerationRate="fast"
      contentContainerStyle={s.content}
      initialNumToRender={4}
      windowSize={3}
    />
  )
}

const s = StyleSheet.create({
  content: { paddingHorizontal: space.md, gap: GAP },
})

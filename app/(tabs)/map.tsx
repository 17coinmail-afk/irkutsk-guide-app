import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps'
import { useRouter } from 'expo-router'
import { useContent } from '../../src/content/ContentProvider'
import { colors } from '../../src/theme/tokens'

export default function MapTab() {
  const { pack, lang } = useContent()
  const router = useRouter()
  const places = pack?.data.places ?? []
  return (
    <MapView provider={PROVIDER_DEFAULT} style={s.map}
      initialRegion={{ latitude: 52.6, longitude: 106.2, latitudeDelta: 3.5, longitudeDelta: 3.5 }}>
      {places.map((p) => (
        <Marker key={p.id} coordinate={{ latitude: p.lat, longitude: p.lng }}
          pinColor={p.section === 'city' ? colors.gold : colors.turquoise}
          title={p.translations[lang].title}
          description={p.cuisine ?? p.category}
          onCalloutPress={() => router.push(`/place/${p.slug}`)} />
      ))}
    </MapView>
  )
}
const s = StyleSheet.create({ map: { flex: 1, backgroundColor: colors.bg } })

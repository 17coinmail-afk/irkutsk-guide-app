import { LEAFLET_CSS, LEAFLET_JS, PMTILES_JS, PROTOMAPS_JS } from './vendor'
import type { MapPoint } from './leafletHtml'

/**
 * Карта, работающая без сети: библиотеки вшиты в страницу, тайлы читаются из скачанного
 * PMTiles-пакета через мост в приложение (WebView сам файл открыть не может).
 *
 * Протокол моста:
 *   страница → приложение: {"type":"pmtiles","id":N,"offset":N,"length":N}
 *   приложение → страница: window.__pmtilesRespond(id, base64)
 */
export function buildOfflineMapHtml(points: MapPoint[], opts: { line?: boolean } = {}): string {
  const pts = JSON.stringify(points)
  const line = opts.line ? 'true' : 'false'

  return `<!doctype html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<style>${LEAFLET_CSS}
  html,body,#map{margin:0;height:100%;background:#070c12}
  .mk{display:block;width:14px;height:14px;border-radius:50%;background:#3fd0c9;border:2px solid #07121a;box-shadow:0 0 0 2px rgba(63,208,201,.35)}
  .mk.city{background:#e2b857;box-shadow:0 0 0 2px rgba(226,184,87,.35)}
  .leaflet-container{background:#070c12}
  .leaflet-control-attribution{background:rgba(7,12,18,.7);color:#6b8290;font-size:9px}
</style></head><body><div id="map"></div>
<script>${LEAFLET_JS}</script>
<script>${PMTILES_JS}</script>
<script>${PROTOMAPS_JS}</script>
<script>
  var PTS = ${pts};

  // ── мост к файлу пакета ───────────────────────────────────────────────
  var pending = {};
  var nextId = 1;
  window.__pmtilesRespond = function (id, b64) {
    var p = pending[id];
    if (!p) return;
    delete pending[id];
    try {
      var bin = atob(b64);
      var arr = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      p.resolve({ data: arr.buffer });
    } catch (e) { p.reject(e); }
  };
  window.__pmtilesFail = function (id) {
    var p = pending[id];
    if (p) { delete pending[id]; p.reject(new Error('read failed')); }
  };

  var bridgeSource = {
    getKey: function () { return 'bridge://package'; },
    getBytes: function (offset, length) {
      return new Promise(function (resolve, reject) {
        var id = nextId++;
        pending[id] = { resolve: resolve, reject: reject };
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'pmtiles', id: id, offset: offset, length: length,
        }));
      });
    },
  };

  // ── карта ─────────────────────────────────────────────────────────────
  var map = L.map('map', { zoomControl: false, attributionControl: true });
  var archive = new pmtiles.PMTiles(bridgeSource);
  protomapsL.leafletLayer({ url: archive, flavor: 'dark', lang: 'ru' }).addTo(map);
  map.attributionControl.setPrefix('');
  map.attributionControl.addAttribution('© OpenStreetMap');

  var group = L.featureGroup();
  PTS.forEach(function (p) {
    var icon = L.divIcon({ className: 'mk-wrap', html: '<span class="mk' + (p.city ? ' city' : '') + '"></span>', iconSize: [18, 18], iconAnchor: [9, 9] });
    var m = L.marker([p.lat, p.lng], { icon: icon, title: p.title }).bindPopup('<b>' + p.title + '</b>');
    m.on('click', function () { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'place', slug: p.slug })); });
    group.addLayer(m);
  });
  group.addTo(map);

  if (${line} && PTS.length > 1) {
    L.polyline(PTS.map(function (p) { return [p.lat, p.lng]; }), { color: '#3fd0c9', weight: 3, opacity: .8 }).addTo(map);
  }

  if (PTS.length) map.fitBounds(group.getBounds(), { padding: [40, 40] });
  else map.setView([52.29, 104.30], 11);

  window.__locate = function (lat, lng) {
    map.flyTo([lat, lng], 14, { duration: 1 });
    L.circleMarker([lat, lng], { radius: 7, color: '#eaf2f5', fillColor: '#3fd0c9', fillOpacity: 1, weight: 2 }).addTo(map);
  };

  // сообщаем приложению, что карта поднялась
  setTimeout(function () {
    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ready' }));
  }, 600);
</script></body></html>`
}

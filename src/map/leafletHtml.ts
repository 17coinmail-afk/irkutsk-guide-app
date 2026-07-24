// Построитель HTML для карты в WebView: Leaflet + спутник Esri World Imagery
// (тот же подход, что на сайте-гиде). Клик по маркеру → postMessage(slug) в RN.
// LINE=true рисует линию по точкам (для экрана маршрута). window.__locate(lat,lng) —
// поставить «моё местоположение» и центрировать.

export interface MapPoint {
  lng: number
  lat: number
  slug: string
  title: string
  city: boolean // золотой маркер для города, бирюзовый для природы
}

export function buildMapHtml(points: MapPoint[], opts: { line?: boolean } = {}): string {
  const data = JSON.stringify(points)
  const line = opts.line ? 'true' : 'false'
  return `<!doctype html><html><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>
  html,body,#map{height:100%;margin:0;background:#0a0f16}
  .leaflet-container{background:#0a0f16}
  .leaflet-attribution-flag{display:none!important}
  .leaflet-control-attribution{font-size:10px;background:rgba(10,15,22,.7);color:#9fb3bd}
  .leaflet-control-attribution a{color:#3fd0c9}
</style>
</head><body><div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var PTS=${data}, LINE=${line};
  var map=L.map('map',{attributionControl:true,zoomControl:true});
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:18,attribution:'Esri, Maxar, Earthstar Geographics'}).addTo(map);
  var latlngs=[];
  PTS.forEach(function(p){
    var m=L.circleMarker([p.lat,p.lng],{radius:7,color:'#ffffff',weight:2,fillColor:p.city?'#e2b857':'#3fd0c9',fillOpacity:1});
    m.addTo(map); if(p.title){ m.bindTooltip(p.title,{direction:'top'}); }
    m.on('click',function(){ if(window.ReactNativeWebView){ window.ReactNativeWebView.postMessage(p.slug); } });
    latlngs.push([p.lat,p.lng]);
  });
  if(LINE && latlngs.length>1){ L.polyline(latlngs,{color:'#3fd0c9',weight:3,opacity:.9}).addTo(map); }
  if(latlngs.length===1){ map.setView(latlngs[0],11); }
  else if(latlngs.length>1){ map.fitBounds(latlngs,{padding:[34,34]}); }
  else { map.setView([52.6,106.2],5); }
  var meMarker=null;
  window.__locate=function(lat,lng){
    if(meMarker){ map.removeLayer(meMarker); }
    meMarker=L.circleMarker([lat,lng],{radius:8,color:'#ffffff',weight:3,fillColor:'#4fe0d8',fillOpacity:1}).addTo(map);
    map.setView([lat,lng],12);
  };
</script></body></html>`
}

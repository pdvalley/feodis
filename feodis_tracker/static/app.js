const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const markers = L.layerGroup().addTo(map);

async function loadEvents() {
  try {
    const res = await fetch('/events');
    if (!res.ok) return;
    const data = await res.json();
    markers.clearLayers();
    if (data.length === 0) return;
    const bounds = [];
    data.forEach(ev => {
      const m = L.marker([ev.lat, ev.lon]);
      m.bindPopup(`<b>${ev.id}</b><br>${ev.timestamp}<br>${JSON.stringify(ev.metadata||{})}`);
      markers.addLayer(m);
      bounds.push([ev.lat, ev.lon]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [20, 20] });
  } catch (err) {
    console.error('Failed to load events', err);
  }
}

loadEvents();
setInterval(loadEvents, 5000);

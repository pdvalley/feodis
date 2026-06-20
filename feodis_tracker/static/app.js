const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const markers = L.layerGroup().addTo(map);

const liveCheckbox = document.getElementById('live');
const rangeSelect = document.getElementById('range');
const refreshBtn = document.getElementById('refresh');
const statusEl = document.getElementById('status');

let polling = null;

function setStatus(text) {
  if (statusEl) statusEl.textContent = text;
}

function filterByRange(events) {
  const val = Number(rangeSelect.value);
  if (val === 0) return events;
  const cutoff = Date.now() - val * 60 * 1000;
  return events.filter(ev => {
    try {
      const t = new Date(ev.timestamp).getTime();
      return t >= cutoff;
    } catch (e) {
      return true;
    }
  });
}

async function loadEvents() {
  try {
    const res = await fetch('/events');
    if (!res.ok) return;
    const data = await res.json();
    const filtered = filterByRange(data);
    markers.clearLayers();
    if (filtered.length === 0) {
      setStatus('No events');
      return;
    }
    const bounds = [];
    filtered.forEach(ev => {
      const m = L.marker([ev.lat, ev.lon]);
      m.bindPopup(`<b>${ev.id}</b><br>${ev.timestamp}<br>${JSON.stringify(ev.metadata||{})}`);
      markers.addLayer(m);
      bounds.push([ev.lat, ev.lon]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [20, 20] });
    setStatus(`Showing ${filtered.length} events`);
  } catch (err) {
    console.error('Failed to load events', err);
    setStatus('Error loading events');
  }
}

function startPolling() {
  if (polling) return;
  polling = setInterval(loadEvents, 5000);
  setStatus('Live');
}

function stopPolling() {
  if (!polling) return;
  clearInterval(polling);
  polling = null;
  setStatus('Paused');
}

liveCheckbox.addEventListener('change', () => {
  if (liveCheckbox.checked) startPolling(); else stopPolling();
});

rangeSelect.addEventListener('change', () => {
  loadEvents();
});

refreshBtn.addEventListener('click', () => {
  loadEvents();
});

// initial load and start polling
loadEvents();
if (liveCheckbox.checked) startPolling();

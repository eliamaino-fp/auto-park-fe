import { buildAreas } from './areas'

const map = L.map('mapid').setView([48.8566, 2.3522], 11);
const locateMeBtn = document.querySelector('.locate-me')
const areasBtn = document.querySelector('.see-areas')
const directionBtn = document.querySelector('.get-dir')
const infoText = document.querySelector('.info-text')

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(map);

locateMeBtn.addEventListener('click', () => {
    const marker = L.marker([48.78, 2.3622]).addTo(map);
})

areasBtn.addEventListener('click', () => {
    buildAreas(map)
})

directionBtn.addEventListener('click', () => {
    infoText.innerHTML = 'The best route requires you to drop your car at the dropout number 3'
})

// disable drag and zoom handlers
// map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

const popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You want to go at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

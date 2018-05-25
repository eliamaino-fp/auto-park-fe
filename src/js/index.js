const mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(mymap);

const marker = L.marker([51.5, -0.09]).addTo(mymap);
const gcircle = L.circle([51.508, -0.11], {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);
const ocircle = L.circle([51.51, -0.13], {
    color: 'orange',
    fillColor: 'orange',
    fillOpacity: 0.5,
    radius: 700
}).addTo(mymap);
const rcircle = L.circle([51.507, -0.08], {
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 700
}).addTo(mymap);

// disable drag and zoom handlers
// mymap.dragging.disable();
mymap.touchZoom.disable();
mymap.doubleClickZoom.disable();
mymap.scrollWheelZoom.disable();

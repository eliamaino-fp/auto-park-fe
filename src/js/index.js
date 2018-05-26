import { displayAreas } from './areas'
import {
    getDirections,
    getDropoutNumber,
    setDestination
} from './directions'
import swal from 'sweetalert'

const map = L.map('mapid').setView([48.81, 2.3522], 12);
const locateMeBtn = document.querySelector('.locate-me')
const areasBtn = document.querySelector('.see-areas')
const directionBtn = document.querySelector('.get-dir')
const infoText = document.querySelector('.info-text')

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(map);

let isLocated = false;
locateMeBtn.addEventListener('click', () => {
    if (isLocated) {
        return;
    }
    const marker = L.marker([48.76, 2.3622]).addTo(map);
    isLocated = true;
})

areasBtn.addEventListener('click', () => {
    displayAreas(map);
})

directionBtn.addEventListener('click', () => {
  swal("Let's go!", `The best route requires you to drop your car at the dropout number ${getDropoutNumber()}`, "success");
})

map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

map.on('click', (e) => {
  getDirections(e, map, isLocated);
});

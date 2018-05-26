import { displayAreas } from './areas'
import swal from 'sweetalert'

let destination = null;
let directions = null;
let destLat = null;
let destLng = null;
let firstDirections = null;
let secondDirections = null;
let parkingDirections = null;
let parking = null;
let dropoutNumber = null;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function getDirections(e, map, isLocated) {
  clearDirections(map)

  destLat = e.latlng.lat
  destLng = e.latlng.lng
  destination && destination.removeFrom(map)
  parking && parking.removeFrom(map)
  destination = L.marker([destLat, destLng]).addTo(map);
  if (isLocated === false) {
    swal({
        title: "Please locate yourself first",
        icon: "error",
    });
    return;
  }
  displayAreas(map);

  const url = `http://localhost:3000/get-best-distance?sx=${48.78}&sy=${2.3622}&dx=${destLat}&dy=${destLng}`

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const distances = JSON.parse(xhr.responseText);
      dropoutNumber = distances.number;
      const dropoutX = distances.xCoor;
      const dropoutY = distances.yCoor;

      const suggestesParking = [
        dropoutX + getRandomArbitrary(-0.01, 0.01),
        dropoutY + getRandomArbitrary(-0.01, 0.01),
      ]
      const icon = L.icon({
        iconUrl: `icons/parking.png`,
        iconSize: [18, 18],
        iconAnchor: [0, 0],
      });
      parking = L.marker(suggestesParking, {
        icon
      }).addTo(map);

      const pointA = new L.LatLng(48.76, 2.3622);
      const pointB = new L.LatLng(dropoutX, dropoutY);
      const pointC = new L.LatLng(destLat, destLng);
      const parkingPoint = new L.LatLng(suggestesParking[0], suggestesParking[1])
      const firstPath = [pointA, pointB];
      const secondPath = [pointB, pointC];
      const parkingPath = [pointB, parkingPoint]

      clearDirections(map)

      firstDirections = new L.Polyline(firstPath, {
        color: 'blue',
        weight: 5,
        opacity: 0.7,
        smoothFactor: 1
      }).addTo(map);

      secondDirections = new L.Polyline(secondPath, {
        color: 'black',
        weight: 5,
        opacity: 0.7,
        smoothFactor: 1
      }).addTo(map);

      parkingDirections = new L.Polyline(parkingPath, {
        color: 'red',
        weight: 5,
        opacity: 0.7,
        smoothFactor: 1
      }).addTo(map);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}

export function getDropoutNumber() {
  return dropoutNumber;
}

function clearDirections(map) {
  firstDirections && firstDirections.removeFrom(map);
  secondDirections && secondDirections.removeFrom(map);
  parkingDirections && parkingDirections.removeFrom(map);
}

export function setDestination(e, map) {
}

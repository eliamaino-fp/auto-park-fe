import { displayAreas } from './areas'
import swal from 'sweetalert'

let destination = null;
let directions = null;
let destLat = null;
let destLng = null;

export function getDirections(map, isLocated) {
  if (isLocated === false) {
    swal({
        title: "Please locate yourself first",
        icon: "error",
    });
    return;
  }
  if (destination === null) {
      swal({
          title: "Please choose a destination first",
          text: "Simply tap on the map to decide where you want to go",
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
        const pointA = new L.LatLng(48.78, 2.3622);
        const pointB = new L.LatLng(distances.xCoor, distances.yCoor);
        const pointC = new L.LatLng(destLat, destLng);
        const pointList = [pointA, pointB, pointC];

        clearDirections(map)

        directions = new L.Polyline(pointList, {
            color: 'blue',
            weight: 5,
            opacity: 0.7,
            smoothFactor: 1
        });
        directions.addTo(map);

        swal("Let's go!", `The best route requires you to drop your car at the dropout number ${distances.number}`, "success");
      }
  }
  xhr.open('GET', url, true);
  xhr.send();

}

function clearDirections(map) {
  directions && directions.removeFrom(map);
}

export function setDestination(e, map) {
    clearDirections(map)

    destLat = e.latlng.lat
    destLng = e.latlng.lng
    destination && destination.removeFrom(map)
    destination = L.marker([destLat, destLng]).addTo(map);
}

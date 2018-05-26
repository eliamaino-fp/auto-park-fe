/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _areas = __webpack_require__(3);

var map = L.map('mapid').setView([48.8566, 2.3522], 11);
var locateMeBtn = document.querySelector('.locate-me');
var areasBtn = document.querySelector('.see-areas');
var directionBtn = document.querySelector('.get-dir');
var infoText = document.querySelector('.info-text');
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  id: 'mapbox.streets'
}).addTo(map);
locateMeBtn.addEventListener('click', function () {
  var marker = L.marker([48.78, 2.3622]).addTo(map);
});
areasBtn.addEventListener('click', function () {
  (0, _areas.buildAreas)(map);
});
directionBtn.addEventListener('click', function () {
  infoText.innerHTML = 'The best route requires you to drop your car at the dropout number 3';
}); // disable drag and zoom handlers
// map.dragging.disable();

map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
var popup = L.popup();

function onMapClick(e) {
  popup.setLatLng(e.latlng).setContent("You want to go at " + e.latlng.toString()).openOn(map);
}

map.on('click', onMapClick);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAreas = buildAreas;

function getAreas() {
  return [{
    busy: 42,
    coordinates: [[48.85, 2.4022], [48.85, 2.3722], [48.81, 2.3722], [48.81, 2.43]]
  }, {
    busy: 12,
    coordinates: [[48.85, 2.3722], [48.85, 2.34228], [48.81, 2.3222], [48.81, 2.3722]]
  }, {
    busy: 25,
    coordinates: [[48.865, 2.43], [48.86, 2.4022], [48.85, 2.4022], [48.81, 2.43]]
  }, {
    busy: 77,
    coordinates: [[48.865, 2.43], [48.86, 2.4022], [48.85, 2.4022]]
  }, {
    busy: 90,
    coordinates: [[48.845, 2.2922], [48.85, 2.34228], [48.81, 2.3222]]
  }];
}

function getDropouts() {
  return [[48.828, 2.3122], [48.84, 2.3922], [48.835, 2.3622], [48.83, 2.3222]];
}

function buildAreas(map) {
  var areas = getAreas();
  var dropouts = getDropouts();
  areas.forEach(function (area) {
    var color = 'grey';

    if (area.busy <= 40) {
      color = 'green';
    } else if (area.busy <= 75) {
      color = 'orange';
    } else {
      color = 'red';
    }

    L.polygon(area.coordinates, {
      color: color,
      fillColor: color,
      fillOpacity: 0.3
    }).addTo(map);
  });
  var dropoutCounter = 1;
  dropouts.forEach(function (dropout) {
    var icon = L.icon({
      iconUrl: "icons/".concat(dropoutCounter.toString(), ".png"),
      iconSize: [18, 18],
      iconAnchor: [0, 0]
    });
    L.marker(dropout, {
      icon: icon
    }).addTo(map);
    dropoutCounter++;
  });
}

/***/ })
/******/ ]);
'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let a;
let b;

navigator.geolocation.getCurrentPosition(function (e) {
  a = e.coords.latitude;
  b = e.coords.longitude;

  var map = L.map('map').setView([a, b], 13);

  map.on('click', function (e) {
    console.log(e);
    L.marker([e.latlng.lat, e.latlng.lng])
      .addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([a, b])
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
});

setTimeout(function () {
  console.log(a, b);
}, 3000);

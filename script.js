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
let map;

let eventMap;

navigator.geolocation.getCurrentPosition(function (e) {
  a = e.coords.latitude;
  b = e.coords.longitude;

  map = L.map('map').setView([a, b], 13);

  map.on('click', function (e) {
    eventMap = e;
    console.log(eventMap);
    form.classList.remove('hidden');
    // bosgan vaqt chiqadi
    inputDistance.focus();
    // nimanidir bossak km yozilishni boshlaydi

    // L.marker([e.latlng.lat, e.latlng.lng])
    //   .addTo(map)
    //   .bindPopup(
    //     L.popup({
    //       maxWidth: 250,
    //       minWidth: 50,
    //       autoClose: false,
    //       closeOnClick: false,
    //       className: 'running-popup',
    //     }).setContent('<p>Hello world!<br />This is a nice popup.</p>')
    //   )
    //   .openPopup();
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([a, b])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 50,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      }).setContent('<p>Hello world!<br />This is a nice popup.</p>')
    )
    .openPopup();
});

setTimeout(function () {
  console.log(a, b);
}, 3000);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';
  L.marker([eventMap.latlng.lat, eventMap.latlng.lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 50,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      }).setContent('<p>Hello world!<br />This is a nice popup.</p>')
    )
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});

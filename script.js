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

// console.log(
//   navigator.geolocation.getCurrentPosition(function (e) {
//     // console.log(`Lat: ${e.coords.latitude},Long:${e.coords.longitude},`);
//     console.log(
//       `https://www.google.com/maps/@${e.coords.latitude},${e.coords.longitude}z`
//     );
//   })
// );

// let cordinata = [lat, lang];
let latitude1;
let longitude1;

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function (e) {
//     latitude1 = e.coords.latitude;
//     longitude1 = e.coords.longitude;
//   });
// }

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (e) {
    latitude1 = e.coords.latitude;
    longitude1 = e.coords.longitude;

    const map = L.map('map').setView([latitude1, longitude1], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.sircule({ latitude1, longitude1 }, { raduse: 100 });
    L.marker([51.5, -0.09], {
      // opacity: 0.4,
    })
      .addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  });
}

navigator.geolocation.getCurrentPosition(function (e) {
  latitude1 = e.coords.latitude;
  longitude1 = e.coords.longitude;
});

setTimeout(function () {
  console.log(latitude1, longitude1);
}, 3000);

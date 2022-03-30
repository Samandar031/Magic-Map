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

// navigator.geolocation.getCurrentPosition(
//   function (e) {
//     a = e.coords.latitude;
//     b = e.coords.longitude;

//     map = L.map('map').setView([a, b], 13);

//     map.on('click', function (e) {
//       eventMap = e;
//       console.log(eventMap);
//       form.classList.remove('hidden');
//       // bosgan vaqt chiqadi
//       inputDistance.focus();
//       // nimanidir bossak km yozilishni boshlaydi

//       // L.marker([e.latlng.lat, e.latlng.lng])
//       //   .addTo(map)
//       //   .bindPopup(
//       //     L.popup({
//       //       maxWidth: 250,
//       //       minWidth: 50,
//       //       autoClose: false,
//       //       closeOnClick: false,
//       //       className: 'running-popup',
//       //     }).setContent('<p>Hello world!<br />This is a nice popup.</p>')
//       //   )
//       //   .openPopup();
//     });

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     L.marker([a, b])
//       .addTo(map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 50,
//           autoClose: false,
//           closeOnClick: false,
//           className: 'running-popup',
//         }).setContent('<p>Hello world!<br />This is a nice popup.</p>')
//       )
//       .openPopup();
//   },
//   function () {
//     alert("sizning turgan o'rningizni olib bera olmadim");
//   }
// );

setTimeout(function () {
  console.log(a, b);
}, 3000);

// app
class App {
  constructor() {
    this._getPosition();
    // this._showForm();
    form.addEventListener('submit', this._submitForum);
    inputType.addEventListener('change', this._toggleSelect(this));
    // bind hozir hammasini chaqirib beryapdi
    // this._showMap();
  }

  // 1.hozirgi o'rnimizni kordinatalarini olish metodi
  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._showMap.bind(this),
      function () {
        alert("sizning turgan o'rningizni olib bera olmadim");
      }
    );
  }
  // 2.urnimiz kordinatalarini mapga berishimiz kk metodi
  _showMap(e) {
    console.log(this);
    a = e.coords.latitude;
    b = e.coords.longitude;

    map = L.map('map').setView([a, b], 13);

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
    this._showForm();
  }
  // 3.formani ochish metodi
  _showForm() {
    map.on('click', function (e) {
      eventMap = e;
      console.log(eventMap);
      form.classList.remove('hidden');
      // bosgan vaqt chiqadi
      inputDistance.focus();
      // nimanidir bossak km yozilishni boshlaydi
      console.log(e);
    });
  }
  // 4.forma submit bo'lsa markerni chiqarish
  _submitForum(e) {
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
  }

  // select option o'zgarganda classni toggle qilish
  _toggleSelect() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }
}

// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   inputDistance.value =
//     inputDuration.value =
//     inputCadence.value =
//     inputElevation.value =
//       '';
//   L.marker([eventMap.latlng.lat, eventMap.latlng.lng])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 50,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup',
//       }).setContent('<p>Hello world!<br />This is a nice popup.</p>')
//     )
//     .openPopup();
// });

// inputType.addEventListener('change', function () {
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
// });

let MagicMap = new App();
// MagicMap._getPosition();

class Joy {
  data = new Date();
  id = Data.now().slice(-7);
  constructor(distance, duration, cords) {
    (this.distance = distance),
      (this.duration = duration),
      (this.cords = cords);
  }
}

class Yugurish extends Joy {
  constructor(distance, duration, cords, cadense) {
    super(distance, duration, cords);
    this.cadense = cadense;
  }
}

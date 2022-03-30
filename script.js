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
class Joy {
  data = new Date();
  id = (Date.now() + '').slice(-7);
  constructor(distance, duration, cords) {
    (this.distance = distance),
      (this.duration = duration),
      (this.cords = cords);
  }
  _setTavsif() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.malumot = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.data.getMonth()]
    } ${this.data.getDate()}`;
  }
}

class Yugurish extends Joy {
  type = 'running';
  constructor(distance, duration, cords, cadense) {
    super(distance, duration, cords);
    this.cadense = cadense;
    this._setTavsif();
  }
}

class Velik extends Joy {
  type = 'cycling';
  constructor(distance, duration, cords, elevation) {
    super(distance, duration, cords);
    this.elevation = elevation;
    this.calcSpead();
    this._setTavsif();
  }
  calcSpead() {
    this.tezlik = this.distance / this.duration;
    return this.tezlik;
  }
}

setTimeout(function () {
  console.log(a, b);
}, 3000);

// app
class App {
  #mashqlar = [];
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._createObject.bind(this));
    inputType.addEventListener('change', this._toggleSelect);
    // bind hozir hammasini chaqirib beryapdi
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
    this._hideForm();
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
  _addMarker(obj) {
    L.marker([obj.cords[0], obj.cords[1]])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 50,
          autoClose: false,
          closeOnClick: false,
          className: `${obj.type}-popup`,
        }).setContent(`${obj.malumot}`)
      )
      .openPopup();
  }
  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.classList.add('hidden');
  }

  // 5.select option o'zgarganda classni toggle qilish
  _toggleSelect() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  // 6.forma ma'lumotlarini constructor orqali obyect yaratish
  _createObject(e) {
    e.preventDefault();
    let mashq = '';
    const checkNumber = (...input) => {
      return input.every(val => Number.isFinite(val));
    };

    const checkMusbet = (...input) => {
      return input.every(val => val > 0);
    };

    let distance = +inputDistance.value;
    let duration = +inputDuration.value;
    let type = inputType.value;

    if (type === 'running') {
      let cadence = +inputCadence.value;
      if (
        !checkNumber(distance, duration, cadence) &&
        !checkMusbet(distance, duration, cadence)
      ) {
        return alert('musbat son kiriting');
      }

      mashq = new Yugurish(
        distance,
        duration,
        [eventMap.latlng.lat, eventMap.latlng.lng],
        cadence
      );
      console.log(mashq);

      // this._addMarker(mashq);
    }
    if (type === 'cycling') {
      let elevation = +inputCadence.value;

      if (
        !checkNumber(distance, duration, elevation) ||
        !checkMusbet(distance, duration)
      ) {
        return alert('musbat son kiriting');
      }

      mashq = new Velik(
        distance,
        duration,
        [eventMap.latlng.lat, eventMap.latlng.lng],
        elevation
      );
      // console.log(mashq);
    }

    // mashq obyektini mashqlar arrayga push qilish metodi
    this.#mashqlar.push(mashq);
    console.log(this.#mashqlar);

    this._addMarker(mashq);
    // mashqlar ruyhatini chiqarish
    this._renderList(mashq);
  }

  // 7. Mashlarni ro'yxatini chiqarish
  _renderList(obj) {
    let html = `<!-- <li class="workout workout--${obj.type}" data-id="${
      obj.id
    }">
    <h2 class="workout__title">${obj.malumot}</h2>
    <div class="workout__details">
      <span class="workout__icon">${obj.type === 'running' ? '🏃‍♂️' : '⏱'}</span>
      <span class="workout__value">${obj.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">${obj.type === 'cycling' ? '🏃‍♂️' : '⏱'}</span>
      <span class="workout__value">${obj.distance}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (obj.type === 'running') {
      html += `     <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${obj.distance / obj.duration}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${obj.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`;
    }
    if (obj.type === 'cycling') {
      html += ` <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${
            obj.distance / obj.duration / 60
          }</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${obj.cadence}</span>
          <span class="workout__unit">m</span>
        </div>
      </li> -->`;
    }
    // form tegini formni tagida ishladi
    form.insertAdjacentHTML('afterend', html);
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
// distance =
// masofa = distanse
// duration = minut

// const yugurUmid = new Velik(2, 2, [23, 25], 20);
// const ali = new Yugurish(2, 2, 3);

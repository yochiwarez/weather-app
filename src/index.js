/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint arrow-parens: ["error", "as-needed"] */

import Autocomplete from '@trevoreyre/autocomplete-js';
import axios from 'axios';
import main from './templates/main.html';
import './css/style.css';
import './css/ac.css';
import countries from './assets/countries.json';

const content = document.querySelector('div.content');
content.innerHTML = main;

const defLocat = 'peru';

const celcEls = content.querySelectorAll('input[name="unit"]');
celcEls[0].checked = true;

const autoText = content.querySelector('.autocomplete-input');

const selectEl = ref => content.querySelector(`[a-cont="${ref}"]`);
const tempEl = selectEl('temp');
const iconEl = selectEl('icon');
const descEl = selectEl('desc');
const dayEl = selectEl('day');
const dateEl = selectEl('date');
const locatEl = selectEl('locat');
const pressEl = selectEl('press');
const humidEl = selectEl('humid');
const windEl = selectEl('wind');
const minTempEl = selectEl('minTemp');
const maxTempEl = selectEl('maxTemp');


const updateData = data => {
  const tempConv = (temp, flag = false) => {
    const tmp = data.temp;
    return flag ? `${tmp} &#8451;` : `${tmp * (9 / 5) + 32} &#8457;`;
  };
  const temp = () => tempConv(data.temp, celcEls[0].checked);
  const minTemp = () => tempConv(data.minTemp, celcEls[0].checked);
  const maxTemp = () => tempConv(data.maxTemp, celcEls[0].checked);

  const day = () => new Date().toLocaleString('en-us', { weekday: 'long' });
  const date = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${dd}/${mm}/${yyyy}`;
    return today;
  };

  tempEl.innerHTML = temp();
  iconEl.setAttribute('src', data.icon);
  descEl.textContent = data.desc;
  dayEl.textContent = day();
  dateEl.textContent = date();
  locatEl.textContent = data.locat;
  pressEl.textContent = data.pressure;
  humidEl.textContent = data.humidity;
  windEl.textContent = `${data.wind} KM/H`;
  minTempEl.innerHTML = minTemp();
  maxTempEl.innerHTML = maxTemp();
};

const process = q => {
  axios
    .post(
      `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=ccf0280f67bc164a41011b8b774bbb8d`,
    )
    .then(resp => {
      const { data } = resp;
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      updateData({
        temp: data.main.temp,
        icon,
        desc: data.weather[0].description,
        locat: data.name,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
      });
    });
};

celcEls.forEach(el => {
  el.onclick = () => {
    if (autoText.value) {
      process(autoText.value);
    } else {
      process(defLocat);
    }
  };
});

// eslint-disable-next-line no-new
new Autocomplete('#autocomplete', {
  search: input => {
    if (input.length < 1) { return []; }
    return countries.filter(country => country.toLowerCase()
      .startsWith(input.toLowerCase()));
  },
  onSubmit: result => {
    process(result);
  },
});

process(defLocat);

// window.addEventListener('submit', (e) => {
//   console.log(e);
// });

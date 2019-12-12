<template>
  <div>
    <div class="main">
      <div class="row1">
        <ul>
          <li v-html="temp">
          </li>
          <li>
            <img :src="icon" />
          </li>
          <li>{{data.weather[0].description}}</li>
        </ul>
        <ul>
          <li>{{day}}</li>
          <li>{{date}}</li>
          <li>{{data.name}}</li>
          <li>
            <span class="unit">
              <label>&#8451;</label>
              <input type="radio" value="1" v-model="unit" />
              <label>&#8457;</label>
              <input type="radio" value="0" v-model="unit" />
            </span>
          </li>
        </ul>
      </div>
      <div class="row2">
        <ul>
          <li>
            <span>PRESSURE</span>
            <span>{{data.main.pressure}}</span>
          </li>
          <li>
            <span>HUMIDITY</span>
            <span>{{data.main.humidity}}</span>
          </li>
          <li>
            <span>WIND</span>
            <span>{{data.wind.speed}} km/h</span>
          </li>
        </ul>
      </div>
      <div class="row3">
        <ul>
          <div>
            <span>Min:</span>
            <span v-html="minTemp"></span>
          </div>
          <div>
            <span>Max:</span>
            <span v-html="maxTemp"></span>
          </div>
        </ul>
      </div>
      <Autocomplete
        class="autocomp"
        :autoSelect="true"
        :search="search"
        @submit="submit"
        placeholder="Search country"
      />
    </div>
  </div>
</template >

<script>
import countries from '../../assets/countries.json';

export default {
  data: () => ({
    data: {
      main: {},
      weather: [{}],
      wind: {},
    },
    countries,
    icon: null,
    unit: '1',
  }),
  methods: {
    search(input) {
      if (input.length < 1) {
        return [];
      }
      const rp = this.countries
        .filter((country) => country
          .toLowerCase().startsWith(input.toLowerCase()));
      return rp;
    },
    submit(v) {
      this.$http
        .post(
          `https://api.openweathermap.org/data/2.5/weather?q=${v}&units=metric&APPID=ccf0280f67bc164a41011b8b774bbb8d`,
        )
        .then((resp) => {
          this.$set(this, 'data', resp.data);
          this.icon = `https://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png`;
        });
    },
  },
  mounted() {
    this.submit('arequipa');
  },
  computed: {
    day() {
      return new Date().toLocaleString('en-us', { weekday: 'long' });
    },
    date() {
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
    },
    temp() {
      const tmp = this.data.main.temp;
      return this.unit === '1' ? `${tmp} &#8451;` : `${tmp * (9 / 5) + 32} &#8457;`;
    },
    minTemp() {
      const tmp = this.data.main.temp_min;
      return this.unit === '1'
        ? `${tmp} &#8451;`
        : `${tmp * (9 / 5) + 32} &#8457;`;
    },
    maxTemp() {
      const tmp = this.data.main.temp_max;
      return this.unit === '1'
        ? `${tmp} &#8451;`
        : `${tmp * (9 / 5) + 32} &#8457;`;
    },
  },
};
</script>

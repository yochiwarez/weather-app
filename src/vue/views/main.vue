<template>
  <div>
    <div class="main">
      <div class="row1">
        <ul>
          <li>
            <i class="wi wi-day-sunny"></i>
          </li>
          <li>1 grado</li>
          <li>cloundly</li>
        </ul>
        <ul>
          <li>Wendesday</li>
          <li>11 Dec 2019</li>
          <li>London, gb</li>
        </ul>
      </div>
      <div class="row2">
        <ul>
          <li>
            <span>ROUNN</span>
            <span>Low</span>
          </li>
          <li>
            <span>HOMUDITY</span>
            <span>85%</span>
          </li>
          <li>
            <span>WIND</span>
            <span>2,.1KM</span>
          </li>
        </ul>
      </div>
      <div class="row3">
        <ul>
          <div>min temp</div>
          <div>max temp</div>
        </ul>
      </div>
      <Autocomplete class="autocomp" :search="search" @submit="submit" placeholder="Search country"></Autocomplete>
    </div>
  </div>
</template >

<script>
import countries from '../../assets/countries.json';
import icons from '../../assets/icons.json';

export default {
  data: () => ({
    data: [],
    countries,
    icons,
  }),
  methods: {
    search(input) {
      if (input.length < 1) {
        return [];
      }
      return this.countries.filter((country) => country.toLowerCase().startsWith(input.toLowerCase()));
    },
    submit(v) {
      console.log(v);
      this.$http
        .post(
          `http://api.openweathermap.org/data/2.5/weather?q=${v}&APPID=ccf0280f67bc164a41011b8b774bbb8d`,
        )
        .then((resp) => {
          console.log(resp.data);
        });
    },
  },
};
</script>

<style scoped>
</style>

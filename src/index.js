/* eslint-disable import/no-named-as-default-member */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import Autocomplete from '@trevoreyre/autocomplete-vue';
// eslint-disable-next-line import/no-named-as-default
import router from './vue/router/index';
import store from './vue/store/store';

import '@trevoreyre/autocomplete-vue/dist/style.css';

import './css/style.css';
import './css/weather-icons.css';

Vue.use(Vuex);

Vue.component('Autocomplete', Autocomplete);

Vue.prototype.$http = axios;


new Vue({
  store,
  router,
}).$mount('#app');

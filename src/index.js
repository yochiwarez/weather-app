/* eslint-disable import/no-named-as-default-member */
import Vue from 'vue';
import axios from 'axios';

import Autocomplete from '@trevoreyre/autocomplete-vue';
// eslint-disable-next-line import/no-named-as-default
import router from './vue/router/index';

import main from './vue/views/main.vue';


import '@trevoreyre/autocomplete-vue/dist/style.css';

import './css/style.css';


Vue.component('Autocomplete', Autocomplete);

Vue.prototype.$http = axios;


new Vue({
  router,
}).$mount('#app');

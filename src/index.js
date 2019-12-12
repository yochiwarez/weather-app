/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import axios from 'axios';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import main from './vue/views/main.vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
import './css/style.css';

Vue.component('Autocomplete', Autocomplete);
Vue.prototype.$http = axios;

new Vue({
  render: (h) => h(main),
}).$mount('#app');

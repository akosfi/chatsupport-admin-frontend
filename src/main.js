import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import App from './App';
import store from './store';
import router from './router';

sync(store, router);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
import Vue from 'vue';

import Vuetify from 'vuetify';
import vuetify_css from 'vuetify/dist/vuetify.min.css';
import Vue2Filters from 'vue2-filters';

import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Vue2Filters);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notification: {
      timeout: 3000,
      color: 'green',
      mode: '',
      y: 'bottom',
      x: 'right',
      show: false,
      text: 'Success',
      closeColor: 'white',
      closeText: 'Close'
    }
  },
  mutations: {
    notification(state, payload) {
      state.notification = { ...state.notification, ...payload };
    }
  },
  actions: {}
});

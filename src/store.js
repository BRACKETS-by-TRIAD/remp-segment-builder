import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createLogger from 'vuex/dist/logger';
import * as fromConfig from './config';

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
    },
    tablesBlueprint: [],
    selectedTable: null
  },
  getters: {
    tableNames: state => {
      return state.tablesBlueprint.map(item => item.table);
    }
  },
  mutations: {
    notification(state, payload) {
      state.notification = { ...state.notification, ...payload };
    },
    setTablesBlueprint(state, payload) {
      state.tablesBlueprint = payload;
    },
    setSelectedTable(state, selectedTable) {
      state.selectedTable = selectedTable;
    }
  },
  actions: {
    fetchTablesBlueprint(context) {
      axios
        .get(fromConfig.URL_TABLES_BLUEPRINT)
        .then(({ data }) => {
          context.commit('setTablesBlueprint', data.blueprint);
        })
        .catch(error => {
          context.commit('notification', {
            show: true,
            color: 'red',
            text: 'Error fetching blueprint'
          });
        });
    }
  },
  plugins: [createLogger()]
});

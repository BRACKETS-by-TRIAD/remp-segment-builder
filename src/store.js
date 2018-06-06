import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createLogger from 'vuex/dist/logger';
import uuid from 'uuid/v1';
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
    selectedTable: null,
    selectedFields: [],
    selectedCriterias: []
  },
  getters: {
    tableNames: state => {
      return state.tablesBlueprint.map(item => item.table);
    },
    selectedTable: state => {
      return state.tablesBlueprint.filter(
        item => item.table === state.selectedTable
      )[0];
    },
    fieldsForSelectedTable: (state, getters) => {
      return getters.selectedTable ? getters.selectedTable.fields : [];
    },
    criteriasForSelectedTable: (state, getters) => {
      return getters.selectedTable ? getters.selectedTable.criteria : [];
    },
    criteriaTypeById: (state, getters) => id => {
      return state.selectedCriterias.find(criteria => criteria.id === id).type;
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
      state.selectedFields = [];
    },
    setSelectedFields(state, selectedFields) {
      state.selectedFields = selectedFields;
    },
    addCriteria(state) {
      state.selectedCriterias.push({ id: uuid() });
    },
    removeCriteria(state, criteriaId) {
      state.selectedCriterias = state.selectedCriterias.filter(
        criteria => criteria.id != criteriaId
      );
    },
    setCriteriaType(state, { id, type }) {
      state.selectedCriterias = state.selectedCriterias.map(criteria => {
        if (criteria.id == id) {
          return { ...criteria, type };
        }
        return criteria;
      });
    },
    addParameterToCriteria(state, criteriaId) {
      state.selectedCriterias = state.selectedCriterias.map(criteria => {
        const helperId = uuid();
        console.log(criteriaId);
        console.log(criteria.id);
        if (criteria.id == criteriaId) {
          return {
            ...criteria,
            params: {
              ...(criteria.params ? criteria.params : {}),
              [helperId]: { id: helperId }
            }
          };
        }
        return criteria;
      });
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

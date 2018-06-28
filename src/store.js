import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createLogger from 'vuex/dist/logger';
import uuid from 'uuid/v1';
import qs from 'qs';
import * as fromConfig from './config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notification: {
      timeout: 5000,
      color: 'green',
      mode: '',
      y: 'bottom',
      x: 'right',
      show: false,
      text: 'Success',
      closeColor: 'white',
      closeText: 'Close'
    },
    ajaxLoader: false,
    totalCount: 0,
    criteriaCounts: {},
    criteriaCountsLoading: [],
    segmentCount: false,
    segmentCountLoading: false,
    tablesBlueprint: [],
    selectedTable: null,
    selectedFields: [],
    selectedCriterias: [],
    selectedParameters: [],
    suggestedSegments: [],
    suggestedSegmentsLoading: false,
    savingSegmentLoading: false
  },
  getters: {
    tableNames: state => {
      return state.tablesBlueprint.map(item => item.table);
    },
    selectedTable: state => {
      return state.tablesBlueprint.find(
        item => item.table === state.selectedTable
      );
    },
    fieldsForSelectedTable: (state, getters) => {
      return getters.selectedTable ? getters.selectedTable.fields : [];
    },
    criteriasForSelectedTable: (state, getters) => {
      return getters.selectedTable ? getters.selectedTable.criteria : [];
    },
    parametersForSelectedCriteria: (state, getters) => criteriaId => {
      return state.selectedParameters.filter(
        parameter => parameter.criteriaId === criteriaId
      );
    },
    allParametersForCriteriaType: (state, getters) => criteriaType => {
      return getters.criteriasForSelectedTable.find(
        criteria => criteria.key === criteriaType
      ).params;
    },
    specificParameterForCriteriaType: (state, getters) => ({
      criteriaType,
      parameterType
    }) => {
      return getters.criteriasForSelectedTable.find(
        criteria => criteria.key === criteriaType
      ).params[parameterType];
    },
    criteriaTypeById: (state, getters) => id => {
      return state.selectedCriterias.find(criteria => criteria.id === id).type;
    },
    unusedParametersForCriteria: (state, getters) => criteria => {
      const allParametersForCriteriaType = getters.allParametersForCriteriaType(
        criteria.type
      );
      const alreadySelectedParameters = getters.parametersForSelectedCriteria(
        criteria.id
      );

      const unusedParameters = [];

      for (const [key, value] of Object.entries(allParametersForCriteriaType)) {
        if (
          !alreadySelectedParameters.some(parameter => parameter.name === key)
        ) {
          unusedParameters.push({
            name: key,
            ...value
          });
        }
      }

      return unusedParameters;
    },
    parameterValueById: (state, getters) => parameterId => {
      return state.selectedParameters.find(
        parameter => parameter.id === parameterId
      ).value;
    },
    builtWholeSegmentForApi: (state, getters) => {
      const nodes = [];
      try {
        state.selectedCriterias.forEach(criteria => {
          nodes.push(getters.builtNodeForCriteria(criteria.id));
        });
      } catch (error) {
        return false;
      }

      return {
        version: '1',
        nodes: [{ type: 'operator', operator: 'AND', nodes }]
      };
    },
    builtSingleCriteriaForApiCount: (state, getters) => criteriaId => {
      const nodes = [];
      try {
        nodes.push(getters.builtNodeForCriteria(criteriaId));
      } catch (error) {
        return false;
      }

      return {
        version: '1',
        nodes: [{ type: 'operator', operator: 'AND', nodes }]
      };
    },
    builtNodeForCriteria: (state, getters) => criteriaId => {
      const key = getters.criteriaTypeById(criteriaId);
      const values = {};

      getters.parametersForSelectedCriteria(criteriaId).forEach(parameter => {
        if (parameter.value == undefined) return;
        if (Array.isArray(parameter.value) && parameter.value.length === 0)
          return;

        if (['number', 'number_array', 'datetime'].includes(parameter.type)) {
          values[parameter.name] = {};
          parameter.value.forEach(item => {
            values[parameter.name][item.operator] = item.value;
          });
        } else if (parameter.type === 'interval') {
          values[parameter.name] = {
            [parameter.value.operator]: `${parameter.value.amount} ${
              parameter.value.timeframe
            }`
          };
        } else {
          values[parameter.name] = parameter.value;
        }
      });

      if (Object.keys(values).length === 0) throw false;

      const node = { type: 'criteria', key, values };
      return node;
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
      state.selectedCriterias = [];
      state.selectedParameters = [];
    },
    setSelectedFields(state, selectedFields) {
      state.selectedFields = selectedFields;
    },
    addEmptyCriteria(state) {
      state.selectedCriterias.push({ id: uuid() });
    },
    addCriteria(state, { id, type }) {
      state.selectedCriterias.push({ id, type });
    },
    removeCriteria(state, criteriaId) {
      state.selectedCriterias = state.selectedCriterias.filter(
        criteria => criteria.id != criteriaId
      );
      state.selectedParameters = [
        ...state.selectedParameters.filter(
          parameter => parameter.criteriaId !== criteriaId
        )
      ];
    },
    setCriteriaType(state, { id, type }) {
      state.selectedCriterias = state.selectedCriterias.map(criteria => {
        if (criteria.id == id) {
          return { ...criteria, type };
        }
        return criteria;
      });
    },
    setCriteriaCount(state, { criteriaId, count }) {
      state.criteriaCounts = { ...state.criteriaCounts, [criteriaId]: count };
    },
    setCriteriaCountsLoading(state, criteriaId) {
      state.criteriaCountsLoading.push(criteriaId);
    },
    unsetCriteriaCountsLoading(state, { criteriaId }) {
      state.criteriaCountsLoading = state.criteriaCountsLoading.filter(
        criteria => criteria.id !== criteriaId
      );
    },
    setSegmentCount(state, { count }) {
      state.segmentCount = count;
    },
    setSegmentCountLoading(state, loading) {
      state.segmentCountLoading = loading;
    },
    addParameterToCriteria(state, { criteriaId, parameter }) {
      state.selectedParameters.push({ id: uuid(), criteriaId, ...parameter });
    },
    removeParameter(state, parameterId) {
      state.selectedParameters = state.selectedParameters.filter(
        parameter => parameter.id != parameterId
      );
    },
    setRequiredParametersForCriteria(state, payload) {
      const parametersForCriteria = state.tablesBlueprint
        .find(table => table.table === state.selectedTable)
        .criteria.find(criteria => criteria.key === payload.type).params;
      for (const [key, value] of Object.entries(parametersForCriteria)) {
        if (value.required) {
          state.selectedParameters.push({
            id: uuid(),
            criteriaId: payload.id,
            name: key,
            ...value
          });
        }
      }
    },
    removeParametersForCriteria(state, criteriaId) {
      state.selectedParameters = [
        ...state.selectedParameters.filter(
          parameter => parameter.criteriaId !== criteriaId
        )
      ];
    },
    setParameterValue(state, { parameterId, parameterValue }) {
      state.selectedParameters = state.selectedParameters.map(parameter => {
        if (parameter.id === parameterId) {
          return { ...parameter, value: parameterValue };
        }
        return parameter;
      });
    },
    setAjaxLoader(state, value) {
      state.ajaxLoader = value;
    },
    setTotalCount(state, value) {
      state.totalCount = value;
    },
    setSuggestedSegments(state, { suggestions }) {
      state.suggestedSegments = suggestions;
    },
    setSuggestedSegmentsLoading(state, loading) {
      state.suggestedSegmentsLoading = loading;
    },
    setSavingSegmentLoading(state, loading) {
      state.savingSegmentLoading = loading;
    }
  },
  actions: {
    fetchTablesBlueprint(context) {
      context.commit('setAjaxLoader', true);
      axios
        .get(fromConfig.URL_TABLES_BLUEPRINT)
        .then(({ data }) => {
          context.commit('setTablesBlueprint', data.blueprint);
          context.commit('setAjaxLoader', false);
          if (fromConfig.SEGMENT_ID) {
            context.dispatch('fetchSegment');
          }
        })
        .catch(error => {
          context.commit('setAjaxLoader', false);
          context.commit('notification', {
            show: true,
            color: 'red',
            text: 'Error fetching blueprint'
          });
        });
    },
    fetchCounterAllTotal(context) {
      context.commit('setAjaxLoader', true);
      const data = {
        version: '1',
        nodes: []
      };
      axios
        .post(
          `${fromConfig.URL_COUNTER}?table_name=${context.state.selectedTable}`,
          data
        )
        .then(({ data }) => {
          context.commit('setAjaxLoader', false);
          context.commit('setTotalCount', data.count);
        })
        .catch(error => {
          context.commit('setAjaxLoader', false);
          context.commit('notification', {
            show: true,
            color: 'red',
            text: 'Error fetching total count'
          });
        });
    },
    fetchCounterForSingleCriteriaPayload(context, { data, criteriaId }) {
      context.commit('setCriteriaCountsLoading', criteriaId);
      axios
        .post(
          `${fromConfig.URL_COUNTER}?table_name=${context.state.selectedTable}`,
          data
        )
        .then(({ data }) => {
          context.commit('setCriteriaCount', { criteriaId, count: data.count });
          context.commit('unsetCriteriaCountsLoading', criteriaId);
        })
        .catch(error => {
          context.commit('notification', {
            show: true,
            color: 'red',
            text: 'Error counting criteria'
          });
          context.commit('setCriteriaCount', { criteriaId, count: false });
          context.commit('unsetCriteriaCountsLoading', criteriaId);
        });
    },
    fetchCounterForWholeSegment(context, { data }) {
      context.commit('setSegmentCountLoading', true);
      axios
        .post(
          `${fromConfig.URL_COUNTER}?table_name=${context.state.selectedTable}`,
          data
        )
        .then(({ data }) => {
          const count = data.count;
          context.commit('setSegmentCount', { count });
          context.commit('setSegmentCountLoading', false);
        })
        .catch(error => {
          context.commit('notification', {
            show: true,
            color: 'red',
            text: 'Error counting whole segment'
          });
          const count = false;
          context.commit('setSegmentCount', { count });
          context.commit('setSegmentCountLoading', false);
        });
    },
    fetchSuggestedSegments(context, { data }) {
      context.commit('setSuggestedSegmentsLoading', true);
      axios
        .post(`${fromConfig.URL_SUGGESTIONS}`, data)
        .then(({ data }) => {
          const suggestions = data.suggestions;

          context.commit('setSuggestedSegments', { suggestions });
          context.commit('setSuggestedSegmentsLoading', false);
        })
        .catch(error => {
          // context.commit('notification', {
          //   show: true,
          //   color: 'red',
          //   text: 'Error fetching suggestions'
          // });
          // TODO: this is just for demo purposes, until the backend is finished
          const suggestions = [
            {
              id: 1,
              name: 'First suggested segment',
              url: 'https://www.google.com/'
            },
            {
              id: 2,
              name: 'Second suggested segment',
              url: 'https://www.google.com/'
            },
            {
              id: 3,
              name: 'Third suggested segment',
              url: 'https://www.google.com/'
            }
          ];
          context.commit('setSuggestedSegments', { suggestions });
          context.commit('setSuggestedSegmentsLoading', false);
        });
    },
    fetchSegment(context) {
      context.commit('setAjaxLoader', true);
      axios
        .get(`${fromConfig.URL_GET_PAYLOAD}?id=${fromConfig.SEGMENT_ID}`)
        .then(({ data }) => {
          context.dispatch('buildSegmentFromApiPayload', data.segment);
          context.commit('setAjaxLoader', false);
        })
        .catch(error => {
          console.log(error);
          context.commit('notification', {
            show: true,
            color: 'red',
            text: 'Error fetching segment'
          });
          context.commit('setAjaxLoader', true);
        });
    },
    buildSegmentFromApiPayload(context, payload) {
      context.commit('setSelectedTable', payload.table_name);
      context.commit('setSelectedFields', payload.fields.split(','));
      payload.criteria;

      payload.criteria.nodes.forEach(node => {
        node.nodes.forEach(node => {
          const criteriaId = uuid();
          context.commit('addCriteria', { id: criteriaId, type: node.key });
          node.value;
          Object.keys(node.values).forEach(parameterType => {
            const parameter = {
              ...context.getters.specificParameterForCriteriaType({
                criteriaType: node.key,
                parameterType
              }),
              name: parameterType
            };
            if (
              ['number', 'number_array', 'datetime'].includes(parameter.type)
            ) {
              const payloadValue = node.values[parameterType];
              parameter.value = Object.keys(payloadValue).map(valueKey => {
                return { operator: valueKey, value: payloadValue[valueKey] };
              });
            } else if (parameter.type === 'interval') {
              // TODO: finish when interval backend is ready
            } else {
              parameter.value = node.values[parameterType];
            }

            context.commit('addParameterToCriteria', {
              criteriaId,
              parameter
            });
          });
        });
      });
    },
    saveSegment(context) {
      context.commit('setSavingSegmentLoading', true);
      const data = {
        name: 'test_1',
        table_name: context.state.selectedTable,
        fields: 'users.id',
        // fields: context.state.selectedFields.join(),
        group_id: fromConfig.GROUP_ID,
        code: 'test_1',
        criteria: JSON.stringify(context.getters.builtWholeSegmentForApi)
      };
      const url = fromConfig.SEGMENT_ID
        ? `${fromConfig.URL_POST_PAYLOAD}?id=${fromConfig.SEGMENT_ID}`
        : fromConfig.URL_POST_PAYLOAD;
      axios
        .post(url, qs.stringify(data))
        .then(response => {
          context.commit('notification', {
            show: true,
            color: 'green',
            text: 'Segment successfully saved'
          });
          context.commit('setSavingSegmentLoading', false);
        })
        .catch(error => {
          context.commit('notification', {
            show: true,
            color: 'red',
            text: 'Error saving segment'
          });
          context.commit('setSavingSegmentLoading', false);
        });
    },
    setCriteriaType(context, payload) {
      context.commit('setCriteriaType', payload);
      context.commit('removeParametersForCriteria', payload.id);
      context.commit('setRequiredParametersForCriteria', payload);
    }
  }
  // plugins: [createLogger()]
});

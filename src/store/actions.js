import axios from 'axios';
import uuid from 'uuid/v1';
import * as fromConfig from '../config';

export default {
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
  fetchSegmentCategories(context) {
    context.commit('setAjaxLoader', true);
    axios
      .get(fromConfig.URL_SEGMENT_CATEGORIES)
      .then(({ data }) => {
        context.commit('setSegmentCategories', data.groups);
        context.commit('setAjaxLoader', false);
      })
      .catch(error => {
        context.commit('setAjaxLoader', false);
        context.commit('notification', {
          show: true,
          color: 'red',
          text: 'Error fetching segment categories'
        });
      });
  },
  fetchCounterAllTotal(context) {
    context.commit('setAjaxLoader', true);
    const data = {
      table_name: context.state.selectedTable,
      criteria: { version: '1', nodes: [] }
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
        const suggestions = data.segments;

        context.commit('setSuggestedSegments', { suggestions });
        context.commit('setSuggestedSegmentsLoading', false);
      })
      .catch(error => {
        context.commit('setSuggestedSegmentsLoading', false);
        context.commit('notification', {
          show: true,
          color: 'red',
          text: 'Error fetching suggestions'
        });
        context.commit('setSuggestedSegments', { suggestions: [] });
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
        context.commit('notification', {
          show: true,
          color: 'red',
          text: 'Error fetching segment'
        });
        context.commit('setAjaxLoader', true);
      });
  },
  buildSegmentFromApiPayload(context, payload) {
    context.commit('setSegmentName', payload.name);
    context.commit('setSelectedTable', payload.table_name);
    context.dispatch('fetchCounterAllTotal');
    context.commit('setSelectedFields', payload.fields.split(','));

    payload.criteria.nodes.forEach(node => {
      node.nodes.forEach(node => {
        const criteriaId = uuid();
        context.commit('addCriteria', {
          id: criteriaId,
          type: node.key,
          negation: node.negation
        });
        Object.keys(node.values).forEach(parameterType => {
          const parameter = {
            ...context.getters.specificParameterForCriteriaType({
              criteriaType: node.key,
              parameterType
            }),
            name: parameterType,
            value: node.values[parameterType]
          };

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
      name: context.state.segmentName,
      group_id: fromConfig.GROUP_ID, // TODO: later change to context.state.segmentCategoryID
      ...context.getters.builtSegmentForApi()
    };
    const url = fromConfig.SEGMENT_ID
      ? `${fromConfig.URL_POST_PAYLOAD}?id=${fromConfig.SEGMENT_ID}`
      : fromConfig.URL_POST_PAYLOAD;
    axios
      .post(url, data)
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
    context.dispatch('setRequiredParametersForCriteria', payload);
  },
  setRequiredParametersForCriteria(context, payload) {
    const parametersForCriteria = context.state.tablesBlueprint
      .find(table => table.table === context.state.selectedTable)
      .criteria.find(criteria => criteria.key === payload.type).params;
    Object.entries(parametersForCriteria).forEach(([name, parameter]) => {
      if (parameter.required) {
        parameter.name = name;
        context.commit('addParameterToCriteria', {
          criteriaId: payload.id,
          parameter
        });
      }
    });
  }
};

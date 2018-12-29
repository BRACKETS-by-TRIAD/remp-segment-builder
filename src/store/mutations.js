import uuid from 'uuid/v1';

export default {
  notification(state, payload) {
    state.notification = { ...state.notification, ...payload };
  },
  setTablesBlueprint(state, payload) {
    state.tablesBlueprint = payload;
  },
  setSegmentCategories(state, payload) {
    state.segmentCategories = payload;
  },
  setSegmentName(state, payload) {
    state.segmentName = payload;
  },
  setSegmentCategoryID(state, payload) {
    state.segmentCategoryID = payload;
  },
  setSegmentID(state, payload) {
    state.segmentID = payload;
  },
  setSelectedTable(state, selectedTable) {
    state.selectedTable = selectedTable;
    state.selectedFields = [];
    state.selectedCriterias = [{ id: uuid() }];
    state.selectedParameters = [];
    state.suggestedSegments = [];
  },
  setSelectedFields(state, selectedFields) {
    state.selectedFields = selectedFields;
  },
  addEmptyCriteria(state) {
    state.selectedCriterias.push({ id: uuid() });
  },
  addCriteria(state, { id, type, negation, availableFields, selectedFields }) {
    state.selectedCriterias.push({
      id,
      type,
      negation,
      availableFields,
      selectedFields
    });
  },
  clearAllCriteria(state) {
    state.selectedCriterias = [];
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
  setCriteriaType(state, { id, type, availableFields }) {
    state.selectedCriterias = state.selectedCriterias.map(criteria => {
      if (criteria.id == id) {
        return { ...criteria, type, availableFields };
      }
      return criteria;
    });
  },
  setCriteriaSelectedFields(state, { id, selectedFields }) {
    state.selectedCriterias = state.selectedCriterias.map(criteria => {
      if (criteria.id == id) {
        return { ...criteria, selectedFields };
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
  setCriteriaNegation(state, { id, negation }) {
    state.selectedCriterias = state.selectedCriterias.map(criteria => {
      if (criteria.id == id) {
        return { ...criteria, negation };
      }
      return criteria;
    });
  },
  setSegmentCount(state, { count }) {
    state.segmentCount = count;
  },
  setSegmentCountLoading(state, loading) {
    state.segmentCountLoading = loading;
  },
  addParameterToCriteria(state, { criteriaId, parameter }) {
    state.selectedParameters.push({
      id: uuid(),
      criteriaId,
      ...parameter
    });
  },
  removeParameter(state, parameterId) {
    state.selectedParameters = state.selectedParameters.filter(parameter => {
      return parameter.id != parameterId;
    });
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
};

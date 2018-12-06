import CriteriaNodeEmptyParamatersException from './../exceptions/CriteriaNodeEmptyParamatersException';

export default {
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
  availableFieldsForCriteriaType: (state, getters) => criteriaType => {
    return getters.criteriasForSelectedTable.find(
      criteria => criteria.key === criteriaType
    ).fields;
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
  criteriaSelectedFieldsById: (state, getters) => id => {
    return state.selectedCriterias.find(criteria => criteria.id === id)
      .selectedFields;
  },
  criteriaNegationById: (state, getters) => id => {
    return state.selectedCriterias.find(criteria => criteria.id === id)
      .negation;
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
  builtSegmentForApi: (state, getters) => (criteriaId = null) => {
    const nodes = [];
    try {
      if (criteriaId) {
        nodes.push(getters.builtNodeForCriteria(criteriaId));
      } else {
        state.selectedCriterias.forEach(criteria => {
          nodes.push(getters.builtNodeForCriteria(criteria.id));
        });
      }
    } catch (e) {
      if (e instanceof CriteriaNodeEmptyParamatersException) {
        // send empty nodes
      } else {
        return false;
      }
    }

    return {
      table_name: state.selectedTable,
      fields: state.selectedFields,
      criteria: {
        version: '1',
        nodes: [{ type: 'operator', operator: 'AND', nodes }]
      }
    };
  },
  builtNodeForCriteria: (state, getters) => criteriaId => {
    const key = getters.criteriaTypeById(criteriaId);
    const negation = !!getters.criteriaNegationById(criteriaId);
    const fields = getters.criteriaSelectedFieldsById(criteriaId);
    const values = {};

    getters.parametersForSelectedCriteria(criteriaId).forEach(parameter => {
      if (parameter.value == undefined) {
        return;
      }

      if (Array.isArray(parameter.value) && parameter.value.length === 0) {
        return;
      }

      values[parameter.name] = parameter.value;
    });

    if (Object.keys(values).length === 0) {
      throw new CriteriaNodeEmptyParamatersException();
    }

    return { type: 'criteria', key, negation, fields, values };
  },
  builtSegmentForApiCountAndSuggestions: (state, getters) => (
    criteriaId = null
  ) => {
    const builtSegmentForApi = getters.builtSegmentForApi(criteriaId);
    if (builtSegmentForApi) {
      const {
        fields,
        ...builtSegmentForApiCountAndSuggestions
      } = builtSegmentForApi;
      return builtSegmentForApiCountAndSuggestions;
    }

    return builtSegmentForApi;
  },
  orderedSegmentCategories: state => {
    return state.segmentCategories.sort((a, b) => a.sorting > b.sorting);
  }
};

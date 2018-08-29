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
  // TODO: ask to merge to unified request count api and save segment and count segment
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
      table_name: state.selectedTable,
      fields: state.selectedFields,
      criteria: {
        version: '1',
        nodes: [{ type: 'operator', operator: 'AND', nodes }]
      }
    };
  },
  builtWholeSegmentForSuggestion: (state, getters) => {
    const nodes = [];
    try {
      state.selectedCriterias.forEach(criteria => {
        nodes.push(getters.builtNodeForCriteria(criteria.id));
      });
    } catch (error) {
      return false;
    }

    return {
      table_name: state.selectedTable,
      criteria: {
        version: 1,
        nodes: [{ type: 'operator', operator: 'AND', nodes }]
      }
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
    // TODO: send negation
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
  },
  orderedSegmentCategories: state => {
    return state.segmentCategories.sort((a, b) => a.sorting > b.sorting);
  }
};

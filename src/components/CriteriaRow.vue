<template>
  <v-container fluid>
    <v-layout align-center class="criteria-row">
      <v-flex>
        <v-card class="elevation-4">
          <v-card-actions class="card-header">
            <CriteriaSelect :criteriaId="criteria.id"/>
            <v-spacer></v-spacer>
            <SelectFieldsForCriteria
              v-if="criteria.availableFields && criteria.availableFields.length"
              :criteriaId="criteria.id"
              :availableFields="criteria.availableFields"
            />
            <CriteriaNot :criteriaId="criteria.id"/>
            <CriteriaDelete :criteriaId="criteria.id"/>
          </v-card-actions>
          <v-card-text :class="{zeroPadding: !parameters.length}">
            <v-layout align-center>
              <v-flex>
                <ParameterRow
                  v-for="parameter in parameters"
                  :key="parameter.id"
                  :parameter="parameter"
                  :criteria="criteria"
                />
                <ParameterAdd v-if="shouldShowParameterAddButton" :criteria="criteria"/>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <CriteriaChart
        :class="['ml-4', {'invisible': !shouldShowCriteriaChart}]"
        :criteria="criteria"
      />
    </v-layout>
    <v-layout>
      <v-flex>
        <div class="text-xs-center and-badge">
          <v-badge color="blue darken-1">
            <span slot="badge">AND</span>
          </v-badge>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import isEqual from "lodash/isEqual";
import get from "lodash/get";

import CriteriaDelete from "./CriteriaDelete";
import CriteriaNot from "./CriteriaNot";
import CriteriaSelect from "./CriteriaSelect";
import ParameterRow from "./ParameterRow";
import ParameterAdd from "./ParameterAdd";
import CriteriaChart from "./CriteriaChart";
import SelectFieldsForCriteria from "./SelectFieldsForCriteria";

export default {
  name: "CriteriaRow",
  props: {
    criteria: Object
  },
  components: {
    CriteriaDelete,
    CriteriaNot,
    CriteriaSelect,
    ParameterRow,
    ParameterAdd,
    CriteriaChart,
    SelectFieldsForCriteria
  },
  created() {
    if (this.builtCriteriaForApiCount) {
      this.fetchCount(this.builtCriteriaForApiCount);
    }
  },
  computed: {
    parameters() {
      return this.$store.getters.parametersForSelectedCriteria(
        this.criteria.id
      );
    },
    shouldShowParameterAddButton() {
      return (
        this.criteria.type &&
        this.$store.getters.unusedParametersForCriteria(this.criteria).length
      );
    },
    builtCriteriaForApiCount() {
      const builtCriteriaForApiCount = this.$store.getters.builtSegmentForApiCountAndSuggestions(
        this.criteria.id
      );

      if (
        get(builtCriteriaForApiCount, "criteria.nodes[0].nodes.length") === 0
      ) {
        return false;
      }

      return builtCriteriaForApiCount;
    },
    shouldShowCriteriaChart() {
      return (
        this.parameters.length > 0 &&
        this.parameters.filter(parameter => {
          if (
            parameter.type === "string_array" ||
            parameter.type === "number_array"
          ) {
            return parameter.value && parameter.value.length > 0;
          } else if (parameter.type === "datetime") {
            return parameter.value !== null && parameter.value !== undefined;
          } else {
            return parameter.value !== undefined;
          }
        }).length > 0
      );
    }
  },
  watch: {
    builtCriteriaForApiCount(data, oldData) {
      if (data && !isEqual(data, oldData)) {
        this.fetchCount(data);
      }
    }
  },
  methods: {
    fetchCount(data) {
      this.$store.dispatch("fetchCounterForSingleCriteriaPayload", {
        criteriaId: this.criteria.id,
        data
      });
    }
  }
};
</script>



<style lang="scss">
.criteria-row {
  min-height: 121px;
}
.and-badge {
  margin-top: 20px;
  width: calc(100% - 125px);
  .v-badge {
    &__badge {
      width: 42px;
      height: 42px;
    }
  }
}
.lastCriteria .and-badge {
  display: none;
}
.zeroPadding {
  padding-top: 0;
  padding-bottom: 0;
}
.card-header {
  background-color: rgba(0, 0, 0, 0.05);
}
.invisible {
  opacity: 0;
}
</style>

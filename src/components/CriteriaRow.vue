<template>
  <v-container>
    <v-layout align-center>
      <v-flex>
        <v-card class="elevation-4">
          <v-card-actions>
            <v-spacer></v-spacer>
            <CriteriaNot :criteriaId="criteria.id" />
            <CriteriaDelete :criteriaId="criteria.id" />
          </v-card-actions>
          <v-card-text>
            <v-layout align-center>
              <v-flex md3>
                <CriteriaSelect :criteriaId="criteria.id" />
              </v-flex>
              <v-flex md8 offset-md1>
                <ParameterRow v-for="parameter in parameters" :key="parameter.id" :parameter="parameter" :criteria="criteria" />
                <ParameterAdd v-if="shouldShowParameterAddButton" :criteria="criteria" />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <CriteriaChart class="ml-4" :criteria="criteria" />
    </v-layout>
  </v-container>
</template>

<script>
import CriteriaDelete from './CriteriaDelete';
import CriteriaNot from './CriteriaNot';
import CriteriaSelect from './CriteriaSelect';
import ParameterRow from './ParameterRow';
import ParameterAdd from './ParameterAdd';
import CriteriaChart from './CriteriaChart';

export default {
  name: 'CriteriaRow',
  props: {
    criteria: Object
  },
  components: {
    CriteriaDelete,
    CriteriaNot,
    CriteriaSelect,
    ParameterRow,
    ParameterAdd,
    CriteriaChart
  },
  created() {
    if (this.builtCriteriaForApi) {
      this.fetchCount(this.builtCriteriaForApi);
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
    builtCriteriaForApi() {
      return this.$store.getters.builtSingleCriteriaForApiCount(
        this.criteria.id
      );
    }
  },
  watch: {
    builtCriteriaForApi(data, oldData) {
      if (data && !(JSON.stringify(data) == JSON.stringify(oldData))) {
        this.fetchCount(data);
      }
    }
  },
  methods: {
    fetchCount(data) {
      this.$store.dispatch('fetchCounterForSingleCriteriaPayload', {
        criteriaId: this.criteria.id,
        data
      });
    }
  }
};
</script>



<style>
/* .elevation-4.card:before {
  content: 'not_interested';
  font-family: Material Icons;
  position: absolute;
  font-size: 160px;
  line-height: 160px;
  color: #0000000d;
} */
</style>

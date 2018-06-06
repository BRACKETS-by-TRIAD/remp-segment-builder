<template>
  <v-container>
    <v-layout align-center>
      <v-flex>
        <v-card class="elevation-4">
          <v-card-actions>
            <v-spacer></v-spacer>
            <CriteriaDelete :criteriaId="criteria.id" />
          </v-card-actions>
          <v-card-text>
            <v-layout align-center>
              <v-flex md3>
                <CriteriaSelect :criteriaId="criteria.id" />
              </v-flex>
              <v-flex md7 offset-md1>
                <ParameterRow v-for="parameter in parameters" :key="parameter.id" :parameter="parameter" />
                <ParameterAdd v-if="criteria.type" :criteriaId="criteria.id" />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <CriteriaChart class="ml-4" />
    </v-layout>
  </v-container>
</template>

<script>
import CriteriaDelete from './CriteriaDelete';
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
    CriteriaSelect,
    ParameterRow,
    ParameterAdd,
    CriteriaChart
  },
  computed: {
    parameters() {
      return this.$store.getters.parametersForSelectedCriteria(
        this.criteria.id
      );
    }
  }
};
</script>

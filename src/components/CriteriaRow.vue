<template>
  <v-container>
    <v-layout align-center>
      <v-flex>
        <v-card class="elevation-4">
          <v-card-actions>
            <v-spacer></v-spacer>
            <CriteriaDelete :criteriaId="criteriaId" />
          </v-card-actions>
          <v-card-text>
            <v-layout>
              <v-flex md3>
                <CriteriaSelect :criteriaId="criteriaId" />
              </v-flex>
              <v-flex md7 offset-md1>
                <div class="d-block">Parameter</div>
                <div class="d-block">Parameter</div>
                <div class="d-block">Parameter</div>
                <ParameterAdd :criteriaId="criteriaId" />
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
import ParameterAdd from './ParameterAdd';
import CriteriaChart from './CriteriaChart';

export default {
  name: 'CriteriaRow',
  props: {
    criteriaId: String
  },
  components: {
    CriteriaDelete,
    CriteriaSelect,
    ParameterAdd,
    CriteriaChart
  }
};
</script>

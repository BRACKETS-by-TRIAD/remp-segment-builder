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
            <CriteriaSelect />
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
import CriteriaChart from './CriteriaChart';

export default {
  name: 'CriteriaRow',
  props: {
    criteriaId: String
  },
  components: {
    CriteriaDelete,
    CriteriaSelect,
    CriteriaChart
  }
};
</script>

<template>
  <v-container>
    <v-layout align-center>
      <v-flex>
        <v-card><br>Dummy criteria <br><br></v-card>
      </v-flex>
      <CriteriaChart class="ml-4" />
    </v-layout>
  </v-container>
</template>

<script>
import CriteriaChart from './CriteriaChart';

export default {
  name: 'CriteriaRow',
  components: {
    CriteriaChart
  }
};
</script>

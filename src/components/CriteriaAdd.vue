<template>
  <v-btn color="blue darken-1" dark flat @click="addCriteria">
    <v-icon dark left>add_circle_outline</v-icon>Add New Criteria
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CriteriaAdd',
  methods: {
    addCriteria() {
      this.$store.commit('addCriteria');
    }
  }
};
</script>

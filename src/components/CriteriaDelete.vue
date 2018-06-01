<template>
  <v-btn icon @click="removeCriteria">
    <v-icon>delete_forever</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CriteriaDelete',
  props: {
    criteriaIndex: Number
  },

  methods: {
    removeCriteria() {
      this.$store.commit('removeCriteria', this.criteriaIndex);
    }
  }
};
</script>

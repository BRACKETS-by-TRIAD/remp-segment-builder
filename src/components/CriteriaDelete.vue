<template>
  <v-tooltip bottom>
    <v-btn slot="activator" icon @click="removeCriteria">
      <v-icon>delete_forever</v-icon>
    </v-btn>
    <span>Remove criteria</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CriteriaDelete',
  props: {
    criteriaId: String
  },

  methods: {
    removeCriteria() {
      this.$store.commit('removeCriteria', this.criteriaId);
    }
  }
};
</script>

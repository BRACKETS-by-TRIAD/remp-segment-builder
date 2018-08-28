<template>
  <v-tooltip bottom>
    <v-btn slot="activator" icon @click="toggleNotCriteria">
      <v-icon v-if="not" class="not-icon" color="error">not_interested</v-icon>
      <v-icon v-else class="not-icon">check_circle</v-icon>
    </v-btn>
    <span>Toggle "NOT" operator</span>
  </v-tooltip>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CriteriaNot',
  props: {
    criteriaId: String
  },
  computed: {
    not() {
      return this.$store.getters.criteriaNegationById(this.criteriaId);
    }
  },
  methods: {
    toggleNotCriteria() {
      return this.$store.commit('setCriteriaNegation', {
        id: this.criteriaId,
        negation: !this.not
      });
    }
  }
};
</script>

<style scoped lang="scss">
.not-icon {
  font-size: 21px;
}
</style>

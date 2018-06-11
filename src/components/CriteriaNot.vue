<template>
  <v-tooltip bottom>
    <v-btn slot="activator" icon @click="toggleNotCriteria">
      <v-icon class="not-icon">{{ not ? 'not_interested' : 'check_circle' }}</v-icon>
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
  data() {
    return {
      not: false
    };
  },
  methods: {
    toggleNotCriteria() {
      // TODO
      this.not = !this.not;
    }
  }
};
</script>

<style scoped>
.not-icon {
  font-size: 21px;
}
</style>

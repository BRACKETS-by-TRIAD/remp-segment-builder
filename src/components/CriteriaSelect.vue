<template>
  <div>
    <v-select :items="criteriasForSelectedTable" v-model="selectedCriteria" item-text="label" item-value="key" label="Select criteria" autocomplete class="criteria-select" append-icon="insert_chart" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CriteriaSelect',
  props: {
    criteriaId: String
  },
  computed: {
    ...mapGetters(['criteriasForSelectedTable']),
    selectedCriteria: {
      get() {
        return this.$store.getters.criteriaTypeById(this.criteriaId);
      },
      set(value) {
        return this.$store.commit('setCriteriaType', {
          id: this.criteriaId,
          type: value
        });
      }
    }
  }
};
</script>

<style scoped>
.criteria-select {
  max-width: 200px;
}
</style>
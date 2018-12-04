<template>
  <div>
    <v-autocomplete
      :items="criteriasForSelectedTable"
      v-model="selectedCriteria"
      item-text="label"
      item-value="key"
      label="Select criteria"
      class="criteria-select"
      append-icon="insert_chart"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CriteriaSelect",
  props: {
    criteriaId: String
  },
  computed: {
    ...mapGetters(["criteriasForSelectedTable"]),
    selectedCriteria: {
      get() {
        return this.$store.getters.criteriaTypeById(this.criteriaId);
      },
      set(value) {
        return this.$store.dispatch("setCriteriaType", {
          id: this.criteriaId,
          type: value,
          availableFields: this.criteriasForSelectedTable.find(
            item => item.key === value
          ).fields
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.criteria-select {
  max-width: 200px;
  position: relative;
  left: 10px;
  top: 2px;
  &.input-group--dirty {
    top: 12px;
  }
}
</style>
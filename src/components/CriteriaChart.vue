<template>
  <div>
    <v-progress-circular :size="100" :width="15" :rotate="-90" :value="percent ? percent : 0" :indeterminate="isRecalculating" color="primary">
      <span class="graph-percent" v-if="!isRecalculating">
        {{ percent | currency('%', 1, {symbolOnLeft: false}) }}
      </span>
    </v-progress-circular>
    <span class="graph-number grey--text text--darken-3" :class="{visible: !isRecalculating}">{{ numberOfPassingItems | currency('', 0, { thousandsSeparator: ' ' }) }}</span>
  </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CriteriaChart',
  props: {
    criteria: Object
  },
  computed: {
    ...mapState(['totalCount']),
    numberOfPassingItems() {
      return this.$store.state.criteriaCounts[this.criteria.id];
    },
    isRecalculating() {
      return this.$store.state.criteriaCountsLoading.some(
        criteriaId => criteriaId === this.criteria.id
      );
    },
    percent() {
      return this.numberOfPassingItems / this.totalCount * 100;
    }
  }
};
</script>

<style scoped lang="scss">
.graph-percent {
  font-weight: 500;
}
.graph-number {
  display: block;
  text-align: center;
  font-weight: 500;
  visibility: hidden;
  &.visible {
    visibility: visible;
  }
}
</style>


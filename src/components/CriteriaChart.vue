<template>
  <div>
    <v-progress-circular :size="100" :width="15" :rotate="-90" :value="percent" :indeterminate="isRecalculating" color="primary">
      <span class="graph-percent" v-if="!isRecalculating">
        {{ percent | currency('', 1) }}%
      </span>
    </v-progress-circular>
    <span v-if="!isRecalculating" class="graph-number grey--text text--darken-3">{{ numberOfPassingItems | currency('', 0, { thousandsSeparator: ' ' }) }}</span>
  </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CriteriaChart',
  computed: {
    ...mapState(['totalCount']),
    numberOfPassingItems() {
      return 120000;
    },
    isRecalculating() {
      return false;
    },
    percent() {
      return this.numberOfPassingItems / this.totalCount * 100;
    }
  }
};
</script>

<style scoped>
.graph-percent {
  font-weight: 500;
}
.graph-number {
  display: block;
  text-align: center;
  font-weight: 500;
}
</style>


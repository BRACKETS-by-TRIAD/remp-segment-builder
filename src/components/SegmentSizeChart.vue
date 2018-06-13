<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="segment-size-wrapper">
          <h2 class="title" :class="{visible: !isRecalculating}">
            Total Size of Segment:
            <span class="primary--text percent">
              {{ percent | currency('%', 1, {symbolOnLeft: false}) }}
            </span>
            <span>
              ({{ numberOfPassingItems | currency('', 0, { thousandsSeparator: ' ' }) }})
            </span>
          </h2>
          <div>
            <v-progress-linear :value="percent ? percent : 0" :height="9" :indeterminate="isRecalculating" color="primary" />
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SegmentSizeChart',
  data() {
    return {
      numberOfPassingItems: 98500
    };
  },
  computed: {
    ...mapState(['totalCount']),
    // numberOfPassingItems() {
    //   return this.$store.state.criteriaCounts[this.criteria.id];
    // },
    isRecalculating() {
      return false;
    },
    percent() {
      return this.numberOfPassingItems / this.totalCount * 100;
    }
  }
};
</script>

<style scoped lang="scss">
.segment-size-wrapper {
  max-width: calc(100% - 120px);
  margin-top: 30px;
}
.title {
  font-size: 16px !important;
  visibility: hidden;
  &.visible {
    visibility: visible;
  }
}
.percent {
  font-weight: 700;
}
</style>


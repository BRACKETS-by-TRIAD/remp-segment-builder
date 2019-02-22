<template>
  <v-container fluid v-if="numberOfPassingItems !== false">
    <v-layout>
      <v-flex>
        <div class="segment-size-wrapper">
          <h2 class="title" :class="{visible: !isRecalculating}">
            Total Size of Segment:
            <span
              class="primary--text percent"
            >{{ percent | currency('%', 1, {symbolOnLeft: false}) }}</span>
            <span>({{ numberOfPassingItems | currency('', 0, { thousandsSeparator: ' ' }) }})</span>
            <v-progress-circular
              class="segment-size-loading"
              indeterminate
              color="primary"
              v-if="segmentCountLoading"
              :size="20"
              :width="3"
            ></v-progress-circular>
          </h2>
          <div>
            <v-progress-linear
              :value="percent ? percent : 0"
              :height="9"
              :indeterminate="isRecalculating"
              color="primary"
            />
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import isEqual from "lodash/isEqual";
import get from "lodash/get";

export default {
  name: "SegmentSizeChart",
  computed: {
    ...mapState(["totalCount", "segmentCountLoading"]),
    numberOfPassingItems() {
      return this.$store.state.segmentCount;
    },
    isRecalculating() {
      return false;
    },
    percent() {
      return (this.numberOfPassingItems / this.totalCount) * 100;
    },
    builtWholeSegmentForApiCount() {
      const builtWholeSegmentForApiCount = this.$store.getters.builtSegmentForApiCountAndSuggestions();

      if (
        get(builtWholeSegmentForApiCount, "criteria.nodes[0].nodes.length") ===
        0
      ) {
        this.$store.commit("setSegmentCount", {
          count: this.$store.state.totalCount
        });
        return false;
      }

      return builtWholeSegmentForApiCount;
    }
  },
  watch: {
    builtWholeSegmentForApiCount(data, oldData) {
      if (data && !isEqual(data, oldData)) {
        this.$store.dispatch("fetchCounterForWholeSegment", { data });
      }
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
  position: relative;
  font-size: 16px !important;
  visibility: hidden;
  &.visible {
    visibility: visible;
  }
}
.percent {
  font-weight: 700;
}
.segment-size-loading {
  position: absolute;
  bottom: -3px;
  margin-left: 15px;
}
</style>


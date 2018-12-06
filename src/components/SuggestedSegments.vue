<template>
  <v-container fluid v-if="suggestedSegments.length">
    <v-layout>
      <v-flex>
        <h2 class="title">You might want to be interested in one of these segments:
          <v-progress-circular
            class="suggested-loading"
            indeterminate
            color="primary"
            v-if="suggestedSegmentsLoading"
            :size="20"
            :width="3"
          ></v-progress-circular>
        </h2>
        <div class="suggested-item" v-for="segment in suggestedSegments" :key="segment.id">
          <v-btn color="primary" :href="segment.url" target="_blank" fab small dark>
            <v-icon>link</v-icon>
          </v-btn>
          {{ segment.name }}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import isEqual from "lodash/isEqual";

export default {
  name: "SuggestedSegments",
  computed: {
    ...mapState(["suggestedSegments", "suggestedSegmentsLoading"]),
    builtWholeSegmentForSuggestion() {
      return this.$store.getters.builtSegmentForApiCountAndSuggestions();
    }
  },
  watch: {
    builtWholeSegmentForSuggestion(data, oldData) {
      if (!isEqual(data, oldData)) {
        this.$store.dispatch("fetchSuggestedSegments", { data });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  position: relative;
  font-size: 16px !important;
  margin-bottom: 20px;
}
.suggested-item {
  margin-top: 10px;
}
.suggested-loading {
  position: absolute;
  bottom: -3px;
  margin-left: 15px;
}
</style>




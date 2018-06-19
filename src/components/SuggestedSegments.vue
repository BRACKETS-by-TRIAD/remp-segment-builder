<template>
  <v-container v-if="suggestedSegments.length">
    <v-layout>
      <v-flex>
        <h2 class="title">You might want to be interested in one of these segments:</h2>
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
import { mapState } from 'vuex';

export default {
  name: 'SuggestedSegments',
  computed: {
    ...mapState(['suggestedSegments']),
    builtWholeSegmentForApi() {
      return this.$store.getters.builtWholeSegmentForApi;
    }
  },
  watch: {
    builtWholeSegmentForApi(data, oldData) {
      if (data && !(JSON.stringify(data) == JSON.stringify(oldData))) {
        this.$store.dispatch('fetchSuggestedSegments', { data });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  font-size: 16px !important;
  margin-bottom: 20px;
}
.suggested-item {
  margin-top: 10px;
}
</style>




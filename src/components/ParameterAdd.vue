<template>
  <v-btn flat small color="blue darken-1" class="mx-0 add-parameter" @click="addParameter">
    <v-icon class="mr-1">add_circle</v-icon>Add Parameter
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ParameterAdd',
  props: {
    criteriaId: String
  },
  methods: {
    addParameter() {
      this.$store.commit('addParameter', this.criteriaId);
    }
  }
};
</script>

<style scoped>
.add-parameter {
  margin-left: -8px !important;
}
</style>


<template>
  <v-menu offset-y>
    <v-btn slot="activator" flat small color="blue darken-1" class="mx-0 add-parameter">
      <v-icon class="mr-1">add_circle</v-icon>Add Parameter
    </v-btn>
    <v-list>
      <v-list-tile v-for="(item, index) in unusedParametersForCriteria" :key="index" @click="addParameter(item)">
        <v-list-tile-title>{{ item.label }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ParameterAdd',
  props: {
    criteria: Object
  },
  computed: {
    unusedParametersForCriteria() {
      return this.$store.getters.unusedParametersForCriteria(this.criteria);
    }
  },
  methods: {
    addParameter(parameter) {
      this.$store.commit('addParameterToCriteria', {
        criteriaId: this.criteria.id,
        parameter
      });
    }
  }
};
</script>

<style scoped>
.add-parameter {
  margin-left: -8px !important;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>


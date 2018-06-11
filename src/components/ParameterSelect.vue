<template>
  <div>
    <v-select :items="unusedParametersForCriteria" v-model="selectedParameter" item-text="name" label="Parameter type" autocomplete class="parameter-select" append-icon="insert_chart" />
  </div>
</template>

<script>
export default {
  name: 'ParameterSelect',
  props: {
    parameter: Object,
    criteria: Object
  },
  computed: {
    unusedParametersForCriteria() {
      return this.$store.getters.unusedParametersForCriteria(this.criteria);
    },
    selectedParameter: {
        get() {
        
      },
      set(value) {
        console.log(value);
        return this.$store.commit('setParameterType', {
          id: this.parameter.id,
          ...value
        });
      }
    }
  }
};
</script>

<style scoped>
.parameter-select {
  max-width: 200px;
}
</style>
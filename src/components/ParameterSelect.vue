<template>
  <div>
    <!-- <v-select :items="availableOptionsForParameter" v-model="selectedCriteria" item-text="label" item-value="key" label="Parameter type" autocomplete class="parameter-select" append-icon="insert_chart" /> -->
    <pre>
      {{ availableOptionsForParameter }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'ParameterSelect',
  props: {
    parameterId: String
  },
  computed: {
    availableOptionsForParameter() {
      const options = this.$store.getters.availableOptionsForParameter(this.parameterId);
      console.log(options);
return options;
    },
    // selectedCriteria: {
    //   get() {
    //     return this.$store.getters.criteriaTypeById(this.criteriaId);
    //   },
    //   set(value) {
    //     return this.$store.commit('setCriteriaType', {
    //       id: this.criteriaId,
    //       type: value
    //     });
    //   }
    // }
  }
};
</script>

<style scoped>
.parameter-select {
  max-width: 200px;
}
</style>
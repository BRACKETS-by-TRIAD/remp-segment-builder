<template>
  <v-switch :label="parameter.label" v-model="parameterValue" color="green" :hint="parameter.help" persistent-hint></v-switch>
</template>

<script>
export default {
  name: 'BooleanParameter',
  props: {
    parameter: Object
  },
  computed: {
    parameterValue: {
      get() {
        return this.$store.getters.parameterValueById(this.parameter.id);
      },
      set(parameterValue) {
        const parameterId = this.parameter.id;
        return this.$store.commit('setParameterValue', {
          parameterId,
          parameterValue
        });
      }
    }
  },
  created() {
    if (typeof this.parameter.value === 'undefined') {
      const parameterId = this.parameter.id;
      const parameterValue = !!this.parameter.default;
      this.$store.commit('setParameterValue', {
        parameterId,
        parameterValue
      });
    }
  }
};
</script>

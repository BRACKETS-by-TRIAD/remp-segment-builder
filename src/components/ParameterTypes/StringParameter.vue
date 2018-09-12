<template>
  <div>
    <!-- string single with options available -->
    <v-select v-if="shouldShowStringSingleWithOptions" v-model="parameterValue" :items="availableOptions" :label="parameter.name" chips deletable-chips autocomplete></v-select>
    <!-- string multiple with options available -->
    <v-select v-if="shouldShowStringMultipleWithOptions" v-model="parameterValue" :items="availableOptions" :label="parameter.name" chips deletable-chips multiple autocomplete></v-select>
    <!-- string multiple -->
    <v-select v-if="shouldShowStringMultiple" v-model="parameterValue" :label="parameter.name" chips deletable-chips tags multiple></v-select>
    <!-- string single -->
    <v-text-field v-if="shouldShowStringSingle" v-model="parameterValue" :label="parameter.name"></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'StringParameter',
  props: {
    parameter: Object
  },
  created() {
    if (typeof this.parameter.value === 'undefined') {
      const parameterId = this.parameter.id;
      const parameterValue = this.parameter.default;
      this.$store.commit('setParameterValue', {
        parameterId,
        parameterValue
      });
    }
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
    },
    shouldShowStringSingleWithOptions() {
      return this.parameter.type === 'string' && this.parameter.available;
    },
    shouldShowStringMultipleWithOptions() {
      return this.parameter.type === 'string_array' && this.parameter.available;
    },
    shouldShowStringMultiple() {
      return (
        this.parameter.type === 'string_array' && !this.parameter.available
      );
    },
    shouldShowStringSingle() {
      return this.parameter.type === 'string' && !this.parameter.available;
    },
    availableOptions() {
      return this.parameter.available;
    }
  }
};
</script>

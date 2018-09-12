<template>
  <div>
    <!-- multiple numbers with available options -->
    <v-select v-if="shouldShowNumberMultipleWithOptions" v-model="parameterValue" :items="availableOptions" :label="parameter.name" chips deletable-chips multiple autocomplete></v-select>
    <!-- multiple numbers -->
    <v-select v-if="shouldShowNumberMultiple" v-model="parameterValue" :label="parameter.name" chips deletable-chips tags multiple></v-select>
  </div>
</template>

<script>
export default {
  name: 'NumberArrayParameter',
  props: {
    parameter: Object
  },
  created() {
    //
  },
  computed: {
    parameterValue: {
      get() {
        const parameterValue = this.$store.getters.parameterValueById(
          this.parameter.id
        );

        return parameterValue
          ? parameterValue.map(number => String(number))
          : parameterValue;
      },
      set(parameterValue) {
        const parameterId = this.parameter.id;
        const parameterValuesConvertedToNumbers = parameterValue
          .filter(item => !isNaN(Number(item)))
          .map(item => Number(item));

        return this.$store.commit('setParameterValue', {
          parameterId,
          parameterValue: parameterValuesConvertedToNumbers
        });
      }
    },
    shouldShowNumberMultipleWithOptions() {
      return this.parameter.type === 'number_array' && this.parameter.available;
    },
    shouldShowNumberMultiple() {
      return (
        this.parameter.type === 'number_array' && !this.parameter.available
      );
    },
    availableOptions() {
      return Object.entries(this.parameter.available).map(([value, text]) => {
        return { value, text };
      });
    }
  }
};
</script>
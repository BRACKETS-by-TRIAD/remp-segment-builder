<template>
  <div class="parameter-row">
    <v-layout>
      <v-flex>
        <BooleanParameter v-if="shouldShowBooleanInput" :parameter="parameter" />
        <StringParameter v-if="shouldShowStringInput" :parameter="parameter" />
        <NumberParameter v-if="shouldShowNumberInput" :parameter="parameter" />
        <DatetimeParameter v-if="shouldShowDatetimeInput" :parameter="parameter" />
        <IntervalParameter v-if="shouldShowIntervalInput" :parameter="parameter" />
      </v-flex>
      <v-flex class="parameter-delete-wrapper">
        <ParameterDelete :parameterId="parameter.id" v-if="!parameter.required" />
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import BooleanParameter from './ParameterTypes/BooleanParameter';
import StringParameter from './ParameterTypes/StringParameter';
import NumberParameter from './ParameterTypes/NumberParameter';
import DatetimeParameter from './ParameterTypes/DatetimeParameter';
import IntervalParameter from './ParameterTypes/IntervalParameter';
import ParameterDelete from './ParameterDelete';

export default {
  name: 'ParameterRow',
  props: ['parameter', 'criteria'],
  components: {
    BooleanParameter,
    StringParameter,
    NumberParameter,
    DatetimeParameter,
    IntervalParameter,
    ParameterDelete
  },
  computed: {
    shouldShowBooleanInput() {
      return this.parameter.type === 'boolean';
    },
    shouldShowStringInput() {
      return (
        this.parameter.type === 'string' ||
        this.parameter.type === 'string_array'
      );
    },
    shouldShowNumberInput() {
      return (
        this.parameter.type === 'number' ||
        this.parameter.type === 'number_array'
      );
    },
    shouldShowDatetimeInput() {
      return this.parameter.type === 'datetime';
    },
    shouldShowIntervalInput() {
      return this.parameter.type === 'interval';
    }
  }
};
</script>

<style lang="scss">
.parameter-delete-wrapper {
  max-width: 50px;
  margin-left: 30px;
}
.parameter-row {
  // border-bottom: 1px dashed #212121;
  margin-bottom: 30px;
  &:last-of-type {
    // border-bottom: none;
    margin-bottom: 0;
  }
}
</style>

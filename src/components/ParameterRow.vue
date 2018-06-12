<template>
  <div class="parameter-row">
    <ParameterSelect v-if="!parameter.type" :parameter="parameter" :criteria="criteria" />

    <v-layout align-center v-if="parameter.type">
      <v-flex>
        <BooleanParameter v-if="shouldShowBooleanInput" :parameter="parameter" />
        <StringParameter v-if="shouldShowStringInput" />
        <NumberParameter v-if="shouldShowNumberInput" />
        <DatetimeParameter v-if="shouldShowDatetimeInput" />
        <IntervalParameter v-if="shouldShowIntervalInput" />
      </v-flex>
      <v-flex class="parameter-delete-wrapper">
        <ParameterDelete :parameterId="parameter.id" />
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import ParameterSelect from './ParameterSelect';
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
    ParameterSelect,
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
}
.parameter-row {
  border-bottom: 1px dashed #212121;
  padding-bottom: 10px;
  margin-bottom: 10px;
  &:last-of-type {
    border-bottom: none;
  }
}
</style>

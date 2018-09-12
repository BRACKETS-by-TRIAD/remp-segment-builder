<template>
  <div class="parameter-row">
    <v-layout>
      <v-flex>
        <BooleanParameter v-if="shouldShowBooleanInput" :parameter="parameter" />
        <StringParameter v-if="shouldShowStringInput" :parameter="parameter" />
        <NumberParameter v-if="shouldShowNumberInput" :parameter="parameter" />
        <DecimalParameter v-if="shouldShowDecimalInput" :parameter="parameter" />
        <NumberArrayParameter v-if="shouldShowNumberArrayInput" :parameter="parameter" />
        <DatetimeParameter v-if="shouldShowDatetimeInput" :parameter="parameter" />
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
import DecimalParameter from './ParameterTypes/DecimalParameter';
import NumberArrayParameter from './ParameterTypes/NumberArrayParameter';
import DatetimeParameter from './ParameterTypes/DatetimeParameter';
import ParameterDelete from './ParameterDelete';

export default {
  name: 'ParameterRow',
  props: ['parameter', 'criteria'],
  components: {
    BooleanParameter,
    StringParameter,
    NumberParameter,
    DecimalParameter,
    NumberArrayParameter,
    DatetimeParameter,
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
      return this.parameter.type === 'number';
    },
    shouldShowDecimalInput() {
      return this.parameter.type === 'decimal';
    },
    shouldShowNumberArrayInput() {
      return this.parameter.type === 'number_array';
    },
    shouldShowDatetimeInput() {
      return this.parameter.type === 'datetime';
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

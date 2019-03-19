<template>
  <div class="parameter-row">
    <v-layout>
      <v-flex>
        <BooleanParameter v-if="shouldShowBooleanInput" :parameter="parameter"/>
        <StringParameter v-if="shouldShowStringInput" :parameter="parameter"/>
        <NumberParameter v-if="shouldShowNumberInput" :parameter="parameter"/>
        <DecimalParameter v-if="shouldShowDecimalInput" :parameter="parameter"/>
        <NumberArrayParameter v-if="shouldShowNumberArrayInput" :parameter="parameter"/>
        <DatetimeParameter v-if="shouldShowDatetimeInput" :parameter="parameter"/>
      </v-flex>
      <v-flex class="parameter-delete-wrapper" v-if="!parameter.required">
        <ParameterDelete :parameterId="parameter.id" v-if="!parameter.required"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import BooleanParameter from "./ParameterTypes/BooleanParameter";
import StringParameter from "./ParameterTypes/StringParameter";
import NumberParameter from "./ParameterTypes/NumberParameter";
import DecimalParameter from "./ParameterTypes/DecimalParameter";
import NumberArrayParameter from "./ParameterTypes/NumberArrayParameter";
import DatetimeParameter from "./ParameterTypes/DatetimeParameter";
import ParameterDelete from "./ParameterDelete";

export default {
  name: "ParameterRow",
  props: ["parameter", "criteria"],
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
      return this.parameter.type === "boolean";
    },
    shouldShowStringInput() {
      return (
        this.parameter.type === "string" ||
        this.parameter.type === "string_array"
      );
    },
    shouldShowNumberInput() {
      return this.parameter.type === "number";
    },
    shouldShowDecimalInput() {
      return this.parameter.type === "decimal";
    },
    shouldShowNumberArrayInput() {
      return this.parameter.type === "number_array";
    },
    shouldShowDatetimeInput() {
      return this.parameter.type === "datetime";
    }
  }
};
</script>

<style lang="scss">
.parameter-delete-wrapper {
  max-width: 50px;
  margin-left: 30px;
  align-items: center;
  justify-content: flex-end;
  display: flex;
}
.parameter-row {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px dashed #f4f4f4;
  margin-left: -16px;
  padding-left: 16px;
  margin-right: -16px;
  padding-right: 16px;
  &:last-child {
    border: none;
  }
}
</style>

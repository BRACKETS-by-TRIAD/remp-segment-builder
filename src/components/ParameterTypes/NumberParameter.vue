<template>
  <v-layout>
    <v-flex>
      <v-select class="operator operator--first" :items="operators" v-model="selectedOperator1" label="Operator 1"></v-select>
    </v-flex>
    <v-flex>
      <v-text-field v-model="number1" type="number" :rules="numberRules" label="Number 1"></v-text-field>
    </v-flex>
    <v-flex>
      <v-select class="operator" :items="operators" v-model="selectedOperator2" label="Operator 2"></v-select>
    </v-flex>
    <v-flex>
      <v-text-field v-model="number2" type="number" :rules="numberRules" label="Number 2"></v-text-field>
    </v-flex>
  </v-layout>

</template>

<script>
export default {
  name: 'NumberParameter',
  data() {
    return {
      number1: 10,
      number2: null,
      operators: [
        { text: 'Equal', value: 'eq' },
        { text: 'Greater than', value: 'gt' },
        { text: 'Greater or Equal', value: 'gte' },
        { text: 'Lower than', value: 'lt' },
        { text: 'Lower or Equal', value: 'lte' }
      ],
      selectedOperator1: 'eq',
      selectedOperator2: null,
      numberRules: [
        v => !!v || 'Number is required',
        v => /^\d*\.?\d*$/.test(v) || 'Number must be valid'
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.operator {
  width: 155px;
  &:not(&--first) {
    margin-left: 25px;
  }
}
</style>

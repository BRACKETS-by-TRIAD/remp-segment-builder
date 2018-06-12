<template>
  <div>
    <v-layout>
      <v-flex>
        <v-select v-model="selectedOperator1" class="operator" :items="operators" label="Operator 1"></v-select>
      </v-flex>
      <v-flex>
        <v-text-field v-model="number1" type="number" :rules="numberRules" :label="parameter.name" prepend-icon="money"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-select v-model="selectedOperator2" class="operator" :items="operators" label="Operator 2"></v-select>
      </v-flex>
      <v-flex>
        <v-text-field v-model="number2" type="number" :rules="numberRules" :label="parameter.name" prepend-icon="money"></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'NumberParameter',
  props: {
    parameter: Object
  },
  data() {
    return {
      selectedOperator1: null,
      number1: null,
      selectedOperator2: null,
      number2: null,
      operators: [
        { text: 'Equal', value: 'eq' },
        { text: 'Greater than', value: 'gt' },
        { text: 'Greater or Equal', value: 'gte' },
        { text: 'Lower than', value: 'lt' },
        { text: 'Lower or Equal', value: 'lte' }
      ],
      numberRules: [
        v => !!v || 'Number is required',
        v => /^\d*\.?\d*$/.test(v) || 'Number must be valid'
      ]
    };
  },
  created() {
    const value = this.$store.getters.parameterValueById(this.parameter.id);
    if (value && value[0]) {
      this.number1 = value[0].number;
      this.selectedOperator1 = value[0].operator;
    }
    if (value && value[1]) {
      this.number2 = value[1].number;
      this.selectedOperator2 = value[1].operator;
    }
  },
  methods: {
    sendValuesToStore() {
      const parameterId = this.parameter.id;
      const parameterValue = [];
      if (this.selectedOperator1 && this.number1) {
        parameterValue[0] = {
          operator: this.selectedOperator1,
          number: this.number1
        };
      }
      if (this.selectedOperator2 && this.number2) {
        parameterValue[1] = {
          operator: this.selectedOperator2,
          number: this.number2
        };
      }
      return this.$store.commit('setParameterValue', {
        parameterId,
        parameterValue
      });
    }
  },
  watch: {
    number1(value) {
      this.sendValuesToStore();
    },
    selectedOperator1(value) {
      this.sendValuesToStore();
    },
    number2(value) {
      this.sendValuesToStore();
    },
    selectedOperator2(value) {
      this.sendValuesToStore();
    }
  }
};
</script>

<style scoped lang="scss">
.operator {
  width: 155px;
}
</style>

<template>
  <div>
    <v-layout>
        <v-select v-model="selectedOperator1" class="operator" :items="operators" label="Operator 1"></v-select>
        <v-text-field class="operator-value" v-model="number1" type="number" :rules="numberRules" :label="parameter.label" prepend-icon="money"></v-text-field>
    </v-layout>
    <v-layout v-if="selectedOperator1 != 'eq'">
        <v-select v-model="selectedOperator2" class="operator" :items="operators" label="Operator 2"></v-select>
        <v-text-field class="operator-value" v-model="number2" type="number" :rules="numberRules" :label="parameter.label" prepend-icon="money"></v-text-field>
    </v-layout>
    <p class="help-hint">{{ parameter.help }}</p>
  </div>
</template>

<script>

import debounce from 'lodash/debounce';

export default {
  name: 'DecimalParameter',
  props: {
    parameter: Object
  },
  data() {
    return {
      selectedOperator1: 'eq',
      number1: null,
      selectedOperator2: null,
      number2: null,
      operators: [
        { text: 'Is', value: 'eq' },
        { text: 'More than', value: 'gte' },
        { text: 'Less than', value: 'lt' }
      ],
      numberRules: [
        v =>
          // TODO: not required
          /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/.test(v) ||
          'Decimal must be valid'
      ]
    };
  },
  created() {
    const value = this.parameter.value;
    const defaultValue = this.parameter.default;
    if (value) {
      this.setLocalVariablesFromValue(value);
    } else if (defaultValue) {
      this.setLocalVariablesFromValue(defaultValue);
    }
  },
  methods: {
    sendValuesToStore: debounce(function () {
      const parameterId = this.parameter.id;
      const parameterValue = {};
      let shouldSendToStore = false;

      if ((this.number1 || this.number1 == 0) && this.number1.length) {
        parameterValue[this.selectedOperator1] = Number(this.number1);
        shouldSendToStore = true;
      }
      if (
        this.selectedOperator2 &&
        (this.number2 || this.number2 == 0) &&
        this.number2.length
      ) {
        parameterValue[this.selectedOperator2] = Number(this.number2);
        shouldSendToStore = true;
      }

      if(shouldSendToStore) {
        return this.$store.commit('setParameterValue', {
          parameterId,
          parameterValue
        });
      }
    }, 500),

    setLocalVariablesFromValue(data) {
      Object.entries(data).forEach(([key, value], i) => {
        this['selectedOperator' + (i + 1)] = key;
        this['number' + (i + 1)] = String(value);
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
  max-width: 355px;
}
.operator-value {
  max-width: 250px;
  margin-left: 25px;
}
.help-hint {
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  position: relative;
  top: -20px;
}
</style>

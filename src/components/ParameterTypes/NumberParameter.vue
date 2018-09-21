<template>
  <div>
    <v-layout>
      <v-flex>
        <v-select v-model="selectedOperator1" class="operator" :items="operators" label="Operator 1"></v-select>
      </v-flex>
      <v-flex>
        <v-text-field v-model="number1" type="number" :rules="numberRules" :label="parameter.label" prepend-icon="money"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout v-if="selectedOperator1 != 'eq'">
      <v-flex>
        <v-select v-model="selectedOperator2" class="operator" :items="operators" label="Operator 2"></v-select>
      </v-flex>
      <v-flex>
        <v-text-field v-model="number2" type="number" :rules="numberRules" :label="parameter.label" prepend-icon="money"></v-text-field>
      </v-flex>
    </v-layout>
    <p class="help-hint">{{ parameter.help }}</p>
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
        // TODO: not required
        v => /^\s*(\+|-)?\d+\s*$/.test(v) || 'Number must be valid'
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
    sendValuesToStore() {
      const parameterId = this.parameter.id;
      const parameterValue = {};
      if ((this.number1 || this.number1 == 0) && this.number1.length) {
        parameterValue[this.selectedOperator1] = Number(this.number1);
      }
      if (
        this.selectedOperator2 &&
        (this.number2 || this.number2 == 0) &&
        this.number2.length
      ) {
        parameterValue[this.selectedOperator2] = Number(this.number2);
      }
      return this.$store.commit('setParameterValue', {
        parameterId,
        parameterValue
      });
    },
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
  width: 155px;
}
.help-hint {
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  position: relative;
  top: -20px;
}
</style>

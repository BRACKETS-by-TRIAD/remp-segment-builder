<template>
  <v-layout>
    <v-flex>
      <v-select class="operator operator--first" :items="operators" v-model="selectedOperator" label="Operator"></v-select>
    </v-flex>
    <v-flex>
      <v-text-field class="amount" v-model="amount" type="number" :rules="numberRules" label="Amount"></v-text-field>
    </v-flex>
    <v-flex>
      <v-select class="timeframe" :items="timeframes" v-model="selectedTimeframe" label="Timeframe ago" append-icon="restore"></v-select>
    </v-flex>
  </v-layout>

</template>

<script>
export default {
  name: 'IntervalParameter',
  props: {
    parameter: Object
  },
  data() {
    return {
      selectedOperator: 'gt',
      amount: 10,
      selectedTimeframe: 'days',
      operators: [
        { text: 'Equal', value: 'eq' },
        { text: 'Greater than', value: 'gt' },
        { text: 'Greater or Equal', value: 'gte' },
        { text: 'Lower than', value: 'lt' },
        { text: 'Lower or Equal', value: 'lte' }
      ],
      timeframes: [
        { text: 'minutes', value: 'minutes' },
        { text: 'hours', value: 'hours' },
        { text: 'days', value: 'days' },
        { text: 'weeks', value: 'weeks' },
        { text: 'months', value: 'months' },
        { text: 'years', value: 'years' }
      ],
      numberRules: [
        v => !!v || 'Number is required',
        v => /^\d*\.?\d*$/.test(v) || 'Number must be valid'
      ]
    };
  },
  created() {
    const value = this.$store.getters.parameterValueById(this.parameter.id);
    if (value) {
      this.amount = value.amount;
      this.operator = value.operator;
      this.timeframe = value.timeframe;
    }
  },
  methods: {
    sendValuesToStore() {
      const parameterId = this.parameter.id;
      const parameterValue = {
        amount: this.amount,
        timeframe: this.selectedTimeframe,
        operator: this.selectedOperator
      };

      return this.$store.commit('setParameterValue', {
        parameterId,
        parameterValue
      });
    }
  },
  watch: {
    selectedOperator(value) {
      this.sendValuesToStore();
    },
    amount(value) {
      this.sendValuesToStore();
    },
    selectedTimeframe(value) {
      this.sendValuesToStore();
    }
  }
};
</script>

<style scoped lang="scss">
.operator {
  width: 155px;
}
.amount {
  margin-left: 10px;
}
.timeframe {
  width: 150px;
  margin-left: 18px;
}
</style>

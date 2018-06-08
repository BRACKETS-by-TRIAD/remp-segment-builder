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
  }
};
</script>

<style scoped lang="scss">
.operator {
  width: 155px;
  margin-right: 25px;
}
.amount {
}
.timeframe {
  width: 150px;
  margin-left: 25px;
}
</style>

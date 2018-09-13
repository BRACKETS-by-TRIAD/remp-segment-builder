<template>
  <div>
    <v-layout>
      <v-flex>
        <v-select class="operator operator--first" :items="operators" v-model="selectedOperator1" label="Operator"></v-select>
      </v-flex>
      <v-flex>
        <v-text-field class="amount" v-model="amount1" type="number" :disabled="selectedTimeframe1==='now'" :rules="numberRules" label="Amount"></v-text-field>
      </v-flex>
      <v-flex>
        <v-select class="timeframe" :items="timeframes" v-model="selectedTimeframe1" label="Timeframe" append-icon="restore"></v-select>
      </v-flex>
    </v-layout>
    <v-layout v-if="selectedOperator1 !== 'eq'">
      <v-flex>
        <v-select class="operator operator--first" :items="operators" v-model="selectedOperator2" label="Operator"></v-select>
      </v-flex>
      <v-flex>
        <v-text-field class="amount" v-model="amount2" type="number" :disabled="selectedTimeframe2==='now'" :rules="numberRules" label="Amount"></v-text-field>
      </v-flex>
      <v-flex>
        <v-select class="timeframe" :items="timeframes" v-model="selectedTimeframe2" label="Timeframe" append-icon="restore"></v-select>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_green.css';

export default {
  name: 'AbsoluteDatetimeParameter',
  components: { flatPickr },
  props: {
    parameter: Object
  },
  data() {
    return {
      selectedOperator1: 'eq',
      amount1: null,
      selectedTimeframe1: 'day-past',
      selectedOperator2: null,
      amount2: null,
      selectedTimeframe2: 'day-past',
      operators: [
        { text: 'Equal', value: 'eq' },
        { text: 'Greater than', value: 'gt' },
        { text: 'Greater or Equal', value: 'gte' },
        { text: 'Lower than', value: 'lt' },
        { text: 'Lower or Equal', value: 'lte' }
      ],
      timeframes: [
        { text: 'now', value: 'now' },
        { text: 'hours ago', value: 'hour-past' },
        { text: 'hours from now', value: 'hour-future' },
        { text: 'days ago', value: 'day-past' },
        { text: 'days from now', value: 'day-future' },
        { text: 'months ago', value: 'month-past' },
        { text: 'months from now', value: 'month-future' }
      ],
      numberRules: [
        v => !!v || 'Number is required',
        v => /^\d*\.?\d*$/.test(v) || 'Number must be valid'
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
      const parameterValue = {
        type: 'interval',
        interval: {}
      };

      if (this.amount1 && new RegExp(/^\d*\.?\d*$/).test(this.amount1)) {
        const unit = this.selectedTimeframe1.split('-').shift();
        const value =
          this.selectedTimeframe1.split('-').pop() === 'past'
            ? -Math.abs(Number(this.amount1))
            : Math.abs(Number(this.amount1));
        parameterValue.interval[this.selectedOperator1] = {
          value,
          unit
        };
      }
      if (this.amount2 && new RegExp(/^\d*\.?\d*$/).test(this.amount2)) {
        const unit = this.selectedTimeframe2.split('-').shift();
        const value =
          this.selectedTimeframe2.split('-').pop() === 'past'
            ? -Math.abs(Number(this.amount2))
            : Math.abs(Number(this.amount2));
        parameterValue.interval[this.selectedOperator2] = {
          value,
          unit
        };
      }
      if (this.selectedTimeframe1 === 'now') {
        parameterValue.interval[this.selectedOperator1] = { unit: 'now' };
      }
      if (this.selectedTimeframe2 === 'now') {
        parameterValue.interval[this.selectedOperator2] = { unit: 'now' };
      }

      return this.$store.commit('setParameterValue', {
        parameterId,
        parameterValue
      });
    },
    setLocalVariablesFromValue(data) {
      if (!data.interval) return;

      Object.entries(data.interval).forEach(([key, interval], i) => {
        this['selectedOperator' + (i + 1)] = key;
        this['amount' + (i + 1)] = interval.value
          ? Math.abs(interval.value)
          : null;

        let unit;
        if (interval.unit === 'now') {
          unit = interval.unit;
        } else if (interval.value >= 0) {
          unit = interval.unit + '-future';
        } else if (interval.value < 0) {
          unit = interval.unit + '-past';
        }

        this['selectedTimeframe' + (i + 1)] = unit;
      });
    }
  },
  watch: {
    selectedOperator1(value) {
      this.sendValuesToStore();
    },
    amount1(value) {
      this.sendValuesToStore();
    },
    selectedTimeframe1(value) {
      this.sendValuesToStore();
    },
    selectedOperator2(value) {
      this.sendValuesToStore();
    },
    amount2(value) {
      this.sendValuesToStore();
    },
    selectedTimeframe2(value) {
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
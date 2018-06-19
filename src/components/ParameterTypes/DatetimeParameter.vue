<template>
  <div>
    <v-layout>
      <v-flex>
        <v-select class="operator operator--first" :items="operators" v-model="selectedOperator1" label="Operator 1"></v-select>
      </v-flex>
      <v-flex>
        <div class="input-group input-group--prepend-icon input-group--text-field primary--text">
          <label v-if="!date1">{{ parameter.name }}</label>
          <div class="input-group__input">
            <i aria-hidden="true" class="icon material-icons input-group__prepend-icon">event</i>
            <flat-pickr v-model="date1" :config="datetimePickerConfig"></flat-pickr>
          </div>
          <div class="input-group__details"></div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-select class="operator operator--first" :items="operators" v-model="selectedOperator2" label="Operator 2"></v-select>
      </v-flex>
      <v-flex>
        <div class="input-group input-group--prepend-icon input-group--text-field primary--text">
          <label v-if="!date2">{{ parameter.name }}</label>
          <div class="input-group__input">
            <i aria-hidden="true" class="icon material-icons input-group__prepend-icon">event</i>
            <flat-pickr v-model="date2" :config="datetimePickerConfig"></flat-pickr>
          </div>
          <div class="input-group__details"></div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_green.css';

export default {
  name: 'DatetimeParameter',
  components: { flatPickr },
  props: {
    parameter: Object
  },
  data() {
    return {
      selectedOperator1: null,
      date1: null,
      selectedOperator2: null,
      date2: null,
      operators: [
        { text: 'Equal', value: 'eq' },
        { text: 'Greater than', value: 'gt' },
        { text: 'Greater or Equal', value: 'gte' },
        { text: 'Lower than', value: 'lt' },
        { text: 'Lower or Equal', value: 'lte' }
      ],
      datetimePickerConfig: {
        enableTime: true,
        time_24hr: true,
        enableSeconds: true,
        dateFormat: 'Z',
        altInput: true,
        altFormat: 'd.m.Y H:i:S'
      }
    };
  },
  created() {
    const value = this.$store.getters.parameterValueById(this.parameter.id);
    if (value && value[0]) {
      this.date1 = value[0].value;
      this.selectedOperator1 = value[0].operator;
    }
    if (value && value[1]) {
      this.date2 = value[1].value;
      this.selectedOperator2 = value[1].operator;
    }
  },
  methods: {
    sendValuesToStore() {
      const parameterId = this.parameter.id;
      const parameterValue = [];
      if (this.selectedOperator1 && this.date1) {
        parameterValue[0] = {
          operator: this.selectedOperator1,
          value: this.date1
        };
      }
      if (this.selectedOperator2 && this.date2) {
        parameterValue[1] = {
          operator: this.selectedOperator2,
          value: this.date2
        };
      }
      return this.$store.commit('setParameterValue', {
        parameterId,
        parameterValue
      });
    }
  },
  watch: {
    date1(value) {
      this.sendValuesToStore();
    },
    selectedOperator1(value) {
      this.sendValuesToStore();
    },
    date2(value) {
      this.sendValuesToStore();
    },
    selectedOperator2(value) {
      this.sendValuesToStore();
    }
  }
};
</script>

<style lang="scss">
.operator {
  width: 155px;
}

// override default flatpickr styles
$calendarColor: #3477cc;
$calendarBorderRadius: 3px;

.flatpickr-calendar {
  font-family: Roboto, sans-serif !important;
  border-radius: $calendarBorderRadius;
}
.flatpickr-months .flatpickr-month {
  border-top-left-radius: $calendarBorderRadius;
  border-top-right-radius: $calendarBorderRadius;
}
.flatpickr-time {
  border-bottom-left-radius: $calendarBorderRadius;
  border-bottom-right-radius: $calendarBorderRadius;
}
span.flatpickr-weekday {
  color: white;
}
.flatpickr-calendar.arrowTop:after {
  border-bottom-color: $calendarColor;
}
.flatpickr-calendar.arrowBottom:after {
  border-top-color: $calendarColor;
}
.flatpickr-months .flatpickr-month,
.flatpickr-weekdays,
span.flatpickr-weekday,
.flatpickr-months .flatpickr-month {
  background: $calendarColor;
}
.flatpickr-day.selected,
.flatpickr-day.startRange,
.flatpickr-day.endRange,
.flatpickr-day.selected.inRange,
.flatpickr-day.startRange.inRange,
.flatpickr-day.endRange.inRange,
.flatpickr-day.selected:focus,
.flatpickr-day.startRange:focus,
.flatpickr-day.endRange:focus,
.flatpickr-day.selected:hover,
.flatpickr-day.startRange:hover,
.flatpickr-day.endRange:hover,
.flatpickr-day.selected.prevMonthDay,
.flatpickr-day.startRange.prevMonthDay,
.flatpickr-day.endRange.prevMonthDay,
.flatpickr-day.selected.nextMonthDay,
.flatpickr-day.startRange.nextMonthDay,
.flatpickr-day.endRange.nextMonthDay {
  background: $calendarColor;
  border-color: $calendarColor;
}
.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n + 1)),
.flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n + 1)),
.flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n + 1)) {
  -webkit-box-shadow: -10px 0 0 $calendarColor;
  box-shadow: -10px 0 0 $calendarColor;
}
.flatpickr-day.week.selected {
  -webkit-box-shadow: -5px 0 0 $calendarColor, 5px 0 0 $calendarColor;
  box-shadow: -5px 0 0 $calendarColor, 5px 0 0 $calendarColor;
}
.flatpickr-months .flatpickr-prev-month:hover svg,
.flatpickr-months .flatpickr-next-month:hover svg {
  fill: white;
}
</style>

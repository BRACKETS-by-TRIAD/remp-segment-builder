<template>
  <div>
    <v-layout>
      <v-flex sm6>
        <v-select class="absolute-operator" :items="operators" v-model="selectedOperator1" label="Operator 1"></v-select>
      </v-flex>
      <v-flex sm6>
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
    <v-layout v-if="selectedOperator1 !== 'eq'">
      <v-flex sm6>
        <v-select class="absolute-operator" :items="operators" v-model="selectedOperator2" label="Operator 2"></v-select>
      </v-flex>
      <v-flex sm6>
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
  name: 'RelativeDatetimeParameter',
  components: { flatPickr },
  props: {
    parameter: Object
  },
  data() {
    return {
      dateTimeType: 'absolute',
      selectedOperator1: 'eq',
      date1: null,
      selectedOperator2: null,
      date2: null,
      operators: [
        { text: 'Is', value: 'eq' },
        { text: 'After', value: 'gte' },
        { text: 'Before', value: 'lt' }
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
    const value = this.parameter.value;
    const defaultValue = this.parameter.default;
    if (value) {
      this.setLocalVariablesFromValue(value);
    } else if (defaultValue) {
      this.setLocalVariablesFromValue(defaultValue);
    }
  },
  computed: {
    date1InCorrectFormatForServer() {
      return this.date1.split('.').shift() + 'Z';
    },
    date2InCorrectFormatForServer() {
      return this.date2.split('.').shift() + 'Z';
    }
  },
  methods: {
    sendValuesToStore() {
      const parameterId = this.parameter.id;
      const parameterValue = {
        type: 'absolute',
        absolute: {}
      };
      if (!this.date1 && !this.date2) return;

      if (this.date1) {
        parameterValue.absolute[
          this.selectedOperator1
        ] = this.date1InCorrectFormatForServer;
      }

      if (this.selectedOperator2 && this.date2) {
        parameterValue.absolute[
          this.selectedOperator2
        ] = this.date2InCorrectFormatForServer;
      }
      return this.$store.commit('setParameterValue', {
        parameterId,
        parameterValue
      });
    },
    setLocalVariablesFromValue(data) {
      if (!data.absolute) return;

      Object.entries(data.absolute).forEach(([key, value], i) => {
        this['selectedOperator' + (i + 1)] = key;
        this['date' + (i + 1)] = value.slice(0, -1) + '.000' + 'Z';
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
.absolute-operator {
  padding-right: 30px;
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

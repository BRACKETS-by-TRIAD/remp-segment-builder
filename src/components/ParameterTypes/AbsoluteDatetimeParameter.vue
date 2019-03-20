<template>
  <div>
    <v-layout>
      <v-select
        class="absolute-operator"
        :items="operators"
        v-model="selectedOperatorFrontend"
        label="Operator 1"
      ></v-select>

      <v-flex lg3 v-if="selectedOperatorFrontend === 'gte-lt'">
        <v-text-field
          label="Date range"
          @click="openDialog"
          prepend-icon="event"
          readonly
          :value="(date1 && date2) ? date1Formated + ' to ' + date2Formated : null"
        ></v-text-field>
      </v-flex>

      <div v-if="selectedOperatorFrontend !== 'gte-lt'" class="flatpickr-custom-input">
        <i aria-hidden="true" class="icon material-icons input-group__prepend-icon">event</i>
        <flat-pickr v-model="date1" :config="datetimePickerConfig"></flat-pickr>
      </div>
    </v-layout>

    <v-layout v-if="selectedOperatorFrontend !== 'gte-lt'">
      <v-select
        class="absolute-operator"
        :items="operators"
        v-model="selectedOperator2"
        label="Operator 2"
      ></v-select>

      <div class="flatpickr-custom-input">
        <i aria-hidden="true" class="icon material-icons input-group__prepend-icon">event</i>
        <flat-pickr v-model="date2" :config="datetimePickerConfig"></flat-pickr>
      </div>
    </v-layout>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline text-xs-center">Date Range</span>
        </v-card-title>

        <v-tabs v-model="dateRangeType" slider-color="primary" centered>
          <v-tab href="#day" ripple>Day</v-tab>
          <v-tab href="#week" ripple>Week</v-tab>
          <v-tab href="#month" ripple>Month</v-tab>

          <v-tab-item value="day" active>
            <v-layout justify-center>
              <flat-pickr v-model="dateRangeDay" :config="datePickerConfig"></flat-pickr>
            </v-layout>
          </v-tab-item>

          <v-tab-item value="week">
            <v-layout justify-center>
              <flat-pickr v-model="dateRangeWeek" :config="weekPickerConfig"></flat-pickr>
            </v-layout>
          </v-tab-item>

          <v-tab-item value="month">
            <v-layout justify-center>
              <datepicker
                v-model="dateRangeMonth"
                :minimumView="'month'"
                :maximumView="'month'"
                name="monthPicker"
                inline
                @opened="datepickerOpenedFunction"
                @closed="datepickerClosedFunction"
                @selected="datepickerClosedFunction"
                @cleared="datepickerClosedFunction"
              ></datepicker>
            </v-layout>
          </v-tab-item>
        </v-tabs>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="onDialogSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import weekSelectPlugin from "flatpickr/dist/plugins/weekSelect/weekSelect";
import Datepicker from "vuejs-datepicker";
import moment from "moment-timezone";
// import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/monthSelect';

import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/material_green.css";
// import 'flatpickr/dist/plugins/monthSelect/monthSelect.css';

export default {
  name: "RelativeDatetimeParameter",
  components: { flatPickr, Datepicker },
  props: {
    parameter: Object,
    isFocused: Boolean
  },
  data() {
    return {
      dateTimeType: "absolute",
      dateRangeType: "day",
      selectedOperatorFrontend: "gte-lt",
      selectedOperator1: "gte-lt",
      date1: null,
      selectedOperator2: null,
      date2: null,

      dateRangeDay: null,
      dateRangeWeek: null,
      dateRangeMonth: null,

      // dateRangeWeekFrontend: null,

      dateRangeWeekFrom: null,
      dateRangeWeekTo: null,
      dateRangeMonthFrom: null,
      dateRangeMonthTo: null,

      operators: [
        { text: "Is", value: "gte-lt" },
        { text: "After", value: "gte" },
        { text: "Before", value: "lt" }
      ],
      datetimePickerConfig: {
        enableTime: true,
        time_24hr: true,
        enableSeconds: true,
        dateFormat: "Z",
        altInput: true,
        altFormat: "d.m.Y H:i:S"
      },
      datePickerConfig: {
        enableTime: false,
        time_24hr: false,
        enableSeconds: false,
        dateFormat: "Z",
        altInput: true,
        altFormat: "d.m.Y",
        inline: true
      },
      weekPickerConfig: {
        plugins: [new weekSelectPlugin({})],
        dateFormat: "Z",
        altInput: true,
        altFormat: "d.m.Y",
        enableTime: false,
        inline: true
      },
      //https://github.com/flatpickr/flatpickr/issues/1438 buhuhuu :(
      // https://github.com/flatpickr/flatpickr/issues/269
      // monthPickerConfig: {
      //   plugins: [new monthSelectPlugin({})],
      //   dateFormat: 'Z',
      //   altInput: true,
      //   altFormat: 'd.m.Y',
      //   enableTime: false,
      // },
      dialog: false
    };
  },
  created() {
    flatpickr.l10ns.default.firstDayOfWeek = 1;

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
      console.log(this.date1);
      return moment(this.date1).toISOString();
    },
    date2InCorrectFormatForServer() {
      return moment(this.date2).toISOString();
    },
    date1Formated() {
      return moment(this.date1).format("DD.MM. YYYY");
    },
    date2Formated() {
      return moment(this.date2).format("DD.MM. YYYY");
    },
    dateRangeWeekFromFormated() {
      return moment(this.dateRangeWeekFrom).format("DD.MM. YYYY");
    },
    dateRangeWeekToFormated() {
      return moment(this.dateRangeWeekTo).format("DD.MM. YYYY");
    },
    dateRangeMonthFromFormated() {
      return moment(this.dateRangeMonthFrom).format("DD.MM. YYYY");
    },
    dateRangeMonthToFormated() {
      return moment(this.dateRangeMonthTo).format("DD.MM. YYYY");
    }
  },
  methods: {
    sendValuesToStore() {
      const parameterId = this.parameter.id;
      const parameterValue = {
        type: "absolute",
        absolute: {}
      };
      if (!this.date1 && !this.date2) {
        return this.$store.commit("setParameterValue", {
          parameterId,
          parameterValue: null
        });
      }

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
      return this.$store.commit("setParameterValue", {
        parameterId,
        parameterValue
      });
    },
    setLocalVariablesFromValue(data) {
      if (!data.absolute) return;

      Object.entries(data.absolute).forEach(([key, value], i) => {
        if (i === 0) {
          this.selectedOperatorFrontend = key;
        }

        setTimeout(() => {
          this["selectedOperator" + (i + 1)] = key;
          this["date" + (i + 1)] = value;
        }, 0);
      });
    },
    openDialog() {
      this.dialog = true;

      document
        .querySelector(".v-dialog")
        .addEventListener("click", function(e) {
          if (e.target.nodeName.toLowerCase() != "input") {
            document.querySelector(".v-dialog .v-tabs__wrapper").style[
              "overflow"
            ] = "hidden";
          }
        });

      if (this.date1 && this.date2) {
        const interval = moment.duration(moment(this.date2).diff(this.date1)),
          diffDays = Math.floor(interval.asDays());

        if (diffDays == 1) {
          this.dateRangeDay = this.date1;
          this.dateRangeWeek = null;
          this.dateRangeMonth = null;

          this.dateRangeType = "day";
        } else if (diffDays == 7) {
          // this.dateRangeWeekFrom = this.date1;
          // this.dateRangeWeekTo = this.date2;

          this.dateRangeDay = null;
          this.dateRangeWeek = this.date1;
          this.dateRangeMonth = null;

          this.dateRangeType = "week";
        } else if (diffDays > 27) {
          //   this.dateRangeMonthFrom = this.date1;
          // this.dateRangeMonthTo = this.date2;
          this.dateRangeDay = null;
          this.dateRangeWeek = null;
          this.dateRangeMonth = this.date1;

          this.dateRangeType = "month";
        }
      } else {
        this.dateRangeDay = null;
        this.dateRangeWeek = null;
        this.dateRangeMonth = null;

        // this.dateRangeWeekTo = null;
        // this.dateRangeWeekFrom = null;

        this.dateRangeType = "week";
      }
    },
    onDialogSave() {
      this.dialog = false;

      this.selectedOperatorFrontend = "gte-lt";
      this.selectedOperator1 = "gte";
      this.selectedOperator2 = "lt";

      if (this.dateRangeType == "day") {
        const value = this.dateRangeDay;
        const dayStart = new Date(value);
        const dayEnd = this.addDays(dayStart, 1);

        dayStart.setMinutes(0);
        dayStart.setHours(0);
        dayEnd.setMinutes(0);
        dayEnd.setHours(0);

        this.date1 = dayStart;
        this.date2 = dayEnd;
      } else if (this.dateRangeType == "week") {
        this.date1 = this.dateRangeWeekFrom;
        this.date2 = this.dateRangeWeekTo;
      } else if (this.dateRangeType == "month") {
        this.date1 = this.dateRangeMonthFrom;
        this.date2 = this.dateRangeMonthTo;
      }
    },
    getMonday(date) {
      const day = date.getDay(),
        diff = date.getDate() - day + (day == 0 ? -6 : 1);

      return new Date(date.setDate(diff));
    },
    addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);

      return result;
    },
    datepickerOpenedFunction() {
      document.querySelector(".v-dialog .v-tabs__wrapper").style["overflow"] =
        "visible";
    },
    datepickerClosedFunction() {
      document.querySelector(".v-dialog .v-tabs__wrapper").style["overflow"] =
        "hidden";
    }
  },
  watch: {
    isFocused(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.date1 = "";
        this.date2 = null;
        (this.selectedOperator1 = "gte-lt"), (this.selectedOperator2 = null);
      }
    },
    selectedOperatorFrontend(value) {
      if (value === "gte-lt") {
        this.selectedOperator1 = null;
        this.selectedOperator2 = null;
      } else if (value === "gte") {
        this.selectedOperator1 = "gte";
        this.selectedOperator2 = null;
      } else if (value === "lt") {
        this.selectedOperator1 = "lt";
        this.selectedOperator2 = null;
      }

      this.date1 = null;
      this.date2 = null;
    },
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
      if (value === "gte-lt") {
        this.selectedOperatorFrontend = "gte-lt";
        this.selectedOperator1 = null;
        this.selectedOperator2 = null;
      } else {
        this.sendValuesToStore();
      }
    },
    // dateRangeWeekFrontend(value) {
    //   if(value) {
    //     this.dateRangeWeek = value;
    //     this.dateRangeWeekFrontend = new Date();
    //   }
    // },
    dateRangeWeek(value) {
      if (value) {
        const date = new Date(value),
          monday = this.getMonday(date),
          sunday = this.addDays(monday, 7);

        monday.setMinutes(0);
        monday.setHours(0);
        sunday.setMinutes(0);
        sunday.setHours(0);

        this.dateRangeWeekFrom = monday;
        this.dateRangeWeekTo = sunday;
      } else {
        this.dateRangeWeekFrom = null;
        this.dateRangeWeekTo = null;
      }
    },
    dateRangeMonth(value) {
      if (value) {
        const date = new Date(value),
          year = date.getFullYear(),
          month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const firstDayOfNewMonth = new Date(year, month + 1, 1);

        firstDay.setMinutes(0);
        firstDay.setHours(0);
        firstDayOfNewMonth.setMinutes(0);
        firstDayOfNewMonth.setHours(0);

        this.dateRangeMonthFrom = firstDay;
        this.dateRangeMonthTo = firstDayOfNewMonth;
      } else {
        this.dateRangeMonthFrom = null;
        this.dateRangeMonthTo = null;
      }
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
.flatpickr-custom-input {
  .flatpickr-input {
    border-bottom: 1px solid #949494;
    width: 200px;
    position: relative;
    top: 18px;
    left: 10px;
  }
  .icon {
    position: relative;
    top: 20px;
    color: rgba(0, 0, 0, 0.54);
  }
}
.absolute-operator {
  max-width: 250px;
}
.timeframe {
  max-width: 190px;
}
.timeframeInModal {
  max-width: 190px;
  input {
    color: rgba(0, 0, 0, 0.54) !important;
  }
}
.timeframeDateRange {
  max-width: 240px;
  input {
    color: transparent !important;
  }
}
.timeframeDateRangeInModal {
  max-width: 255px;
  input {
    color: transparent !important;
  }
}
.v-dialog {
  overflow: visible;
  .headline {
    width: 100%;
  }
  .flatpickr-input {
    display: none;
  }
  .tabs__items {
    // overflow: visible;
  }
}
.no-wrap {
  white-space: nowrap;
}
.vdp-datepicker {
  font-family: Roboto, sans-serif !important;

  .vdp-datepicker__calendar {
    border: none;
    border-radius: $calendarBorderRadius;
    overflow: hidden;

    -webkit-box-shadow: 0 3px 13px rgba(0, 0, 0, 0.08);
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.08);
  }

  header {
    .month__year_btn,
    .prev,
    .next {
      background: #3477cc;
    }

    .month__year_btn {
      font-weight: 700;
      font-size: 19px;
      color: white;
      &:hover,
      &:active {
        background: #3477cc !important;
      }
    }

    .prev,
    .next {
      -webkit-transition: 0.25s ease;
      transition: 0.25s ease;
      &:hover,
      &:active {
        background: #2a62ab !important;
      }
    }

    .prev:after {
      border-right: 10px solid white !important;
    }

    .next:after {
      border-left: 10px solid white !important;
    }
  }

  .cell {
    font-size: 14px;
    color: #484848;
    &:hover,
    &.selected,
    &.selected:hover {
      border-radius: 0;
      background: #e2e2e2 !important;
      border-color: #e2e2e2 !important;
    }
  }
}
</style>

<template>
  <div>
    <v-layout>
      <v-flex>
        <span class="datetime-label">{{ parameter.label }}</span>
        <v-tabs v-model="dateTimeType" slider-color="primary">
          <v-tab href="#absolute" ripple>Absolute</v-tab>
          <v-tab href="#interval" ripple>Relative</v-tab>
          <v-tab-item value="absolute">
            <AbsoluteDatetimeParameter
              :parameter="parameter"
              :isFocused="dateTimeType == 'absolute'"
            />
          </v-tab-item>
          <v-tab-item value="interval">
            <RelativeDatetimeParameter
              :parameter="parameter"
              :isFocused="dateTimeType == 'interval'"
            />
          </v-tab-item>
        </v-tabs>
        <p class="help-hint help-hint--without-margin">{{ parameter.help }}</p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import RelativeDatetimeParameter from "./RelativeDatetimeParameter";
import AbsoluteDatetimeParameter from "./AbsoluteDatetimeParameter";

export default {
  name: "DatetimeParameter",
  components: {
    RelativeDatetimeParameter,
    AbsoluteDatetimeParameter
  },
  props: {
    parameter: Object
  },
  data() {
    return {
      dateTimeType: this.parameter.value
        ? this.parameter.value.type
        : "absolute"
    };
  },
  watch: {
    dateTimeType(value) {
      this.$store.commit("setParameterValue", {
        parameterId: this.parameter.id,
        parameterValue: null
      });
    }
  }
};
</script>

<style lang="scss">
.datetime-label {
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
}
.v-tabs__bar {
  margin-bottom: 20px;
}
.help-hint {
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  position: relative;
  top: -15px;
  &--without-margin {
    margin-bottom: 0;
  }
}
</style>

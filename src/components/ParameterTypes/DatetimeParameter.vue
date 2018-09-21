<template>
  <div>

    <v-layout>
      <v-flex>
        <span class="datetime-label">
          {{ parameter.label }}
        </span>
        <v-tabs v-model="dateTimeType" slider-color="primary">
          <v-tab href="#absolute" ripple>Absolute</v-tab>
          <v-tab href="#interval" ripple>Relative</v-tab>
          <v-tab-item id="absolute">
            <AbsoluteDatetimeParameter :parameter="parameter" />
          </v-tab-item>
          <v-tab-item id="interval">
            <RelativeDatetimeParameter :parameter="parameter" />
          </v-tab-item>
        </v-tabs>
        <p class="help-hint help-hint--without-margin">{{ parameter.help }}</p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import RelativeDatetimeParameter from './RelativeDatetimeParameter';
import AbsoluteDatetimeParameter from './AbsoluteDatetimeParameter';

export default {
  name: 'DatetimeParameter',
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
        : 'absolute'
    };
  }
};
</script>

<style lang="scss">
.datetime-label {
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
}
.tabs__bar {
  margin-bottom: 20px;
}
.help-hint {
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  position: relative;
  top: -20px;
  &--without-margin {
    margin-bottom: 0;
  }
}
</style>

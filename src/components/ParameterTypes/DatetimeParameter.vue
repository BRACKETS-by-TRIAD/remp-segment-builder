<template>
  <div>

    <v-layout>
      <v-flex>
        <v-tabs v-model="dateTimeType" centered slider-color="primary">
          <v-tab href="#absolute" ripple>Absolute</v-tab>
          <v-tab href="#relative" ripple>Relative</v-tab>
          <v-tab-item id="absolute">
            <AbsoluteDatetimeParameter :parameter="parameter" />
          </v-tab-item>
          <v-tab-item id="relative">
            <RelativeDatetimeParameter :parameter="parameter" />
          </v-tab-item>
        </v-tabs>
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
      dateTimeType: 'absolute'
    };
  }
};
</script>

<style lang="scss" scoped>
.tabs__bar {
  margin-bottom: 20px;
}
</style>

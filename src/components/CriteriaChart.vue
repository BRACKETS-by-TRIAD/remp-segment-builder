<template>
  <div>
    <v-progress-circular :size="100" :width="15" :rotate="-90" :value="value" :indeterminate="false" color="primary">
      <span class="graph-percent">
        {{ value }}%
      </span>
    </v-progress-circular>
    <span class="graph-number grey--text text--darken-3">{{ 12345 | currency('', 0, { thousandsSeparator: ' ' }) }}</span>
  </div>

</template>

<script>
export default {
  name: 'CriteriaChart',
  data() {
    return {
      value: 25
    };
  }
};
</script>

<style scoped>
.graph-percent {
  font-weight: 500;
}
.graph-number {
  display: block;
  text-align: center;
  font-weight: 500;
}
</style>


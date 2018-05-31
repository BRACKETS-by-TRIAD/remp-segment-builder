<template>
  <div>
    <v-progress-circular :size="100" :width="15" :rotate="-90" :value="value" color="primary">
      <span class="graph-percent">
        {{ value }}%
      </span>
    </v-progress-circular>
    <span class="graph-number grey--text text--darken-3">12 345</span>
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
  color: rgba(0, 0, 0, 0.87);
}
</style>


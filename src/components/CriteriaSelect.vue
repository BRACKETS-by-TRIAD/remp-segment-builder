<template>
  <div>
    <v-select :items="criteriaForSelectedTable" v-model="bem" item-text="label" item-value="key" label="Select criteria" autocomplete class="criteria-select" append-icon="insert_chart" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CriteriaSelect',
  data() {
    return {
      bem: []
    };
  },
  computed: {
    ...mapGetters(['criteriaForSelectedTable'])
    // selectedFields: {
    //   get() {
    //     return this.$store.state.selectedFields;
    //   },
    //   set(value) {
    //     return this.$store.commit('setSelectedFields', value);
    //   }
    // }
  }
};
</script>

<style scoped>
.criteria-select {
  max-width: 200px;
}
</style>
<template>
  <v-btn-toggle light v-model="selectedTable" mandatory>
    <v-btn flat v-for="tableName in tableNames" :key="tableName" :value="tableName">
      {{ tableName }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TablePicker',
  computed: {
    ...mapGetters(['tableNames']),
    selectedTable: {
      get() {
        return this.$store.state.selectedTable;
      },
      set(value) {
        this.$store.commit('setSelectedTable', value);
        this.$store.dispatch('fetchCounterAllTotal');
      }
    }
  }
};
</script>

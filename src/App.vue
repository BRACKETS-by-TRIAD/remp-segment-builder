<template>
  <v-app id="app">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Select table to make a segment:</v-toolbar-title>
              <v-spacer></v-spacer>
              <TablePicker/>
            </v-toolbar>

            <v-card-text>
              <FieldsPicker class="fields-picker" />

              <CriteriaRow v-for="(criteria, index) in selectedCriterias" :key="index" :criteriaIndex="index" class="mb-3" />

              <div class="text-xs-center">
                <CriteriaAdd />
              </div>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <Notification />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import Notification from './components/Notification';
import TablePicker from './components/TablePicker';
import FieldsPicker from './components/FieldsPicker';
import CriteriaRow from './components/CriteriaRow';
import CriteriaAdd from './components/CriteriaAdd';

export default {
  name: 'app',
  components: {
    Notification,
    TablePicker,
    FieldsPicker,
    CriteriaRow,
    CriteriaAdd
  },
  created() {
    this.$store.dispatch('fetchTablesBlueprint');
  },
  computed: {
    ...mapState(['selectedCriterias'])
  }
};
</script>

<style>
.fields-picker {
  max-width: calc(100% - 164px);
  margin-left: 20px;
}
</style>

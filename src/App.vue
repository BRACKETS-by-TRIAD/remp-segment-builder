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
              <FieldsPicker />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <Notification />
  </v-app>
</template>

<script>
import Notification from './components/Notification';
import TablePicker from './components/TablePicker';
import FieldsPicker from './components/FieldsPicker';

export default {
  name: 'app',
  components: {
    Notification,
    TablePicker,
    FieldsPicker
  },
  created() {
    this.$store.dispatch('fetchTablesBlueprint');
  }
};
</script>

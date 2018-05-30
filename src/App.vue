<template>
  <v-app id="app">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8>
          <v-card class="elevation-12">
            <v-card-text>
              <TablePicker/>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <Notification />
  </v-app>
</template>

<script>
import axios from 'axios';

import TablePicker from './components/TablePicker';
import Notification from './components/Notification';

export default {
  name: 'app',
  components: {
    TablePicker,
    Notification
  },
  created() {
    axios
      .get('http://remp-segment.mminar.com/definition.jsonn')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        this.$store.commit('notification', {
          show: true,
          color: 'red',
          text: 'Error fetching blueprint'
        });
      });
  }
};
</script>

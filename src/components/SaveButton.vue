<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-btn slot="activator" color="green" dark large>
      <v-icon left dark>cloud_done</v-icon> {{ segmentID ? 'Update' : 'Save' }}
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Save segment</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Name of the segment" v-model="segmentName"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select :items="orderedSegmentCategories" item-text="name" item-value="id" label="Category of the segment" v-model="segmentCategory"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import * as fromConfig from '../config.js';

export default {
  name: 'SaveButton',
  data() {
    return {
      dialog: false,
      segmentID: fromConfig.SEGMENT_ID
    };
  },
  computed: {
    ...mapGetters(['orderedSegmentCategories']),
    segmentName: {
      get() {
        return this.$store.state.segmentName;
      },
      set(value) {
        return this.$store.dispatch('setSegmentName', value);
      }
    },
    segmentCategory: {
      get() {
        return this.$store.state.segmentCategoryID;
      },
      set(value) {
        console.log(value);
        return this.$store.dispatch('setSegmentCategoryID', value);
      }
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss"></style>

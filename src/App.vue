<template>
  <v-app id="app">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8>
          <v-card class="elevation-12" :class="{unclickable: savingSegmentLoading}">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Select table to make a segment:</v-toolbar-title>
              <v-spacer></v-spacer>
              <TablePicker/>
            </v-toolbar>

            <v-card-text>
              <FieldsPicker class="fields-picker" />

              <CriteriaRow v-for="criteria in selectedCriterias" :key="criteria.id" :criteria="criteria" class="mb-3" />

              <div class="text-xs-center">
                <CriteriaAdd />
              </div>

              <SegmentSizeChart />

              <SuggestedSegments />

            </v-card-text>

            <v-card-actions class="main-action-buttons">
              <v-layout text-xs-right>
                <v-flex>
                  <v-btn color="normal" large>
                    Cancel
                  </v-btn>
                  <v-btn color="green" dark large @click="saveSegment" :loading="savingSegmentLoading">
                    <v-icon left dark>cloud_done</v-icon>
                    {{ segmentID ? 'Update' : 'Save' }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <Notification />
    <AjaxLoader />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import TablePicker from './components/TablePicker';
import FieldsPicker from './components/FieldsPicker';
import CriteriaRow from './components/CriteriaRow';
import CriteriaAdd from './components/CriteriaAdd';
import SegmentSizeChart from './components/SegmentSizeChart';
import SuggestedSegments from './components/SuggestedSegments';
import Notification from './components/Notification';
import AjaxLoader from './components/AjaxLoader';
import * as fromConfig from './config.js';

export default {
  name: 'app',
  components: {
    TablePicker,
    FieldsPicker,
    CriteriaRow,
    CriteriaAdd,
    SegmentSizeChart,
    SuggestedSegments,
    Notification,
    AjaxLoader
  },
  created() {
    this.$store.dispatch('fetchTablesBlueprint');
  },
  data() {
    return {
      segmentID: fromConfig.SEGMENT_ID
    };
  },
  computed: {
    ...mapState(['selectedCriterias', 'savingSegmentLoading'])
  },
  methods: {
    saveSegment() {
      this.$store.dispatch('saveSegment');
    }
  }
};
</script>

<style>
.unclickable {
  pointer-events: none;
}
.fields-picker {
  max-width: calc(100% - 164px);
  margin-left: 20px;
}
.main-action-buttons {
  padding-bottom: 20px;
  padding-right: 10px;
}
</style>

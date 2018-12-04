<template>
  <v-app id="app">
    <v-container fluid>
      <v-layout justify-center>
        <v-flex>
          <v-card class="elevation-12" :class="{unclickable: savingSegmentLoading}">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Select table to make a segment:</v-toolbar-title>
              <v-spacer></v-spacer>
              <TablePicker/>
            </v-toolbar>

            <v-card-text>
              <CriteriaRow
                v-for="(criteria, index) in selectedCriterias"
                :key="criteria.id"
                :criteria="criteria"
                :class="{lastCriteria: index+1 == selectedCriterias.length}"
              />

              <div class="text-xs-center">
                <CriteriaAdd/>
              </div>

              <SegmentSizeChart/>

              <SuggestedSegments/>
            </v-card-text>

            <v-card-actions class="main-action-buttons">
              <v-layout text-xs-right>
                <v-flex>
                  <v-btn
                    color="normal"
                    large
                    v-if="config.CANCEL_PATH"
                    :href="config.CANCEL_PATH"
                  >Cancel</v-btn>
                  <SaveButton/>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <Notification/>
    <AjaxLoader/>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

import TablePicker from "./components/TablePicker";
import FieldsPicker from "./components/FieldsPicker";
import CriteriaRow from "./components/CriteriaRow";
import CriteriaAdd from "./components/CriteriaAdd";
import SegmentSizeChart from "./components/SegmentSizeChart";
import SuggestedSegments from "./components/SuggestedSegments";
import Notification from "./components/Notification";
import AjaxLoader from "./components/AjaxLoader";
import SaveButton from "./components/SaveButton";
import * as config from "./config.js";

export default {
  name: "app",
  components: {
    TablePicker,
    CriteriaRow,
    CriteriaAdd,
    SegmentSizeChart,
    SuggestedSegments,
    Notification,
    AjaxLoader,
    SaveButton
  },
  data() {
    return {
      config
    };
  },
  created() {
    this.$store.dispatch("fetchTablesBlueprint");
    this.$store.dispatch("fetchSegmentCategories");
  },
  computed: {
    ...mapState(["selectedCriterias", "savingSegmentLoading"])
  }
};
</script>

<style lang="scss">
.unclickable {
  pointer-events: none;
}
.main-action-buttons {
  padding-bottom: 20px;
  padding-right: 10px;
  .v-btn {
    margin: 0 4px;
  }
}
.p16 {
  padding: 16px;
}
</style>

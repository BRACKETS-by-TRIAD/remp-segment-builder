<template>
  <v-app id="app">
    <AjaxLoader/>
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
                  <CancelButton/>
                  <SaveButton/>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <Notification/>
  </v-app>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify";
import Vue2Filters from "vue2-filters";
import axios from "axios";
import { mapState } from "vuex";
import moment from "moment-timezone";

import TablePicker from "./components/TablePicker";
import FieldsPicker from "./components/FieldsPicker";
import CriteriaRow from "./components/CriteriaRow";
import CriteriaAdd from "./components/CriteriaAdd";
import SegmentSizeChart from "./components/SegmentSizeChart";
import SuggestedSegments from "./components/SuggestedSegments";
import Notification from "./components/Notification";
import AjaxLoader from "./components/AjaxLoader";
import SaveButton from "./components/SaveButton";
import CancelButton from "./components/CancelButton";
import * as config from "./config.js";
import store from "./store/index";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Vue2Filters);
axios.defaults.headers.common["Authorization"] = config.AUTH_TOKEN;

export default {
  name: "app",
  store,
  components: {
    TablePicker,
    CriteriaRow,
    CriteriaAdd,
    SegmentSizeChart,
    SuggestedSegments,
    Notification,
    AjaxLoader,
    SaveButton,
    CancelButton
  },
  data() {
    return {
      config
    };
  },
  created() {
    // configure timezone for moment.js
    // if timezone is not set in config, moment will fallback automatically to browser's
    if (config.TIME_ZONE) {
      moment.tz.setDefault(config.TIME_ZONE);
    }

    this.$store.commit("setSegmentID", config.SEGMENT_ID);
    this.$store.dispatch("fetchTablesBlueprint");
    this.$store.dispatch("fetchSegmentCategories");
  },
  computed: {
    ...mapState(["selectedCriterias", "savingSegmentLoading"])
  }
};
</script>

<style lang="scss">
@import url("~vuetify/dist/vuetify.min.css");
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
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
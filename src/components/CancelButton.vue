<template>
  <v-btn color="normal" large v-if="config.CANCEL_PATH" @click="handleCancelClick">Cancel</v-btn>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import FieldsPicker from "./FieldsPicker";
import * as config from "../config.js";

export default {
  name: "CancelButton",
  data() {
    return {
      config
    };
  },
  methods: {
    handleCancelClick() {
      if (config.CANCEL_PATH === "#") {
        // dispatch event of canceled segment, which can be listened f.e. in scenario
        const event = document.createEvent("CustomEvent"); // old legacy way of defining custom events, because of IE support
        event.initCustomEvent("canceledNewSegment", true, true);
        window.dispatchEvent(event);
      } else {
        window.top.location = config.CANCEL_PATH;
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>

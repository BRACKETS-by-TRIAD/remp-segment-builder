<template>
  <span>
    <v-tooltip bottom>
      <v-btn slot="activator" @click.stop="dialog=true" icon>
        <v-badge left>
          <span slot="badge" v-if="selectedFields">{{ selectedFields.length }}</span>
          <v-icon>view_week</v-icon>
        </v-badge>
      </v-btn>
      <span>Select fields you are interested in</span>
    </v-tooltip>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Choose criteria fields</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-autocomplete
                  :items="availableFields"
                  v-model="selectedFields"
                  label="Fields of criteria"
                  chips
                  deletable-chips
                  multiple
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import FieldsPicker from "./FieldsPicker";
import * as fromConfig from "../config.js";

export default {
  name: "SelectFieldsForCriteria",
  props: ["availableFields", "criteriaId"],
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    selectedFields: {
      get() {
        return this.$store.getters.criteriaSelectedFieldsById(this.criteriaId);
      },
      set(value) {
        return this.$store.commit("setCriteriaSelectedFields", {
          id: this.criteriaId,
          selectedFields: value
        });
      }
    }
  }
};
</script>

<template>
  <span>
    <v-btn color="green" dark large :loading="savingSegmentLoading" @click.stop="dialog=true">
      <v-icon left dark>cloud_done</v-icon>
      {{ segmentID ? 'Update' : 'Save' }}
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="500px">
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
                <v-select
                  :items="orderedSegmentCategories"
                  item-text="name"
                  item-value="id"
                  label="Category of the segment"
                  v-model="segmentCategory"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <FieldsPicker/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveSegment">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import FieldsPicker from "./FieldsPicker";

export default {
  name: "SaveButton",
  components: {
    FieldsPicker
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["orderedSegmentCategories"]),
    ...mapState(["savingSegmentLoading", "segmentID"]),
    segmentName: {
      get() {
        return this.$store.state.segmentName;
      },
      set(value) {
        return this.$store.commit("setSegmentName", value);
      }
    },
    segmentCategory: {
      get() {
        return this.$store.state.segmentCategoryID;
      },
      set(value) {
        return this.$store.commit("setSegmentCategoryID", value);
      }
    }
  },
  methods: {
    saveSegment() {
      this.dialog = false;
      this.$store.dispatch("saveSegment");
    }
  }
};
</script>

<style scoped lang="scss">
.container.grid-list-md {
  padding: 8px;
}
</style>

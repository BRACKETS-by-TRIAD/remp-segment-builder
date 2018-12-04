<template>
  <v-autocomplete
    :items="fieldsForSelectedTable"
    v-model="selectedFields"
    label="Select fields you are interested in"
    item-text="label"
    item-value="key"
    multiple
    chips
    deletable-chips
    :menu-props="{maxHeight:'auto'}"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FieldsPicker",
  computed: {
    ...mapGetters(["fieldsForSelectedTable"]),
    selectedFields: {
      get() {
        return this.$store.state.selectedFields;
      },
      set(value) {
        return this.$store.commit("setSelectedFields", value);
      }
    }
  }
};
</script>

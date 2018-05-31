<template>
  <v-select :items="fieldsForSelectedTable" v-model="selectedFields" label="Select fields you are interested in" item-text="label" item-value="key" multiple chips max-height="auto" autocomplete>
    <template slot="selection" slot-scope="data">
      <v-chip :selected="data.selected" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
        {{ data.item.label }}
      </v-chip>
    </template>
  </v-select>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FieldsPicker',
  computed: {
    ...mapGetters(['fieldsForSelectedTable']),
    selectedFields: {
      get() {
        return this.$store.state.selectedFields;
      },
      set(value) {
        return this.$store.commit('setSelectedFields', value);
      }
    }
  }
};
</script>

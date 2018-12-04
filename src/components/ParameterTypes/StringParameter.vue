<template>
  <div>
    <!-- string single with options available -->
    <v-autocomplete
      v-if="shouldShowStringSingleWithOptions"
      v-model="parameterValue"
      :items="availableOptions"
      :label="parameter.label"
      chips
      deletable-chips
      :hint="parameter.help"
      persistent-hint
      :filter="removeDiacriticsFilter"
    ></v-autocomplete>
    <!-- string multiple with options available -->
    <v-autocomplete
      v-if="shouldShowStringMultipleWithOptions"
      v-model="parameterValue"
      :items="availableOptions"
      :label="parameter.label"
      chips
      deletable-chips
      multiple
      :hint="parameter.help"
      persistent-hint
      :filter="removeDiacriticsFilter"
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          :selected="data.selected"
          :key="JSON.stringify(data.item)"
          close
          class="chip--select-multi"
          @input="data.parent.selectItem(data.item)"
        >{{ data.item }}</v-chip>
        <span class="or">or</span>
      </template>
    </v-autocomplete>
    <!-- string multiple -->
    <v-combobox
      v-if="shouldShowStringMultiple"
      v-model="parameterValue"
      :label="parameter.label"
      chips
      deletable-chips
      multiple
      :hint="parameter.help"
      persistent-hint
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          :selected="data.selected"
          :key="JSON.stringify(data.item)"
          close
          class="chip--select-multi"
          @input="data.parent.selectItem(data.item)"
        >{{ data.item }}</v-chip>
        <span class="or">or</span>
      </template>
    </v-combobox>
    <!-- string single -->
    <v-text-field
      v-if="shouldShowStringSingle"
      v-model="parameterValue"
      :label="parameter.label"
      :hint="parameter.help"
      persistent-hint
    ></v-text-field>
  </div>
</template>

<script>
import { removeDiacriticsFilter } from "../../helpers";

export default {
  name: "StringParameter",
  props: {
    parameter: Object
  },
  data() {
    return {
      removeDiacriticsFilter
    };
  },
  created() {
    if (typeof this.parameter.value === "undefined") {
      const parameterId = this.parameter.id;
      const parameterValue = this.parameter.default;
      this.$store.commit("setParameterValue", {
        parameterId,
        parameterValue
      });
    }
  },
  computed: {
    parameterValue: {
      get() {
        return this.$store.getters.parameterValueById(this.parameter.id);
      },
      set(parameterValue) {
        const parameterId = this.parameter.id;
        return this.$store.commit("setParameterValue", {
          parameterId,
          parameterValue
        });
      }
    },
    shouldShowStringSingleWithOptions() {
      return this.parameter.type === "string" && this.parameter.available;
    },
    shouldShowStringMultipleWithOptions() {
      return this.parameter.type === "string_array" && this.parameter.available;
    },
    shouldShowStringMultiple() {
      return (
        this.parameter.type === "string_array" && !this.parameter.available
      );
    },
    shouldShowStringSingle() {
      return this.parameter.type === "string" && !this.parameter.available;
    },
    availableOptions() {
      return this.parameter.available;
    }
  }
};
</script>
<style scoped lang="scss">
.v-select__selections .or {
  padding: 0 6px 0 3px;
  color: #212121;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  &:last-of-type {
    display: none;
  }
}
</style>


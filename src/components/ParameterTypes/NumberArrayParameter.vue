<template>
  <div>
    <!-- multiple numbers with available options -->
    <v-autocomplete
      v-if="shouldShowNumberMultipleWithOptions"
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
        >{{ data.item.text }}</v-chip>
        <span class="or">or</span>
      </template>
    </v-autocomplete>
    <!-- multiple numbers -->
    <v-select
      v-if="shouldShowNumberMultiple"
      v-model="parameterValue"
      :label="parameter.label"
      chips
      deletable-chips
      tags
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
    </v-select>
  </div>
</template>

<script>
import { removeDiacriticsFilter } from "../../helpers";

export default {
  name: "NumberArrayParameter",
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
        const parameterValue = this.$store.getters.parameterValueById(
          this.parameter.id
        );

        return parameterValue
          ? parameterValue.map(number => String(number))
          : parameterValue;
      },
      set(parameterValue) {
        const parameterId = this.parameter.id;
        const parameterValuesConvertedToNumbers = parameterValue
          .filter(item => !isNaN(Number(item)))
          .map(item => Number(item));

        return this.$store.commit("setParameterValue", {
          parameterId,
          parameterValue: parameterValuesConvertedToNumbers
        });
      }
    },
    shouldShowNumberMultipleWithOptions() {
      return this.parameter.type === "number_array" && this.parameter.available;
    },
    shouldShowNumberMultiple() {
      return (
        this.parameter.type === "number_array" && !this.parameter.available
      );
    },
    availableOptions() {
      return Object.entries(this.parameter.available).map(([value, text]) => {
        return { value, text };
      });
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
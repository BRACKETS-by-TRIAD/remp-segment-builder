<template>
  <v-tooltip bottom>
    <v-btn slot="activator" flat icon small @click="removeParameter">
      <v-icon>delete_forever</v-icon>
    </v-btn>
    <span>Remove parameter</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "ParameterDelete",
  props: {
    parameterId: String
  },
  methods: {
    removeParameter() {
      this.$store.commit("removeParameter", this.parameterId);
    }
  }
};
</script>

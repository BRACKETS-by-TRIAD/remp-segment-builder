<template>
  <v-btn flat icon small color="red darken-1" @click="removeParameter">
    <v-icon>remove_circle</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ParameterDelete',
  props: {
    parameterId: String
  },
  methods: {
    removeParameter() {
      this.$store.commit('removeParameter', this.parameterId);
    }
  }
};
</script>

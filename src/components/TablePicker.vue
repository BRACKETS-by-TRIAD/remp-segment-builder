<template>
  <v-btn-toggle v-model="toggle_one" mandatory>
    <v-btn flat value="left">
      Left
    </v-btn>
    <v-btn flat value="center">
      Center
    </v-btn>
    <v-btn flat value="right">
      Right
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: 'TablePicker',
  data() {
    return {
      toggle_one: 'center'
    };
  }
};
</script>

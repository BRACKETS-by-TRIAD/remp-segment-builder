<template>
  <v-switch label="Switch" v-model="switch1"></v-switch>
</template>

<script>
export default {
  name: 'BooleanParameter',
  data() {
    return {
      switch1: true
    };
  }
};
</script>

<template>
  <div>
    <!-- string single available -->
    <!-- <v-select v-model="select" :items="items" label="Hey there" chips></v-select> -->
    <!-- string multiple available -->
    <v-select v-model="select" :items="items" label="Hey there" chips multiple></v-select>
    <!-- string multiple -->
    <!-- <v-select v-model="select" label="Hey there" chips tags multiple></v-select> -->
    <!-- string single -->
    <!-- <v-text-field v-model="select" label="Hey there"></v-text-field> -->
  </div>
</template>

<script>
export default {
  name: 'StringParameter',
  data() {
    return {
      select: [],
      items: ['bem', 'test', 'hello']
    };
  }
};
</script>

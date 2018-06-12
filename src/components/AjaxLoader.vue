<template>
  <v-progress-circular v-if="ajaxLoader" class="ajax-loader" indeterminate color="primary"></v-progress-circular>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'AjaxLoader',
  computed: {
    ...mapState(['ajaxLoader'])
  },
  methods: {
    setLoading(value) {
      this.$store.commit('setAjaxLoader', value);
    }
  },
  created() {
    // Add a loader request interceptor
    axios.interceptors.request.use(
      config => {
        this.setLoading(true);
        return config;
      },
      error => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );

    // Add a loader response interceptor
    axios.interceptors.response.use(
      response => {
        this.setLoading(false);
        return response;
      },
      error => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );
  }
};
</script>

<style scoped lang="scss">
.ajax-loader {
  position: fixed;
  top: 20px;
  right: 30px;
}
</style>


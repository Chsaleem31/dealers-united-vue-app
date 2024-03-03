<template>
  <div id="app">
    <GlobalLoader />
    <router-view />
  </div>
</template>

<script>
import GlobalLoader from "@/components/GlobalLoader.vue";

export default {
  name: "App",
  components: {
    GlobalLoader,
  },
};
</script>

<style>
/* Add global styles here */
</style>

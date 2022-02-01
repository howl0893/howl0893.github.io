<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import navbar from './components/NavBar.vue'
export default {
  name: "App",
  components: {
    navbar
  }
}
</script>

<style lang="css">
@import "styles/theme.css";

</style>

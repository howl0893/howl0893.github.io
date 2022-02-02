<template>
  <div class="main" id="app">
    <navbar />
    <img
      v-if="userTheme === 'dark-theme'"
      src="../assets/day-moon-dark.jpg"
      width="100%"
    />
    <img v-else src="../assets/day-moon.jpg" width="100%" />
    <p>
      ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisi vel
      consectetur interdum, nisl nunc interdum nisi, euismod aliquam nisl nunc
      euismod nisl. Donec euismod, nisi vel consectetur interdum, nisl nunc
      interdum nisi, euismod aliquam nisl nunc euismod nisl. Donec euismod, nisi
      vel consectetur interdum, nisl nunc interdum nisi, euismod aliquam nisl
      nunc euismod nisl. Donec euismod, nisi vel consectetur interdum, nisl nunc
      interdum nisi, euismod aliquam nisl nunc euismod nisl. Donec euismod, nisi
      vel consectetur interdum, nisl nunc interdum nisi, euismod aliquam nisl
      nunc euismod nisl. Donec euismod, nisi vel consectetur interdum, nisl nunc
      interdum nisi, euismod aliquam nisl nunc euismod nisl. Donec euismod, nisi
      vel consectetur interdum, nisl nunc interdum nisi, euismod aliquam nisl
      nunc euismod nisl. Donec euismod, nisi vel consectetur
    </p>
    <p>
      interdum, nisl nunc interdum nisi, euismod aliquam nisl nunc euismod nisl.
      Donec euismod, nisi vel consectetur interdum, nisl nunc interdum nisi,
      euismod aliquam nisl nunc euismod nisl. Donec euismod, nisi vel
      consectetur interdum, nisl nunc interdum nisi, euismod aliquam nisl nunc
      euismod nisl. Donec
    </p>
    <p>
      ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisi vel
      consectetur interdum, nisl nunc interdum nisi, euismod aliquam nisl nunc
      euismod nisl. Donec euismod, nisi vel consectetur interdum, nisl nunc
      interdum nisi, euismod aliquam nisl nunc euismod nisl. Donec euismod, nisi
      vel consectetur interdum, nisl nunc interdum nisi, euismod aliquam nisl
      nunc euismod nisl. Donec euismod, nisi vel consectetur interdum, nisl nunc
      interdum nisi, euismod aliquam nisl nunc euismod nisl. Donec euismod, nisi
      vel consectetur interdum, nisl nunc interdum nisi, euismod aliquam nisl
      nunc euismod nisl. Donec euismod, nisi vel consectetur interdum, nisl nunc
      interdum nisi, euismod aliquam nisl nunc euismod nisl. Donec euismod, nisi
      vel consectetur interdum, nisl nunc interdum nisi, euismod aliquam nisl
      nunc euismod nisl. Donec euismod, nisi vel consectetur
    </p>
  </div>
</template>

<script>
import navbar from "./NavBar.vue";

export default {
  components: {
    navbar,
  },
  data() {
    return {
      userTheme: null,
    };
  },
  mounted() {
    window.addEventListener("user-theme-localstorage-changed", (event) => {
      this.userTheme = event.detail.storage;
    });
  },
};
</script>

<style>
p {
  max-width: 758px;
  /* center paragraph on page */
  margin: 0 auto;
  padding: 15px;
}
</style>

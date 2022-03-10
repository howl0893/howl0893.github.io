<template>
  <nav class="navbar navbar-expand-xl fixed-top navbar-light">
    <div class="container">
      <div class="nav-item active">
        <a class="navbar-brand" href="/">Sandbox</a>
      </div>
      <!-- <div class="nav-item active">
        <a class="nav-link" href="/about">About</a>
      </div>
      <div class="nav-item active">
        <a class="nav-link" href="/projects">Projects</a>
      </div> -->
      <div>
        <theme-button />
      </div>
    </div>
  </nav>
</template>

<script>
import ThemeButton from "@/components/sandbox/ThemeButton.vue";
export default {
  components: { ThemeButton },
};
</script>

<style lang="css">
@import "../../styles/theme.css";

.navbar-light .nav-item.active .nav-link,
.navbar-light .nav-item.active .navbar-brand {
  color: var(--text-primary-color);
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
.navbar-light .nav-item.active .navbar-brand:hover {
  color: var(--accent-color);
}
</style>

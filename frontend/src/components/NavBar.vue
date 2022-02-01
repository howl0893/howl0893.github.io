<template>
  <nav class="navbar navbar-expand-sm fixed-top navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">Matthew Howlett</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar1"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar1">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/projects">Projects</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/socials">socials</a>
          </li>
        </ul>
      </div>
      <div>
        <theme-button />
      </div>
    </div>
  </nav>
</template>

<script>
import ThemeButton from "@/components/ThemeButton.vue";
export default {
  components: { ThemeButton },
};
</script>

<style lang="css">
@import "../styles/theme.css";

 div a {
  color: var(--text-primary-color);
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
div a:hover {
  color: var(--accent-color);
}
</style>

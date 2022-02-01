<template>
  <div class="wrapper">
    <div>
      <a href="/home">Matthew Howlett</a>
    </div>
    <div>
      <a href="/projects">Projects</a>
    </div>
    <div>
      <a href="/about">About</a>
    </div>
    <div>
      <theme-button />
    </div>
  </div>
</template>

<script>
import ThemeButton from "@/components/ThemeButton.vue";
export default {
  components: { ThemeButton },
};
</script>

<style lang="css">
@import "../styles/theme.css";

.wrapper {
  /* list-style-type: none; */
  display: grid;
  grid-template-columns: 4fr 0.4fr 0.4fr 0.3fr;
  padding: 1rem;
  overflow: hidden;
  background-color: var(--background-color-primary);
}

div a { 
  color: var(--text-primary-color);
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
div a:hover {
  color: var(--accent-color);
}
</style>

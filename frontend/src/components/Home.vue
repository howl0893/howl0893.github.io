<template>
  <div class="main" id="app">
    <navbar />
    <img
      v-if="userTheme === 'dark-theme'"
      src="../assets/day-moon-dark.jpg"
      width="100%"
    />
    <img v-else src="../assets/day-moon.jpg" width="100%" />
    <div class="row">
      <div class="column">
        <div class="card">Projects</div>
      </div>
      <div class="column">
        <div class="card">About</div>
      </div>
      <div class="column">
        <div class="card">Contact</div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./NavBar.vue";
// import NFTCard from "./NFTCard.vue";

export default {
  components: {
    navbar,
    // NFTCard,
  },
  data() {
    return {
      userTheme: null,
      card: {
        img: "image-equilibrium.jpg",
        name: "Equilibrium",
        description: "Our Equilibrium collection promotes balance and calm.",
        id: 3429,
        price: 0.041,
        time: 3,
        autor: "Jules Wyvern",
        avatar: "image-avatar.png",
      },
    };
  },
  mounted() {
    window.addEventListener("user-theme-localstorage-changed", (event) => {
      this.userTheme = event.detail.storage;
    });
  },
};
</script>

<style scoped lang="css">
@import "../styles/theme.css";

* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 25%;
  padding: 20px 20px;
}

/* Remove extra left and right margins, due to padding in columns */
.row {margin: 0 -5px;}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 16px;
  text-align: center;
  background-color: var(--background-color-primary);
}

/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
</style>

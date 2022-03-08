<template>
  <div class="main" id="app">
    <navbar />
    <img
      v-if="userTheme === 'light-theme'"
      src="../assets/day-moon.jpg"
      width="100%"
    />
    <img v-else src="../assets/day-moon-dark.jpg" width="100%" />
    <h1>Welcome to the home page</h1>
    <p class="welcome">
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate
    </p>
    <div class="row">
      <div class="column">
        <div class="card">Past
          <p class="card-info">
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          </p>
        </div>
      </div>
      <div class="column">
        <div class="card">
          Present
          <p class="card-info">
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          </p>
        </div>
      </div>
      <div class="column">
        <div class="card">
          Future
          <p class="card-info">
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./sandbox/NavBar.vue";
// import NFTCard from "./NFTCard.vue";

export default {
  components: {
    navbar,
    // NFTCard,
  },
  data() {
    return {
      userTheme: null,
      // card: {
      //   img: "image-equilibrium.jpg",
      //   name: "Equilibrium",
      //   description: "Our Equilibrium collection promotes balance and calm.",
      //   id: 3429,
      //   price: 0.041,
      //   time: 3,
      //   autor: "Jules Wyvern",
      //   avatar: "image-avatar.png",
      // },
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

h1 {
  /* font-weight: bold; */
  color: var(--text-primary-color);
  text-align: center;
  padding: 20px;
}

.welcome {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}

.card-info {
  color: var(--text-primary-color);
  text-align: left;
  border-radius: 4px;
  border: 1px solid var(--accent-color);
  height: 100px;
  padding: 10px
}

* {
  box-sizing: border-box;
}

/* Float four columns side by side */
.column {
  width: 25%;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
}

/* Style the counter cards */
.card {
  box-shadow: 16px 16px 16px 0 rgba(28, 153, 122, 0.2); /* this adds the "card" effect */
  border-radius: 4px;
  border: 1px solid var(--accent-color);
  padding: 16px;
  text-align: center;
  background-color: var(--background-color-primary);
  height: 300px;
}

/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
  .welcome {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}
}
</style>

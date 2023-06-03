<template>
  <div>
    <label class="theme">
      <input type="checkbox" :checked="userTheme === 'dark'" />
      <div class="theme-icon" @click="toggleTheme">
        <i v-if="userTheme === 'light'" class="fas fa-sun"></i>
        <i v-else class="fas fa-moon"></i>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },

  data() {
    return {
      userTheme: null, // "light",
    };
  },
  
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light") {
        this.setTheme("dark");
      } else {
        this.setTheme("light");
      }
    },

    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
      window.dispatchEvent(new CustomEvent('user-theme-localstorage-changed', {
        detail: {
          storage: localStorage.getItem('user-theme')
        }
      }));
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark";
      } else {
        return "light";
      }
    },
  },
};
</script>

<style scoped lang="css">
@import "../styles/global.css";
@import "../styles/theme.css";

/* Hide default HTML checkbox */
.theme input {
  opacity: 0;
  width: 0;
  height: 0;
}

.theme-icon {
  font-size: 20px;
  cursor: pointer;
}
</style>
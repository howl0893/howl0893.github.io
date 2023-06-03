<template>
  <div id="app">

    <body>
      <div id="image">
        <img id="bg-image" :src="backgroundImage" />
        <!-- <iframe class="spotify"
          src="https://open.spotify.com/embed/playlist/3PNZmgowCUyoFMhMp1lOt2?si=cc937a4207904739?utm_source=generator&theme=0&autoplay=1&t=0s"
          width="300vw" height="150vh" frameBorder="0" allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> -->
        <div class="chevron-container">
          <i class="fa-solid fa-chevron-left" @click="prevBackground"></i>
          <i class="fa-solid fa-chevron-right" @click="nextBackground"></i>
        </div>


        <div class="image-text" id="header-text">
          <header>Matthew Howlett</header>
        </div>
        <div id="lower-text">
          <div class="image-text" id="ds-text">
            <header class="list-header-text">Research Scientist</header>
            <ul id="list">
              <li @click="scrollToComponent('Halas')">HALAS</li>
              <li @click="scrollToComponent('Chickadee')">Chickadee</li>
              <li @click="scrollToComponent('Drone')">Autonomous Drone</li>
              <li @click="scrollToComponent('Anemometer')">Sonic Anemometer</li>
              <!-- <li><a href="">Computational Physics</a></li> -->
            </ul>
          </div>
          <div class="image-text" id="swe-text">
            <header class="list-header-text">Software Engineer</header>
            <ul id="list">
              <li @click="scrollToComponent('Core')">CORE</li>
              <li @click="scrollToComponent('Reconn')">Reconn.AI</li>
              <li @click="scrollToComponent('MachineLearning')">Machine Learning</li>
              <li @click="scrollToComponent('FullStack')">Full Stack</li>
            </ul>
          </div>
          <div class="image-text" id="personal-text">
            <header class="list-header-text">Personal Projects</header>
            <ul id="list">
              <li @click="scrollToComponent('About')">About Me</li>
              <li @click="scrollToComponent('Void')">VOID</li>
              <li @click="scrollToComponent('Robotics')">Robotics</li>
              <li @click="scrollToComponent('Reading')">Reading List</li>
            </ul>
          </div>
        </div>
        <div id="email-text">
          <a href="https://github.com/howl0893" target="_blank">
            <i class="fa-brands fa-github"></i>
          </a>
          <a href="mailto:matt.r.howlett@gmail.com" target="_blank">matt.r.howlett@gmail.com</a>
          <a href="https://drive.google.com/file/d/1809QDOLC-zyVurXlq3k1EGSBoNDXy9M2/view?usp=sharing" target="_blank">Resume</a>
        </div>
        <!-- <div id="circles">
          <i v-for="(image, i) in backgroundImages" :key="i" class="circle-icon"
            :class="{ 'fa-solid fa-circle': i === index, 'fa-regular fa-circle': i !== index }"></i>
        </div> -->

      </div>

      <ThemeButton class="theme-button" v-if="activeComponent != null" />
      <About id="About" v-if="activeComponent == 'About'" />
      <Anemometer id="Anemometer" v-if="activeComponent == 'Anemometer'" />
      <Core id="Core" v-if="activeComponent == 'Core'" />
      <Chickadee id="Chickadee" v-if="activeComponent == 'Chickadee'" />
      <Drone id="Drone" v-if="activeComponent == 'Drone'" />
      <FullStack id="FullStack" v-if="activeComponent == 'FullStack'" />
      <Halas id="Halas" v-if="activeComponent == 'Halas'" />
      <MachineLearning id="MachineLearning" v-if="activeComponent == 'MachineLearning'" />
      <Reconn id="Reconn" v-if="activeComponent == 'Reconn'" />
      <Robotics id="Robotics" v-if="activeComponent == 'Robotics'" />
      <Reading id="Reading" v-if="activeComponent == 'Reading'" />
      <Void id="Void" v-if="activeComponent == 'Void'" />
    </body>
  </div>
</template>

<script>
import About from './About.vue'
import Anemometer from './Anemometer.vue'
import Core from './Core.vue'
import Chickadee from './Chickadee.vue'
import Drone from './Drone.vue'
import FullStack from './FullStack.vue'
import Halas from './Halas.vue'
import MachineLearning from './MachineLearning.vue'
import Reconn from './Reconn.vue'
import Robotics from './Robotics.vue'
import Reading from './Reading.vue'
import ThemeButton from './ThemeButton.vue'
import Void from './Void.vue'

export default {
  components: {
    About,
    Anemometer,
    Core,
    Chickadee,
    Drone,
    FullStack,
    Halas,
    MachineLearning,
    Reconn,
    Robotics,
    Reading,
    ThemeButton,
    Void
  },

  data() {
    return {
      activeComponent: null,
      backgroundImages: [
        require("../assets/background/quandary-peak.jpg"),
        require("../assets/background/summit-lake2.jpg"),
        require("../assets/background/holy-cross.jpg"),
        require("../assets/background/summit-lake.jpg"),
        // require("../assets/background/bald-mtn.jpg"),
        // require("../assets/background/mineral-bottom.jpg"),
        require("../assets/background/leadville.jpg"),
        require("../assets/background/mt-hood-blue-bird.jpg"),
        // require("../assets/background/lake-powell2.jpg"),
        // require("../assets/background/uneva-peak.jpg"),
      ],
      index: 0,
      intervalId: null,

    };
  },
  mounted() {
    // cycle through backgroundImages every 5 seconds
    this.intervalId = setInterval(() => {
      this.index = (this.index + 1) % this.backgroundImages.length;
    }, 5000);

  },
  computed: {
    backgroundImage() {
      return this.backgroundImages[this.index];
    }
  },
  methods: {
    scrollToComponent(id) {
      this.activeComponent = id;
      console.log(this.activeComponent);
      setTimeout(() => {
        const element = document.querySelector(`#${id}`)
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    },
    prevBackground() {
      clearInterval(this.intervalId);

      this.index = (this.index - 1 + this.backgroundImages.length) % this.backgroundImages.length;

      this.intervalId = setInterval(() => {
        this.index = (this.index + 1) % this.backgroundImages.length;
      }, 5000);

    },
    nextBackground() {
      clearInterval(this.intervalId);

      this.index = (this.index + 1) % this.backgroundImages.length;

      this.intervalId = setInterval(() => {
        this.index = (this.index + 1) % this.backgroundImages.length;
      }, 5000);

    },

  }

};
</script>

<style scoped>
@import "../styles/global.css";
@import "../styles/theme.css";

@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap");
@import url("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0-beta2/css/all.min.css");

/* .spotify {
  opacity: 0.9;
  border-radius: 12px;
  position:
    fixed;
  top: 2%;
  left: 1%;
  z-index: 10;
} */

body {
  font-family: "Ubuntu", sans-serif;
}

#image {
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

#bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-text {
  color: white;
  margin-right: 2vw;
  margin-left: 2vw;
}

#header-text {
  position: absolute;
  bottom: 80%;
  text-align: center;
  color: white;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  font-size: 36px;
}

#lower-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10%;
  width: 70%;
  display: flex;
  padding: 1vh;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 15px;
  backdrop-filter: blur(100px);
  background-color: rgba(0, 0, 0, 0.20);
}

/* #lower-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10%;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5vw;
  padding: 1vh;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.20);
} */

ul {
  list-style-type: none;
  padding-left: 0;
}

#ds-text {
  width: 100%;
}

#swe-text {
  width: 100%;
}

#personal-text {
  width: 40%;
}

#email-text {
  position: absolute;
  bottom: 4%;
  text-align: center;
  /* color: white; */
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  backdrop-filter: blur(50px);
}

#email-text a:not(:last-child) {
  margin-right: 12px;
}

.list-header-text {
  font-size: 20px;
  text-align: left;
}

#list {
  font-size: 16px;
}

a,
li {
  color: white;
  margin-bottom: 3px;
  padding-left: 8px;
  text-align: left;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.5s;
}

a,
li:hover {
  width: 100%;
  color: white;
  opacity: 1;
}

.chevron-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 1;
}

.fa-chevron-left,
.fa-chevron-right {
  color: white;
  opacity: 0.9;
  font-size: 2.5rem;
  cursor: pointer;
  margin: 0 1rem;
  transition: opacity 0.3s ease-in-out;
  /* Add transition effect for smooth change */
}

.fa-chevron-left:hover,
.fa-chevron-right:hover {
  opacity: 1;
  /* Change the opacity when hovered */
}

#circles {
  color: white;
  position: absolute;
  opacity: 0.9;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  padding: 0.1rem;
  border-radius: 10px;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.20);
}

#circles i {
  font-size: 0.75rem;
  margin-right: 0.2rem;
}


/* Mobile */
@media only screen and (max-width: 600px) {
  body {
    margin: 0;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  /* #image {
    margin: 0;
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #bg-image {
    left: -200px;
    width: 400%;
    border-radius: 0;
    padding-right: 100px;
  } */

  #swe-text,
  #ds-text,
  #personal-text {
    width: 100%;
  }

  #lower-text {
    flex-wrap: wrap;
    width: 50%;
    height: 80%;
    top: 25%;
    left: 52%;
    justify-content: center;
  }

  #email-text {
    bottom: -30%;
    text-align: center;
    z-index:100;
  }

  #email-text a {
    display: block;
    color: var(--color-text);
  }
}
</style>

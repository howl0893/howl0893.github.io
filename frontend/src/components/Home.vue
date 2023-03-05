<template>
  <div id="app">

    <body>
      <div id="image">
        <img id="bg-image" :src="backgroundImage" />
        <iframe src="https://open.spotify.com/embed/playlist/3PNZmgowCUyoFMhMp1lOt2?si=cc937a4207904739?utm_source=generator&theme=0&autoplay=1&t=0s"
        width="300vw" height="150vh" frameBorder="0" allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

        <div class="image-text" id="header-text">
          <header>Matthew Howlett</header>
        </div>
        <div id="lower-text">
          <div class="image-text" id="ds-text">
            <header class="list-header-text">Research Scientist</header>
            <ul id="list">
              <li @click="scrollToComponent('Halas')">HALAS</li>
              <li><a href="">Chickadee</a></li>
              <li><a href="">Autonomous Drone</a></li>
              <li @click="scrollToComponent('Anemometer')">Sonic Anemometer</li>
              <!-- <li><a href="">Computational Physics</a></li> -->
            </ul>
          </div>
          <div class="image-text" id="swe-text">
            <header class="list-header-text">Software Engineer</header>
            <ul id="list">
              <li @click="scrollToComponent('Core')">CORE</li>
              <li @click="scrollToComponent('Reconn')">Reconn.AI</li>
              <li><a href="">Machine Learning</a></li>
              <li><a href="">Full stack</a></li>
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
          <a href="https://github.com/howl0893">
            <img align="left" alt="GitHub" width="30px" style="padding-right:12px;"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
          </a>
          — matt.r.howlett@gmail.com — <a
            href="/Users/matthew/dev/my-site/frontend/public/Resume-Matthew-Howlett.pdf">Resume</a>
        </div>
      </div>
      <About id="About" v-if="activeComponent == 'About'" />
      <Anemometer id="Anemometer" v-if="activeComponent == 'Anemometer'" />
      <Core id="Core" v-if="activeComponent == 'Core'" />
      <Halas id="Halas" v-if="activeComponent == 'Halas'" />
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
import Halas from './Halas.vue'
import Reconn from './Reconn.vue'
import Robotics from './Robotics.vue'
import Reading from './Reading.vue'
import Void from './Void.vue'

export default {
  components: {
    About,
    Anemometer,
    Core,
    Halas,
    Reconn,
    Robotics,
    Reading,
    Void
  },

  data() {
    return {
      activeComponent: null,
      backgroundImages: [
        require("../assets/background/quandary-peak.jpg"),
        require("../assets/background/holy-cross.jpg"),
        require("../assets/background/summit-lake.jpg"),
        require("../assets/background/bald-mtn.jpg"),
        require("../assets/background/mineral-bottom.jpg"),
        require("../assets/background/mt-hood.jpg"),
        require("../assets/background/summit-lake2.jpg"),
        require("../assets/background/leadville.jpg"),
        // require("../assets/background/lake-powell2.jpg"),
        // require("../assets/background/uneva-peak.jpg"),
      ],
      index: 0,

      // player: null,
      // trackName: '',
      // artistName: '',
      // trackImageUrl: '',
      // accessToken: '3933fe89bee343719b0dc66c89d56c35', // insert your access token here
      // deviceId: '2a6996e4a159416ea0b7ba6ceb7b8879', // insert your device ID here
      // playlistId: '6kRK16eJxj5uPbA5csodUs?si=e68e77d16b994473', // insert your playlist ID here
      // trackUris: [], // an array to store the URIs of the first 5 tracks in the playlist

    };
  },
  mounted() {
    // cycle through backgroundImages every 5 seconds
    setInterval(() => {
      this.index = (this.index + 1) % this.backgroundImages.length;
    }, 5000);

    // Get a reference to the embed iframe element
    // const spotifyEmbedWindow = document.querySelector('iframe[src*="spotify.com/embed"]').contentWindow;
    // spotifyEmbedWindow.postMessage({command: 'toggle'}, '*');

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
  }

};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap");

iframe {
  opacity: 70%;
  border-radius:12px; 
  position: 
  fixed; 
  top: 2%; 
  left: 1%;
  z-index: 10;
}

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

#description {
  position: absolute;
  left: 13%;
  right: 13%;
  bottom: 50%;
  font-size: 20px;
}

#lower-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  bottom: 10%;
  width: 70%;
  display: flex;
  padding: 1vh;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.20);
}

ul {
  list-style-type: none;
  padding-left: 0;
}

#ds-text {
  width: 100%;
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

#swe-text {
  width: 100%;
}

#personal-text {
  width: 40%;
}

#email-text {
  position: absolute;
  bottom: 2%;
  text-align: center;
  color: white;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  backdrop-filter: blur(2px);
}



.spotify-widget {
  font-family: sans-serif;
}

.spotify-widget__player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.spotify-widget__player__info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.spotify-widget__player__info img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.spotify-widget__player__info__details h3 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.spotify-widget__player__info__details p {
  margin: 0;
  font-size: 16px;
  color: #666;
}

.spotify-widget__player__controls button {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #1db954;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.spotify-widget__player__controls button:hover {
  background-color: #0e8f39;
}





/* Mobile */
/* @media only screen and (max-width: 600px) {
  body {
    margin: 0;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #image {
    margin: 0;
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #big-image {
    left: -100px;
    width: 400%;
    border-radius: 0;
    padding-right: 100px;
  }

  #header-text {
    top: 8%;
  }

  #lower-text {
    flex-wrap: wrap;
    top: 20%;
    left: 30%;
    justify-content: center;
  }
} */
</style>

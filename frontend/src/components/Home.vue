<template>
  <div id="app">
    <body>
      <div id="image">
        <img id="big-image" src="../assets/day-moon.png" />
        <div class="image-text" id="header-text">
          <header>Matthew Howlett</header>
        </div>
        <div id="lower-text">
          <div class="image-text" id="ds-text">
            <header class="list-header-text">Research Scientist</header>
            <ul id="list">
              <li><a href="./halas">HALAS</a></li>
              <li><a href="">Sandpiper</a></li>
              <li><a href="">Egret</a></li>
              <li><a href="">Autonomous Drone</a></li>
              <li><a href="">Sonic Anemometer</a></li>
              <li><a href="">Computational Physics</a></li>
            </ul>
          </div>
          <div class="image-text" id="swe-text">
            <header class="list-header-text">Software Engineer</header>
            <ul id="list">
              <li><a href="">Springmatter</a></li>
              <li><a href="">Web3</a></li>
              <li><a href="">Machine Learning</a></li>
              <li><a href="">Full stack</a></li>
            </ul>
          </div>
          <div class="image-text" id="personal-text">
            <header class="list-header-text">Personal Projects</header>
            <ul id="list">
              <li><a href="./about">About Me</a></li>
              <li><a href="">Game Deveopment</a></li>
              <li><a href="">Creatives</a></li>
            </ul>
          </div>
        </div>
        <div id="email-text">
          matt.r.howlett@gmail.com — <a href="">Resume</a>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap");

body {
  font-family: "Ubuntu", sans-serif;
  overflow: hidden;
}

#image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
  width: 80%;
  /* max-height: 20%; */
  height: auto;
  position: relative;
}

#big-image {
  width: 100%;
  border-radius: 25px;
}

.image-text {
  color: white;
}

#header-text {
  position: absolute;
  width: 100%;
  bottom: 80%;
  /* left: 43%; */
  /* justify-content: center; */
  text-align: center;
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
  left: 13%;
  bottom: 10%;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-around;
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

li {
  margin-bottom: 3px;
  text-align: left;
  text-decoration: none;
  position: relative;
  cursor: pointer;
}

li:hover:after {
  width: 100%;
}

#swe-text {
  width: 100%;
}

#personal-text {
  width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
  cursor: inherit;
}

#email-text {
  position: absolute;
  bottom: 2%;
  width: 100%;
  text-align: center;
  color: white;
}

a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.5s;
}

a:hover {
  opacity: 1;
}

/* Mobile */
@media only screen and (max-width: 600px) {
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
}
</style>

<template>
  <div id="app">
    <body>
      <header>
        <img src="../assets/michaero.png">
        <img src="../assets/modal-ai.png">
      </header>
      <!-- <section> -->
      <h2>m500 Drone Control</h2>
      <!-- </section> -->
      <div id="container">
        <form class="card">
          <button type="submit" @click="submit($event, 'configure')">configure</button>
          <p>Send configuration commands to the drone before starting QGroundControl. Use the ifconfig command in a terminal to find IP address of control station computer.</p>
          <label>CPU IP: 
            <input type="text" v-model="control_cpu_ip">
          </label>
        </form>
        <form class="card">
          <button type="submit" @click="submit($event, 'stream')">stream</button>
          <p>Begin streaming video to QGroundControl. To stop streaming or switch cameras, the drone's power must be cycled.</p>
          <label>camera:
            <select v-model="streaming_cam">
              <option streaming_cam="hires">hires</option>
              <option streaming_cam="stereo">stereo</option>
              <option streaming_cam="tracking">tracking</option>
            </select>
          </label>
        </form>
        <form class="card">
          <button type="submit" @click="submit($event, 'capture_img')">capture image</button>
          <p>Begin camera acquisition with desired settings. Support for more settings is coming soon.</p>
          <label>camera: 
            <select v-model="acquisition_cam">
              <option acquisition_cam="hires">hires</option>
              <option acquisition_cam="stereo">stereo</option>
              <option acquisition_cam="tracking">tracking</option>
            </select>
          </label>
          <label>sec: 
            <input type="text" v-model="acquisition_time">
          </label>
          <label>note: 
            <input type="text" v-model="acquisition_note">
          </label>
        </form>
        <form class="card">
            <button type="submit" @click="submit($event, 'trigger_gpio')">trigger GPIO</button>
          <p>Send pulse to specified GPIO pin. Any IO pin exposed on 
            <a href="https://docs.modalai.com/voxl-flight-datasheet-connectors/#j7-blsp6-i2c--gpio-and-blsp9-uart--spi-external-gpsmag" target="_blank">J7</a>, 
            <a href="https://docs.modalai.com/voxl-flight-datasheet-connectors/#j10---uart-or-i2c-off-board-external-sonar-or-imu-sensor" target="_blank">J10</a>, 
            <a href="https://docs.modalai.com/voxl-flight-datasheet-connectors/#j11---blsp12-off-board-spektrum" target="_blank">J11</a> and
            <a href="https://docs.modalai.com/voxl-datasheets-connectors/#j12-blsp5-off-board-uart-esc" target="_blank">J12</a> can be used.
          </p>
          <label>pin: 
            <select v-model="gpio_pin">
              <option gpio_pin="25">25</option>
              <option gpio_pin="26">26</option>
              <option gpio_pin="27">27</option>
              <option gpio_pin="28">28</option>
              <option gpio_pin="49">49</option>
              <option gpio_pin="50">50</option>
              <option gpio_pin="51">51</option>
              <option gpio_pin="52">52</option>
              <option gpio_pin="53">53</option>
              <option gpio_pin="54">54</option>
              <option gpio_pin="55">55</option>
              <option gpio_pin="56">56</option>
              <option gpio_pin="81">81</option>
              <option gpio_pin="82">82</option>
              <option gpio_pin="83">83</option>
              <option gpio_pin="84">84</option>
              <option gpio_pin="85">85</option>
              <option gpio_pin="86">86</option>
              <option gpio_pin="87">87</option>
              <option gpio_pin="88">88</option>
            </select>
          </label>
          <label>value: 
            <select v-model="gpio_value">
              <option gpio_value="1">1</option>
              <option gpio_value="0">0</option>
            </select>
          </label>
        </form>
      </div>
  </body>
  </div>
</template>

<script>
import axios from 'axios';
export default{
 
  data(){
    return {
      control_cpu_ip: '192.168.8.84',
      streaming_cam: 'hires',
      acquisition_cam: 'stereo',
      acquisition_time: '60',
      acquisition_note: 'waypoint-1',
      gpio_pin: '25',
      gpio_value: '1',
    };
  },
  methods:{
    submit(e, value){
      e.preventDefault();
      const path = 'http://127.0.0.1:8000/item'
      switch(value){
        case 'configure':
          console.log(`${value}: ${this.control_cpu_ip}`);
          axios.post(path, {
            name: "foo",
            description: "bar",
            price: 100,
            tax: 0,
            // button: value,
            // control_cpu_ip: this.control_cpu_ip,
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
          break;
        case 'stream':
          console.log(`${value}: ${this.streaming_cam}`);
          axios.post(path, {
            button: value,
            streaming_cam: this.streaming_cam,
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
          break;
        case 'capture_img':
          console.log(`${value}: ${this.acquisition_cam}, ${this.acquisition_time}, ${this.acquisition_note}`);
          axios.post(path, {
            button: value,
            acquisition_cam: this.acquisition_cam,
            acquisition_time: this.acquisition_time,
            acquisition_note: this.acquisition_note,
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
          break;
        case 'trigger_gpio':
          console.log(`${value}: ${this.gpio_pin}, ${this.gpio_value}`);
          axios.post(path, {
            button: value,
            gpio_pin: this.gpio_pin,
            gpio_value: this.gpio_value,
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
          break;
      }
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');

body {
  background: #ffffff;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  background-color: #001A49;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  font-family: 'Ubuntu', sans-serif;
  margin: auto;
  text-align: center;
  font-size: 2rem;
}

#container {
  margin: 20px auto;
  display:grid;
  grid-template-columns: minmax(auto, 400px) minmax(auto, 400px);
  grid-row: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: center;
  font-family:'Ubuntu', sans-serif;
  padding: 20px;
}
.card {
    background-color:#F4F7F9;
    padding:20px;
    border-radius:10px;
    color:rgb(34, 34, 34);
    display:inline-block;
    align-items: center;
    text-align: center;
}

button {
  font: inherit;
  border: 1px solid #001A49;
  background-color: #065FAC;
  color: white;
  padding: 1rem 1rem;
  border-radius: 10px;
  margin: 1rem;
  width: 9rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

button:focus {
  outline: none;
}

button:hover,
button:active {
  background-color: #2688dd;
  border-color: #001A49;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

select {
  border-radius: 6px;
  margin: 0.5rem;
  width: 6rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

input {
  border-radius: 6px;
  margin: 0.5rem;
  width: 7rem;
  cursor: text;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

/* remove underline from all hyperlinks */
a {
  text-decoration: none;
}
</style>
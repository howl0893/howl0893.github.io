<template>
  <div id="box">
    <!-- <button @click="show_alert">Create error slot</button>
    <div id="alert-box">
      <AlertBox v-if="show"> Something bad happened. </AlertBox>
    </div>
    <div class="demo">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
      <component :is="currentTab" class="tab"></component>
    </div> -->
    <div>
      <!-- <input type="file" @change="fileUpload" ref="file_input" multiple /> -->
      <component
        :is="currentChart"
        v-bind:chartData="chartData"
        class="chart"
      ></component>
      <br />
      <file-upload class="file-upload" @imported-data="receiveData($event)"></file-upload>
      <label>Chart type:</label>
      <select class="chart-selection" @change="onChangeEvent($event)">
        <option v-for="chart in charts" :key="chart" :value="chart">
          {{ chart }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import charts from './charts/'
import FileUpload from "./FileUpload.vue";

import AlertBox from "./sandbox/AlertBox.vue";
import Component1 from "./sandbox/Component1.vue";
import Component2 from "./sandbox/Component2.vue";
import Component3 from "./sandbox/Component3.vue";

export default {
  components: {
    Area: charts.Area, Bar: charts.Bar, Choropleth: charts.Choropleth, 
    Pie: charts.Pie,
    TimeSeries: charts.TimeSeries,
    Linear: charts.Linear,
    Scatter:charts.Scatter,
    LineChart: charts.LineChart,
    FileUpload,
    AlertBox, Component1, Component2, Component3,
  },
  data() {  
    return {
      chartData: [],
      show: false,
      currentTab: "Component1",
      tabs: ["Component1", "Component2", "Component3"],
      currentChart: "Area",
      charts: ["Area", "Bar", "Choropleth", "Pie", "Linear", "TimeSeries", "Scatter", "LineChart"],
    };
  },
  methods: {
    show_alert: function () {
      this.show = !this.show;
      console.log("show: ", this.show);
    },

    onChangeEvent(e) {
      this.currentChart = e.target.value;
      console.log("this.currentChart: ", this.currentChart);
    },

    receiveData($event) {
      // Do something with the $event data emitted.
      // $event in this case is equal to "response" from the child component.
      // this.chart_data = $event.data.data_dict.slice(0, 199);
      this.chartData = $event;
      console.log("chart $event: ", this.chartData);
      console.log("typeof this.chartData: ", typeof this.chartData);
    },
    fileUpload(event) {
      const url = "http://127.0.0.1:8000/api/file/";
      const formData = new FormData();
      const file = event.target.files[0];

      console.log("file: ", file);
      formData.append("file", file);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      axios
        .post(url, formData, config)
        .then((response) => {
          console.log("response: ", response);
          this.chartData = response.data.data_dict.slice(0, 199);
          console.log("this.chartData: ", this.chartData);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
  },
};
</script>

<style scoped>
label {
  padding: 6px;
}
#box {
  padding: 20px;
}

#alert-box {
  display: block;
  margin-top: 20px;
  margin-left: 5%;
  width: 90%;
}

.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
.file-upload,
.chart-selector {
  display: inline-block;
}

</style>
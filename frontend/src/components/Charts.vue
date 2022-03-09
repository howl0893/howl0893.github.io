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
      <h2 id="chart-title">{{ filename }}</h2>
      <component
        :is="currentChart"
        :chartData="chartData"
        :currentXaxe="currentXaxe"
        :currentYaxe="currentYaxe"
        class="chart"
      ></component>
      <br />
      <file-upload
        id="file-upload"
        @imported-data="receiveData($event)"
        @filename="receiveFilename($event)"
      ></file-upload>
      <label>Chart type:</label>
      <select id="chart-select" @change="changeChart($event)">
        <option v-for="chart in charts" :key="chart" :value="chart">
          {{ chart }}
        </option>
      </select>
      <label>x-axis:</label>
      <select id="axe-select" @change="changeXaxis($event)">
        <option v-for="data in axes" :key="data" :value="data">
          {{ data }}
        </option>
      </select>
      <label>y-axis:</label>
      <select id="axe-select" @change="changeYaxis($event)">
        <option v-for="data in axes" :key="data" :value="data">
          {{ data }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import charts from "./charts/";
import FileUpload from "./FileUpload.vue";

// import AlertBox from "./sandbox/AlertBox.vue";
// import Component1 from "./sandbox/Component1.vue";
// import Component2 from "./sandbox/Component2.vue";
// import Component3 from "./sandbox/Component3.vue";

export default {
  components: {
    Area: charts.Area,
    Bar: charts.Bar,
    BrushingBar: charts.BrushingBar,
    CandleStick: charts.CandleStick,
    Choropleth: charts.Choropleth,
    DensityContour: charts.DensityContour,
    DualLine: charts.DualLine,
    GridLines: charts.GridLines,
    GroupedBar: charts.GroupedBar,
    Line1: charts.Line1,
    Line2: charts.Line2,
    Line3: charts.Line3,
    MissingData: charts.MissingData,
    Pie: charts.Pie,
    Scatter: charts.Scatter,
    Scatter2: charts.Scatter2,
    StackedBar: charts.StackedBar,
    Treemap: charts.Treemap,
    FileUpload,
    // AlertBox,
    // Component1,
    // Component2,
    // Component3,
  },
  data() {
    return {
      filename: null,
      chartData: [],
      axes: [],
      currentXaxe: "x-axis",
      currentYaxe: "y-axis",
      currentChart: "Area",
      charts: [
        "Area",
        "Bar",
        "BrushingBar",
        "CandleStick",
        "Choropleth",
        "DensityContour",
        "DualLine",
        "GridLines",
        "GroupedBar",
        "Line1",
        "Line2",
        "Line3",
        "MissingData",
        "Pie",
        "Scatter",
        "Scatter2",
        "StackedBar",
        "Treemap",
      ],
      //example dynamic components
      // currentTab: "Component1",
      // tabs: ["Component1", "Component2", "Component3"],
      // show: false,
    };
  },
  methods: {
    /*show_alert: function () {
      this.show = !this.show;
      console.log("show: ", this.show);
    },*/

    receiveData($event) {
      this.chartData = $event;
      this.axes = Object.keys(this.chartData[0]);
      console.log("receiveData($event): ", this.chartData);
      console.log("this.axes: ", this.axes);
    },
    receiveFilename($event) {
      this.filename = $event;
      console.log("receiveFilename($event): ", this.filename);
    },
    changeChart(e) {
      this.currentChart = e.target.value;
      console.log("this.currentChart: ", this.currentChart);
    },
    changeXaxis(e) {
      this.currentXaxe = e.target.value;
      console.log("this.currentXaxe: ", this.currentXaxe);
    },
    changeYaxis(e) {
      this.currentYaxe = e.target.value;
      console.log("this.currentYaxe: ", this.currentYaxe);
    },
  },
};
</script>

<style scoped>
label {
  padding: 6px;
  margin-left: 2%;
}

#chart-title {
  margin-left: 15%;
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

#file-upload {
  display: inline-block;
  padding: 1%;
}
#chart-select,
#axe-select {
  display: inline-block;
}

/* .demo {
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
} */
</style>
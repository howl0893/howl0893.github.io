<template>
  <div class="App">
    <D3LineChart
      id="chart"
      :config="chart_config"
      :datum="chartData"
    ></D3LineChart>
  </div>
</template>

<script>
import { D3LineChart } from "vue-d3-charts";

export default {
  components: {
    D3LineChart,
    // FileUpload,
  },
  props: ["chartData", "currentXaxe", "currentYaxe"],
  data() {
    return {
      chart_config: {
        values: [this.currentXaxe, this.currentYaxe], // ["timestamp", "distancecm"],
        date: {
          key: "timestamp",
          inputFormat: "%Y%m%dT%H%M%S.%L", // "%Y-%m-%dT%H:%M:%S.%LZ"
          outputFormat: "%M:%S.%L",
        },
        axis: {
          xTitle: this.currentXaxe, //"timestamp",
          yTitle: this.currentYaxe, // "distancecm",
        },
      },
    };
  },
  watch: {
    currentYaxe: function(newVal, oldVal) {
      this.currentYaxe = newVal;
      console.log("currentYaxe changed: ", this.currentYaxe, " | was: ", oldVal);
    },
  },
  created: function () {
    console.log("props: ", this.chartData, this.currentXaxe, this.currentYaxe);
  },
  methods: {
    // addData() {
    //   const timestamp = Math.random(0, 1259.999);
    //   const distancecm = Math.random(-250, 250);
    //   this.chartData.push({ timestamp, distancecm });
    // },
  },
};
</script>

<style scoped>
input,
label {
  margin: 0.5rem 0.5rem;
}
</style>>
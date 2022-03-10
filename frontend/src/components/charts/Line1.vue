<template>
  <div class="App">
    <D3LineChart
      id="chart"
      :config="chart_config"
      :datum="data"
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
  props: ["data", "currentXaxe", "currentYaxe"],
  data() {
    return {
      componentKey: 0,
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
    currentXaxe: function(newVal, oldVal) {
      this.currentXaxe = newVal;
      console.log("currentXaxe changed from", oldVal, "to", this.currentXaxe);
    },
    currentYaxe: function(newVal, oldVal) {
      this.currentYaxe = newVal;
      console.log("currentYaxe changed from", oldVal, "to", this.currentYaxe);
    },
  },
  created: function () {
    console.log("props: ", this.data, this.currentXaxe, this.currentYaxe);
  },
  methods: {
    // addData() {
    //   const timestamp = Math.random(0, 1259.999);
    //   const distancecm = Math.random(-250, 250);
      // this.data.push({ timestamp, distancecm });
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
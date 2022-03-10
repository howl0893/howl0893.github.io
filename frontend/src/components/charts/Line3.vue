<template>
  <div class="timeseries">
    <d3-cartesian
      ref="cartesian"
      :margin="margin"
      :width="860"
      :height="350"
      :x="x"
      :y="y"
    >
      <!--- 
      :data="data" 
      x="timestamp"
      y="distancecm"
      --->
      <template #default="props">
        <d3-line
          :data="data"
          :color="color"
          x="currentXaxe"
          y="currentYaxe"
          :curveFn="curveFn"
          v-bind="props"
        />
        <d3-brush ref="brush" orientation="xy" @end="brushEnd" v-bind="props" />
      </template>
      <template #south="props">
        <d3-axis orientation="Bottom" v-bind="props" />
      </template>
      <template #west="props">
        <d3-axis orientation="Left" v-bind="props" />
      </template>
    </d3-cartesian>
  </div>
</template>

<script>
import * as d3 from "d3";
import { Cartesian, Brush, Line, Axis } from "../d3-vue";

const parseDate = d3.timeParse("%Y%m%d%H%M%S.%L");

export default {
  components: {
    d3Cartesian: Cartesian,
    d3Brush: Brush,
    d3Line: Line,
    d3Axis: Axis,
  },
  props: ["data", "currentXaxe", "currentYaxe"],
  data() {
    return {
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      x: { type: "Time", domain: [] },
      y: { type: "Linear", domain: [] },
      color: "seagreen",
      curveFn: d3.curveLinear,// curveMonotoneX,
      // data: [],
    };
  },
  methods: {
    zoomed(domain) {
      this.$refs.brush.moveTo(domain);
    },
    brushed(domain) {
      this.$refs.cartesian.zoomToX(domain);
    },
    brushEnd(domain) {
      if (domain) {
        this.$refs.cartesian.zoomTo(domain);
        this.$refs.brush.reset();
      } else {
        this.$refs.cartesian.resetZoom();
      }
    },
  },
  watch: {
    currentXaxe: function (newVal, oldVal) {
      this.currentXaxe = newVal;
      console.log("currentXaxe changed from", oldVal, "to", this.currentXaxe);
      this.currentXaxe = parseDate(this.currentXaxe);
      const domainX = [
        d3.min(this.data[this.currentXaxe]),
        d3.max(this.data[this.currentXaxe]),
      ];
      this.x.domain = domainX;
      console.log("this.x.domain: ", this.x.domain);
      this.data[0] = this.currentXaxe;
      console.log("this.data[0]: ", this.data[0]);
    },
    currentYaxe: function (newVal, oldVal) {
      this.currentYaxe = newVal;
      console.log("currentYaxe changed from", oldVal, "to", this.currentYaxe);
      const domainY = [
        parseInt(d3.min(this.data[this.currentYaxe])) - 5,
        parseInt(d3.max(this.data[this.currentYaxe])) + 5,
      ];
      this.y.domain = domainY;
      console.log("this.y.domain: ", this.y.domain);
      this.data[1] = this.currentYaxe;
      console.log("this.data[1]: ", this.data[1]);
    },
  },
  created: function () {
    console.log("props: ", this.data, this.currentXaxe, this.currentYaxe);
  },
  // created() {
  //   d3.csv("data/temp.csv", (d) => {
  //     d.timestamp = parseDate(d.timestamp);
  //     return d;
  //   }).then((data) => {
  //     const domainX = [
  //       d3.min(data, (d) => d.timestamp),
  //       d3.max(data, (d) => d.timestamp),
  //     ];
  //     const domainY = [
  //       parseInt(d3.min(data, (d) => d.distancecm)) - 5,
  //       parseInt(d3.max(data, (d) => d.distancecm)) + 5,
  //     ];
  //     this.x.domain = domainX;
  //     this.y.domain = domainY;
  //     this.data = data;
  //   });
  // },
};
</script>

<style lang="css" scoped>
/* @import "../../styles/theme.css"; */
</style>
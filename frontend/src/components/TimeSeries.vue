<template>
  <div class="timeseries">
    <!-- <navbar /> -->
    <d3-cartesian
      ref="cartesian"
      :margin="margin"
      :width="860"
      :height="350"
      :x="x"
      :y="y"
      zoom="x"
      @zoom="zoomed"
    >
      <template #default="props">
        <d3-line
          :data="data"
          x="timestamp"
          y="distancecm"
          :curveFn="curveFn"
          v-bind="props"
        />
        <d3-brush
          ref="brush"
          orientation="x"
          @brush="brushed"
          @end="brushed"
          v-bind="props"
        />
      </template>
      <template #south="props">
        <d3-axis orientation="Bottom" v-bind="props" />
      </template>
      <template #west="props">
        <d3-axis orientation="Left" v-bind="props" />
      </template>
    </d3-cartesian>
    <d3-cartesian :margin="margin" :width="860" :height="100" :x="x" :y="y">
      <!-- :x="x2" :y="y"> -->
      <template #default="props">
        <d3-line
          :data="data"
          x="timestamp"
          y="distancecm"
          :curveFn="curveFn"
          v-bind="props"
        />
        <d3-brush
          ref="brush"
          orientation="x"
          @brush="brushed"
          @end="brushed"
          v-bind="props"
        />
      </template>
      <template #south="props">
        <d3-axis orientation="Bottom" v-bind="props" />
      </template>
    </d3-cartesian>
  </div>
</template>

<script>
import * as d3 from "d3";
import { Cartesian, Brush, Line, Axis } from "./d3-vue";
// import navbar from "./NavBar.vue";

const parseDate = d3.timeParse("%Y%m%d%H%M%S.%L"); //"%b %Y");

export default {
  components: {
    d3Cartesian: Cartesian,
    d3Brush: Brush,
    d3Line: Line,
    d3Axis: Axis,
    // navbar,
  },
  data() {
    return {
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      x: { type: "Time", domain: [] },
      y: { type: "Linear", domain: [] },
      // x2: { type: "Time", domain: [] },
      curveFn: d3.curveMonotoneX,
      data: [],
    };
  },
  methods: {
    zoomed(domain) {
      this.$refs.brush.moveTo(domain);
    },
    brushed(domain) {
      this.$refs.cartesian.zoomToX(domain);
    },
  },
  created() {
    d3.csv("data/temp.csv", (d) => {
      // d.date = parseDate(d.date);
      // d.price = +d.price;
      d.timestamp = parseDate(d.timestamp);
      // console.log("[ d.timetamp, d.distancecm ]: ", [d.timestamp, d.distancecm] );
      return d;
    }).then((data) => {
      // const domainX = d3.extent(data, (d) => d.date);
      // const domainY = [0, d3.max(data, (d) => d.price)];
      const domainX = [
        d3.min(data, (d) => d.timestamp),
        d3.max(data, (d) => d.timestamp),
      ]; // d3.extent(data, (d) => d.timestamp);
      const domainY = [
        parseInt(d3.min(data, (d) => d.distancecm)) - 5,
        parseInt(d3.max(data, (d) => d.distancecm)) + 5,
      ]; // [0, d3.max(data, (d) => d.distancecm)];
      this.x.domain = domainX;
      this.y.domain = domainY;
      console.log("[ domainX, domainY ]: ", [domainX, domainY]);
      // this.x2.domain = domainX;
      this.data = data;
      // this.$nextTick(() => {
      //   this.$refs.brush.moveTo(this.x2.domain);
      // });
    });
  },
};
</script>

<style lang="css" scoped>
@import "../styles/theme.css";

.timeseries {
  display: block;
  width: 80%;
  height: 80%;
  /* margin: 4rem; */
  /* background-color: var(--background-color-primary); */
}
</style>
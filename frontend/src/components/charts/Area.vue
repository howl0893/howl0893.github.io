<template>
  <d3-cartesian :width="860" :height="450" :x="x" :y="y">
    <template #default="props">
      <d3-area :data="data" x="date" y="close" v-bind="props" />
    </template>
    <template #south="props">
      <d3-axis orientation="Bottom" v-bind="props" />
    </template>
    <template #west="props">
      <d3-axis orientation="Left" title="Price ($)" v-bind="props" />
    </template>
  </d3-cartesian>
</template>

<script>
import * as d3 from "d3";

import { Cartesian, Area, Axis } from "../d3-vue";

const parseTime = d3.timeParse("%d-%b-%y");

export default {
  components: {
    d3Cartesian: Cartesian,
    d3Area: Area,
    d3Axis: Axis,
  },
  data() {
    return {
      x: { type: "Time", domain: [] },
      y: { type: "Linear", domain: [] },
      data: [],
    };
  },
  created() {
    d3.tsv("/data/appl-stock.tsv", (d) => {
      d.date = parseTime(d.date);
      d.close = +d.close;
      return d;
    }).then((data) => {
      this.x.domain = d3.extent(data, (d) => d.date);
      this.y.domain = [0, d3.max(data, (d) => d.close)];
      this.data = data;
    });
  },
};
</script>
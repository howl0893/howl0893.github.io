<template>
  <div class="App">
    <D3LineChart id="chart" :config="chart_config" :datum="chart_data"></D3LineChart>
    <!-- <button @click="addData()">Add</button> -->
    <!-- <button @click="uploadFiles">Upload files</button> -->
    <form>
      <input type="file" @change="fileUpload" ref="file_input" multiple />
      <select name="x-axis" id="x-axis">
        <optgroup label="Swedish Cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
        </optgroup>
        <optgroup label="German Cars">
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </optgroup>
      </select>
      <select name="y-axis" id="y-axis">
        <optgroup label="Swedish Cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
        </optgroup>
        <optgroup label="German Cars">
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </optgroup>
      </select>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { D3LineChart } from "vue-d3-charts";
// import { openFilePicker } from "@/utils.js";

export default {
  components: {
    D3LineChart,
  },
  data() {
    return {
      chart_data: [
        { timestamp: "20210803T191252.0", distancecm: 0 },
        { timestamp: "20210803T191253.5", distancecm: 1 },
        { timestamp: "20210803T191254.0", distancecm: 2 },
        { timestamp: "20210803T191255.5", distancecm: 3 },
        { timestamp: "20210803T191256.0", distancecm: 4 },
        { timestamp: "20210803T191257.5", distancecm: 5 },
        { timestamp: "20210803T191258.0", distancecm: 6 },
        { timestamp: "20210803T191259.5", distancecm: 7 },
        { timestamp: "20210803T191260.0", distancecm: 8 },
        { timestamp: "20210803T191261.5", distancecm: 9 },
      ],
      chart_config: {
        values: ["timestamp", "distancecm"],
        date: {
          key: "timestamp",
          inputFormat: "%Y%m%dT%H%M%S.%L",
          outputFormat: "%M:%S.%L",
        },
        axis: {
          xTitle: "timestamp",
          yTitle: "distancecm",
        },
      },
    };
  },
  methods: {
    addData() {
      const timestamp = Math.random(0, 1259.999);
      const distancecm = Math.random(-250, 250);
      this.chart_data.push({ timestamp, distancecm });
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
          console.log(response);
          this.chart_data = response.data.data_dict.slice(0, 199);
          console.log(this.chart_data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
input,
label {
  margin: 0.5rem 0.5rem;
}
</style>>
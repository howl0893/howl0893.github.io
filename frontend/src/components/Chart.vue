<template>
  <div class="App">
    <D3LineChart :config="chart_config" :datum="chart_data"></D3LineChart>
    <!-- <button @click="addData()">Add</button> -->
    <!-- <button @click="uploadFiles">Upload files</button> -->
    <form>
      <input type="file" @change="fileUpload" ref="file_input" multiple />
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
        { timestamp: '20210803T191252.000', distancecm: 0 },
        { timestamp: '20210803T191253.500', distancecm: 1 },
        { timestamp: '20210803T191254.000', distancecm: 2 },
        { timestamp: '20210803T191255.500', distancecm: 3 },
        { timestamp: '20210803T191256.000', distancecm: 4 },
        { timestamp: '20210803T191257.500', distancecm: 5 },
        { timestamp: '20210803T191258.000', distancecm: 6 },
        { timestamp: '20210803T191259.500', distancecm: 7 },
        { timestamp: '20210803T191260.000', distancecm: 8 },
        { timestamp: '20210803T191261.500', distancecm: 9 },
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
          this.chart_data = response.data.data_dict.slice(0,199);
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
label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
}

input,
label {
    margin: .4rem 0;
}
</style>>
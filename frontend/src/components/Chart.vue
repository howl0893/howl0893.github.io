<template>
  <div class="App">
    <D3LineChart :config="chart_config" :datum="chart_data"></D3LineChart>
    <button @click="addData()">Add</button>
    <button @click="uploadFiles">Upload files</button>
    <!-- <input type="file" @change="uploadFiles" multiple> -->
  </div>
  <!-- <div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div> -->
</template>

<script>
import axios from "axios";
import { D3LineChart } from "vue-d3-charts";
import { openFilePicker } from "@/utils.js";

export default {
  components: {
    D3LineChart,
  },
  data() {
    return {
      chart_data: [
        { hours: 238, production: 134, date: 2000 },
        { hours: 938, production: 478, date: 2001 },
        { hours: 1832, production: 1392, date: 2002 },
        { hours: 2092, production: 2343, date: 2003 },
        { hours: 2847, production: 2346, date: 2004 },
        { hours: 2576, production: 2233, date: 2005 },
        { hours: 2524, production: 2325, date: 2006 },
        { hours: 1648, production: 2456, date: 2007 },
        { hours: 2479, production: 2329, date: 2008 },
        { hours: 3200, production: 2438, date: 2009 },
      ],
      chart_config: {
        values: ["hours", "production"],
        date: {
          key: "date",
          inputFormat: "%Y",
          outputFormat: "%Y",
        },
        points: {
          visibleSize: 3,
          hoverSize: 6,
        },
        axis: {
          // add label
          xTitle: "Year",
          yTitle: "Hours",
          // yTicks: 3,
        },
      },
      count: 2010,
    };
  },
  methods: {
    addData() {
      const hours = Math.floor(Math.random() * 1000 * 3);
      const production = Math.floor(Math.random() * 1000 * 3);
      const date = this.count++;
      this.chart_data.push({ hours, production, date });
    },

    uploadFiles() {
      this.uploading = true;
      const client = openFilePicker();
      var options = {
        accept: ["text/*", "image/*", "video/*", "audio/*"],
        onCancel: () => {
          this.uploading = false;
          console.log("cancelled upload");
        },
        onUploadDone: (res) => {
          console.log("upload complete");
          console.log(res.filesUploaded);
          res.filesUploaded.forEach((afile) => {
            delete afile.originalFile;
            console.log("file:", afile);
            axios
              .post('http://127.0.0.1:8000/api/file/', {
                file: JSON.stringify(afile),
              })
              .then((response) => {  
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        },
        transformations: { crop: false, circle: false, rotate: false },
      };
      client.picker(options).open();
    },

    /*
    filesUploaded(fileInfo) {
      var filesUploaded = fileInfo.filesUploaded;
      // Remove the originalFile embedded document business — redundant information.
      filesUploaded.forEach((file) => {
        delete file.originalFile;
      });

      let details = { datasetId: this.datasetId, file: filesUploaded[0] };
      this.$store.dispatch("datasets/addInitialFile", details);
    },

    complete() {
      this.$emit("uploaded");
    },*/
  },
};

// import Vue from 'vue'
// import Highcharts from 'highcharts'
// import exportingInit from 'highcharts/modules/exporting'
// import HighchartsVue from "highcharts-vue";

// Vue.use(HighchartsVue);

// exportingInit(Highcharts)

// export default {
//   data() {
//     return {
//       chartOptions: {
//         series: [
//           {
//             data: [10, -2, 3, 30, -54]
//           }
//         ]
//       }
//     };
//   }
// };
</script>

<style scoped>
</style>>
<template>
  <form>
    <label for="deviceName">Device name: </label>
    <input type="text" id="deviceName" v-model="deviceName"/>
    <input type="submit" @change="connectDevice"/>
  </form>
</template>

<script>
import axios from "axios";

export default {
  emits: ["device-name"], // "imported-data", 
  data() {
    return {
      deviceName: "",
    //   importedData: [],
    };
  },
  methods: {
    connectDevice(event) {
      const url = "http://127.0.0.1:8000/iot/devices/";
      const formData = new FormData();
      this.deviceName = event.target.deviceName;

      console.log("deviceName: ", this.deviceName);
      formData.append("deviceName", this.deviceName);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      axios
        .post(url, formData, config)
        .then((response) => {
          console.log("response: ", response);
          
        // TODO: dynamically slice data
        //   this.importedData = response.data.data_dict.slice(0, 500);
        //   console.log("this.importedData: ", this.importedData);

        //   this.$emit("device-name", this.deviceName);
        //   this.$emit("imported-data", this.importedData);
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
  margin-left: 2%;
}
</style>
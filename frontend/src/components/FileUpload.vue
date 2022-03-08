<template>
  <div>
    <input type="file" @change="uploadCSV" ref="file_input" multiple />
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ["import-data"],
  data() {
    return {
      imported_data: [],
    };
  },
  methods: {
    uploadCSV(event) {
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
          console.log("response: ", response);
          // TODO: dynamically slice data
          this.imported_data = response.data.data_dict.slice(0, 199);
          console.log("this.imported_data: ", this.imported_data);
          this.$emit("imported-data", this.imported_data);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
  },
};
</script>
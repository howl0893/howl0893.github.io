<template>
  <div>
    <input type="file" @change="uploadCSV" ref="file_input" multiple />
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ["imported-data", "filename"],
  data() {
    return {
      filename: null,
      importedData: [],
    };
  },
  methods: {
    uploadCSV(event) {
      const url = "http://127.0.0.1:8000/api/file/";
      const formData = new FormData();
      const file = event.target.files[0];

      this.filename = file.name;
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
          this.importedData = response.data.data_dict.slice(0, 199);
          console.log("this.importedData: ", this.importedData);

          this.$emit("filename", this.filename);
          this.$emit("imported-data", this.importedData);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
  },
};
</script>
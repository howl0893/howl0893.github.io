function dummy(args) {}

// axios.interceptors.request.use((config) => {
//   const token = window.localStorage.getItem('springmatter-token');
//   if (token) {
//     config.headers.Authorization = `${token}`;
//   }
//   return config;
// });

// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });

class Samsa {
  // I initialize the swappable proxy.
  constructor(url = null, path = null) {
    var proxy = new Proxy(
      dummy, // This value is irrelevant, it just has to be valid.
      {
        get: function(_, property, receiver) {
          if (path == null) var new_path = property;
          else var new_path = path + "." + property;
          return new Samsa(url, new_path);
        },
        apply: async function(target, thisArg, args) {
          const method_types = ["get", "post", "put", "delete"];

          var str_arg = args.join("&args=")

          var url_parts = target.path.split(".").join("/");

          var path_parts = target.path.split(".");
          console.log("Path Parts: ", path_parts)

          path_parts[0] = "samsa_"+path_parts[0]
          url_parts = path_parts.join("/");
          var url = target.base_url + url_parts + "?args=" + str_arg;

          var path = path_parts.pop();
          
          var method = null;

          if (method_types.includes(path)) {
            url_parts = path_parts.join("/");
            method = path;
            url = target.base_url + url_parts;
            path = path_parts.pop();
          }

          method = "post"

          if (method == null || method == "get"){
            console.log("GET:", url)
             var ret = await axios.get(url);
            return ret.data
          }
          else if (method == "post"){
            console.log("Post:", url, args)
            var ret = await axios.post(url,args);
            return ret.data

        }
          else if (method == "put")
            return axios.put(url, {
              transformResponse: [
                (data) => {
                  return JSON.parse(data)[path];
                },
              ],
            });
          else if (method == "delete")
            return axios.delete(url, {
              transformResponse: [
                (data) => {
                  return JSON.parse(data)[path];
                },
              ],
            });
        },
      }
    );
    proxy._return = {};
    proxy.base_url = url;
    proxy.path = path;
    proxy._ready = false;
    return proxy;
  }
}

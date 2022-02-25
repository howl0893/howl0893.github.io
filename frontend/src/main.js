import Vue from 'vue'
import App from './App.vue'
import router from "./router/routes.js";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// imported in public/index.html
window.$samsa = new Samsa("http://127.0.0.1:8000/");
// Vue.prototype.$samsa = $samsa;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
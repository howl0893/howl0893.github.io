import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from "./router/routes.js";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
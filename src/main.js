import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/style/index.scss"; // glob scss
import "@/plugins/element.js";
import animated from "animate.css";
import "@/assets/iconfont/iconfont.css";
Vue.config.productionTip = false;
Vue.use(animated);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

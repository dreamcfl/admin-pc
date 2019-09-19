import Vue from "vue";
import { post, get, del, put, upload, exportExcel } from "./index";
const _baseUrl = process.env.VUE_APP_URL;
/* eslint-disable */
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$del = del
Vue.prototype.$put = put
Vue.prototype.$upload = upload
Vue.prototype.$exportExcel = exportExcel

// 登录
const loginInURL = `${_baseUrl}/login`
export const loginInApi = function (json) {
  return Vue.prototype.$post(loginInURL, json)
}
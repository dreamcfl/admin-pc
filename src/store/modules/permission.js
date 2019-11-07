import { asyncRoutes, currencyRoutes } from "@/router";

const state = {
  routes: [],
  addRoutes: [],
  isFindRouter: false
};
const mutations = {
  SET_ROUTES(state, payload) {
    state.routes = [...currencyRoutes, ...payload];
    state.addRoutes = payload;
  },
  SET_ISFINDROUTER(state, value){
    state.isFindRouter = value
  }
};
// 遍历asyncRoutes动态路由
// function forSearchArr(route, roles) {
  // roles = JSON.parse(roles);
//   let arrNew = [];
//   for (let item of route) {
//     let itemNew = { ...item }; //解决浅拷贝共享同一内存地址
//     if (roles.includes(itemNew.name)) {
//       if (itemNew.children) {
//         itemNew.children = forSearchArr(itemNew.children, roles);
//       }
//       arrNew.push(itemNew);
//     }
//   }
//   return arrNew;
// }
const actions = {
  getAsyncRoutes({ commit, rootGetters }, roles) {
    return new Promise(resolve => {
      let routes = [];
      if (rootGetters.userName === "admin") {
        // 最高权限
        routes = asyncRoutes || "";
      } else {
        // 权限控制
        window.console.log(roles);
        // routes = forSearchArr(asyncRoutes, roles);
        routes = asyncRoutes || "";
      }
      commit("SET_ROUTES", routes);
      commit('SET_ISFINDROUTER', true)
      resolve(routes);
    });
  },
  delIsFindRouter({ commit }) {
    commit("SET_ISFINDROUTER",false);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

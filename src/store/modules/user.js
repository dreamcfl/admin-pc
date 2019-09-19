import Cookie from "@u/cookie";

const state = {
  token: Cookie.get("token") ? Cookie.get("token") : "", // 认证凭证'
  userName: Cookie.get("userName") ? Cookie.get("userName") : "",
  roles: [],
  introduce: ""
};
const mutations = {
  SET_TOKEN(state, val) {
    state.token = val;
    Cookie.set("token", val);
  },
  DEL_TOKEN(state) {
    state.token = "";
    state.userName = "";
    state.roles = "";
    state.introduce = "";
    Cookie.delete("token");
    Cookie.delete("userName");
  },
  SET_ROLES(state, payload) {
    state.roles = payload;
  },
  SET_NAME(state, payload) {
    state.userName = payload;
    Cookie.set("userName", payload);
  },
  SET_INTRODUCE(state, payload) {
    state.introduce = payload;
  }
};
const actions = {
  // user login
  //  设置 token
  setToken({ commit }, token) {
    commit("SET_TOKEN", token);
  },
  delToken({ commit }) {
    commit("DEL_TOKEN");
  },
  setName({ commit }, value) {
    window.console.log(value);
    commit("SET_NAME", value);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

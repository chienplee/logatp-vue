import mutations from "./mutations";
import getters from "./getters";
import Cookies from "js-cookie";

const state = () => ({
  login: Cookies.get("logedIn"),
  loading: false,
  error: null,
  username: "Nagarjuna",
  user: "",
});

const actions = {
  async login({ commit }) {
    try {
      commit("loginBegin");
      Cookies.set("logedIn", true);
      return commit("loginSuccess", true);
    } catch (err) {
      commit("loginErr", err);
    }
  },
  async logOut({ commit }) {
    try {
      commit("logoutBegin");
      Cookies.remove("logedIn");
      commit("logoutSuccess", null);
    } catch (err) {
      commit("logoutErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
  getters,
};

import staticData from '@/config/config';
import mutations from './mutations';

const state = () => ({
  data: staticData.darkMode,
  rtlData: staticData.rtl,
  topMenu: staticData.topMenu,
  loading: false,
  rtlLoading: false,
  menuLoading: false,
  error: null,
});

const actions = {
  async changeLayoutMode({ commit }, value) {
    try {
      commit('changeLayoutBegin');
      setTimeout(() => commit('changeLayoutSuccess', value), 10);
    } catch (err) {
      commit('changeLayoutErr', err);
    }
  },

  async changeRtlMode({ commit }, value) {
    try {
      commit('changeRtlBegin');
      setTimeout(() => commit('changeRtlSuccess', value), 10);
    } catch (err) {
      commit('changeRtlErr', err);
    }
  },

  async changeMenuMode({ commit }, value) {
    try {
      commit('changeMenuBegin');
      setTimeout(() => commit('changeMenuSuccess', value), 10);
    } catch (err) {
      commit('changeMenuErr', err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};

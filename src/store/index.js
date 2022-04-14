import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否显示登录模块
    ifShowLoginModel: false,
    // Header组件的登录状态
    logined: localStorage.getItem('x-auth-token'),
    // Toast
    toastStatus: false, // 显示与隐藏
    toastType: '', // 类型（success，warn，danger）
    toastMsg: '', // 显示内容
  },
  mutations: {
    // 显示登录模块
    showLoginModalFn(state) {
      state.ifShowLoginModel = true;
    },
    // 隐藏显示登录模块
    hideLoginModalFn(state) {
      state.ifShowLoginModel = false;
    },
    // 修改logined的值
    changeLogined(state) {
      state.logined = localStorage.getItem('x-auth-token');
    },
    // Toast显示
    showToast(state, payload) {
      state.toastMsg = payload.toastMsg;
      state.toastType = payload.toastType;
      state.toastStatus = true;
    },
    // Toast隐藏
    hideToast(state) {
      state.toastStatus = false;
    }
  },
  actions: {
    // 异步控制Toast显示隐藏
    changeToastAsync({ commit }, payload) {
      commit("showToast", {
        toastMsg: payload.toastMsg,
        toastType: payload.toastType,
      });
      setTimeout(() => {
        commit("hideToast");
      }, 3000);
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否显示登录模块
    ifShowLoginModel: true,
    // Header组件的登录状态
    logined: localStorage.getItem('x-auth-token')
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
    }
  },
  actions: {
  },
  modules: {
  }
})

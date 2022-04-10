import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否显示登录模块
    ifShowLoginModel: true
  },
  mutations: {
    // 显示登录模块
    showLoginModalFn(state) {
      state.ifShowLoginModel = true;
    },
    // 隐藏显示登录模块
    hideLoginModalFn(state) {
      state.ifShowLoginModel = false;
    }
  },
  actions: {
  },
  modules: {
  }
})

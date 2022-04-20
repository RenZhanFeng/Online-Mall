import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import SlideVerify from 'vue-monoplasty-slide-verify' // 拼图验证码
import VueLazyload from 'vue-lazyload' // 懒加载

Vue.use(SlideVerify)

// 懒加载配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // 这里注意，不能写相对路径，因此打包上线也需要修改这个地址
  loading: 'http://codesohigh.com/img_loading.gif',
  attempt: 1
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

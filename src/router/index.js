import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "goods" */ '../views/Home.vue')
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import(/* webpackChunkName: "goods" */ '../views/Goods.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue')
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/cart',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    children: [{
      path: 'cart',
      name: 'Cart',
      component: () => import(/* webpackChunkName: "cart" */ '../components/user/Cart.vue')
    }, {
      path: 'strategy',
      name: 'Strategy',
      component: () => import(/* webpackChunkName: "strategy" */ '../components/user/Strategy.vue')
    }]
  },
  {
    path: '/welfare',
    name: 'Welfare',
    component: () => import(/* webpackChunkName: "welfare" */ '../views/Welfare.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "Detail" */ '../views/Detail.vue')
  },
  {
    path: '*',
    name: Error,
    component: () => import(/* webpackChunkName: "Error" */ '../views/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  let mypath = to.path;
  let exp = new RegExp(/\/user/g);
  // 进入个人中心页面和我的订单页面需要判断是否登录
  if (exp.test(mypath) || mypath === '/order') {
    let token = localStorage.getItem('x-auth-token');
    if (!token) {
      // 未登录不允许跳转
      store.dispatch("changeToastAsync", {
        toastMsg: '请先登录',
        toastType: "warn",
      });
      store.commit('showLoginModalFn');
      return;
    }
  }
  next();
})


//解决路由升级导致的vue版本过低报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router

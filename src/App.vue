<template>
  <div id="app">
    <transition name="toast"
      ><Toast v-show="$store.state.toastStatus"
    /></transition>
    <Header :key="headerCount" />
    <Nav />
    <router-view @upDataNum="upDataNum" />
    <Footer />
    <Login v-show="this.$store.state.ifShowLoginModel" />
  </div>
</template>

<script>
import Header from "components/Header";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Login from "components/Login";
import Toast from "components/Toast";

export default {
  data() {
    return {
      headerCount: 1, // 用来刷新Header组件
    };
  },
  components: {
    Toast,
    Header,
    Nav,
    Footer,
    Login,
  },
  methods: {
    upDataNum() {
      this.headerCount++;
    },
  },
  watch: {
    // 路由发生变化就修改headerCount让Header刷新
    "$route.path": {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.headerCount++;
        }
      },
    },
  },
};
</script>

<style>
@import "https://at.alicdn.com/t/font_2730880_ylrio3ahhx.css";
body {
  font-size: 16px;
  font-family: SourceHanSansSC;
  font-weight: 300;
  color: #333333;
}
.banxin {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.toast-enter,
.toast-leave-to {
  top: -50px;
  opacity: 0;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s linear;
}
.toast-enter-to,
.toast-leave {
  top: 0;
  opacity: 1;
}

/* 懒加载样式设置 */
img[lazy="loading"] {
  display: block;
  width: 30% !important;
  height: 30% !important;
  margin: 0 auto;
}
</style>

<template>
  <div id="app">
    <transition name="toast"><Toast v-show="$store.state.toastStatus" /></transition>
    <Header />
    <Nav />
    <router-view class="banxin" />
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
  components: {
    Toast,
    Header,
    Nav,
    Footer,
    Login,
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
.toast-enter, .toast-leave-to{
  top: -50px;
  opacity: 0;
}
.toast-enter-active, .toast-leave-active{
  transition: all .4s linear;
}
.toast-enter-to, .toast-leave{
  top: 0;
  opacity: 1;
}
</style>

<template>
  <div id="app">
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

export default {
  components: {
    Header,
    Nav,
    Footer,
    Login,
  },
};
</script>

<style>
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
</style>

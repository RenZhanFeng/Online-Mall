<template>
  <div class="home banxin">
    中心内容
    <button @click="isShow = true">显示</button>
    <button @click="isShow = false">隐藏</button>
    <transition name="v">
      <div class="box" v-show="isShow"></div>
    </transition>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  components: {},
};
</script>
 
<style lang = "less" scoped>
@import "../total.less";

.box {
  width: 100px;
  height: 100px;
  background: pink;
  opacity: 1;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
.v-enter-active, .v-leave-to {
  transition: opacity 1s linear;
}
.v-enter-to, .v-leave {
  opacity: 1;
}
</style>
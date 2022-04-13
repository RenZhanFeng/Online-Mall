<template>
  <div class="home banxin">
    中心内容
    <button @click="isShow = true">显示</button>
    <button @click="isShow = false">隐藏</button>
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

</style>
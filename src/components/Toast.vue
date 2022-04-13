<template>
  <div class="toast">
    <i
      class="iconfont icon-toast-shibai_huaban"
      :class="
        $store.state.toastType == 'success'
          ? 'iconfont icon-toast_chenggong'
          : $store.state.toastType == 'warn'
          ? 'iconfont icon-toast-jinggao'
          : 'icon-toast-shibai_huaban'
      "
    ></i>
    <span>{{ $store.state.toastMsg }}</span>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background: #fff;
  border-radius: 10px;
  .iconfont {
    margin-right: 10px;
  }
  .icon-toast-shibai_huaban {
    color: red;
  }
  .icon-toast-jinggao {
    color: orange;
  }
  .icon-toast_chenggong {
    color: green;
  }
}
</style>
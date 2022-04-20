<template>
  <div class="crumbs">
    <span
      v-for="(item, index) in nav"
      :key="index"
      v-text="index < nav.length - 1 ? `${item.name} / ` : item.name"
      :class="index == nav.length - 1 ? 'active' : ''"
    ></span>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  props: {
    nav: {
      required: true,
      default: [{ name: "" }, { name: "" }],
    },
  },
};
</script>
 
<style lang = "less" scoped>
.crumbs {
  span {
    cursor: pointer;
    color: #999999;
    &.active {
      color: #333333;
    }
  }
}
</style>
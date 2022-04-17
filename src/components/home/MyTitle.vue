<template>
  <div class="banxin myTitle">
    <div>
      <img :src="imgSrc" alt="" />
      <h2>{{ titleTxt }}</h2>
    </div>
    <div :style="{ display: titleTxt == '积分攻略' ? 'none' : 'flex' }">
      <span>更多</span>
      <img src="../../assets/img/home/Arrow.png" alt="more" />
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  props: ["titleTxt", "imgSrc"],
};
</script>
 
<style lang = "less" scoped>
@import "../../total.less";
.myTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
  div {
    display: flex;
    align-items: center;
    h2 {
      font-size: 30px;
      font-weight: bold;
      margin-left: 10px;
    }
    span {
      margin-right: 6px;
    }
    &:nth-child(2) {
      cursor: pointer;
    }
  }
}
</style>
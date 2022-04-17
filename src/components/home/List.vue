<template>
  <div class="list banxin">
    <ul>
      <li v-for="item in arr" :key="item.id" @click="goDetail(item.id)">
        <section>
          <img class="productImg" :src="item.coverImg" alt="product" />
          <img
            class="labelImg"
            src="../../assets/img/home/hot-j.png"
            alt="hot"
            v-if="item.isHotSale"
          />
          <img
            class="labelImg"
            src="../../assets/img/home/new-j.png"
            alt="new"
            v-if="item.isLatest"
          />
          <div class="title">{{ item.name }}</div>
          <div class="integral">
            {{ item.coin }} <img src="../../assets/img/home/monad.png" alt="" />
          </div>
          <div class="btn">立即兑换</div>
        </section>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  props: ["arr"],
  methods: {
    goDetail(id) {
      this.$router.push(`/detail?id=${id}`);
    },
  },
};
</script>
 
<style lang = "less" scoped>
@import "../../total.less";
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    margin-top: 20px;
    margin-right: 20px;
    &:nth-child(4n) {
      margin-right: 0;
    }
    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      cursor: pointer;
      position: relative;
      transition: all 0.8s ease;
      .productImg {
        display: block;
        width: 100%;
      }
      .labelImg {
        position: absolute;
        top: 0;
        left: 0;
      }
      .title {
        margin-top: 22px;
        font-size: 18px;
      }
      .integral {
        display: flex;
        margin-top: 16px;
        font-size: 18px;
        font-weight: bold;
        color: @orange;
        img {
          width: 20px;
          height: 20px;
          margin-left: 6px;
          display: block;
          border: none;
        }
      }
      .btn {
        margin-top: 20px;
        margin-bottom: 32px;
        width: 100px;
        height: 36px;
        border: 1px solid @blue;
        font-size: 18px;
        color: @blue;
        text-align: center;
        line-height: 36px;
      }
    }
    &:hover {
      .btn {
        background: @blue;
        color: #fff;
      }
      section {
        transform: translateY(-15px);
        box-shadow: 0px 6px 25px rgb(0 0 0 / 5%);
      }
    }
  }
}
</style>
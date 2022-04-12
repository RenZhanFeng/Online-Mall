<template>
  <div class="header">
    <section class="banxin">
      <div class="left">欢迎来到线上商城</div>
      <div class="right">
        <ul>
          <li class="avatar_li">
            <img class="avatar" src="../assets/img/userImg.png" alt="avatar" />
            <span>用户名：游客</span>
          </li>
          <li>我的积分：--</li>
          <li>获取积分</li>
          <li>公司官网</li>
        </ul>
        <div
          class="shopping_car"
          @click="showLoginModalFn"
          v-if="$store.state.logined"
        >
          <img src="../assets/img/Shopping.png" alt="" />
          购物车
          <span class="count">6</span>
        </div>
        <div class="shopping_car" @click="showLoginModalFn" v-else>登录</div>
      </div>
    </section>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  methods: {
    showLoginModalFn() {
      this.$store.commit("showLoginModalFn");
    },
  },
};
</script>
 
<style lang = "less" scoped>
.header {
  width: 100%;
  background: #242b39;
  height: 40px;
  color: #fffefe;
  section {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      display: flex;
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          display: flex;
          align-items: center;
          margin-right: 20px;
          cursor: pointer;
          .avatar {
            width: 26px;
            height: 26px;
            border-radius: 13px;
            margin-right: 6px;
          }
        }
      }
      .shopping_car {
        width: 124px;
        height: 40px;
        background: #0a328e;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
        .count {
          width: 22px;
          height: 22px;
          background: #fd604d;
          border-radius: 11px;
          text-align: center;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="user banxin">
    <BreadCrumbs :nav="breadNav"></BreadCrumbs>
    <div class="main">
      <div class="left">
        <div class="info">
          <img :src="userInfo.headImg" alt="avatar" />
          <div>
            <span class="name">{{ userInfo.username }}</span>
            <span class="quit" @click="quit">[ 退出 ]</span>
          </div>
        </div>
        <div class="management">
          <div class="title">
            <img src="../assets/img/person/transaction.png" alt="" />
            <span>交易管理</span>
          </div>
          <ul>
            <li
              v-for="item in transactionList"
              :key="item.id"
              :class="active == item.id ? 'active' : ''"
              @click="jumpLink(item.id, item.path)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div class="management">
          <div class="title">
            <img src="../assets/img/person/information.png" alt="" />
            <span>个人信息管理</span>
          </div>
          <ul>
            <li
              v-for="item in informationList"
              :key="item.id"
              :class="active == item.id ? 'active' : ''"
              @click="jumpLink(item.id, item.path)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
      <div class="right"><router-view></router-view></div>
    </div>
  </div>
</template>
 
<script>
import BreadCrumbs from "../components/BreadCrumbs.vue";

export default {
  data() {
    return {
      // 面包屑
      breadNav: [{ name: "首页" }, { name: "个人中心" }],
      // 交易管理
      transactionList: [
        { title: "购物车", id: 3, path: "/cart" },
        { title: "积分攻略", id: 6, path: "/strategy" },
        { title: "个人中心", id: 1, path: "" },
        { title: "我的订单", id: 2, path: "" },
        { title: "消息通知", id: 4, path: "" },
        { title: "积分明细", id: 5, path: "" },
      ],
      // 个人信息管理
      informationList: [
        { title: "地址管理", id: 7, path: "" },
        { title: "账号安全", id: 8, path: "" },
      ],
      active: "3",
      // 用户信息
      userInfo: "",
    };
  },
  methods: {
    // 退出登录
    quit() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("x-auth-token");
      this.$store.dispatch("changeToastAsync", {
        toastMsg: "退出成功",
        toastType: "success",
      });
      this.$router.push("/");
      //x-auth-token
      //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTA1NTY5MDIsImlhdCI6MTY0OTk1MjEwMiwidXNlcm5hbWUiOiIyMmY2YTFmMi1kMThlLTQxMmMifQ.6O3evnxeKePMEuRUI_p9n_CaIEmzj9aPwI9PxknwrhA
    },
    // 跳转路由
    jumpLink(id, path) {
      this.active = id;
      this.$router.push(`/user${path}`);
    },
  },
  components: {
    BreadCrumbs,
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
};
</script>
 
<style lang = "less" scoped>
@import "../total.less";
.user {
  .main {
    margin-top: 18px;
    padding-top: 28px;
    border-top: 1px solid #ccc;
    display: flex;
    user-select: none;
    .left {
      width: 200px;
      height: 740px;
      background: #e7e7e7;
      padding: 30px 18px;
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        img {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
        }
        .quit {
          color: @blue;
          cursor: pointer;
          margin-left: 10px;
        }
      }
      .management {
        margin-top: 36px;
        .title {
          display: flex;
          align-items: center;
          img {
            display: block;
            margin-right: 5px;
          }
          span {
            font-weight: bold;
          }
        }
        ul {
          padding-left: 10px;
          li {
            font-size: 14px;
            color: #666666;
            margin-top: 20px;
            cursor: pointer;
            &.active {
              color: @blue;
              &::before {
                width: 2px;
                height: 14px;
                background: @blue;
                content: "";
                display: inline-block;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
    .right {
      flex: 1;
      margin-left: 60px;
    }
  }
}
</style>
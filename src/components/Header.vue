<template>
  <div class="header">
    <section class="banxin">
      <div class="left">欢迎来到线上商城</div>
      <div class="right">
        <ul>
          <li class="avatar_li">
            <!-- referrerPolicy="no-referrer" 是因为图片地址使用了防盗链的策略，
            会在后台判断请求的Referrer属性是不是来自于一个非本域名的网站，如果来源不是本域名就返回 403 forbidden。-->
            <img
              class="avatar"
              :src="userInfo.headImg"
              alt="avatar"
              referrerPolicy="no-referrer"
            />
            <span>用户名：{{ userInfo.username }}</span>
          </li>
          <li>我的积分：{{ userInfo.coin }}</li>
          <li>获取积分</li>
          <li>公司官网</li>
        </ul>
        <div class="shopping_car" v-if="$store.state.logined" @click="goCart">
          <img src="../assets/img/Shopping.png" alt="" />
          购物车
          <span class="count">{{ cartTotal }}</span>
        </div>
        <div class="shopping_car" @click="showLoginModalFn" v-else>登录</div>
      </div>
    </section>
  </div>
</template>
 
<script>
import { WeixinLoginApi, UserProfilesApi } from "../request/api";
export default {
  data() {
    return {
      userInfo: {
        //require一个文件的地址的话，会把这个东西作为一个路径来使用，不这样的话获取不到图片
        headImg: require("../assets/img/userImg.png"),
        nickName: "游客",
        coin: "--",
      },
      cartTotal: 0,
    };
  },
  methods: {
    // 去购物车
    goCart() {
      this.$router.push("/user/cart");
    },
    showLoginModalFn() {
      this.$store.commit("showLoginModalFn");
    },
  },
  created() {
    // 微信登录获取的code转换成登录token
    let _this = this;
    if (this.$route.query.code) {
      // 存在code，说明扫码登录过，直接做请求
      WeixinLoginApi({
        code: this.$route.query.code,
      }).then((res) => {
        if (res.code === 0) {
          console.log("res:", res);
          // 登陆成功, 存token
          localStorage.setItem("x-auth-token", res["x-auth-token"]);
          _this.$store.dispatch("changeToastAsync", {
            toastMsg: res.message,
            toastType: "success",
          });
          // 把顶部的“登录”按钮更换为“购物车”按钮
          this.$store.commit("changeLogined");
        } else {
          _this.$store.dispatch("changeToastAsync", {
            toastMsg: res.message,
            toastType: "danger",
          });
        }
        // 清楚code参数
        _this.$router.push(_this.$route.path);
        setTimeout(() => {
          _this.$router.go(0); // 刷新当前页
        }, 2000);
      });
    } else {
      // 没有code，说明可能未登录，也可能登录过已存好token，所以此时要判断重新判断是显示“购物车”还是“登录”
      this.$store.commit("changeLogined");
      // 如果已登录，就请求用户信息
      let userToken = localStorage.getItem("x-auth-token");
      if (userToken) {
        UserProfilesApi().then((res) => {
          if (res.code === 0) {
            let { cartTotal, userInfo } = res.data;
            this.userInfo = userInfo;
            this.cartTotal = cartTotal;
            // 存储userInfo
            let myUserInfo = JSON.stringify(userInfo);
            localStorage.setItem("userInfo", myUserInfo);
          } else {
            this.$store.dispatch("changeToastAsync", {
              toastMsg: res.message,
              toastType: "danger",
            });
          }
        });
      }
    }
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
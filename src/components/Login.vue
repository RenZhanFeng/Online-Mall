<template>
  <div class="login">
    <div class="login_bg" @click="hideLoginModalFn"></div>
    <div class="login_content">
      <img class="close" src="../assets/img/login/userArrow.png" alt="" @click="hideLoginModalFn"/>
      <ul>
        <li
          :class="loginType == 'phone' ? 'active' : ''"
          @click="loginType = 'phone'"
        >
          手机号码登录
        </li>
        <li
          :class="loginType == 'weixin' ? 'active' : ''"
          @click="weixinClickFn"
        >
          微信扫码登录
        </li>
      </ul>
      <div class="from" v-show="loginType == 'phone'">
        <div class="ipt">
          <input type="text" placeholder="请输入手机号" v-model="phoneNum" />
        </div>
        <slide-verify
          :l="42"
          :r="20"
          :w="362"
          :h="140"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
          :style="{ width: '100%' }"
          class="slide-box"
          ref="slideBlock"
          :slider-text="msg"
        ></slide-verify>
        <div class="ipt">
          <input
            type="text"
            placeholder="请输入短信验证码"
            v-model="verificationCode"
          />
          <div
            class="btn"
            :class="showCountDown ? 'active' : ''"
            @click="getVerificationCode"
          >
            <span v-if="!showCountDown">获取验证码</span>
            <span v-else>{{ countDown }} s</span>
          </div>
        </div>
        <div></div>
        <div class="login_btn" @click="phoneLogin">登录</div>
      </div>
      <div id="weixin" v-show="loginType == 'weixin'"></div>
    </div>
  </div>
</template>
 
<script>
import { validateTelephone } from "../utils/validate";
import { SendVerificationCodeApi, PhoneLoginApi } from "../request/api";

export default {
  data() {
    return {
      msg: "向右滑动",
      phoneNum: "", // 手机号码
      verificationCode: "", // 验证码
      countDown: 60, // 倒计时
      showCountDown: false, // 是否显示倒计时
      loginType: "phone", // 登录模式(phone, weixin)
    };
  },
  methods: {
    // 微信扫码登录
    weixinClickFn() {
      this.loginType = "weixin";
      // let _this = this;
      // new WxLogin({
      //   id: "weixin",
      //   appid: "wx67cfaf9e3ad31a0d", // 这个appid要填死
      //   scope: "snsapi_login",
      //   // 扫码成功后重定向的接口
      //   redirect_uri: "https://sc.wolfcode.cn/cms/wechatUsers/shop/PC",
      //   // state填写编码后的url
      //   state: encodeURIComponent(
      //     window.btoa(process.env.VUE_APP_STATE_URL + _this.$route.path)
      //   ),
      //   // 调用样式文件
      //   href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlLA0KLmltcG93ZXJCb3ggLmluZm8gew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQoNCi5pbXBvd2VyQm94IC5xcmNvZGUgew0KICAgIG1hcmdpbi10b3A6IDIwcHg7DQp9",
      // });
    },
    // 点击登录按钮(手机验证码登录)
    phoneLogin() {
      // 判断手机号码是否填写正确
      if (!validateTelephone(this.phoneNum)) {
        this.$store.dispatch("changeToastAsync", {
          toastMsg: "请正确填写手机号码",
          toastType: "warn",
        });
        return;
      }
      // 判断验证码是否填写
      if (this.verificationCode.trim() == "") {
        this.$store.dispatch("changeToastAsync", {
          toastMsg: "请填写验证码",
          toastType: "warn",
        });
        return;
      }
      // 判断滑块是否滑动正确
      if (this.msg == "再试一次" || this.msg == "向右滑动") {
        this.$store.dispatch("changeToastAsync", {
          toastMsg: "请滑动拼图",
          toastType: "warn",
        });
        return;
      }
      // 登录请求
      PhoneLoginApi({
        verifyCode: this.verificationCode,
        phone: this.phoneNum,
      }).then((res) => {
        if (res.code === 0) {
          this.$store.dispatch("changeToastAsync", {
            toastMsg: res.message,
            toastType: "success",
          });
          // 存储token
          localStorage.setItem("x-auth-token", res["x-auth-token"]);
          // 切换登录状态，顶部登录按钮改为购物车
          this.$store.commit("changeLogined");
          // 登录模态框隐藏
          this.hideLoginModalFn();
        } else {
          this.$store.dispatch("changeToastAsync", {
            toastMsg: res.message,
            toastType: "danger",
          });
        }
      });
    },
    // 获取手机验证码
    getVerificationCode() {
      // 正则验证手机号码是否正确
      if (!validateTelephone(this.phoneNum)) {
        this.$store.dispatch("changeToastAsync", {
          toastMsg: "请正确填写手机号码",
          toastType: "warn",
        });
        return;
      }
      // 倒计时
      let timer = null;
      this.showCountDown = true;
      this.timer = setInterval(() => {
        this.countDown--;
        if (this.countDown == 0) {
          this.countDown = 60;
          this.showCountDown = false;
          clearInterval(timer);
        }
      }, 1000);
      // 发送验证码请求
      SendVerificationCodeApi({ phone: this.phoneNum })
        .then((res) => {
          if (res.code === 0) {
            this.$store.dispatch("changeToastAsync", {
              toastMsg: res.message,
              toastType: "success",
            });
          } else {
            this.$store.dispatch("changeToastAsync", {
              toastMsg: res.message,
              toastType: "warn",
            });
          }
        })
        .catch((err) => {
          this.$store.dispatch("changeToastAsync", {
            toastMsg: err.message,
            toastType: "danger",
          });
        });
    },
    // 隐藏登录模块
    hideLoginModalFn() {
      this.$store.commit("hideLoginModalFn");
    },
    // 拼图成功
    onSuccess(times) {
      let ms = (times / 1000).toFixed(1);
      this.msg = "login success, 耗时 " + ms + "s";
    },
    // 拼图失败
    onFail() {
      this.onRefresh(); // 重新刷新拼图
    },
    // 拼图刷新
    onRefresh() {
      this.msg = "再试一次";
    },
  },
};
</script>
 
<style lang = "less" scoped>
.login {
  .login_bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .login_content {
    width: 555px;
    height: 423px;
    background: url(../assets/img/login/loginBg.png) no-repeat;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    .close {
      position: absolute;
      right: 60px;
      top: 10px;
      cursor: pointer;
    }
    ul {
      display: flex;
      justify-content: center;
      padding-top: 40px;
      margin-bottom: 30px;
      li {
        color: #ccc;
        font-size: 18px;
        padding-right: 10px;
        margin-right: 10px;
        cursor: pointer;
        &:first-child {
          border-right: 1px solid #ccc;
        }
        &.active {
          color: #333;
        }
      }
    }
    .from {
      width: 360px;
      margin: auto;
      .ipt {
        display: flex;
        margin-bottom: 20px;
        input {
          flex: 1;
          height: 50px;
          border-radius: 5px;
          text-indent: 1em;
          outline: none;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }
        .btn {
          width: 90px;
          height: 50px;
          margin-left: 10px;
          line-height: 50px;
          color: #fff;
          background: #0a328e;
          text-align: center;
          cursor: pointer;
          border-radius: 5px;
          &.active {
            background: #ccc;
            color: #fff;
          }
        }
      }
      .login_btn {
        width: 360px;
        height: 50px;
        border-radius: 5px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        color: #fff;
        background: #0a328e;
      }
    }
    #weixin {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
/deep/.slide-box {
  margin-bottom: 20px;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  canvas {
    position: absolute;
    left: 0;
    top: -140px;
    display: none;
    width: 100%;
    box-sizing: border-box;
  }
  .slide-verify-block {
    width: 85px;
    height: 136px;
  }
  .slide-verify-refresh-icon {
    top: -140px;
    display: none;
  }
  &:hover {
    canvas {
      display: block;
    }
    .slide-verify-refresh-icon {
      display: block;
    }
  }
}
</style>
<template>
  <div class="login">
    <div class="login_bg" @click="hideLoginModalFn"></div>
    <div class="login_content">
      <img class="close" src="../assets/img/login/userArrow.png" alt="" />
      <ul>
        <li class="active">手机号码登录</li>
        <li>微信扫码登录</li>
      </ul>
      <div class="from">
        <div class="ipt">
          <input type="text" placeholder="请输入手机号" />
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
          <input type="text" placeholder="请输入短信验证码" />
          <div class="btn">获取验证码</div>
        </div>
        <div></div>
        <div class="login_btn" @click="submitFn">登录</div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      msg: "向右滑动",
    };
  },
  methods: {
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
    // 点击登录按钮
    submitFn() {
      if (this.msg == "再试一次" || this.msg == "向右滑动") {
        console.log("请滑动拼图");
      } else {
        console.log("开始登录");
      }
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
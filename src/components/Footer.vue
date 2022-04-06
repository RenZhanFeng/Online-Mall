<template>
  <div class="footer">
    <div class="banxin">
      <div class="left">
        <img src="../assets/img/slogan.7730f7f2.png" alt="footer_logo" />
        <p>
          叩丁狼是一家专注于培养高级IT技术人才，为学员提供定制化IT职业规划方案及意见咨询服务的教育科技公司，为您提供海量优质课程，以及创新的线上线下学习体验，帮助您获得全新的个人发展和能力提升。
        </p>
      </div>
      <div class="center">
        <ul>
          <li>微信公众号</li>
          <li>新浪微博</li>
          <li>
            <img src="../assets/img/home/wx.png" alt="" />
            在线客服
          </li>
        </ul>
      </div>
      <div class="right">
        <div>全国免费咨询热线：</div>
        <p>020-85628002</p>
      </div>
    </div>
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

.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #242b39;
  color: #7d879a;
  .banxin {
    height: 240px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      p {
        width: 426px;
        height: 55px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #7d879a;
        margin-top: 27px;
        line-height: 1.4;
      }
    }
    .center {
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          border-right: 1px solid #7d879a;
          padding-right: 18px;
          padding-left: 18px;
          height: 19px;
          position: relative;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
          &:nth-last-child(1) {
            border-right: 0;
            position: relative;
            img {
              display: none;
              position: absolute;
              top: -109px;
              right: 3px;
            }
            &:hover {
              img {
                display: block;
              }
            }
          }
        }
      }
    }
    .right {
      div {
        margin-bottom: 10px;
      }
      p {
        font-size: 28px;
        font-weight: bold;
        color: #fff;
      }
    }
  }
}
</style>
<template>
  <div class="banxin">
    <BreadCrumbs :nav="nav" />
    <div class="productInfo">
      <div class="buyInfo">
        <div class="imgs">
          <img
            :src="`https://sc.wolfcode.cn${productInfo.coverImg}`"
            alt=""
            class="bigImg"
          />
          <ul>
            <li
              v-for="(item, index) in productInfo.imgAltas"
              :key="index"
              @mouseenter="changeBigImg(item.src)"
            >
              <img :src="`https://sc.wolfcode.cn${item.src}`" alt="" />
            </li>
          </ul>
        </div>
        <div class="buy">
          <div class="productTitle">
            <h2>{{ productInfo.name }}</h2>
            <p>
              {{ productInfo.seriesSubTitle }}
            </p>
            <div class="integral">
              <span>{{ productInfo.coin }}</span>
              <img src="../assets/img/home/monad.png" alt="" />
            </div>
          </div>
          <div class="select">
            <div
              class="selectModel"
              v-for="(item, index) in productInfo.parameterJson"
              :key="index"
            >
              <h2>{{ item.title }}</h2>
              <ul>
                <li
                  :class="item.currentActivate ? 'active' : ''"
                  v-for="item in item.parameters"
                  :key="item.id"
                  @click="goDetail(item.id)"
                >
                  {{ item.title }}
                </li>
              </ul>
            </div>
            <div class="selectModel">
              <h2>
                数量<span>*礼品库存{{ productInfo.stock }}件</span>
              </h2>
              <div class="productNum">
                <div @click="sub()">-</div>
                <div>{{ stockNum }}</div>
                <div @click="add()">+</div>
              </div>
              <div class="btns">
                <div class="addCar" @click="addToCart">加入购物车</div>
                <div class="buyNow" @click="buyNow">立即兑换</div>
              </div>
              <div class="addLike">
                <img src="../assets/img/details/like-click.png" alt="" />
                <span>喜欢 {{ productInfo.like }}</span>
                <div class="addLikeList">
                  <vshare :vshareConfig="vshareConfig"></vshare>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="otherProduct">
        <h2>你还可以购买</h2>
        <ul>
          <li
            v-for="item in themYouCanBuy"
            :key="item.id"
            @click="goDetail(item.id)"
          >
            <div class="img">
              <img :src="`https://sc.wolfcode.cn${item.img}`" alt="" />
            </div>
            <div class="title">
              <p>{{ item.name }}</p>
              <div>
                {{ item.coin }}<img src="../assets/img/home/monad.png" alt="" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="productDetails">
      <ul>
        <li
          :class="talName == '礼品详情' ? 'active' : ''"
          @click="talName = '礼品详情'"
        >
          礼品详情
        </li>
        <li
          :class="talName == '常见问题' ? 'active' : ''"
          @click="talName = '常见问题'"
        >
          常见问题
        </li>
      </ul>
      <div
        class="details"
        v-show="talName == '礼品详情'"
        v-html="productInfo.description"
      ></div>
      <div class="frequentlyQuestion" v-show="talName == '常见问题'">
        <strong>兑换后运费如何收取？</strong>
        <p>
          商城内大部分实物产品均可包邮，也支持上门自提。虚拟产品则无需运费，可在兑换后直接使用。
        </p>
        <p>
          （注：新疆，西藏，内蒙古，青海，海南，宁夏暂不支持包邮，在此地区兑换商品需提前与客服确认运费。）
        </p>
        <strong>如何申请退换货？</strong>
        <p>所有产品均为鸡腿兑换礼品，无质量问题不支持退换货；</p>
        <p>如因喜好不同，或到货后后悔等原因，不支持退货；</p>
        <p>
          因客户原因如联系方式有误、电话停机、不接电话、无理由拒收等造成快件无法正常签收的情况，叩丁狼均不进行补发或赔付；
        </p>
        <p>
          如因质量问题需要退货，将由客服人员与客户联系，确认邮寄地址与流程。退回物品不得有人为损坏或使用痕迹，否则拒绝退换；
        </p>
        <p>
          如顾客选择自行寄回商品，请先垫付运费，到货验证商品后，叩丁狼将以鸡腿发放形式为用户报销运费，不接受单方面到付件。
        </p>
        <strong>如何开具发票？</strong>
        <p>叩丁狼积分商城产品均为定制礼品，使用积分兑换的产品均不支持开票。</p>
        <strong>关于鸡腿价格问题</strong>
        <p>
          因可能存在系统缓存、页面更新延迟等不确定性情况，导致价格显示异常，商品具体售价请以订单结算页价格为准。如您发现异常情况出现，请立即联系我们补正，以便您能顺兑换。
        </p>
        <strong>联系我们</strong>
        <p>www.wolfcode.cn</p>
        <p>微信公众号搜索“叩丁狼”</p>
      </div>
    </div>
  </div>
</template>
 
<script>
import { ProductDataAPI, AddToShoppingCartAPI } from "../request/api";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import vshare from "vshare"; // 社交平台分享
export default {
  data() {
    return {
      nav: {},
      productInfo: {
        parameterJson: [
          {
            parameters: {},
          },
        ],
      },
      themYouCanBuy: {},
      stockNum: 1, // 选择商品件数
      talName: "礼品详情",
      // 分享功能的配置
      vshareConfig: {
        // 此处放分享列表（ID）
        shareList: ["weixin", "qzone"],
        //此处放置分享按钮设置
        share: [{ bdSize: 24 }],
        //此处放置浮窗分享设置
        slide: false,
      },
    };
  },
  components: {
    BreadCrumbs,
    vshare,
  },
  methods: {
    // 加入购物车
    addToCart() {
      // 用户未登录的情况下，不能加入购物车并提醒登录

      AddToShoppingCartAPI({
        productId: this.productInfo.id,
        total: this.stockNum,
        modified: 1,
      }).then((res) => {
        // 更新顶部购物车中商品数量值
        this.$emit("upDataNum")
        if (res.code === 0) {
          this.$store.dispatch("changeToastAsync", {
            toastMsg: "成功加入购物车",
            toastType: "success",
          });

          console.log(res);
        } else {
          this.$store.dispatch("changeToastAsync", {
            toastMsg: res.message,
            toastType: "danger",
          });
        }
      });
    },
    // 立即购买
    buyNow() {},
    // 点击侧边栏跳转到相应详情页
    goDetail(id) {
      this.$router.push(`/detail?id=${id}`);
    },
    // 鼠标移到小图片上时，改变大图片
    changeBigImg(src) {
      this.productInfo.coverImg = src;
    },
    // 商品件数减
    sub() {
      if (this.stockNum > 1) {
        this.stockNum--;
      } else {
        this.$store.dispatch("changeToastAsync", {
          toastMsg: "数量不能少于1",
          toastType: "warn",
        });
      }
    },
    // 商品件数加
    add() {
      if (this.stockNum < this.productInfo?.stock) {
        this.stockNum++;
      } else {
        this.$store.dispatch("changeToastAsync", {
          toastMsg: "数量不能大于库存数",
          toastType: "warn",
        });
      }
    },
  },
  created() {
    // 请求详情页数据
    let id = this.$route.query.id;
    ProductDataAPI({ id }).then((res) => {
      if (res.code === 0) {
        let { nav, productInfo, themYouCanBuy } = res.data;
        this.nav = nav;
        productInfo.description = productInfo.description.replace(
          /upload/g,
          "http://sc.wolfcode.cn/upload"
        );
        this.productInfo = productInfo;
        this.themYouCanBuy = themYouCanBuy;
        console.log(this.productInfo);
      }
    });
  },
  watch: {
    "$route.query.id": {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          // 刷新当前页
          this.$router.go(0);
        }
      },
      deep: true,
    },
  },
};
</script>
 
<style lang = "less" scoped>
@import "../total.less";

.productInfo {
  display: flex;
  justify-content: space-between;
  padding: 18px 0 48px 0;
  border-bottom: 1px solid #ececec;
  .buyInfo {
    display: flex;
    justify-content: flex-start;
    .imgs {
      .bigImg {
        width: 457px;
        height: 457px;
        background: #efefef;
      }
      ul {
        padding-top: 21px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        li {
          margin-right: 20px;
          width: 100px;
          height: 100px;
          cursor: pointer;
          background-color: #efefef;
          filter: brightness(70%);
          &:hover {
            filter: brightness(100%);
          }
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
    .buy {
      padding: 7px 35px 0 32px;
      box-sizing: border-box;
      .productTitle {
        border-bottom: 1px solid #ececec;
        h2 {
          font-size: 28px;
          font-weight: 400;
        }
        p {
          font-size: 14px;
          color: #999999;
          line-height: 20px;
          margin: 15px 0 26px 0;
        }
        .integral {
          display: flex;
          align-items: center;
          margin-bottom: 23px;
          span {
            font-size: 28px;
            font-weight: bold;
            color: #fd604d;
          }
          img {
            width: 20px;
            height: 20px;
            margin-left: 5px;
            display: inline-block;
          }
        }
      }
      .select {
        .selectModel {
          padding-top: 20px;
          box-sizing: border-box;
          h2 {
            letter-spacing: 0px;
            margin-bottom: 14px;
            span {
              font-size: 14px;
              color: #999;
              padding-left: 5px;
            }
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              cursor: pointer;
              padding: 5px 10px;
              box-sizing: border-box;
              margin-right: 20px;
              margin-bottom: 11px;
              border: solid 1px #d1d1d1;
              font-size: 14px;
              line-height: 32px;
              color: #666666;
              text-align: center;
              &.active {
                border-color: #0a328e;
                color: #0a328e;
              }
            }
          }
          .productNum {
            display: flex;
            width: 106px;
            height: 32px;
            display: flex;
            align-items: center;
            user-select: none;
            div {
              &:nth-child(1),
              &:nth-child(3) {
                width: 30px;
                height: 32px;
                border: solid 1px #d1d1d1;
                text-align: center;
                line-height: 30px;
                color: #999999;
                cursor: pointer;
              }
              &:nth-child(2) {
                width: 46px;
                height: 32px;
                border-top: solid 1px #d1d1d1;
                border-bottom: solid 1px #d1d1d1;
                text-align: center;
                line-height: 30px;
                color: #666;
              }
            }
          }
          .btns {
            display: flex;
            padding: 24px 0;
            .addCar,
            .buyNow {
              width: 150px;
              height: 46px;
              text-align: center;
              line-height: 46px;
              font-size: 18px;
              color: #ffffff;
              cursor: pointer;
            }
            .addCar {
              background: #3dc36b;
              margin-right: 20px;
            }
            .buyNow {
              background: #fd604d;
            }
          }
          .addLike {
            display: flex;
            align-items: center;
            img {
              cursor: pointer;
            }
            span {
              padding: 0 17px 0 12px;
              box-sizing: border-box;
              font-size: 16px;
              color: #666666;
              border-right: 1px solid #ececec;
            }
            .addLikeList {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .otherProduct {
    width: 227px;
    border-left: 1px solid #ececec;
    padding-left: 20px;
    h2 {
      font-size: 18px;
      font-weight: 400;
      margin-bottom: 20px;
    }
    ul {
      display: flex;
      flex-direction: column;
      li {
        margin-bottom: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        .img {
          width: 78px;
          height: 87px;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
            display: block;
            border: 1px solid #fff;
          }
        }
        .title {
          width: calc(100% - 98px);
          flex: 1;
          padding-left: 10px;
          p {
            font-size: 14px;
            color: #666666;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 10px;
          }
          div {
            font-size: 18px;
            color: #ff5e0f;
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 20px;
              margin-left: 5px;
              display: inline-block;
            }
          }
        }
        &:hover {
          .title {
            p {
              color: #0a328e;
            }
          }
          .img {
            img {
              border: 1px solid #0a328e;
            }
          }
        }
      }
    }
  }
}
.productDetails {
  padding-bottom: 50px;
  ul {
    width: 100%;
    display: flex;
    li {
      width: 120px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      user-select: none;
      &.active {
        color: #333;
        background-color: #ececec;
      }
    }
  }
  .details {
    padding-top: 27px;
  }
  .frequentlyQuestion {
    padding-top: 27px;
    box-sizing: border-box;
    strong {
      display: block;
      font-size: 18px;
      font-weight: bold;
      padding-top: 20px;
    }
  }
}
</style>
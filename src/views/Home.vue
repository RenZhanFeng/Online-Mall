<template>
  <div class="home">
    <div class="banner">
      <div class="banxin">
        <img src="../assets/img/home/banner.png" alt="" />
      </div>
    </div>
    <div class="recommend banxin">
      <MyTitle titleTxt="精品推荐" :imgSrc="recommendImgSrc" />
      <List :arr="recommendList" />
      <MyTitle titleTxt="热门兑换" :imgSrc="hotImgSrc" />
      <img src="../assets/img/home/addd.png" alt="ad" width="100%" />
      <List :arr="hotList" />
      <MyTitle titleTxt="积分攻略" :imgSrc="integralImgSrc" />
      <ul>
        <li>
          <h1>签到得积分</h1>
          <div class="btn">去签到</div>
        </li>
        <li>
          <h1>购课得积分</h1>
          <div class="btn">去购课</div>
        </li>
        <li>
          <h1>推荐得积分</h1>
          <div class="btn">去推荐</div>
        </li>
        <li>
          <h1>拼团得积分</h1>
          <div class="btn">去拼团</div>
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>
import MyTitle from "../components/home/MyTitle";
import List from "../components/home/List";
import { JingpinApi, HotDataApi } from "../request/api";

export default {
  data() {
    return {
      // '精品推荐','热门兑换','积分攻略'图标
      recommendImgSrc: require("../assets/img/home/Recommend.png"),
      hotImgSrc: require("../assets/img/home/hot.png"),
      integralImgSrc: require("../assets/img/home/integral.png"),
      // 精品推荐的数据
      recommendList: [],
      // 热门推荐的数据
      hotList: [],
    };
  },
  components: {
    MyTitle,
    List,
  },
  created() {
    // 请求精品推荐的数据
    JingpinApi().then((res) => {
      if (res.code === 0) {
        let dataList = JSON.parse(
          JSON.stringify(res.data?.data?.records)
        ).slice(0, 4);
        // 产品图片路径加前缀
        dataList.forEach((element) => {
          element.coverImg = `http://sc.wolfcode.cn${element.coverImg}`;
        });
        this.recommendList = dataList;
      }
    });

    // 请求热门兑换的数据
    HotDataApi().then((res) => {
      if (res.code === 0) {
        let dataList = JSON.parse(JSON.stringify(res.data?.data?.records));
        // 产品图片路径加前缀
        dataList.forEach((element) => {
          element.coverImg = `http://sc.wolfcode.cn${element.coverImg}`;
        });
        this.hotList = dataList;
      }
    });
  },
};
</script>
 
<style lang = "less" scoped>
@import "../total.less";
.home {
  background: #f5f5f5;
  .banner {
    background: #fff;
    padding-bottom: 30px;
    img {
      /* img标签是行内块元素，除了可以控制宽高之外，还有行间距（底部还有一点点间距），设置为块元素可以去掉行间距 */
      display: block;
    }
  }
  .recommend {
    img {
      padding-top: 20px;
    }
    ul {
      display: flex;
      justify-content: space-between;
      margin: 23px 0 47px 0;
      li {
        cursor: pointer;
        background: #ccc;
        color: #ffffff;
        width: 285px;
        height: 168px;
        transition: background-size 0.2s linear;
        background-size: 100% 100%;
        h1 {
          font-size: 30px;
          font-weight: bold;
          margin-top: 43px;
          margin-left: 20px;
        }
        .btn {
          width: 96px;
          height: 27px;
          border: 1px solid #ffffff;
          text-align: center;
          line-height: 27px;
          margin-left: 21px;
          margin-top: 19px;
        }
        &:nth-child(1) {
          background-image: url("../assets/img/home/integral-01.png");
        }
        &:nth-child(2) {
          background-image: url("../assets/img/home/integral-02.png");
        }
        &:nth-child(3) {
          background-image: url("../assets/img/home/integral-03.png");
        }
        &:nth-child(4) {
          background-image: url("../assets/img/home/integral-04.png");
        }
        &:hover {
          background-size: 105% 105%;
        }
      }
    }
  }
}
</style>
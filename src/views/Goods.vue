<template>
  <div class="goods banxin">
    <BreadCrumbs :nav="breadNav"></BreadCrumbs>
    <img src="../assets/img/home/addd.png" alt="banner" class="banner" />
    <div class="goodsType">
      <div class="sort">
        <strong>排序：</strong>
        <ul>
          <li
            v-for="(item, index) in sortOptions"
            :key="index"
            :class="sortCurrent == index ? 'active' : ''"
            @click="sortClick(item.min, item.max, index)"
          >
            {{ item.txt }}
          </li>
        </ul>
      </div>
      <div class="classift">
        <strong>分类：</strong>
        <ul>
          <li
            v-for="(item, index) in classifyOptions"
            :key="index"
            :class="classifyCurrent == index ? 'active' : ''"
            @click="classifyClick(item.type, index)"
          >
            {{ item.txt }}
          </li>
        </ul>
      </div>
    </div>
    <List :arr="allGoods" v-if="allGoods.length !== 0"></List>
    <div class="noMore" v-else>没有更多了</div>
  </div>
</template>
 
<script>
import List from "components/home/List.vue";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import { GoodsSearchApi } from "../request/api";

export default {
  data() {
    return {
      // 面包屑
      breadNav: [{ name: "首页" }, { name: "全部礼品" }],
      // 商品排序
      sortOptions: [
        { min: 0, max: 0, txt: "全部" },
        // ‘我能兑换’的max值是Header组件的coin值
        { min: 0, max: 10000, txt: "我能兑换的" },
        { min: 0, max: 500, txt: "0-500个" },
        { min: 500, max: 1000, txt: "500-1000个" },
        { min: 1000, max: 1500, txt: "1000-1500个" },
        { min: 1500, max: 2500, txt: "1500-2500个" },
        { min: 2500, max: 6500, txt: "2500-6500个" },
        { min: 6500, max: 10000, txt: "6500-10000个" },
      ],
      // 商品分类
      classifyOptions: [
        { type: 0, txt: "全部" },
        { type: 1, txt: "实体商品" },
        { type: 2, txt: "虚拟商品" },
      ],
      // 商品排序的当前项
      sortCurrent: -1,
      // 商品分类的当前项
      classifyCurrent: -1,
      allGoods: [],
    };
  },
  methods: {
    // 切换商品排序
    sortClick(min, max, index) {
      this.sortCurrent = index;
      // 重新请求数据
      this.requestData({ min, max });
    },
    // 切换商品分类
    classifyClick(type, index) {
      this.classifyCurrent = index;
      // 重新请求数据
      this.requestData({ type });
    },
    // 封装数据请求函数
    requestData({ min = "", max = "", type = "", did = "", keyword = "" }) {
      GoodsSearchApi({
        did: did, // 栏目 目前可提供的参数是 1->精品推荐 2-> 热门兑换 0->全部
        type: type, // 1->实体商品 2->虚拟商品 0->全部
        min: min, // 大于多少积分，最少是0
        max: max, // 少于多少积分，最多是10000，当传入0的时候，会直接返回所有商品，无视后台逻辑。
        keyword: keyword, // 商品关键词
      }).then((res) => {
        if (res.code === 0) {
          this.allGoods = res.data;
        }
      });
    },
  },
  watch: {
    // 监听路径中的keyword值，如果有变化说明进行了搜索，就刷新组件
    "$route.query.keyword": {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$router.go(0);
        }
      },
    },
  },
  created() {
    //请求商品数据，keyword是搜索框的值
    this.requestData({ keyword: this.$route?.query?.keyword || "" });
  },
  components: {
    BreadCrumbs,
    List,
  },
};
</script>
 
<style lang = "less" scoped>
@import "../total.less";
.goods {
  padding: 20px 0;
  .banner {
    padding: 20px 0;
  }
  .goodsType {
    margin-bottom: 20px;
    .sort,
    .classift {
      display: flex;
      margin-top: 30px;
      padding-right: 14px;
      box-sizing: border-box;
      ul {
        display: flex;
        li {
          color: #999999;
          padding-right: 26px;
          box-sizing: border-box;
          cursor: pointer;
          user-select: none;
          &.active {
            color: @blue;
            font-weight: bold;
          }
        }
      }
    }
  }
  .noMore {
    margin: 30px 0;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
}
</style>
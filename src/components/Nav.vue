<template>
  <div class="banxin">
    <div class="logo"><img src="../assets/img/indexLogo.png" alt="logo" /></div>
    <div class="nav">
      <ul>
        <li
          :class="$route.path === item.path ? 'active' : ''"
          v-for="item in navList"
          :key="item.id"
          @click="jumpLink(item.path)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="search">
      <input
        type="text"
        placeholder="输入关键字"
        v-model.trim="searchContent"
        @keydown.13="searchFn"
      />
      <span class="btn" @click="searchFn"
        ><img src="../assets/img/search.png" alt="search"
      /></span>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      // 搜索框的值
      searchContent: "",
      navList: [
        {
          id: 1,
          name: "首页",
          path: "/home",
        },
        {
          id: 2,
          name: "全部商品",
          path: "/goods",
        },
        {
          id: 3,
          name: "个人中心",
          path: "/user",
        },
        {
          id: 4,
          name: "我的订单",
          path: "/order",
        },
        {
          id: 5,
          name: "专属福利",
          path: "/welfare",
        },
      ],
    };
  },
  methods: {
    // 执行搜索
    searchFn() {
      // 跳转到goods页面并携带参数
      this.$router.push(`/goods?keyword=${this.searchContent}`);
      // 清空搜索栏内容
      this.searchContent = "";
    },
    //跳转链接
    jumpLink(path) {
      this.$router.push(path);
    },
  },
};
</script>
 
<style lang = "less" scoped>
.banxin {
  height: 118px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav {
    ul {
      width: 500px;
      display: flex;
      justify-content: space-between;
      li {
        cursor: pointer;
        &.active {
          color: #0a328e;
          font-weight: 700;
        }
      }
    }
  }
  .search {
    width: 264px;
    height: 40px;
    input {
      width: 214px;
      height: 40px;
      border-radius: 20px 0px 0px 20px;
      outline: none;
      padding: 0;
      border: 1px solid #dedede;
      text-indent: 1em;
      box-sizing: border-box;
    }
    .btn {
      width: 50px;
      height: 40px;
      background: #0a328e;
      border-radius: 0px 20px 20px 0px;
      text-align: center;
      line-height: 40px;
      float: right;
      cursor: pointer;
    }
  }
}
</style>
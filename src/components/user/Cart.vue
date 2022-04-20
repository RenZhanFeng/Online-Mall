<template>
  <div class="cart">
    <table>
      <thead>
        <tr>
          <th style="width: 8%">
            <i
              @click="totalSelectFn"
              :class="
                totalSelect
                  ? 'iconfont icon-yduifuxuankuangxuanzhong'
                  : 'iconfont icon-yduifuxuankuang'
              "
            ></i>
          </th>
          <th style="width: 30%">礼品信息</th>
          <th>兑换分数</th>
          <th>数量</th>
          <th>小计 (鸡腿)</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in CartData" :key="item.id">
          <td>
            <i
              @click="oneSelectFn(item)"
              :class="
                item.isSelect
                  ? 'iconfont icon-yduifuxuankuangxuanzhong'
                  : 'iconfont icon-yduifuxuankuang'
              "
            ></i>
          </td>
          <td>
            <section>
              <img
                width="84"
                :src="`http://sc.wolfcode.cn${item.coverImg}`"
                alt="列表图片"
              />
              <div class="info">
                <h5>{{ item.title }}</h5>
                <p>{{ item.versionDescription }}</p>
              </div>
            </section>
          </td>
          <td>{{ item.coin }} 鸡腿</td>
          <td>
            <div class="step">
              <span @click="subFn(item)">-</span>
              <input type="text" disabled v-model="item.total" />
              <span @click="addFn(item)">+</span>
            </div>
          </td>
          <td>{{ item.coin * item.total }} 鸡腿</td>
          <td>
            <span class="del" @click="deleteFn(item.id)">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="total">
      总计：<span>{{ totalPrice }} 鸡腿</span>
    </div>
    <div class="submit">提交</div>
  </div>
</template>
 
<script>
import { CartDataApi, DeleteCartApi } from "../../request/api";
export default {
  data() {
    return {
      stepNum: 1,
      // 全选
      totalSelect: false,
      // 购物车数据
      CartData: [],
    };
  },
  methods: {
    // 删除
    deleteFn(id) {
      DeleteCartApi({ id }).then((res) => {
        if (res.code === 0) {
          this.$store.dispatch("changeToastAsync", {
            toastMsg: "删除成功",
            toastType: "success",
          });
          // 重新请求数据
          this.requestData();
        }
      });
    },
    // 步进器——加
    addFn(item) {
      if (item.total < 100) {
        item.total++;
      } else {
        this.$store.dispatch("changeToastAsync", {
          toastMsg: "数量不能大于库存数",
          toastType: "warn",
        });
      }
    },
    // 步进器——减
    subFn(item) {
      if (item.total > 1) {
        item.total--;
      } else {
        this.$store.dispatch("changeToastAsync", {
          toastMsg: "数量不能少于1",
          toastType: "warn",
        });
      }
    },
    // 全选或全不选
    totalSelectFn() {
      this.totalSelect = !this.totalSelect;
      if (this.totalSelect) {
        this.CartData.forEach((item) => {
          item.isSelect = true;
        });
      } else {
        this.CartData.forEach((item) => {
          item.isSelect = false;
        });
      }
    },
    // 单选
    oneSelectFn(item) {
      item.isSelect = !item.isSelect;
      // 强制试图更新
      //this.$forceUpdate();
      this.$set(item, item.isSelect, !item.isSelect);
      // 计数
      let count = 0;
      this.CartData.forEach((item) => {
        if (item.isSelect) {
          count++;
        }
      });
      // 如果勾选了全部，那顶部的全部勾选按钮也要跟着改变
      this.totalSelect = count == this.CartData.length;
    },
    // 请求购物车数据
    requestData() {
      CartDataApi().then((res) => {
        if (res.code === 0) {
          let arr = JSON.parse(JSON.stringify(res.data));
          arr.forEach((item) => {
            item.isSelect = false;
          });
          this.CartData = res.data;
        }
      });
    },
  },
  computed: {
    // 总价
    totalPrice() {
      let price = 0;
      this.CartData.forEach((item) => {
        price += item.isSelect ? item.coin * item.total : 0;
      });
      return price;
    },
  },
  created() {
    // 请求购物车数据
    this.requestData();
  },
};
</script>
 
<style lang = "less" scoped>
.cart {
  background: #fff;
  margin-bottom: 125px;
  table {
    width: 100%;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    color: #666;
    border-collapse: collapse;
    font-size: 14px;
    thead {
      background: #f2f2f2;
      th {
        padding: 19px 0;
        .iconfont {
          cursor: pointer;
        }
        .icon-yduifuxuankuangxuanzhong {
          color: #0a328e;
        }
      }
    }
    tbody {
      tr {
        td {
          vertical-align: middle;
          text-align: center;
          padding: 19px 0;
          table-layout: fixed; /*td的宽度固定，不随内容变化 */
          .iconfont {
            cursor: pointer;
          }
          .icon-yduifuxuankuangxuanzhong {
            color: #0a328e;
          }
          section {
            padding-left: 20px;
            display: flex;
            box-sizing: border-box;
            img {
              margin-right: 12px;
            }
            .info {
              padding-top: 20px;
              flex: 1;
              overflow: hidden;
              box-sizing: border-box;
              text-align: left;
              h5 {
                overflow: hidden;
                color: #333;
                font-size: 18px;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 20px;
              }
              p {
                color: #666;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          .step {
            width: 106px;
            height: 32px;
            margin: auto;
            span {
              float: left;
              width: 30px;
              height: 32px;
              display: block;
              border: solid 1px #d1d1d1;
              font-size: 20px;
              box-sizing: border-box;
              font-weight: normal;
              font-stretch: normal;
              line-height: 30px;
              letter-spacing: 0px;
              color: #999999;
              text-align: center;
              cursor: pointer;
              background: #fff;
            }
            input {
              box-sizing: border-box;
              width: 46px;
              height: 32px;
              float: left;
              text-align: center;
              font-size: 14px;
              line-height: 23px;
              letter-spacing: 0px;
              color: #666666;
              border: 0;
              border-top: 1px solid #d1d1d1;
              border-bottom: 1px solid #d1d1d1;
              background: #fff;
            }
          }
          .del {
            border: 1px solid #ececec;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            &:hover {
              color: #fff;
              background: #0a328e;
            }
          }
        }
      }
    }
  }
  .total {
    padding: 30px 0;
    text-align: right;
    font-size: 22px;
    span {
      font-weight: bold;
      color: #fd604d;
    }
  }
  .submit {
    width: 175px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-family: SourceHanSansSC-Light;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    cursor: pointer;
    background-color: #0a328e;
    float: right;
  }
}
</style>
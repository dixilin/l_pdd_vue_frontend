<template>
  <div class="shop-container">
    <ul class="shop-list">
      <li class="shop-list-item" v-for="item in homeHotShopList" :key="item.goods_id">
        <img :src="item.image_url" width="100%" />
        <h4 class="list-item-title">{{item.goods_name}}</h4>
        <div class="list-item-bottom">
          <span class="item-price">￥{{item.normal_price / 100}}</span>
          <span class="item-counter">{{item.sales_tip}}</span>
          <span class="item-user" v-if="item.bubble && item.bubble.length">
            <img :src="user.avatar" v-for="user in item.bubble" :key="user.group_order_id" />
          </span>
          <span class="item-buy">
            <button>去拼单 ></button>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import { mapState } from "vuex";
export default {
  name: "HotShopList",
  computed: {
    ...mapState(["homeHotShopList"])
  }
};
</script>

<style lang="less" scoped>
.shop-container {
  .shop-list-item {
    margin-top: 8px;
    background: #fff;
    .list-item-title {
      line-height: 22px;
      width: 94%;
      margin-left: 3%;
      height: 44px;
      overflow: hidden;
    }
    .list-item-bottom {
      padding: 10px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .item-price {
        font-size: 18px;
        text-align: center;
        font-weight: bolder;
        color: #f00;
        flex: 1;
      }
      .item-counter {
        flex: 2;
        font-size: 12px;
        color: #ccc;
      }
      .item-user {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        img {
          width: 30px;
          border-radius: 50%;
          &:nth-child(2) {
            margin-left: -8px;
          }
        }
      }
      .item-buy {
        flex: 2;
        button {
          width: 80%;
          height: 34px;
          font-size: 15px;
          border: none;
          color: #fff;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10px;
          background-color: #f00;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
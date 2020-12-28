<template>
  <li class="shop-list">
    <img :src="item.hd_thumb_url" />
    <h4 class="list-title">{{item.short_name}}</h4>
    <div class="list-tags">
      <span v-for="(itemTag,idx) in item.tag_list" :key="idx">{{itemTag.text}}</span>
    </div>
    <div class="core">
      <div class="core-left">
        <span class="price">￥{{formatP}}</span>
        <span class="sold-quantity">{{item.sales_tip}}</span>
      </div>
      <div class="core-right">
        <button @click="addToCart" v-preventReClick="3000" class="relateTag">加购物车</button>
      </div>
    </div>
  </li>
</template>

<script>
import { Toast } from "vant";
import formatPrice from "@/utils/formatPrice";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    [Toast.name]: Toast
  },
  props: {
    item: {}
  },
  methods: {
    ...mapActions(["handleCartCount"]),
    addToCart() {
      const data = {
        user_phone: this.userInfo.phone,
        goods_id: this.item.goods_id,
        count: 1
      };
      let countSaved = 1;
      for (let k of this.cartList) {
        if (k.goods_id === this.item.goods_id) {
          countSaved = k.count + 1;
          break;
        }
      }
      const goods = {
        count: countSaved,
        goods_id: this.item.goods_id,
        thumb_url: this.item.thumb_url,
        normal_price: this.item.normal_price,
        goods_name: this.item.goods_name,
        isChecked: false
      };
      this.handleCartCount({ data, goods ,cb: result=>{
        result.status === 'success' ? Toast.success(result.msg) : Toast.fail(result.msg)
      }});
    }
  },
  computed: {
    formatP() {
      return formatPrice(this.item.normal_price);
    },
    ...mapState(["userInfo", "cartList"])
  }
};
</script>
<style lang="less" scoped>
.shop-list {
  display: inline-block;
  width: 49%;
  background: #fff;
  padding-bottom: 10px;
  margin-bottom: 5px;
  margin-left: 0.5%;
  margin-right: 0.5%;
  img {
    width: 100%;
  }
  .list-title {
    line-height: 22px;
    width: 94%;
    margin-left: 3%;
    height: 22px;
    overflow: hidden;
  }
  .list-tags {
    width: 94%;
    margin: 8px 0;
    height: 14px;
    margin-left: 3%;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    span {
      color: rgb(255, 87, 6);
      background: rgba(255, 87, 6, 0.08);
      margin-right: 5px;
    }
  }
  .core {
    display: flex;
    justify-content: space-between;
    width: 94%;
    margin-left: 3%;
    .core-left {
      overflow: hidden;
      white-space: nowrap;
      width: 65%;
      .price {
        color: #e02e24;
        font-weight: 700;
        font-size: 16px;
        margin-right: 3px;
      }
      .sold-quantity {
        font-size: 12px;
        color: #9c9c9c;
      }
    }
    .core-right {
      .relateTag {
        font-size: 12px;
        border: 1px solid orangered;
        color: orangered;
        padding: 1px 3px;
        border-radius: 5px;
        background: #fff;
      }
    }
  }
}
</style>
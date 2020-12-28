<template>
  <ul class="cart_main">
    <cart-list-item v-for="item in cartList" :key="item.goods_id" :goods="item" />
    <div v-if="!cartList.length" class="nullCart">
      <img src="~@/assets/image/nullCart.png" alt />
      <p>当前购物车列表为空~</p>
    </div>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";
import cartListItem from "./cartListItem";
export default {
  components: {
    cartListItem
  },
  created() {
    this.reqCartList({ user_phone: this.userInfo.phone });
    this.$store.dispatch("changeLoadCartStatus"); //更改加载过状态
  },
  methods: {
    ...mapActions(["reqCartList"])
  },
  computed: {
    ...mapState(["cartList", "userInfo"])
  }
};
</script>

<style lang="less" scoped>
.cart_main {
  padding-bottom: 99px;
  .nullCart {
    text-align: center;
    color:#777;
    font-size:20px;
    img {
      width: 200px;
    }
  }
}
</style>
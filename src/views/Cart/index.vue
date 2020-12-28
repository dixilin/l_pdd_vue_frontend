<template>
  <div class="cart_con">
    <div class="cart_top">我的购物车</div>
    <cart-list />
    <van-submit-bar
      :price="getPrice"
      button-text="提交订单"
      class="submitBar"
      v-if="cartList.length"
      @submit="showOverlay = true"
    >
      <van-checkbox v-model="checkedAll" checked-color="#1D988D">全选</van-checkbox>
    </van-submit-bar>

    <van-overlay :show="showOverlay" @click="showOverlay = false">
      <div class="wrapper">
        <div class="block">
          是否想要赏小林一笔
          <img src="~@/assets/image/code.jpg" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import cartList from "./components/cartList";
import { SubmitBar, Checkbox, Overlay } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [Overlay.name]: Overlay,
    cartList
  },
  data() {
    return {
      showOverlay: false
    };
  },
  methods: {
    ...mapActions(["handleCheckedAll"])
  },
  computed: {
    ...mapState(["cartList"]),
    getPrice() {
      let price = 0;
      this.cartList.forEach(item => {
        if (item.isChecked) {
          price += item.count * item.normal_price;
        }
      });
      return price;
    },
    checkedAll: {
      get() {
        let trueNum = 0;
        for (let k of this.cartList) {
          if (k.isChecked) {
            trueNum++;
          }
        }
        return trueNum === this.cartList.length ? true : false;
      },
      set(val) {
        this.handleCheckedAll(val);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart_con {
  height: 100%;
  .cart_top {
    height: 44px;
    font-size: 18px;
    color: #777;
    text-align: center;
    line-height: 44px;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 2px 2px rgba(255, 255, 255, 0.5);
  }
}
.submitBar {
  bottom: 49px;
  height: 50px;
  z-index: 1 !important;
  left: 50%;
  transform: translateX(-50%);
  max-width: 768Px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 100%;
    height:500px;
    display:flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    background-color: #fff;
    font-size:20px;
    img {
      width:100%;
    }
  }
}
</style>
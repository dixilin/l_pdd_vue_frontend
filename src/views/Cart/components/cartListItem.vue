<template>
  <li class="goods_item">
    <div class="goods_select">
      <van-checkbox v-model="goods.isChecked" checked-color="#1D988D" @change="changeChecked" />
    </div>
    <div class="goods_img">
      <img :src="goods.thumb_url" alt />
    </div>
    <div class="goods_detail">
      <p class="title">{{goods.goods_name}}</p>
      <div class="group">
        <div class="price">￥{{formatP}}</div>
        <div class="steper">
          <van-stepper
            v-model="goods.count"
            disable-input
            @plus="editCartCount(1)"
            @minus="editCartCount(-1)"
          />
        </div>
        <van-icon name="delete" class="delete-icon" @click="deleteGoods" />
      </div>
    </div>
  </li>
</template>

<script>
import { mapState, mapActions } from "vuex";
import formatPrice from "@/utils/formatPrice";
import { Checkbox, Stepper, Icon } from "vant";
export default {
  components: {
    [Checkbox.name]: Checkbox,
    [Stepper.name]: Stepper,
    [Icon.name]: Icon
  },
  props: {
    goods: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    ...mapActions(["handleCartCount", "handleChecked", "handelDeleteCart"]),
    async editCartCount(num) {
      const data = {
        user_phone: this.userInfo.phone,
        goods_id: this.goods.goods_id,
        count: num
      };
      await this.handleCartCount({ data, goods: this.goods });
    },
    //修改选中状态
    changeChecked(checked) {
      this.handleChecked({ goods_id: this.goods.goods_id, checked });
    },
    //删除购物车的商品
    deleteGoods() {
      this.handelDeleteCart({
        goods_id: this.goods.goods_id,
        user_phone: this.userInfo.phone
      });
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    formatP() {
      return formatPrice(this.goods.normal_price);
    }
  }
};
</script>

<style scoped lang="less">
.goods_item {
  margin-top: 6px;
  background: #fff;
  padding: 10px 10px 10px 0;
  display: flex;
  .goods_select {
    width: 10%;
    display: flex;
    justify-content: center;
  }
  .goods_img {
    width: 30%;
    img {
      width: 100%;
    }
  }
  .goods_detail {
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      line-height: 20px;
      color: #888;
    }
    .group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .price {
        color: coral;
        font-size: 16px;
        font-weight: 600;
      }
      .delete-icon {
        font-size: 20px;
        color: #888;
      }
    }
  }
}
</style>
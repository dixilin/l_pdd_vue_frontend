<template>
  <div class="tab-bar">
    <TabbarItem :path="$store.state.homeSecondRoutePath">
      <img slot="item-icon" src="~@assets/image/home.png" />
      <img slot="item-icon-active" src="~@assets/image/home_s.png" />
      <span slot="item-text">首页</span>
    </TabbarItem>
    <TabbarItem path="/recommend">
      <img slot="item-icon" src="~@assets/image/recommend.png" />
      <img slot="item-icon-active" src="~@assets/image/recommend_s.png" />
      <span slot="item-text">推荐</span>
    </TabbarItem>
    <TabbarItem path="/category">
      <img slot="item-icon" src="~@assets/image/category.png" />
      <img slot="item-icon-active" src="~@assets/image/category_s.png" />
      <span slot="item-text">分类</span>
    </TabbarItem>
    <TabbarItem path="/cart">
      <img slot="item-icon" src="~@assets/image/cart.png" />
      <img slot="item-icon-active" src="~@assets/image/cart_s.png" />
      <span slot="item-text">购物车</span>
    </TabbarItem>
    <TabbarItem path="/mine">
      <img slot="item-icon" src="~@assets/image/mine.png" />
      <img slot="item-icon-active" src="~@assets/image/mine_s.png" />
      <span slot="item-text">我的</span>
    </TabbarItem>
  </div>
</template>

<script>
import TabbarItem from "./TabbarItem";
export default {
  components: {
    TabbarItem
  }
};
</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  height: 49px;
  border-top: 1px solid #efefef;
  width: 100%;
  max-width: 768Px;
  background: #fff;
}
</style>

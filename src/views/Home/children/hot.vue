<template>
  <div class="hot-container">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      v-if="homeHotCasual.length"
    >
      <van-swipe-item v-for="item in homeHotCasual" :key="item.img_url">
        <img v-lazy="`${baseUrl}${item.img_url}`" :src="`${baseUrl}${item.img_url}`" />
      </van-swipe-item>
    </van-swipe>
    <hot-nav />
    <hot-shop-list />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import hotNav from "@/views/Home/children/components/hotNav";
import hotShopList from "@/views/Home/children/components/HotShopList";
import { Swipe, SwipeItem } from "vant";

export default {
  components: {
    hotNav,
    hotShopList,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data(){
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  },
  created() {
    this.reqHomeHotCasual();
    this.reqHomeHotNav();
    this.reqHomeShopList();
  },
  methods: {
    ...mapActions(["reqHomeHotCasual", "reqHomeHotNav", "reqHomeShopList"])
  },
  computed: {
    ...mapState(["homeHotCasual"])
  }
};
</script>

<style lang="less" scoped>
.hot-container {
  padding: 43px 0 49px;
  .my-swipe {
    img {
      width: 100%;
      height: 160px;
    }
  }
}
</style>


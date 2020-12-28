<template>
  <div class="recommend-container" ref="recommendCon">
    <ul class="recommend">
      <goods-item v-for="(item,index) in recommendShopList" :key="index" :item="item"></goods-item>
      <div class="no_more_data" v-if="!recommendCanLoadMore">没有更多数据了。。。</div>
    </ul>
    <back-to-top pRef="recommendCon" :showTopY="1500" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GoodsItem from "@components/GoodsItem/GoodsItem";
import BackToTop from "@components/BackToTop/BackToTop";

import throttle from "@/utils/throttle.js";

export default {
  components: {
    GoodsItem,
    BackToTop
  },
  data() {
    return {
      pageIndex: 0,
      pageSize: 20
    };
  },
  // created() {
  //   this.reqRecommendList({
  //     pageIndex: this.pageIndex,
  //     pageSize: this.pageSize
  //   });
  // },
  mounted() {
    this.watchScroll();
  },
  activated() {
    if (!this.recommendShopList.length) {
      this.reqRecommendList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
    }
  },
  methods: {
    ...mapActions(["reqRecommendList"]),
    watchScroll() {
      this.$refs.recommendCon.addEventListener(
        "scroll",
        throttle(this.scrollLoadMore, 100, 1000)
      );
    },
    scrollLoadMore() {
      if (
        this.$refs.recommendCon.scrollHeight -
          this.$refs.recommendCon.scrollTop -
          this.$refs.recommendCon.clientHeight <=
          20 &&
        this.recommendCanLoadMore &&
        !this.loadingShow
      ) {
        this.pageIndex = this.pageSize + this.pageIndex;
        this.reqRecommendList({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
      }
    }
  },
  computed: {
    ...mapState(["recommendShopList", "recommendCanLoadMore", "loadingShow"])
  }
};
</script>

<style lang="less" scoped>
.recommend-container {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .recommend {
    padding-bottom: 49px;
    .no_more_data {
      padding-bottom: 3px;
      text-align: center;
    }
  }
}
</style>
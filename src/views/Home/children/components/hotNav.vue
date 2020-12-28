<template>
  <div>
    <div class="nav-container" ref="hotNav">
      <div class="container-inner">
        <a href="javascript:;" class="inner-item" v-for="item in homeHotNav" :key="item.iconurl">
          <img :src="baseUrl+item.iconurl" />
          <span v-text="item.icontitle"></span>
        </a>
      </div>
    </div>
    <div class="scroll-bar-container">
      <div class="outside-scroll-bar">
        <div class="inner-scroll-bar" :style="{transform:`translateX(${scrollLeft}px)`}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      scrollLeft: 0,
      baseUrl: process.env.VUE_APP_URL
    };
  },
  mounted() {
    this.$refs.hotNav.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    ...mapState(["homeHotNav"])
  },
  methods: {
    handleScroll(e) {
      const scrollX = e.target.scrollWidth - e.target.clientWidth;
      const xRate = e.target.scrollLeft / scrollX;
      this.scrollLeft = xRate * 60;
    }
  },
  beforeDestroy() {
    this.$refs.hotNav.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="less" scoped>
.nav-container {
  width: 100%;
  overflow-y: hidden;
  position: relative;
  height: 180px;
  background: #fff;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  .container-inner {
    display: flex;
    flex-wrap: wrap;
    height: 180px;
    width: 750px;
    .inner-item {
      height: 90px;
      width: 93.75px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #333;
      img {
        width: 40%;
      }
    }
  }
}
.scroll-bar-container {
  background: #fff;
  padding-bottom: 5px;
  .outside-scroll-bar {
    width: 100Px;
    margin: 0 auto;
    background: #dfdfdf;
    bottom: 0;
    .inner-scroll-bar {
      background: #1d98bd;
      width: 40Px;
      height: 2px;
    }
  }
}
</style>
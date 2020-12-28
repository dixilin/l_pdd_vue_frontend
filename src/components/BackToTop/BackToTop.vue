<template>
  <div :class="['backTop',backIsShow ? 'showBackTop': '']" @click="backToTop">
    <i>></i>
    <span>顶部</span>
  </div>
</template>

<script>
import throttle from "@/utils/throttle.js";
export default {
  props: {
    pRef: {
      type: String,
      default: ""
    },
    showTopY: {
      type: Number,
      default: 1200
    }
  },
  data() {
    return {
      scrollTop: 0
    };
  },
  mounted() {
    this.$parent.$refs[this.pRef].addEventListener(
      "scroll",
      throttle(this.scrollLoad, 0, 1000)
    );
  },
  methods: {
    backToTop() {
      this.scrollTop = this.$parent.$refs[this.pRef].scrollTop = 0;
    },
    scrollLoad() {
      this.scrollTop = this.$parent.$refs[this.pRef].scrollTop;
    }
  },
  computed: {
    backIsShow() {
      return this.scrollTop >= this.showTopY;
    }
  },
  deactivated() {
    this.scrollTop = 0;
  }
};
</script>

<style lang="less" scoped>
.backTop {
  position: fixed;
  right: 20px;
  bottom: -80px;
  background: #fff;
  border: 1px solid #e2e2e2;
  opacity: 1;
  border-radius: 50%;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  transition: bottom 0.8s ease, opacity 0.6s ease;
  i {
    transform: rotateZ(270deg);
  }
}
.showBackTop {
  bottom: 80px;
  opacity: 0.7;
}
</style>
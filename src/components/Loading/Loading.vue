<template>
  <van-overlay :show="loadingShow">
    <div class="wrapper">
      <van-loading size="24px">加载中...</van-loading>
    </div>
  </van-overlay>
</template>

<script>
import { Loading, Overlay, Button } from "vant";
import { mapState } from "vuex";
export default {
  components: {
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
    [Button.name]: Button
  },
  computed: {
    ...mapState(["loadingShow"])
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
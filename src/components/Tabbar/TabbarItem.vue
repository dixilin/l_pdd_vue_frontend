<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="$route.path === path ? activeStyle : ''">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String
    },
    color: {
      type: String,
      default: "#1d98bd"
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    }
  },
  computed: {
    isActive() {
      return this.$route.path === this.path;
    },
    activeStyle() {
      return { color: this.color };
    }
  }
};
</script>

<style lang="less" scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: 14px;
  img {
    width: 20px;
    margin: 5px 0 2px;
  }
  .itemActive {
    color: red;
  }
}
</style>
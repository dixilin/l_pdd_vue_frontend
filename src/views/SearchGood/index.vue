<template>
  <div :style="styles">{{$route.params.name}}---搜索
    <button @click="$router.replace('/category')">返回</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styles: {
        background: "",
        color: ""
      }
    };
  },
  created() {
    this.changeColor("background");
    this.changeColor("color");
  },
  activated() {
    this.changeColor("background");
    this.changeColor("color");
  },
  methods: {
    randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    changeColor(prop) {
      this.styles[prop] = this.randomColor();
    }
  }
};
</script>

<style scoped lang="less">
div {
  font-size: 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
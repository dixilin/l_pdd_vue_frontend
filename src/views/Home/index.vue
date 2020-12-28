<template>
  <div>
    <ly-tab
      v-model="selectedId"
      :items="items"
      @change="switchSecTab"
      class="fixed"
      :options="options"
    />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      selectedId: 0,
      items: [
        { label: "热门", path: "/home/hot" },
        { label: "服饰", path: "/home/clothes" },
        { label: "鞋包", path: "/home/shoesBags" },
        { label: "母婴", path: "/home/momBaby" },
        { label: "百货", path: "/home/store" },
        { label: "食品", path: "/home/food" },
        { label: "内衣", path: "/home/underwear" },
        { label: "男装", path: "/home/manClothes" },
        { label: "电器", path: "/home/appliance" }
      ],
      options: {
        activeColor: "#1d98bd"
      }
    };
  },
  methods: {
    switchSecTab(item) {
      this.$store.dispatch('homeSecondRoutePath',item.path)
      this.$router.push(item.path);
    }
  },
  created() {
    const { path } = this.$route;
    this.selectedId = this.items.findIndex(item => item.path === path);
  }
};
</script>

<style lang="less" scoped>
.fixed {
  position: fixed;
  top: 0;
  z-index: 999;
  background: #fff;
  width: 100%;
  max-width: 768Px;
  height: 43px;
}
</style>
<template>
  <div id="app">
    <keep-alive exclude="login,register">
      <router-view />
    </keep-alive>
    <Tabbar v-if="!$route.meta.hideBottom"/>
    <Loading />
  </div>
</template>

<script>
import Tabbar from "./components/Tabbar/Tabbar";
import Loading from "./components/Loading/Loading";

export default {
  components: {
    Tabbar,
    Loading
  }
};
</script>
<style lang="less">
#app {
  font-size: 14px;
  height: 100%;
  position: relative;
}
</style>

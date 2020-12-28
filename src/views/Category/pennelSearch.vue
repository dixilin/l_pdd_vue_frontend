<template>
  <div class="search-pennel">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="toSearchPage(value)"
      @cancel="onCancel"
    />
    <div class="search_main">
      <div class="search_con" v-if="recentData.length">
        <div class="search_title">
          <div class="title_left">
            <img src="~@assets/image/history_icon.png" alt />
            <h4>最近搜索</h4>
          </div>
          <img src="~@assets/image/delete_icon.png" alt @click="deleteHistory" />
        </div>
        <ul class="search_tags">
          <li
            v-for="(item,index) in recentData"
            :key="index"
            @click="toSearchPage(item.name)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="search_con">
        <div class="search_title">
          <div class="title_left">
            <img src="~@assets/image/hot_icon.png" alt />
            <h4>热门搜索</h4>
          </div>
        </div>
        <ul class="search_tags">
          <li v-for="(item,index) in hotData" :key="index" @click="toSearchPage(item)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  components: {
    [Search.name]: Search
  },
  data() {
    return {
      value: "",
      hotData: [
        "油炸食品",
        "大码男装t恤",
        "男长袖衬衫",
        "秋季上衣女",
        "抖音同款糖果",
        "led手电",
        "N95口罩",
        "雪莲果顺丰",
        "红心木瓜8斤"
      ],
      recentData: []
    };
  },
  created() {
    if (localStorage.getItem("searchHistory")) {
      this.recentData = JSON.parse(localStorage.getItem("searchHistory"));
    }
  },
  methods: {
    onCancel() {
      this.value = "";
      this.$emit("hidePennel");
    },
    addSearchHistory(val) {
      const historyStr = localStorage.getItem("searchHistory");
      let historyData = [];
      if (historyStr) {
        historyData = JSON.parse(historyStr);
        const idx = historyData.findIndex(item => {
          return item.name == val;
        });
        if (idx !== -1) {
          historyData.splice(idx, 1);
        }
      }
      historyData.unshift({ name: val });
      this.recentData = historyData;
      localStorage.setItem("searchHistory", JSON.stringify(historyData));
    },
    toSearchPage(val) {
      // :to="{name:'SearchGood',params: {name:val}}"
      this.addSearchHistory(val);
      this.value = "";
      this.$router.push("/searchGood/" + val);
    },
    deleteHistory() {
      localStorage.removeItem("searchHistory");
      this.recentData = [];
    }
  }
};
</script>

<style lang="less" scoped>
.search-pennel {
  background: #fff;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
  .search_main {
    border-top: 1px solid #dfdfdf;
    .search_con {
      padding: 0 14px;
      .search_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        .title_left {
          display: flex;
          align-items: center;
          font-size: 16px;
          height: 30px;
          color: #bbb;
        }
        img {
          width: 22px;
          height: 22px;
          margin-right: 6px;
        }
      }
      .search_tags {
        display: flex;
        flex-wrap: wrap;
        li {
          background: #f4f4f4;
          padding: 6px 10px;
          border-radius: 10px;
          color: #666;
          margin: 0 12px 12px 0;
        }
      }
    }
  }
}
</style>
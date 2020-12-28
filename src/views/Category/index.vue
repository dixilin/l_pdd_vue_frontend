<template>
  <div class="category_con">
    <van-search
      placeholder="点击进入搜索"
      readonly
      shape="round"
      class="category_top"
      @click="intoSearch"
    />
    <div class="category_main">
      <div class="menu_wrapper" ref="menu_wrapper">
        <ul>
          <li
            v-for="(menuItem,index) in categoryList"
            :class="currentIndex === index ? 'active' : ''"
            :key="menuItem.id"
            @click="switchIndex(index)"
          >{{menuItem.name}}</li>
        </ul>
      </div>
      <div class="content_wrapper" ref="content_wrapper">
        <ul>
          <li class="content_li" v-for="conItem in categoryList" :key="conItem.id">
            <div class="p_title">
              <h4>{{conItem.name}}</h4>
              <a href="#" :data-param="conItem.name">查看更多></a>
            </div>
            <div class="p_items_con">
              <div class="p_item" v-for="(pItem,idx) in conItem.items" :key="idx">
                <img :src="baseUrl+pItem.icon" alt />
                <span>{{pItem.title}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <pennel-search v-if="showSearchPennel" @hidePennel="toHidePennel" />
  </div>
</template>

<script>
import PennelSearch from "./pennelSearch.vue";
import { Search } from "vant";
import { mapActions, mapState } from "vuex";
import BScroll from "better-scroll";

export default {
  components: {
    [Search.name]: Search,
    PennelSearch
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      rightLiTops: [],
      rightScrollY: 0,
      showSearchPennel: false
    };
  },
  created() {
    this.reqCategoryList();
  },
  methods: {
    ...mapActions(["reqCategoryList"]),
    switchIndex(idx) {
      this.rightScrollY = this.rightLiTops[idx];
      this.scrollRight.scrollTo(0, -this.rightScrollY, 200);

    },
    init_bScroll() {
      const leftMenuLis = this.$refs.menu_wrapper.children[0].children;

      this.scrollLeft = new BScroll(this.$refs.menu_wrapper, {
        click: true
      });
      this.scrollRight = new BScroll(this.$refs.content_wrapper, {
        click: true,
        probeType: 3
      });
      this.scrollRight.on("scroll", pos => {
        this.rightScrollY = Math.abs(pos.y);
        this.scrollLeft.scrollToElement(
          leftMenuLis[this.currentIndex],
          200,
          0,
          true
        );
      });
    },
    getRightTops() {
      const rightLis = this.$refs.content_wrapper.children[0].children;
      let top = 0;
      let tempArr = [top];
      Array.from(rightLis).forEach((item, idx) => {
        if (idx === rightLis.length - 1) {
          item.style.paddingBottom = `${this.$refs.content_wrapper
            .offsetHeight - item.offsetHeight}px`;
        }
        top += item.offsetHeight;
        tempArr.push(top);
      });
      this.rightLiTops = tempArr;
    },
    intoSearch() {
      this.showSearchPennel = true;
    },
    toHidePennel() {
      this.showSearchPennel = false;
    }
  },
  watch: {
    categoryList() {
      this.$nextTick(() => {
        this.init_bScroll();
        this.getRightTops();
      });
    }
  },
  computed: {
    ...mapState(["categoryList"]),
    currentIndex() {
      const { rightScrollY, rightLiTops } = this;
      return rightLiTops.findIndex((item, i) => {
        return rightScrollY >= item && rightScrollY < rightLiTops[i + 1];
      });
    }
  }
};
</script>

<style lang="less" scoped>
.category_con {
  .category_top {
    height: 54px;
  }
  .category_main {
    height: calc(100vh - 54px - 49px);
    display: flex;
    overflow: hidden;
    .menu_wrapper {
      flex: 1;
      background: #fafafa;
      ul {
        li {
          height: 50px;
          justify-content: center;
          display: flex;
          align-items: center;
          position: relative;
        }
        .active {
          color: #1d988d;
          &::before {
            content: "";
            width: 4px;
            height: 26px;
            position: absolute;
            background: #1d988d;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .content_wrapper {
      flex: 4;
      background: #fff;
      .content_li {
        .p_title {
          display: flex;
          padding: 0 10px;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          a {
            color: #aaa;
          }
        }
        .p_items_con {
          display: flex;
          flex-wrap: wrap;
          .p_item {
            width: 33.33%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 90px;
            align-items: center;
            img {
              width: 60%;
            }
          }
        }
      }
    }
  }
}
</style>
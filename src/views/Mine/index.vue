<template>
  <div class="mine_container">
    <div class="top">
      <div class="userInfo">
        <img
          :src="!$store.state.userInfo.avatar_url ? defaultAvatar : baseUrl+$store.state.userInfo.avatar_url"
          @click="showSetting"
        />
        <div @click="showSetting">
          <p>
            <span>{{pFilter($store.state.userInfo.phone)}}</span>
            <img src="~@/assets/image/cellphone.png" />
          </p>
          <p>{{$store.state.userInfo.nick_name}}</p>
        </div>
      </div>
      <div class="order_menu">
        <div class="order_title">
          <h4>我的订单</h4>
          <a href>查看全部></a>
        </div>
        <ul class="menu_main">
          <li class="menu_item">
            <i class="iconfont icon-daifukuan"></i>
            待付款
          </li>
          <li class="menu_item">
            <i class="iconfont icon-fenxiang"></i>
            待分享
          </li>
          <li class="menu_item">
            <i class="iconfont icon-nodelivery"></i>
            待发货
          </li>
          <li class="menu_item">
            <i class="iconfont icon-daishouhuo"></i>
            待收获
          </li>
          <li class="menu_item">
            <i class="iconfont icon-daipingjia"></i>
            待评价
          </li>
        </ul>
      </div>
    </div>
    <div class="middle">
      <ul class="menu_main">
        <li class="menu_item">
          <i class="iconfont icon-hongbao_huaban"></i>
          新人红包
        </li>
        <li class="menu_item">
          <i class="iconfont icon-tree"></i>
          多多果园
        </li>
        <li class="menu_item">
          <i class="iconfont icon-futou"></i>
          砍价免费拿
        </li>
        <li class="menu_item">
          <i class="iconfont icon-niu"></i>
          多多牧场
        </li>
        <li class="menu_item">
          <i class="iconfont icon-shipin"></i>
          多多视频
        </li>
        <li class="menu_item">
          <i class="iconfont icon-dizhi"></i>
          收获地址
        </li>
        <li class="menu_item">
          <i class="iconfont icon-kefu"></i>
          官方客服
        </li>
        <li class="menu_item" @click="handleQuit">
          <i class="iconfont icon-shezhi"></i>
          退出
        </li>
      </ul>
    </div>
    <base-info v-if="settingShow" @backSettingShow="hideSetting" />
  </div>
</template>

<script>
import phoneFilter from "@/utils/phoneFilter";
import defaultAvatar from "@/assets/image/defaultAvatar.png";
import BaseInfo from "./baseInfo";
import { Dialog } from "vant";
import { mapActions } from 'vuex';
export default {
  components: {
    BaseInfo,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      settingShow: false,
      baseUrl: process.env.VUE_APP_URL,
      defaultAvatar,
      tempUserInfo: {},
      editShow: false
    };
  },
  methods: {
    ...mapActions(['toLogOut']),
    showSetting() {
      this.settingShow = true;
    },
    hideSetting() {
      this.settingShow = false;
    },
    pFilter(phone) {
      return phoneFilter(phone);
    },
    handleQuit() {
      Dialog.confirm({
        message: "您确定退出吗"
      }).then(() => {
        this.toLogOut()
        this.$router.replace('/login')
      });
    }
  }
};
</script>

<style scoped lang="less">
.mine_container {
  height: 100%;
  position: relative;
  .top {
    padding: 15px 15px 0;
    background: #fff;
    .userInfo {
      display: flex;
      > img {
        border-radius: 50%;
        width: 61px;
        height: 61px;
      }
      > div {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 16px;
          display: flex;
          img {
            width: 28px;
          }
          span {
            line-height: 28px;
          }
        }
      }
    }
    .order_menu {
      margin-top: 15px;
      .order_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        h4 {
          font-size: 20px;
        }
        a {
          color: #999;
        }
      }
    }
  }
  .menu_main {
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    .menu_item {
      display: flex;
      flex-direction: column;
      width: 20%;
      color: #777;
      margin-bottom: 15px;
      .iconfont {
        font-size: 24px;
        color: #bbb;
        margin-bottom: 10px;
      }
    }
  }
  .middle {
    margin-top: 6px;
    padding: 15px 15px 0;
    background: #fff;
    .menu_main .menu_item {
      width: 25%;
      .iconfont {
        color: #ffa500;
      }
    }
  }
}
</style>
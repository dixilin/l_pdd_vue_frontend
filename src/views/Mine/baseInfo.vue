<template>
  <div class="setting_con">
    <van-nav-bar class="setting_header" title="基本信息" left-text="返回" @click-left="returnBack" />
    <div class="setting_main">
      <van-cell-group>
        <van-cell title="头像" center @click="editAvatar">
          <template #right-icon>
            <img
              class="defaultImg"
              :src="!$store.state.userInfo.avatar_url ? defaultAvatar : baseUrl+$store.state.userInfo.avatar_url"
            />
            <input
              type="file"
              style="display:none"
              ref="inputFile"
              @change="upload"
              accept="image/*"
            />
          </template>
        </van-cell>
        <van-cell title="用户名" :value="userInfo.user_name" />
        <van-cell title="手机" :value="pFilter(userInfo.phone)" />
        <van-cell
          title="昵称"
          is-link
          :value="userInfo.nick_name"
          @click="editBaseInfo('nick_name')"
        />
        <van-cell title="性别" is-link :value="getGender" @click="editBaseInfo('gender')" />
        <van-cell title="地区" is-link :value="getCurrentArea" @click="editBaseInfo('area')" />
        <van-cell title="生日" is-link :value="userInfo.birth" @click="editBaseInfo('birth')" />
        <van-cell
          title="个性签名"
          is-link
          :value="userInfo.signature"
          @click="editBaseInfo('signature')"
        />
      </van-cell-group>
    </div>
    <van-action-sheet v-model="genderShow" :actions="actions" @select="onSelect" />
    <van-action-sheet v-model="areaShow">
      <van-area
        :area-list="areaList"
        @cancel="areaShow = false"
        @confirm="saveArea"
        :value="getAreaVal"
      />
    </van-action-sheet>
    <van-action-sheet v-model="dateShow">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="saveDate"
        @cancel="dateShow = false"
      />
    </van-action-sheet>

    <setting v-if="editShow" @cancelEdit="editCancel" :whichOne="whichOne" />
  </div>
</template>

<script>
import areaList from "@/utils/area";
import phoneFilter from "@/utils/phoneFilter";
import { uploadAvatar } from "@/apis/mine";
import {
  NavBar,
  CellGroup,
  Cell,
  Field,
  ActionSheet,
  Area,
  DatetimePicker
} from "vant";
import defaultAvatar from "@/assets/image/defaultAvatar.png";
import Setting from "./setting";
import { mapState, mapActions } from "vuex";
import { updateBaseInfo } from "@/apis/mine";
import moment from "moment";

export default {
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet,
    [Area.name]: Area,
    [DatetimePicker.name]: DatetimePicker,
    Setting
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      defaultAvatar,
      tempUserInfo: {},
      editShow: false,
      whichOne: null,
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 2 },
        { name: "未知", value: 0 }
      ],
      genderShow: false,
      currentDate: new Date(),
      dateShow: false,
      minDate: new Date(1901, 0, 1),
      maxDate: new Date(),
      areaList,
      areaShow: false
    };
  },
  created() {
    this.tempUserInfo = JSON.parse(JSON.stringify(this.userInfo));
    if (this.userInfo.birth) {
      const num = this.userInfo.birth.split("-");
      this.currentDate = new Date(num[0], num[1] - 1, num[2]);
    }
  },
  methods: {
    ...mapActions(["saveUserInfo"]),
    editCancel() {
      this.editShow = false;
    },
    returnBack() {
      this.$emit("backSettingShow");
    },
    editAvatar() {
      this.$refs.inputFile.click();
    },
    pFilter(phone) {
      return phoneFilter(phone);
    },
    async upload(e) {
      const file = e.target.files[0];
      const fd = new FormData();
      fd.append("avatar_url", file, file.name);
      const phone = this.$store.state.userInfo.phone;
      const result = await uploadAvatar(fd, phone);
      if (result.status === "success") {
        this.tempUserInfo.avatar_url = result.url;
      }
    },
    editBaseInfo(type) {
      switch (type) {
        case "nick_name":
          this.whichOne = "nick_name";
          this.editShow = true;
          break;
        case "gender":
          this.genderShow = true;
          break;
        case "area":
          this.areaShow = true;
          break;
        case "birth":
          this.dateShow = true;
          break;
        case "signature":
          this.whichOne = "signature";
          this.editShow = true;
          break;
      }
    },
    async onSelect(item) {
      this.tempUserInfo.gender = item.value;
      const res = await updateBaseInfo({
        phone: this.tempUserInfo.phone,
        gender: item.value
      });
      if (res.status === "success") {
        this.saveUserInfo(this.tempUserInfo);
        this.genderShow = false;
      }
    },
    async saveDate(val) {
      const birth = moment(val).format("YYYY-MM-DD");
      this.tempUserInfo.birth = birth;
      const res = await updateBaseInfo({
        phone: this.tempUserInfo.phone,
        birth
      });
      if (res.status === "success") {
        this.saveUserInfo(this.tempUserInfo);
        this.dateShow = false;
      }
    },
    async saveArea(data) {
      const dataStr = JSON.stringify(data)
      this.tempUserInfo.area = dataStr;
      const res = await updateBaseInfo({
        phone: this.tempUserInfo.phone,
        area: data
      });
      if (res.status === "success") {
        this.saveUserInfo(this.tempUserInfo);
        this.areaShow = false;
      }
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    getGender() {
      if (this.userInfo.gender == 1) {
        return "男";
      } else if (this.userInfo.gender == 2) {
        return "女";
      }
      return "未知";
    },
    getCurrentArea() {
      const area = this.userInfo.area;
      if (!area || !area.length) {
        return "";
      }
      return JSON.parse(area)
        .map(item => {
          if (item) {
            return item.name;
          }
        })
        .join(" ");
    },
    getAreaVal() {
      if (!this.userInfo.area) {
        return "";
      }
      const area = JSON.parse(this.userInfo.area) 
      if (!area[2]) {
        return area[1].code;
      } else {
        return area[2].code;
      }
    }
  },
  watch: {
    "tempUserInfo.avatar_url"(newVal) {
      if (this.userInfo.avatar_url !== newVal) {
        this.saveUserInfo(this.tempUserInfo);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.setting_con {
  width: 100%;
  height: 100%;
  background: #eee;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  .setting_header {
    background: #eee;
    .van-nav-bar__text {
      color: #777;
    }
  }
  .setting_main {
    .defaultImg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .edit_setting {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 0;
    background: #eee;
    > .edit_main {
      padding: 0 10px;
    }
  }
}
</style>
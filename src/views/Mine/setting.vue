<template>
  <div class="edit_setting">
    <van-nav-bar
      :title="whichOne === 'nick_name' ? '更改昵称' : '更改个性签名'"
      left-text="取消"
      @click-left="cancel"
      right-text="保存"
      class="setting_header"
      @click-right="save"
    />
    <div class="edit_main">
      <van-field
        label="昵称："
        v-if="whichOne === 'nick_name'"
        v-model="editInfo.nick_name"
        placeholder="换个好听点的昵称吧"
        maxlength="12"
        autofocus
      />
      <van-field
        v-else-if="whichOne === 'signature'"
        v-model="editInfo.signature"
        autosize
        label="个性签名："
        autofocus
        type="textarea"
        maxlength="20"
        placeholder="个性签名不得整一个啊"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { NavBar, Field } from "vant";
import { mapState, mapActions } from "vuex";
import { updateBaseInfo } from "@/apis/mine";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field
  },
  props: {
    whichOne: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editInfo: {
        nick_name: "",
        signature: ""
      }
    };
  },
  created() {
    this.editInfo.nick_name = this.userInfo.nick_name;
    this.editInfo.signature = this.userInfo.signature
      ? this.userInfo.signature
      : "";
  },
  methods: {
    ...mapActions(["saveUserInfo"]),
    cancel() {
      this.$emit("cancelEdit");
    },
    async save() {
      const res = await updateBaseInfo({
        [this.whichOne]: this.editInfo[this.whichOne],
        phone: this.userInfo.phone
      });
      if (res.status === "success") {
        const tempData = JSON.parse(JSON.stringify(this.userInfo));
        tempData[this.whichOne] = this.editInfo[this.whichOne];
        this.saveUserInfo(tempData);
        this.cancel();
      }
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>

<style scoped lang="less">
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
  .setting_header {
    background: #eee;
    .van-nav-bar__text {
      color: #777;
    }
  }
}
</style>
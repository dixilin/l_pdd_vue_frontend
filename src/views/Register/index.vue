<template>
  <div class="login_con">
    <div class="login_header">Sign Up</div>
    <div class="login_main">
      <form>
        <section>
          <div>
            <input
              :class="{error:veryfyObj.user_nameError}"
              v-model="form.user_name"
              type="text"
              placeholder="请输入用户名"
              @blur="user_nameCheck"
            />
          </div>
          <p>{{veryfyObj.user_nameError}}</p>
        </section>
        <section>
          <div>
            <input
              v-model="form.password"
              :type="!pswSeen ? 'password' : 'text'"
              placeholder="请输入密码"
              @blur="passwordCheck"
              :class="{error:veryfyObj.passwordError}"
            />
            <img v-if="!pswSeen" src="~@/assets/image/cannotsee.png" @click="pswSeen=true" />
            <img v-else src="~@/assets/image/cansee.png" @click="pswSeen=false" />
          </div>
          <p>{{veryfyObj.passwordError}}</p>
        </section>
        <section>
          <div>
            <input
              type="tel"
              placeholder="请输入手机号"
              v-model="form.phone"
              @input="phoneCheck(false)"
              :class="{error:veryfyObj.phoneError}"
            />
          </div>
          <p>{{veryfyObj.phoneError}}</p>
        </section>
        <section>
          <div>
            <input
              type="text"
              placeholder="请输入手机验证码"
              v-model="form.code"
              @blur="codeCheck"
              :class="{error:veryfyObj.codeError}"
            />
            <button
              @click="getVerifyCode"
              :disabled="isDisabled"
              :class="{disabled:isDisabled}"
              v-preventReClick="2000"
            >{{verifyText}}</button>
          </div>
          <p>{{veryfyObj.codeError}}</p>
        </section>
      </form>
    </div>
    <div class="login_bottom_btn">
      <button @click="handleRegister" v-preventReClick="3000">注册</button>
      <button @click="$router.push('/login')">返回</button>
    </div>
  </div>
</template>

<script>
import {
  checkUserNameExist,
  checkPhoneExist,
  toGetVerify,
  register
} from "@/apis/register";
import { Toast } from "vant";

export default {
  name:'register',
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      pswSeen: false,
      verifyText: "获取验证码",
      isDisabled: true, //是否禁用按钮
      veryfyObj: {
        user_nameError: "",
        passwordError: "",
        phoneError: "",
        codeError: ""
      },
      form: {
        user_name: "",
        password: "",
        phone: "",
        code: ""
      },
      defaultCode: null
    };
  },
  methods: {
    async getVerifyCode() {
      const result = await toGetVerify(this.form.phone);
      if (result.status !== "success") {
        Toast.fail(result.msg);
        return;
      }
      Toast.success("发送成功");
      this.defaultCode = result.code;
      this.isDisabled = true;
      let countDown = (this.verifyText = 60);
      const timer = setInterval(() => {
        this.verifyText = --countDown;
        if (this.verifyText == 0) {
          clearInterval(timer);
          this.verifyText = "获取验证码";
          this.isDisabled = false;
        }
      }, 1000);
    },
    async user_nameCheck() {
      const { user_name } = this.form;
      if (!user_name) {
        this.veryfyObj.user_nameError = "用户名不可为空";
        return;
      }
      const result = await checkUserNameExist(user_name);
      if (result.message !== "ok") {
        this.veryfyObj.user_nameError = "该用户名已注册";
        return;
      }
      this.veryfyObj.user_nameError = "";
    },
    passwordCheck() {
      const { password } = this.form;
      if (!password) {
        this.veryfyObj.passwordError = "密码不可为空";
        return;
      }
      this.veryfyObj.passwordError = "";
    },
    async phoneCheck(isRegisterBtn = false) {
      this.isDisabled = true;
      const { phone } = this.form;
      if (!phone) {
        this.veryfyObj.phoneError = "手机号不可为空";
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.veryfyObj.phoneError = "手机号码有误请重新填写";
        return;
      }
      const result = await checkPhoneExist(phone);
      if (result.message !== "ok") {
        this.veryfyObj.phoneError = "该手机号码已注册";
        return;
      }
      this.veryfyObj.phoneError = "";
      if (!isRegisterBtn) {
        this.isDisabled = false;
      }
    },
    async codeCheck() {
      const { code } = this.form;
      if (!code) {
        this.veryfyObj.codeError = "验证码不可为空";
        return;
      }
      if (code !== this.defaultCode) {
        this.veryfyObj.codeError = "验证码不正确";
        return;
      }
      this.veryfyObj.codeError = "";
    },
    async handleRegister() {
      await this.user_nameCheck();
      await this.passwordCheck();
      await this.phoneCheck(true);
      await this.codeCheck();

      for (let k in this.veryfyObj) {
        if (this.veryfyObj[k]) {
          Toast.fail("请正确填写相关信息后再进行注册");
          return;
        }
      }
      const res = await register(this.form);
      if (res.status === "success") {
        Toast.success(res.msg);
        setTimeout(() => {
        this.$router.replace("/login");
      }, 2000);
      } else {
        Toast.fail(res.msg);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login_con {
  width: 100%;
  height: 100%;
  padding: 100px 38px 0;
  color: #333;
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(29, 152, 189, 0.3);
    filter: blur(40px);
    z-index: -1;
  }
  .login_header {
    font-size: 28px;
    padding: 10px 25px 30px;
    text-align: center;
    color: #fff;
    text-shadow: 5px -5px 5px rgb(29, 152, 189);
  }
  .login_main {
    > form {
      section {
        > div {
          position: relative;
          img {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
          input {
            width: 100%;
            padding-left: 8px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;
            height: 46px;
          }
          input.error {
            border: 1px solid #f00;
          }
          > button {
            border: 1px solid rgb(29, 152, 189);
            border-radius: 4px;
            width: 90px;
            height: 30px;
            background: #fff;
            color: rgb(29, 152, 189);
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
          .disabled {
            background: #eee;
            opacity: 0.4;
          }
        }
        > p {
          color: #f00;
          font-size: 12px;
          line-height: 20px;
          height: 20px;
        }
      }
    }
  }
  .login_bottom_btn {
    button {
      width: 100%;
      border-radius: 4px;
      height: 46px;
      margin-top: 16px;
      border: 0 none;
      &:first-child {
        color: #fff;
        background: rgb(29, 152, 189);
      }
      &:last-child {
        color: rgb(29, 152, 189);
        background: #fff;
        border: 1px solid rgb(29, 152, 189);
      }
    }
  }
}
</style>
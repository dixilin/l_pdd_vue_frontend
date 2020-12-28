<template>
  <div class="login_con">
    <div class="login_header">Welcome</div>
    <div class="login_main">
      <div>
        <section>
          <input type="text" placeholder="用户名/手机号" v-model="form.login_name" />
        </section>
        <section>
          <input :type="!pswSeen ? 'password' : 'text'" placeholder="密码" v-model="form.password" />
          <img v-if="!pswSeen" src="~@/assets/image/cannotsee.png" @click="pswSeen=true" />
          <img v-else src="~@/assets/image/cansee.png" @click="pswSeen=false" />
        </section>
        <section>
          <input type="text" placeholder="验证码" v-model="form.captcha" />
          <img :src="captchaUrl" class="captcha" @click.prevent="switchCaptcha" />
        </section>
      </div>
    </div>
    <div class="login_bottom_btn">
      <button @click="handleLogin" v-preventReClick="3000">登录</button>
      <button @click="$router.push('/register')">注册</button>
    </div>
  </div>
</template>

<script>
import { login } from "@/apis/login";
import { Toast } from "vant";
import { mapActions } from "vuex";
export default {
  name: "login",
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      pswSeen: false,
      captchaUrl:
        process.env.VUE_APP_URL + "/api/getCaptcha?time=" + Date.now(),
      form: {
        login_name: "",
        password: "",
        captcha: ""
      },
      prevRouter: "/"
    };
  },
  methods: {
    ...mapActions(["saveUserInfo"]),
    switchCaptcha() {
      this.captchaUrl =
        process.env.VUE_APP_URL + "/api/getCaptcha?time=" + Date.now();
    },
    async handleLogin() {
      const result = await login(this.form);
      if (result.status !== "success") {
        Toast.fail(result.msg);
        return;
      }
      if (result.status === "success") {
        await this.saveUserInfo({
          user_name: result.user_name,
          token: result.token,
          nick_name: result.nick_name,
          phone: result.phone,
          avatar_url: result.avatar_url,
          birth: result.birth,
          signature: result.signature,
          gender: result.gender,
          area: result.area,
        });
        Toast.success(result.msg);
        setTimeout(() => {
          this.$router.replace(this.prevRouter);
        }, 2000);
      }
    }
  },
  beforeRouteEnter(_to, from, next) {
    next(vm => {
      if (from.path !== "/register") {
        vm.prevRouter = from.path;
      }
    });
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
    padding: 10px 25px 10px;
    text-align: center;
    color: #fff;
    text-shadow: 5px -5px 5px rgb(29, 152, 189);
  }
  .login_main {
    > div {
      section {
        margin-top: 16px;
        position: relative;
        img {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        .captcha {
          width: 110px;
          right: 0;
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
        p {
          color: #888;
          font-size: 12px;
          line-height: 20px;
          a {
            color: rgb(29, 152, 189);
          }
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
<template>
  <div class="login">
    <div class="left">
      <div class="top">
        <img class="logo" src="@/assets/img/login_logo.png" alt />
        <span class="t1">黑马面面</span>
        <div class="line"></div>
        <span class="t2">用户登录</span>
      </div>
      <el-form class="form" :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img @click="refreshCode" class="code" :src="codeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="form.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="toLogin" class="btn" type="primary">登录</el-button>
          <br />
          <el-button @click="$refs.register.isShow = true" class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
    <!-- 对话框 -->
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "./register";
import { login } from "@/api/login.js";
import { localSave } from "@/utils/local.js";
export default {
  components: {
    register
  },
  data() {
    return {
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "", // 手机号
        password: "", // 密码
        code: "", //验证码
        isCheck: false // 选择状态
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, val, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(val)) {
                callback();
              } else {
                callback("请填写正确的手机号");
              }
            }
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "请输入6-12位密码", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "change" }
        ],
        isCheck: [
          { required: true, message: "请勾选选项", trigger: "change" },
          {
            validator: (rule, val, callback) => {
              if (val === true) {
                callback();
              } else {
                callback("请阅读协议并勾选");
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    toLogin() {
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (!result) {
          this.$message.error("登录失败");
        } else {
          login(this.form).then(res => {
            this.$message.success("登录成功");
            localSave(res.data.token);
            this.$router.push("/layout");
          });
        }
      });
    },
    refreshCode() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&random=" + Date.now();
    }
  }
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 148, 250, 1),
    rgba(2, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .top {
      display: flex;
      align-items: center;
      margin-bottom: 28px;
      .logo {
        width: 22px;
        height: 17px;
      }
      .t1 {
        font: 400 24px SourceHanSansCN;
        color: rgba(13, 12, 12, 1);
        margin: 0 14px 0 17px;
      }
      .line {
        width: 1px;
        height: 28px;
        margin-right: 14px;
        background: rgba(199, 199, 199, 1);
      }
      .t2 {
        font: 400 22px PingFangSC;
        color: rgba(13, 12, 12, 1);
      }
    }
    .form {
      .el-input__inner {
        height: 45px;
      }
      .el-form-item {
        margin-bottom: 25px;
      }
      .code {
        width: 100%;
        height: 45px;
      }
      .btn {
        width: 100%;
        &:nth-child(1) {
          margin-bottom: 25px;
        }
      }
    }
  }
  .right {
    width: 633px;
    height: 435px;
  }
}
</style>

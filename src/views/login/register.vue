<template>
  <el-dialog :visible="isShow" width="600px" class="register" :show-close="false">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" :rules="rules" label-width="80px" ref="form">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          name="image"
          class="avatar-uploader"
          :action="baseUrl + '/uploads'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="15">
            <el-input v-model="form.code" placeholder="请输入图形码"></el-input>
          </el-col>
          <el-col :span="7" :offset="2">
            <img @click="refreshCode" class="tu" :src="codeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-col :span="15">
          <el-input v-model="form.rcode" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="7" :offset="2">
          <el-button @click="getPhoneCode" :disabled="totalTime < 60" class="btn">
            获取验证码
            <span v-if="totalTime != 60">{{ totalTime }}s</span>
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button @click="goRegister" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入api sendsms
import { sendsms, register } from "@/api/register.js";
export default {
  data() {
    return {
      totalTime: 60, // 验证码倒计时
      baseUrl: process.env.VUE_APP_URL, // 基地址
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms", // 图形码地址
      imageUrl: "", // 头像图片地址
      isShow: false, // 注册框显示
      form: {
        avatar: "", // 头像
        username: "", // 昵称
        email: "", // 邮箱
        phone: "", // 手机号
        password: "", // 密码
        code: "", // 图形码
        rcode: "" // 验证码
      },
      rules: {
        avatar: [{ required: true, message: "请添加头像", trigger: "change" }],
        username: [
          { required: true, message: "请输入昵称", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              setTimeout(() => {
                if (reg.test(value)) {
                  callback();
                } else {
                  callback("请正确输入邮箱");
                }
              }, 1000);
            },
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              setTimeout(() => {
                if (reg.test(value)) {
                  callback();
                } else {
                  callback("请正确输入手机号");
                }
              }, 1000);
            }
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "请输入6-12位密码", trigger: "change" }
        ],
        code: [{ required: true, message: "请输入图形码", trigger: "change" }],
        rcode: [{ required: true, message: "请输入验证码", trigger: "change" }]
      }
    };
  },
  watch: {
    isShow(newVal) {
      // 监听isShow清空表单
      if (newVal == false) {
        this.$refs.form.resetFields();
        this.imageUrl = "";
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      //  res 接口返回的数据  file文件信息
      //  this.imageUrl = "http://127.0.0.1/heimamm/public/" + res.data.file_path;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField(["avatar"], error => {
        if (!error) {
          window.console.log(error);
        }
      });
    },
    beforeAvatarUpload(file) {
      let arr = ["image/jpeg", "image/png"];
      const isJPG = arr.includes(file.type); // 类型
      const isLt2M = file.size / 1024 / 1024 < 2; // 大小 file.size是文件字节大小
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG,PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    goRegister() {
      this.$refs.form.validate(result => {
        if (!result) {
          this.$message.warning("每一项必填");
        } else {
          register(this.form).then(() => {
            // if (res.data.code===200) {
            this.$message.success("注册成功");
            this.isShow = false;
            // } else {
            // this.$message.success('注册失败');
            // }
          });
        }
      });
    },
    getPhoneCode() {
      let pass = 0; // 正确次数
      this.$refs.form.validateField(["phone", "code"], err => {
        if (!err) {
          pass++;
        }
        if (pass === 2) {
          this.totalTime--; // 先减一，因为计时器延迟一秒执行
          let inter = setInterval(() => {
            this.totalTime--;
            if (this.totalTime <= 0) {
              this.totalTime = 60;
              clearInterval(inter);
            }
          }, 1000);
          sendsms({
            code: this.form.code,
            phone: this.form.phone
          }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.data.captcha + ""); // $message要传递字符串
            } else {
              this.$message.error(res.message);
              this.refreshCode();
            }
          });
        }
      });
    },
    refreshCode() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&xx=" + Date.now(); // 随机地址
    }
  }
};
</script>

<style lang="less">
.register {
  .el-dialog__body {
    padding: 35px 36px 0 0;
  }
  .title {
    height: 53px;
    background: linear-gradient(to right, #01c5fa, #1395fa);
    text-align: center;
    line-height: 53px;
    color: #fff;
    font-size: 14px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .footer {
    text-align: center;
  }
  .tu {
    display: block;
    height: 40px;
    width: 100%;
  }
  .btn {
    width: 100%;
  }
  .avatar-uploader {
    text-align: center;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>

<template>
  <el-dialog :visible="isShow" width="600px" class="register" :show-close="false">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" :rules="rules" label-width="80px" ref="form">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          name="image"
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16" class="col">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="6">
            <img class="tu" :src="baseUrl+'/captcha?type=sendsms'" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-col :span="16" class="col">
          <el-input v-model="form.rcode"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button>获取用户验证码</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="isShow=false">取消</el-button>
      <el-button @click="goRegister" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: "",
      isShow: true,
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
        avatar: [{ required: true, message: "必填项", trigger: "change" }],
        username: [{ required: true, message: "必填项", trigger: "change" }],
        email: [{ required: true, message: "必填项", trigger: "change" }],
        phone: [{ required: true, message: "必填项", trigger: "change" }],
        password: [{ required: true, message: "必填项", trigger: "change" }],
        code: [{ required: true, message: "必填项", trigger: "change" }],
        rcode: [{ required: true, message: "必填项", trigger: "change" }]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      //   window.console.log(res);  // 接口返回的数据
      //   window.console.log(file); // 文件信息
      //   this.imageUrl = "http://127.0.0.1/heimamm/public/" + res.data.file_path;
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
        this.$message.error("上传头像图片只能是 JPG 格式!");
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
        }
      });
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
    height: 40px;
    width: 100%;
  }
  .col {
    margin-right: 21px;
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
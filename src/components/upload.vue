<template>
  <el-upload
    class="avatar-uploader"
    :action="baseUrl+'/question/upload'"
    name="file"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
  >
    <div v-if="type=='video'">
      <video v-if="value" :src="baseUrl+'/'+value" class="avatar" controls></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <div v-else>
      <img v-if="value" :src="baseUrl+'/'+value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </el-upload>
</template>

<script>
export default {
  props: ["value", "type"],
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL
    };
  },
  methods: {
    beforeUpload(file) {
      if (this.type === "video") {
        const isVideo = file.type === "video/mp4";
        const isLt8M = file.size / 1024 / 1024 < 8;
        if (!isVideo) {
          this.$message.error("上传解析视频只能是 MP4 格式!");
        }
        if (!isLt8M) {
          this.$message.error("上传解析视频大小不能超过 8MB!");
        }
        return isVideo && isLt8M;
      } else {
        const isJPG = file.type === "image/jpeg" || file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG、PNG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      }
    },
    onSuccess(res) {
      this.$emit("input", res.data.url);
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
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
</style>
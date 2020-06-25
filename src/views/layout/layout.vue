<template>
  <el-container class="layout">
    <el-header class="header">
      <div @click="bol = !bol" class="el-icon-s-fold icon"></div>
      <img class="logo" src="@/assets/img/layout_logo2.png" alt />
      <div class="title1">黑马面面</div>
      <div class="nouse"></div>
      <img
        class="avatar"
        v-if="$store.state.userInfo != ''"
        :src="baseUrl + '/' + $store.state.userInfo.avatar"
        alt
      />
      <div class="title2">{{ $store.state.userInfo.username }}，您好</div>
      <el-button @click="exit" type="primary">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="auto" class="left">
        <el-menu
          :default-active="$route.path"
          :router="true"
          :collapse="bol"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/layout/dataOverview">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/layout/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/company">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, logout } from "@/api/layout.js";
import { localRemove, localGet } from "@/utils/local.js";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      userInfo: "", // 用户信息
      bol: false
    };
  },
  created() {
    // window.console.log("fullPath：", this.$route.fullPath);
    // window.console.log("path：", this.$route.path);
    if (!localGet()) {
      this.$router.push("/");
      return;
    }
    getUserInfo().then(res => {
      this.$store.state.userInfo = res.data;
      this.$store.state.roleInit = this.$store.state.roleObj[res.data.role_id];
      if (
        !this.$route.meta.roles.includes(
          this.$store.state.roleObj[res.data.role_id]
        )
      ) {
        this.$message.error("你没有权限访问该页面，请重新登录");
        localRemove();
        this.$router.push("/");
      }
      if (res.data.status === 0) {
        this.$message.error("此账号被禁用");
        localRemove();
        this.$router.push("/");
      }
    });
  },
  methods: {
    exit() {
      this.$confirm("此操作将退出账号, 是否继续?", "提示", {
        confirmButtonText: "狠心离开",
        cancelButtonText: "再逛逛看",
        type: "warning",
        center: true
      })
        .then(() => {
          logout().then(() => {
            localRemove();
            this.$router.push("/");
          });

          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message.warning("取消退出");
        });
    }
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    .nouse {
      flex: 1;
    }
    .icon {
      font-size: 30px;
    }
    .logo {
      height: 28px;
      margin: 0 12px 0 22px;
    }
    .title1 {
      font-size: 22px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
    }
    .avatar {
      width: 43px;
      height: 43px;
    }
    .title2 {
      font-size: 14px;
      margin: 0 38px 0 9px;
    }
    // box-shadow: 0px 2px 5px 6px rgba(63, 63, 63, 0.35);
  }
  .main {
    background: #e8e9ec;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>

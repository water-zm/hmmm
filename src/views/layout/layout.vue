<template>
  <el-container class="layout">
    <el-header class="header">
      <div @click="bol=!bol" class="el-icon-s-fold icon"></div>
      <img class="logo" src="@/assets/img/layout_logo2.png" alt />
      <div class="title1">黑马面面</div>
      <div class="nouse"></div>
      <img class="avatar" v-if="userInfo!=''" :src="baseUrl+'/'+userInfo.avatar" alt />
      <img class="avatar" v-else src="@/assets/img/avatar.png" alt />
      <div class="title2">{{userInfo.username}}，您好</div>
      <el-button @click="exit" type="primary">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="auto" class="left">
        <el-menu default-active="2" :collapse="bol" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
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
import { localRemove } from "@/utils/local.js";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      userInfo: "", // 用户信息
      bol: false
    };
  },
  created() {
    getUserInfo().then(res => {
      window.console.log(res);
      this.userInfo = res.data;
    });
  },
  methods: {
    exit() {
      logout().then(() => {
        localRemove();
        this.$router.push("/");
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

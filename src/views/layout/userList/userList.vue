<template>
  <div class="userList">
    <el-card class="card">
      <el-form :model="form" inline ref="form">
        <el-form-item prop="username" label="用户名称">
          <el-input v-model="form.username" class="w100"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱">
          <el-input v-model="form.email" class="w150"></el-input>
        </el-form-item>
        <el-form-item prop="role_id" label="角色">
          <el-input v-model="form.role_id" class="w150"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button @click="add" type="primary">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="list" border>
        <el-table-column label="序号">
          <template v-slot="scope">{{
            pagination.pageSize * (pagination.page - 1) + scope.$index + 1
          }}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="角色">
          <template v-slot="scope">
            <span v-if="scope.row.role_id == 2">管理员</span>
            <span v-else-if="scope.row.role_id == 3">老师</span>
            <span v-else>学生</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <span v-if="scope.row.status == 1" style="color:red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link @click="edit(scope.row)" type="primary" class="btn"
              >编辑</el-link
            >
            <el-link @click="status(scope.row.id)" type="primary" class="btn">{{
              scope.row.status == 1 ? '禁用' : '启用'
            }}</el-link>
            <el-link @click="remove(scope.row.id)" type="primary" class="btn"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagination.page"
        :page-sizes="[3, 5, 10, 15, 20]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        background
        class="page"
      >
      </el-pagination>
    </el-card>
    <userListDialog
      ref="dialog"
      :meta="meta"
      @search="search"
      @getData="getData"
      :formData="formData"
    ></userListDialog>
  </div>
</template>

<script>
import userListDialog from './userListDialog';
import { getUserList, removeUser, setStatus } from '@/api/userList.js';
export default {
  components: {
    userListDialog,
  },
  data() {
    return {
      form: {
        username: '', // 昵称
        email: '', // 邮箱
        role_id: '', // 角色数字 2管理员、3老师、 4学生
        page: '', // 页码 默认为1
        limit: '', // 页尺寸 默认为10
      },
      list: [], // 列表数据
      pagination: {
        page: 1, // 当前页
        total: 5, // 总数
        pageSize: 3, // 页尺寸
      },
      meta: 'add', // 区分新增 编辑
      formData: '', // 编辑表单
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let _page = {
        ...this.form,
        page: this.pagination.page,
        limit: this.pagination.pageSize,
      };
      getUserList(_page).then((res) => {
        this.list = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    sizeChange(size) {
      this.pagination.pageSize = size;
      this.search();
    },
    currentChange(val) {
      this.pagination.page = val;
      this.getData();
    },
    search() {
      this.pagination.page = 1;
      this.getData();
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    status(id) {
      setStatus({ id }).then(() => {
        this.$message.success('修改状态成功');
        this.getData();
      });
    },
    remove(id) {
      removeUser({ id }).then(() => {
        this.$message.success('删除成功');
        this.search();
      });
    },
    add() {
      this.$refs.dialog.isShow = true;
      this.meta = 'add';
    },
    edit(row) {
      this.$refs.dialog.isShow = true;
      this.meta = 'edit';
      this.formData = row;
    },
  },
};
</script>

<style lang="less">
.userList {
  .w150 {
    width: 150px;
  }
  .w100 {
    width: 100px;
  }
  .btn {
    margin: 0 10px;
  }
  .card {
    margin-bottom: 20px;
  }
  .page {
    margin: 30px 0 0 0;
    text-align: center;
  }
}
</style>

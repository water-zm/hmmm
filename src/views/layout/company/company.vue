<template>
  <div class="company">
    <el-card class="card">
      <el-form :model="form" :inline="true" ref="form">
        <el-form-item prop="eid" label="企业编号">
          <el-input v-model="form.eid" class="w100"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="企业名称">
          <el-input v-model="form.name" class="w150"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="创建者">
          <el-input v-model="form.username" class="w100"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="form.status" class="w150">
            <el-option value="0" label="禁用"></el-option>
            <el-option value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button @click="add" type="primary">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="list">
        <el-table-column label="序号" width="100">
          <template v-slot="scope">{{
            pagination.pageSize * (pagination.page - 1) + scope.$index + 1
          }}</template>
        </el-table-column>
        <el-table-column
          prop="eid"
          label="企业编号"
          width="180"
        ></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-link @click="edit(scope.row)" type="primary" class="btn"
              >编辑</el-link
            >
            <el-link
              @click="changeStatus(scope.row.id)"
              type="primary"
              class="btn"
              >{{ scope.row.status == 1 ? '禁用' : '启用' }}</el-link
            >
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
        :page-sizes="[1, 5, 10, 15, 20]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        background
        class="page"
      ></el-pagination>
    </el-card>
    <companyDialog
      ref="comDia"
      @search="search"
      @getData="getData"
      :meta="meta"
      :formData="formData"
    ></companyDialog>
  </div>
</template>

<script>
import companyDialog from './companyDialog';
import { getCompanyList, statusSet, companyRemove } from '@/api/company';
export default {
  components: {
    companyDialog,
  },
  data() {
    return {
      form: {
        eid: '', // 企业id
        name: '', // 企业名称
        username: '', // 用户名
        status: '', // 状态 1（启用） 0（禁用）
        page: '', // 页码 默认为1
        limit: '', // 页尺寸 默认为10
      },
      list: [],
      pagination: {
        page: 1, // 当前页
        total: 5, // 总数
        pageSize: 1, // 页尺寸
      },
      meta: 'add',
      formData: '',
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let _page = {
        ...this.form,
        page: this.pagination.page,
        limit: this.pagination.pageSize,
      };
      getCompanyList(_page).then((res) => {
        window.console.log(res);
        res.data.items.forEach((item) => {
          item.create_time = item.create_time.split(' ')[0];
        });
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
      this.getList();
    },
    search() {
      this.pagination.page = 1;
      this.getList();
    },
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    changeStatus(id) {
      statusSet({ id }).then(() => {
        this.$message.success('修改状态成功');
        this.getList();
      });
    },
    remove(id) {
      companyRemove({ id }).then(() => {
        this.$message.success('删除成功');
        this.getList();
      });
    },
    add() {
      this.$refs.comDia.isShow = true;
      this.meta = 'add';
    },
    edit(row) {
      this.$refs.comDia.isShow = true;
      this.meta = 'edit';
      this.formData = row;
    },
  },
};
</script>

<style lang="less">
.company {
  .w100 {
    width: 100px;
  }
  .w150 {
    width: 150px;
  }
  .card {
    margin-bottom: 20px;
  }
  .btn {
    margin: 0 10px;
  }
  .page {
    margin: 30px 0 0 0;
    text-align: center;
  }
}
</style>

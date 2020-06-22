<template>
  <div class="subject">
    <el-card class="card">
      <el-form :model="form" :inline="true">
        <el-form-item label="学科编号">
          <el-input v-model="form.rid" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="学科编号">
          <el-input v-model="form.name" class="w150"></el-input>
        </el-form-item>
        <el-form-item label="学科编号">
          <el-input v-model="form.username" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="学科编号">
          <el-select v-model="form.status" class="w150">
            <el-option :value="0" label="禁用"></el-option>
            <el-option :value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科编号">
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table v-if="tableData != ''" :data="tableData">
        <el-table-column label="序号" width="80">
          <template v-slot="scope"> {{ scope.$index + 1 }} </template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column v-slot="scope" label="状态" width="150">
          <template>
            <span v-if="scope.row.status == 0" style="color:red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column v-slot="scope" label="操作">
          <template>
            <el-link type="primary" class="btn">编辑</el-link>
            <el-link type="primary" class="btn">{{
              scope.row.status === 1 ? '禁用' : '启用'
            }}</el-link>
            <el-link type="primary" class="btn">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        background
        class="page"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getSubjectList } from '@/api/subject';
export default {
  data() {
    return {
      form: {
        rid: '', //学科编号
        name: '', //学科名称
        username: '', //创建者
        status: '', //状态
      },
      tableData: '', // 学科列表表格
      page: '', // 分页数据
    };
  },
  created() {
    getSubjectList().then((res) => {
      window.console.log(res);
      res.data.items.forEach((item) => {
        item.create_time = item.create_time.split(' ')[0];
      });
      this.tableData = res.data.items;
      this.page = res.data.pagination;
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less">
.subject {
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
    font-size: 14px;
  }
  .page {
    margin: 30px 0 0 0;
    text-align: center;
  }
}
</style>

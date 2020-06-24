<template>
  <div class="subject">
    <el-card class="card">
      <el-form :model="form" :inline="true" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="学科编号" prop="name">
          <el-input v-model="form.name" class="w150"></el-input>
        </el-form-item>
        <el-form-item label="学科编号" prop="username">
          <el-input v-model="form.username" class="w100"></el-input>
        </el-form-item>
        <el-form-item label="学科编号" prop="status">
          <el-select v-model="form.status" class="w150">
            <el-option :value="0" label="禁用"></el-option>
            <el-option :value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科编号">
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button @click="add" type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table v-if="tableData != ''" :data="tableData">
        <el-table-column label="序号" width="80">
          <template v-slot="scope">{{ pagination.pageSize*(pagination.page-1)+scope.$index + 1 }}</template>
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
            <el-link @click="edit(scope.row)" type="primary" class="btn">编辑</el-link>
            <el-link @click="setStatus(scope.row.id)" type="primary" class="btn">
              {{
              scope.row.status === 1 ? '禁用' : '启用'
              }}
            </el-link>
            <el-link @click="remove(scope.row.id)" type="primary" class="btn">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="changeSize"
        @current-change="changeCurrent"
        :current-page="pagination.page"
        :page-sizes="[1,5, 10, 15, 20]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        background
        class="page"
      ></el-pagination>
    </el-card>
    <subjectAdd ref="add"></subjectAdd>
  </div>
</template>

<script>
import { getSubjectList, removeSubject, setSubjectStatus } from "@/api/subject";
import subjectAdd from "./subjectAdd";
export default {
  components: {
    subjectAdd
  },
  data() {
    return {
      tableData: [], // 学科列表表格
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      },
      pagination: {
        pageSize: 1, // 页尺寸
        page: 1, // 页码
        total: 5 // 总数
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取学科列表数据
    getData() {
      let _page = {
        ...this.form,
        page: this.pagination.page,
        limit: this.pagination.pageSize
      };
      getSubjectList(_page).then(res => {
        // window.console.log(res);
        res.data.items.forEach(item => {
          item.create_time = item.create_time.split(" ")[0];
        });
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 搜索
    search() {
      this.pagination.page = 1;
      this.getData();
    },
    // 页尺寸
    changeSize(size) {
      this.pagination.pageSize = size; // 当前页容量
      this.pagination.page = 1;
      this.getData();
    },
    // 换页
    changeCurrent(val) {
      this.pagination.page = val; // 当前页
      this.getData();
    },
    // 清除
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 添加
    add() {
      this.$refs.add.isShow = true;
      this.$refs.add.mode = "add";
    },
    // 删除学科
    remove(id) {
      removeSubject({ id }).then(() => {
        this.$message.success("删除成功");
        this.search();
      });
    },
    // 修改状态
    setStatus(id) {
      setSubjectStatus({ id }).then(() => {
        this.$message.success("修改状态成功");
        this.getData();
      });
    },
    // 编辑
    edit(row) {
      this.$refs.add.form = JSON.parse(JSON.stringify(row));
      this.$refs.add.isShow = true;
      this.$refs.add.mode = "edit";
    }
  }
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

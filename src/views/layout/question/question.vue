<template>
  <div class="question">
    <el-card class="card">
      <el-form :model="form" ref="form" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item prop="subject" label="学科">
              <el-select v-model="form.subject" placeholder="请选择学科">
                <el-option
                  :value="item.id"
                  :label="item.short_name"
                  v-for="(item, index) in subjectList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="step" label="阶段">
              <el-select v-model="form.step" placeholder="请选择阶段">
                <el-option
                  :value="+key"
                  :label="value"
                  v-for="(value, key, index) in stepObj"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="enterprise" label="企业">
              <el-select v-model="form.enterprise" placeholder="请选择企业">
                <el-option
                  :value="item.id"
                  :label="item.short_name"
                  v-for="(item, index) in companyList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="type" label="题型">
              <el-select v-model="form.type" placeholder="请选择题型">
                <el-option
                  :value="+key"
                  :label="value"
                  v-for="(value, key, index) in typeObj"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item prop="difficulty" label="难度">
              <el-select v-model="form.difficulty" placeholder="请选择难度">
                <el-option
                  :value="+key"
                  :label="value"
                  v-for="(value, key, index) in diffObj"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="username" label="作者">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="status" label="状态">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option
                  :value="+key"
                  :label="value"
                  v-for="(value, key, index) in statusObj"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="create_date" label="日期">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item prop="title" label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="15px">
              <el-button @click="search" type="primary">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button @click="add" type="primary">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="list" border>
        <el-table-column label="序号" width="100px">
          <template v-slot="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="题目">
          <template v-slot="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科--阶段">
          <template v-slot="scope">
            {{ scope.row.subject_name }}--{{
            stepObj[scope.row.step]
            }}
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template v-slot="scope">{{ typeObj[scope.row.type] }}</template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-link @click="edit(scope.row)" class="btn" type="primary">编辑</el-link>
            <el-link @click="status(scope.row.id)" class="btn" type="primary">
              {{
              scope.row.status == 1 ? '禁用' : '启用'
              }}
            </el-link>
            <el-link @click="remove(scope.row.id)" class="btn" type="primary">删除</el-link>
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
      ></el-pagination>
    </el-card>
    <questionAdd
      ref="queAdd"
      :subjectList="subjectList"
      :stepObj="stepObj"
      :companyList="companyList"
      :typeObj="typeObj"
      :diffObj="diffObj"
      @search="search"
      @getData="getData"
    ></questionAdd>
  </div>
</template>

<script>
import questionAdd from "./questionAdd";
import { getSubjectList } from "@/api/subject";
import { getCompanyList } from "@/api/company";
import { getQusetionList, setStatus, removeQuestion } from "@/api/question";
export default {
  components: {
    questionAdd
  },
  data() {
    return {
      form: {
        subject: "", // int	学科id
        step: "", // string	题目阶段:1(初级),2(中级),3(高级)
        enterprise: "", // int	企业id
        type: "", // int	题目类型:1(单选),2(多选),3(简答)
        difficulty: "", // int	题目难度: 1(简单),2(一般),3(困难)
        username: "", // string	作者
        status: "", // int	状态:0(禁用),1(启用)
        create_date: "", // string	创建日期
        title: "" // string	标题名称
      },
      pagination: {
        page: 1,
        pageSize: 3,
        total: 5
      },
      subjectList: [], // 学科列表
      companyList: [], // 企业列表
      list: [], // 题目列表
      stepObj: {
        1: "初级",
        2: "中级",
        3: "高级"
      },
      typeObj: {
        1: "单选",
        2: "多选",
        3: "简答"
      },
      diffObj: {
        1: "简单",
        2: "一般",
        3: "困难"
      },
      statusObj: {
        0: "启用",
        1: "禁用"
      }
    };
  },
  created() {
    getSubjectList({ limit: 100 }).then(res => {
      this.subjectList = res.data.items;
    });
    getCompanyList({ limit: 100 }).then(res => {
      this.companyList = res.data.items;
    });
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      let _params = {
        ...this.form,
        page: this.pagination.page,
        limit: this.pagination.pageSize
      };
      getQusetionList(_params).then(res => {
        res.data.items.forEach(item => {
          item.city = item.city.split(",");
          item.multiple_select_answer = item.multiple_select_answer.split(",");
        });
        this.list = res.data.items;
        this.pagination.total = res.data.pagination.total;
        window.console.log(this.list);
      });
    },
    // 页尺寸切换
    sizeChange(size) {
      this.pagination.pageSize = size;
      this.search();
    },
    // 页码切换
    currentChange(page) {
      this.pagination.page = page;
      this.getData();
    },
    // 搜索
    search() {
      this.pagination.page = 1;
      this.getData();
    },
    // 清除
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 修改状态
    status(id) {
      setStatus({ id }).then(() => {
        this.$message.success("修改状态成功");
        this.getData();
      });
    },
    // 新增
    add() {
      this.$refs.queAdd.isShow = true;
      this.$refs.queAdd.meta = "add";
    },
    // 编辑
    edit(row) {
      this.$refs.queAdd.isShow = true;
      this.$refs.queAdd.meta = "edit_" + Date.now();
      this.$refs.queAdd.form = JSON.parse(JSON.stringify(row));
    },
    // 删除
    remove(id) {
      removeQuestion({ id }).then(() => {
        this.$message.success("删除成功");
        this.search();
      });
    }
  }
};
</script>

<style lang="less">
.question {
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

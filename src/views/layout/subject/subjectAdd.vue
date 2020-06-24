<template>
  <el-dialog title="收货地址" :visible.sync="isShow" width="600px" class="subjectAdd">
    <div slot="title" class="dialog-title">{{mode=='add'?'新增':'编辑'}}学科</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="85px">
      <el-form-item prop="rid" label="学科编号">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prpo="short_name" label="学科简称">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item prpo="intro" label="学科简介">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item prpo="remark" label="学科备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubject, editSubject } from "@/api/subject";
export default {
  data() {
    return {
      form: {
        rid: "", // 学科编号
        name: "", // 学科名称
        short_name: "", // 学科简称
        intro: "", // 学科简介
        remark: "" // 备注
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      },
      isShow: false, // 新增学科框
      mode: "add" // 判断添加还是编辑
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(result => {
        if (!result) {
          this.$message.warning("请填写正确信息");
        } else {
          if (this.mode == "add") {
            addSubject(this.form).then(() => {
              this.$parent.search();
              this.isShow = false;
              this.$message.success("添加成功");
            });
          } else if (this.mode == "edit") {
            editSubject(this.form).then(() => {
              this.$parent.getData();
              this.isShow = false;
              this.$message.success("编辑成功");
            });
          }
        }
      });
    }
  },
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
        this.form = {
          rid: "", // 学科编号
          name: "", // 学科名称
          short_name: "", // 学科简称
          intro: "", // 学科简介
          remark: "" // 备注
        };
      }
    }
  }
};
</script>

<style lang="less">
.subjectAdd {
  .el-dialog__header {
    padding: 0;
  }
  .dialog-title {
    height: 53px;
    line-height: 53px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    background: linear-gradient(to right, #01c5fa, #1395fa);
  }
  .dialog-footer {
    text-align: center;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>
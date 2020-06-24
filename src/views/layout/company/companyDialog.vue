<template>
  <el-dialog :visible.sync="isShow" class="companyDialog" width="600px">
    <div slot="title" class="dialog-title">{{meta=='add'?'新增':'编辑'}}企业</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item prop="eid" label="企业编号">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="企业名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="企业简称">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="企业简介">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="企业备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow=false">取消</el-button>
      <el-button @click="submit" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { companyAdd, companyEdit } from "@/api/company";
export default {
  props: ["meta", "formData"],
  data() {
    return {
      isShow: false,
      form: {
        eid: "", // 企业编号
        name: "", // 企业名称
        short_name: "", // 简称
        intro: "", // 企业简介
        remark: "" // 备注
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "change" }],
        name: [
          { required: true, message: "请输入企业名称", trigger: "change" }
        ],
        short_name: [
          { required: true, message: "请输入简称", trigger: "change" }
        ],
        intro: [
          { required: true, message: "请输入企业简介", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(result => {
        if (!result) {
          this.$message.warning("请输入内容");
        } else {
          if (this.meta == "add") {
            companyAdd(this.form).then(() => {
              // window.console.log(res);
              this.$message.success("新增企业成功");
              this.isShow = false;
              this.$emit("search");
            });
          } else if (this.meta == "edit") {
            companyEdit(this.form).then(() => {
              this.$message.success("编辑企业成功");
              this.isShow = false;
              this.$emit("search");
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
          eid: "", // 企业编号
          name: "", // 企业名称
          short_name: "", // 简称
          intro: "", // 企业简介
          remark: "" // 备注
        };
      }
    },
    meta(newVal) {
      if (newVal == "edit") {
        this.form = JSON.parse(JSON.stringify(this.formData));
      }
    }
  }
};
</script>

<style lang="less">
.companyDialog {
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
<template>
  <el-dialog :visible.sync="isShow" class="userDialog" width="477px">
    <div slot="title" class="dialog-title">
      {{ meta == 'add' ? '新增' : '编辑' }}用户
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item prop="role_id" label="角色">
        <el-select v-model="form.role_id" placeholder="请选择角色">
          <el-option value="2">管理员</el-option>
          <el-option value="3">老师</el-option>
          <el-option value="4">学生</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option value="0">禁用</el-option>
          <el-option value="1">启用</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="remark" label="用户备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button @click="submit" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUser, editUser } from '@/api/userList';
export default {
  props: ['meta', 'formData'],
  data() {
    return {
      isShow: false,
      form: {
        username: '', // 用户名
        email: '', // 邮箱
        phone: '', // 手机号
        role_id: '', // 角色 、2 管理员、3 老师、4 学生
        status: '', // 1(启用)0(禁用)
        remark: '', // 备注
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          {
            validator: (rule, val, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(val)) {
                callback();
              } else {
                callback('请输入正确的邮箱');
              }
            },
          },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          {
            validator: (rule, val, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(val)) {
                callback();
              } else {
                callback('请输入正确的手机号');
              }
            },
          },
        ],
        role_id: [{ required: true, message: '请选择角色', trigger: 'change' }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((result) => {
        if (!result) {
          this.$message.warning('请输入内容');
        } else {
          if (this.meta == 'add') {
            addUser(this.form).then(() => {
              this.$message.success('新增用户成功');
              this.$emit('search');
              this.isShow = false;
            });
          } else if (this.meta == 'edit') {
            editUser(this.form).then(() => {
              this.$message.success('编辑用户成功');
              this.$emit('getData');
              this.isShow = false;
            });
          }
        }
      });
    },
  },
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
        this.form = {
          username: '', // 用户名
          email: '', // 邮箱
          phone: '', // 手机号
          role_id: '', // 角色 、2 管理员、3 老师、4 学生
          status: '', // 1(启用)0(禁用)
          remark: '', // 备注
        };
      }
    },
    meta(newVal) {
      if (newVal == 'edit') {
        this.form = JSON.parse(JSON.stringify(this.formData));
      }
    },
  },
};
</script>

<style lang="less">
.userDialog {
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

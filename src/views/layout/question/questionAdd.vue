<template>
  <el-dialog :visible.sync="isShow" :fullscreen="true" class="questionDialog">
    <div slot="title" class="dialog-title">新增题库测试</div>
    <div class="add_mian">
      <el-form :model="form">
        <!-- 学科 -->
        <el-form-item prop="subject" label="学科">
          <el-select v-model="form.subject">
            <el-option
              :value="item.id"
              :label="item.short_name"
              v-for="(item, index) in subjectList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 阶段 -->
        <el-form-item prop="step" label="阶段">
          <el-select v-model="form.step">
            <el-option
              :value="+key"
              :label="value"
              v-for="(value, key, index) in stepObj"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 企业 -->
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
        <!-- 城市选择 -->
        <el-form-item prop="city" label="城市">
          <el-cascader
            v-model="value"
            :options="regionData"
            :props="{ value: 'label' }"
          ></el-cascader>
        </el-form-item>
        <!-- 题型 -->
        <el-form-item label="题型">
          <el-radio
            v-model="form.type"
            :label="+key"
            v-for="(value, key, index) in typeObj"
            :key="index"
            >{{ value }}</el-radio
          >
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度">
          <el-radio
            v-model="form.difficulty"
            :label="+key"
            v-for="(value, key, index) in diffObj"
            :key="index"
            >{{ value }}</el-radio
          >
        </el-form-item>
        <hr class="hr" />
        <el-form-item label="试题标题" class="add_title">
          <quillEditor
            v-model="form.title"
            :options="{ placeholder: '请在这里输入...' }"
          ></quillEditor>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionData } from 'element-china-area-data';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  props: ['subjectList', 'stepObj', 'companyList', 'typeObj', 'diffObj'],
  components: {
    quillEditor,
  },
  data() {
    return {
      regionData: regionData,
      isShow: true,
      form: {
        subject: '', // int	学科id标识
        step: '', // int	阶段1、初级 2、中级 3、高级
        enterprise: '', // int	企业id标识
        city: '', // array	[省、市、区县]
        type: '', // string	题型 1单选 、2多选 、3简答
        difficulty: '', // int	题目难度 1简单 、2一般 、3困难
        title: '', // string    标题
        single_select_answer: '', // string	单选题答案
        video: '', // tring	解析视频地址
        answer_analyze: '', // string	答案解析
        remark: '', // string	答案备注
        multiple_select_answer: '', // array	多选题答案
        short_answer: '', // string	简答题答案
        select_options: '', // array	选项，介绍，图片介绍
      },
    };
  },
};
</script>

<style lang="less">
.questionDialog {
  .add_mian {
    width: 832px;
    margin: 0 auto;
  }
  .el-dialog__header {
    padding: 0;
  }
  .dialog-title {
    height: 53px;
    line-height: 53px;
    font-size: 18px;
    color: #fff;
    padding-left: 20px;
    background: linear-gradient(to right, #02c5fa, #1394fa);
  }
  .dialog-footer {
    text-align: center;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .add_title {
    .el-form-item__content {
      margin-top: 50px;
    }
  }
  .hr {
    margin: 40px 0;
  }
}
</style>

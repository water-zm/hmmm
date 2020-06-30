<template>
  <el-dialog :visible.sync="isShow" :fullscreen="true" class="questionDialog">
    <div slot="title" class="dialog-title">新增题库测试</div>
    <div class="add_mian">
      <el-form :model="form" :rules="rules" ref="form">
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
            v-model="form.city"
            :options="regionData"
            :props="{ value: 'label' }"
          ></el-cascader>
        </el-form-item>
        <!-- 题型 -->
        <el-form-item prop="type" label="题型">
          <el-radio
            v-model="form.type"
            :label="+key"
            v-for="(value, key, index) in typeObj"
            :key="index"
            >{{ value }}</el-radio
          >
        </el-form-item>
        <!-- 难度 -->
        <el-form-item prop="difficulty" label="难度">
          <el-radio
            v-model="form.difficulty"
            :label="+key"
            v-for="(value, key, index) in diffObj"
            :key="index"
            >{{ value }}</el-radio
          >
        </el-form-item>
        <hr class="hr" />
        <!-- 试题标题 -->
        <el-form-item prop="title" label="试题标题" class="add_title">
          <quillEditor
            @change="validateItem('title')"
            v-model="form.title"
            :options="{ placeholder: '请在这里输入...' }"
          ></quillEditor>
        </el-form-item>
        <!-- 单选多选简答 -->
        <!-- 对象.变量命名，不能是数字中文，如果不是变量命名的规范要用中括号，对象[] -->
        <el-form-item
          :label="typeObj[form.type]"
          :prop="typeAns[form.type]"
          label-width="60px"
        >
          <!-- 把单选多选简答抽离出来 -->
          <selectItem :form="form" @validateItem="validateItem"></selectItem>
        </el-form-item>
        <hr class="hr" />
        <el-form-item prop="video" label="解析视频">
          <upload v-model="form.video" type="video" class="video"></upload>
        </el-form-item>
        <hr class="hr" />
        <el-form-item prop="answer_analyze" label="答案解析">
          <quillEditor
            @change="validateItem('answer_analyze')"
            v-model="form.answer_analyze"
            :options="{ placeholder: '请在这里输入...' }"
          ></quillEditor>
        </el-form-item>
        <el-form-item prop="remark" label="试题备注">
          <el-input v-model="form.remark" type="textarea" rows="5"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button @click="submit" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addQuestion, editQuestion } from '@/api/question';
import upload from '@/components/upload';
import { regionData } from 'element-china-area-data';
import { quillEditor } from 'vue-quill-editor';
import selectItem from './selectItem';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
  props: ['subjectList', 'stepObj', 'companyList', 'typeObj', 'diffObj'],
  components: {
    quillEditor, // 导入的富文本
    selectItem,
    upload,
  },
  data() {
    return {
      initForm: '',
      meta: 'add',
      typeAns: {
        1: 'single_select_answer',
        2: 'multiple_select_answer',
        3: 'short_answer',
      },
      regionData: regionData, // 导入的省市区，导入的数据不能直接在html里使用
      isShow: false,
      form: {
        subject: '', // int	学科id标识
        step: '', // int	阶段1、初级 2、中级 3、高级
        enterprise: '', // int	企业id标识
        city: [], // array	[省、市、区县]
        type: 1, // int	题型 1单选 、2多选 、3简答
        difficulty: 1, // int	题目难度 1简单 、2一般 、3困难
        title: '', // string    标题
        single_select_answer: '', // string	单选题答案
        multiple_select_answer: [], // array	多选题答案
        short_answer: '', // string	简答题答案
        video: '', // tring	解析视频地址
        answer_analyze: '', // string	答案解析
        remark: '', // string	答案备注
        select_options: [
          {
            label: 'A',
            text: '',
            image: '',
          },
          {
            label: 'B',
            text: '',
            image: '',
          },
          {
            label: 'C',
            text: '',
            image: '',
          },
          {
            label: 'D',
            text: '',
            image: '',
          },
        ], // array	选项，介绍，图片介绍
      },
      rules: {
        subject: [{ required: true, message: '必填', trigger: 'change' }],
        step: [{ required: true, message: '必填', trigger: 'change' }],
        enterprise: [{ required: true, message: '必填', trigger: 'change' }],
        city: [{ required: true, message: '必填', trigger: 'change' }],
        type: [{ required: true, message: '必填', trigger: 'change' }],
        difficulty: [{ required: true, message: '必填', trigger: 'change' }],
        title: [{ required: true, message: '必填', trigger: 'change' }],
        single_select_answer: [
          { required: true, message: '必填', trigger: 'change' },
        ],
        multiple_select_answer: [
          { required: true, message: '必填', trigger: 'change' },
        ],
        short_answer: [{ required: true, message: '必填', trigger: 'change' }],
        video: [{ required: true, message: '必填', trigger: 'change' }],
        answer_analyze: [
          { required: true, message: '必填', trigger: 'change' },
        ],
        remark: [{ required: true, message: '必填', trigger: 'change' }],
      },
    };
  },
  created() {
    this.initForm = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    submit() {
      this.$refs.form.validate((result) => {
        if (!result) {
          this.$message.warning('请填写相关内容');
        } else {
          if (this.meta == 'add') {
            addQuestion(this.form).then(() => {
              this.$message.success('发布题目成功');
              this.isShow = false;
              this.$emit('search');
            });
          } else {
            editQuestion(this.form).then(() => {
              this.$message.success('编辑题目成功');
              this.isShow = false;
              this.$emit('getData');
            });
          }
        }
      });
    },
    validateItem(str) {
      this.$refs.form.validateField(str);
    },
  },
  watch: {
    isShow(newVal) {
      if (!newVal) {
        this.form = JSON.parse(JSON.stringify(this.initForm));

        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    },
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
  .video .avatar {
    width: 500px;
    height: 200px;
  }
}
</style>

<template>
  <div class="selectItem">
    <div v-if="form.type==1">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <el-radio
          @change="changeEvent('single_select_answer')"
          :label="item.label"
          v-model="form.single_select_answer"
        >{{item.label}}</el-radio>
        <el-input v-model="item.text"></el-input>
        <upload v-model="item.image" class="img"></upload>
      </div>
    </div>
    <div v-if="form.type==2">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <el-checkbox
          @change="changeEvent('multiple_select_answer')"
          :label="item.label"
          v-model="form.multiple_select_answer"
        >{{item.label}}</el-checkbox>
        <el-input v-model="item.text" class="inp"></el-input>
        <upload v-model="item.image" class="img"></upload>
      </div>
    </div>
    <div v-if="form.type==3">
      <el-input
        @change="changeEvent('short_answer')"
        v-model="form.short_answer"
        type="textarea"
        rows="5"
      ></el-input>
    </div>
  </div>
</template>

<script>
import upload from "@/components/upload";
export default {
  props: ["form"],
  components: {
    upload
  },
  data() {
    return {};
  },
  methods: {
    changeEvent(str) {
      this.$emit("validateItem", str);
    }
  }
};
</script>

<style lang="less">
.selectItem {
  .item {
    display: flex;
    align-items: center;
  }
  .img {
    margin: 20px 0 20px 20px;
  }
  .inp {
    margin-left: 20px;
  }
}
</style>
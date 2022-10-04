<template>
  <div>
    <el-form ref="form" :model="form" :inline="inline">
      <el-form-item v-for="item in formLabel" 
      :label="item.label" 
      :label-width="formLabelWidth"
      :key="item.label">
        <el-input v-if="item.type === 'input'" v-model="formData[item.model]"></el-input>
        <el-switch v-if="item.type === 'switch'" v-model="formData[item.model]"></el-switch>
        <el-date-picker v-if="item.type === 'date'"
         type="date"
         placeholder="选择日期"
         v-model="formData[item.model]">
        </el-date-picker>
        <el-select v-if="item.type === 'select'"
         placeholder="请选择"
         v-model="formData[item.model]">
          <el-option
            v-for="item in item.opts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CommonForm",
  props: {
    formLabel: Array,
    form: Object,
  },
  data() {
    return {
      formLabelWidth: '120px',
      inline:true,
    }
  },
  computed: {
    formData() {
      return this.form
    }
  }
};
</script>

<style scoped>
</style>


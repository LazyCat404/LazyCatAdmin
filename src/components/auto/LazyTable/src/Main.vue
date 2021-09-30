<template>
  <el-table :data="tableData" :border="state.config.border">
    <!-- 空数据提示 -->
    <template #empty> 暂无数据 </template>
    <!-- 复选列表 -->
    <el-table-column type="selection" width="55" v-if="state.config.select"></el-table-column>
    <!-- 表格列表 -->
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
const props = defineProps({
  tableData: Array,
  tableConfig: Object
});
const state = reactive({
  // 表格默认配置
  config: {
    // 复选框（默认开启）
    select: props.tableConfig && props.tableConfig.select !== undefined ? props.tableConfig.select : true,
    // 框线
    border: props.tableConfig && props.tableConfig.border !== undefined ? props.tableConfig.border : false,
    maxHeight: props.tableConfig && props.tableConfig.maxHeight !== undefined ? props.tableConfig.maxHeight : null
  }
});

// 初始化
function init() {
  // tableInit();
}
init();
</script>

<style lang="scss" scoped>
.el-table {
  margin: 0 20px;
  max-height: 100%;
  width: auto;
}
</style>

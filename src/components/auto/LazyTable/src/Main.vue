<template>
  <el-table :data="tableData" :border="state.config.border">
    <!-- 空数据提示 -->
    <template #empty> 暂无数据 </template>
    <!-- 复选列表 -->
    <el-table-column type="selection" width="40" v-if="state.config.select"></el-table-column>
    <!-- 表格列表 -->
    <el-table-column
      v-for="(item, i) in tableOptions"
      :key="i"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :show-overflow-tooltip="item.tip === undefined ? true : item.tip"
    >
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
const props = defineProps({
  tableData: Array,
  tableOptions: <any>Array,
  tableConfig: Object
});
const state = reactive({
  // 表格默认配置
  config: {
    // 复选框（默认开启）
    select: props.tableConfig && props.tableConfig.select !== undefined ? props.tableConfig.select : true,
    // 框线
    border: props.tableConfig && props.tableConfig.border !== undefined ? props.tableConfig.border : false
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
::v-deep .el-table-column--selection .cell {
  text-overflow: unset;
  padding: 0 !important;
  text-align: center;
}
</style>

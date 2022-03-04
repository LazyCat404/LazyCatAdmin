<template>
  <el-button type="primary">Primary</el-button>
  <el-button @click="btnClick">按钮</el-button>
</template>
<script setup lang="ts">
import tool from '@/utils/tool';
import api from '@api';

function btnClick() {
  console.log(api)
  tool.blobDownload('/api/v1/system/userExcel/template', {}, `用户信息导入模板.xlsx`, 'get');
}
</script>
<style lang="scss" scoped>
button {
  margin-top: 120px;
  margin-left: 120px;
  // width: 100px;
}
</style>

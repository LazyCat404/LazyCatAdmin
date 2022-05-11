<template>
  <el-button type="primary">Primary</el-button>
  <el-button @click="btnClick">按钮</el-button>
</template>
<script setup lang="ts">
function btnClick() {
  console.log('您点击了按钮');
}
</script>
<style lang="scss" scoped>
button {
  margin-top: 120px;
  margin-left: 120px;
  // width: 100px;
}
</style>

<template>
  <div class="system-role-list-wrapper">
    <el-scrollbar height="100%">
      <div>列表</div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
// 获取列表
function getPower() {
  //
}

function init() {
  getPower();
}
init();
</script>
<style lang="scss" scoped>
.system-role-list-wrapper {
  float: left;
  width: 150px;
  height: 100%;
}
</style>

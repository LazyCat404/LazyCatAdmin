<template>
  <div class="system-role-power-wrapper" v-loading="state.loading">
    <el-scrollbar height="100%">
      <div>权限</div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({
  loading: false
});
// 获取权限列表
function getPower() {
  //
}

function init() {
  getPower();
}
init();
</script>
<style lang="scss" scoped>
.system-role-power-wrapper {
  float: left;
  width: calc(100% - 150px);
  height: 100%;
}
</style>

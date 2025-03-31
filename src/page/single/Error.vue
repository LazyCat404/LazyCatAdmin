<template>
  <div class="error-wrapper">
    <el-button type="primary" plain @click="goPage">返回首页</el-button>
  </div>
</template>
<script lang="ts" setup>
// 全局属性
const router = useRouter();
function goPage() {
  router.push({ path: '/' });
}
</script>
<style lang="scss" scoped>
.error-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

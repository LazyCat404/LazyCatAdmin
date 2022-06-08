<template>
  <div>xx</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
// 显示
function show(el: any) {
  console.log(el);
}
onMounted(() => {
  //
});
// 导出实列，供给父组件调用
defineExpose({
  show
});
</script>

<style></style>

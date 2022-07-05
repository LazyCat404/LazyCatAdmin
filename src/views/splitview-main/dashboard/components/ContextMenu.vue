<template>
  <div @click="show">没错是我</div>
</template>

<script lang="ts" setup>
// 显示
function show(el: any) {
  console.log(el);
}
</script>

<style lang="scss" scoped>
div {
  background-color: red;
}
</style>

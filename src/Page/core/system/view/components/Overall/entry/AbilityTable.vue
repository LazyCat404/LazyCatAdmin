<template>
  <div>{{ state.currentMenu.name }}</div>
</template>

<script lang="ts" setup>
import { defineExpose, reactive } from 'vue';
const state = reactive<any>({
  currentMenu: {}
});
function cutMenu(item: unknown) {
  state.currentMenu = item;
}
// 供父元素调用
defineExpose({
  cutMenu
});
</script>

<style></style>

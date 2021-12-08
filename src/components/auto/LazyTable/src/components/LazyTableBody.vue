<template>
  <div>{{ props.rowData[props.bodyItem.prop] }}</div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
console.log(props.rowData);
</script>
<style lang="scss" scoped></style>

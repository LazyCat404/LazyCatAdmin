<template>
  <span :style="[{ color: props.bodyItem.color }]">
    {{
      props.rowData[props.bodyItem.prop] === undefined ||
      props.rowData[props.bodyItem.prop] === '' ||
      props.rowData[props.bodyItem.prop] === null
        ? '-'
        : props.rowData[props.bodyItem.prop]
    }}
  </span>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
</script>
<style lang="scss" scoped></style>

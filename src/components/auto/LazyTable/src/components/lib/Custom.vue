<template>
  <CustomParts :scope="props.rowData"></CustomParts>
</template>
<script lang="ts" setup>
import { createApp, defineProps } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const CustomParts = {
  props: ['scope'],
  template: props.bodyItem.template
};
createApp({
  components: {
    CustomParts: CustomParts
  }
});
</script>
<style lang="scss" scoped></style>

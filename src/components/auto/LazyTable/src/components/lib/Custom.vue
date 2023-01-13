<template>
  <CustomTableComponent :scope="props.rowData"></CustomTableComponent>
</template>
<script lang="ts" setup>
import { Component, ComputedOptions, createApp, defineProps, MethodOptions } from 'vue';

const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();

let CustomTableComponent: Component<any, any, any, ComputedOptions, MethodOptions> = {
  props: ['scope'],
  template: props.bodyItem.template,
  methods: props.bodyItem.methods
};
function init() {
  // 单文件组件（回调、自定义参数）
  if (Object.prototype.toString.call(props.bodyItem.template) === '[object Object]') {
    CustomTableComponent = props.bodyItem.template;
  }
  createApp({
    components: {
      CustomTableComponent
    }
  });
}
init();
</script>
<style lang="scss" scoped></style>

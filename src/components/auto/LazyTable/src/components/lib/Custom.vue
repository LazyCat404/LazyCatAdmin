<template>
  <CustomTableComponent :scope="props.rowData"></CustomTableComponent>
</template>
<script lang="ts" setup>
import { createApp, defineProps } from 'vue';

const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});

let CustomTableComponent = {
  props: ['scope'],
  template: props.bodyItem.template,
  methods: props.bodyItem.methods
};
function init() {
  // 单文件组件
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

<template>
  <AsyncComponent :scope="props.rowData"></AsyncComponent>
</template>
<script lang="ts" setup>
import { createApp, defineAsyncComponent, defineProps } from 'vue';

const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
let AsyncComponent = {
  props: ['scope'],
  template: props.bodyItem.template,
  methods: props.bodyItem.methods
};
function init() {
  if (Object.prototype.toString.call(props.bodyItem.template) === '[object Object]') {
    // 动态组件地址
    let dynamicPath = props.bodyItem.template.__file.match(/src(\S*)/)[1];
    AsyncComponent = defineAsyncComponent(() => import(`/src${dynamicPath}`));
  } else if (typeof props.bodyItem.template === 'string') {
    createApp({
      components: {
        AsyncComponent: AsyncComponent
      }
    });
  }
}
init();
</script>
<style lang="scss" scoped></style>

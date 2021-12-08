<template>
  <div
    class="lazy-table-list-col-box"
    :tip="props.bodyItem.tip === undefined ? (config.tip ? 'show' : 'hide') : props.bodyItem.tip ? 'show' : 'hide'"
  >
    {{ props.rowData[props.bodyItem.prop] }}
  </div>
</template>
<script lang="ts" setup>
import { config } from '../config';
import { defineProps } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
console.log(props.bodyItem.tip);
</script>
<style lang="scss" scoped>
.lazy-table-list-col-box[tip='show'] {
  overflow: hidden;
  white-space: nowrap; /*设置内容不换行*/
  text-overflow: ellipsis;
}
</style>

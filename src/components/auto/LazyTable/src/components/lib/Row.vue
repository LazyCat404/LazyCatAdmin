<template>
  <div
    class="lazy-table-list-row-box"
    :tip="props.bodyItem.tip === undefined ? (config.tip ? 'show' : 'hide') : props.bodyItem.tip ? 'show' : 'hide'"
  >
    <!-- 状态 -->
    <State
      v-if="props.bodyItem.state !== undefined || props.bodyItem.ico !== undefined ? true : false"
      :bodyItem="props.bodyItem"
    ></State>
    <!-- 行显示 -->
    <span>
      {{ props.rowData[props.bodyItem.prop] === undefined ? '-' : props.rowData[props.bodyItem.prop] }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { config } from '../../config';
import State from './components/State.vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
</script>
<style lang="scss" scoped>
.lazy-table-list-row-box[tip='show'] {
  overflow: hidden;
  white-space: nowrap; /*设置内容不换行*/
  text-overflow: ellipsis;
}
</style>

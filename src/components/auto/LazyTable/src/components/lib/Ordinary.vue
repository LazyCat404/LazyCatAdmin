<template>
  <div
    class="lazy-table-list-row-box"
    :style="[{ width: props.bodyItem.copy ? 'calc(100% - 14px)' : '' }]"
    :tip="props.bodyItem.tip === undefined ? (config.tip ? 'show' : 'hide') : props.bodyItem.tip ? 'show' : 'hide'"
  >
    <!-- 状态 -->
    <StatusIco
      v-if="props.bodyItem.status !== undefined || props.bodyItem.ico !== undefined ? true : false"
      :bodyItem="props.bodyItem"
      :rowData="rowData"
    >
    </StatusIco>
    <!-- 行显示 -->
    <Row :bodyItem="props.bodyItem" :rowData="props.rowData"></Row>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { config } from '../../config';
import StatusIco from './components/StatusIco.vue';
import Row from './components/Row.vue';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();
</script>
<style lang="scss" scoped>
.lazy-table-list-row-box[tip='show'] {
  overflow: hidden;
  white-space: nowrap; /*设置内容不换行*/
  text-overflow: ellipsis;
}
</style>

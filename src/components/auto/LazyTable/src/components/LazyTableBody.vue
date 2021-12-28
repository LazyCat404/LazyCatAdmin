<template>
  <!-- 开关行 -->
  <Switch
    v-if="props.bodyItem.switch !== undefined && props.bodyItem.switch"
    :bodyItem="props.bodyItem"
    :rowData="rowData"
    @switch-change="switchChange"
  >
  </Switch>
  <!-- 可编辑行 -->
  <Edit v-else-if="props.bodyItem.edit" :bodyItem="props.bodyItem" :rowData="rowData" @row-confirm="rowConfirm"></Edit>
  <!-- 普通行 -->
  <Row v-else :bodyItem="props.bodyItem" :rowData="rowData"></Row>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import Switch from './lib/Switch.vue';
import Edit from './lib/Edit.vue';
import Row from './lib/Row.vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const $emits = defineEmits(['row-confirm', 'switch-change']);
// switch 值改变
function switchChange(parame: unknown) {
  $emits('switch-change', parame);
}
// 行编辑确认
function rowConfirm(parame: unknown) {
  $emits('row-confirm', parame);
}
</script>
<style lang="scss" scoped></style>

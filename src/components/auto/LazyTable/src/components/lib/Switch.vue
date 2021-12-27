<template>
  <el-tooltip
    :content="`${props.bodyItem.switch.tip}：${state.switchValue}`"
    placement="top"
    :disabled="!props.bodyItem.switch.tip"
  >
    <el-switch
      v-model="state.switchValue"
      :disabled="props.bodyItem.switch.disabled === undefined ? true : props.bodyItem.switch.disabled"
      :active-color="props.bodyItem.switch.activeColor ? props.bodyItem.switch.activeColor : ''"
      :inactive-color="props.bodyItem.switch.inactiveColor ? props.bodyItem.switch.inactiveColor : ''"
      :active-value="1"
      inactive-value="0"
      @change="switchChange"
    />
  </el-tooltip>
</template>
<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const state = reactive<any>({
  switchValue: props.rowData[props.bodyItem.prop]
});
function switchChange() {
  console.log('值改变');
}
</script>
<style lang="sass"></style>

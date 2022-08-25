<template>
  <el-tooltip
    :content="`${props.bodyItem.switch.tip === undefined ? '' : props.bodyItem.switch.tip}${
      state.switchValue === state.activeValue
        ? props.bodyItem.switch.tipActive === undefined
          ? state.switchValue
          : props.bodyItem.switch.tipActive
        : props.bodyItem.switch.tipInactive === undefined
        ? state.switchValue
        : props.bodyItem.switch.tipInactive
    }`"
    placement="top"
    :disabled="
      props.bodyItem.switch.tip === undefined &&
      props.bodyItem.switch.tipInactive === undefined &&
      props.bodyItem.switch.tipActive === undefined
    "
  >
    <el-switch
      v-model="state.switchValue"
      :disabled="props.bodyItem.switch.disabled === undefined ? true : props.bodyItem.switch.disabled"
      :active-color="props.bodyItem.switch.activeColor ? props.bodyItem.switch.activeColor : ''"
      :inactive-color="props.bodyItem.switch.inactiveColor ? props.bodyItem.switch.inactiveColor : ''"
      :active-value="state.activeValue"
      :inactive-value="state.inactiveValue"
      @click="switchClick"
    />
  </el-tooltip>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps, reactive } from 'vue';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();
const $emits = defineEmits(['switch-change']);
const state = reactive<any>({
  switchValue: props.rowData[props.bodyItem.prop],
  activeValue: props.bodyItem.switch.activeValue,
  inactiveValue: props.bodyItem.switch.inactiveValue
});
// 用click 代替change 避免初始化就调用
function switchClick() {
  $emits('switch-change', state.switchValue);
}
function init() {
  if (typeof props.bodyItem.switch !== 'object') {
    state.activeValue = typeof props.bodyItem.switch === 'boolean' ? true : props.bodyItem.switch;
    state.inactiveValue =
      typeof props.bodyItem.switch === 'boolean' ? false : typeof props.bodyItem.switch === 'number' ? 0 : '';
  } else {
    if (Object.prototype.toString.call(props.bodyItem.switch) === '[object Object]') {
      if (props.bodyItem.switch.activeValue === undefined) {
        state.activeValue = true;
        state.inactiveValue = false;
        if (typeof props.rowData[props.bodyItem.prop] !== 'boolean') {
          console.warn('未设置 switch 的 activeValue 属性');
        }
      }
    } else {
      state.activeValue = true;
      state.inactiveValue = false;
      console.warn('请检查switch类型，仅支持：Object、String、number、boolean');
    }
  }
}
init();
</script>

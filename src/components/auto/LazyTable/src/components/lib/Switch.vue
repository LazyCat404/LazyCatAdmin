<template>
  <el-tooltip
    :content="`${props.bodyItem.switch.tip === undefined ? '' : props.bodyItem.switch.tip}${
      obj.switchValue === obj.activeValue
        ? props.bodyItem.switch.tipActive === undefined
          ? obj.switchValue
          : props.bodyItem.switch.tipActive
        : props.bodyItem.switch.tipInactive === undefined
        ? obj.switchValue
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
      v-model="obj.switchValue"
      :disabled="props.bodyItem.switch.disabled === undefined ? true : props.bodyItem.switch.disabled"
      :active-color="props.bodyItem.switch.activeColor ? props.bodyItem.switch.activeColor : ''"
      :inactive-color="props.bodyItem.switch.inactiveColor ? props.bodyItem.switch.inactiveColor : ''"
      :active-value="obj.activeValue"
      :inactive-value="obj.inactiveValue"
      :before-change="beforeChange"
    />
  </el-tooltip>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();
const $emits = defineEmits(['switch-change']);
const obj = reactive<any>({
  switchValue: '绝对不可能的值',
  activeValue: props.bodyItem.switch.activeValue,
  inactiveValue: props.bodyItem.switch.inactiveValue,
  value2: false
});
watch(
  () => obj.switchValue,
  (newVal, oldVal) => {
    if (oldVal !== '绝对不可能的值') switchChange();
  }
);
// change写在监听里，避免初始化就调用
function switchChange() {
  $emits('switch-change', { key: props.bodyItem.prop, value: obj.switchValue });
}
// switch 状态改变前的钩子
function beforeChange() {
  if (props.bodyItem.switch.beforeChange && typeof props.bodyItem.switch.beforeChange == 'function') {
    return props.bodyItem.switch.beforeChange({ bodyItem: props.bodyItem, rowData: props.rowData });
  } else {
    return true;
  }
}
(function init() {
  obj.switchValue = JSON.parse(JSON.stringify(props.rowData[props.bodyItem.prop]));
  if (typeof props.bodyItem.switch !== 'object') {
    obj.activeValue = typeof props.bodyItem.switch === 'boolean' ? true : props.bodyItem.switch;
    obj.inactiveValue =
      typeof props.bodyItem.switch === 'boolean' ? false : typeof props.bodyItem.switch === 'number' ? 0 : '';
  } else {
    if (Object.prototype.toString.call(props.bodyItem.switch) === '[object Object]') {
      if (props.bodyItem.switch.activeValue === undefined) {
        obj.activeValue = true;
        obj.inactiveValue = false;
      }
    } else {
      obj.activeValue = true;
      obj.inactiveValue = false;
      console.warn('请检查switch类型，仅支持：Object、String、number、boolean');
    }
  }
})();
</script>

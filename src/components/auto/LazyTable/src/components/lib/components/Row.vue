<template>
  <span
    :style="[{ color: props.bodyItem.color, cursor: props.bodyItem.edit || props.bodyItem.click ? 'pointer' : '' }]"
    @click="rowClick"
  >
    <template v-if="Object.prototype.toString.call(props.rowData[props.bodyItem.prop]) === '[object Array]'">
      <template v-for="(item, i) in props.rowData[props.bodyItem.prop]" :key="i">
        {{ i === 0 ? '' : props.bodyItem.mark === undefined ? ',' : props.bodyItem.mark }}{{ item }}
      </template>
    </template>
    <template v-else>
      {{
        props.rowData[props.bodyItem.prop] === undefined ||
        props.rowData[props.bodyItem.prop] === '' ||
        props.rowData[props.bodyItem.prop] === null
          ? '-'
          : props.rowData[props.bodyItem.prop]
      }}
    </template>
  </span>
</template>
<script lang="ts" setup>
import { defineExpose, defineProps, reactive } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const state = reactive<any>({
  timer: null
});
function rowClick() {
  if (typeof props.bodyItem.click === 'function') {
    if (props.bodyItem.edit) {
      clearTimer();
      state.timer = setTimeout(() => {
        props.bodyItem.click({
          value: props.rowData[props.bodyItem.prop],
          prop: props.bodyItem.prop,
          rowData: props.rowData
        });
      }, 500);
    } else {
      props.bodyItem.click({
        prop: props.bodyItem.prop,
        rowData: props.rowData
      });
    }
  } else {
    if (props.bodyItem.click !== undefined) {
      console.error('tableOptions -> click not a function');
    }
  }
}
// 清除定时器
function clearTimer() {
  if (state.timer) {
    clearTimeout(state.timer);
  }
}
// 供父元素调用
defineExpose({
  clearTimer
});
</script>
<style lang="scss" scoped></style>

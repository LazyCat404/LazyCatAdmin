<template>
  <span
    :style="[{ color: state.color, cursor: props.bodyItem.edit || props.bodyItem.click ? 'pointer' : '' }]"
    @click="rowClick"
  >
    <template v-if="Object.prototype.toString.call(props.rowData[props.bodyItem.prop]) === '[object Array]'">
      {{ props.rowData[props.bodyItem.prop].join(`${props.bodyItem.mark === undefined ? ',' : props.bodyItem.mark}`) }}
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
  <CopyText :content="state.copyContent" class="lazy-table-copy-position" v-if="props.bodyItem.copy"></CopyText>
</template>
<script lang="ts" setup>
import { defineExpose, defineProps, onBeforeUnmount, reactive } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const state = reactive<any>({
  timer: null,
  copyContent: null,
  color: props.bodyItem.color
});
function rowClick() {
  if (props.bodyItem.edit) {
    clearTimer();
    state.timer = setTimeout(() => {
      if (typeof props.bodyItem.click === 'function') {
        props.bodyItem.click({
          value: props.rowData[props.bodyItem.prop],
          prop: props.bodyItem.prop,
          rowData: props.rowData
        });
      } else {
        if (props.bodyItem.click !== undefined) {
          console.error('tableOptions -> click not a function');
        }
      }
    }, 500);
  } else {
    if (typeof props.bodyItem.click === 'function') {
      props.bodyItem.click({
        prop: props.bodyItem.prop,
        rowData: props.rowData
      });
    } else {
      if (props.bodyItem.click !== undefined) {
        console.error('tableOptions -> click not a function');
      }
    }
  }
}
// 清除定时器
function clearTimer() {
  if (state.timer) {
    clearTimeout(state.timer);
  }
}
function init() {
  if (props.bodyItem.copy) {
    if (Object.prototype.toString.call(props.rowData[props.bodyItem.prop]) === '[object Array]') {
      state.copyContent = props.rowData[props.bodyItem.prop];
      state.copyContent = props.rowData[props.bodyItem.prop].join(
        `${props.bodyItem.mark === undefined ? ',' : props.bodyItem.mark}`
      );
    } else if (Object.prototype.toString.call(props.rowData[props.bodyItem.prop]) === '[object Object]') {
      state.copyContent = JSON.stringify(props.rowData[props.bodyItem.prop]);
    } else {
      state.copyContent = props.rowData[props.bodyItem.prop];
    }
  }
  // 如果颜色是三元表达式
  if (props.bodyItem.color && props.bodyItem.color.includes('?')) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let prop = props.rowData[props.bodyItem.colorX ? props.bodyItem.colorX : props.bodyItem.prop];
    state.color = eval(props.bodyItem.color);
  }
}
init();
// 供父元素调用
defineExpose({
  clearTimer
});
onBeforeUnmount(() => {
  clearTimer();
});
</script>
<style lang="scss" scoped>
.lazy-table-copy-position {
  position: absolute;
  right: 5px;
  top: calc(50% - 10px);
  z-index: 999;
}
</style>

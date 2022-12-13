<template>
  <span
    :style="
      state.style
        ? state.style
        : [
            {
              color: state.color,
              cursor: props.bodyItem.edit || props.bodyItem.click ? 'pointer' : '',
              fontWeight: state.fontWeight
            }
          ]
    "
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
import { inspect } from '@/utils/inspect';
import { defineExpose, defineProps, onBeforeUnmount, reactive } from 'vue';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();
const state = reactive<any>({
  timer: null,
  copyContent: null,
  color: '',
  fontWeight: '',
  style: ''
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
  // 可复制
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
  // 如果定义了style
  if (props.bodyItem.style) {
    if (typeof props.bodyItem.style === 'string') {
      state.style = props.bodyItem.style;
    } else if (typeof props.bodyItem.style === 'function') {
      state.style = props.bodyItem.style({ prop: props.bodyItem.prop, rowData: props.rowData });
    } else {
      console.error('tableOptions -> style 仅支持 string、function 类型');
    }
  }
  // 如果定义了加粗
  if (props.bodyItem.fontWeight) {
    if (typeof props.bodyItem.fontWeight === 'string' || typeof props.bodyItem.fontWeight === 'number') {
      state.fontWeight = props.bodyItem.fontWeight;
    } else if (typeof props.bodyItem.fontWeight === 'function') {
      state.fontWeight = props.bodyItem.fontWeight({ prop: props.bodyItem.prop, rowData: props.rowData });
    } else {
      console.error('tableOptions -> fontWeight 仅支持 string、number 和 function 类型');
    }
  }
  // 如果指定颜色
  if (props.bodyItem.color) {
    if (typeof props.bodyItem.color === 'string') {
      if (inspect.isColor(props.bodyItem.color)) {
        state.color = props.bodyItem.color;
      } else {
        console.warn('请检查 tableOptions -> color 格式');
      }
    } else if (typeof props.bodyItem.color === 'function') {
      if (typeof props.bodyItem.color({ prop: props.bodyItem.prop, rowData: props.rowData }) == 'string') {
        if (inspect.isColor(props.bodyItem.color({ prop: props.bodyItem.prop, rowData: props.rowData }))) {
          state.color = props.bodyItem.color({ prop: props.bodyItem.prop, rowData: props.rowData });
        } else {
          console.warn('请检查 tableOptions -> color 格式');
        }
      }
    } else {
      console.error('tableOptions -> color 仅支持 string、function 类型');
    }
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

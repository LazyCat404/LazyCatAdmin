<template>
  <!-- 超出隐藏，不换行 -->
  <div v-if="bodyItem.tip === undefined ? config.tip : bodyItem.tip" v-hide @click="rowClick">
    <!-- render 行 -->
    <span
      v-if="typeof bodyItem.render == 'string' || typeof bodyItem.render == 'function'"
      v-html="
        typeof bodyItem.render == 'string'
          ? bodyItem.render
          : bodyItem.render({
              bodyItem,
              rowData
            })
      "
      :style="
        obj.style
          ? obj.style
          : [
              {
                color: obj.color,
                cursor: props.bodyItem.edit || props.bodyItem.click ? 'pointer' : '',
                fontWeight: obj.fontWeight
              }
            ]
      "
    >
    </span>
    <!-- 普通行 -->
    <span
      v-else
      :style="
        obj.style
          ? obj.style
          : [
              {
                color: obj.color,
                cursor: props.bodyItem.edit || props.bodyItem.click ? 'pointer' : '',
                fontWeight: obj.fontWeight
              }
            ]
      "
    >
      <template v-if="Object.prototype.toString.call(props.rowData[props.bodyItem.prop]) === '[object Array]'">
        {{
          props.rowData[props.bodyItem.prop].join(`${props.bodyItem.mark === undefined ? ',' : props.bodyItem.mark}`)
        }}
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
  </div>
  <!-- 超出自动换行 -->
  <div v-else @click="rowClick">
    <!-- render 行 -->
    <span
      v-if="typeof bodyItem.render == 'string' || typeof bodyItem.render == 'function'"
      v-html="
        typeof bodyItem.render == 'string'
          ? bodyItem.render
          : bodyItem.render({
              bodyItem,
              rowData
            })
      "
      :style="
        obj.style
          ? obj.style
          : [
              {
                color: obj.color,
                cursor: props.bodyItem.edit || props.bodyItem.click ? 'pointer' : '',
                fontWeight: obj.fontWeight
              }
            ]
      "
    >
    </span>
    <!-- 普通行 -->
    <span
      v-else
      :style="
        obj.style
          ? obj.style
          : [
              {
                color: obj.color,
                cursor: props.bodyItem.edit || props.bodyItem.click ? 'pointer' : '',
                fontWeight: obj.fontWeight
              }
            ]
      "
    >
      <template v-if="Object.prototype.toString.call(props.rowData[props.bodyItem.prop]) === '[object Array]'">
        {{
          props.rowData[props.bodyItem.prop].join(`${props.bodyItem.mark === undefined ? ',' : props.bodyItem.mark}`)
        }}
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
  </div>
</template>
<script setup lang="ts">
import { inspect } from '@/utils/inspect';
import { config } from '../../../config';
import { computed, defineExpose, defineProps, onBeforeUnmount, reactive } from 'vue';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();
const obj = reactive<any>({
  timer: null,
  color: '',
  fontWeight: '',
  style: ''
});
// style
obj.style = computed(() => {
  let style = '';
  // 如果定义了style
  if (props.bodyItem.style) {
    if (typeof props.bodyItem.style === 'string') {
      style = props.bodyItem.style;
    } else if (typeof props.bodyItem.style === 'function') {
      style = props.bodyItem.style({ bodyItem: props.bodyItem, rowData: props.rowData });
    } else {
      console.warn('tableOptions -> style 仅支持 string、function 类型');
    }
  }
  return style;
});
// 加粗
obj.fontWeight = computed(() => {
  let fontWeight = '';
  // 如果定义了加粗
  if (props.bodyItem.fontWeight) {
    if (typeof props.bodyItem.fontWeight === 'string' || typeof props.bodyItem.fontWeight === 'number') {
      fontWeight = props.bodyItem.fontWeight;
    } else if (typeof props.bodyItem.fontWeight === 'function') {
      fontWeight = props.bodyItem.fontWeight({ bodyItem: props.bodyItem, rowData: props.rowData });
    } else {
      console.warn('tableOptions -> fontWeight 仅支持 string、number 和 function 类型');
    }
  }
  return fontWeight;
});
// 字体颜色
obj.color = computed(() => {
  let color = '';
  // 如果指定颜色
  if (props.bodyItem.color) {
    if (typeof props.bodyItem.color === 'string') {
      if (inspect.isColor(props.bodyItem.color)) {
        color = props.bodyItem.color;
      } else {
        console.warn('请检查 tableOptions -> color 颜色格式');
      }
    } else if (typeof props.bodyItem.color === 'function') {
      let returnColor = props.bodyItem.color({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnColor == 'string') {
        if (inspect.isColor(returnColor)) {
          color = returnColor;
        } else {
          console.warn('请检查 tableOptions -> color 返回值颜色格式');
        }
      }
    } else {
      console.warn('tableOptions -> color 仅支持 string、function 类型');
    }
  }
  return color;
});
// 行点击事件
function rowClick() {
  if (props.bodyItem.edit) {
    clearTimer();
    obj.timer = setTimeout(() => {
      if (typeof props.bodyItem.click === 'function') {
        props.bodyItem.click({
          bodyItem: props.bodyItem,
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
        bodyItem: props.bodyItem,
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
  if (obj.timer) {
    clearTimeout(obj.timer);
  }
}

// 供父元素调用
defineExpose({
  clearTimer
});
onBeforeUnmount(() => {
  clearTimer();
});
</script>
<style scoped lang="scss"></style>

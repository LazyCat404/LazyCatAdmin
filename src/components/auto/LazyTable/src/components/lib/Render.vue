<template>
  <div
    v-if="typeof bodyItem.render == 'string' || typeof bodyItem.render == 'function'"
    class="lazy-table-list-row-box"
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
    @click="rowClick"
  ></div>
  <div v-else>-</div>
</template>
<script lang="ts" setup>
import { inspect } from '@/utils/inspect';
import {  reactive } from 'vue';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();
const obj = reactive<any>({
  color: '',
  fontWeight: '',
  style: ''
});
function rowClick() {
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
function init() {
  if (typeof props.bodyItem.render == 'string' || typeof props.bodyItem.render == 'function') {
    // 如果定义了style
    if (props.bodyItem.style) {
      if (typeof props.bodyItem.style === 'string') {
        obj.style = props.bodyItem.style;
      } else if (typeof props.bodyItem.style === 'function') {
        obj.style = props.bodyItem.style({ bodyItem: props.bodyItem, rowData: props.rowData });
      } else {
        console.warn('tableOptions -> style 仅支持 string、function 类型');
      }
    }
    // 如果定义了加粗
    if (props.bodyItem.fontWeight) {
      if (typeof props.bodyItem.fontWeight === 'string' || typeof props.bodyItem.fontWeight === 'number') {
        obj.fontWeight = props.bodyItem.fontWeight;
      } else if (typeof props.bodyItem.fontWeight === 'function') {
        obj.fontWeight = props.bodyItem.fontWeight({ bodyItem: props.bodyItem, rowData: props.rowData });
      } else {
        console.warn('tableOptions -> fontWeight 仅支持 string、number 和 function 类型');
      }
    }
    // 如果指定颜色
    if (props.bodyItem.color) {
      if (typeof props.bodyItem.color === 'string') {
        if (inspect.isColor(props.bodyItem.color)) {
          obj.color = props.bodyItem.color;
        } else {
          console.warn('请检查 tableOptions -> color 颜色格式');
        }
      } else if (typeof props.bodyItem.color === 'function') {
        let returnColor = props.bodyItem.color({ bodyItem: props.bodyItem, rowData: props.rowData });
        if (typeof returnColor == 'string') {
          if (inspect.isColor(returnColor)) {
            obj.color = returnColor;
          } else {
            console.warn('请检查 tableOptions -> color 颜色格式');
          }
        } else if (returnColor == undefined) {
          obj.color = '';
        } else {
          console.warn('请检查 tableOptions -> color 颜色格式');
        }
      } else {
        console.warn('tableOptions -> color 仅支持 string、function 类型');
      }
    }
  } else {
    console.warn('tableOptions -> runder 仅支持 string、function 类型');
  }
}
init();
</script>
<style lang="scss" scoped></style>

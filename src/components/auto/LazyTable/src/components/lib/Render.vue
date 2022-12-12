<template>
  <div
    v-if="typeof bodyItem.render == 'string' || typeof bodyItem.render == 'function'"
    class="lazy-table-list-row-box"
    v-html="
      typeof bodyItem.render == 'string'
        ? bodyItem.render
        : bodyItem.render({
            prop: bodyItem.prop,
            rowData: rowData
          })
    "
    :style="[
      {
        color: state.color,
        fontWeight: props.bodyItem.fontWeight ? props.bodyItem.fontWeight : ''
      }
    ]"
    @click="rowClick"
  ></div>
  <div v-else>-</div>
</template>
<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();
const state = reactive<any>({
  color: props.bodyItem.color
});
function rowClick() {
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
function init() {
  if (typeof props.bodyItem.render == 'string' || typeof props.bodyItem.render == 'function') {
    // 如果指定颜色
    if (props.bodyItem.color) {
      if (typeof props.bodyItem.color === 'string') {
        state.color = props.bodyItem.color;
      } else if (typeof props.bodyItem.color === 'function') {
        state.color = props.bodyItem.color({ prop: props.bodyItem.prop, rowData: props.rowData });
      } else {
        console.error('tableOptions -> color 仅支持 string、object 类型');
      }
    }
  } else {
    console.error('tableOptions -> runder 仅支持 string、function 类型');
  }
}
init();
</script>
<style lang="scss" scoped></style>

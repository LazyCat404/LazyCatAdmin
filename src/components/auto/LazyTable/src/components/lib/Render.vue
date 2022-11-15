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
        cursor: bodyItem.click ? 'pointer' : '',
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
    // 如果颜色是三元表达式
    if (props.bodyItem.color && props.bodyItem.color.includes('?')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let prop = props.rowData[props.bodyItem.colorX ? props.bodyItem.colorX : props.bodyItem.prop];
      state.color = eval(props.bodyItem.color);
    }
  } else {
    console.error('tableOptions -> runder 仅支持 string、function 类型');
  }
}
init();
</script>
<style lang="scss" scoped></style>

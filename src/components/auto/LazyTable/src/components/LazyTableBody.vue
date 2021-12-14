<template>
  <div
    class="lazy-table-list-col-box"
    :tip="props.bodyItem.tip === undefined ? (config.tip ? 'show' : 'hide') : props.bodyItem.tip ? 'show' : 'hide'"
  >
    <span
      v-if="props.bodyItem.state === undefined ? false : true"
      class="iconfont icon-dian"
      state="real"
      :style="[{ color: state.setColor[props.bodyItem.state] }]"
    ></span>
    <span v-if="props.bodyItem.state === undefined ? false : true" class="state-seize-seat iconfont icon-dian"></span>
    {{ props.rowData[props.bodyItem.prop] }}
  </div>
</template>
<script lang="ts" setup>
import { config, stateColor } from '../config';
import { defineProps, reactive } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const state = reactive<any>({
  setColor: stateColor
});
// 初始化
function init() {
  //
}
init();
</script>
<style lang="scss" scoped>
.lazy-table-list-col-box[tip='show'] {
  overflow: hidden;
  white-space: nowrap; /*设置内容不换行*/
  text-overflow: ellipsis;
}
.icon-dian[state='real'] {
  font-size: 25px;
  position: absolute;
  left: 6px;
}
.state-seize-seat {
  color: transparent;
}
</style>

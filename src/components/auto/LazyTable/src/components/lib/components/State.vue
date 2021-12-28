<template>
  <!-- ico -->
  <span
    v-if="props.bodyItem.ico !== undefined && state.first === 'ico' ? true : false"
    class="state-sign-box"
    style="margin-right: 5px"
  >
    <span :class="props.bodyItem.ico" style="position: absolute; left: 0px; top: -0.5px"> </span>
  </span>
  <!-- 状态 -->
  <span v-if="props.bodyItem.state === undefined ? false : true" class="state-sign-box">
    <span class="iconfont icon-dian" :style="[{ color: state.setColor[props.bodyItem.state] }]"> </span>
  </span>
  <!-- ico -->
  <span
    v-if="props.bodyItem.ico !== undefined && state.first !== 'ico' ? true : false"
    class="state-sign-box"
    style="margin-right: 5px"
  >
    <span :class="props.bodyItem.ico" style="position: absolute; left: 0px; top: -0.5px"> </span>
  </span>
</template>
<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
import { stateColor } from '../../../config';
const props = defineProps({
  bodyItem: <any>Object // 表格列设置
});
const state = reactive<any>({
  setColor: stateColor,
  first: 'ico' // 显示顺序
});
function init() {
  // ico 和状态都显示的时候，判断显示顺序
  if (props.bodyItem.state !== undefined && props.bodyItem.ico !== undefined) {
    for (let item in props.bodyItem) {
      if (item === 'ico' || item === 'state') {
        state.first = item;
        return;
      }
    }
  }
}
init();
</script>
<style lang="scss" scoped>
.state-sign-box {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  .icon-dian {
    font-size: 25px;
    position: absolute;
    left: -7px;
    top: -1.5px;
  }
}
</style>

<template>
  <!-- ico -->
  <span
    v-if="props.bodyItem.ico !== undefined && state.first === 'ico' ? true : false"
    class="state-sign-box"
    style="margin-right: 5px"
  >
    <span :class="state.ico" style="position: absolute; left: 0px; top: -0.5px" :style="[{ color: state.icoColor }]">
    </span>
  </span>
  <!-- 状态 -->
  <span v-if="props.bodyItem.state === undefined ? false : true" class="state-sign-box">
    <span class="iconfont icon-dian" :style="[{ color: state.setColor[props.rowData[props.bodyItem.state]] }]"> </span>
  </span>
  <!-- ico -->
  <span
    v-if="props.bodyItem.ico !== undefined && state.first !== 'ico' ? true : false"
    class="state-sign-box"
    style="margin-right: 5px"
  >
    <span :class="state.ico" style="position: absolute; left: 0px; top: -0.5px" :style="[{ color: state.icoColor }]">
    </span>
  </span>
</template>
<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
import { stateColor } from '../../../config';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any;
}>();
const state = reactive<any>({
  setColor: stateColor,
  first: 'ico', // 显示顺序
  ico: props.bodyItem.ico,
  icoColor: props.bodyItem.icoColor
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
  // 如果ico是三元表达式
  if (props.bodyItem.ico && props.bodyItem.ico.includes('?')) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let prop = props.rowData[props.bodyItem.icoX ? props.bodyItem.icoX : props.bodyItem.prop];
    state.ico = eval(props.bodyItem.ico);
  }
  // 如果icoColor是三元表达式
  if (props.bodyItem.icoColor && props.bodyItem.icoColor.includes('?')) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let prop = props.rowData[props.bodyItem.icoColorX ? props.bodyItem.icoX : props.bodyItem.prop];
    state.icoColor = eval(props.bodyItem.icoColor);
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

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
    <span class="iconfont icon-dian" :style="[{ color: state.stateColor }]"> </span>
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
import { inspect } from '@/utils/inspect';
import { stateColor } from '../../../config';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any;
}>();
const state = reactive<any>({
  first: 'ico', // 显示顺序
  ico: '',
  icoColor: '',
  stateColor: ''
});
function init() {
  // 处理状态
  if (props.bodyItem.state !== undefined) {
    if (typeof props.bodyItem.state == 'string' || typeof props.bodyItem.state == 'number') {
      state.stateColor = (stateColor as any)[props.rowData[props.bodyItem.state]];
    } else if (typeof props.bodyItem.state == 'function') {
      let returnState = props.bodyItem.state({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnState == 'string') {
        if (inspect.isColor(returnState)) {
          state.icoColor = returnState;
        } else {
          state.stateColor = (stateColor as any)[returnState];
        }
      } else if (typeof returnState == 'number') {
        state.stateColor = (stateColor as any)[returnState];
      } else if (returnState === undefined) {
        state.stateColor = '';
      } else {
        console.warn('tableOptions -> ico 仅支持 string、number、function 类型');
      }
    } else {
      console.warn('tableOptions -> ico 仅支持 string、number、function 类型');
    }
  }
  // 处理ico
  if (props.bodyItem.ico) {
    if (typeof props.bodyItem.ico == 'string') {
      state.ico = props.bodyItem.ico;
    } else if (typeof props.bodyItem.ico == 'function') {
      let returnIco = props.bodyItem.ico({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnIco == 'string') {
        state.ico = returnIco;
      } else if (returnIco == undefined) {
        state.ico = '';
      } else {
        console.warn('tableOptions -> ico 仅支持 string、function 类型');
      }
    } else {
      console.warn('tableOptions -> ico 仅支持 string、function 类型');
    }
  }
  // 处理ico颜色
  if (props.bodyItem.icoColor) {
    if (typeof props.bodyItem.icoColor == 'string') {
      if (inspect.isColor(props.bodyItem.icoColor)) {
        state.icoColor = props.bodyItem.icoColor;
      } else {
        console.warn('请检查 tableOptions -> icoColor 颜色格式');
      }
    } else if (typeof props.bodyItem.icoColor == 'function') {
      let returnColor = props.bodyItem.icoColor({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnColor == 'string') {
        if (inspect.isColor(returnColor)) {
          state.icoColor = returnColor;
        } else {
          console.warn('请检查 tableOptions -> icoColor 颜色格式');
        }
      } else if (returnColor == undefined) {
        state.icoColor = '';
      } else {
        console.warn('请检查 tableOptions -> icoColor 颜色格式');
      }
    } else {
      console.warn('tableOptions -> icoColor 仅支持 string、function 类型');
    }
  }
  // ico 和 状态都显示的时候，判断显示顺序
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

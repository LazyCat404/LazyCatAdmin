<template>
  <!-- ico -->
  <span
    v-if="props.bodyItem.ico !== undefined && obj.first === 'ico' ? true : false"
    class="state-sign-box"
    style="margin-right: 5px"
  >
    <span :class="obj.ico" style="position: absolute; left: 0px; top: -0.5px" :style="[{ color: obj.icoColor }]">
    </span>
  </span>
  <!-- 状态 -->
  <span v-if="props.bodyItem.status === undefined ? false : true" class="state-sign-box">
    <span class="iconfont icon-dian" :style="[{ color: obj.statusColor }]"> </span>
  </span>
  <!-- ico -->
  <span
    v-if="props.bodyItem.ico !== undefined && obj.first !== 'ico' ? true : false"
    class="state-sign-box"
    style="margin-right: 5px"
  >
    <span :class="obj.ico" style="position: absolute; left: 0px; top: -0.5px" :style="[{ color: obj.icoColor }]">
    </span>
  </span>
</template>
<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
import { inspect } from '@/utils/inspect';
import { statusColor } from '../../../config';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any;
}>();
const obj = reactive<any>({
  first: 'ico', // 显示顺序
  ico: '',
  icoColor: '',
  statusColor: ''
});
// obj.statusColor = computed(() => {
//   return undefined;
// });
function init() {
  // 处理状态
  if (props.bodyItem.status !== undefined) {
    if (typeof props.bodyItem.status == 'string' || typeof props.bodyItem.status == 'number') {
      obj.statusColor = (statusColor as any)[props.rowData[props.bodyItem.status]];
    } else if (typeof props.bodyItem.status == 'function') {
      let returnState = props.bodyItem.status({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnState == 'string') {
        if (inspect.isColor(returnState)) {
          obj.icoColor = returnState;
        } else {
          obj.statusColor = (statusColor as any)[returnState];
        }
      } else if (typeof returnState == 'number') {
        obj.statusColor = (statusColor as any)[returnState];
      } else if (returnState === undefined) {
        obj.statusColor = '';
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
      obj.ico = props.bodyItem.ico;
    } else if (typeof props.bodyItem.ico == 'function') {
      let returnIco = props.bodyItem.ico({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnIco == 'string') {
        obj.ico = returnIco;
      } else if (returnIco == undefined) {
        obj.ico = '';
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
        obj.icoColor = props.bodyItem.icoColor;
      } else {
        console.warn('请检查 tableOptions -> icoColor 颜色格式');
      }
    } else if (typeof props.bodyItem.icoColor == 'function') {
      let returnColor = props.bodyItem.icoColor({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnColor == 'string') {
        if (inspect.isColor(returnColor)) {
          obj.icoColor = returnColor;
        } else {
          console.warn('请检查 tableOptions -> icoColor 颜色格式');
        }
      } else if (returnColor == undefined) {
        obj.icoColor = '';
      } else {
        console.warn('请检查 tableOptions -> icoColor 颜色格式');
      }
    } else {
      console.warn('tableOptions -> icoColor 仅支持 string、function 类型');
    }
  }
  // ico 和 状态都显示的时候，判断显示顺序
  if (props.bodyItem.status !== undefined && props.bodyItem.ico !== undefined) {
    for (let item in props.bodyItem) {
      if (item === 'ico' || item === 'state') {
        obj.first = item;
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
  }
}
</style>

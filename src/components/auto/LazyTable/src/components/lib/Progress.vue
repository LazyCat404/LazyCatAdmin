<template>
  <template v-if="Object.prototype.toString.call(bodyItem.progress) === '[object Object]'">
    <div class="progress-box">
      <el-progress
        :show-text="false"
        :text-inside="bodyItem.progress.textInside ? bodyItem.progress.textInside : false"
        :stroke-width="bodyItem.progress.strokeWidth ? bodyItem.progress.strokeWidth : 8"
        :percentage="obj.value > 100 ? 100 : obj.value < 0 ? 0 : obj.value"
        :color="obj.progressColor"
      />
      <template v-if="(bodyItem.progress.showText || bodyItem.progress.showText == undefined) && obj.emptyText">
        <span v-html="obj.emptyText"></span>
      </template>
      <template v-else-if="bodyItem.progress.showText || bodyItem.progress.showText == undefined">
        <span :style="[{ color: obj.textColor == 'follow' ? obj.progressColor : obj.textColor }]">
          {{ obj.value }}%
        </span>
      </template>
    </div>
  </template>
  <el-progress
    :text-inside="false"
    :stroke-width="8"
    :percentage="obj.value > 100 ? 100 : obj.value < 0 ? 0 : obj.value"
    v-else-if="typeof props.bodyItem.progress === 'function' && !Number.isNaN(obj.value)"
  />
  <el-progress
    :text-inside="false"
    :stroke-width="8"
    :percentage="rowData[bodyItem.prop] > 100 ? 100 : rowData[bodyItem.prop] < 0 ? 0 : rowData[bodyItem.prop]"
    v-else-if="
      typeof props.bodyItem.progress !== 'function' && !Number.isNaN(Number(props.rowData[props.bodyItem.prop]))
    "
  />
  <span v-else>-</span>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { inspect } from '@/utils/inspect';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();

const obj = reactive<any>({
  progressColor: '#409eff',
  emptyText: '',
  textColor: 'follow',
  value: 0
});

function init() {
  if (Object.prototype.toString.call(props.bodyItem.progress) === '[object Object]') {
    // 颜色处理
    if (typeof props.bodyItem.progress.color === 'string') {
      if (inspect.isColor(props.bodyItem.progress.color)) {
        obj.progressColor = props.bodyItem.progress.color;
      } else {
        console.warn('请检查 tableOptions.progress -> color 颜色格式');
      }
    } else if (typeof props.bodyItem.progress.color === 'function') {
      let returnColor = props.bodyItem.progress.color({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnColor == 'string') {
        if (inspect.isColor(returnColor)) {
          obj.progressColor = returnColor;
        } else {
          console.warn('请检查 tableOptions.progress -> color 颜色格式');
        }
      }
    } else {
      console.warn('tableOptions.progress -> color 仅支持 string、function 类型');
    }
    // 空文字处理
    if (typeof props.bodyItem.progress.emptyText == 'function') {
      obj.emptyText = props.bodyItem.progress.emptyText({ prop: props.bodyItem.prop, rowData: props.rowData });
    } else if (props.bodyItem.progress.emptyText != undefined) {
      console.warn('tableOptions -> progress.emptyText 仅支持 function 类型');
    }
    // 文字颜色处理
    if (typeof props.bodyItem.progress.textColor === 'string') {
      if (inspect.isColor(props.bodyItem.progress.textColor)) {
        obj.textColor = props.bodyItem.progress.textColor;
      } else {
        console.warn('请检查 tableOptions.progress -> textColor 格式');
      }
    } else if (typeof props.bodyItem.progress.textColor === 'function') {
      let returnColor = props.bodyItem.progress.textColor({ bodyItem: props.bodyItem, rowData: props.rowData });
      if (typeof returnColor === 'string') {
        if (inspect.isColor(returnColor)) {
          obj.textColor = returnColor;
        } else {
          console.warn('请检查 tableOptions.progress -> textColor 颜色格式');
        }
      } else if (returnColor === undefined) {
        obj.textColor = 'follow';
      } else {
        console.warn('请检查 tableOptions.progress -> textColor 颜色格式');
      }
    } else if (props.bodyItem.progress.textColor != undefined) {
      console.warn('tableOptions.progress -> textColor 仅支持 string、function 类型');
    }
    // 进度值处理
    if (props.bodyItem.progress.value) {
      if (typeof props.bodyItem.progress.value == 'function') {
        let progValue = props.bodyItem.progress.value({ bodyItem: props.bodyItem, rowData: props.rowData });
        if (progValue == undefined) {
          obj.value = 0;
        } else if (Number.isNaN(Number(progValue))) {
          console.warn('进度条 percentage 的值无法转为数字');
        } else {
          obj.value = +progValue;
        }
      } else if (!Number.isNaN(Number(props.bodyItem.progress.value))) {
        obj.value = +props.bodyItem.progress.value;
      } else {
        console.warn('进度条 percentage 的值无法转为数字');
      }
    } else {
      if (!Number.isNaN(Number(props.rowData[props.bodyItem.prop]))) {
        obj.value = +props.rowData[props.bodyItem.prop];
      } else {
        console.warn('进度条 percentage 的值无法转为数字');
      }
    }
  } else if (typeof props.bodyItem.progress === 'function') {
    let progValue = props.bodyItem.progress({ bodyItem: props.bodyItem, rowData: props.rowData }) || 0;
    if (Number.isNaN(Number(progValue))) {
      console.warn('进度条 percentage 的值无法转为数字');
      obj.value = NaN;
    } else {
      obj.value = +progValue;
    }
  } else if (Number.isNaN(Number(props.rowData[props.bodyItem.prop]))) {
    console.warn('进度条 percentage 的值无法转为数字');
  }
}
init();
</script>

<style lang="scss" scoped>
.progress-box {
  display: flex;
  width: 100%;
  justify-content: center; /*水平居中*/
  align-items: center;
  > div {
    flex: 1;
  }
  > span {
    margin-left: 10px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 16px;
  }
}
</style>

<template>
  <el-progress
    :text-inside="true"
    :stroke-width="8"
    :percentage="rowData[bodyItem.prop]"
    v-if="typeof bodyItem.progress == 'boolean'"
  />
  <template v-else-if="Object.prototype.toString.call(bodyItem.progress) === '[object Object]'">
    <div class="progress-box">
      <el-progress
        :show-text="bodyItem.progress.textColor ? false : bodyItem.progress.showText ? true : false"
        :text-inside="bodyItem.progress.textInside ? bodyItem.progress.textInside : false"
        :stroke-width="bodyItem.progress.strokeWidth ? bodyItem.progress.strokeWidth : 8"
        :percentage="rowData[bodyItem.prop]"
        :color="state.progressColor"
      />
      <template v-if="state.emptyText">
        <span v-html="state.emptyText"></span>
      </template>
      <template v-else-if="bodyItem.progress.textColor">
        <span v-if="bodyItem.progress.textColor == 'follow'" :style="[{ color: state.progressColor }]">
          {{ rowData[bodyItem.prop] }}%
        </span>
        <span v-else :style="[{ color: bodyItem.progress.textColor }]">{{ rowData[bodyItem.prop] }}%</span>
      </template>
    </div>
  </template>
  <span v-else>-</span>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();

const state = reactive<any>({
  progressColor: '#409eff',
  emptyText: ''
});

function init() {
  if (Object.prototype.toString.call(props.bodyItem.progress) === '[object Object]') {
    // 颜色处理
    if (typeof props.bodyItem.progress.color == 'string') {
      state.progressColor = props.bodyItem.progress.color;
    } else if (typeof props.bodyItem.progress.color == 'function') {
      state.progressColor = props.bodyItem.progress.color({ prop: props.bodyItem.prop, rowData: props.rowData });
    }
    // 空文字处理
    if (typeof props.bodyItem.progress.emptyText == 'function') {
      state.emptyText = props.bodyItem.progress.emptyText({ prop: props.bodyItem.prop, rowData: props.rowData });
    } else {
      console.error('tableOptions -> progress.emptyText 仅支持 function 类型');
    }
  } else if (typeof props.bodyItem.progress !== 'boolean') {
    console.error('tableOptions -> progress 仅支持 boolean、object 类型');
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

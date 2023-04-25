<template>
  <div class="ordinary-wrapper">
    <!-- 状态/ico -->
    <div class="ordinary-status-ico-box">
      <StatusIco
        v-if="props.bodyItem.status !== undefined || props.bodyItem.ico !== undefined ? true : false"
        :bodyItem="props.bodyItem"
        :rowData="rowData"
      >
      </StatusIco>
    </div>
    <!-- 行显示 -->
    <Row :bodyItem="props.bodyItem" :rowData="props.rowData"></Row>
    <!-- 复制 -->
    <div class="ordinary-copy-box">
      <CopyText :content="obj.copyContent" v-if="props.bodyItem.copy"></CopyText>
    </div>
  </div>
</template>
<script lang="ts" setup>
import StatusIco from './components/StatusIco.vue';
import Row from './components/Row.vue';
import { reactive, computed } from 'vue';
const props = defineProps<{
  bodyItem: any; // 表格列设置
  rowData: any; //行数据
}>();
const obj = reactive<any>({
  copyContent: ''
});
// 复制内容
obj.copyContent = computed(() => {
  let copyContent = null;
  // 可复制
  if (props.bodyItem.copy) {
    if (typeof props.bodyItem.copy == 'boolean') {
      if (Object.prototype.toString.call(props.rowData[props.bodyItem.prop]) === '[object Array]') {
        copyContent = props.rowData[props.bodyItem.prop];
        copyContent = props.rowData[props.bodyItem.prop].join(
          `${props.bodyItem.mark === undefined ? ',' : props.bodyItem.mark}`
        );
      } else if (Object.prototype.toString.call(props.rowData[props.bodyItem.prop]) === '[object Object]') {
        copyContent = JSON.stringify(props.rowData[props.bodyItem.prop]);
      } else {
        copyContent = props.rowData[props.bodyItem.prop];
      }
    } else if (typeof props.bodyItem.copy == 'string' || typeof props.bodyItem.copy == 'number') {
      copyContent = props.bodyItem.copy;
    } else if (typeof props.bodyItem.copy == 'function') {
      copyContent = props.bodyItem.copy({ bodyItem: props.bodyItem, rowData: props.rowData });
    } else {
      console.warn('tableOptions -> copy 仅支持 boolean、string、function 类型');
    }
  }
  return copyContent;
});
</script>
<style lang="scss" scoped>
.ordinary-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .ordinary-copy-box,
  .ordinary-status-ico-box {
    display: flex;
    align-items: center;
  }
}
</style>

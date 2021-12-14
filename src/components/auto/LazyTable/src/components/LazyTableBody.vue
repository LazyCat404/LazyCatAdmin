<template>
  <div
    class="lazy-table-list-col-box"
    :tip="props.bodyItem.tip === undefined ? (config.tip ? 'show' : 'hide') : props.bodyItem.tip ? 'show' : 'hide'"
    @dblclick="dobleClick"
  >
    <!-- 状态 -->
    <span v-if="props.bodyItem.state === undefined ? false : true" class="state-sign-box">
      <span class="iconfont icon-dian" state="real" :style="[{ color: state.setColor[props.bodyItem.state] }]"> </span>
    </span>
    <!-- 单行可不编辑 -->
    <span v-if="!props.bodyItem.edit">
      {{ props.rowData[props.bodyItem.prop] }}
    </span>
    <!-- 单行可不编辑 -->
    <template v-else class="table-row-edit-box">
      <el-input
        ref="tableRowInput"
        v-show="state.isEdit"
        @blur="state.isEdit = false"
        autofocus
        v-model="state.editData"
        :style="[{ width: `${props.bodyItem.state === undefined ? '100%' : 'calc(100% - 16px)'}` }]"
      />
      <span v-show="!state.isEdit"> {{ props.rowData[props.bodyItem.prop] }}</span>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { config, stateColor } from '../config';
import { defineProps, reactive, ref } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const state = reactive<any>({
  setColor: stateColor,
  editData: props.rowData[props.bodyItem.prop],
  isEdit: false
});
const tableRowInput = ref(null);
// 双击事件
function dobleClick() {
  if (props.bodyItem.edit) {
    let tRI = tableRowInput.value as any;
    state.isEdit = true;
    tRI.focus();
  }
}
// 初始化
function init() {
  //
  // console.log(props.bodyItem.edit);
}
init();
</script>
<style lang="scss" scoped>
.lazy-table-list-col-box[tip='show'] {
  overflow: hidden;
  white-space: nowrap; /*设置内容不换行*/
  text-overflow: ellipsis;
}
.lazy-table-list-col-box {
  div {
    display: inline-block;
  }
  .table-row-edit-box {
    // position: relative;
    // width: 100%;
    // div {
    //   position: absolute;
    // }
  }
  // 状态
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
}
</style>

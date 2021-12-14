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
    <!-- 单行可编辑 -->
    <template v-else>
      <div
        class="table-edit-box"
        v-show="state.isEdit"
        @mouseenter="state.isConfirm = true"
        @mouseleave="state.isConfirm = false"
        :style="[{ width: `${props.bodyItem.state === undefined ? '100%' : 'calc(100% - 16px)'}` }]"
      >
        <!-- text、textarea 、number -->
        <div
          v-if="
            !props.bodyItem.edit.type ||
            props.bodyItem.edit.type === 'text' ||
            props.bodyItem.edit.type === 'number' ||
            props.bodyItem.edit.type === 'textarea'
              ? true
              : false
          "
        >
          <el-input-number
            v-if="props.bodyItem.edit.type === 'number'"
            ref="tableRowInput"
            autofocus
            size="small"
            v-model="state.editData"
            controls-position="right"
          />
          <el-input
            v-else
            ref="tableRowInput"
            autofocus
            autosize
            size="small"
            suffix-icon="iconfont"
            @blur="blurInput"
            v-model="state.editData"
            :type="props.bodyItem.edit.type"
          />
          <!-- 确认按钮 -->
          <span class="iconfont icon-queren" v-if="state.isEdit" @click="rowConfirm"></span>
        </div>
        <div v-else>……</div>
      </div>
      <span v-show="!state.isEdit"> {{ props.rowData[props.bodyItem.prop] }}</span>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { config, stateColor } from '../config';
import { defineEmits, defineProps, reactive, ref } from 'vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const $emits = defineEmits(['rowConfirm']);
const state = reactive<any>({
  setColor: stateColor,
  editData: props.rowData[props.bodyItem.prop],
  isEdit: false,
  isConfirm: true // 鼠标是否在输入框内
});
const tableRowInput = ref(null);
// 双击事件
function dobleClick() {
  if (props.bodyItem.edit) {
    state.editData = props.rowData[props.bodyItem.prop];
    let tRI = tableRowInput.value as any;
    state.isEdit = true;
    tRI.focus();
  }
}
// 行编辑确认
function rowConfirm(even: any) {
  state.isEdit = false;
  if (state.editData !== props.rowData[props.bodyItem.prop]) {
    $emits('rowConfirm', {
      prop: props.bodyItem.prop,
      label: props.bodyItem.label,
      rowIndex: even.path[5].rowIndex, // 行数 从0 开
      res: state.editData, // 编辑结果
      original: props.rowData[props.bodyItem.prop] // 未编辑前结果
    });
  }
}
// 失去焦点触发
function blurInput() {
  if (!state.isConfirm) {
    state.isEdit = false;
  }
}
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
  .table-edit-box {
    position: relative;
    .icon-queren {
      position: absolute;
      right: 8px;
      top: 5px;
      cursor: pointer;
    }
  }
}
</style>

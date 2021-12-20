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
      <!-- 编辑时显示 -->
      <div
        class="table-edit-box"
        v-show="state.isEdit"
        @mouseenter="
          !props.bodyItem.edit.type ||
          props.bodyItem.edit.type === 'text' ||
          props.bodyItem.edit.type === 'number' ||
          props.bodyItem.edit.type === 'textarea'
            ? (state.isConfirm = true)
            : ((state.isConfirm = false), (state.dateRow = true))
        "
        @mouseleave="
          !props.bodyItem.edit.type ||
          props.bodyItem.edit.type === 'text' ||
          props.bodyItem.edit.type === 'number' ||
          props.bodyItem.edit.type === 'textarea'
            ? (state.isConfirm = false)
            : ((state.isConfirm = false), (state.dateRow = false))
        "
        :style="[{ width: `${props.bodyItem.state === undefined ? '100%' : 'calc(100% - 16px)'}` }]"
      >
        <!-- text、textarea 、number -->
        <template
          v-if="
            !props.bodyItem.edit.type ||
            props.bodyItem.edit.type === 'text' ||
            props.bodyItem.edit.type === 'number' ||
            props.bodyItem.edit.type === 'textarea'
              ? true
              : false
          "
        >
          <el-input
            ref="tableRowInput"
            autofocus
            autosize
            size="small"
            suffix-icon="iconfont"
            @blur="blurInput"
            v-model="state.editData"
            :type="props.bodyItem.edit.type"
          />
        </template>
        <div v-else ref="tableDateInput">
          <el-date-picker
            ref="tableRowInput"
            size="small"
            :clearable="false"
            :value-format="props.bodyItem.edit.valueFormat || 'YYYY-MM-DD'"
            :format="props.bodyItem.edit.format || 'YYYY-MM-DD'"
            @blur="blurInput"
            v-model="state.editData"
            :type="props.bodyItem.edit.type"
            style="width: 100%"
          >
          </el-date-picker>
        </div>
        <!-- 确认按钮 -->
        <span class="iconfont icon-queren" v-if="state.isEdit" @click="rowConfirm"></span>
      </div>
      <!-- 未编辑时显示 -->
      <span v-show="!state.isEdit"> {{ props.rowData[props.bodyItem.prop] }}</span>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { config, stateColor } from '../config';
import { defineEmits, defineProps, reactive, ref } from 'vue';
import { inspect } from '@/utils/inspect';
import { ElMessage } from 'element-plus';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const $emits = defineEmits(['rowConfirm']);
const state = reactive<any>({
  setColor: stateColor,
  editData: props.rowData[props.bodyItem.prop],
  isEdit: false,
  isConfirm: true, // 鼠标是否在输入框内
  nowDateId: null, // 当前日期弹出框id
  nowRowIndex: null, // 当前行序号
  dateRow: true // 日期类型，是否点击行内编辑确认按钮
});
const tableRowInput = ref(null);
// 双击事件
function dobleClick(event: any) {
  if (props.bodyItem.edit) {
    state.editData = props.rowData[props.bodyItem.prop];
    let tRI = tableRowInput.value as any;
    state.isEdit = true;
    tRI.focus();
    // 获取当前序号
    for (let i = 0; i < event.path.length; i++) {
      if (event.path[i].nodeName === 'TR') {
        state.nowRowIndex = event.path[i].rowIndex;
        break;
      }
    }
    // 判断是否是日期选框
    if (props.bodyItem.edit.type === 'date') {
      for (let i = 0; i < event.path.length; i++) {
        if (event.path[i].className === 'lazy-table-list-col-box') {
          // 对应dom id（用于监听，避免失去焦点冲突）
          state.nowDateId = event.path[i].querySelector('.el-input__inner').attributes['aria-describedby'].value;
          let dateDom = document.getElementById(state.nowDateId);
          dateDom?.addEventListener('mouseenter', mouseEnter);
          dateDom?.addEventListener('mouseleave', mouseLeave);
          return;
        }
      }
    }
  }
}
// 行编辑确认
function rowConfirm() {
  // 日期
  if (props.bodyItem.edit.type === 'date') {
    removeListener();
  }
  state.isEdit = false;
  if (state.editData !== props.rowData[props.bodyItem.prop]) {
    // 有验证规则，且不能为下拉选框
    if (props.bodyItem.edit.inspect && props.bodyItem.edit.type !== 'select') {
      let ins = inspect as any;
      let insRes = ins[props.bodyItem.edit.inspect](state.editData);
      if (!insRes) {
        ElMessage.error(props.bodyItem.edit.err || '验证失败！');
        return;
      }
    }
    $emits('rowConfirm', {
      prop: props.bodyItem.prop,
      label: props.bodyItem.label,
      rowIndex: state.nowRowIndex, // 行数 从0 开始，仅用于前端修改数
      res: state.editData, // 编辑结果
      original: props.rowData[props.bodyItem.prop] // 未编辑前结果
    });
  }
}
// 鼠标进入
function mouseEnter() {
  state.isConfirm = true;
}
// 鼠标离开
function mouseLeave() {
  state.isConfirm = false;
}
// 移除监听
function removeListener() {
  let dateDom = document.getElementById(state.nowDateId);
  dateDom?.removeEventListener('mouseenter', mouseEnter);
  dateDom?.removeEventListener('mouseleave', mouseLeave);
}
// 失去焦点触发
function blurInput() {
  if (!state.isConfirm) {
    if (props.bodyItem.edit.type === 'date') {
      let dateDom = document.getElementById(state.nowDateId) as any;
      dateDom.style.display = 'none';
      removeListener();
      if (state.dateRow) {
        rowConfirm();
      }
    }
    state.isEdit = false;
  } else {
    // 点击弹出框不失去焦点
    if (props.bodyItem.edit.type === 'date') {
      let tRI = tableRowInput.value as any;
      tRI.focus();
    }
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
  // 单行编辑
  .table-edit-box {
    position: relative;
    .icon-queren {
      position: absolute;
      right: 8px;
      top: 5px;
      cursor: pointer;
    }
    ::v-deep .el-input input::-webkit-outer-spin-button,
    ::v-deep .el-input input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
}
</style>

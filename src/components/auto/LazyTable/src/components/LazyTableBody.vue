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
      {{ props.rowData[props.bodyItem.prop] ? props.rowData[props.bodyItem.prop] : '-' }}
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
        <!-- text、textarea 、number 普通输入框 -->
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
        <!-- select 下拉选框 -->
        <div ref="tableSelectInput" v-else-if="props.bodyItem.edit.type === 'select'">
          <el-select
            :class="tool.isArray(state.editData) ? 'custom-el-multiple' : ''"
            v-model="state.editData"
            :filterable="!tool.isArray(state.editData)"
            :multiple="tool.isArray(state.editData)"
            collapse-tags
            ref="tableRowInput"
            autofocus
            size="small"
            @visible-change="visibleChange"
          >
            <el-option v-for="(item, i) in props.bodyItem.edit.list" :key="i" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <span class="iconfont icon-queren" v-if="state.showConfirmBtn" @click="rowConfirm"></span>
        </div>
        <!-- 时间 -->
        <template v-else>
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
        </template>
        <!-- 确认按钮 -->
        <span
          class="iconfont icon-queren"
          v-if="state.isEdit && props.bodyItem.edit.type != 'select'"
          @click="rowConfirm"
        ></span>
      </div>
      <!-- 未编辑时显示 -->
      <span v-show="!state.isEdit">
        {{ props.rowData[props.bodyItem.prop] ? props.rowData[props.bodyItem.prop] : '-' }}</span
      >
    </template>
  </div>
</template>
<script lang="ts" setup>
import { config, stateColor } from '../config';
import { defineEmits, defineProps, reactive, ref } from 'vue';
import { inspect } from '@/utils/inspect';
import { ElMessage } from 'element-plus';
import tool from '@/utils/tool';
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
  dateRow: true, // 日期类型，是否点击行内编辑确认按钮
  showConfirmBtn: true // 显示确认按钮
});
const tableRowInput = ref(null); // 编辑输入框
const tableSelectInput = ref(null); // 下拉选dom

// 双击事件
function dobleClick(event: any) {
  if (props.bodyItem.edit) {
    // 编辑绑定数据赋值
    if (props.bodyItem.edit.type === 'select') {
      state.editData = props.rowData[props.bodyItem.edit.selectProp];
      let tSI = tableSelectInput.value as any;
      tSI?.addEventListener('mouseenter', mouseEnter);
      tSI?.addEventListener('mouseleave', mouseLeave);
    } else {
      state.editData = props.rowData[props.bodyItem.prop];
    }
    state.isEdit = true;
    // 输入框自动活得焦点
    let tRI = tableRowInput.value as any;
    tRI.focus();
    // 获取当前序号
    for (let i = 0; i < event.path.length; i++) {
      if (event.path[i].nodeName === 'TR') {
        state.nowRowIndex = event.path[i].rowIndex;
        break;
      }
    }
    // 日期选框特殊处理
    if (
      props.bodyItem.edit.type === 'date' ||
      props.bodyItem.edit.type === 'year' ||
      props.bodyItem.edit.type === 'month' ||
      props.bodyItem.edit.type === 'dates' ||
      props.bodyItem.edit.type === 'datetime' ||
      props.bodyItem.edit.type === 'week' ||
      props.bodyItem.edit.type === 'datetimerange' ||
      props.bodyItem.edit.type === 'daterange' ||
      props.bodyItem.edit.type === 'monthrange'
    ) {
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
  // 下拉选
  if (props.bodyItem.edit.type === 'select') {
    visibleChange(true); // 移除监听
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
    let parame = {
      editType:
        props.bodyItem.edit === true
          ? 'text'
          : props.bodyItem.edit.type === undefined || props.bodyItem.edit.type === ''
          ? 'text'
          : props.bodyItem.edit.type,
      prop: props.bodyItem.prop,
      label: props.bodyItem.label,
      rowIndex: state.nowRowIndex, // 行数 从0 开始，仅用于前端修改数
      res: state.editData, // 编辑结果
      original: props.rowData[props.bodyItem.prop] // 未编辑前结果
    };
    if (props.bodyItem.edit.type === 'select') {
      let tSI = tableSelectInput.value as any;
      let nowSelectDom = tSI.querySelector('.el-select .el-input__inner');
      if (tool.isArray(props.rowData[props.bodyItem.edit.selectProp])) {
        //多选
        let resLable = '';
        state.editData.forEach((item: any) => {
          for (let i = 0; i < props.bodyItem.edit.list.length; i++) {
            if (item == props.bodyItem.edit.list[i].value) {
              resLable = `${resLable + props.bodyItem.edit.list[i].label};`;
              break;
            }
          }
        });
        nowSelectDom.value = resLable;
      }
      let selPar = {
        resLabel: nowSelectDom.value,
        list: props.bodyItem.edit.list,
        selectProp: props.bodyItem.edit.selectProp,
        originalProp: props.rowData[props.bodyItem.edit.selectProp]
      };
      parame = Object.assign(parame, selPar);
    }
    $emits('rowConfirm', parame);
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
  if (props.bodyItem.edit.type === 'select') {
    let tSI = tableSelectInput.value as any;
    tSI?.removeEventListener('mouseenter', mouseEnter);
    tSI?.removeEventListener('mouseleave', mouseLeave);
  } else {
    let dateDom = document.getElementById(state.nowDateId);
    dateDom?.removeEventListener('mouseenter', mouseEnter);
    dateDom?.removeEventListener('mouseleave', mouseLeave);
  }
}
// 失去焦点触发
function blurInput() {
  if (!state.isConfirm) {
    if (
      props.bodyItem.edit.type === 'date' ||
      props.bodyItem.edit.type === 'year' ||
      props.bodyItem.edit.type === 'month' ||
      props.bodyItem.edit.type === 'dates' ||
      props.bodyItem.edit.type === 'datetime' ||
      props.bodyItem.edit.type === 'week' ||
      props.bodyItem.edit.type === 'datetimerange' ||
      props.bodyItem.edit.type === 'daterange' ||
      props.bodyItem.edit.type === 'monthrange' ||
      props.bodyItem.edit.type === 'select'
    ) {
      // 日期框特殊处理
      if (props.bodyItem.edit.type !== 'select') {
        let dateDom = document.getElementById(state.nowDateId) as any;
        dateDom.style.display = 'none';
        if (state.dateRow) {
          // 点击行内确认按钮
          rowConfirm();
        }
      }
      removeListener();
    }
    state.isEdit = false;
  } else {
    // 点击弹出框不失去焦点
    if (
      props.bodyItem.edit.type === 'date' ||
      props.bodyItem.edit.type === 'year' ||
      props.bodyItem.edit.type === 'month' ||
      props.bodyItem.edit.type === 'dates' ||
      props.bodyItem.edit.type === 'datetime' ||
      props.bodyItem.edit.type === 'week' ||
      props.bodyItem.edit.type === 'datetimerange' ||
      props.bodyItem.edit.type === 'daterange' ||
      props.bodyItem.edit.type === 'monthrange'
    ) {
      let tRI = tableRowInput.value as any;
      tRI.focus();
    }
  }
}
// 下拉选框出现/隐藏
function visibleChange(type: boolean) {
  let tSI = tableSelectInput.value as any;
  let nowSelectDom = tSI.querySelector('.el-select .el-input__inner');
  if (!type) {
    state.showConfirmBtn = true;
    nowSelectDom?.addEventListener('blur', blurInput);
  } else {
    state.showConfirmBtn = false;
    nowSelectDom?.removeEventListener('blur', blurInput);
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
      background: #fff;
    }
    ::v-deep .el-input input::-webkit-outer-spin-button,
    ::v-deep .el-input input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    // 下拉选框
    ::v-deep .custom-el-multiple .el-input__inner {
      color: #fff;
    }
    ::v-deep .custom-el-multiple .el-select__tags .el-tag--info {
      background-color: #f0f2f5;
      height: 22px;
      line-height: 22px;
      margin: 2px 0 2px 6px;
      display: inline-block;
      padding: 0 8px;
      border-radius: 4px;
    }
    ::v-deep .custom-el-multiple .el-select__tags-text {
      text-overflow: ellipsis;
      display: inline-block;
      overflow-x: hidden;
      vertical-align: bottom;
      color: #909399;
      line-height: 22px;
      font-size: 12px;
    }
    ::v-deep .custom-el-multiple .el-select__tags .el-tag .el-icon-close {
      background-color: transparent;
      border-radius: 50%;
      text-align: center;
      position: relative;
      cursor: pointer;
      font-size: 12px;
      height: 16px;
      width: 16px;
      line-height: 16px;
      vertical-align: middle;
      top: 0px;
      color: #909399;
      right: -5px;
    }
    ::v-deep .custom-el-multiple .el-select__tags .el-tag .el-icon-close:hover {
      background-color: #909399;
      color: #fff;
      right: -5px;
    }
  }
}
</style>

<template>
  <div
    class="lazy-table-list-col-box"
    :style="[{ width: props.bodyItem.copy ? 'calc(100% - 14px)' : '' }]"
    :tip="props.bodyItem.tip === undefined ? (config.tip ? 'show' : 'hide') : props.bodyItem.tip ? 'show' : 'hide'"
    @dblclick="dobleClick"
  >
    <!-- 状态 -->
    <State
      v-if="props.bodyItem.state !== undefined || props.bodyItem.ico !== undefined ? true : false"
      :bodyItem="props.bodyItem"
      :rowData="rowData"
    >
    </State>
    <!-- 编辑时显示 -->
    <div
      class="table-edit-box"
      v-show="state.isEdit"
      @mouseenter="state.isConfirm = true"
      @mouseleave="state.isConfirm = false"
      :style="[
        {
          width: `${
            props.bodyItem.state === undefined && props.bodyItem.ico === undefined
              ? '100%'
              : props.bodyItem.ico !== undefined && props.bodyItem.state !== undefined
              ? 'calc(100% - 37px)'
              : props.bodyItem.ico !== undefined
              ? 'calc(100% - 21px)'
              : 'calc(100% - 16px)'
          }`
        }
      ]"
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
          autosize
          suffix-icon="iconfont"
          @blur="blurInput"
          v-model="state.editData"
          :type="props.bodyItem.edit.type"
        />
      </template>
      <!-- select 下拉选框 -->
      <div ref="tableSelectInput" v-else-if="props.bodyItem.edit.type === 'select'">
        <el-select
          :class="$tool.isArray(state.editData) ? 'custom-el-multiple' : ''"
          v-model="state.editData"
          :filterable="!$tool.isArray(state.editData)"
          :multiple="$tool.isArray(state.editData)"
          collapse-tags
          ref="tableRowInput"
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
          class="custom-date-picker"
          :clearable="false"
          :value-format="props.bodyItem.edit.valueFormat || 'YYYY-MM-DD'"
          :format="props.bodyItem.edit.format || 'YYYY-MM-DD'"
          @change="dateChange"
          @panelc-hange="dateChange"
          @visible-change="dateVisiblechange"
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
    <Row :bodyItem="props.bodyItem" :rowData="props.rowData" ref="rowRef"></Row>
  </div>
</template>
<script lang="ts" setup>
import { config } from '../../config';
import { defineEmits, defineProps, reactive, ref } from 'vue';
import { inspect } from '@/utils/inspect';
import State from './components/State.vue';
import Row from './components/Row.vue';
const props = defineProps({
  bodyItem: <any>Object, // 表格列设置
  rowData: <any>Object //行数据
});
const $emits = defineEmits(['row-confirm']);
const state = reactive<any>({
  editData: props.rowData[props.bodyItem.prop],
  isEdit: false,
  isConfirm: true, // 鼠标是否在输入框内
  nowRowIndex: null, // 当前行序号
  showConfirmBtn: true // 显示确认按钮
});
const tableRowInput = ref(null); // 编辑输入框
const tableSelectInput = ref(null); // 下拉选dom
const rowRef = ref(null);
// 双击事件
function dobleClick(event: any) {
  if (props.bodyItem.edit) {
    // 清除单击事件
    if (typeof props.bodyItem.click !== undefined) {
      let rowR = rowRef.value as any;
      rowR.clearTimer();
    }
    // 编辑绑定数据赋值
    if (props.bodyItem.edit.type === 'select') {
      state.editData = props.rowData[props.bodyItem.edit.selectProp];
      window.addEventListener('click', clickSelDom);
    } else {
      state.editData = props.rowData[props.bodyItem.prop];
    }
    state.isEdit = true;

    // 获取当前序号
    for (let i = 0; i < event.path.length; i++) {
      if (event.path[i].nodeName === 'TR') {
        state.nowRowIndex = event.path[i].rowIndex;
        break;
      }
    }
    // 输入框自动获得焦点
    let tRI = tableRowInput.value as any;
    setTimeout(() => {
      tRI.focus();
    });
  }
}
// 行编辑确认
function rowConfirm() {
  if (
    state.editData !== props.rowData[props.bodyItem.prop] &&
    state.editData !== props.rowData[props.bodyItem.edit.selectProp]
  ) {
    // 有验证规则，且不能为下拉选框
    if (props.bodyItem.edit.inspect && props.bodyItem.edit.type !== 'select') {
      if (typeof props.bodyItem.edit.inspect === 'string') {
        let ins = inspect as any;
        if (typeof ins[props.bodyItem.edit.inspect] === 'function') {
          let insRes = ins[props.bodyItem.edit.inspect](state.editData);
          if (!insRes) {
            ElMessage.error(props.bodyItem.edit.err || '验证失败！');
            let tRI = tableRowInput.value as any;
            tRI.focus();
            return;
          }
        } else {
          if (ins[props.bodyItem.edit.inspect] === undefined) {
            console.error('验证规则未定义');
          } else {
            console.error('inspect not a function，请前往/src/utils/inspect.ts 检查');
          }
          let tRI = tableRowInput.value as any;
          tRI.focus();
          return;
        }
      } else {
        console.error('请检查inspect类型，仅支持 string');
        let tRI = tableRowInput.value as any;
        tRI.focus();
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
      if ($tool.isArray(props.rowData[props.bodyItem.edit.selectProp])) {
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
    $emits('row-confirm', parame);
  }
  state.isEdit = false;
}
// input失去焦点触发
function blurInput() {
  if (!state.isConfirm) {
    state.isEdit = false;
  }
}
// select 空白点击失去编辑状态
function clickSelDom(event: any) {
  if (props.bodyItem.edit.type === 'select') {
    state.isEdit = false;
  } else {
    if (event.target.localName !== 'input' && event.target.localName !== 'svg') {
      state.isEdit = false;
    }
  }
  window.removeEventListener('click', clickSelDom);
}
// 下拉选弹框显隐
function visibleChange(type: boolean) {
  state.showConfirmBtn = !type;
}
// 日期框面板改变（持续获得焦点）
function dateChange() {
  let tRI = tableRowInput.value as any;
  tRI.focus();
}
// 日期弹框显隐
function dateVisiblechange(show: boolean) {
  state.isEdit = show;
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
  // 单行编辑
  .table-edit-box {
    position: relative;
    .icon-queren {
      position: absolute;
      right: 8px;
      top: 5px;
      cursor: pointer;
      background: #fff;
      z-index: 99;
    }
    ::v-deep .el-input__wrapper {
      width: 100%;
      box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
    }
    ::v-deep .el-input input::-webkit-outer-spin-button,
    ::v-deep .el-input input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    // 下拉选框
    ::v-deep .custom-el-multiple .el-input__inner {
      color: #fff;
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
    ::v-deep .el-select .el-input__inner,
    ::v-deep .el-date-editor .el-input__inner,
    ::v-deep .custom-el-multiple .el-input__inner {
      border-color: #409eff;
    }
  }
}
</style>

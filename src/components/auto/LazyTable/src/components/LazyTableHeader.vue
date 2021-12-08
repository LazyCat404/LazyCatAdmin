<template>
  <!-- 标题 -->
  <span :style="[{ color: `${state.selected || state.checked.length ? '#409eff' : '#909399'}` }]">{{
    props.headerItem.label
  }}</span>
  <!-- 排序 -->
  <span class="table-header-sort" v-if="props.headerItem.sort ? true : false">
    <i class="iconfont icon-shaixuanjiantoushang" sign="asc" />
    <i class="iconfont icon-shaixuanjiantouxia" sign="des" />
  </span>
  <!-- 筛选 -->
  <el-popover
    v-if="props.headerItem.filter ? true : false"
    popper-class="custom-el-popover"
    v-model:visible="state.visible"
    placement="bottom"
    width="auto"
  >
    <!-- 筛选列表（弹出层） -->
    <div>
      <!-- 单选 -->
      <template v-if="state.filterType == 'select'">
        <ul class="table-header-filter-select">
          <li
            v-for="(item, i) in state.filterList"
            :key="i"
            @click="handleRadioChange(item)"
            :class="state.selected == item ? 'table-header-filter-select-active' : ''"
          >
            {{ item.label }}
          </li>
        </ul>
      </template>
      <!-- 复选（默认） -->
      <template v-else>
        <el-checkbox-group v-model="state.checkItem" @change="handleCheckedChange">
          <el-checkbox v-for="(item, i) in state.filterList" :key="i" :label="item">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
        <!-- 全选、确认、取消 -->
        <div class="table-filter-btn">
          <el-checkbox v-model="state.checkAll" :indeterminate="state.isIndeterminate" @change="handleCheckAllChange">
          </el-checkbox>
          <el-button type="text" :disabled="state.disabledBtn" @click="confirmFilter(1)">确认</el-button>
          <el-button type="text" :disabled="state.disabledBtn" @click="confirmFilter(0)">取消</el-button>
        </div>
      </template>
    </div>
    <!-- 筛选按钮 -->
    <template #reference>
      <span
        class="table-header-filter"
        :style="[{ color: `${state.selected || state.checked.length ? '#409eff' : '#909399'}` }]"
      >
        <i class="iconfont icon-shaixuan" />
      </span>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, reactive } from 'vue';
const props = defineProps({
  headerItem: <any>Object
});
const $emits = defineEmits(['filterChange']);
const state = <any>reactive({
  visible: false,
  isIndeterminate: false,
  filterList: [], // 筛选列表
  filterType: '', // 筛选类型 select:单选，check:复选
  checkAll: false, // 是否全选
  selected: null, // （上次确定）单选选项
  checkItem: [], // 复选已选项
  checked: [], // （上次确定）复选选项
  disabledBtn: true // 确定/取消是否禁用
});
// 全选
function handleCheckAllChange(val: boolean) {
  state.checkItem = val ? state.filterList : [];
  state.isIndeterminate = false;
  if (!val && !state.checked.length) {
    state.disabledBtn = true;
  } else {
    state.disabledBtn = false;
  }
}
// 复选
function handleCheckedChange(value: Array<any>) {
  const checkedCount = value.length;
  state.checkAll = checkedCount === state.filterList.length;
  state.isIndeterminate = checkedCount > 0 && checkedCount < state.filterList.length;
  state.disabledBtn = false;
}
// 单选
function handleRadioChange(value: any) {
  if (state.selected != value) {
    state.selected = value;
  } else {
    state.selected = null;
  }
  $emits('filterChange', {
    type: '单选',
    prop: props.headerItem.prop,
    item: state.selected
  });
}
// 确认/取消
function confirmFilter(type: number) {
  if (!type) {
    state.checkItem = state.checked;
    handleCheckedChange(state.checkItem);
  } else {
    state.checked = state.checkItem;
    state.visible = false;
    $emits('filterChange', {
      type: '多选',
      prop: props.headerItem.prop,
      item: state.checked
    });
  }
  state.disabledBtn = true;
}
// 初始化
function init() {
  state.filterList = props.headerItem.filter
    ? props.headerItem.filter.list
      ? props.headerItem.filter.list
      : props.headerItem.filter
    : [];
  if (props.headerItem.filter) {
    state.filterType = props.headerItem.filter.type ? props.headerItem.filter.type : 'check';
  }
}
init();
</script>
<style lang="scss" scoped>
// 排序
.table-header-sort {
  position: relative;
  margin-left: 5px;
}
.table-header-sort > i {
  cursor: pointer;
  font-size: 10px;
  position: absolute;
  transform: scale(0.8);
}
.table-header-sort > i[sign='asc'] {
  top: -6px;
}
.table-header-sort > i[sign='des'] {
  top: 3px;
}
// 筛选
.table-header-filter {
  margin-left: 5px;
}
.table-header-filter > i {
  cursor: pointer;
  font-size: 10px;
}
.table-header-filter > i:hover,
.table-header-sort > i:hover {
  color: #409eff;
}
// 复选
.el-checkbox-group {
  padding: 10px;
  padding-bottom: 0;
  .el-checkbox {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    margin: 0;
    height: auto;
    margin-bottom: 15px;
    max-width: 200px;
    ::v-deep .el-checkbox__label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.table-filter-btn {
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding: 10px;
  padding-top: 0;

  .el-checkbox {
    height: auto;
    margin-right: 10px;
  }
  .el-button--text {
    min-height: auto;
    padding: 0;
  }
}
// 单选
.table-header-filter-select {
  padding: 5px 0;
  li {
    padding: 11px 20px;
    cursor: pointer;
  }
  li:hover {
    color: #409eff;
  }
  li.table-header-filter-select-active {
    color: #409eff;
    background-color: #ecf0fd;
  }
}
</style>

<style>
.custom-el-popover {
  min-width: auto !important;
  padding: 0 !important;
}
</style>

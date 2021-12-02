<template>
  <!-- 标题 -->
  <span>{{ props.headerItem.label }}</span>
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
        <el-radio-group v-model="state.selectItem" @change="handleRadioChange">
          <el-radio-button v-for="(item, i) in state.filterList" :key="i" :label="JSON.stringify(item)">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </template>
      <!-- 复选（默认） -->
      <template v-else>
        <el-checkbox-group v-model="state.checkItem" @change="handleCheckedChange">
          <el-checkbox v-for="(item, i) in state.filterList" :key="i" :label="item">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
        <!-- 全选、确认、取消 -->
        <div>
          <el-checkbox v-model="state.checkAll" :indeterminate="state.isIndeterminate" @change="handleCheckAllChange">
          </el-checkbox>
          <span>确认</span>
          <span>取消</span>
        </div>
      </template>
    </div>
    <!-- 筛选按钮 -->
    <template #reference>
      <span class="table-header-filter">
        <i class="iconfont icon-shaixuan" />
      </span>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineProps, reactive } from 'vue';
const props = defineProps({
  headerItem: <any>Object
});
const state = <any>reactive({
  visible: false,
  isIndeterminate: false,
  filterList: [], // 筛选列表
  filterType: '', // 筛选类型 select:单选，check:复选
  checkAll: false, // 是否全选
  checkItem: [], // 复选已选项
  selectItem: null // 单选已选项（json符串）
});
console.log('自定义表头', props.headerItem);
// 全选
function handleCheckAllChange(val: boolean) {
  state.checkItem = val ? state.filterList : [];
  state.isIndeterminate = false;
}
// 复选
function handleCheckedChange(value: Array<any>) {
  const checkedCount = value.length;
  state.checkAll = checkedCount === state.filterList.length;
  state.isIndeterminate = checkedCount > 0 && checkedCount < state.filterList.length;
}
// 单选
function handleRadioChange(value: any) {
  console.log(value);
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
</style>

<style lang="scss">
.custom-el-popover.el-popper {
  min-width: auto;
}
</style>

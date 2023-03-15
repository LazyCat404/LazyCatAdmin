<template>
  <!-- 标题（编辑） -->
  <span :style="[{ color: `${obj.selected || obj.checked.length || obj.sort ? '#409eff' : '#333333'}` }]">
    {{ props.headerItem.label }}
    <i
      class="iconfont icon-bianji_o"
      v-if="
        props.headerItem.edit !== undefined && props.headerItem.edit !== false && props.headerItem.edit.show !== false
      "
    ></i>
  </span>
  <!-- 排序 -->
  <span class="table-header-sort caret-wrapper" v-if="props.headerItem.sort === undefined ? false : true">
    <i
      class="sort-caret ascending"
      sign="asc"
      :style="[{ borderBottomColor: `${obj.sort == 'ASC' ? '#409eff !important' : ''}` }]"
      @click="handleSort('ASC')"
    />
    <i
      class="sort-caret descending"
      sign="des"
      :style="[{ borderTopColor: `${obj.sort == 'DES' ? '#409eff !important' : ''}` }]"
      @click="handleSort('DES')"
    />
  </span>
  <!-- 筛选 -->
  <el-popover
    v-if="props.headerItem.filter ? true : false"
    popper-class="custom-el-popover"
    placement="bottom"
    width="auto"
    trigger="click"
  >
    <!-- 筛选列表（弹出层） -->
    <template #default>
      <!-- 单选 -->
      <template v-if="obj.filterType == 'select'">
        <ul class="table-header-filter-select">
          <li
            v-for="(item, i) in obj.filterList"
            :key="i"
            @click="handleRadioChange(item)"
            :class="obj.selected == item ? 'table-header-filter-select-active' : ''"
          >
            {{ item.label }}
          </li>
        </ul>
      </template>
      <!-- 复选（默认） -->
      <template v-else>
        <el-checkbox-group v-model="obj.checkItem" @change="handleCheckedChange">
          <el-checkbox v-for="(item, i) in obj.filterList" :key="i" :label="item">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
        <!-- 全选、确认、取消 -->
        <div class="table-filter-btn">
          <el-checkbox v-model="obj.checkAll" :indeterminate="obj.isIndeterminate" @change="handleCheckAllChange">
          </el-checkbox>
          <el-button link :disabled="obj.disabledBtn" @click="confirmFilter(1)">确认</el-button>
          <el-button link :disabled="obj.disabledBtn" @click="confirmFilter(0)">取消</el-button>
        </div>
      </template>
    </template>
    <!-- 筛选按钮 -->
    <template #reference>
      <span
        class="table-header-filter el-icon"
        :style="[
          {
            color: `${obj.selected || obj.checked.length ? '#409eff' : '#909399'}`,
            marginLeft: `${props.headerItem.sort === undefined ? '5px' : '0px'}`
          }
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
          ></path>
        </svg>
      </span>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, reactive } from 'vue';
const props = defineProps<{ headerItem: any }>();
const $emits = defineEmits(['filterChange', 'sortChange']);
const obj = reactive<any>({
  isIndeterminate: false, // 半选状态
  filterList: [], // 筛选列表
  filterType: '', // 筛选类型 select:单选，check:复选
  checkAll: false, // 是否全选
  selected: null, // （上次确定）单选选项
  checkItem: [], // 复选已选项
  checked: [], // （上次确定）复选选项
  disabledBtn: true, // 确定/取消是否禁用
  sort: null // 排序，ASC 升序；DES 降序
});
// 全选
function handleCheckAllChange(val: boolean) {
  obj.checkItem = val ? obj.filterList : [];
  obj.isIndeterminate = false;
  if (!val && !obj.checked.length) {
    obj.disabledBtn = true;
  } else {
    obj.disabledBtn = false;
  }
}
// 复选
function handleCheckedChange(value: Array<any>) {
  const checkedCount = value.length;
  obj.checkAll = checkedCount === obj.filterList.length;
  obj.isIndeterminate = checkedCount > 0 && checkedCount < obj.filterList.length;
  obj.disabledBtn = false;
}
// 单选
function handleRadioChange(value: any) {
  if (obj.selected != value) {
    obj.selected = value;
  } else {
    obj.selected = null;
  }
  $emits('filterChange', {
    type: '单选',
    prop: props.headerItem.prop,
    item: obj.selected
  });
}
// 确认/取消
function confirmFilter(type: number) {
  if (!type) {
    obj.checkItem = obj.checked;
    handleCheckedChange(obj.checkItem);
  } else {
    obj.checked = obj.checkItem;
    $emits('filterChange', {
      type: '多选',
      prop: props.headerItem.prop,
      item: obj.checked
    });
  }
  obj.disabledBtn = true;
}
// 排序
function handleSort(type: string) {
  if (obj.sort === type) {
    obj.sort = null;
  } else {
    obj.sort = type;
  }
  $emits('sortChange', {
    type: obj.sort,
    prop: props.headerItem.prop
  });
}
// 初始化
function init() {
  // 默认排序
  if (props.headerItem.sort !== undefined) {
    if (props.headerItem.sort) {
      obj.sort = props.headerItem.sort.toLocaleUpperCase();
    } else {
      obj.sort = null;
    }
  }
  // 过滤列表
  obj.filterList = props.headerItem.filter
    ? props.headerItem.filter.list
      ? props.headerItem.filter.list
      : props.headerItem.filter
    : [];
  if (props.headerItem.filter) {
    obj.filterType = props.headerItem.filter.type ? props.headerItem.filter.type : 'check';
  }
}
init();
</script>
<style lang="scss" scoped>
// 排序
.table-header-sort {
  .ascending:hover {
    border-bottom-color: #409eff91 !important;
  }
  .descending:hover {
    border-top-color: #409eff91 !important;
  }
}

// 筛选

.table-header-filter {
  cursor: pointer;
  position: relative;
  top: 2px;
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
.table-header-filter:hover {
  color: #409eff !important;
}
</style>

<style>
.custom-el-popover {
  min-width: auto !important;
  padding: 0 !important;
}
</style>

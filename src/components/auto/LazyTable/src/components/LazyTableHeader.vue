<template>
  <div class="lazy-table-header-wrapper">
    <!-- 标题（编辑） -->
    <span class="table-header-title" v-hide>
      <span
        :style="[
          {
            ...tableConfig.headerStyle,
            color: `${
              obj.selected || obj.checked.length || (obj.sort && obj.sort.type)
                ? tableConfig.headerActiveColor
                : tableConfig.headerColor
            }`
          }
        ]"
      >
        {{ props.headerItem.label }}
      </span>
    </span>
    <!-- 编辑 -->
    <i
      class="table-header-edit iconfont icon-bianji_o"
      :style="[
        {
          color: `${
            obj.selected || obj.checked.length || obj.sort ? tableConfig.headerActiveColor : tableConfig.headerColor
          }`
        }
      ]"
      v-if="
        props.headerItem.edit !== undefined && props.headerItem.edit !== false && props.headerItem.edit.show !== false
      "
    >
    </i>
    <!-- 排序 -->
    <span class="table-header-sort" v-if="props.headerItem.sort ? true : false">
      <i
        class="sort-caret ascending"
        sign="asc"
        :style="[
          { borderBottomColor: `${obj.sort.type == 'ASC' ? `${tableConfig.headerActiveColor} !important` : ''}` }
        ]"
        @click="handleSort('ASC')"
      >
      </i>
      <i
        class="sort-caret descending"
        sign="des"
        :style="[{ borderTopColor: `${obj.sort.type == 'DES' ? `${tableConfig.headerActiveColor} !important` : ''}` }]"
        @click="handleSort('DES')"
      >
      </i>
    </span>
    <!-- 筛选 -->
    <el-popover
      v-if="props.headerItem.filter ? true : false"
      placement="bottom"
      width="auto"
      :popper-style="{
        'min-width': 'auto',
        padding: '10px'
      }"
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
              :onMouseenter="selectListHover"
              :onMouseleave="selectListHover"
              @click="handleRadioChange(item)"
              :class="obj.selected == item ? 'table-header-filter-select-active' : ''"
            >
              {{ item.label }}
              <!-- 渲染背景色 -->
              <span v-if="obj.selected == item" :style="{ backgroundColor: tableConfig.headerActiveColor }"></span>
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
            <el-button link :disabled="obj.disabledBtn" @click="confirmFilter(1)"> 确认 </el-button>
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
              color: `${obj.selected || obj.checked.length ? tableConfig.headerActiveColor : tableConfig.headerColor}`,
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
  </div>
</template>
<script lang="ts" setup>
import { CheckboxValueType } from 'element-plus';
import { reactive } from 'vue';
const props = defineProps<{ headerItem: any; tableConfig: any }>();
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
function handleCheckAllChange(val: CheckboxValueType) {
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
    key:
      typeof props.headerItem.filter == 'boolean'
        ? props.headerItem.prop
        : props.headerItem.filter.key
          ? props.headerItem.filter.key
          : props.headerItem.prop,
    value: obj.selected
  });
}
// 单选列表hover 样式
function selectListHover(payload: MouseEvent) {
  if (payload.target) {
    if ((payload.target as any).className.includes('table-header-filter-select-active')) {
      (payload.target as any).style.color = props.tableConfig.headerActiveColor;
    } else {
      if (payload.type == 'mouseenter') {
        // 悬停
        (payload.target as any).style.color = props.tableConfig.headerActiveColor;
      } else {
        // 离开
        (payload.target as any).style.color = props.tableConfig.headerColor;
      }
    }
  }
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
      key:
        typeof props.headerItem.filter == 'boolean'
          ? props.headerItem.prop
          : props.headerItem.filter.key
            ? props.headerItem.filter.key
            : props.headerItem.prop,
      value: obj.checked
    });
  }
  obj.disabledBtn = true;
}
// 排序
function handleSort(type: string) {
  obj.sort.type = obj.sort.type === type ? null : type;
  $emits('sortChange', obj.sort);
}
// 初始化
(function init() {
  // 默认排序
  if (props.headerItem.sort) {
    if (Object.prototype.toString.call(props.headerItem.sort) === '[object Object]') {
      obj.sort = {
        type: props.headerItem.sort.type.toLocaleUpperCase(),
        key: props.headerItem.sort.key || props.headerItem.prop
      };
    } else if (typeof props.headerItem.sort === 'string') {
      obj.sort = {
        type: props.headerItem.sort.toLocaleUpperCase(),
        key: props.headerItem.prop
      };
    } else {
      obj.sort = {
        type: null,
        key: props.headerItem.prop
      };
    }
    // 错误提示
    if (!obj.sort.key) {
      console.warn('请确保表头排序拥有正确的 key 值');
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
})();
</script>
<style lang="scss" scoped>
.lazy-table-header-wrapper {
  --headerActiveColor: v-bind(tableConfig.headerActiveColor);
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  // 编辑
  .table-header-edit {
    margin-left: 5px;
  }
  // 排序
  .table-header-sort {
    position: relative;
    width: 16px;
    height: 14px;
    min-width: 16px;
    top: 2px;
    .sort-caret {
      cursor: pointer;
    }
    .ascending:hover {
      border-bottom-color: var(--headerActiveColor) !important;
      opacity: 0.91;
    }
    .descending:hover {
      border-top-color: var(--headerActiveColor) !important;
      opacity: 0.91;
    }
  }
  // 筛选
  .table-header-filter {
    cursor: pointer;
    position: relative;
    top: 1px;
  }
  .table-header-filter:hover {
    color: var(--headerActiveColor) !important;
  }
}
// 复选
.el-checkbox-group {
  padding-top: 10px;
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
  .el-checkbox {
    height: auto;
    margin-right: 8px;
  }
  .el-button--text {
    min-height: auto;
    padding: 0;
  }
}
// 单选
.table-header-filter-select {
  li {
    line-height: 30px;
    padding: 0 10px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
  }
  li.table-header-filter-select-active {
    > span {
      opacity: 0.1;
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
}
</style>

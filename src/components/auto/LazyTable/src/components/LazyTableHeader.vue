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
    <!-- 提示 -->
    <el-tooltip
      v-if="props.headerItem.headTip"
      placement="top"
      :content="props.headerItem.headTip"
      :raw-content="props.headerItem.headTip.includes('<br />')"
    >
      <img
        style="width: 16px; margin-left: 5px; cursor: pointer"
        src="data:image/svg+xml,<svg  xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'><path fill='currentColor' d='M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z'></path></svg>"
      />
    </el-tooltip>
    <!-- 筛选 -->
    <el-dropdown placement="bottom" v-if="props.headerItem.filter ? true : false" @command="handleRadioChange">
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
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, i) in obj.filterList"
            :key="i"
            :command="item"
            :class="{ 'el-dropdown-menu__active': obj.selected == item }"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
const props = defineProps<{ headerItem: any; tableConfig: any }>();
const $emits = defineEmits(['filterChange', 'sortChange']);
const obj = reactive<any>({
  isIndeterminate: false, // 半选状态
  filterList: [], // 筛选列表
  checkAll: false, // 是否全选
  selected: null, // （上次确定）单选选项
  checkItem: [], // 复选已选项
  checked: [], // （上次确定）复选选项
  disabledBtn: true, // 确定/取消是否禁用
  sort: null, // 排序，ASC 升序；DES 降序
  filterKey: '' // 筛选key
});

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

// 排序
function handleSort(type: string) {
  obj.sort.type = obj.sort.type === type ? null : type;
  $emits('sortChange', obj.sort);
}
// 清除筛选
function clearFilter() {
  obj.selected = null;
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

  if (props.headerItem.filter) {
    // 过滤列表
    obj.filterList = props.headerItem.filter
      ? props.headerItem.filter.list
        ? props.headerItem.filter.list
        : props.headerItem.filter
      : [];
    obj.filterKey =
      typeof props.headerItem.filter == 'boolean'
        ? props.headerItem.prop
        : props.headerItem.filter.key
          ? props.headerItem.filter.key
          : props.headerItem.prop;
  }
})();
defineExpose({
  clearFilter,
  filterKey: obj.filterKey
});
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
</style>

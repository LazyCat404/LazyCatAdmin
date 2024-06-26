<template>
  <div class="option-wrapper">
    <el-scrollbar>
      <!-- 已选条件列表 -->
      <ul class="finish-select-list" v-if="obj.finishSelectList && obj.finishSelectList.length">
        <li v-for="(item, i) in obj.finishSelectList" :key="i">
          {{ item.label }}：{{ item.showValue !== undefined ? item.showValue : item.value }}
          <i @click="closeFinish(item)">
            <svg t="1697076334981" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1868">
              <path
                d="M512 102.4a409.6 409.6 0 1 0 409.6 409.6A409.6 409.6 0 0 0 512 102.4z m130.389333 496.469333a30.72 30.72 0 0 1-43.52 43.52L512 555.52l-86.869333 86.869333a30.72 30.72 0 1 1-43.52-43.52L468.48 512l-86.869333-86.869333a30.72 30.72 0 1 1 43.52-43.52L512 468.48l86.869333-86.869333a30.72 30.72 0 1 1 43.52 43.52L555.52 512z"
                fill="#69769c"
                p-id="1869"
              ></path>
            </svg>
          </i>
        </li>
      </ul>
    </el-scrollbar>
    <!-- 选定条件Label -->
    <div
      class="condition-label-box"
      :style="{ 'padding-left': obj.finishSelectList && obj.finishSelectList.length ? '11px' : '' }"
      v-if="filter.label"
    >
      {{ filter.label }}：
    </div>
    <!-- 可选条件/条件value -->
    <div
      class="condition-select-box"
      :style="{
        'padding-left': obj.finishSelectList && obj.finishSelectList.length ? '11px' : '',
        'min-width': filter.list.length ? '300px' : ''
      }"
    >
      <div class="filter-value-box">
        <!-- 时间选择 -->
        <el-time-picker
          v-if="filter.type == 'time' || filter.type == 'timerange'"
          v-model="filter.value"
          :clearable="false"
          :editable="false"
          :teleported="false"
          :format="varyingFormat.format"
          :value-format="varyingFormat.valueFormat"
          @visible-change="conditionVisibleChange"
          :placeholder="obj.placeholder"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :is-range="filter.type == 'timerange'"
        />
        <!-- 日期选择 -->
        <el-date-picker
          v-else-if="
            filter.type == 'daterange' ||
            filter.type == 'date' ||
            filter.type == 'monthrange' ||
            filter.type == 'month' ||
            filter.type == 'week' ||
            filter.type == 'year'
          "
          v-model="filter.value"
          :type="filter.type"
          :clearable="false"
          :editable="false"
          :teleported="false"
          :format="varyingFormat.format"
          :value-format="varyingFormat.valueFormat"
          @visible-change="conditionVisibleChange"
          :placeholder="obj.placeholder"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <!-- 下拉选项 -->
        <el-select
          v-else-if="filter.type == 'select'"
          v-model="filter.value"
          :placeholder="obj.placeholder"
          @visible-change="conditionVisibleChange"
        >
          <el-option v-for="item in filter.valueList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <!-- 选项输入 -->
        <el-input
          v-else
          ref="filterValue"
          :readonly="filter.type == 'time' ? true : false"
          v-model="filter.value"
          :placeholder="obj.placeholder"
          @focus="inputFocus"
          @blur="inputBlur"
          @input="conditionInput"
          @keyup.enter="conditionEnter"
        />
        <!-- 清空按钮 -->
        <el-icon>
          <CircleCloseFilled v-if="filter.label || obj.finishSelectList.length" @click="emptyFinish" />
          <Search v-else />
        </el-icon>
      </div>
      <!-- 可选条件列表 -->
      <div class="dropdown-list-box">
        <!-- 搜索条件选择 -->
        <el-popover trigger="contextmenu" :visible="filter.show" :teleported="false">
          <template #reference>
            <span></span>
          </template>
          <ul>
            <li v-for="item in filter.list" :key="item.key" @click="conditionClick(item)">
              {{ item.label }}
            </li>
          </ul>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { CircleCloseFilled, Search } from '@element-plus/icons-vue';
interface listItem {
  key: string;
  label: string;
  type?: string;
  list?: Array<any>;
  listProps?: {
    label?: string;
    value?: string;
  };
}
const props = defineProps<{
  list: Array<listItem>; // 全部条件列表
  modelValue?: object;
}>();
const obj = reactive<any>({
  placeholder: '请选择查询条件',
  finishSelectList: [], // 已选条件列表
  popoverTypeList: ['time', 'timerange', 'date', 'daterange', 'month', 'monthrange', 'week', 'year', 'select'],
  dateTimeRangeTypeList: ['timerange', 'daterange', 'monthrange'],
  labelValueTypeList: ['select']
});
const filter = reactive<any>({
  value: '',
  label: '',
  key: '',
  type: '',
  show: false,
  list: [], // 可选条件列表
  valueList: [] // 可选值列表
});
const filterValue = ref();
const $emits = defineEmits(['change']);
watch(
  () => props.modelValue,
  () => {
    init();
  },
  { deep: true }
);
// 计算属性
const varyingFormat = computed(() => {
  let varyingFormat = {
    format: '',
    valueFormat: ''
  };
  switch (filter.type) {
    case 'time':
      varyingFormat.format = 'HH:mm:ss';
      varyingFormat.valueFormat = 'HH:mm:ss';
      break;
    case 'timerange':
      varyingFormat.format = 'HH:mm:ss';
      varyingFormat.valueFormat = 'HH:mm:ss';
      break;
    case 'date':
      varyingFormat.format = 'YYYY/MM/DD';
      varyingFormat.valueFormat = 'YYYY/MM/DD';
      break;
    case 'daterange':
      varyingFormat.format = 'YYYY/MM/DD';
      varyingFormat.valueFormat = 'YYYY/MM/DD';
      break;
    case 'month':
      varyingFormat.format = 'YYYY/MM';
      varyingFormat.valueFormat = 'YYYY/MM';
      break;
    case 'monthrange':
      varyingFormat.format = 'YYYY/MM';
      varyingFormat.valueFormat = 'YYYY/MM';
      break;
    case 'week':
      varyingFormat.format = 'ww';
      varyingFormat.valueFormat = 'ww';
      break;
    case 'year':
      varyingFormat.format = 'YYYY';
      varyingFormat.valueFormat = 'YYYY';
      break;
    default:
      varyingFormat.format = '';
      varyingFormat.valueFormat = '';
      break;
  }
  return varyingFormat;
});
// 条件选中
function conditionClick(item: listItem) {
  filter.key = item.key;
  filter.label = item.label;
  // 类型处理
  if (item.type) {
    filter.type = item.type.toLocaleLowerCase();
  } else if (item.list) {
    if (Object.prototype.toString.call(item.list) == '[object Array]') {
      filter.type = 'select';
      filter.valueList = [];
      if (item.list.length) {
        item.list.forEach(valueListItem => {
          let trimItem: any = {};
          // label
          if (item.listProps && item.listProps.label) {
            trimItem.label = valueListItem[item.listProps.label];
          } else {
            trimItem.label =
              valueListItem.label !== undefined
                ? valueListItem.label
                : valueListItem.name !== undefined
                  ? valueListItem.name
                  : valueListItem.title !== undefined
                    ? valueListItem.title
                    : '';
          }
          // value
          if (item.listProps && item.listProps.value) {
            trimItem.value = valueListItem[item.listProps.value];
          } else {
            trimItem.value =
              valueListItem.value !== undefined
                ? valueListItem.value
                : valueListItem.id !== undefined
                  ? valueListItem.id
                  : valueListItem.key !== undefined
                    ? valueListItem.key
                    : valueListItem.uuid !== undefined
                      ? valueListItem.uuid
                      : valueListItem.code !== undefined
                        ? valueListItem.code
                        : trimItem.label;
          }
          if (!trimItem.label) {
            console.warn(`${item.label}筛选值可选列表项缺少可用label，这可能会影响您的使用`);
          }
          filter.valueList.push(trimItem);
        });
      } else {
        console.warn(`${item.label}筛选值可选列表为空，这可能会影响您的使用`);
      }
    } else {
      filter.type = '';
      console.warn('筛选值可选列表仅支持 Array 类型');
    }
  } else {
    filter.type = '';
  }
  // 值/提示 处理
  if (obj.popoverTypeList.includes(filter.type)) {
    filter.value = '';
    obj.placeholder = `请选择查询的${item.label}`;
  } else {
    obj.placeholder = `请输入查询的${item.label}﹝回车确认﹞`;
  }
  if (filterValue.value) {
    filterValue.value.focus();
  }
}
// 搜索值输入
function conditionInput() {
  if (filter.value) {
    filter.show = false;
  } else {
    filter.show = filter.label ? false : true;
  }
}
// 回车选中
function conditionEnter() {
  if (filter.key && filter.label) {
    if (!filter.value) return;
    if (obj.dateTimeRangeTypeList.includes(filter.type)) {
      obj.finishSelectList.push({
        value: `${filter.value[0]}-${filter.value[1]}`,
        label: filter.label,
        key: filter.key
      });
    } else if (obj.labelValueTypeList.includes(filter.type)) {
      obj.finishSelectList.push({
        value: filter.value,
        showValue: filter.valueList.filter((item: any) => (item.value = filter.value))[0].label,
        label: filter.label,
        key: filter.key
      });
    } else {
      obj.finishSelectList.push({
        value: filter.value,
        label: filter.label,
        key: filter.key
      });
    }
    // 没有绑定值
    if (!props.modelValue) {
      filter.value = '';
      filter.label = '';
      filter.key = '';
      filter.type = '';
      arrangeList();
      obj.placeholder = filter.list.length ? '请选择查询条件' : '';
    }
    // 输入框失去焦点
    if (filterValue.value) {
      filterValue.value.blur();
    }
    // 回调
    $emits('change', obj.finishSelectList);
  } else {
    filter.value = '';
  }
}
// 时间选框显隐改变
function conditionVisibleChange(isVisible: boolean) {
  if (isVisible) {
    return;
  } else {
    conditionEnter();
  }
}
// 关闭单个已选
function closeFinish(item: { key: string; label: string }) {
  obj.finishSelectList = obj.finishSelectList.filter((ite: { key: string }) => ite.key != item.key);
  // 没有绑定值
  if (!props.modelValue) {
    arrangeList();
  }
  if (filter.value || filter.label) {
    if (filterValue.value) {
      filterValue.value.focus();
    }
  } else {
    obj.placeholder = filter.list.length ? '请选择查询条件' : '';
  }
  // 回调
  $emits('change', obj.finishSelectList);
}
// 清空已选
function emptyFinish() {
  filter.list = JSON.parse(JSON.stringify(props.list));
  filter.value = '';
  filter.key = '';
  filter.type = '';
  filter.label = '';
  filter.valueList = [];
  obj.placeholder = '请选择查询条件';
  if (filterValue.value) {
    filterValue.value.blur();
  }
  // 回调
  if (obj.finishSelectList.length) {
    obj.finishSelectList = [];
    $emits('change', obj.finishSelectList);
  }
}
// 处理可选条件列表
function arrangeList() {
  filter.list = [];
  props.list.forEach(item => {
    let isChecked = obj.finishSelectList.filter((ite: { key: string }) => ite.key == item.key);
    if (!isChecked.length) {
      filter.list.push(item);
    }
  });
}
function inputBlur() {
  filter.show = false;
}
function inputFocus() {
  if (filter.label) return;
  filter.show = true;
}
// 初始化
function init() {
  obj.finishSelectList = [];
  filter.value = '';
  filter.label = '';
  filter.key = '';
  filter.type = '';
  filter.show = false;
  filter.list = [];
  filter.valueList = [];
  if (props.modelValue && Object.prototype.toString.call(props.modelValue) === '[object Object]') {
    if (JSON.stringify(props.modelValue) === '{}') {
      filter.list = props.list;
    } else {
      // 构建已选条件
      for (let key in props.modelValue) {
        let finishSelectArr = props.list.filter((item: { key: string }) => item.key == key);
        if (finishSelectArr.length) {
          let finishSelectItem = finishSelectArr[finishSelectArr.length - 1]; // 取最后一个匹配项
          if (
            finishSelectItem.list &&
            Object.prototype.toString.call(finishSelectItem.list) === '[object Array]' &&
            finishSelectItem.list.length
          ) {
            let mateItem: any = {};
            let showValue = '';
            finishSelectItem.list.forEach(item => {
              let isMate = false;
              if (finishSelectItem.listProps && finishSelectItem.listProps.value) {
                isMate = item[finishSelectItem.listProps.value] == (props.modelValue as any)[key];
              } else {
                isMate =
                  item.value !== undefined
                    ? item.value == (props.modelValue as any)[key]
                    : item.id !== undefined
                      ? item.id == (props.modelValue as any)[key]
                      : item.key !== undefined
                        ? item.key == (props.modelValue as any)[key]
                        : item.uuid !== undefined
                          ? item.uuid == (props.modelValue as any)[key]
                          : item.code !== undefined
                            ? item.code == (props.modelValue as any)[key]
                            : false;
              }
              if (isMate) {
                mateItem = item;
              }
            });
            if (finishSelectItem.listProps && finishSelectItem.listProps.label) {
              showValue = mateItem[finishSelectItem.listProps.label];
            } else {
              showValue =
                mateItem.label !== undefined
                  ? mateItem.label
                  : mateItem.name !== undefined
                    ? mateItem.name
                    : mateItem.title !== undefined
                      ? mateItem.title
                      : (props.modelValue as any)[key];
            }
            obj.finishSelectList.push({
              ...finishSelectItem,
              value: (props.modelValue as any)[key],
              showValue
            });
          } else {
            obj.finishSelectList.push({
              ...finishSelectItem,
              value: (props.modelValue as any)[key]
            });
          }
        }
      }
      // 构建可选条件（全部中过滤掉已选）
      for (let i = 0; i < props.list.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(props.modelValue, props.list[i].key)) {
          filter.list.push(props.list[i]);
        }
      }
    }
  } else {
    filter.list = props.list;
  }
  obj.placeholder = filter.list.length ? '请选择查询条件' : '';
}
init();
</script>
<style scoped lang="scss">
.option-wrapper {
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  transition: var(--el-transition-box-shadow);
  padding: 1px 11px;
  display: flex;
  align-items: center;
  .finish-select-list {
    display: flex;
    li {
      white-space: nowrap;
      background-color: #e8edf8;
      color: #69769c;
      font-size: 14px;
      border-radius: 12px;
      padding: 0 35px 0 10px;
      display: flex;
      align-items: center;
      height: 22px;
      position: relative;
      margin-right: 11px;
      i {
        width: 16px;
        position: absolute;
        right: 9px;
        display: flex;
        cursor: pointer;
      }
    }
  }
  .condition-label-box {
    color: #69769c;
    font-size: 14px;
    height: 100%;
    line-height: 100%;
    flex: 0 0 auto;
  }
  .condition-select-box {
    flex: 1;
    position: relative;
    .el-input {
      ::v-deep .el-input__wrapper {
        box-shadow: none;
        padding: 0;
        .el-input__inner {
          color: #69769c;
          font-size: 14px;
        }
      }
    }
    .filter-value-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      // 时间/日期选择
      ::v-deep .el-date-editor,
      ::v-deep .el-select {
        box-shadow: none;
        border: none;
        padding: 0;
        height: 30px;
        line-height: 30px;
        display: flex;
        align-items: center;
        > .el-icon {
          display: none;
        }
        // 日期选框特有
        .el-input__wrapper {
          box-shadow: none !important;
          padding: 0;
          .el-input__prefix,
          .el-input__suffix {
            display: none;
          }
        }
      }
      // 弹出层
      ::v-deep .el-popper {
        // 时间段
        .el-time-panel,
        .el-time-range-picker {
          .el-time-panel__footer {
            .el-time-panel__btn.cancel {
              display: none;
            }
          }
        }
      }
      > .el-icon {
        cursor: pointer;
        svg {
          color: #a8abb2;
        }
      }
    }
    .dropdown-list-box {
      height: 0;
      width: 0;
      position: relative;
      left: 28px;
      top: -5px;
      ::v-deep .el-popper {
        min-width: fit-content;
        width: fit-content !important;
        padding: 6px 0;
        ul {
          li {
            padding: 0 10px;
            margin: 0 10px;
            height: 32px;
            line-height: 32px;
            cursor: pointer;
            white-space: nowrap;
          }
          li:hover {
            background-color: #ecf5ff;
            color: #409eff;
          }
        }
      }
    }
  }
}
.option-wrapper:hover {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}
</style>

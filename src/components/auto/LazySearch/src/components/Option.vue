<template>
  <div class="option-wrapper">
    <el-scrollbar>
      <!-- 已选条件列表 -->
      <ul class="finish-select-list" v-if="obj.finishSelectList && obj.finishSelectList.length">
        <li v-for="(item, i) in obj.finishSelectList" :key="i">
          {{ item.label }}：{{ item.value }}
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
          v-if="filter.type == 'time'"
          v-model="filter.value"
          ref="filterTime"
          :clearable="false"
          :editable="false"
          :teleported="false"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          @visible-change="conditionTimeVisibleChange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          is-range
        />
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
import { reactive, ref, watch } from 'vue';
import { CircleCloseFilled, Search } from '@element-plus/icons-vue';
const props = defineProps<{
  list: Array<any>; // 全部条件列表
  modelValue?: object;
}>();
const obj = reactive<any>({
  placeholder: '请选择查询条件',
  finishSelectList: [] // 已选条件列表
});
const filter = reactive<any>({
  value: '',
  label: '',
  key: '',
  type: '',
  show: false,
  list: [] // 可选条件列表
});
const filterValue = ref();
const filterTime = ref();
const $emits = defineEmits(['change']);
watch(
  () => props.modelValue,
  () => {
    init();
  },
  { deep: true }
);

// 条件选中
function conditionClick(item: { key: string; label: string; type?: string }) {
  filter.key = item.key;
  filter.label = item.label;
  filter.type = item.type ? item.type.toLocaleLowerCase() : '';
  if (item.type == 'time') {
    filter.value = '';
  }
  obj.placeholder = `请输入查询的${item.label}﹝回车确认﹞`;
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
    if (filter.type == 'time') {
      obj.finishSelectList.push({
        value: `${filter.value[0]}-${filter.value[1]}`,
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
function conditionTimeVisibleChange(isVisible: boolean) {
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
  if (props.modelValue && Object.prototype.toString.call(props.modelValue) === '[object Object]') {
    if (JSON.stringify(props.modelValue) === '{}') {
      filter.list = props.list;
    } else {
      // 构建已选条件
      for (let key in props.modelValue) {
        let finishSelectArr = props.list.filter((item: { key: string }) => item.key == key);
        if (finishSelectArr.length) {
          obj.finishSelectList.push({
            ...finishSelectArr[finishSelectArr.length - 1], // 取最后一个匹配项
            value: (props.modelValue as any)[key]
          });
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
      overflow: hidden;
      // 时间选择
      ::v-deep .el-date-editor {
        box-shadow: none;
        padding: 0;
        > .el-icon {
          display: none;
        }
      }
      // 弹出层
      ::v-deep .el-popper {
        // 时间段
        .el-time-range-picker {
          .el-time-panel__footer {
            .el-time-panel__btn.cancel {
              display: none;
            }
          }
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

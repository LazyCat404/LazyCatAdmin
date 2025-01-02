<template>
  <div class="lazy-split-select-wrapper" ref="lazySplitSelectWrapper">
    <el-popover
      placement="bottom"
      trigger="click"
      :width="obj.width"
      v-model:visible="obj.visible"
      @show="popoverShow"
      @hide="popoverHide"
      @before-enter="obj.isHide = false"
      @before-leave="obj.isHide = true"
      :disabled="disabled"
    >
      <template #reference>
        <PopoverBtn
          :multiple="multiple"
          :disabled="disabled"
          :clearable="clearable"
          :isHide="obj.isHide"
          :placeholder="placeholder"
          :selectTarget="obj.selectTarget"
          :listProps="defaultListProps"
          :filterable="filterable"
          :filterMethod="filterMethod"
          @clear="clear"
          @delMultipleValue="delMultipleValue"
        ></PopoverBtn>
      </template>
      <template v-if="data && data.length">
        <Select
          v-if="multiple"
          :data="data"
          :modelValue="modelValue"
          :treeProps="defaultTreeProps"
          :listProps="defaultListProps"
          @change="checkChange"
        ></Select>
        <Radio
          v-else
          :data="data"
          :modelValue="modelValue"
          :treeProps="defaultTreeProps"
          :listProps="defaultListProps"
          @change="radioChange"
        ></Radio>
      </template>
      <div v-else class="split-select-empty">暂无数据</div>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import PopoverBtn from './components/PopoverBtn.vue';
import Select from './components/Select.vue';
import Radio from './components/Radio.vue';
import { computed, onMounted, reactive, ref } from 'vue';

interface Props {
  data: Array<any>;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  filterMethod?: () => void;
  placeholder?: string;
  treeProps?: {
    label?: string;
    list?: string;
    children?: string;
    disabled?: string;
  };
  listProps?: {
    label?: string;
    value?: string;
    disabled?: string;
  };
  modelValue: any;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  disabled: () => false,
  multiple: () => false,
  clearable: () => false,
  filterable: () => false,
  filterMethod: () => undefined,
  placeholder: () => '请选择',
  treeProps: () => {
    return {
      label: 'label',
      list: 'list',
      children: 'children',
      disabled: 'disabled'
    };
  },
  listProps: () => {
    return {
      label: 'label',
      value: 'value',
      disabled: 'disabled'
    };
  }
});
const $emits = defineEmits(['update:modelValue', 'show', 'hide', 'change']);
const obj = reactive<any>({
  isHide: true,
  width: 150,
  visible: false,
  selectTarget: props.multiple ? [] : {} //选中的值
});

// 选项树配置选项
const defaultTreeProps = computed(() => {
  let treeProps: any = {
    label: 'label',
    list: 'list',
    children: 'children',
    disabled: 'disabled'
  };
  let defaultTreeProps: any = {};
  for (let key in treeProps) {
    defaultTreeProps[key] = (props.treeProps as any)[key] || treeProps[key];
  }
  if (defaultTreeProps.list == defaultTreeProps.children) {
    console.error('树结构节点与目标列表不能相同');
  }
  return defaultTreeProps;
});
// 选项列表配置选项
const defaultListProps = computed(() => {
  let listProps: any = {
    label: 'label',
    value: 'value',
    disabled: 'disabled'
  };
  let defaultListProps: any = {};
  for (let key in listProps) {
    defaultListProps[key] = (props.listProps as any)[key] || listProps[key];
  }
  return defaultListProps;
});

// 计算弹出框宽度
const lazySplitSelectWrapper = ref();
function computeWidth() {
  if (lazySplitSelectWrapper.value) {
    obj.width = lazySplitSelectWrapper.value.offsetWidth;
  }
}
// 清空
function clear() {
  if (props.multiple) {
    obj.selectTarget = [];
    $emits('update:modelValue', []);
    $emits('change', [], []);
  } else {
    obj.selectTarget = {};
    $emits('change', '', {});
    $emits('update:modelValue', '');
  }
}
// 单个删除删除多选值
function delMultipleValue() {
  let modelValue = JSON.parse(JSON.stringify(props.modelValue));
  let selectTarget = JSON.parse(JSON.stringify(obj.selectTarget));
  modelValue.shift();
  selectTarget.shift();
  checkChange(modelValue, selectTarget);
}
function popoverShow(par: PointerEvent) {
  $emits('show', par);
}
function popoverHide(par: PointerEvent) {
  $emits('hide', par);
}
// 单选数据改变
function radioChange(val: string | number | boolean, radioItem: any, isUpdata?: boolean) {
  if (!isUpdata) {
    $emits('update:modelValue', val);
    $emits('change', val, JSON.parse(JSON.stringify(radioItem)));
  }
  obj.selectTarget = radioItem;
  obj.visible = false; // 关闭弹出框
}
// 多选数据改变
function checkChange(val: string | number | boolean, checkItem: any, isUpdata?: boolean) {
  if (!isUpdata) {
    $emits('update:modelValue', val);
    $emits('change', JSON.parse(JSON.stringify(val)), JSON.parse(JSON.stringify(checkItem)));
  }
  obj.selectTarget = checkItem;
}
onMounted(() => {
  computeWidth();
});
</script>
<style scoped lang="scss">
.lazy-split-select-wrapper {
  width: 100%;
  height: 100%;
}
.split-select-empty {
  text-align: center;
  color: #909399;
}
</style>

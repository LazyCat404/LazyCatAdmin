<template>
  <div class="popover-btn-wrapper">
    <el-input :placeholder="placeholder" v-model="obj.inputValue" readonly>
      <template #suffix>
        <i
          :class="{
            'el-icon el-select__caret': true,
            'is-reverse': !isHide
          }"
        >
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
            ></path>
          </svg>
        </i>
        <i class="el-icon el-select__caret clearable" v-if="clearable" @click.stop="clear">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
            ></path>
            <path
              fill="currentColor"
              d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
            ></path>
          </svg>
        </i>
      </template>
    </el-input>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';

interface Props {
  isHide: boolean;
  multiple: boolean;
  clearable: boolean;
  placeholder: string;
  selectTarget: object | Array<any>;
  listProps: {
    label: string;
    value: string;
    disabled: string;
  };
}
const props = defineProps<Props>();
const $emits = defineEmits(['clear']);
const obj = reactive<any>({
  inputValue: ''
});
// 选中渲染
function selectTargetRender(selectTarget: object | Array<any>) {
  if (props.multiple) {
    //
  } else {
    radioCheck(selectTarget as object);
  }
}
// 单选
function radioCheck(selectTarget: any) {
  if (JSON.stringify(selectTarget) == '{}') {
    obj.inputValue = '';
  } else {
    obj.inputValue = selectTarget[props.listProps.label] || selectTarget[props.listProps.value] || '';
  }
}
// 清空
function clear() {
  $emits('clear');
}
watch(
  () => props.selectTarget,
  (newVal: object | Array<any>) => {
    selectTargetRender(newVal);
  },
  { deep: true, immediate: true }
);
</script>
<style scoped lang="scss">
.popover-btn-wrapper {
  width: 100%;
  height: 100%;
  .el-input {
    .el-select__caret {
      color: #a8abb2;
      font-size: 14px;
      transition: transform 0.3s;
      transform: rotate(0);
      cursor: pointer;
    }
    .is-reverse {
      transform: rotate(-180deg);
    }
    .clearable {
      display: none;
    }
  }
  .el-input:hover {
    .el-select__caret {
      display: none;
    }
    .clearable {
      display: inline-block;
    }
  }
}
</style>

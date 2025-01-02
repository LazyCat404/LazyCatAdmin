<template>
  <div class="lazy-popover-btn-wrapper el-select">
    <div class="lazy-popover-btn-box">
      <template v-if="obj.radioValue || obj.multipleValue.length">
        <!-- 多选标签 -->
        <div class="select-trigger el-tooltip__trigger" v-if="multiple && obj.multipleValue.length">
          <div tabindex="-1" class="el-select__tags">
            <span class="el-select-tags-wrapper has-prefix">
              <span class="el-tag is-closable el-tag--info el-tag--default el-tag--light">
                <span class="el-tag__content">
                  <span class="el-select__tags-text">{{ obj.multipleValue[0][listProps.label] }}</span>
                </span>
                <i class="el-icon-box">
                  <i class="el-icon el-tag__close" @click.stop="delMultipleValue">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="currentColor"
                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                      ></path>
                    </svg>
                  </i>
                </i>
              </span>
              <span class="el-tag el-tag--info el-tag--default el-tag--light" v-if="obj.multipleValue.length > 1">
                <span class="el-tag__content">
                  <span class="el-select__tags-text">+ {{ obj.multipleValue.length - 1 }}</span>
                </span>
              </span>
            </span>
          </div>
        </div>
        <!-- 单选标签 -->
        <div class="lazy-radio-trigger" v-else>
          <span v-hide>
            {{ obj.radioValue }}
          </span>
        </div>
      </template>
      <!-- 筛选输入框 -->
      <el-input v-else :placeholder="placeholder" v-model="obj.inputValue" :readonly="!filterable" />
    </div>
    <!-- ico -->
    <div
      :class="{
        'lazy-popover-btn-suffix': !clearable,
        'lazy-popover-btn-clearable-suffix': clearable
      }"
    >
      <i
        :class="{
          'el-icon el-select__caret el-select__icon': true,
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';

interface Props {
  isHide: boolean;
  multiple: boolean;
  clearable: boolean;
  placeholder: string;
  filterable: boolean;
  filterMethod?: () => void;
  selectTarget: object | Array<any>;
  listProps: {
    label: string;
    value: string;
    disabled: string;
  };
}
const props = defineProps<Props>();
const $emits = defineEmits(['clear', 'delMultipleValue']);
const obj = reactive<any>({
  inputValue: '', // 筛选值
  radioValue: '', // 单选值
  multipleValue: [] // 多选值
});
// 选中渲染
function selectTargetRender(selectTarget: object | Array<any>) {
  if (props.multiple) {
    multipleCheck(selectTarget as Array<any>);
  } else {
    radioCheck(selectTarget as object);
  }
}
// 单选
function radioCheck(selectTarget: any) {
  if (JSON.stringify(selectTarget) == '{}') {
    obj.radioValue = '';
  } else {
    obj.radioValue = selectTarget[props.listProps.label] || selectTarget[props.listProps.value] || '';
  }
}
// 多选
function multipleCheck(selectTarget: Array<any>) {
  if (selectTarget.length) {
    obj.inputValue = ' ';
    obj.multipleValue = selectTarget;
  } else {
    obj.inputValue = '';
    obj.multipleValue = [];
  }
}
// 删除多选值
function delMultipleValue() {
  $emits('delMultipleValue');
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
.lazy-popover-btn-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 32px;
  border-radius: var(--el-border-radius-base);
  background-color: var(--el-fill-color-blank);
  transition: var(--el-transition-duration);
  transform: translateZ(0);
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
  display: flex;
  .lazy-popover-btn-box {
    width: calc(100% - 33px);
    position: relative;
    .el-input {
      position: relative;
      top: 1px;
      height: calc(100% - 2px);
      margin-left: 1px;
      ::v-deep .el-input__wrapper {
        box-shadow: none;
        padding-right: 0;
        .el-input__inner {
          box-shadow: none;
          height: 100%;
        }
      }
    }
    .select-trigger {
      position: absolute;
      z-index: 999;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 4px;
      box-sizing: border-box;
      .el-select__tags {
        width: calc(100% - 35px);
        .el-select-tags-wrapper {
          width: calc(100% - 6px);
          display: flex;
          .is-closable {
            display: block;
            overflow: hidden;
            margin-right: 6px;
            .el-tag__content {
              display: flex;
              align-items: center;
              width: calc(100% - 20px);
              float: left;
              height: 100%;
            }
            .el-icon-box {
              height: 100%;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
    .lazy-radio-trigger {
      position: absolute;
      z-index: 999;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 1px 0;
      padding-left: 11px;
      box-sizing: border-box;
      cursor: pointer;
      span {
        display: inline-block;
        max-width: 100%;
        color: var(--el-text-color-regular);
      }
    }
  }
  .lazy-popover-btn-suffix,
  .lazy-popover-btn-clearable-suffix {
    width: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lazy-popover-btn-clearable-suffix {
    .clearable {
      display: none;
    }
    &:hover {
      .clearable {
        display: inline-block;
      }
      .el-select__icon {
        display: none;
      }
    }
  }
}
</style>

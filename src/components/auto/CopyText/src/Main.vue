<template>
  <!-- 复制按钮 -->
  <span class="copy-wrapper">
    <Transition name="fade">
      <span
        class="iconfont icon-fuzhi1 copy-box"
        v-if="!state.isSucceed && !state.isError"
        :data-clipboard-text="props.content"
        @click="clickCopy"
      >
      </span>
    </Transition>
    <!-- 成功 -->
    <Transition name="fade">
      <span class="iconfont icon-chenggong1" v-if="state.isSucceed && !state.isError"> </span>
    </Transition>
    <!-- 失败 -->
    <Transition name="fade">
      <span class="iconfont icon-shibai1" v-if="!state.isSucceed && state.isError"> </span>
    </Transition>
  </span>
</template>

<script lang="ts" setup>
import Clipboard from 'clipboard';
import { defineProps, onBeforeUnmount, reactive } from 'vue';
const props = defineProps({
  content: String
});
const state = reactive<any>({
  isSucceed: false,
  isError: false,
  timer: null
});
function clickCopy() {
  if (state.timer) {
    clearTimeout(state.timer);
  }
  if (props.content !== undefined) {
    let clipboard = new Clipboard('.copy-box');
    clipboard.on('success', () => {
      state.isSucceed = true;
      state.isError = false;
      state.timer = setTimeout(() => {
        state.isSucceed = false;
        state.isError = false;
      }, 2000);
      // 释放内存
      clipboard.destroy();
    });
    clipboard.on('error', () => {
      // 不支持复制
      state.isSucceed = false;
      state.isError = true;
      console.warn('复制失败，浏览器不支持复制');
      state.timer = setTimeout(() => {
        state.isSucceed = false;
        state.isError = false;
      }, 2000);
      // 释放内存
      clipboard.destroy();
    });
  } else {
    console.warn('复制内容为空');
  }
}
onBeforeUnmount(() => {
  if (state.timer) {
    clearTimeout(state.timer);
  }
});
</script>
<style scoped lang="scss">
.copy-wrapper {
  display: inline-block;
  width: 16px;
  height: 16px;
  position: relative;
  margin-left: 5px;
  .iconfont {
    cursor: default;
    position: absolute;
    left: 0;
  }
  .icon-fuzhi1 {
    cursor: pointer;
  }
  .icon-chenggong1 {
    color: #67c23a;
  }
  .icon-shibai1 {
    color: #f56c6c;
  }
}
</style>

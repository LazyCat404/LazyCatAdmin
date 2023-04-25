<template>
  <!-- 复制按钮 -->
  <span class="copy-wrapper">
    <Transition name="el-fade-in-linear">
      <span
        class="iconfont icon-fuzhi1 copy-box"
        v-if="!obj.isSucceed && !obj.isError"
        :data-clipboard-text="props.content"
        @click="clickCopy"
      >
      </span>
    </Transition>
    <!-- 成功 -->
    <Transition name="el-fade-in-linear">
      <span class="iconfont icon-chenggong1" v-if="obj.isSucceed && !obj.isError"> </span>
    </Transition>
    <!-- 失败 -->
    <Transition name="el-fade-in-linear">
      <span class="iconfont icon-shibai1" v-if="!obj.isSucceed && obj.isError"> </span>
    </Transition>
  </span>
</template>

<script lang="ts" setup>
import Clipboard from 'clipboard';
import {  onBeforeUnmount, reactive } from 'vue';
const props = defineProps({
  content: {
    type: [String, Number, Object, Function, Boolean]
  }
});
const obj = reactive<any>({
  isSucceed: false,
  isError: false,
  timer: null
});
function clickCopy() {
  if (obj.timer) {
    clearTimeout(obj.timer);
  }
  if (props.content !== undefined && props.content !== null && props.content !== '') {
    let clipboard = new Clipboard('.copy-box');
    clipboard.on('success', () => {
      obj.isSucceed = true;
      obj.isError = false;
      obj.timer = setTimeout(() => {
        obj.isSucceed = false;
        obj.isError = false;
      }, 2000);
      // 释放内存
      clipboard.destroy();
    });
    clipboard.on('error', () => {
      // 不支持复制
      obj.isSucceed = false;
      obj.isError = true;
      console.warn('复制失败，浏览器不支持复制');
      obj.timer = setTimeout(() => {
        obj.isSucceed = false;
        obj.isError = false;
      }, 2000);
      // 释放内存
      clipboard.destroy();
    });
  } else {
    console.warn('复制内容为空');
  }
}
onBeforeUnmount(() => {
  if (obj.timer) {
    clearTimeout(obj.timer);
  }
});
</script>
<style scoped lang="scss">
.copy-wrapper {
  position: relative;
  display: inline-block;
  height: 16px;
  width: 16px;
  line-height: 16px;
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

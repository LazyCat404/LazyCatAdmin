<template>
  <!-- 状态 -->
  <span v-if="props.bodyItem.state === undefined ? false : true" class="state-sign-box">
    <span class="iconfont icon-dian" state="real" :style="[{ color: state.setColor[props.bodyItem.state] }]"> </span>
  </span>
</template>
<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
import { stateColor } from '../../../config';
const props = defineProps({
  bodyItem: <any>Object // 表格列设置
});
const state = reactive<any>({
  setColor: stateColor
});
</script>
<style lang="scss" scoped>
.state-sign-box {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  .icon-dian {
    font-size: 25px;
    position: absolute;
    left: -7px;
  }
}
</style>

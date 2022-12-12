<template>
  <div class="switch-tab-wrapper">
    <p>
      <i class="iconfont icon-taijiaxinxi"></i>
      <span>台架看板</span>
    </p>
    <ul>
      <li
        v-for="item in state.tabList"
        :key="item.label"
        @click="switchTab(item.path)"
        :active="active == item.label ? '' : null"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

defineProps({
  active: String
});
const state = reactive({
  tabList: [
    { label: '看板展示', path: '/bench/board' },
    { label: '看板配置', path: '/bench/board-config' }
  ]
});
const $emits = defineEmits(['switchTab']);

function switchTab(path: string) {
  $emits('switchTab', path);
}
</script>
<style lang="scss" scoped>
.switch-tab-wrapper {
  background-image: url('@/assets/images/bench/top-bg.png');
  background-size: 100% 100%;
  height: 154px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 40px;
  > p {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    i.iconfont {
      color: #01bc8f;
      margin-right: 12px;
      font-size: 23px;
    }
    > span {
      display: block;
      height: 28px;
      line-height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
  }
  > ul {
    display: flex;
    li {
      margin-right: 10px;
      cursor: pointer;
      display: -webkit-flex;
      display: flex; /*定位（写在父元素中）*/
      justify-content: center; /*水平居中*/
      align-items: center;
      height: 42px;
      background: #5d677d;
      border-radius: 8px 8px 0px 0px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      margin-right: 20px;
      padding: 0 22px;
    }
    li[active] {
      background-color: #01bc8f;
    }
  }
}
</style>

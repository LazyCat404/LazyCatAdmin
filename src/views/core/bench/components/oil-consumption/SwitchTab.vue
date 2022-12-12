<template>
  <ul class="switch-tab-wrapper">
    <li
      v-for="item in state.tabList"
      :key="item.label"
      @click="switchTab(item.path)"
      :active="active == item.label ? '' : null"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

defineProps({
  active: String
});
const state = reactive({
  tabList: [
    { label: '台架消耗油耗', path: '/bench/oil-consumption' },
    { label: '订单消耗油耗', path: '/bench/order-oil-consumption' }
  ]
});
const $emits = defineEmits(['switchTab']);

function switchTab(path: string) {
  $emits('switchTab', path);
}
</script>
<style lang="scss" scoped>
.switch-tab-wrapper {
  background-color: #1c2d42;
  height: 114px;
  display: flex;
  align-items: flex-end;
  padding-left: 40px;
  background-image: url('@/assets/images/bench/top-bg.png');
  background-size: 100% auto;
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
</style>

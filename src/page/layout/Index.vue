<template>
  <div class="app-wrapper">
    <Menu @menuTypeChange="menuTypeChange"></Menu>
    <div class="check-menu-item" :isCollapse="menuType ? '' : null">
      <Header></Header>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from './components/Menu.vue';
import Header from './components/Header.vue';
import { ref } from 'vue';

const menuType = ref(true);
function menuTypeChange(type: boolean) {
  menuType.value = type;
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .check-menu-item {
    flex: 1;
    background: #f1f5fb;
    position: relative;
    transition: all 0.5s;
    > div:last-child {
      width: 100%;
      height: 100%;
      margin-top: 70px;
    }
  }
  .check-menu-item[iscollapse] {
    transition: all 0s;
  }
}
</style>

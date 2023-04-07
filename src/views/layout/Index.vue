<template>
  <div class="app-wrapper">
    <Menu @menuTypeChange="menuTypeChange"></Menu>
    <div class="check-menu-item" :isCollapse="menuType ? '' : null">
      <div class="layout-top">
        <Navigation :excludeRoute="obj.excludeRoute"></Navigation>
        <Header :excludeRoute="obj.excludeRoute"></Header>
      </div>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from './components/Menu.vue';
import Header from './components/Header.vue';
import Navigation from './components/Navigation.vue';
import { reactive, ref } from 'vue';
const obj = reactive({
  excludeRoute: ['/client/vdi', '/client/voi']
});
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
    width: calc(100% - 300px);
    background: #f1f5fb;
    position: relative;
    transition: all 0.5s;
    .layout-top {
      position: absolute;
      display: flex;
      top: 0;
      width: 100%;
      justify-content: space-between;
    }
    > div:last-child {
      width: 100%;
      height: 100%;
    }
  }
  .check-menu-item[iscollapse] {
    width: calc(100% - 80px);
    transition: all 0s;
  }
}
</style>

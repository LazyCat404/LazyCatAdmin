<template>
  <div id="app-wrapper">
    <Menu></Menu>
    <div id="check-menu-item">
      <div id="layout-top">
        <Navigation></Navigation>
        <Header></Header>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from './Menu.vue';
import Header from './Header.vue';
import Navigation from './Navigation.vue';
</script>

<style lang="scss" scoped>
#app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  #check-menu-item {
    flex: 1;
    background: #f1f5fb;
    position: relative;
    #layout-top {
      position: absolute;
      display: flex;
      top: 0;
      width: 100%;
      justify-content: space-between;
    }
    > div:last-child {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
}
</style>

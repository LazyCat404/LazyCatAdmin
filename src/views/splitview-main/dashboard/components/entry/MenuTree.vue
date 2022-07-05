<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span v-contextmenu="ContextMenu">item oneitem</span>
      </template>
      <el-sub-menu index="1-4">
        <template #title><span v-contextmenu="menuList">item four4</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
  <!-- 右键菜单 -->
</template>

<script lang="ts" setup>
import ContextMenu from '../ContextMenu.vue';
import { Menu as Location } from '@element-plus/icons-vue';
const menuList = [
  {
    label: '菜单1',
    click: clickFn,
    ico: '',
    children: [
      {
        label: '菜单1-子菜单',
        click: clickFn
      }
    ]
  },
  {
    label: '菜单2',
    click: clickFn,
    disable: true,
    sub: '副标题'
  }
];

function clickFn() {
  console.log('点击了菜单1');
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

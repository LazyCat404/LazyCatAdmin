<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>item oneitem</span>
      </template>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
  <!-- 右键菜单 -->
  <!-- <ContextMenu ref="customContexMenu"></ContextMenu> -->
</template>

<script lang="ts" setup>
// import ContextMenu from '../ContextMenu.vue';
import { Menu as Location } from '@element-plus/icons-vue';
// import { ref } from 'vue';
// const customContexMenu = ref(null); // 右键菜单实例
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

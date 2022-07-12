<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span v-contextmenu="ContextMenu">item oneitem</span>
      </template>
      <el-sub-menu index="1-4">
        <template #title><span>item four4</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
  <!-- 右键菜单 -->
</template>

<script lang="ts" setup>
import 'vue-extend-directives/dist/style.css';
import ContextMenu from '../ContextMenu.vue';
import { Menu as Location } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <template v-for="(item, i) in state.menuList" :key="i">
      <!-- 有子菜单 -->
      <el-sub-menu v-if="item.children">
        <template #title>
          <div>
            <i :class="'iconfont ' + item.icon" />
            <span v-contextmenu="ContextMenu">{{ item.name }}</span>
          </div>
        </template>
        <el-menu-item v-for="(ite, j) in item.children" :key="j">
          {{ ite.name }}
        </el-menu-item>
      </el-sub-menu>
      <!-- 无子菜单 -->
      <el-menu-item v-else>
        <template #title>
          <div v-contextmenu="ContextMenu">
            <i :class="'iconfont ' + item.icon" />
            <span>
              {{ item.name }}
            </span>
          </div>
        </template>
      </el-menu-item>
    </template>
    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span v-contextmenu="ContextMenu">item oneitem</span>
      </template>
      <el-sub-menu index="1-4">
        <template #title><span>item four4</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu> -->
  </el-menu>
  <!-- 右键菜单 -->
</template>

<script lang="ts" setup>
import 'vue-extend-directives/dist/style.css';
import ContextMenu from '../ContextMenu.vue';
// import { Menu as Location } from '@element-plus/icons-vue';
import api from '@api';
import { reactive } from 'vue';

const state = reactive<any>({
  menuList: []
});

function init() {
  getMenuList();
}
function getMenuList() {
  api.getMenuList().then((res: res) => {
    state.menuList = res.data;
  });
}
init();
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

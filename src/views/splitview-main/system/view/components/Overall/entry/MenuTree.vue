<template>
  <el-menu class="el-menu-vertical-demo">
    <template v-for="(item, i) in state.menuList" :key="i">
      <!-- 有子菜单 -->
      <el-sub-menu v-if="item.children" :index="item.name">
        <template #title>
          <div>
            <i :class="'iconfont ' + item.icon" />
            <span v-contextmenu="ContextMenu">{{ item.name }}</span>
          </div>
        </template>
        <el-menu-item v-for="(ite, j) in item.children" :key="j" :index="ite.name">
          <div @click="menuClick(ite)" v-contextmenu="ContextMenu">
            {{ ite.name }}
          </div>
        </el-menu-item>
      </el-sub-menu>
      <!-- 无子菜单 -->
      <el-menu-item v-else :index="item.name">
        <template #title>
          <div @click="menuClick(item)" v-contextmenu="ContextMenu">
            <i :class="'iconfont ' + item.icon" />
            <span>
              {{ item.name }}
            </span>
          </div>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
  <!-- 右键菜单 -->
</template>

<script lang="ts" setup>
import 'vue-extend-directives/dist/style.css';
import ContextMenu from '../ContextMenu.vue';
import api from '@api';
import { reactive } from 'vue';
const $emits = defineEmits(['cutMenu']);
const state = reactive<any>({
  menuList: []
});

function menuClick(item: unknown) {
  $emits('cutMenu', item);
}

function init() {
  getMenuList();
}
function getMenuList() {
  api.system.getMenuList().then((res: res) => {
    state.menuList = res.data;
  });
}
init();
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0;
  .el-menu-item > div {
    width: 100%;
    > span {
      margin-left: 10px;
    }
  }
  .el-sub-menu {
    width: 100%;
    ::v-deep > .el-sub-menu__title {
      display: block;
      > div {
        > span {
          display: inline-block;
          width: calc(100% - 26px);
          margin-left: 10px;
        }
      }
    }
    .el-menu-item > div {
      margin-left: 10px;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 200px;
}
</style>

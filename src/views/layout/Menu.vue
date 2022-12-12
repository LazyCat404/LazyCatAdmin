<template>
  <div id="menu-wrapper">
    <div id="logo-box"></div>
    <el-menu
      id="menu-list-box"
      :default-active="state.activeIndex"
      router
      text-color="#5D677D"
      :unique-opened="true"
      :collapse="state.isCollapse"
    >
      <template v-for="(item, i) in menu.list" :key="i">
        <!-- 有子菜单 -->
        <el-sub-menu
          v-if="item.children"
          :disabled="item.show"
          :index="item.path"
          :sing="state.isCollapse ? 'close' : 'open'"
        >
          <template #title>
            <i :class="'iconfont ' + item.icon" />
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(ite, j) in item.children" :key="j" :index="ite.path">
            {{ ite.name }}
          </el-menu-item>
        </el-sub-menu>
        <!-- 无子菜单 -->
        <el-menu-item v-else :index="item.path" sign="route-menu">
          <i :class="'iconfont ' + item.icon" />
          <template #title>
            {{ item.name }}
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import api from '@api';
import { reactive } from 'vue';

const route = useRoute();
const state = reactive({
  isCollapse: true,
  activeIndex: route.path
});
const menu = reactive<any>({
  list: []
});
// 获取菜单
(function getMenu() {
  api.user.getMenu().then((res: res) => {
    menu.list = res.data;
  });
})();
</script>

<style lang="scss" scoped>
#menu-wrapper {
  width: 80px;
  height: calc(100% - 70px);
  float: left;
  #logo-box {
    width: 48px;
    height: 48px;
    background: #01bc8f;
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 36px;
    margin-bottom: 96px;
  }
  ::v-deep .el-menu {
    width: 100%;
    .el-menu-item,
    .el-sub-menu {
      height: 42px;
      margin-bottom: 48px;
      i.iconfont {
        font-size: 25px;
      }
    }
  }
  #menu-list-box {
    border: 0;
    height: 100%;
    width: 80px;
    // 无子菜单
    .el-menu-item[sign='route-menu'] {
      display: flex;
      display: -webkit-flex;
      font-size: 16px;
      i.iconfont {
        margin-right: 15px;
      }
    }
    .el-menu-item[sign='route-menu'] > ::v-deep div {
      display: -webkit-flex !important;
      display: flex !important;
      justify-content: center;
      align-items: center;
      i.iconfont {
        margin-right: 0px !important;
        font-size: 25px;
        color: #5d677d;
      }
    }
    // 有二级菜单
    .el-sub-menu {
      overflow: hidden;
      ::v-deep .el-sub-menu__title {
        height: 42px;
        span {
          font-size: 16px;
        }
      }
      .el-menu-item:hover {
        color: #40cdbb !important;
      }
    }
    .is-active {
      color: #40cdbb !important;
      ::v-deep .el-sub-menu__title {
        color: #40cdbb !important;
      }
      i.iconfont {
        color: #40cdbb !important;
      }
    }
    .el-sub-menu[sing='close'] {
      ::v-deep .el-sub-menu__title {
        display: -webkit-flex !important;
        display: flex !important;
        justify-content: center;
        align-items: center;
      }
    }
    .el-sub-menu[sing='open'] {
      i.iconfont {
        margin-right: 15px;
      }
    }
    .el-sub-menu {
      ::v-deep .el-sub-menu__title:hover {
        color: #40cdbb !important;
        .iconfont {
          color: #40cdbb !important;
        }
      }
    }
  }
}
</style>

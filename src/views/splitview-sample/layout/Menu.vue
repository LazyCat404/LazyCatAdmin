<template>
  <div id="menu-wrapper">
    <el-menu
      id="menu-list-box"
      :default-active="state.activeIndex"
      router
      text-color="#B7C2CF"
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
            <i :style="{ color: item.icoColor ? item.icoColor : '#B7C2CF' }" :class="'iconfont ' + item.icon" />
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(ite, j) in item.children" :key="j" :index="ite.path">
            {{ ite.name }}
          </el-menu-item>
        </el-sub-menu>
        <!-- 无子菜单 -->
        <el-menu-item v-else :index="item.path" sign="route-menu">
          <i :style="{ color: item.icoColor ? item.icoColor : '#B7C2CF' }" :class="'iconfont ' + item.icon" />
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
import { res } from '@types';
import { onBeforeUnmount, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const state = reactive({
  isCollapse: document.body.offsetWidth < 1125 ? true : false,
  activeIndex: route.path
});
const menu = reactive<any>({
  list: []
});
// 获取菜单
(function getMenu() {
  api.getMenu().then((res: res) => {
    menu.list = res.data;
  });
})();

function onResize() {
  if (document.body.offsetWidth < 1125) {
    state.isCollapse = true;
  } else {
    state.isCollapse = false;
  }
}

// 监听屏幕变化
window.addEventListener('resize', onResize, false);
// 移除监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize, false);
});
</script>

<style lang="scss" scoped>
#menu-wrapper {
  width: 230px;
  height: calc(100% - 70px);
  float: left;
  #menu-list-box {
    border: 0;
    height: 100%;
    // 无子菜单
    .el-menu-item[sign='route-menu'] {
      display: flex;
      display: -webkit-flex;
      font-size: 16px;
      i.iconfont {
        margin-right: 15px;
      }
    }
    .el-menu-item[sign='route-menu']:hover,
    .is-active[sign='route-menu'] {
      border-left: 5px solid #3dc8b7;
      background: #f6f7fb;
      padding-left: 15px !important;
      ::v-deep div {
        left: -2.5px !important;
      }
    }
    .el-menu-item[sign='route-menu'] > ::v-deep div {
      display: -webkit-flex !important;
      display: flex !important;
      justify-content: center;
      align-items: center;
      i.iconfont {
        margin-right: 0px !important;
      }
    }
    // 有二级菜单
    .el-sub-menu {
      overflow: hidden;
      ::v-deep .el-sub-menu__title {
        span {
          font-size: 16px;
        }
      }
      .el-menu-item:hover {
        background: #f6f7fb;
        color: #40cdbb !important;
      }
    }
    .is-active {
      color: #40cdbb !important;
      ::v-deep .el-sub-menu__title {
        border-left: 5px solid #3dc8b7;
        background: #f6f7fb;
        color: #40cdbb !important;
        padding-left: 15px !important;
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
        border-left: 5px solid #3dc8b7;
        background: #f6f7fb;
        color: #40cdbb !important;
        padding-left: 15px !important;
        .iconfont {
          color: #40cdbb !important;
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  #menu-wrapper {
    width: calc(100% - 970px);
  }
}
@media screen and (max-width: 1125px) {
  #menu-wrapper {
    width: 64px;
  }
}
</style>

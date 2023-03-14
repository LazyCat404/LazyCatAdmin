<template>
  <div id="menu-wrapper">
    <div class="logo-box">
      <span></span>
      <div class="logo-text" v-if="!state.isCollapse">
        <p>卓朗昆仑云</p>
        <div>Wisdom Labs</div>
      </div>
    </div>
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
    <div class="menu-set-btn">
      <i
        :class="state.isCollapse ? 'iconfont icon-zhankaicaidan' : 'iconfont icon-shouqicaidan'"
        @click="menuTypeChange"
      ></i>
      <span>{{ state.isCollapse ? '' : '收起菜单' }} </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import api from '@api';
import { computed, reactive } from 'vue';
import menuData from '@/assets/json/menu.json';

const route = useRoute();
const state = reactive<any>({
  isCollapse: true,
  activeIndex: ''
});
const menu = reactive<any>({
  list: menuData //菜单数据
});
// 当前活跃菜单
state.activeIndex = computed(() => {
  return route.path;
});
const $emit = defineEmits(['menuTypeChange']);
// 菜单展开收起
function menuTypeChange() {
  state.isCollapse = !state.isCollapse;
  $emit('menuTypeChange', state.isCollapse);
}

// 获取菜单
// (function getMenu() {
//   // api.user.getMenu().then((res: res) => {
//   //   menu.list = res.data;
//   // });
// })();
</script>

<style lang="scss" scoped>
#menu-wrapper {
  height: 100%;
  float: left;
  .logo-box {
    margin: 0 auto;
    margin-top: 36px;
    margin-bottom: 96px;
    display: flex;
    > span {
      width: 48px;
      height: 48px;
      background: #01bc8f;
      border-radius: 8px;
      display: inline-block;
      cursor: pointer;
      margin-left: 16px;
    }
    .logo-text {
      margin-left: 20px;
      p {
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #1c2d42;
        line-height: 28px;
      }
      > div {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1c2d42;
        line-height: 20px;
        margin-top: 4px;
      }
    }
  }
  .el-menu {
    width: 100%;
    border: 0;
    height: calc(100% - 246px);
    overflow: auto;
    > .el-menu-item,
    > .el-sub-menu {
      width: 300px;
      margin-bottom: 48px;
      font-size: 16px;
      font-weight: 500;
    }
    > .el-menu-item:hover {
      background-color: #fff;
      color: #01bc8f !important;
    }
    // 无子菜单
    .el-menu-item[sign='route-menu'] {
      height: 42px;
      i.iconfont {
        padding-left: 7.5px;
        padding-right: 27.5px;
        font-size: 25px;
      }
    }
    .el-menu-item.is-active[sign='route-menu'] {
      color: #01bc8f;
    }
    // 有二级菜单
    .el-sub-menu {
      ::v-deep .el-sub-menu__title {
        font-size: 16px;
        height: 42px;
        margin-bottom: 18px;
      }
      ::v-deep .el-sub-menu__title:hover {
        background-color: #fff;
        color: #01bc8f !important;
      }
      i.iconfont {
        padding-left: 7.5px;
        padding-right: 27.5px;
        font-size: 25px;
      }
      .el-menu-item {
        margin-bottom: 0;
        margin-left: 80px;
        padding-left: 20px;
        width: 200px;
        height: 44px;
        border-radius: 4px;
        font-size: 14px;
      }
      .el-menu-item:hover,
      .el-menu-item.is-active {
        color: #01bc8f;
        background-color: rgba(1, 188, 143, 0.1);
      }
    }
    .el-sub-menu.is-active {
      ::v-deep .el-sub-menu__title {
        color: #01bc8f !important;
      }
    }
    .el-sub-menu[aria-expanded='true'] {
      margin-bottom: 18px;
    }
  }
  // 收缩菜单
  .el-menu--collapse {
    .el-menu-item,
    .el-sub-menu {
      width: 80px !important;
      height: 42px;
      i.iconfont {
        font-size: 25px;
      }
    }
    // 有二级菜单
    .el-sub-menu {
      ::v-deep .el-sub-menu__title {
        height: 42px;
      }
    }
    .el-sub-menu[aria-expanded='true'] {
      margin-bottom: 48px;
    }
  }
}
// 收缩悬浮菜单
::v-deep .el-menu--popup-container {
  .el-menu-item {
    height: 42px;
  }
}
// 菜单控制按钮
.menu-set-btn {
  height: 65px;
  margin: 0 20px;
  border-top: 1px solid rgba(229, 229, 229, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #5d677d;
  > span {
    flex: 1;
  }
  i.iconfont {
    cursor: pointer;
    font-size: 25px;
    margin-left: 7.5px;
  }
  i.icon-shouqicaidan {
    margin-left: 7.5px;
    margin-right: 27.5px;
  }
}
</style>

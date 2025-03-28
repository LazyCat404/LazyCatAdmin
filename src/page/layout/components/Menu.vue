<template>
  <div class="menu-wrapper">
    <div class="logo-box">
      <span></span>
      <Transition name="el-fade-in-linear">
        <div class="logo-text" v-if="!state.isCollapse">
          <p>XXXX</p>
          <div>Wisdom Labs</div>
        </div>
      </Transition>
    </div>
    <el-menu
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
          :popper-class="state.isCollapse ? 'popper-el-menu' : ''"
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
import { computed, reactive } from 'vue';
import menuData from './menu/menu.json';

const route = useRoute();
const state = reactive<any>({
  isCollapse: true, // 菜单是否展开
  activeIndex: ''
});
const menu = reactive<any>({
  list: menuData //菜单数据
});
// 当前活跃菜单
state.activeIndex = computed(() => {
  // 路由包含
  let desktopList = ['/desktop/desktop/list'];
  let templateList = ['/desktop/template/list'];
  let clientList = ['/client/vdi', '/client/voi'];
  // 活跃菜单
  if (desktopList.includes(route.path)) {
    return '/desktop/desktop/list';
  } else if (templateList.includes(route.path)) {
    return '/desktop/template/list';
  } else if (clientList.includes(route.path)) {
    return '/client';
  } else {
    return route.path;
  }
});
const $emit = defineEmits(['menuTypeChange']);
// 菜单展开收起
function menuTypeChange() {
  state.isCollapse = !state.isCollapse;
  $emit('menuTypeChange', state.isCollapse);
}
</script>

<style lang="scss" scoped>
.menu-wrapper {
  height: 100%;
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
      white-space: nowrap;
      p {
        height: 28px;
        font-size: 20px;
        font-family:
          PingFangSC-Semibold,
          PingFang SC;
        font-weight: 600;
        color: #1c2d42;
        line-height: 28px;
      }
      > div {
        height: 20px;
        font-size: 14px;
        font-family:
          PingFangSC-Regular,
          PingFang SC;
        font-weight: 400;
        color: #1c2d42;
        line-height: 20px;
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
      width: 250px;
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
        width: 150px;
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
<style lang="scss">
// 收缩悬浮菜单
.el-popper.popper-el-menu {
  border: 0;
  .el-menu {
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(13, 34, 67, 0.1);
    min-width: 150px;
    .el-menu-item {
      color: #5d677d;
      height: 40px;
      border-radius: 4px;
    }
    .el-menu-item.is-active {
      color: #01bc8f;
      background-color: rgba(1, 188, 143, 0.1);
    }
    .el-menu-item:hover {
      color: #01bc8f;
      background-color: rgba(1, 188, 143, 0.1);
    }
  }
}
</style>

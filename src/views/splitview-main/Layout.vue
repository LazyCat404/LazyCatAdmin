<template>
  <Header></Header>
  <Menu></Menu>
  <div id="route-wrapper">
    <Navigation v-if="state.navShow"></Navigation>
    <div
      id="route-body"
      :style="[
        { height: state.navShow ? 'calc(100% - 62px)' : 'calc(100% - 30px)' },
        { margin: state.navShow ? '0 15px 15px' : '15px' }
      ]"
    >
      <el-scrollbar v-if="state.scrollbarView">
        <div id="scrollbar-layout-wrapper">
          <router-view></router-view>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from '../splitview-sample/layout/Menu.vue';
import Header from '../splitview-sample/layout/Header.vue';
import Navigation from '../splitview-sample/layout/Navigation.vue';
import useCurrentInstance from '@/utils/useCurrentInstance';
import { reactive, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
// 全局属性
const { gpr } = useCurrentInstance();
const $stores = gpr.$stores as any;
const route = useRoute();
const state = reactive({
  navShow: route.meta.breadcrumb && $stores.systemSet.getters.nav(),
  scrollbarView: true // 控制滚动条视图刷新
});
onBeforeRouteUpdate(to => {
  state.scrollbarView = false;
  state.navShow = to.meta.breadcrumb && $stores.systemSet.getters.nav();
});
watch(
  () => route.path,
  () => {
    state.scrollbarView = true;
  }
);
</script>

<style lang="scss" scoped>
#route-wrapper {
  width: calc(100% - 230px);
  height: calc(100% - 70px);
  float: right;
  background-color: #f1f8f9;
}
#route-body {
  background: #fff;
}
::v-deep .el-scrollbar .el-scrollbar__view,
::v-deep .el-scrollbar .el-scrollbar__view > div#scrollbar-layout-wrapper {
  height: 100%;
  z-index: 999;
}

@media screen and (max-width: 1200px) {
  #route-wrapper {
    width: 970px;
  }
}
@media screen and (max-width: 1125px) {
  #route-wrapper {
    width: calc(100% - 64px);
  }
  ::v-deep .el-scrollbar .el-scrollbar__view > div#scrollbar-layout-wrapper {
    min-width: 700px;
  }
}
</style>

<template>
  <Header></Header>
  <Menu></Menu>
  <div id="route-wrapper">
    <Navigation v-if="state.navShow"></Navigation>
    <div id="route-body" :style="[{height:state.navShow ? 'calc(100% - 72px)' : 'calc(100% - 40px)'},{margin:state.navShow ? '0 20px 20px':'20px'}]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from "../splitview-sample/layout/Menu.vue";
import Header from "../splitview-sample/layout/Header.vue";
import Navigation from '../splitview-sample/layout/Navigation.vue';
import useCurrentInstance from "@/utils/useCurrentInstance";
import { reactive } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
// 全局属性
const { gpr } = useCurrentInstance(); 
const $stores = gpr.$stores as any;
const route = useRoute();
const state = reactive({
  navShow: route.meta.breadcrumb && $stores.systemSet.getters.nav()
});
onBeforeRouteUpdate((to) => {
  state.navShow = to.meta.breadcrumb && $stores.systemSet.getters.nav()
});
</script>

<style lang="scss" scoped>
#route-wrapper{
  width: calc(100% - 230px);
  height: calc(100% - 70px);
  float: right;
  background-color: #F1F8F9;
}
#route-body{
  background: #fff;
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
}
</style>
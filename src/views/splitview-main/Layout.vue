<template>
  <Header></Header>
  <Menu></Menu>
  <div id="route-wrapper">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import Menu from "../splitview-sample/layout/Menu.vue";
import Header from "../splitview-sample/layout/Header.vue";

</script>

<style lang="scss" scoped>
#route-wrapper{
  width: calc(100% - 260px);
  height: calc(100% - 90px);
  float: right;
  background-color: #F1F8F9;
}
</style>
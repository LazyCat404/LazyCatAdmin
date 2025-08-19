<template>
  <div class="header-wrapper">
    <Navigation :excludeRoute="obj.excludeRoute"></Navigation>
    <div class="header-right-box">
      <Other :excludeRoute="obj.excludeRoute"></Other>
      <LazyTheme></LazyTheme>
      <User :excludeRoute="obj.excludeRoute"></User>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import Navigation from './header/Navigation.vue';
import User from './header/User.vue';
import Other from './header/Other.vue';

const obj = reactive({
  excludeRoute: ['/client/vdi', '/client/voi'] // 深色Header路由
});
</script>
<style scoped lang="scss">
.header-wrapper {
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 0;
  width: 100%;
  height: 70px;
  .header-right-box {
    display: flex;
    align-items: center;
    > div + div {
      margin-left: 60px;
    }
  }
}
</style>

<template>
  <div class="header-wrapper">
    <Navigation :excludeRoute="obj.excludeRoute"></Navigation>
    <User :excludeRoute="obj.excludeRoute"></User>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import Navigation from './header/Navigation.vue';
import User from './header/User.vue';

const obj = reactive({
  excludeRoute: ['/client/vdi', '/client/voi']
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
}
</style>

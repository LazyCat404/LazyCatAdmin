<template>
  <Menu></Menu>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import Menu from "../splitview-sample/layout/Menu.vue";
import Header from "../splitview-sample/layout/Header.vue";

</script>
<template>
  <RouterView></RouterView>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark({
  storage: window.sessionStorage
});
useToggle(isDark);
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

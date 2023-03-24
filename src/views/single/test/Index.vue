<template>
  <div class="test-wrapper"></div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
const obj = reactive<any>({});
console.log(obj);
</script>
<style lang="scss" scoped>
.test-wrapper {
}
</style>

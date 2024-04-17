<template>
  <div class="banner-wrapper">
    <div id="illustration" class="illustration"></div>
  </div>
</template>
<script setup lang="ts">
import lottie from 'lottie-web';
import { onMounted } from 'vue';

function lottieInit() {
  // 插画动画
  lottie.loadAnimation({
    container: document.getElementById('illustration') as Element,
    renderer: 'svg',
    loop: true,
    path: '/lottie/login/data.json'
  });
}

onMounted(() => {
  lottieInit();
});
</script>
<style scoped lang="scss">
.banner-wrapper {
  display: flex;
  align-items: center;
}
</style>

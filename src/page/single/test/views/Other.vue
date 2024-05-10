<template>
  <div class="other-wrapper">
    <div id="three-box"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { init3D } from '@/utils/3D/gltfLoader';

// 初始化
function init() {
  const container = document.getElementById('three-box');
  let url = 'http://localhost:3000/models/gltf/RobotExpressive/RobotExpressive.glb';
  // let url = 'http://localhost:3000/工厂.glb';
  init3D(container, url);
}

// 页面加载结束
onMounted(() => {
  init();
});
</script>
<style scoped lang="scss">
.other-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  #three-box {
    width: 100%;
    height: 100%;
  }
  .btn-box {
    position: absolute;
    bottom: 30px;
  }
}
</style>

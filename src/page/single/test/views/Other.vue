<template>
  <div class="other-wrapper">
    <div id="three-box"></div>
    <div class="btn-box">
      <el-button type="success" v-for="(item, i) in animationNameArr" :key="i" @click="animationPlay(item)">
        {{ item }}
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { init3D, animationPlay } from '@/utils/3D/gltfLoader';

const animationNameArr = [
  'Attack',
  'Death',
  'Eating',
  'Gallop',
  'Gallop_Jump',
  'Idle',
  'Idle_2',
  'Idle_2_HeadLow',
  'Idle_HitReact1',
  'Idle_HitReact2',
  'Jump_ToIdle',
  'Walk'
];

// 初始化
function init() {
  const container = document.getElementById('three-box');
  // let url = 'http://localhost:3000/models/gltf/RobotExpressive/RobotExpressive.glb';
  let url = 'http://localhost:3000/glTF/Fox.gltf';
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
../../../../utils/3D/gltfLoader

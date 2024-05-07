<template>
  <div class="other-wrapper">
    <div id="three-box"></div>
  </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { onMounted } from 'vue';
function init3D(container: HTMLElement | null) {
  if (container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    /**
     * 创建场景
     */
    const scene = new THREE.Scene();
    /**
     * 创建摄像机
     */
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 3000);
    camera.position.set(43.6, 23.6, 38);
    camera.lookAt(-8.5, -3.6, -7.4);
    /**
     * 创建渲染器
     */
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      logarithmicDepthBuffer: true, // 设置深度缓冲区，优化深度冲突
      alpha: true // 允许背景透明
    });
    // 设置设备像素比率（这可以帮助在高分辨率屏幕上提供更好的抗锯齿效果）
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color(0, 0, 0), 0); // 最后一个参数是透明度（0表示完全透明）
    container.appendChild(renderer.domElement);
    /**
     * 创建灯光
     */
    const light = new THREE.AmbientLight(0xffffff); // 白光
    scene.add(light);
    /**
     * 创建加载器
     */
    const loader = new GLTFLoader();
    loader.load('http://localhost:3000/nnnnn.gltf', (gltf: any) => {
      scene.add(gltf.scene);
      // 递归查找所有网格模型
      // gltf.scene.traverse((obj: any) => {
      //   if (obj.isMesh) {
      //     console.log(obj);
      //   }
      // });
    });
    /**
     * 添加鼠标控制器
     */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 使动画更平滑
    controls.dampingFactor = 0.25;
    controls.enableZoom = true; // 允许缩放
    controls.zoomSpeed = 1.0;
    controls.enableRotate = true; // 允许旋转
    controls.rotateSpeed = 1.0;
    controls.enablePan = true; // 允许平移
    controls.panSpeed = 0.3;
    controls.screenSpacePanning = false; // 设置为true将允许在屏幕空间内平移
    controls.minDistance = 10; // 设置最小距离限制
    controls.maxDistance = 500; // 设置最大距离限制
    controls.target.set(-8.5, -3.6, -7.4); // 与lookAt参数保持一直
    controls.update();
    /**
     * 循环渲染
     */
    function animate() {
      // console.log(camera.position);
      // console.log(controls.target);
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
    /**
     * 窗口大小改变时更新相机
     */
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);
  }
}
// 初始化
function init() {
  const container = document.getElementById('three-box');
  init3D(container);
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
  #three-box {
    width: 100%;
    height: 100%;
  }
}
</style>

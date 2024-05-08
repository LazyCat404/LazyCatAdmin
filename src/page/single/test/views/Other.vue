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
    let mixer: any;
    /**
     * 创建场景
     */
    const scene = new THREE.Scene();
    /**
     * 创建摄像机
     */
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 8000);
    camera.position.set(-31, 23, 45);
    camera.lookAt(8.98, 3, -12.72);
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
    loader.load('http://localhost:3000/pose.gltf', (gltf: any) => {
      // 模型加载
      scene.add(gltf.scene);
      // 动画加载
      if (gltf.animations && gltf.animations.length > 0) {
        // 获取动画mixer
        mixer = new THREE.AnimationMixer(gltf.scene);
        // 获取动画action
        const action = mixer.clipAction(gltf.animations[0]);
        // 设置动画循环模式为无限次重复
        action.setLoop(THREE.LoopRepeat, Infinity);
        // 设置动画循环播放
        action.play();
      } else {
        console.warn('该模型不包含动画');
      }
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
    controls.maxDistance = 5000; // 设置最大距离限制
    controls.target.set(8.98, 3, -12.72); // 与lookAt参数保持一直
    controls.update();
    /**
     * 循环渲染
     */
    function animate() {
      // console.log('position', `${camera.position.x.toFixed(2)},${camera.position.y.toFixed(2)},${camera.position.z.toFixed(2)}`);
      // console.log('target', `${controls.target.x.toFixed(2)},${controls.target.y.toFixed(2)},${controls.target.z.toFixed(2)}`);

      const clock = new THREE.Clock();
      const delta = clock.getDelta();
      // 更新mixer和action
      if (mixer) {
        mixer.update(delta);
      }

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

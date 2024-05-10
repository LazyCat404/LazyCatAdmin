import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 模型位置初始化
export function modelPositionInit(model: any) {
  // 将模型位置居中到场景中心
  const box = new THREE.Box3().setFromObject(model);
  // 获取边界框的中心点
  const center = new THREE.Vector3();
  box.getCenter(center);
  // 将模型的位置设置为边界框中心点的负值，以将其居中到场景的中心
  model.position.copy(center).negate();
}

// 控制器初始化
export function controlsInit(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
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
  controls.target.set(0, 0, 0); // 与lookAt参数保持一直
  controls.update();
}

// 可视化相机、控制器参数
export function visualDebug(camera?: THREE.Camera, controls?: OrbitControls) {
  if (camera) {
    console.log(
      'position',
      `${camera.position.x.toFixed(2)},${camera.position.y.toFixed(2)},${camera.position.z.toFixed(2)}`
    );
  }
  if (controls) {
    console.log(
      'target',
      `${controls.target.x.toFixed(2)},${controls.target.y.toFixed(2)},${controls.target.z.toFixed(2)}`
    );
  }
}

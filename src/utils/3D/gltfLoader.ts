import { modelPositionInit, controlsInit } from '@/utils/3D/base';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let width: number, height: number;
let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
let mixer: THREE.AnimationMixer, clock: THREE.Clock;
let actions: { [key: string]: THREE.AnimationAction };

export let activeAction: THREE.AnimationAction;

export function init3D(container: HTMLElement | null, loaderUrl: string) {
  if (container) {
    width = container.clientWidth;
    height = container.clientHeight;
    /**
     * 创建场景
     */
    scene = new THREE.Scene();
    clock = new THREE.Clock(); // 时间跟踪
    /**
     * 创建摄像机
     */
    camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 8000);
    camera.position.set(6.99, 1.89, 6.9);
    camera.lookAt(0, 0, 0);
    /**
     * 创建渲染器
     */
    renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      logarithmicDepthBuffer: true, // 设置深度缓冲区，优化深度冲突
      alpha: true // 允许背景透明
    });
    // 设置设备像素比率（这可以帮助在高分辨率屏幕上提供更好的抗锯齿效果）
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animate);
    renderer.setClearColor(new THREE.Color(0, 0, 0), 0); // 最后一个参数是透明度（0表示完全透明）
    container.appendChild(renderer.domElement);
    /**
     * 创建灯光
     */
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);
    /**
     * 创建加载器
     */
    const loader = new GLTFLoader();
    loader.load(loaderUrl, (gltf: any) => {
      // 模型加载
      scene.add(gltf.scene);
      // 模型位置初始化
      modelPositionInit(gltf.scene);
      // 动画加载
      if (gltf.animations && gltf.animations.length > 0) {
        animationInit(gltf.scene, gltf.animations);
      } else {
        console.warn('该模型不包含动画');
      }
    });
    /**
     * 添加鼠标控制器
     */
    controlsInit(camera, renderer);
    // 监听窗口改变
    window.addEventListener('resize', onWindowResize, false);
  }
}

// 动画初始化
function animationInit(model: any, animations: any) {
  // 获取动画mixer
  mixer = new THREE.AnimationMixer(model);
  actions = {};
  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i];
    const action = mixer.clipAction(clip);
    actions[clip.name] = action;
  }
}

/**
 * 循环渲染
 */
function animate() {
  const delta = clock.getDelta();
  // 更新mixer和action
  if (mixer) {
    mixer.update(delta);
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
/**
 * 窗口大小改变时更新相机
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 动画调用
export function animationPlay(name: string) {
  if (actions) {
    actions[name].play();
  } else {
    console.warn('暂无可执行动画');
  }
}

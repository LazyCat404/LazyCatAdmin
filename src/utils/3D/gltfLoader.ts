import { controlsInit, modelPositionInit } from '@/utils/3D/base';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

let width: number, height: number;
let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
let mixer: THREE.AnimationMixer, clock: THREE.Clock;
let actions: { [key: string]: THREE.AnimationAction };
let composer: any;

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
    camera = new THREE.PerspectiveCamera(35, width / height, 1, 3000);
    camera.position.set(6, 6, 12);
    camera.lookAt(0, 0, 0);
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
     * 创建渲染器
     */
    renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      // alpha: true, // 允许背景透明
      logarithmicDepthBuffer: true // 设置深度缓冲区，优化深度冲突
    });
    // 设置设备像素比率（这可以帮助在高分辨率屏幕上提供更好的抗锯齿效果）
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animate);
    // renderer.setClearColor(new THREE.Color(0, 0, 0), 0); // 最后一个参数是透明度（0表示完全透明）
    container.appendChild(renderer.domElement);
    /**
     * 标注
     */
    const texture = new THREE.TextureLoader().load('http://localhost:3000/pic.png');
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture //设置精灵纹理贴图
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(0, 3, 0);
    scene.add(sprite);
    /**
     * 创建辅助观察坐标系
     */
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);
    /**
     * 创建加载器
     */
    const loader = new GLTFLoader();
    loader.load(loaderUrl, (gltf: any) => {
      // 模型加载
      scene.add(gltf.scene);
      // 后处理
      composerInit(gltf.scene);
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
  if (composer) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
}
/**
 * 窗口大小改变时更新相机
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * 后处理-合成渲染
 */
function composerInit(mesh: unknown) {
  composer = new EffectComposer(renderer);
  // 创建一个渲染器通道，场景和相机作为参数
  const renderPass = new RenderPass(scene, camera);
  // 设置renderPass通道
  composer.addPass(renderPass);
  // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
  const v2 = new THREE.Vector2(width, height);
  const outlinePass = new OutlinePass(v2, scene, camera);
  // 一个模型对象
  outlinePass.selectedObjects = [mesh];
  // 设置OutlinePass通道
  composer.addPass(outlinePass);
}

// 动画调用
export function animationPlay(name: string) {
  if (actions) {
    actions[name].play();
  } else {
    console.warn('暂无可执行动画');
  }
}

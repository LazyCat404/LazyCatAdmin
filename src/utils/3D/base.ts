import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * 模型位置初始化
 * @param model 模型
 */
export function modelPositionInit(model: any) {
  // 将模型位置居中到场景中心
  const box = new THREE.Box3().setFromObject(model);
  // 获取边界框的中心点
  const center = new THREE.Vector3();
  box.getCenter(center);
  // 将模型的位置设置为边界框中心点的负值，以将其居中到场景的中心
  model.position.copy(center).negate();
}

/**
 * 鼠标控制器初始化
 * @param camera 相机
 * @param renderer 渲染器
 */
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

/**
 * 鼠标射线选中模型
 * @param container canvas 容器
 * @param camera 相机
 * @param mesh 模型
 */
export function mouseRaycaster(container: HTMLElement, camera: THREE.PerspectiveCamera, mesh: any) {
  if (container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    container.addEventListener('click', function (event) {
      //屏幕坐标转标准设备坐标(坐标原点在画布中心，范围-1~1)
      const x = (event.offsetX / width) * 2 - 1;
      const y = -(event.offsetY / height) * 2 + 1;
      //创建一个射线投射器`Raycaster`
      const raycaster = new THREE.Raycaster();
      //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      //.intersectObjects([mesh])对参数中的网格模型对象进行射线交叉计算
      const intersects = raycaster.intersectObjects([mesh]);
      // intersects.length大于0说明，说明选中了模型
      if (intersects.length > 0) {
        // 选中模型的第一个模型，设置为红色
        (intersects[0].object as any).material.color.set(0xff0000);
      }
    });
  }
}

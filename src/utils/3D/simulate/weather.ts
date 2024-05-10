import * as THREE from 'three';

import rain from './img/rain.png';

let modelGroup: THREE.Group<THREE.Object3DEventMap>, clock: THREE.Clock;
let height: number, speed: number;

/**
 * 精灵图模拟天气
 * @param type 天气类型
 * @param position 位置
 * @param scale 缩放
 * @param density 密度
 * @returns 模型组
 */
// scene.add(initWeather('rain', [10, 5, 8], [0.08, 0.08], 100));
export function initWeather(type = 'rain', position = [100, 100, 100], scale = [1, 1], density = 10000) {
  height = position[1]; // 高度
  speed = scale[1] * 10; // 下落速度
  const weatherType: any = {
    rain
  };
  clock = new THREE.Clock();
  modelGroup = new THREE.Group();
  // 加载天气纹理
  const texture = new THREE.TextureLoader().load(weatherType[type]);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture //设置精灵纹理贴图
  });
  // 批量创建天气元素
  for (let i = 0; i < density; i++) {
    const sprite = new THREE.Sprite(spriteMaterial);
    modelGroup.add(sprite);
    // 随机分布
    const x = position[0] * (Math.random() - 0.5);
    const y = position[1] * Math.random();
    const z = position[2] * (Math.random() - 0.5);
    sprite.position.set(x, y, z);
    sprite.scale.set(scale[0], scale[1], 1);
  }
  // 循环渲染
  loop();
  return modelGroup;
}

function loop() {
  // loop()每次执行都会更新雨滴的位置，进而产生动画效果
  const t = clock.getDelta();
  modelGroup.children.forEach(sprite => {
    // 雨滴的y坐标每次减少高度
    sprite.position.y -= t * speed;
    if (sprite.position.y < 0) {
      // 如果雨滴落到地面，重置y，从新下落
      sprite.position.y = height;
    }
  });
  requestAnimationFrame(loop);
}

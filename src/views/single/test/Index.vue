<template>
  <div class="test-wrapper">
    <canvas id="canvas"></canvas>
    <canvas id="canvas1"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
const obj = reactive<any>({
  ctx: null,
  ctx1: null,
  canvas: null,
  canvas1: null,
  offset: 0,
  offset1: 0
});
onMounted(() => {
  init();
});
function init() {
  obj.canvas = document.getElementById('canvas');
  obj.canvas1 = document.getElementById('canvas1');
  if (obj.canvas && obj.canvas1) {
    obj.ctx = obj.canvas.getContext('2d');
    obj.ctx1 = obj.canvas1.getContext('2d');
    march();
  }
}
function draw() {
  obj.ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height);
  obj.ctx.setLineDash([10, 5]);
  obj.ctx.lineDashOffset = -obj.offset;
  obj.ctx.strokeRect(100, 30, 100, 100);
}

function march() {
  obj.offset++;
  if (obj.offset > 16) {
    obj.offset = 0;
  }
  draw();
  setTimeout(march, 100);
}
</script>
<style lang="scss" scoped>
.test-wrapper {
}
</style>

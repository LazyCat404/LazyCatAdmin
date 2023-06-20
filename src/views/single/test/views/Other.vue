<template>
  <div class="test-other-wrapper"></div>
</template>
<script setup lang="ts">
async function  a() {}
function  b() {}

console.log(Object.prototype.toString.call(a));
console.log(Object.prototype.toString.call(b));

console.dir(a)
console.dir(b)
// function isAsync

</script>
<style scoped lang="scss">
.test-other-wrapper {
  width: 100%;
  height: 100%;
}
</style>

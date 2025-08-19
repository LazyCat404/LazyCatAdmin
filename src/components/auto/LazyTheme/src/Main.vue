<template>
  <div class="lazy-theme-wrapper">
    <span class="slider" :theme="customTheme" @click="toggleDark()"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

const customTheme = ref<'dark' | 'light'>();

const isDark = useDark({
  storage: window.sessionStorage
});
const toggleDark = useToggle(isDark);

// 监听主题变化
watch(
  isDark,
  newIsDark => {
    customTheme.value = newIsDark ? 'dark' : 'light';
  },
  { immediate: true }
);
</script>
<style scoped>
.lazy-theme-wrapper {
  display: block;
  --width-of-switch: 3.5em;
  --height-of-switch: 2em;
  --size-of-icon: 1.4em;
  --slider-offset: 0.3em;
  position: relative;
  width: var(--width-of-switch);
  height: var(--height-of-switch);
}
/* 滑块通用样式 */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f4f4f5;
  transition: 0.4s;
  border-radius: 30px;
}
.slider:before {
  position: absolute;
  content: '';
  height: var(--size-of-icon, 1.4em);
  width: var(--size-of-icon, 1.4em);
  border-radius: 20px;
  top: 50%;
  transition: 0.4s;
  transform: translateY(-50%);
}
/* 亮色主题 */
.slider[theme='light'] {
  background-color: #f4f4f5;
}
.slider[theme='light']:before {
  left: var(--slider-offset, 0.3em);
  background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
}
/* 暗色主题 */
.slider[theme='dark'] {
  background-color: #303136;
}
.slider[theme='dark']:before {
  left: calc(100% - (var(--size-of-icon, 1.4em) + var(--slider-offset, 0.3em)));
  background: #303136;
  box-shadow:
    inset -3px -2px 5px -2px #8983f7,
    inset -10px -4px 0 0 #a3dafb;
}
</style>

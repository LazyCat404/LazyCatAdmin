<template>
  <div class="expand-wrapper">expand</div>
</template>
<script setup lang="ts">
interface listItem {
  key: string;
  label: string;
  type?: string;
  list?: Array<any>;
  listProps?: {
    label?: string;
    value?: string;
  };
}
const props = defineProps<{
  list: Array<listItem>; // 全部条件列表
  modelValue?: object;
}>();
console.log(props);
</script>
<style scoped lang="scss"></style>

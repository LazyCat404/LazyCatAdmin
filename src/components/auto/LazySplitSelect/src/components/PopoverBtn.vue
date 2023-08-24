<template>
  <div class="popover-btn-wrapper">
    <template></template>
    <template></template>
  </div>
</template>
<script setup lang="ts">
interface Props {
  disabled?: boolean | number | string;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: () => false
});
console.log(props.disabled);
</script>
<style scoped lang="scss"></style>

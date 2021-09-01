<template>
    首页
</template>

<script lang="ts" setup>
import useCurrentInstance  from '@/utils/useCurrentInstance';
const { globalProperties } = useCurrentInstance();
console.log(globalProperties.$axios)


</script>

<style></style>

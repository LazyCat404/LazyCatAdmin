<template>
  <el-collapse>
    <el-collapse-item :title="item.label" v-for="(item, i) in props.powerList" :key="i">
      <template v-if="item.children && item.children.length">
        <PowerThree :powerList="item.children"></PowerThree>
      </template>
      <template v-else>{{ item.label }}</template>
    </el-collapse-item>
  </el-collapse>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  powerList: <any>Array
});
</script>
<style lang="scss" scoped></style>

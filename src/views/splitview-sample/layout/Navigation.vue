<template>
  <el-breadcrumb id="navigation-wrapper">
    <el-breadcrumb-item v-for="(item, i) in route.meta.breadcrumb" :to="{ path: item.path }" :key="i">
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
const route = useRoute() as any;
</script>

<style lang="scss" scoped>
#navigation-wrapper {
  height: 52px;
  line-height: 52px;
  padding-left: 20px;
  ::v-deep .el-breadcrumb__inner {
    color: #333;
    font-weight: 400;
  }
  ::v-deep .el-breadcrumb__inner:hover {
    color: #333;
  }
  .el-breadcrumb__item:last-child {
    ::v-deep .el-breadcrumb__inner {
      color: #999;
    }
  }
}
</style>

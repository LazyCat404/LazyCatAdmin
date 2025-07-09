<template>
  <el-breadcrumb class="navigation-wrapper" :dark="excludeRoute.includes(route.path)">
    <el-breadcrumb-item v-for="(item, i) in route.meta.breadcrumb" :to="{ path: item.path }" :key="i">
      <i v-if="i == 0" :class="`iconfont ${item.ico}`"></i>{{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
defineProps({
  excludeRoute: {
    type: Array, // 排除路由
    required: false,
    default: () => {
      return [];
    }
  }
});
const route = useRoute() as any;
</script>

<style lang="scss" scoped>
.navigation-wrapper {
  padding-left: 40px;
  display: flex;
  :deep(.el-breadcrumb__inner) {
    height: 17px;
    font-size: 12px;
    font-family:
      PingFangSC-Regular,
      PingFang SC;
    font-weight: 400;
    color: #5d677d;
    line-height: 17px;
    .iconfont {
      font-size: 12px;
      margin-right: 10px;
    }
  }
}
.navigation-wrapper[dark='true'] {
  :deep(.el-breadcrumb__inner) {
    color: #fff;
  }
}
</style>

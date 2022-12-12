<template>
  <el-breadcrumb id="navigation-wrapper">
    <el-breadcrumb-item v-for="(item, i) in route.meta.breadcrumb" :to="{ path: item.path }" :key="i">
      <div
        :style="{
          color: item.textColor
        }"
      >
        <i v-if="i == 0" :class="`iconfont ${item.ico}`"></i>{{ item.title }}
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
const route = useRoute() as any;
</script>

<style lang="scss" scoped>
#navigation-wrapper {
  margin-top: 35px;
  padding-left: 40px;
  ::v-deep .el-breadcrumb__inner {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #5d677d;
    line-height: 17px;
    .iconfont {
      font-size: 12px;
      margin-right: 10px;
    }
  }
}
</style>

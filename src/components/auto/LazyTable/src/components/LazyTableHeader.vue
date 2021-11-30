<template>
  <!-- 标题 -->
  <span>{{ props.headerItem.label }}</span>
  <!-- 排序 -->
  <span class="table-header-sort" v-if="props.headerItem.sort ? true : false">
    <i class="iconfont icon-shaixuanjiantoushang" sign="asc" />
    <i class="iconfont icon-shaixuanjiantouxia" sign="des" />
  </span>
  <!-- 筛选 -->
  <el-popover v-model:visible="visible" placement="bottom" :width="160">
    <!-- 筛选列表 -->
    <p>Are you sure to delete this?</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">cancel</el-button>
      <el-button type="primary" size="mini" @click="visible = false">confirm</el-button>
    </div>
    <!-- 筛选按钮 -->
    <template #reference>
      <span class="table-header-filter">
        <i class="iconfont icon-shaixuan" v-if="props.headerItem.filter ? true : false" />
      </span>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineProps, ref } from 'vue';
const props = defineProps({
  headerItem: <any>Object
});
const visible = ref(false);
console.log('自定义表头', props.headerItem);
</script>
<style lang="scss">
// 排序
.table-header-sort {
  position: relative;
  margin-left: 5px;
}
.table-header-sort > i {
  cursor: pointer;
  font-size: 10px;
  position: absolute;
  transform: scale(0.8);
}
.table-header-sort > i[sign='asc'] {
  top: -6px;
}
.table-header-sort > i[sign='des'] {
  top: 3px;
}
// 筛选
.table-header-filter {
  margin-left: 5px;
}
.table-header-filter > i {
  cursor: pointer;
  font-size: 10px;
}
.table-header-filter > i:hover,
.table-header-sort > i:hover {
  color: #409eff;
}
</style>

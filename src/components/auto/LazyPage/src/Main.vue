<template>
  <div class="lazy-page-wapper">
    <span>共 {{ props.page.total === undefined ? '-' : props.page.total }} 条</span>
    <el-select v-model="state.pageSize" style="width: 100px" @change="handleSizeChange">
      <el-option v-for="item in state.pageSizes" :key="item" :label="`${item}条/页`" :value="item">
        <div>{{ item }}条/页</div>
      </el-option>
    </el-select>
    <el-pagination
      v-model:currentPage="state.pageNum"
      :page-size="state.pageSize"
      :total="props.page.total === undefined ? 1 : props.page.total"
      layout=" prev, pager, next"
    >
    </el-pagination>
    <span class="page-go-to-box">前往 <el-input v-model="state.goPage" style="width: 46px" /> 页</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, reactive } from 'vue';

const props = defineProps<{
  page?: any;
}>();
const state = reactive<any>({
  pageNum: props.page.pageNum === undefined ? 1 : +props.page.pageNum, // 当前页
  goPage: props.page.pageNum === undefined ? 1 : +props.page.pageNum, // 前往页
  pageSize: props.page.pageSize === undefined ? 20 : +props.page.pageSize, // 每页条数
  pageSizes: props.page.pageSizes === undefined ? [20, 50, 70, 100] : props.page.pageSizes // 分页分组
});

function handleSizeChange(val: number) {
  console.log(`${val} items per page`);
}
</script>
<style scoped lang="scss">
.lazy-page-wapper {
  position: absolute;
  bottom: 0;
  right: 20px;
  height: 60px;
  display: -webkit-flex;
  display: flex; /*定位（写在父元素中）*/
  align-items: center;
  ::v-deep .el-select {
    margin-left: 15px;
    .el-input__inner {
      height: 28px;
    }
  }
  .page-go-to-box {
    ::v-deep .el-input__inner {
      padding: 0 3px;
      height: 28px;
      text-align: center;
    }
  }
}
</style>

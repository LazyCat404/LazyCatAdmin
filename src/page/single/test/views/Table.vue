<template>
  <div class="test-table-wrapper">
    <div>
      <LazySearch :list="list" @change="searchChange"></LazySearch>
    </div>
  </div>
</template>
<script setup lang="ts">
let list = [
  {
    label: 'IP地址',
    key: 'ip'
  },
  {
    label: '服务器名称',
    key: 'ip'
  }
];
function searchChange(val: unknown) {
  console.log('搜索值发生改变：', val);
}
</script>
<style scoped lang="scss">
.test-table-wrapper {
  width: 100%;
  height: 100%;
  > div {
    width: 500px;
    margin: 50px;
  }
}
</style>

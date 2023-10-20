<template>
  <div class="test-table-wrapper">
    <div>
      <LazySearch :list="list" @change="searchChange" v-model="obj.searchValue"></LazySearch>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const obj = reactive<any>({
  searchValue: {
    name: '服务器1'
  }
});
let list = [
  {
    label: 'IP地址',
    key: 'ip'
  },
  {
    label: '服务器名称',
    key: 'name'
  }
];
function searchChange(val: unknown) {
  console.log('搜索值发生改变：', val, obj.searchValue);
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

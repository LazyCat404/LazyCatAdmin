<template>
  <div class="test-table-wrapper">
    <div>
      <LazySearch :list="obj.list" @change="searchChange" v-model="obj.searchValue"></LazySearch>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const obj = reactive<any>({
  searchValue: { class: 1 },
  list: [
    {
      label: '时间',
      key: 'time',
      type: 'time'
    },
    {
      label: '日期',
      key: 'date',
      type: 'datetimerange'
    },
    {
      label: '班级',
      key: 'class',
      show: false,
      list: [
        {
          label: '一班',
          value: 1
        },
        {
          label: '二班',
          value: 2
        }
      ]
      // type: 'select'
    },
    {
      label: '名称',
      key: 'name'
    }
  ]
});

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

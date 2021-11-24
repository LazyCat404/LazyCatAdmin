<template>
  <LazyTable :tableData="tableData" :tableOptions="tableOptions" :tableConfig="tableConfig"></LazyTable>
  <!-- <LazyTable :tableData="tableData" :tableOptions="tableOptions"></LazyTable> -->
</template>

<script lang="ts" setup>
let tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小红',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小刚',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-03',
    name: '王小明',
    address: '上海市普陀区金沙江路 1516 弄'
  }
];
let tableOptions = [
  {
    prop: 'date',
    label: '日期',
    width: 100
  },
  {
    prop: 'name',
    filters: [
      { text: '王小明', value: 0 },
      { text: '王小刚', value: 1 }
    ],
    label: '姓名'
  },
  {
    prop: 'address',
    label: '地址'
  }
];
let tableConfig = {
  select: true,
  border: true
};
</script>
<style></style>

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
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1515 弄'
  },
  {
    date: '2016-05-04',
    name: '王小红',
    address: '上海市普陀区金沙江路 1514 弄'
  },
  {
    date: '2016-05-01',
    name: '王小刚',
    address: '上海市普陀区金沙江路 1513 弄'
  },
  {
    date: '2016-05-03',
    name: '王小明',
    address: '上海市普陀区金沙江路 1512 弄'
  }
];
let tableOptions = [
  {
    prop: 'date',
    label: '日期',
    minwidth: 100,
    fixed: 'left'
  },
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'address',
    label: '地址',
    minwidth: 650
  }
];
let tableConfig = {
  // select: false,
  // border: true
  tableH: '200'
  // headerH: 'calc(55px + 5px)',
  // lineH: 40
  // headerBg: 'red',
  // oddBg: 'red',
  // evenBg: '#ddd',
};
</script>
<style></style>

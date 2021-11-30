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
  }
];
let tableOptions = [
  {
    prop: 'date',
    label: '日期',
    minwidth: 100,
    align: 'center',
    filter: {
      list: [
        { label: '2021-2020', value: 1 },
        { label: '2020-2019', value: 2 }
      ],
      type: 'select' // 单选（默认）
    }
    // fixed: 'left'
  },
  {
    prop: 'name',
    label: '姓名',
    filter: {
      list: [
        { label: '小明', value: 1 },
        { label: '小红', value: 2 }
      ],
      type: 'check' // 复选
    }
  },
  {
    prop: 'address',
    label: '地址',
    minwidth: 300,
    sort: []
  }
];
let tableConfig = {
  // select: false,
  // border: true
  // tableH: '200'
  // headerH: 'calc(55px + 5px)'
  // lineH: 40
  // headerBg: 'red',
  // oddBg: 'red',
  // evenBg: '#ddd',
  // align: 'right'
};
</script>
<style></style>

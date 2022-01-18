<template>
  <LazyTable
    :tableData="state.tableData"
    :tableOptions="tableOptions"
    :tableConfig="tableConfig"
    :sync="true"
    @select="handleSelection"
    @select-all="handleSelectionAll"
    @selection-change="handleSelectionChange"
    @sort-change="sortChange"
    @filter-change="filterChange"
    @row-confirm="rowConfirm"
    @change="switchChange"
  ></LazyTable>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
// import Test from './Test.vue';
let selList = [
  { label: '和平区', value: 1 },
  { label: '南开区', value: 2 },
  { label: '虹桥区', value: 3 },
  { label: '静海区', value: 4 },
  { label: '东丽区', value: 5 }
];
const state = reactive<any>({
  tableData: [
    {
      date: '2016-05-04',
      name: '赵小四',
      address: '上海市普陀区金沙江路 1518 弄',
      onLine: false,
      addressId: 1,
      state: 1
    },
    {
      date: '2016-05-04',
      name: '王小红',
      address: '上海市普陀区金沙江路 1517 弄',
      onLine: 1,
      addressId: 2,
      state: 2
    },
    {
      date: '2016-05-01',
      name: '王小刚',
      address: '上海市普陀区金沙江路 1519 弄',
      onLine: '123',
      addressId: 3,
      state: 3
    },
    {
      date: '2016-05-03',
      name: '王小明王小明王小明王小明王小明王小明王小明王小明王小明王小明王小明王小明王小明王小明',
      address: '上海市普陀区金沙江路 1516 弄',
      onLine: true,
      addressId: 4,
      state: 4
    },
    {
      date: '2016-05-04',
      name: '王小红',
      address:
        '上海市普陀区金沙江路 1514 弄上海市普陀区金沙江路 1514 弄上海市普陀区金沙江路 1514 弄上海市普陀区金沙江路 1514 弄',
      addressId: [1, 2, 3, 4, 5],
      state: 5
    }
  ]
});
let tableOptions = [
  {
    prop: 'date',
    label: '日期',
    minwidth: 100,
    align: 'center',
    edit: {
      type: 'date'
    },
    state: 'state',
    // ico: 'iconfont icon-gerenshezhi',
    filter: [
      { label: '2021-2020', value: 1 },
      { label: '2020-2019', value: 2 }
    ],
    sort: 'des', // 排序，des：降序，ase:升序，null/'':无默认排序，不区分大小写
    click: '11',
    copy: true
  },
  {
    prop: 'name',
    label: '姓名',
    minwidth: 100,
    color: 'red',
    // icoColor: 'red',
    // edit: true,
    copy: true,
    state: 'state',
    ico: 'iconfont icon-shezhi',
    filter: {
      list: [
        { label: '小明', value: 1 },
        { label: '小红', value: 2 }
      ],
      type: 'select' //  单选,check复选（默认）
    },
    sort: null, // 排序
    // edit: true,
    // tip: false,
    edit: {
      // show: false,
      // type: '',
      inspect: 'isTel',
      err: '手机号验证失败'
    }
  },
  {
    prop: 'address',
    label: '地址',
    minwidth: 150,
    sort: 'asc',
    tip: true,
    edit: {
      type: 'select',
      list: selList,
      selectProp: 'addressId'
    },
    click: (par: unknown) => {
      console.log('点击事件', par);
    }
  },
  {
    prop: 'onLine',
    label: '在线',
    // switch: '123'
    // switch: []
    // switch: 0
    switch: {
      disabled: false, // 是否禁用（不可编辑），默认禁用
      // activeColor: 'red'
      activeValue: 1,
      // tip: '',
      // tipActive: '在线'
      tipInactive: '离线'
    }
  },
  {
    label: '操作',
    template: `
      <el-popover
        placement="top-start"
        title="Title"
        :width="200"
        trigger="hover"
        content="this is content, this is content, this is content"
      >
        <template #reference>
          <el-button size="small" @click='myClick(scope)'>Hover</el-button>
        </template>
      </el-popover>
    `,
    // template: Test,
    // sort: 'des',
    methods: {
      myClick
    },
    tip: false
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
  align: 'right'
};
function filterChange(filter: any) {
  console.log('筛选：', filter);
}
function sortChange(sort: any) {
  console.log('排序：', sort);
}
function rowConfirm(par: any) {
  console.log('行编辑确认(已修改)：', par);
  // 修改对应行数据
  if (par.editType === 'select') {
    state.tableData[par.rowIndex || 0][par.prop] = par.resLabel;
    state.tableData[par.rowIndex || 0][par.selectProp] = par.res;
  } else {
    state.tableData[par.rowIndex || 0][par.prop] = par.res;
  }
}
// 手动勾选数据行的 Checkbox
function handleSelection(selection: Array<unknown>, row: unknown) {
  console.log('手动勾选数据行的 Checkbox', row);
}
// 手动勾选全选 Checkbox
function handleSelectionAll(selection: Array<unknown>) {
  console.log('手动勾选全选框', selection);
}
// 选择项发生变化
function handleSelectionChange(selection: Array<unknown>) {
  console.log('选择项发生变化', selection);
}
// switch 值改变
function switchChange(parame: unknown) {
  console.log('switch', parame);
}
// 自定义模板方法
function myClick(scope: unknown) {
  console.log('自定义模板法', scope);
}
</script>
<style scoped>
.el-button {
  color: red;
}
</style>

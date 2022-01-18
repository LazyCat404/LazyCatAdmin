<template>
  <LazyTable :tableData="state.tableData" :tableOptions="state.tableOptions"></LazyTable>
</template>
<script lang="ts" setup>
import api from '@/apis/system';
import { reactive } from 'vue';

const state = reactive<any>({
  tableData: [],
  tableOptions: []
});
function getUserList() {
  api.getUserList().then(res => {
    state.tableData = res.data;
  });
}
function init() {
  state.tableOptions = [
    {
      prop: 'userName',
      label: '用户名'
    },
    {
      prop: 'nickName',
      label: '昵称'
    },
    {
      prop: 'roleName',
      label: '所属角色',
      ico: 'prop === "超级管理员" ? "iconfont icon-qiyeguanli_yuangongguanli": prop === "普通员工" ? "iconfont icon-yonghu2" : "iconfont icon-yonghuguanli1"',
      icoColor: 'prop === "超级管理员" ? "#a0a6ff": prop === "普通员工" ? "#a1d9ce" : "#f0cf9e"'
    },
    {
      prop: 'state',
      label: '状态',
      align: 'center',
      colorX: 'state',
      color: 'prop === "已登录" ? "#37ac19" : prop === "游离" ? "#198aac" : "#b3b4b4"'
    }
  ];
  getUserList();
}
init();
</script>
<style lang="scss" scoped></style>

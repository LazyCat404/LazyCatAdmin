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
      label: '所属角色'
    },
    {
      prop: 'state',
      label: '状态'
    }
  ];
  getUserList();
}
init();
</script>
<style lang="scss" scoped></style>

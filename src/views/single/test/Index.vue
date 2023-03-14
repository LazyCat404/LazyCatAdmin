<template>
  <div class="test-wrapper">
    <LazyTable :tableData="obj.tableData" :tableOptions="obj.tableOptions"></LazyTable>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import testData from './json/testData.json';
const obj = reactive<any>({
  tableOptions: [],
  tableData: []
});
obj.tableData = computed(() => {
  let tableData = testData.data;
  return tableData;
});
obj.tableOptions = computed(() => {
  let tableOptions = [
    {
      prop: 'name',
      label: '云桌面名称'
    },
    {
      prop: 'statusI18N',
      label: '状态'
    },
    {
      prop: 'torrent',
      label: 'BT种子状态'
    },
    {
      prop: 'userName',
      label: '关联用户'
    },
    {
      prop: 'mode',
      label: '还原模式'
    },
    {
      prop: 'ip',
      label: 'IP地址'
    },
    {
      prop: 'os',
      label: '模板机'
    },
    {
      prop: 'client',
      label: '绑定客户机'
    },
    {
      prop: 'issueStatus',
      label: '下发状态'
    }
  ];
  return tableOptions;
});
</script>
<style lang="scss" scoped>
.test-wrapper {
  width: 500px;
  height: 300px;
  padding: 50px;
}
</style>

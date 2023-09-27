<template>
  <div class="desktop-list-wrapper">
    <div class="table-box">
      <LazyTable :tableData="obj.tableData" :tableOptions="tableOptions"></LazyTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';

const obj = reactive<any>({
  tableData: []
});
const tableOptions = computed(() => {
  let tableOptions: Array<any> = [];
  return tableOptions;
});
</script>

<style lang="scss" scoped>
.desktop-list-wrapper {
  margin-top: 80px;
  display: flex;
  .table-box {
    flex: 1;
    margin: 0 15px 15px 15px;
  }
}
</style>

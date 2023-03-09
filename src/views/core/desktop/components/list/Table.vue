<template>
  <div class="desktop-table-wrapper">
    <div class="table-box">
      <LazyTable :tableData="obj.tableData" :tableOptions="obj.tableOptions"></LazyTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const obj = reactive<any>({
  tableData: [],
  tableOptions: []
});
</script>

<style lang="scss" scoped>
.desktop-table-wrapper {
  .table-box {
  }
}
</style>

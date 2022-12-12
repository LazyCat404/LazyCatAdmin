<template>
  <div class="bench-list-wrapper">
    <Search></Search>
    <Table></Table>
  </div>
</template>

<script lang="ts" setup>
import Search from '../components/list/Search.vue';
import Table from '../components/list/Table.vue';
</script>
<style lang="scss" scoped>
.bench-list-wrapper {
  display: flex;
  flex-direction: column;
}
</style>

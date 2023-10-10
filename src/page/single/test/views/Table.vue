<template>
  <div class="test-table-wrapper">
    <div>
      <LazySearch></LazySearch>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.test-table-wrapper {
  width: 100%;
  height: 100%;
  > div {
    width: 500px;
    margin: 50px;
  }
}
</style>

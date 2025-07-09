<template>
  <div class="vdi-wrapper">
    <List @currentItemDetail="currentItemDetail"></List>
    <Detail v-if="obj.currentItem" :currentItem="obj.currentItem"></Detail>
  </div>
</template>
<script setup lang="ts">
import List from '../components/vdi/List.vue';
import Detail from '../components/vdi/Detail.vue';
import { reactive } from 'vue';
const obj = reactive<any>({
  currentItem: null
});

function currentItemDetail(item: unknown) {
  obj.currentItem = item;
}
</script>
<style scoped lang="scss"></style>

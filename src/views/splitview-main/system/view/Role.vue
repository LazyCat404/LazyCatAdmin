<template>
  <RoleList></RoleList>
  <div v-loading="state.loading">
    <PowerList :id="state.id"></PowerList>
  </div>
</template>
<script lang="ts" setup>
import RoleList from './components/Role/RoleList.vue';
import PowerList from './components/Role/PowerList.vue';
import { reactive } from 'vue';
const state = reactive({
  id: null,
  loading: true
});
</script>
<style lang="scss" scoped></style>

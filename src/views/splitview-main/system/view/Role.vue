<template>
  <RoleList></RoleList>
  <PowerList :id="state.id"></PowerList>
</template>
<script lang="ts" setup>
import RoleList from './components/Role/RoleList.vue';
import PowerList from './components/Role/PowerList.vue';
import { reactive } from 'vue';
const state = reactive({
  id: null
});
</script>
<style lang="scss" scoped></style>

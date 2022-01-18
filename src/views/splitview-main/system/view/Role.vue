<template>
  <RoleList @deliverPar="deliverPar"></RoleList>
  <RoleDetail :detail="state.role"></RoleDetail>
  <PowerList :id="state.role.id"></PowerList>
</template>
<script lang="ts" setup>
import RoleList from './components/Role/RoleList.vue';
import PowerList from './components/Role/PowerList.vue';
import { reactive } from 'vue';
import RoleDetail from './components/Role/RoleDetail.vue';
const state = reactive({
  role: {
    id: undefined
  }
});
function deliverPar(par: any) {
  state.role = par;
}
</script>
<style lang="scss" scoped></style>

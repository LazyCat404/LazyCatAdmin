<template>
  <div class="system-role-list-wrapper">
    <el-scrollbar height="100%">
      <ul>
        <li v-for="(item, i) in state.roleList" :key="i" @click="deliverPar(item.id)">
          {{ item.label }}
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import api from '@/apis/system';
import { defineEmits, reactive } from 'vue';
const state = reactive<any>({
  roleList: []
});
const $emits = defineEmits(['deliverPar']);

// 获取角色列表
function getRole() {
  api.getRole().then(res => {
    state.roleList = res.data;
    $emits('deliverPar', res.data[0].id);
  });
}
// 传递参数
function deliverPar(id: number | string) {
  $emits('deliverPar', id);
}
function init() {
  getRole();
}
init();
</script>
<style lang="scss" scoped>
.system-role-list-wrapper {
  float: left;
  width: 150px;
  height: 100%;
}
</style>

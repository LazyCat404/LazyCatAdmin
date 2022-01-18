<template>
  <div class="system-role-list-wrapper">
    <el-scrollbar height="100%">
      <ul class="system-role-list-box">
        <li
          v-for="(item, i) in state.roleList"
          :key="i"
          @click="deliverPar(item)"
          :class="state.activeRole === item.id ? 'active' : ''"
        >
          <!-- 默认角色，不可编辑 -->
          <span v-if="item.default && !item.modify" class="iconfont icon-qiyeguanli_yuangongguanli"></span>
          <!-- 默认角色，可编辑 -->
          <span v-if="item.default && item.modify" class="iconfont icon-yonghu2"></span>
          <!-- 自定义角色，可编辑 -->
          <span v-if="!item.default && item.modify" class="iconfont icon-yonghuguanli1"></span>
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
  roleList: [],
  activeRole: null
});
const $emits = defineEmits(['deliverPar']);

// 获取角色列表
function getRoleList() {
  api.getRoleList().then(res => {
    state.roleList = res.data;
    state.activeRole = res.data[0].id;
    $emits('deliverPar', res.data[0]);
  });
}
// 传递参数
function deliverPar(role: { id: unknown }) {
  state.activeRole = role.id;
  $emits('deliverPar', role);
}
function init() {
  getRoleList();
}
init();
</script>
<style lang="scss" scoped>
.system-role-list-wrapper {
  float: left;
  width: 148px;
  height: calc(100% - 20px);
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  .system-role-list-box {
    li {
      line-height: 50px;
      padding: 0 10px;
      cursor: pointer;
    }
    li.active {
      color: aqua;
      // padding-left: 8px;
      // border-left: 2px solid #4f53ff;
    }
  }
}
</style>

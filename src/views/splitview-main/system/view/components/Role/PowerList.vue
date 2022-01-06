<template>
  <div class="system-role-power-wrapper" v-loading="state.loading">
    <el-scrollbar height="100%">
      <el-tree
        ref="powerTreeRef"
        show-checkbox
        node-key="id"
        default-expand-all
        :data="state.powerList"
        :expand-on-click-node="false"
        :props="{ disabled: customNode }"
      >
        <template #default="{ node, data }">
          <span>{{ node.label }}</span>
          <span
            v-if="data.disable !== undefined"
            @click="disableModule(node, data)"
            :class="data.disable ? 'iconfont icon-yincang' : 'iconfont icon-yanjing'"
          >
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import api from '@/apis/system';
import { defineProps, reactive, ref, watch } from 'vue';
import type { ElTree } from 'element-plus';
const props = defineProps({
  id: {
    type: [String, Number]
  }
});
const state = reactive<any>({
  loading: true, // 加载中
  powerList: [],
  default: true
});
interface Tree {
  id: number;
  label: string;
  disable?: boolean;
  children?: Tree[];
  power?: boolean;
}
const powerTreeRef = ref<InstanceType<typeof ElTree>>();
function customNode(data: Tree, node: any) {
  if (data.children && data.children.length) {
    return data.disable;
  } else {
    // 最内层节点
    // if (data.power !== node.checked && state.default) {
    //   node.checked = data.power;
    // }
    // node.checked = data.power;

    return node.parent.data.disable;
  }
}

// 获取角色权限
function getPower() {
  state.loading = true;
  api.getPower({ id: props.id }).then((res: any) => {
    state.powerList = res.data;
    state.loading = false;
  });
}
// 模块禁用
function disableModule(node: any, data: any) {
  data.disable = !data.disable;
  if (data.children && data.children.length) {
    data.children.forEach((item: Tree) => {
      if (item.children && item.children.length) {
        item.disable = data.disable;
      }
    });
  }
}
watch(
  () => props.id,
  () => {
    getPower();
  }
);
</script>
<style lang="scss" scoped>
.system-role-power-wrapper {
  float: left;
  width: calc(100% - 150px);
  height: 100%;
}
</style>

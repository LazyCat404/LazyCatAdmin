<template>
  <div class="system-role-power-wrapper" v-loading="state.loading">
    <el-scrollbar height="100%">
      <el-tree
        ref="powerTreeRef"
        node-key="id"
        show-checkbox
        default-expand-all
        empty-text="暂无数据"
        :data="state.powerList"
        :expand-on-click-node="false"
        :default-checked-keys="state.defaultChecked"
        :props="{ disabled: customNodeDisabled, class: customNodeClass }"
      >
        <template #default="{ node, data }">
          <span class="keep-out" :id="`keep-out-${node.id}`"> </span>
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
import api from '@api';
import {  reactive, ref, watch } from 'vue';
import type { ElTree } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';

const props = defineProps({
  id: {
    type: [String, Number]
  }
});
const state = reactive<any>({
  loading: true, // 加载中
  powerList: [],
  defaultChecked: []
});
interface Tree {
  id: number;
  label: string;
  disable?: boolean;
  children?: Tree[];
  power?: boolean;
}
const powerTreeRef = ref<InstanceType<typeof ElTree>>();

function customNodeDisabled(data: Tree, node: Node) {
  if (data.children && data.children.length) {
    return data.disable;
  } else {
    return node.parent.data.disable;
  }
}
function customNodeClass(data: Tree, node: Node) {
  if (data.children && data.children.length && node.level > 1) {
    return 'power-list-box';
  }
  return null;
}
// 获取角色权限
function getPowerList() {
  state.loading = true;
  state.defaultChecked = [];
  api.system.getPowerList({ id: props.id }).then((res: res) => {
    state.powerList = res.data;
    state.loading = false;
    defaultChecked(res.data);
  });
}
// 模块禁用
function disableModule(node: Node, data: Tree) {
  data.disable = !data.disable;
  // 非一级模块
  if (node.level > 1) {
    if (data.disable) {
      let isDis = true;
      node.parent.data.children.forEach((item: { disable: boolean }) => {
        isDis = isDis && item.disable;
      });
      // 兄弟元素全部禁用，则父元素不可在勾选
      if (isDis) {
        let pow = powerTreeRef.value as { el$: Element };
        let parentDom = pow.el$.querySelector(`#keep-out-${node.parent.id}`);
        if (parentDom) {
          parentDom.setAttribute('style', 'display:inline-block');
        }
      }
    } else {
      node.parent.data.disable = false;
      let pow = powerTreeRef.value as { el$: Element };
      let parentDom = pow.el$.querySelector(`#keep-out-${node.parent.id}`);
      if (parentDom) {
        parentDom.setAttribute('style', 'display:none');
      }
    }
  } else {
    let pow = powerTreeRef.value as { el$: Element };
    let selfDom = pow.el$.querySelector(`#keep-out-${node.id}`);
    if (selfDom) {
      selfDom.setAttribute('style', 'display:none');
    }
  }
  if (data.children && data.children.length) {
    data.children.forEach((item: Tree) => {
      if (item.children && item.children.length) {
        item.disable = data.disable;
      }
    });
  }
}
// 默认勾选
function defaultChecked(par: Array<Tree>) {
  par.forEach((item: Tree) => {
    if (item.children && item.children.length) {
      defaultChecked(item.children);
    } else {
      if (item.power === true) {
        state.defaultChecked.push(item.id);
      }
    }
  });
}
watch(
  () => props.id,
  () => {
    getPowerList();
  }
);
</script>
<style lang="scss" scoped>
.system-role-power-wrapper {
  float: left;
  width: calc(100% - 170px);
  height: calc(100% - 90px);
  ::v-deep .el-tree-node.is-expanded.power-list-box > .el-tree-node__children {
    display: flex;
    flex-direction: row;
  }
  ::v-deep .power-list-box > .el-tree-node__children > div {
    width: 25%;
  }
}
.keep-out {
  position: absolute;
  z-index: 99;
  margin-left: 24px;
  width: 15px;
  height: 15px;
  background-color: transparent;
  display: none;
}
</style>

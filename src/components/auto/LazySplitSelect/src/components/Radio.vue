<template>
  <div class="radio-wrapper">
    <el-scrollbar height="220px">
      <el-tree :data="data" accordion :props="{ class: customNodeClass, ...treeProps }" @node-click="nodeClick" />
    </el-scrollbar>
    <div class="node-target-box">
      <div v-if="!obj.targetList.length" class="node-target-empty">暂无数据</div>
      <el-radio-group v-else v-model="obj.selectTarget">
        <el-radio
          v-for="(item, i) in obj.targetList"
          :key="i"
          :label="item[listProps.value]"
          @click="radioClick($event, item[listProps.value], item)"
        >
          <span v-hide>{{ item[listProps.label] }}</span>
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';

interface Props {
  data: Array<any>;
  treeProps: {
    label: string;
    list: string;
    children: string;
    disabled: string;
  };
  listProps: {
    label: string;
    value: string;
    disabled: string;
  };
  modelValue: Array<string | number> | string | number;
}
const props = defineProps<Props>();
const $emits = defineEmits(['change']);
const obj = reactive<any>({
  targetList: [],
  selectTarget: '',
  currentTreeNode: '' // 当前点击的tree 节点
});
// 树节点点击
function nodeClick(data: any) {
  obj.targetList = [];
  obj.currentTreeNode = JSON.stringify(data);
  let nodeTargetList = data[props.treeProps.list];
  if (nodeTargetList) {
    if (Object.prototype.toString.call(nodeTargetList) === '[object Array]') {
      obj.targetList = nodeTargetList;
    } else {
      console.warn(`目标列表仅支持 Array 类型`);
    }
  } else {
    obj.targetList = [];
  }
}
// 单选改变
function radioClick($event: PointerEvent, val: string | number | boolean, radioItem: any) {
  if ($event.target && ($event.target as HTMLElement).tagName === 'INPUT') return; // 只调用一次
  if (val !== obj.selectTarget) {
    obj.selectTarget = val;
    $emits('change', val, radioItem);
  }
}
// 自定义类名
function customNodeClass(data: any) {
  if (JSON.stringify(data) == obj.currentTreeNode) {
    return 'current-node';
  }
  return '';
}
// 默认选中(可优化调用)
function defaultSelected(oprList?: Array<any>) {
  obj.selectTarget = props.modelValue;
  if (props.modelValue) {
    let filterList = oprList ? oprList : props.data;
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i][props.treeProps.list]) {
        let list = filterList[i][props.treeProps.list].filter(
          (item: any) => item[props.listProps.value] == props.modelValue
        );
        if (list.length) {
          obj.currentTreeNode = JSON.stringify(filterList[i]);
          obj.targetList = filterList[i][props.treeProps.list];

          $emits('change', props.modelValue, list[0]);
          return;
        }
      }
      if (filterList[i][props.treeProps.children]) {
        defaultSelected(filterList[i][props.treeProps.children]);
      }
    }
  } else {
    // 清空
    obj.targetList = [];
    obj.selectTarget = '';
    obj.currentTreeNode = ''; // 当前点击的tree 节点
  }
}
watch(
  [() => props.modelValue, () => props.data],
  () => {
    defaultSelected();
  },
  { deep: true, immediate: true }
);
</script>
<style scoped lang="scss">
.radio-wrapper {
  display: flex;
  height: 220px;
  .el-scrollbar {
    width: 50%;
    .el-tree {
      padding-right: 12px;
      box-sizing: border-box;
      > ::v-deep .el-tree-node {
        width: fit-content;
        min-width: 100%;
        .el-tree-node__content {
          min-width: 100%;
          width: fit-content;
          box-sizing: border-box;
        }
      }
      ::v-deep .current-node {
        > .el-tree-node__content {
          background-color: #f5f7fa;
        }
      }
    }
  }
  .node-target-box {
    width: 50%;
    padding-left: 12px;
    box-sizing: border-box;
    border-left: 1px solid #c0c4cc;
    .node-target-empty {
      color: #909399;
      text-align: center;
      height: 26px;
      line-height: 26px;
    }
    .el-radio-group {
      width: 100%;
      .el-radio {
        width: 100%;
        ::v-deep .el-radio__label {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: calc(100% - 14px);
          > span {
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>

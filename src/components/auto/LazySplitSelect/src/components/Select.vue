<template>
  <div class="select-wrapper">
    <el-scrollbar height="220px">
      <el-tree :data="data" accordion :props="{ class: customNodeClass, ...treeProps }" @node-click="nodeClick" />
    </el-scrollbar>
    <div class="node-target-box">
      <div v-if="!obj.targetList.length" class="node-target-empty">暂无数据</div>
      <template v-else>
        <el-checkbox v-model="obj.checkAll" :indeterminate="obj.isIndeterminate" @change="handleCheckAllChange">
          全选
        </el-checkbox>
        <el-checkbox-group v-model="obj.selectTarget" @change="checkChange">
          <el-checkbox
            v-for="(item, i) in obj.targetList"
            :key="i"
            :label="item[listProps.value]"
            :disabled="item[listProps.disabled]"
            @click="item[listProps.disabled] ? null : checkClick($event, item)"
          >
            <span v-hide>{{ item[listProps.label] }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CheckboxValueType } from 'element-plus';
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
  modelValue: Array<string | number>;
}
const props = defineProps<Props>();
const $emits = defineEmits(['change']);
const obj = reactive<any>({
  checkAll: false, // 全选
  isIndeterminate: false, // 半选
  targetList: [], // 当前tree节点对应的列表
  selectTarget: [], // 选中的列表
  selectTargetItem: [], // 选中的列表完整对象
  currentTreeNode: '' // 当前点击的tree 节点
});
let checkMap = new WeakMap(); // 全局选中映射
// 树节点点击
function nodeClick(data: any) {
  obj.targetList = [];
  obj.currentTreeNode = JSON.stringify(data);
  let nodeTargetList = data[props.treeProps.list];
  if (nodeTargetList) {
    if (Object.prototype.toString.call(nodeTargetList) === '[object Array]') {
      obj.targetList = nodeTargetList;
      allCheckBtnControl();
    } else {
      console.warn(`目标列表仅支持 Array 类型`);
    }
  } else {
    obj.targetList = [];
  }
}
// 多选点击
function checkClick($event: PointerEvent, checkItem: any) {
  if ($event.target && ($event.target as HTMLElement).tagName === 'INPUT') return; // 只调用一次
  if (checkMap.has(checkItem)) {
    // 有映射，取消选中
    checkMap.delete(checkItem);
    obj.selectTargetItem = obj.selectTargetItem.filter(
      (item: unknown) => JSON.stringify(item) != JSON.stringify(checkItem)
    );
  } else {
    // 没有映射，勾选
    checkMap.set(checkItem, true);
    obj.selectTargetItem.push(checkItem);
  }
}
// 多选值改变
function checkChange(val: CheckboxValueType[]) {
  allCheckBtnControl();
  $emits('change', val, obj.selectTargetItem);
}
// 全选按钮点击
function handleCheckAllChange(val: CheckboxValueType) {
  obj.isIndeterminate = false; // 半选
  if (val) {
    obj.targetList.forEach((item: any) => {
      checkMap.set(item, true);
      let isExist = obj.selectTargetItem.filter((ite: unknown) => JSON.stringify(ite) === JSON.stringify(item));
      if (!isExist.length) {
        obj.selectTargetItem.push(item);
        obj.selectTarget.push(item[props.listProps.value]);
      }
    });
  } else {
    obj.targetList.forEach((item: any) => {
      checkMap.delete(item);
      obj.selectTargetItem = obj.selectTargetItem.filter(
        (ite: unknown) => JSON.stringify(ite) !== JSON.stringify(item)
      );
      obj.selectTarget = obj.selectTarget.filter((ite: unknown) => ite !== item[props.listProps.value]);
    });
  }
  $emits('change', obj.selectTarget, obj.selectTargetItem);
}
// 自定义类名
function customNodeClass(data: any) {
  if (JSON.stringify(data) == obj.currentTreeNode) {
    return 'current-node';
  }
  return '';
}
// 默认选中
function defaultSelected() {
  obj.targetList = [];
  obj.selectTarget = [];
  obj.selectTargetItem = [];
  obj.currentTreeNode = ''; // 当前点击的tree 节点
  checkMap = new WeakMap();
  obj.selectTarget = props.modelValue;
  if (props.modelValue && props.modelValue.length) {
    props.modelValue.forEach((item: string | number) => {
      autoCheck(props.data, item);
    });
    allCheckBtnControl();
    $emits('change', obj.selectTarget, obj.selectTargetItem, true);
  }
}
// 自动勾选
function autoCheck(oprList: Array<any>, item: string | number) {
  for (let i = 0; i < oprList.length; i++) {
    if (oprList[i][props.treeProps.list]) {
      let list = oprList[i][props.treeProps.list].filter((ite: any) => ite[props.listProps.value] == item);
      if (list.length) {
        checkMap.set(list[0], true);
        obj.selectTargetItem.push(list[0]);
        if (!obj.currentTreeNode) {
          obj.currentTreeNode = JSON.stringify(oprList[i]);
          obj.targetList = oprList[i][props.treeProps.list];
        }
        break;
      }
    }
    if (oprList[i][props.treeProps.children]) {
      autoCheck(oprList[i][props.treeProps.children], item);
    }
  }
}
// 全选按钮控制
function allCheckBtnControl() {
  obj.checkAll = false; // 全选
  obj.isIndeterminate = false; // 半选
  // 处理全选按钮状态
  let checkedList = []; // 当前列表已被选中列表
  obj.targetList.forEach((item: object) => {
    if (checkMap.has(item)) {
      checkedList.push(item);
    }
  });
  if (checkedList.length == obj.targetList.length) {
    obj.checkAll = true; // 全选
    obj.isIndeterminate = false; // 半选
  } else {
    obj.checkAll = false; // 全选
    obj.isIndeterminate = checkedList.length ? true : false; // 半选
  }
}
watch(
  () => props.modelValue,
  () => {
    if (JSON.stringify(props.modelValue) !== JSON.stringify(obj.selectTarget)) {
      defaultSelected();
    }
  },
  { deep: true, immediate: true }
);
watch(
  () => props.data,
  () => {
    defaultSelected();
  },
  { deep: true }
);
</script>
<style scoped lang="scss">
.select-wrapper {
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
    .el-checkbox-group {
      width: 100%;
      .el-checkbox {
        width: 100%;
        margin-right: 0;
        ::v-deep .el-checkbox__label {
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

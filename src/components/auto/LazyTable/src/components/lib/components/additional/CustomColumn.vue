<template>
  <Draggable
    v-model="state.tableOptions"
    item-key="slot-props"
    draggable=".disabled"
    class="table-list-setup-wrapper"
    @end="state.isDragging = false"
    @start="state.isDragging = true"
  >
    <template #item="{ element }">
      <template
        v-if="element.customColumn && Object.prototype.toString.call(element.customColumn) === '[object Object]'"
      >
        <div
          :class="
            element.customColumn.disabled === undefined ? 'disabled' : element.customColumn.disabled ? null : 'disabled'
          "
          :check="element.customColumn.show == undefined ? '' : element.customColumn.show ? '' : null"
          @click="
            element.customColumn.disabled === undefined
              ? (element.customColumn.show =
                  element.customColumn.show == undefined ? false : !element.customColumn.show)
              : element.customColumn.disabled
              ? null
              : (element.customColumn.show =
                  element.customColumn.show == undefined ? false : !element.customColumn.show)
          "
        >
          <span>{{ element.label }}</span>
          <i
            class="iconfont icon-jiaobiaoxuanzhong"
            v-if="element.customColumn.show == undefined ? true : element.customColumn.show"
          ></i>
        </div>
      </template>
      <template v-else>
        <div
          :class="element.disabled === undefined ? 'disabled' : element.disabled ? null : 'disabled'"
          :check="element.show == undefined ? '' : element.show ? '' : null"
          @click="
            element.disabled === undefined
              ? (element.show = element.show == undefined ? false : !element.show)
              : element.disabled
              ? null
              : (element.show = element.show == undefined ? false : !element.show)
          "
        >
          <span>{{ element.label }}</span>
          <i class="iconfont icon-jiaobiaoxuanzhong" v-if="element.show == undefined ? true : element.show"></i>
        </div>
      </template>
    </template>
  </Draggable>
  <!-- 按钮 -->
  <div class="custom-column-btn-wrapper">
    <el-button @click="resetBtn">重置</el-button>
    <el-button type="primary" @click="confirmBtn">确认</el-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import Draggable from 'vuedraggable';
const props = defineProps({
  tableOptions: {
    type: <any>Array,
    required: true
  },
  templateList: {
    type: <any>Array,
    required: true
  }
});

const $emits = defineEmits(['confirmBtn']);
const state = reactive<any>({
  tableOptions: JSON.parse(JSON.stringify(props.tableOptions)),
  isDragging: false
});
// 确认按钮
function confirmBtn() {
  state.dialogVisible = false;
  // 自定义组件模板处理
  if (props.templateList.length) {
    state.tableOptions.forEach((item: any, i: number): void => {
      if (Object.prototype.toString.call(item.template) === '[object Object]') {
        state.tableOptions[i].template = props.templateList.filter(
          (ite: any) => item.template.__scopeId == ite.template.__scopeId
        )[0].template; // 可能存
      }
    });
  }
  $emits('confirmBtn', state.tableOptions, '自定义列');
}
// 重置按钮
function resetBtn() {
  state.tableOptions = JSON.parse(JSON.stringify(props.tableOptions));
}
</script>
<style lang="scss" scoped>
.table-list-setup-wrapper {
  overflow: hidden;
  > div {
    float: left;
    width: calc((100% - 40px) / 3);
    text-align: center;
    border: 1px solid #d0d5de;
    border-radius: 4px;
    line-height: 40px;
    margin-bottom: 16px;
    color: #1c244d;
    cursor: no-drop;
    margin-right: 20px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    i.iconfont {
      position: absolute;
      line-height: 16px;
      right: 0;
      bottom: 0;
    }
  }
  > div:nth-child(3n) {
    margin-right: 0;
  }
  > div.disabled {
    cursor: pointer;
  }
  > div[check] {
    border: 1px solid #206bfa;
    color: #206bfa;
  }
}
.custom-column-btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>

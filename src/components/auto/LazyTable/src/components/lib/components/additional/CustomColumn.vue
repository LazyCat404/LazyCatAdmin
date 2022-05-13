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
      <template v-if="element.customList && Object.prototype.toString.call(element.customList) === '[object Object]'">
        <div
          :class="
            element.customList.disabled === undefined ? 'disabled' : element.customList.disabled ? null : 'disabled'
          "
          :check="element.customList.show == undefined ? '' : element.customList.show ? '' : null"
          @click="
            element.customList.disabled === undefined
              ? (element.customList.show = element.customList.show == undefined ? false : !element.customList.show)
              : element.customList.disabled
              ? null
              : (element.customList.show = element.customList.show == undefined ? false : !element.customList.show)
          "
        >
          <span>{{ element.label }}</span>
          <i
            class="iconfont icon-jiaobiaoxuanzhong"
            v-if="element.customList.show == undefined ? true : element.customList.show"
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
  <div class="dialog-footer">
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

const $emits = defineEmits(['customList']);
const state = reactive<any>({
  tableOptions: JSON.parse(JSON.stringify(props.tableOptions)),
  isDragging: false
});
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
  $emits('customList', state.tableOptions);
}
function resetBtn() {
  state.tableOptions = JSON.parse(JSON.stringify(props.tableOptions));
}
</script>
<style lang="scss" scoped>
.table-additional-functions-wrapper {
  margin: 0 20px;
  overflow: hidden;
  li {
    float: right;
  }
}
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
</style>

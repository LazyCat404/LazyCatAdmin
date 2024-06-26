<template>
  <Draggable
    v-model="obj.tableOptions"
    item-key="slot-props"
    draggable=".disabled"
    class="custom-column-wrapper"
    @end="obj.isDragging = false"
    @start="obj.isDragging = true"
  >
    <template #item="{ element }">
      <template v-if="element.show || element.show == undefined">
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
    </template>
  </Draggable>
  <!-- 按钮 -->
  <div class="custom-column-btn-wrapper">
    <el-button @click="init">重置</el-button>
    <el-button type="primary" @click="confirmBtn">确认</el-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import Draggable from 'vuedraggable';
const props = defineProps<{
  tableOptions: Array<any>;
  templateList: Array<any>;
}>();

const $emits = defineEmits(['confirmBtn']);
const obj = reactive<any>({
  tableOptions: [],
  isDragging: false
});
// 确认按钮
function confirmBtn() {
  obj.dialogVisible = false;
  // 自定义组件模板处理
  if (props.templateList.length) {
    obj.tableOptions.forEach((item: any, i: number): void => {
      if (Object.prototype.toString.call(item.template) === '[object Object]') {
        obj.tableOptions[i].template = props.templateList.filter(
          (ite: any) => item.template.__scopeId == ite.template.__scopeId
        )[0].template; // 可能存
      }
    });
  }
  $emits('confirmBtn', obj.tableOptions, '自定义列');
}

// 初始化/重置按钮
function init() {
  // 可自定义列项
  obj.tableOptions = [];
  JSON.parse(JSON.stringify(props.tableOptions)).forEach((item: any, i: number) => {
    if (item.customColumn && Object.prototype.toString.call(item.customColumn) === '[object Object]') {
      obj.tableOptions.push({
        ...item,
        click: props.tableOptions[i].click
      });
    } else {
      obj.tableOptions.push({
        ...item,
        customColumn: {
          show: true,
          disabled: item.disabled
        },
        click: props.tableOptions[i].click
      });
    }
  });
}

init();
</script>
<style lang="scss" scoped>
.custom-column-wrapper {
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

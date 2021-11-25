<template>
  <div :style="[{ height: state.config.tableH, position: 'relative' }]" ref="elTableDom">
    <!-- 表格 -->
    <el-table
      :header-row-style="{ height: state.config.headerH }"
      :row-style="{ height: state.config.lineH }"
      @cell-mouse-enter="mouseHover"
      @cell-mouse-leave="mouseOut"
      :data="tableData"
      :border="state.config.border"
      :max-height="state.config.tableH"
    >
      <!-- 空数据提示 -->
      <template #empty> 暂无数据 </template>
      <!-- 复选列表 -->
      <el-table-column type="selection" width="40" v-if="state.config.select"></el-table-column>
      <!-- 表格列表 -->
      <el-table-column v-for="(item, i) in tableOptions" :key="i">
        <template #header> haha </template>

        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
    </el-table>
    <!-- 滚动条 -->
    <div :style="[{ paddingTop: state.config.headerH }]">
      <el-scrollbar
        :style="[{ height: `calc(${state.config.tableH} - ${state.config.headerH})` }]"
        ref="elScrollbarDom"
        @scroll="scrollActive"
      >
        <div :style="[{ height: state.config.tableH }]"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import tool from '@/utils/tool';
import { defineProps, reactive, ref } from 'vue';
const elScrollbarDom = ref(null);
const elTableDom = ref(null);
const props = defineProps({
  tableData: {
    type: Array,
    required: true
  },
  tableOptions: {
    type: Array,
    required: true
  },
  tableConfig: Object
});

const state = reactive({
  // 表格默认配置
  config: {
    // 复选框（默认开启）
    select: props.tableConfig && props.tableConfig.select !== undefined ? props.tableConfig.select : true,
    // 框线（默认关闭）
    border: props.tableConfig && props.tableConfig.border !== undefined ? props.tableConfig.border : false,
    // table 高度（默认100%）
    tableH:
      props.tableConfig && props.tableConfig.tableH !== undefined ? tool.targetCss(props.tableConfig.tableH) : '100%',
    // 表头高度（默认50px）
    headerH:
      props.tableConfig && props.tableConfig.headerH !== undefined ? tool.targetCss(props.tableConfig.headerH) : '50px',
    // 表头背景色
    headerBg: props.tableConfig && props.tableConfig.headerBg !== undefined ? props.tableConfig.headerBg : '#fff',
    // 行高（默认40px）
    lineH: props.tableConfig && props.tableConfig.lineH !== undefined ? tool.targetCss(props.tableConfig.lineH) : '40px'
  }
});

console.log(22, state.config);
// 鼠标进入table
function mouseHover() {
  let eSD = elScrollbarDom.value as any;
  let eTD = elTableDom.value as any;
  let sNodeList = eSD.scrollbar.querySelectorAll('.el-scrollbar__bar');
  let tNodeList = eTD.querySelectorAll('.el-table__body-wrapper');
  sNodeList.forEach((element: any) => {
    element.style.display = 'block';
  });
  tNodeList.forEach((element: any) => {
    element.addEventListener('scroll', setScrollTop);
  });
}
// 鼠标离开table
function mouseOut() {
  let eSD = elScrollbarDom.value as any;
  let eTD = elTableDom.value as any;
  let sNodeList = eSD.scrollbar.querySelectorAll('.el-scrollbar__bar');
  let tNodeList = eTD.querySelectorAll('.el-table__body-wrapper');
  sNodeList.forEach((element: any) => {
    element.style.display = 'none';
  });
  tNodeList.forEach((element: any) => {
    element.removeEventListener('scroll', setScrollTop);
  });
}
// 设置滚动条距离顶部高度
function setScrollTop(value: any) {
  let eSD = elScrollbarDom.value as any;
  eSD.setScrollTop(value.target.scrollTop);
}
function scrollActive(scr: { scrollLeft: number; scrollTop: number }) {
  let eTD = elTableDom.value as any;
  let tNodeList = eTD.querySelectorAll('.el-table__body-wrapper');
  tNodeList.forEach((element: any) => {
    element.scrollTop = scr.scrollTop;
  });
}
</script>

<style lang="scss" scoped>
.el-table {
  margin: 0 20px;
  max-height: 100%;
  width: calc(100% - 40px);
  position: absolute;
  z-index: 99;
  ::v-deep .el-table__header-wrapper th.el-table__cell,
  ::v-deep .el-table__body-wrapper .el-table__cell {
    padding: 0;
  }
  ::v-deep .el-checkbox {
    height: auto;
  }
}
::v-deep .el-table-column--selection .cell {
  text-overflow: unset;
  padding: 0 !important;
  text-align: center;
}
// 滚动条
.el-scrollbar {
  margin: 0 22px;
  ::v-deep .el-scrollbar__bar {
    z-index: 999;
  }
}
</style>

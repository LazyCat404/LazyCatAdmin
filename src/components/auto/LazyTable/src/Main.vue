<template>
  <div
    :style="[{ maxHeight: state.config.tableH, height: state.tableBoxHeight, position: 'relative' }]"
    ref="elTableDom"
  >
    <!-- 表格 -->
    <el-table
      :header-row-style="{ height: state.config.headerH, background: state.config.headerBg }"
      :row-style="{ height: state.config.lineH }"
      :header-row-class-name="state.config.border ? '' : 'border-hide'"
      :row-class-name="tableRowClassName"
      @cell-mouse-enter="mouseHover"
      @cell-mouse-leave="mouseOut"
      :data="tableData"
      :border="state.config.border"
      :height="state.config.tableH"
      :max-height="state.config.tableH"
    >
      <!-- 空数据提示 -->
      <template #empty> 暂无数据 </template>
      <!-- 复选列表 -->
      <el-table-column
        type="selection"
        width="40px"
        v-if="state.config.select"
        :fixed="state.config.selectFixed"
      ></el-table-column>
      <!-- 表格列表 -->
      <el-table-column
        v-for="(item, i) in tableOptions"
        :key="i"
        :width="item.width"
        :minWidth="item.minWidth || item.minwidth"
        :fixed="item.fixed"
        :align="item.align ? item.align : state.config.align"
      >
        <!-- 表头 -->
        <template #header>
          <LazyTableHeader :headerItem="item"></LazyTableHeader>
        </template>
        <!-- 表体 -->
        <template #default="scope">{{ scope.row[item.prop] }}</template>
      </el-table-column>
    </el-table>
    <!-- 滚动条 -->
    <div
      v-if="state.scrollbarShow"
      :style="[
        {
          paddingTop: state.config.headerH,
          height: state.scrollbarBoxHeight
        }
      ]"
    >
      <el-scrollbar style="height: 100%" ref="elScrollbarDom" @scroll="scrollActive">
        <div :style="[{ height: state.tableRealHeight, width: state.tableRealWidth }]"></div>
      </el-scrollbar>
    </div>
    <div v-else>
      <!-- 辅（防止加载出错） -->
      <el-scrollbar style="height: 100%" ref="elScrollbarDom" @scroll="scrollActive">
        <div :style="[{ height: state.tableRealHeight, width: state.tableRealWidth }]"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import tool from '@/utils/tool';
import { defineProps, onMounted, reactive, ref } from 'vue';
import { config } from './config';
import LazyTableHeader from './components/LazyTableHeader.vue';
const elScrollbarDom = ref(null);
const elTableDom = ref(null);
const props = defineProps({
  tableData: {
    type: Array,
    required: true
  },
  tableOptions: {
    type: <any>Array,
    required: true
  },
  tableConfig: Object
});

const state = reactive({
  // 表格默认配置
  config: {
    // 复选框（默认开启）
    select: props.tableConfig && props.tableConfig.select !== undefined ? props.tableConfig.select : config.select,
    //复选框左侧固定
    selectFixed:
      props.tableConfig && props.tableConfig.selectFixed !== undefined
        ? props.tableConfig.selectFixed
        : config.selectFixed,
    // 框线（默认关闭）
    border: props.tableConfig && props.tableConfig.border !== undefined ? props.tableConfig.border : config.border,
    // table 高度（默认100%）
    tableH:
      props.tableConfig && props.tableConfig.tableH !== undefined
        ? tool.targetCss(props.tableConfig.tableH)
        : config.tableH,
    // 表头高度（默认50px）
    headerH:
      props.tableConfig && props.tableConfig.headerH !== undefined
        ? tool.targetCss(props.tableConfig.headerH)
        : config.headerH,
    // 表头背景色
    headerBg:
      props.tableConfig && props.tableConfig.headerBg !== undefined ? props.tableConfig.headerBg : config.headerBg,
    // 行高（默认40px）
    lineH:
      props.tableConfig && props.tableConfig.lineH !== undefined
        ? tool.targetCss(props.tableConfig.lineH)
        : config.lineH,
    // 奇数行背景色
    oddBg: props.tableConfig && props.tableConfig.oddBg !== undefined ? props.tableConfig.oddBg : config.oddBg,
    // 偶数行背景色
    evenBg: props.tableConfig && props.tableConfig.evenBg !== undefined ? props.tableConfig.evenBg : config.evenBg,
    // 文字对齐方式（默认左侧）
    align: props.tableConfig && props.tableConfig.align !== undefined ? props.tableConfig.align : config.align
  },
  scrollbarShow: false, // 滚动条显示
  tableRealHeight: '', // 表格实际高度
  tableRealWidth: '', // 表格实际宽度
  scrollbarBoxHeight: '', // 滚动条容器实际宽度
  tableBoxHeight: '' // 滚动条容器实际宽度
});
// 表格奇偶行添加类名
function tableRowClassName(value: { row: any; rowIndex: number }) {
  if (value.rowIndex % 2) {
    return `${state.config.border ? 'odd-row' : 'odd-row border-hide'}`;
  } else {
    return `${state.config.border ? 'even-row' : 'even-row border-hide'}`;
  }
}
// 控制表格
function controlTable() {
  let eTD = elTableDom.value as any;
  // 异步设置
  setTimeout(() => {
    // 固定列奇偶行颜色
    let fixedOddNodeList = eTD.querySelectorAll('.odd-row');
    let fixedEvenNodeList = eTD.querySelectorAll('.even-row');
    fixedOddNodeList.forEach((element: any) => {
      element.style.background = state.config.oddBg;
    });
    fixedEvenNodeList.forEach((element: any) => {
      element.style.background = state.config.evenBg;
    });
    // 横向滚动条显示/滚动条高度
    state.tableRealHeight = `${eTD.querySelector('.el-table__body').offsetHeight}px`;
    state.tableBoxHeight = `${
      eTD.querySelector('.el-table__body-wrapper').offsetHeight + eTD.querySelector('.el-table__header').offsetHeight
    }px`;
    state.tableRealWidth = `${eTD.querySelector('.el-table__body').offsetWidth - 4}px`;
    setTimeout(() => {
      state.scrollbarBoxHeight = `${
        eTD.querySelector('.el-table').offsetHeight - eTD.querySelector('.el-table__header').offsetHeight
      }px`;
      state.scrollbarShow = true;
    }, 300);
  });
}
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
// 拖动滚动条
function scrollActive(scr: { scrollLeft: number; scrollTop: number }) {
  let eTD = elTableDom.value as any;
  let tNodeList = eTD.querySelectorAll('.el-table__body-wrapper');
  tNodeList.forEach((element: any) => {
    element.scrollTop = scr.scrollTop;
    element.scrollLeft = scr.scrollLeft;
  });
}
onMounted(() => {
  controlTable();
});
</script>

<style lang="scss" scoped>
.el-table {
  margin: 0 20px;
  max-height: 100%;
  width: calc(100% - 40px);
  position: absolute;
  z-index: 1;
  ::v-deep tr {
    background: transparent;
  }
  ::v-deep.el-table::before,
  ::v-deep.el-table .el-table__fixed::before,
  ::v-deep.el-table .el-table__fixed-right::before {
    height: 0;
  }
  ::v-deep .el-table__fixed-header-wrapper th.el-table__cell,
  ::v-deep .el-table__header-wrapper th.el-table__cell,
  ::v-deep .el-table__body-wrapper .el-table__cell,
  ::v-deep .el-table__fixed-body-wrapper .el-table__cell {
    padding: 0;
    background: transparent;
  }
  ::v-deep .el-table__body-wrapper .border-hide td,
  ::v-deep .el-table__fixed-body-wrapper .border-hide td,
  ::v-deep .el-table__header-wrapper .border-hide th,
  ::v-deep .el-table__fixed-header-wrapper .border-hide th {
    border: 0;
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
    z-index: 99;
  }
}
</style>

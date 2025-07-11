<template>
  <!-- 附加功能 -->
  <AdditionalFunctions
    v-if="tableConfig?.customColumn"
    :tableOptions="state.customTableOptions"
    :templateList="customTemplateList"
    :page="page"
    @additionalConfirm="additionalConfirm"
  ></AdditionalFunctions>
  <!-- 表格内容 -->
  <div
    :style="[
      {
        maxHeight: `${tableConfig?.customColumn ? `calc(${state.config.tableH} - 46px)` : `${state.config.tableH}`}`,
        height: `${tableConfig?.customColumn ? `calc(${state.config.tableH} - 46px)` : `${state.config.tableH}`}`,
        position: 'relative'
      }
    ]"
    ref="elTableDom"
  >
    <!-- 表格 -->
    <el-table
      :header-row-style="{ height: state.config.headerH, background: state.config.headerBg }"
      :row-style="{ height: state.config.lineH }"
      :header-row-class-name="state.config.border ? '' : 'border-hide'"
      :row-class-name="tableRowClassName"
      @select="handleSelection"
      @select-all="handleSelectionAll"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click="cellClick"
      @cell-dblclick="cellDblclick"
      @cell-contextmenu="cellContextmenu"
      @row-click="rowClick"
      @row-contextmenu="rowContextmenu"
      @row-dblclick="rowDblclick"
      @header-click="headerClick"
      @header-contextmenu="headerContextmenu"
      :data="tableData"
      :border="state.config.border"
      :height="props.page === undefined ? '100%' : 'calc(100% - 60px)'"
      :max-height="props.page === undefined ? '100%' : 'calc(100% - 60px)'"
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
      <!-- 表格列表（自定义单文件行自动关闭tip） -->
      <template v-for="(item, i) in state.customTableOptions" :key="i">
        <el-table-column
          v-if="
            item.customColumn === undefined
              ? item.show === undefined
                ? true
                : item.show
              : item.customColumn.show === undefined
              ? true
              : item.customColumn.show
          "
          :width="item.width"
          :minWidth="item.minWidth || item.minwidth"
          :fixed="item.fixed"
          :align="item.align ? item.align : state.config.align"
          :show-overflow-tooltip="
            !item.prop && Object.prototype.toString.call(item.template) === '[object Object]'
              ? false
              : item.tip === undefined
              ? config.tip
              : item.tip
          "
        >
          <!-- 表头 -->
          <template #header>
            <LazyTableHeader
              :headerItem="item"
              @filter-change="filterChange"
              @sort-change="sortChange"
            ></LazyTableHeader>
          </template>
          <!-- 表体 -->
          <template #default="scope">
            <LazyTableBody
              :bodyItem="item"
              :rowData="scope.row"
              @row-confirm="rowConfirm"
              @switch-change="switchChange"
            ></LazyTableBody>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <LazyPage v-if="page !== undefined" :page="page"></LazyPage>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { config } from './config';
import LazyTableHeader from './components/LazyTableHeader.vue';
import LazyTableBody from './components/LazyTableBody.vue';
import AdditionalFunctions from './components/AdditionalFunctions.vue';
const elTableDom = ref(null);
const $emits = defineEmits([
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'cell-contextmenu',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'row-confirm',
  'change',
  'expot'
]);
const props = defineProps({
  tableData: {
    type: Array,
    required: true
  },
  tableOptions: {
    type: <any>Array,
    required: true
  },
  tableConfig: Object,
  page: Object
});
const state = reactive<any>({
  customTableOptions: props.tableOptions, // 自定义列数据
  customTemplateList: [],
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
        ? $tool.targetCss(props.tableConfig.tableH)
        : config.tableH,
    // 表头高度（默认50px）
    headerH:
      props.tableConfig && props.tableConfig.headerH !== undefined
        ? $tool.targetCss(props.tableConfig.headerH)
        : config.headerH,
    // 表头背景色
    headerBg:
      props.tableConfig && props.tableConfig.headerBg !== undefined ? props.tableConfig.headerBg : config.headerBg,
    // 行高（默认40px）
    lineH:
      props.tableConfig && props.tableConfig.lineH !== undefined
        ? $tool.targetCss(props.tableConfig.lineH)
        : config.lineH,
    // 奇数行背景色
    oddBg: props.tableConfig && props.tableConfig.oddBg !== undefined ? props.tableConfig.oddBg : config.oddBg,
    // 偶数行背景色
    evenBg: props.tableConfig && props.tableConfig.evenBg !== undefined ? props.tableConfig.evenBg : config.evenBg,
    // 文字对齐方式（默认左侧）
    align: props.tableConfig && props.tableConfig.align !== undefined ? props.tableConfig.align : config.align
  }
});
// 表格自定义模板列表（避免数据处理影响模板加载）
const customTemplateList = props.tableOptions.filter(
  (item: any) => Object.prototype.toString.call(item.template) === '[object Object]'
);
watch(
  () => props.tableData,
  () => {
    controlTable();
  }
);
// 附加功能确认
function additionalConfirm(par: unknown, type: string) {
  switch (type) {
    case '自定义列':
      state.customTableOptions = par;
      // 调用父组件方法 传递参数
      break;
    case '导出':
      $emits('expot', par);
  }
}
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
  });
}
// 手动勾选数据行的 Checkbox
function handleSelection(selection: Array<unknown>, row: unknown) {
  $emits('select', selection, row);
}
// 手动勾选全选 Checkbox
function handleSelectionAll(selection: Array<unknown>) {
  $emits('select-all', selection);
}
// 选择项发生变化
function handleSelectionChange(selection: Array<unknown>) {
  $emits('selection-change', selection);
}
// 鼠标进入单元格
function cellMouseEnter(row: unknown, column: unknown, cell: unknown, event: unknown) {
  $emits('cell-mouse-enter', row, column, cell, event);
}
// 鼠标离开单元格
function cellMouseLeave(row: unknown, column: unknown, cell: unknown, event: unknown) {
  $emits('cell-mouse-leave', row, column, cell, event);
}
// 单击单元格
function cellClick(row: unknown, column: unknown, cell: unknown, event: unknown) {
  $emits('cell-click', row, column, cell, event);
}
// 双击单元格
function cellDblclick(row: unknown, column: unknown, cell: unknown, event: unknown) {
  $emits('cell-dblclick', row, column, cell, event);
}
// 右击单元格
function cellContextmenu(row: unknown, column: unknown, cell: unknown, event: unknown) {
  $emits('cell-contextmenu', row, column, cell, event);
}
// 单击行
function rowClick(row: unknown, column: unknown, event: unknown) {
  $emits('row-click', row, column, event);
}
// 右击单击行
function rowContextmenu(row: unknown, column: unknown, event: unknown) {
  $emits('row-contextmenu', row, column, event);
}
// 双击单击行
function rowDblclick(row: unknown, column: unknown, event: unknown) {
  $emits('row-dblclick', row, column, event);
}
// 单击某一列表头
function headerClick(column: unknown, event: unknown) {
  $emits('header-click', column, event);
}
// 右击某一列表头
function headerContextmenu(column: unknown, event: unknown) {
  $emits('header-contextmenu', column, event);
}
// 筛选
function filterChange(par: unknown) {
  $emits('filter-change', par);
}
// 排序
function sortChange(par: unknown) {
  $emits('sort-change', par);
}
// 行编辑确认
function rowConfirm(par: unknown) {
  $emits('row-confirm', par);
}
// switch 值改变
function switchChange(parame: unknown) {
  $emits('change', parame);
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
  ::v-deep tbody tr:hover {
    background: #edf1f4 !important;
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

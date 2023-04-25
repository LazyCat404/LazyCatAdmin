<template>
  <!-- 附加功能 -->
  <AdditionalFunctions
    v-if="tableConfig?.customColumn"
    :tableOptions="obj.customTableOptions"
    :templateList="obj.customTemplateList"
    :page="page"
    @additionalConfirm="additionalConfirm"
  ></AdditionalFunctions>
  <!-- 表格内容 -->
  <div
    class="lazy-table-wrapper"
    :style="[
      {
        maxHeight: `${tableConfig?.customColumn ? `calc(${obj.config.tableH} - 46px)` : `${obj.config.tableH}`}`,
        height: `${tableConfig?.customColumn ? `calc(${obj.config.tableH} - 46px)` : `${obj.config.tableH}`}`,
        position: 'relative'
      }
    ]"
    ref="elTableDom"
  >
    <!-- 表格 -->
    <el-table
      :class="{ 'header-border': obj.config.headerBorder }"
      :key="tableKey"
      :header-row-style="{ height: obj.config.headerH }"
      :row-style="{ height: obj.config.lineH }"
      :span-method="spanMethod"
      :header-row-class-name="obj.config.border ? '' : 'border-hide'"
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
      :border="obj.config.border"
      :style="[{ position: `${obj.config.fitContent ? (tableData.length ? 'relative' : 'absolute') : 'absolute'}` }]"
      :height="obj.config.fitContent ? (tableData.length ? 'auto' : '100%') : '100%'"
      :max-height="
        props.page === undefined
          ? obj.config.fitContent
            ? tableData.length
              ? 'auto'
              : '100%'
            : '100%'
          : obj.config.fitContent
          ? tableData.length
            ? 'auto'
            : 'calc(100% - 60px)'
          : 'calc(100% - 60px)'
      "
    >
      <!-- 空数据提示 -->
      <template #empty> 暂无数据 </template>
      <!-- 复选列表 -->
      <el-table-column
        type="selection"
        width="40px"
        :selectable="selectable"
        v-if="obj.config.select"
        :fixed="obj.config.selectFixed"
      >
      </el-table-column>
      <!-- 表格列表（自定义单文件行自动关闭tip） -->
      <template v-for="(item, i) in obj.customTableOptions" :key="i">
        <el-table-column
          v-if="
            item.show == undefined
              ? item.customColumn === undefined
                ? true
                : item.customColumn.show === undefined
                ? true
                : item.customColumn.show
              : item.show
          "
          :width="item.width"
          :minWidth="minWidth(item)"
          :fixed="item.fixed"
          :align="item.align ? item.align : obj.config.align"
          :show-overflow-tooltip="
            (!item.prop && Object.prototype.toString.call(item.template) === '[object Object]') ||
            item.ico ||
            item.copy ||
            item.status
              ? false
              : item.tip === undefined
              ? config.tip
              : item.tip
          "
        >
          <!-- 表头 -->
          <template #header>
            <LazyTableHeader :headerItem="item" @filter-change="filterChange" @sort-change="sortChange">
            </LazyTableHeader>
          </template>
          <!-- 表体 -->
          <template #default="scope">
            <LazyTableBody
              :bodyItem="item"
              :rowData="scope.row"
              @row-confirm="rowConfirm"
              @switch-change="switchChange"
            >
            </LazyTableBody>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <LazyPage
      @pageOper="pageOper"
      v-if="page !== undefined"
      :page="page"
      :style="[{ position: `${obj.config.fitContent ? 'relative' : 'absolute'}` }]"
    >
    </LazyPage>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
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
  'expot',
  'pageOper'
]);

interface Props {
  tableData: Array<any>;
  tableOptions: Array<any>;
  tableConfig?: any;
  page?: any;
  spanMethod?: any;
}
const props = withDefaults(defineProps<Props>(), {
  tableData: () => [],
  tableOptions: () => []
});

const tableKey = ref(Math.ceil(Math.random() * 10000000000));

const obj = reactive<any>({
  customTableOptions: props.tableOptions, // 自定义列数据
  customTemplateList: [], // 表格自定义模板列表
  config: {} // 表格默认配置
});
// 表格自定义模板列表
obj.customTemplateList = computed(() => {
  let customTemplateList = props.tableOptions.filter(
    (item: any) => Object.prototype.toString.call(item.template) === '[object Object]'
  );
  return customTemplateList;
});
// 表格通用配置
obj.config = computed(() => {
  return {
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
    // 表头边框
    headerBorder:
      props.tableConfig && props.tableConfig.headerBorder !== undefined
        ? props.tableConfig.headerBorder
        : config.headerBorder,
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
    align: props.tableConfig && props.tableConfig.align !== undefined ? props.tableConfig.align : config.align,
    // 拟合高度
    fitContent:
      props.tableConfig && props.tableConfig.fitContent !== undefined ? props.tableConfig.fitContent : config.fitContent
  };
});

watch(
  () => props.tableData,
  () => {
    controlTable();
  }
);
// 表格最小宽度计算
function minWidth(par: any) {
  let dMin = par.minWidth || par.minwidth;
  let minWidth: undefined | number = 0;
  // 最小宽计算
  if (par.status) minWidth = minWidth + 16;
  if (par.ico) minWidth = minWidth + 16;
  if (par.copy) minWidth = minWidth + 16;
  if (minWidth) {
    minWidth = minWidth + 33 + 24;
  } else {
    minWidth = undefined;
  }
  return dMin || minWidth;
}
// 分页回调
function pageOper(pageData: unknown) {
  $emits('pageOper', pageData);
}
// 附加功能确认
function additionalConfirm(par: unknown, type: string) {
  switch (type) {
    case '自定义列':
      // 调用父组件方法 传递参数
      obj.customTableOptions = par;
      tableKey.value = Math.ceil(Math.random() * 10000000000); // 修改key值，使表格重新渲染
      break;
    case '重置':
      obj.customTableOptions = props.tableOptions;
      tableKey.value = Math.ceil(Math.random() * 10000000000); // 修改key值，使表格重新渲染
    case '导出':
      $emits('expot', par);
  }
}
// 表格奇偶行添加类名
function tableRowClassName(value: { row: any; rowIndex: number }) {
  if (value.rowIndex % 2) {
    return `${obj.config.border ? 'odd-row' : 'odd-row border-hide'}`;
  } else {
    return `${obj.config.border ? 'even-row' : 'even-row border-hide'}`;
  }
}
// 控制表格
function controlTable() {
  let eTD = elTableDom.value as any;
  // 异步设置
  setTimeout(() => {
    // 固定列奇偶行颜色及表头颜色
    let fixedOddNodeList = eTD.querySelectorAll('.odd-row > td');
    let fixedEvenNodeList = eTD.querySelectorAll('.even-row > td');
    let theadNodeList = eTD.querySelectorAll('.el-table__header > thead > tr > th');
    theadNodeList.forEach((element: any) => {
      element.style.background = obj.config.headerBg;
    });
    fixedOddNodeList.forEach((element: any) => {
      element.style.background = obj.config.oddBg;
    });
    fixedEvenNodeList.forEach((element: any) => {
      element.style.background = obj.config.evenBg;
    });
  });
}
// 单行复选框禁止勾选
function selectable(row: { selectable: unknown }) {
  if (Object.keys(row).includes('selectable') && !row.selectable) {
    return false;
  } else {
    return true;
  }
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
  width: 100%;
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
  }
  ::v-deep .el-table__body-wrapper tr {
    border-radius: 4px;
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
  // 复选框
  ::v-deep .el-table-column--selection {
    text-align: center;
  }
  // 表头内容不换行
  ::v-deep .el-table__header-wrapper thead th > div {
    white-space: nowrap;
  }
}
// 表头边框
.header-border {
  ::v-deep .el-table__header-wrapper {
    border-bottom: 1px solid #ececef;
  }
}
::v-deep .el-table-column--selection .cell {
  text-overflow: unset;
  padding: 0 !important;
  text-align: center;
}
</style>

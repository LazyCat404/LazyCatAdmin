<template>
  <!-- 附加功能 -->
  <AdditionalFunctions
    v-if="tableConfig?.customColumn"
    :tableOptions="obj.customTableOptions"
    :templateList="customTemplateList"
    :page="page"
    @additionalConfirm="additionalConfirm"
  ></AdditionalFunctions>
  <!-- 表格内容 -->
  <div
    ref="elTableDom"
    class="lazy-table-wrapper"
    :empty="tableData && tableData.length ? null : ''"
    :style="[
      {
        maxHeight: `${
          tableConfig?.customColumn ? `calc(${obj.tableConfig.tableH} - 46px)` : `${obj.tableConfig.tableH}`
        }`,
        height: `${tableConfig?.customColumn ? `calc(${obj.tableConfig.tableH} - 46px)` : `${obj.tableConfig.tableH}`}`,
        position: 'relative'
      }
    ]"
  >
    <!-- 表格 -->
    <el-table
      ref="lazyTableRef"
      :key="tableKey"
      :class="{ 'header-border': obj.tableConfig.headerBorder }"
      :header-row-style="{ height: obj.tableConfig.headerH }"
      :row-style="{ height: obj.tableConfig.lineH }"
      :span-method="spanMethod"
      :header-row-class-name="obj.tableConfig.border ? '' : 'border-hide'"
      :row-class-name="tableRowClassName"
      :data="tableData"
      :border="obj.tableConfig.border"
      :style="{ position: obj.tableConfig.fitContent ? (tableData.length ? 'relative' : 'absolute') : 'absolute' }"
      :height="obj.tableConfig.fitContent ? (tableData.length ? 'auto' : '100%') : '100%'"
      :max-height="
        props.page === undefined
          ? obj.tableConfig.fitContent
            ? tableData.length
              ? 'auto'
              : '100%'
            : '100%'
          : obj.tableConfig.fitContent
            ? tableData.length
              ? 'auto'
              : 'calc(100% - 60px)'
            : 'calc(100% - 60px)'
      "
      @select="handleSelection"
      @selectAll="handleSelectionAll"
      @selectionChange="handleSelectionChange"
      @cellMouseEnter="cellMouseEnter"
      @cellMouseLeave="cellMouseLeave"
      @cellClick="cellClick"
      @cellDblclick="cellDblclick"
      @cellContextmenu="cellContextmenu"
      @rowClick="rowClick"
      @rowContextmenu="rowContextmenu"
      @rowDblclick="rowDblclick"
      @headerClick="headerClick"
      @headerContextmenu="headerContextmenu"
    >
      <!-- 空数据提示 -->
      <template #empty> 暂无数据 </template>
      <!-- 复选列表 -->
      <el-table-column
        v-if="obj.tableConfig.select"
        type="selection"
        width="40px"
        :selectable="selectable"
        :fixed="obj.tableConfig.selectFixed"
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
          :align="item.align ? item.align : obj.tableConfig.align"
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
            <LazyTableHeader
              ref="lazyTableHeaderRef"
              :tableConfig="obj.tableConfig"
              :headerItem="item"
              @filterChange="filterChange"
              @sortChange="sortChange"
            >
            </LazyTableHeader>
          </template>
          <!-- 表体 -->
          <template #default="scope">
            <LazyTableBody
              :tableConfig="obj.tableConfig"
              :bodyItem="item"
              :rowData="scope.row"
              @rowConfirm="rowConfirm"
              @switchChange="switchChange"
            >
            </LazyTableBody>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <LazyPage
      v-if="page !== undefined"
      :page="page"
      :style="[{ position: `${obj.tableConfig.fitContent ? 'relative' : 'absolute'}` }]"
      @pageOper="pageOper"
    >
    </LazyPage>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { config, statusColor } from './config';
import LazyTableHeader from './components/LazyTableHeader.vue';
import LazyTableBody from './components/LazyTableBody.vue';
import AdditionalFunctions from './components/AdditionalFunctions.vue';
const elTableDom = ref(null);
const lazyTableRef = ref();
const lazyTableHeaderRef = ref();
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
  'switch-change',
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
// 监听数据变化
watch(
  () => props.tableData,
  () => {
    controlTable();
  }
);
watch(
  () => props.tableOptions,
  (newVal: unknown) => {
    if (Array.isArray(newVal)) {
      obj.customTableOptions = newVal;
    }
  },
  { deep: true }
);
// 表格key（用于表格刷新）
const tableKey = ref(Math.ceil(Math.random() * 10000000000));
// 定义通用响应式数据
const obj = reactive<any>({
  customTableOptions: props.tableOptions, // 自定义列数据
  tableConfig: {} // 表格默认配置
});
// 表格自定义模板列表（计算属性）
const customTemplateList = computed(() => {
  const customTemplateList = props.tableOptions.filter(
    (item: any) => Object.prototype.toString.call(item.template) === '[object Object]'
  );
  return customTemplateList;
});
// 表格通用配置
function makeTableConfig() {
  // 默认赋值
  obj.tableConfig = {
    ...config,
    statusColor
  };
  if (props.tableConfig) {
    obj.tableConfig = {
      ...config,
      statusColor,
      ...props.tableConfig
    };
    // 一些值的容错处理
    obj.tableConfig.tableH = $tool.targetCss(obj.tableConfig.tableH);
    obj.tableConfig.headerH = $tool.targetCss(obj.tableConfig.headerH);
    obj.tableConfig.lineH = $tool.targetCss(obj.tableConfig.lineH);
    /**
     * 类型错误提示
     */
    // 状态颜色
    if (
      props.tableConfig.statusColor !== undefined &&
      Object.prototype.toString.call(props.tableConfig.statusColor) !== '[object Object]'
    ) {
      obj.tableConfig.statusColor = statusColor;
      console.warn('tableOptions -> statusColor 仅支持 Object 类型');
    }
    // 自定义表头字体样式
    if (
      props.tableConfig.headerStyle !== undefined &&
      Object.prototype.toString.call(props.tableConfig.headerStyle) !== '[object Object]'
    ) {
      obj.tableConfig.headerStyle = config.headerStyle;
      console.warn('tableOptions -> headerStyle 仅支持 Object 类型');
    }
  }
}
// 表格最小宽度计算
function minWidth(par: any) {
  const dMin = par.minWidth || par.minwidth;
  let minWidth: undefined | number = 0;
  let minWidth1: undefined | number = 0;
  let minWidth2: undefined | number = 0;
  // 最小宽1计算（根据行内容计算）
  if (par.status) minWidth1 = minWidth1 + 16;
  if (par.ico) minWidth1 = minWidth1 + 16;
  if (par.copy) minWidth1 = minWidth1 + 16;
  if (minWidth1) {
    minWidth1 = minWidth1 + 33 + 24;
  } else {
    minWidth1 = undefined;
  }
  // 最小宽2计算（根据表头计算）
  if (par.edit) minWidth2 = minWidth2 + 16;
  if (par.sort !== undefined) minWidth2 = minWidth2 + 16;
  if (par.filter) minWidth2 = minWidth2 + 16;
  if (minWidth2) {
    minWidth2 = minWidth2 + 33 + 24;
  } else {
    minWidth2 = undefined;
  }
  minWidth =
    minWidth1 && minWidth2
      ? minWidth2 > minWidth1
        ? minWidth2
        : minWidth1
      : minWidth1
        ? minWidth1
        : minWidth2
          ? minWidth2
          : undefined;
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
    return `${obj.tableConfig.border ? 'odd-row' : 'odd-row border-hide'}`;
  } else {
    return `${obj.tableConfig.border ? 'even-row' : 'even-row border-hide'}`;
  }
}
// 控制表格
function controlTable() {
  const eTD = elTableDom.value as any;
  // 异步设置
  setTimeout(() => {
    // 固定列奇偶行颜色及表头颜色
    const fixedOddNodeList = eTD.querySelectorAll('.odd-row > td');
    const fixedEvenNodeList = eTD.querySelectorAll('.even-row > td');
    const theadNodeList = eTD.querySelectorAll('.el-table__header > thead > tr > th');
    theadNodeList.forEach((element: any) => {
      element.style.background = obj.tableConfig.headerBg;
    });
    fixedOddNodeList.forEach((element: any) => {
      element.style.background = obj.tableConfig.oddBg;
    });
    fixedEvenNodeList.forEach((element: any) => {
      element.style.background = obj.tableConfig.evenBg;
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
  $emits('switch-change', parame);
}
// 表头筛选(手动)置空
function clearFilter(value: unknown) {
  if (lazyTableHeaderRef.value) {
    if (!value || JSON.stringify(value) == '{}') {
      // 所有表头筛选都置空
      lazyTableHeaderRef.value.forEach((item: any) => {
        item.clearFilter();
      });
    } else {
      for (const key in value) {
        lazyTableHeaderRef.value.forEach((item: any) => {
          if (item.filterKey != key) {
            item.clearFilter();
          }
        });
      }
    }
  }
}
// 初始化
(function init() {
  makeTableConfig();
})();
onMounted(() => {
  controlTable();
});
// 供父组件调用
defineExpose({
  clearFilter
});
</script>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  z-index: 1;
  :deep(tr) {
    background: transparent;
  }
  :deep(tbody tr:hover) {
    background: #edf1f4 !important;
  }
  :deep(.el-table::before),
  :deep(.el-table .el-table__fixed::before),
  :deep(.el-table .el-table__fixed-right::before) {
    height: 0;
  }
  :deep(.el-table__fixed-header-wrapper th.el-table__cell),
  :deep(.el-table__header-wrapper th.el-table__cell),
  :deep(.el-table__body-wrapper .el-table__cell),
  :deep(.el-table__fixed-body-wrapper .el-table__cell) {
    padding: 0;
  }
  :deep(.el-table__body-wrapper tr) {
    border-radius: 4px;
  }

  :deep(.el-table__body-wrapper .border-hide td),
  :deep(.el-table__fixed-body-wrapper .border-hide td),
  :deep(.el-table__header-wrapper .border-hide th),
  :deep(.el-table__fixed-header-wrapper .border-hide th) {
    border: 0;
  }
  :deep(.el-checkbox) {
    height: auto;
  }
  // 复选框
  :deep(.el-table-column--selection) {
    text-align: center;
  }
  // 表头内容不换行
  :deep(.el-table__header-wrapper thead th > div) {
    white-space: nowrap;
  }
}
// 表头边框
.header-border {
  :deep(.el-table__header-wrapper) {
    border-bottom: 1px solid #ececef;
  }
}
:deep(.el-table-column--selection .cell) {
  text-overflow: unset;
  padding: 0 !important;
  text-align: center;
}
// 空数据表格
.lazy-table-wrapper[empty] {
  // 表头边框
  .header-border {
    :deep(.el-table__header-wrapper) {
      border-bottom: 0;
      box-shadow: 0 0 0 1px #ececef;
    }
  }
}
</style>

<template>
  <div class="desktop-list-wrapper">
    <div class="content-box">
      <div class="table-box">
        <LazyTable
          :tableData="obj.tableData"
          :tableOptions="tableOptions"
          :tableConfig="obj.tableConfig"
          @sortChange="sortChange"
          @filterChange="filterChange"
        ></LazyTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@api';
import Template from '../components/list/Template.vue';
import { computed, markRaw, reactive } from 'vue';

const obj = reactive<any>({
  tableData: [],
  tableConfig: {
    statusColor: {
      instance_active: '#67c23a', // 绿色
      instance_stopped: '#909399' // 灰色
    }
  }
});
const tableOptions = computed(() => {
  let tableOptions: Array<any> = [];
  tableOptions = [
    {
      prop: 'name',
      label: '云桌面名称'
    },
    {
      prop: 'statusI18N',
      label: '状态',
      filter: {
        list: [
          { label: '运行中', value: 1 },
          { label: '已关机', value: 2 }
        ],
        key: 'status',
        type: 'select'
      },
      status: ({ rowData }: any) => {
        return rowData.status;
      }
    },
    {
      prop: 'ip',
      label: 'IP地址'
    },
    {
      label: '模板机',
      template: markRaw(Template)
    },
    {
      label: 'CPU',
      render: ({ rowData }: any) => {
        return `${rowData['cpu']}核`;
      }
    },
    {
      prop: 'memory',
      label: '内存',
      sort: 'DES',
      render: ({ rowData }: any) => {
        return `${rowData['memory']}GB`;
      }
    }
  ];
  return tableOptions;
});

// 获取表格数据
function getTableData() {
  api.desktop.getDesktopList().then((res: res) => {
    obj.tableData = res.data;
  });
}
// 过滤
function filterChange(par: unknown) {
  console.log('表头过滤', par);
}
// 排序
function sortChange(par: unknown) {
  console.log('表头排序', par);
}
function init() {
  getTableData();
}
init();
</script>

<style lang="scss" scoped>
.desktop-list-wrapper {
  margin-top: 80px;
  display: flex;
  .content-box {
    padding: 20px;
    box-sizing: border-box;
    width: calc(100% - 40px);
    height: calc(100% - 90px);
    margin: 0 20px 20px 20px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(8, 106, 205, 0.1);
    display: flex;
    .table-box {
      width: 100%;
      flex: 1;
    }
  }
}
</style>

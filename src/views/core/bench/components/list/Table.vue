<template>
  <div class="bench-table-wrapper">
    <BasicTitle title="台架列表"></BasicTitle>
    <BasicTable :tableData="state.tableData" :tableOptions="state.tableOptions" :page="state.page"></BasicTable>
  </div>
</template>

<script lang="ts" setup>
import api from '@api';
import { reactive } from 'vue';

const state = reactive<any>({
  tableData: [],
  tableOptions: [],
  page: {
    pageNum: 1,
    pageSize: 100,
    total: 0
  }
});

const router = useRouter();
function getBenchList() {
  api.bench.getBenchList().then((res: res) => {
    state.tableData = res.data;
    state.page.total = res.data.length;
  });
}

// 查看详情
function lookDetail(par: any) {
  router.push({ path: '/bench/detail', query: { id: par.rowData.id } });
}

function init() {
  state.tableOptions = [
    {
      prop: 'name',
      label: '台架',
      color: '#01BC8F',
      fontWeight: 'bold',
      click: lookDetail
    },
    {
      prop: 'run',
      label: '运行',
      color: (par: any) => {
        if (par.rowData.run == '故障') {
          return '#FF6A64';
        }
      }
    },
    {
      prop: 'communication',
      label: '通讯'
    },
    {
      prop: 'maintain',
      label: '维护'
    },
    {
      prop: 'experiment',
      label: '进行中的试验'
    },
    {
      prop: 'startTime',
      label: '开始时间'
    },
    {
      prop: 'progress',
      label: '进度',
      progress: {
        color: (par: any) => {
          if (par.rowData.run == '运行') {
            return '#01BC8F';
          } else if (par.rowData.run == '故障') {
            return '#FF6A64';
          } else {
            return '#ebeef5';
          }
        },
        emptyText: (par: any) => {
          if (par.rowData.run == '停机') {
            return '--';
          }
        },
        textColor: 'follow'
      }
    },
    {
      prop: 'projectNum',
      label: '项目编号'
    },
    {
      prop: 'orderNum',
      label: '订单编号'
    },
    {
      label: '板块',
      prop: 'plate'
    },
    {
      label: '发动机编号',
      prop: 'engineNum'
    },
    {
      label: '发动机型号',
      prop: 'engineModel'
    },
    {
      label: '操作',
      render: (par: any) => {
        if (par.rowData.run == '停机') {
          return `<span style="cursor: no-drop;">急停</span>`;
        } else {
          return `<span style="cursor: pointer;">急停</span>`;
        }
      },
      color: (par: any) => {
        if (par.rowData.run == '停机') {
          return '#999999';
        } else {
          return '#FF6A64';
        }
      },
      click: (par: any) => {
        if (par.rowData.run !== '停机') {
          console.log('点击了操作');
        }
      }
    }
  ];
  getBenchList();
}
init();
</script>
<style lang="scss" scoped>
.bench-table-wrapper {
  flex: 1;
  background: #ffffff;
  border-radius: 10px;
  margin: 20px 30px;
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  padding-right: 30px;
  padding-top: 30px;
  > .basic-title-wrapper {
    position: relative;
    left: 10px;
    margin-bottom: 20px;
  }
}
</style>

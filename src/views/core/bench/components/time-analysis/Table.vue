<template>
  <div class="analysis-table-wrapper">
    <div class="time-census-btn">
      <BasicTitle title="数据列表"></BasicTitle>
      <div class="top-btn">
        <i class="iconfont icon-xiazai"></i>
        <div>
          共<span>{{ state.page.total }}</span
          >条记录，累计<span>{{ state.totalTime }}</span
          >h
        </div>
      </div>
    </div>
    <div class="time-census-table">
      <BasicTable
        :tableData="state.tableData"
        :tableOptions="state.tableOptions"
        :tableConfig="state.tableConfig"
        :page="state.page"
      ></BasicTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@api';
import { reactive } from 'vue';

const state = reactive<any>({
  tableOptions: [],
  tableConfig: {},
  tableData: [],
  totalTime: 0,
  page: {
    pageNum: 1,
    total: 0,
    simple: true
  }
});

function getRunTimeCensus() {
  api.bench.getRunTimeCensus().then((res: res) => {
    state.tableData = res.data.list;
    state.page.total = res.data.list.length;
    state.totalTime = res.data.totalTime;
  });
}

function init() {
  state.tableOptions = [
    {
      prop: 'name',
      label: '台架',
      width: 60
    },
    {
      prop: 'censusType',
      label: '统计周期',
      width: 80
    },
    {
      label: '时长',
      width: 55,
      render: (par: any) => {
        return `${par.rowData.time}h`;
      }
    },
    {
      prop: 'startTime',
      label: '开始时间'
    },
    {
      prop: 'endTime',
      label: '结束日期'
    }
  ];
  state.tableConfig = {
    headerH: '44px',
    lineH: '48px'
  };
  getRunTimeCensus();
}
init();
</script>
<style lang="scss" scoped>
.analysis-table-wrapper {
  width: 28.475%;
  height: 100%;
  background: #ffffff;
  border-radius: 10px;
  margin-right: 20px;
  padding: 20px 30px 0 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .time-census-btn {
    display: flex;
    align-items: center;
    .top-btn {
      flex: 1;
      display: flex;
      align-items: center;
      .iconfont {
        color: #333;
        margin-left: 12px;
        cursor: pointer;
      }
      > div {
        height: 28px;
        background: linear-gradient(270deg, rgba(1, 188, 143, 0.16) 0%, rgba(1, 188, 143, 0) 100%);
        border-radius: 14px;
        flex: 1;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 28px;
        text-align: right;
        padding-right: 12px;
        > span {
          color: rgba(1, 188, 143, 1);
          font-weight: 600;
          margin: 0 4px;
        }
      }
    }
  }
  .time-census-table {
    flex: 1;
    ::v-deep .basic-table-wrapper {
      > .el-table {
        font-size: 12px;
      }
    }
  }
  ::v-deep .lazy-page-wapper {
    font-size: 12px;
  }
}
</style>

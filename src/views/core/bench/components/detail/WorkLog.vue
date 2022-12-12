<template>
  <div class="work-log-wrapper">
    <div>
      <LazyTitle title="台架工作日志"></LazyTitle>
      <div class="log-btn">
        <span class="export-log">
          <i class="iconfont icon-xiazai"></i>
          <span>导出图表</span>
        </span>
        <div>
          <span class="time-30 time" @click="getWorkLog(30)" :active="state.time == 30 ? '' : null">近30天</span>
          <span class="time-60 time" @click="getWorkLog(60)" :active="state.time == 60 ? '' : null">近60天</span>
          <span class="time-all time" @click="getWorkLog()" :active="state.time ? null : ''">查看全部</span>
        </div>
      </div>
    </div>
    <div>
      <LazyTable
        :tableData="state.tableData"
        :tableOptions="state.tableOptions"
        :tableConfig="state.tableConfig"
      ></LazyTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@api';
import { reactive } from 'vue';

defineProps({
  detail: {
    type: Object,
    required: true
  }
});
const state = reactive<any>({
  tableData: [],
  tableOptions: [],
  tableConfig: {},
  time: 30
});
function getWorkLog(t?: number) {
  state.time = t;
  api.bench.getWorkLog({ time: state.time }).then((res: res) => {
    state.tableData = res.data;
  });
}
function init() {
  state.tableOptions = [
    {
      prop: 'time',
      label: '时间'
    },
    {
      prop: 'projectNum',
      label: '项目编号'
    },
    {
      prop: 'projectContent',
      label: '项目内容'
    }
  ];
  state.tableConfig = {
    headerH: '48px',
    lineH: '48px'
  };
  getWorkLog(30);
}
init();
</script>

<style lang="scss" scoped>
.work-log-wrapper {
  flex: 1;
  height: 100%;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 26px 28px 20px 40px;
  box-sizing: border-box;
  > div:first-child {
    display: flex;
    .basic-title-wrapper {
      position: relative;
      left: -10px;
    }
    .log-btn {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center; /*垂直居中 */
      .export-log {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        display: flex;
        cursor: pointer;
        .iconfont {
          margin-right: 10px;
          margin-left: 2px;
        }
      }
      .time {
        padding: 7px 16px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        background: #f1f5f9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        top: -5px;
      }
      .time-60 {
        margin: 0 17px;
      }
      .time[active] {
        color: #01bc8f;
        background-color: rgb(1, 188, 143, 0.1);
      }
    }
  }
  > div:last-child {
    flex: 1;
  }
}
</style>

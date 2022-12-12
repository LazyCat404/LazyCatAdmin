<template>
  <el-scrollbar height="calc(100% - 114px)">
    <div class="oil-consumption-wrapper">
      <Search :tab="'台架'"></Search>
      <div class="cart-one">
        <CensusOverview :tab="'台架'" :oilList="state.oilList"></CensusOverview>
        <OilChart :tab="'台架'"></OilChart>
      </div>
      <div class="cart-two">
        <!-- 标题、按钮 -->
        <div class="top-btn-box">
          <BasicTitle title="数据筛选结果"></BasicTitle>
          <div class="top-btn">
            <i class="iconfont icon-xiazai"></i>
            <span>导出图表</span>
          </div>
        </div>
        <div class="table-box" :style="[{ height: state.tableData.length ? 'auto' : '120px' }]">
          <BasicTable
            :spanMethod="arraySpanMethod"
            :tableData="state.tableData"
            :tableOptions="state.tableOptions"
            :tableConfig="state.tableConfig"
            :page="state.page"
          ></BasicTable>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import CensusOverview from './CensusOverview.vue';
import OilChart from './OilChart.vue';
import Search from './Search.vue';
import api from '@api';
import { reactive } from 'vue';
const state = reactive<any>({
  oilList: {},
  tableData: [],
  tableOptions: [],
  tableConfig: {},
  page: {
    pageNum: 1,
    total: 0,
    simple: true
  }
});
function getBenchOilConsumption() {
  api.bench.getBenchOilConsumption().then((res: res) => {
    state.oilList = res.data;
  });
}
// 跨行
function arraySpanMethod({ row, columnIndex }: any) {
  if (row.rowSpan) {
    // 第一列和最后一列跨行
    if (columnIndex === 0 || columnIndex === 8) {
      return {
        rowspan: row.rowSpan,
        colspan: 1
      };
    }
  } else {
    // 第一列和最后一列隐藏
    if (columnIndex === 0 || columnIndex === 8) {
      return {
        rowspan: 0,
        colspan: 0
      };
    }
  }
}
// 筛选结果
function getOilFilter() {
  api.bench.getOilFilter().then((res: res) => {
    state.tableData = rowSpanData(res.data.list, 'oilData');
    if (res.data.list && res.data.list.length == 0) {
      state.page = undefined;
    } else {
      state.page = {
        pageNum: 1,
        total: res.data.total,
        simple: true
      };
    }
  });
}

// 跨行数据计算
function rowSpanData(list: Array<any>, par: string) {
  list = JSON.parse(JSON.stringify(list));
  let resData: Array<any> = [];
  list.forEach(item => {
    item[par].forEach((ite: any, i: number) => {
      let itemData: any = {};
      if (i == 0) {
        itemData.rowSpan = item[par].length;
      }
      for (let key in item) {
        if (key !== par) {
          itemData[key] = item[key];
        }
      }
      resData.push({
        ...ite,
        ...itemData
      });
    });
  });

  return resData;
}

function init() {
  state.tableOptions = [
    {
      prop: 'name',
      label: '台架'
    },
    {
      prop: 'censusType',
      label: '统计周期'
    },
    {
      prop: 'minConsume',
      label: '时间段累计消耗min'
    },
    {
      prop: 'maxConsume',
      label: '时间段累计消耗max'
    },
    {
      prop: 'differConsume',
      label: '当前段油耗差'
    },
    {
      prop: 'nowDiffer',
      label: '当前段min减上一段时间max'
    },
    {
      prop: 'startTime',
      label: '起始日期'
    },
    {
      prop: 'endTime',
      label: '结束日期'
    },
    {
      prop: 'total',
      label: '台架合计值'
    }
  ];
  state.tableConfig = {
    headerH: '48px',
    lineH: '48px',
    oddBg: '#fff',
    headerBg: '#F1F5FB',
    border: true,
    fitContent: true
  };
  getBenchOilConsumption();
  getOilFilter();
}
init();
</script>
<style lang="scss" scoped>
.oil-consumption-wrapper {
  .cart-one {
    background-color: #fff;
    height: 444px;
    margin: 20px 40px 20px 30px;
    border-radius: 10px;
    display: flex;
  }
  .cart-two {
    flex: 1;
    background-color: #fff;
    margin: 20px 40px 20px 30px;
    border-radius: 10px;
    padding: 20px 30px;
    box-sizing: border-box;
    min-height: calc(100vh - 769px);
    .top-btn-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .top-btn {
        display: flex;
        align-items: center;
        cursor: pointer;
        i {
          display: inline-block;
          height: 16px;
        }
        span {
          display: inline-block;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>

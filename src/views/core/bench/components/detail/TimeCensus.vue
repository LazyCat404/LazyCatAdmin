<template>
  <div class="time-census-wrapper">
    <!-- 上方按钮 -->
    <div>
      <LazyTitle title="运行时间占比"></LazyTitle>
      <div class="top-btn">
        <span>
          <i class="iconfont icon-xiazai"></i>
          导出图表
        </span>
        <el-date-picker v-model="state.time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
      </div>
    </div>
    <!-- echart 图 -->
    <div id="time-census-box"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import * as echarts from 'echarts';

defineProps({
  detail: {
    type: Object,
    required: true
  }
});
const state = reactive<any>({
  time: null
});

function renderChart() {
  echarts.init(document.getElementById('time-census-box') as HTMLElement).dispose();
  let myEchart = echarts.init(document.getElementById('time-census-box') as HTMLElement);
  myEchart.clear();

  //  数据配置
  const source = [
    ['09.01', 338, 110],
    ['09.02', 416, 45],
    ['09.03', 452, 56],
    ['09.04', 129, 84],
    ['09.05', 383, 71],
    ['09.06', 461, 28],
    ['09.07', 377, 60],
    ['09.08', 423, 73],
    ['09.09', 252, 98],
    ['09.10', 40, 119],
    ['09.11', 267, 70],
    ['09.12', 290, 101],
    ['09.13', 295, 41],
    ['09.14', 53, 110],
    ['09.15', 447, 47],
    ['09.16', 338, 110],
    ['09.17', 416, 45],
    ['09.18', 452, 56],
    ['09.19', 129, 84],
    ['09.20', 383, 71],
    ['09.21', 461, 28],
    ['09.22', 377, 60],
    ['09.23', 423, 73],
    ['09.24', 252, 98],
    ['09.25', 40, 119],
    ['09.26', 267, 70],
    ['09.27', 290, 101],
    ['09.28', 295, 41],
    ['09.29', 53, 110],
    ['09.30', 447, 47]
  ];

  let optionData = {
    dataset: {
      source: source
    },
    grid: {
      top: '30',
      left: '5',
      right: '0',
      bottom: '16%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      backgroundColor: 'rgba(255,255,255,0.7)',
      formatter: (params: any) => {
        return params
          .reduce(
            (acc: any, cur: any) => {
              const {
                data: data,
                seriesIndex: seriesIndex,
                seriesName: seriesName,
                marker: marker,
                componentSubType: componentSubType
              } = cur;
              const num = componentSubType === 'line' ? `${data[seriesIndex + 1]}` : `${data[seriesIndex + 1]}`;
              return [...acc, `${marker} ${seriesName}：${num}`];
            },
            [
              `<span style="font-size: 14px; color: #333; font-weight: bold; padding-bottom: 8px; display: inline-block;">${params[0].name}</span>`
            ]
          )
          .join('</br>');
      }
    },
    legend: {
      show: true,
      right: 0,
      top: -5,
      itemWidth: 12,
      itemHeight: 12
    },
    dataZoom: {
      type: 'slider',
      show: true,
      showDetail: false,
      height: 12,
      xAxisIndex: [0],
      start: 0,
      end: 100, //数据窗口范围的结束百分比0-100
      borderColor: 'transparent',
      fillerColor: 'rgb(1,188,143,0.1)',
      backgroundColor: '#F1F5FB',
      borderRadius: 10,
      showDataShadow: false,
      handleSize: 10,
      bottom: 10,
      right: 5
    },
    color: ['#01BC8F', '#FF9A80'],
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#E8E8E8'
        }
      },
      axisTick: { show: false },
      axisLabel: { color: '#333333' }
    },
    yAxis: {
      type: 'value',
      name: '(h)',
      splitNumber: 4,
      nameTextStyle: {
        fontSize: 12,
        color: '#333',
        align: 'right',
        padding: [0, 12, 0, 0]
      },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#333333' },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        type: 'bar',
        name: '运行时间',
        barWidth: 18,
        stack: true
      },
      {
        type: 'bar',
        name: '停机时间',
        barWidth: 18,
        stack: true
      }
    ]
  };

  myEchart.setOption(optionData);
}
onMounted(() => {
  renderChart();
});
</script>

<style lang="scss" scoped>
.time-census-wrapper {
  flex: 1;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px 48px 30px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div:first-child {
    display: flex;
    align-items: center;
    position: relative;
    height: 32px;
    margin-bottom: 20px;
    .top-btn {
      > span {
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 17px;
        display: flex;
        align-items: center;
        .iconfont {
          margin-left: 12px;
          margin-right: 10px;
        }
      }
    }
    ::v-deep .el-date-editor {
      width: 254px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  #time-census-box {
    flex: 1;
  }
}
</style>

<template>
  <div class="oil-chart-wrapper">
    <div class="analysis-switch">
      <template v-if="tab == '台架'">
        <span :active="state.analysisType == 'byTime' ? '' : null" @click="state.analysisType = 'byTime'">
          按时间
        </span>
        <span :active="state.analysisType == 'byBench' ? '' : null" @click="state.analysisType = 'byBench'">
          按台架</span
        >
      </template>
    </div>
    <div id="oil-chart-box"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { onMounted } from 'vue';
import * as echarts from 'echarts';
defineProps({
  tab: String
});
const state = reactive<any>({
  analysisType: 'byTime'
});

function renderChart() {
  echarts.init(document.getElementById('oil-chart-box') as HTMLElement).dispose();
  let myEchart = echarts.init(document.getElementById('oil-chart-box') as HTMLElement);
  myEchart.clear();

  //  数据配置
  const source = [
    ['09.01', 338],
    ['09.02', 416],
    ['09.03', 452],
    ['09.04', 129],
    ['09.05', 383],
    ['09.06', 461],
    ['09.07', 377],
    ['09.08', 423],
    ['09.09', 252],
    ['09.10', 40],
    ['09.11', 267],
    ['09.12', 290],
    ['09.13', 295],
    ['09.14', 53],
    ['09.15', 447],
    ['09.16', 338],
    ['09.17', 416],
    ['09.18', 452],
    ['09.19', 129],
    ['09.20', 383],
    ['09.21', 461],
    ['09.22', 377],
    ['09.23', 423],
    ['09.24', 252],
    ['09.25', 40],
    ['09.26', 267],
    ['09.27', 290],
    ['09.28', 295],
    ['09.29', 53],
    ['09.30', 447]
  ];

  let optionData = {
    dataset: {
      source: source
    },
    grid: {
      top: '30',
      left: '5',
      right: '0',
      bottom: '10%',
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
      right: 24,
      top: 0,
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
        name: '油耗',
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
.oil-chart-wrapper {
  padding: 17px 30px 20px 56px;
  width: calc(100% - 282px);
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  .analysis-switch {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 27px;
    height: 28px;
    span {
      width: 72px;
      height: 28px;
      background: #f1f5f9;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      display: inline-block;
      line-height: 28px;
      font-size: 12px;
      color: #5d677d;
      font-family: PingFangSC-Semibold, PingFang SC;
    }
    span[active] {
      background-color: rgba(1, 188, 143, 0.1);
      font-weight: 600;
      color: #01bc8f;
    }
    span + span {
      margin-left: 20px;
    }
  }
  #oil-chart-box {
    flex: 1;
  }
}
</style>

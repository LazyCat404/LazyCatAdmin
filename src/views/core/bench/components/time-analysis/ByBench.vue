<template>
  <div class="by-bench-wrapper" id="by-bench-wrapper">12</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';

function renderChart() {
  echarts.init(document.getElementById('by-bench-wrapper') as HTMLElement).dispose();
  let myEchart = echarts.init(document.getElementById('by-bench-wrapper') as HTMLElement);
  myEchart.clear();

  //  数据配置
  const source = [
    ['M01', 338, 110],
    ['M02', 416, 45],
    ['M03', 452, 56],
    ['M04', 129, 84],
    ['M05', 383, 71],
    ['M06', 461, 28],
    ['M07', 377, 60],
    ['M08', 423, 73],
    ['M09', 252, 98],
    ['M10', 40, 119],
    ['M11', 267, 70],
    ['M12', 290, 101],
    ['M13', 295, 41],
    ['M14', 53, 110],
    ['M15', 447, 47],
    ['M16', 338, 110],
    ['M17', 416, 45],
    ['M18', 452, 56],
    ['M19', 129, 84],
    ['M20', 383, 71],
    ['M21', 461, 28],
    ['M22', 377, 60],
    ['M23', 423, 73],
    ['M24', 252, 98],
    ['M25', 40, 119],
    ['M26', 267, 70],
    ['M27', 290, 101],
    ['M28', 295, 41],
    ['M29', 53, 110],
    ['M30', 447, 47]
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
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: '#333333' },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#EBEBEB'
        }
      }
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
      splitLine: { show: false },
      axisLabel: { color: '#333333' }
    },
    series: [
      {
        type: 'line',
        name: '运行时长',
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        showSymbol: false,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(1, 188, 143, 0.5)',
          shadowBlur: 10,
          shadowOffsetY: 7
        },
        itemStyle: {
          color: '#01BC8F',
          borderColor: '#fff',
          borderWidth: 3,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2
        }
      },
      {
        type: 'line',
        name: '停机时长',
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        showSymbol: false,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(255, 154, 128, 0.5)',
          shadowBlur: 10,
          shadowOffsetY: 7
        },
        itemStyle: {
          color: '#FF9A80',
          borderColor: '#fff',
          borderWidth: 3,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2
        }
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
.by-bench-wrapper {
  flex: 1;
  margin-top: 25px;
}
</style>

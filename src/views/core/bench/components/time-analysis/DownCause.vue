<template>
  <div class="down-cause-wrapper">
    <!-- 标题、按钮 -->
    <div class="down-run-btn">
      <LazyTitle title="停机原因时长及占比"></LazyTitle>
      <div class="top-btn">
        <i class="iconfont icon-xiazai"></i>
        <span>导出图表</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="down-cause-content">
      <div class="down-cause-chart">
        <div id="down-cause-chart"></div>
      </div>
      <ul class="down-cause-infor">
        <li>
          <div class="label">停机总时长</div>
          <div class="value">
            <div>
              <span>{{ state.ratioData.total }}</span>
              <i>h</i>
            </div>
            <div class="ratio" style="color: #5d677d">100%</div>
          </div>
        </li>
        <li>
          <div class="label">正常停机</div>
          <div class="value">
            <div>
              <span>{{ state.ratioData.normal }}</span>
              <i>h</i>
            </div>
            <div class="ratio" style="color: #01bc8f">{{ state.ratioData.normalRatio }}%</div>
          </div>
        </li>
        <li>
          <div class="label">故障停机</div>
          <div class="value">
            <div>
              <span>{{ state.ratioData.fault }}</span>
              <i>h</i>
            </div>
            <div class="ratio" style="color: #ff9a80">{{ state.ratioData.faultRatio }}%</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@api';
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';

const state = reactive<any>({
  ratioData: {}
});

function getDownCause() {
  api.bench.getDownCause().then((res: res) => {
    state.ratioData = res.data;
    renderChart();
  });
}
function renderChart() {
  echarts.init(document.getElementById('down-cause-chart') as HTMLElement).dispose();
  let myEchart = echarts.init(document.getElementById('down-cause-chart') as HTMLElement);
  myEchart.clear();
  let seriesData = [
    {
      value: state.ratioData.fault,
      name: '故障停机'
    },
    {
      value: state.ratioData.normal,
      name: '正常停机'
    }
  ];
  let optionData = {
    color: ['#01BC8F', '#FF9A80'],
    title: [
      {
        text: `{name| 故障停机 }\n{val|${state.ratioData.fault}}\n{time|小时}`,
        top: 'center',
        left: 'center',
        textStyle: {
          rich: {
            name: {
              fontSize: 16,
              color: '#333333'
            },
            val: {
              fontSize: 25,
              fontWeight: 'bold',
              padding: [10, 0, 5, 0],
              color: '#333333'
            },
            time: {
              fontSize: 12,
              color: '#333333'
            }
          }
        }
      }
    ],
    series: [
      {
        type: 'pie',
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 3
        },
        radius: ['80%', '100%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        data: seriesData
      },
      // 刻度线
      {
        type: 'gauge',
        startAngle: 0,
        endAngle: 360,
        radius: '93%',
        axisTick: {
          length: 2,
          lineStyle: { color: '#999' }
        },
        title: { show: false },
        detail: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false },
        data: [{ value: 100 }]
      }
    ]
  };

  myEchart.setOption(optionData);
}
onMounted(() => {
  getDownCause();
});
</script>
<style lang="scss" scoped>
.down-cause-wrapper {
  padding: 20px 30px 0 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .down-run-btn {
    display: flex;
    justify-content: space-between;

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
  .down-cause-content {
    flex: 1;
    display: flex;
    .down-cause-chart {
      flex: 1;
      #down-cause-chart {
        width: 75.245%;
        height: 100%;
        // .down-cause-chart-size {
        //   width: 75.245%;
        //   height: 75.245%;
        // }
        // #down-cause-chart {
        //   width: 100%;
        //   height: 100%;
        //   position: absolute;
        // }
      }
    }
    .down-cause-infor {
      width: 38.337%;
      margin-right: 5.426%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      li {
        display: flex;
        flex-direction: column;
        border-bottom: 1px dashed #ececef;
        padding: 4.72% 14.157%;
        .label {
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
          margin-bottom: 6.58%;
          position: relative;
        }
        .value {
          display: flex;
          justify-content: space-between;
          span {
            height: 25px;
            font-size: 18px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 25px;
          }
          i {
            display: inline-block;
            font-style: normal;
            padding-top: 3px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 20px;
          }
          .ratio {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            line-height: 20px;
            padding-top: 5px;
          }
        }
      }
      li:last-child {
        border-bottom: 0;
      }
      li:nth-child(2),
      li:last-child {
        .label {
          display: flex;
          align-items: center;
          &::before {
            width: 12px;
            height: 12px;
            border-radius: 3px;
            content: ' ';
            left: -20px;
            position: absolute;
          }
        }
      }
      li:nth-child(2) {
        .label {
          &::before {
            background-color: #01bc8f;
          }
        }
      }
      li:last-child {
        .label {
          &::before {
            background-color: #ff9a80;
          }
        }
      }
    }
  }
}
</style>

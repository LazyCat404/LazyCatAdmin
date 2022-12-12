<template>
  <div class="down-run-wrapper">
    <!-- 标题、按钮 -->
    <div class="down-run-btn">
      <BasicTitle title="停机/运行时长占比"></BasicTitle>
      <div class="top-btn">
        <i class="iconfont icon-xiazai"></i>
        <span>导出图表</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="down-run-content">
      <div class="down-run-chart">
        <div id="down-run-chart"></div>
        <ul>
          <li class="chart-size"></li>
          <li class="chart-label">运行时长</li>
          <li class="chart-value">{{ state.ratioData.run }}</li>
          <li class="cut-apart-line">
            <span></span>
            <i></i>
            <span></span>
          </li>
          <li class="chart-ratio">{{ state.ratioData.runRatio }}%</li>
          <li class="chart-unit">小时</li>
        </ul>
      </div>
      <ul class="down-run-infor">
        <li>
          <span><img src="@/assets/images/bench/统计.png" style="width: 20px" /></span>
          <div>
            <div class="total-time">
              <p>统计总时长</p>
              <div>
                <span class="time">{{ state.ratioData.total }}<i class="unit">h</i></span>
                <span class="ratio">100%</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <span><i class="iconfont icon-yunhang"></i></span>
          <div>
            <div class="run-time">
              <p>运行时间</p>
              <div>
                <span class="time">{{ state.ratioData.run }}<i class="unit">h</i></span>
                <span class="ratio">{{ state.ratioData.runRatio }}%</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <span><i class="iconfont icon-tingji"></i></span>
          <div>
            <div class="down-time">
              <p>停机时间</p>
              <div>
                <span class="time">{{ state.ratioData.down }}<i class="unit">h</i></span>
                <span class="ratio">{{ state.ratioData.downRatio }}%</span>
              </div>
            </div>
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

function getDownRunRatio() {
  api.bench.getDownRunRatio().then((res: res) => {
    state.ratioData = res.data;
    renderChart();
  });
}
function renderChart() {
  echarts.init(document.getElementById('down-run-chart') as HTMLElement).dispose();
  let myEchart = echarts.init(document.getElementById('down-run-chart') as HTMLElement);
  myEchart.clear();
  let score = state.ratioData.runRatio,
    maxScore = 100,
    scoresPercentage = score / maxScore;
  let optionData = {
    series: [
      // 满进度底色
      {
        type: 'pie',
        zlevel: 1,
        radius: ['85%', '100%'],
        silent: true,
        startAngle: 240,
        endAngle: 0,
        label: {
          show: true
        },
        labelLine: {
          show: false
        },
        animation: false,
        data: [
          {
            value: 100,
            itemStyle: {
              color: 'rgba(1, 188, 143, 0.18)',
              borderRadius: 10
            }
          },
          {
            value: 20,
            itemStyle: {
              opacity: 0
            }
          }
        ]
      },
      // 仪表盘进度
      {
        type: 'pie',
        zlevel: 10,
        radius: ['85%', '100%'],
        silent: true,
        startAngle: 240,
        endAngle: 0,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: [
          {
            name: '',
            value: scoresPercentage,
            itemStyle: {
              color: 'rgba(1, 188, 143,1)',
              borderRadius: 10
            }
          },
          {
            value: 1.2 - scoresPercentage,
            itemStyle: { opacity: 0 }
          }
        ]
      },
      {
        type: 'pie',
        radius: ['90%', '90%'],
        zlevel: 10,
        silent: true,
        startAngle: 245,
        endAngle: 0,
        data: [
          {
            name: '',
            value: scoresPercentage,
            label: { show: false },
            labelLine: { show: false },
            itemStyle: { opacity: 0 }
          },
          // 画中间的图标
          {
            name: '',
            value: 0,
            label: {
              position: 'inside',
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 7 // 可以控制圆的大小
            }
          },
          {
            name: '',
            value: 1.2 - scoresPercentage,
            label: { show: false },
            labelLine: { show: false },
            itemStyle: { opacity: 0 }
          }
        ]
      }
    ]
  };

  myEchart.setOption(optionData);
}
onMounted(() => {
  getDownRunRatio();
});
</script>
<style lang="scss" scoped>
.down-run-wrapper {
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
  .down-run-content {
    flex: 1;
    display: flex;
    .down-run-chart {
      flex: 1;
      position: relative;
      #down-run-chart {
        width: 86.103%;
        height: 100%;
      }
      > ul {
        position: absolute;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #333333;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: 0;
        width: 86.103%;
        height: 100%;
        .chart-size {
          height: 34.505%;
        }
        .chart-lable {
          height: 22px;
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
        }
        .chart-value {
          height: 21.057%;
          font-size: 28px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        .cut-apart-line {
          height: 3px;
          width: 100%;
          display: flex;
          justify-content: center;
          span {
            display: inline-block;
            height: 1px;
            width: 23.623%;
            background: #ececef;
          }
          i {
            display: inline-block;
            width: 3px;
            height: 3px;
            margin: 0 3.94%;
            background: #ececef;
            border-radius: 50% 50%;
          }
        }
        .chart-ratio {
          height: 18%;
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 500;
          color: #01bc8f;
        }
        .chart-unit {
          height: 22px;
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
        }
      }
    }
    .down-run-infor {
      width: 46.657%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      > li {
        display: flex;
        background-color: #f1f5f9;
        padding-right: 6px;
        padding: 5.43% 0 5.43% 7.755%;
        border-radius: 8px;
        align-items: center;
        > span {
          width: 44px;
          height: 44px;
          background: #ffffff;
          border-radius: 7px;
          display: -webkit-flex;
          display: flex; /*定位（写在父元素中）*/
          justify-content: center; /*水平居中*/
          align-items: center;
          .icon-tingji {
            color: #ff9a80;
          }
          .icon-yunhang {
            color: #01bc8f;
          }
        }
        > div {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
          .total-time,
          .run-time,
          .down-time {
            padding: 0 15.96%;
            flex: 1;
            display: -webkit-flex;
            display: flex; /*定位（写在父元素中）*/
            flex-direction: column;
            p {
              height: 17px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              line-height: 17px;
            }
            div {
              display: flex;
              justify-content: space-between;
              .time {
                height: 22px;
                font-size: 16px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 22px;
              }
              .ratio {
                height: 25px;
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                line-height: 25px;
              }
              .unit {
                font-size: 12px;
                font-style: normal;
                font-weight: 500;
                margin-left: 6px;
              }
            }
          }
          .total-time,
          .run-time {
            .ratio {
              color: #01bc8f;
            }
          }
          .down-time {
            .ratio {
              color: #ff9a80;
            }
          }
        }
      }
      > li:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>

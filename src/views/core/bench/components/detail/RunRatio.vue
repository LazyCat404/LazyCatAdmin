<template>
  <div class="run-ratio-wrapper">
    <el-scrollbar height="100%">
      <div class="run-ratio-content">
        <!-- 上方按钮 -->
        <div>
          <BasicTitle title="运行时间占比"></BasicTitle>
          <div>
            <i class="iconfont icon-xiazai"></i>
            <el-date-picker
              v-model="state.time"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </div>
        <!-- 仪表盘 -->
        <div class="ratio-echart">
          <div>
            <div class="seize-seat"></div>
            <div id="run-ratio-chart"></div>
          </div>
        </div>
        <div class="run-ratio-box">
          <div class="run-ratio">
            <span><i class="iconfont icon-yunhang"></i></span>
            <div>
              <div class="run-time">
                <p>运行时间</p>
                <div>
                  <span class="time">{{ state.ratioData.runTime }}<i class="unit">h</i></span>
                  <span class="ratio">{{ state.ratioData.runRatio }}%</span>
                </div>
              </div>
              <img src="@/assets/images/bench/运行.png" />
            </div>
          </div>
          <div class="down-ratio">
            <span><i class="iconfont icon-tingji"></i></span>
            <div>
              <div class="down-time">
                <p>停机时间</p>
                <div>
                  <span class="time">{{ state.ratioData.downTime }}<i class="unit">h</i></span>
                  <span class="ratio">{{ state.ratioData.downRatio }}%</span>
                </div>
              </div>
              <img src="@/assets/images/bench/停机.png" />
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import api from '@api';
import * as echarts from 'echarts';
import { reactive, onMounted } from 'vue';
defineProps({
  detail: {
    type: Object,
    required: true
  }
});
const state = reactive<any>({
  time: null,
  ratioData: {}
});

function getRunRatio() {
  api.bench.getRunRatio({ time: state.time }).then((res: res) => {
    state.ratioData = res.data;
    renderChart();
  });
}

function renderChart() {
  let value = state.ratioData.runRatio;
  echarts.init(document.getElementById('run-ratio-chart') as HTMLElement).dispose();
  let myEchart = echarts.init(document.getElementById('run-ratio-chart') as HTMLElement);
  myEchart.clear();
  let optionData = {
    series: [
      {
        type: 'gauge',
        startAngle: 190,
        endAngle: 350,
        radius: '65%',
        axisTick: {
          length: 2,
          lineStyle: {
            color: '#999'
          }
        },
        center: ['50%', '40%'],
        title: { show: false },
        detail: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false },
        data: [{ value: value }]
      },
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 360,
        radius: '79%',
        center: ['50%', '40%'],
        axisLine: {
          lineStyle: {
            width: 30,
            color: [[1, '#FF9A80']]
          }
        },
        itemStyle: {
          color: '#7A7A7A'
        },
        title: { show: false },
        detail: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        data: [{ value: value }]
      },
      {
        type: 'gauge',
        radius: '80%',
        center: ['50%', '40%'],
        startAngle: 180,
        endAngle: 360,
        axisLine: {
          show: true,
          lineStyle: {
            width: 34,
            color: [[value / 100, '#01BC8F']]
          }
        },
        title: { show: false },
        detail: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        pointer: { show: false }
      },
      {
        name: '最外刻度亮线',
        type: 'gauge',
        radius: '80%',
        center: ['50%', '40%'],
        startAngle: 180 - (180 * value) / 100,
        endAngle: 220 - (280 * value) / 100,
        axisLine: {
          lineStyle: {
            color: [[3 / 100, 'rgba(0,0,0,0)']]
          }
        },
        progress: {
          show: true,
          width: 34,
          itemStyle: {
            color: '#fff',
            shadowColor: 'rgba(16,235,227,1)',
            shadowBlur: 20
          }
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        detail: {
          show: false
        },
        pointer: {
          show: false
        },
        animationDelay: 850,
        animationDuration: 300,
        data: [
          {
            value: 100
          }
        ],
        title: {
          show: false
        }
      }
    ]
  };

  myEchart.setOption(optionData);
}
onMounted(() => {
  getRunRatio();
});
</script>

<style lang="scss" scoped>
.run-ratio-wrapper {
  height: 100%;
  width: 418px;
  background: #ffffff;
  border-radius: 10px;
  margin-left: 30px;
  padding: 26px 20px 20px 30px;
  box-sizing: border-box;
  position: relative;
  ::v-deep .el-scrollbar__view {
    // min-height: 100%;
    height: 100%;
    .run-ratio-content {
      min-height: 380px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > div:first-child {
        display: flex;
        align-items: center;
        position: relative;
        height: 32px;
        margin-bottom: 20px;
        .basic-title-wrapper {
          height: 32px;
        }
        .el-date-editor {
          width: 194px;
          height: 32px;
          border-radius: 4px;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          position: absolute;
          right: 0;
          top: 0;
        }
        .iconfont {
          margin-left: 12px;
        }
      }
      .ratio-echart {
        flex: 1;
        position: relative;
        > div {
          width: 100%;
          position: absolute;
          .seize-seat {
            width: 100%;
            padding-bottom: calc(100% - 32px);
            height: 0;
          }
          #run-ratio-chart {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }

      .run-ratio-box {
        display: flex;
        flex-direction: column;

        .run-ratio,
        .down-ratio {
          display: flex;
          background-color: #f1f5f9;
          padding-left: 20px;
          padding-right: 6px;
          height: 72px;
          border-radius: 8px;
          margin-top: 16px;
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
            .run-time,
            .down-time {
              padding-left: 30px;
              padding-right: 28px;
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
                  height: 20px;
                  font-size: 14px;
                  font-family: PingFangSC-Semibold, PingFang SC;
                  font-weight: 600;
                  color: #ff9a80;
                  line-height: 20px;
                }
                .unit {
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 500;
                  margin-left: 6px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="board-detail-wrapper">
    <ul class="legend">
      <li>
        <i></i>
        <span>{{ 53 }}</span>
      </li>
      <li>
        <i></i>
        <span>{{ 20 }}</span>
      </li>
      <li>
        <i></i>
        <span>{{ 33 }}</span>
      </li>
    </ul>
    <div class="bench-list-box">
      <p>特试看板</p>
      <!-- 看板总览 -->
      <div class="board-ooverview">
        <div class="board-status-ratio">
          <div id="board-status-ratio"></div>
          <div class="board-total">
            <span>{{ state.ratioData.total }}</span>
            <span>台架总数</span>
          </div>
        </div>
        <ul>
          <li>
            <div class="legend-label">运行台架</div>
            <div class="value-ratio">
              <span>53</span>
              <i>48%</i>
            </div>
          </li>
          <li>
            <div class="legend-label">故障台架</div>
            <div class="value-ratio">
              <span>20</span>
              <i>48%</i>
            </div>
          </li>
          <li>
            <div class="legend-label">停机台架</div>
            <div class="value-ratio">
              <span>33</span>
              <i>48%</i>
            </div>
          </li>
        </ul>
      </div>
      <!-- 台架动态 -->
      <div class="dynamic-title">台架动态</div>
      <el-scrollbar height="calc(100% - 359px)">
        <ul class="dynamic-list">
          <li v-for="(item, i) in state.benchList" :key="i" :status="item.run">
            <BoardBenchItem :item="item" @boardSet="boardSet"></BoardBenchItem>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <!-- 弹出框 -->
    <el-dialog class="aa" v-model="state.dialog.show" :width="state.dialog.width" destroy-on-close draggable>
      <MonitorDetail :monitorDetail="state.dialog.data"></MonitorDetail>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import api from '@api';
import BoardBenchItem from './BoardBenchItem.vue';
import MonitorDetail from '../../components/monitor/MonitorDetail.vue';
import * as echarts from 'echarts';
import { onMounted, reactive, watch } from 'vue';
const props = defineProps({
  currentBoard: {
    type: Object,
    required: true
  }
});
const state = reactive<any>({
  benchList: [],
  ratioData: {},
  dialog: {
    show: false,
    width: '65.98958333333333%',
    data: {}
  }
});
// 根据看板获取台架列表
function getBoardBenchList() {
  api.bench.getBoardBenchList({ boardId: props.currentBoard.boardId }).then((res: res) => {
    state.benchList = res.data;
  });
}
function getStatusRatio(par?: string) {
  api.bench.getStatusRatio({ id: props.currentBoard.id }).then((res: res) => {
    state.ratioData = res.data;
    if (!par) {
      renderChart();
    }
  });
}
function renderChart() {
  echarts.init(document.getElementById('board-status-ratio') as HTMLElement).dispose();
  let myEchart = echarts.init(document.getElementById('board-status-ratio') as HTMLElement);
  myEchart.clear();
  let optionData = {
    color: ['#01BC8F', '#FF6A64', '#5E6389', 'transparent'],
    series: [
      {
        type: 'pie',
        radius: ['55%', '75%'],
        startAngle: 190,
        endAngle: 0,
        center: ['50%', '40%'],
        labelLine: { show: false },
        data: [
          { value: state.ratioData.run.ratio },
          { value: state.ratioData.fault.ratio },
          { value: state.ratioData.down.ratio },
          { value: (state.ratioData.total / (205 / 360)) * (1 - 205 / 360) }
        ]
      },
      {
        type: 'gauge',
        startAngle: 190,
        endAngle: 350,
        radius: '60%',
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
        data: [{ value: 100 }]
      }
    ]
  };

  myEchart.setOption(optionData);
}

function boardSet(par: any) {
  switch (par.type) {
    case '监控视频':
      api.bench.getBenchMonitor({ id: par.data.id }).then((res: res) => {
        state.dialog.show = true;
        state.dialog.data = res.data;
      });
      break;
    case '急停':
      break;
    case '台架控制电脑':
      break;
    case '客户端工控机':
      break;
    case '查看错误信息':
      break;
  }
}

getBoardBenchList();
onMounted(() => {
  getStatusRatio();
});
watch(
  () => props.currentBoard,
  () => {
    getBoardBenchList();
    getStatusRatio('不重绘');
  }
);
</script>
<style lang="scss" scoped>
.board-detail-wrapper {
  width: 650px;
  height: calc(100% - 120px);
  right: 30px;
  top: 90px;
  position: absolute;
  display: flex;
  .legend {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    width: 186px;
    height: calc(100% - 33px);
    margin-top: 63px;
    padding-right: 30px;
    box-sizing: border-box;
    background: linear-gradient(270deg, #f9fbfd 0%, rgba(247, 249, 253, 0.75) 51%, rgba(241, 245, 251, 0) 100%);
    > li {
      display: flex;
      flex-direction: column;
      width: fit-content;
      align-items: center;
      margin-top: 30px;
      i {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 4px;
      }
    }
    > li:first-child {
      margin-top: 0;
      i {
        background: #01bc8f;
      }
    }
    > li:nth-child(2) {
      i {
        background: #ff6a64;
      }
    }
    > li:last-child {
      i {
        background: #5e6389;
      }
    }
  }
  .bench-list-box {
    width: 464px;
    background: #ffffff;
    border-radius: 20px;
    padding: 40px;
    box-sizing: border-box;
    > p {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 28px;
    }
    > .board-ooverview {
      .board-status-ratio {
        height: 205px;
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        #board-status-ratio {
          width: 100%;
          height: 180%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .board-total {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
          span {
            display: inline-block;
          }
          > span:first-child {
            height: 42px;
            font-size: 30px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #01bc8f;
            line-height: 42px;
          }
          > span:last-child {
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 17px;
            margin-top: 10px;
          }
        }
      }
      ul {
        display: flex;
        height: 88px;
        background: #f7f6f9;
        border-radius: 8px;
        li {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .legend-label {
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 17px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            &::before {
              width: 10px;
              height: 10px;
              border-radius: 2px;
              content: ' ';
              margin-right: 4px;
            }
          }
          .value-ratio {
            margin-top: 4px;
            span {
              height: 33px;
              font-size: 24px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;

              line-height: 33px;
              margin-right: 6px;
            }
            i {
              display: inline-block;
              font-style: normal;
              height: 17px;
              font-size: 12px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #333333;
              line-height: 17px;
            }
          }
        }
        li:first-child {
          .legend-label {
            &::before {
              background: #01bc8f;
            }
          }
          .value-ratio {
            span {
              color: #01bc8f;
            }
          }
        }
        li:nth-child(2) {
          .legend-label {
            &::before {
              background: #ff6a64;
            }
          }
          .value-ratio {
            span {
              color: #ff6a64;
            }
          }
        }
        li:last-child {
          .legend-label {
            &::before {
              background: #5e6389;
            }
          }
          .value-ratio {
            span {
              color: #5e6389;
            }
          }
        }
      }
    }
    .dynamic-title {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 17px;
      padding-top: 20px;
    }
    .dynamic-list {
      > li {
        margin-top: 12px;
      }
    }
  }
  // 弹框
  ::v-deep .el-overlay {
    .el-dialog__header {
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      .el-dialog__headerbtn {
        display: none;
      }
    }
    .el-dialog__body {
      padding: 0;
      border-radius: 6px;
      overflow: hidden;
    }
  }
}
</style>

<template>
  <div class="monitor-list-wrapper">
    <el-scrollbar height="100%">
      <ul class="monitor-list-content" :crowd="activeScreen == 3 ? '' : null">
        <li v-for="(item, i) in monitorList" :key="i">
          <div class="monitor-oper">
            <!-- 视频容器 -->
            <div class="monitor-box">
              <Video :path="i"></Video>
            </div>
            <!-- 按钮 -->
            <div class="monitor-btn-box">
              <el-button class="success-btn" @click="monitorOper('监控', item)">
                <i class="iconfont icon-daping"></i>
                <span>监控</span>
              </el-button>
              <el-button class="danger-btn" @click="monitorOper('急停', item)">
                <i class="iconfont icon-jiting"></i>
                <span>急停</span>
              </el-button>
              <el-button plain @click="monitorOper('远程桌面', item)">远程桌面</el-button>
              <el-button plain @click="monitorOper('工控机', item)">工控机</el-button>
              <el-button plain @click="monitorOper('通讯', item)">通讯</el-button>
            </div>
          </div>
          <div class="monitor-infor">
            <div class="name-status">
              <span>{{ item.name }}</span>
              <span
                :style="[
                  {
                    background: item.status == 0 ? '#5E6389' : item.status == 1 ? '#01BC8F' : '#FF6A64'
                  }
                ]"
              >
                {{ item.status == 0 ? '停机' : item.status == 1 ? '运行' : '故障' }}
              </span>
            </div>
            <!-- 信息切换按钮 -->
            <div class="infor-switch">
              <span :active="!item.currentInfor ? '' : null" @click="item.currentInfor = !item.currentInfor">数据</span>
              <span :active="item.currentInfor ? '' : null" @click="item.currentInfor = !item.currentInfor">时长</span>
            </div>
            <ul class="data-box" v-if="!item.currentInfor">
              <li>
                <p>台架转速</p>
                <div>
                  <span class="infor-lable">{{ item.zhuansu }}</span>
                  <span class="infor-unit">r/min</span>
                </div>
              </li>
              <li>
                <p>台架扭矩</p>
                <div>
                  <span class="infor-lable">{{ item.niuju }}</span>
                  <span class="infor-unit">Nm</span>
                </div>
              </li>
              <li>
                <p>碳平衡</p>
                <div>
                  <span class="infor-lable">{{ item.tan }}</span>
                </div>
              </li>
              <li>
                <p>自动实验</p>
                <div>
                  <span class="infor-lable">{{ item.shiyan ? '是' : '否' }}</span>
                </div>
              </li>
            </ul>
            <ul class="time-box" v-else>
              <li>
                <el-progress
                  type="circle"
                  :percentage="(item.today / 24) * 100"
                  :show-text="false"
                  color="#01BC8F"
                  :stroke-width="10"
                />
                <div>
                  <span class="label">今日</span>
                  <span class="value">{{ item.today }}<i>h</i></span>
                </div>
              </li>
              <li>
                <el-progress
                  type="circle"
                  :percentage="(item.yesterday / 24) * 100"
                  :show-text="false"
                  color="#E97E62"
                  :stroke-width="10"
                />
                <div>
                  <span class="label">昨日</span>
                  <span class="value">{{ item.yesterday }}<i>h</i></span>
                </div>
              </li>
              <li>
                <el-progress
                  type="circle"
                  :percentage="(item.week / 105) * 100"
                  :show-text="false"
                  color="#01BC8F"
                  :stroke-width="10"
                />
                <div>
                  <span class="label">本周</span>
                  <span class="value">{{ item.week }}<i>h</i></span>
                </div>
              </li>
              <li>
                <el-progress
                  type="circle"
                  :percentage="(item.month / 450) * 100"
                  :show-text="false"
                  color="#E97E62"
                  :stroke-width="10"
                />
                <div>
                  <span class="label">本月</span>
                  <span class="value">{{ item.month }}<i>h</i></span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Video from '@/components/Video.vue';
defineProps({
  monitorList: Object,
  activeScreen: Number
});
const $emits = defineEmits(['monitorOper']);

function monitorOper(type: string, data: unknown) {
  $emits('monitorOper', { type, data });
}
</script>
<style lang="scss" scoped>
// 2x2
.monitor-list-content {
  display: flex;
  flex-wrap: wrap; /*自动换行*/
  min-width: 1280px;
  > li {
    width: calc((100% - 60px) / 2);
    margin-right: 30px;
    height: 464px;
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 30px;
    display: flex;
    .monitor-oper {
      border-right: 1px solid #edf0f4;
      flex: 1;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .monitor-box {
        flex: 1;
        // background-image: url('@/assets/images/bench/screen-bg.png');
        background-size: 100% 100%;
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
      }
      .monitor-btn-box {
        .el-button {
          width: 72px;
          margin-top: 12px;
          .iconfont {
            font-size: 14px;
            margin-right: 3px;
          }
        }
        .el-button + .el-button {
          margin-left: 20px;
        }
      }
    }
    .monitor-infor {
      width: 145px;
      display: flex;
      flex-direction: column;
      padding: 20px 12px 0 12px;
      box-sizing: border-box;
      .name-status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          display: inline-block;
        }
        > span:first-child {
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 25px;
        }
        > span:last-child {
          height: 18px;
          line-height: 18px;
          border-radius: 3px;
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          padding: 0 6px;
        }
      }
      // 切换按钮
      .infor-switch {
        width: 100%;
        height: 28px;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-top: 20px;
        margin-bottom: 14px;
        span {
          line-height: 26px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          display: inline-block;
          flex: 1;
          color: #333333;
          text-align: center;
          height: 26px;
          cursor: pointer;
          position: relative;
          border: 1px solid #01bc8f;
          border-radius: 4px;
        }
        span[active] {
          background: #01bc8f;
          color: #ffffff;
        }
        span:first-child {
          border-radius: 4px 0 0 4px;
          border-right: 0;
        }
        span:last-child {
          border-radius: 0 4px 4px 0;
          border-left: 0;
        }
      }
      // 展示信息
      .data-box,
      .time-box {
        flex: 1;
        > li {
          border-bottom: 1px dashed #eeeeee;
          padding: 0 8px;
          padding-bottom: 16px;
          margin-top: 16px;
        }
      }
      .data-box {
        > li {
          p {
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 17px;
            margin-bottom: 4px;
          }
          > div {
            display: flex;
            align-items: flex-end;
            span {
              height: 20px;
              line-height: 20px;
            }
            .infor-lable {
              font-size: 14px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #01bc8f;
            }
            .infor-unit {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              margin-left: 6px;
            }
          }
        }
        > li:last-child {
          border-bottom: 0;
        }
      }
      .time-box {
        > li {
          display: flex;
          align-items: center;
          .el-progress {
            margin-right: 16px;
            ::v-deep .el-progress-circle {
              width: 38px !important;
              height: 38px !important;
            }
          }
          > div {
            display: flex;
            flex-direction: column;
            > span {
              display: inline-block;
              color: #333333;
            }
            .label {
              height: 17px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              line-height: 17px;
              margin-bottom: 4px;
            }
            .value {
              height: 20px;
              font-size: 14px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              line-height: 20px;
              i {
                font-style: normal;
                font-size: 12px;
                font-weight: 400;
                color: #333333;
                margin-left: 4px;
              }
            }
          }
        }
        > li:nth-child(2n) {
          ::v-deep .el-progress-circle {
            width: 38px !important;
            height: 38px !important;
            path:first-child {
              stroke: rgba(233, 126, 98, 0.12);
            }
          }
        }
        > li:nth-child(2n-1) {
          ::v-deep .el-progress-circle {
            path:first-child {
              stroke: rgba(1, 188, 143, 0.12);
            }
          }
        }
        > li:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
// 3x3
.monitor-list-content[crowd] {
  padding-right: 10px;
  min-width: 1815px;
  > li {
    width: calc((100% - 60px) / 3);
    margin-right: 20px;
    height: 312px;
    .monitor-infor {
      width: 120px;
    }
    .infor-switch {
      margin-top: 12px;
      margin-bottom: 4px;
    }
    // 展示信息
    .data-box {
      > li {
        padding: 8px 14px;
        margin-top: 0;
        > p {
          margin-bottom: 2px;
        }
      }
    }
    .time-box {
      > li {
        padding-bottom: 8px;
        margin-top: 8px;
        .infor-switch {
          margin-bottom: 2px;
        }

        .el-progress {
          margin-right: 10px;
          ::v-deep .el-progress-circle {
            width: 36px !important;
            height: 36px !important;
          }
        }
        > div {
          .label {
            margin-bottom: 2px;
          }
          .value {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            line-height: 20px;
            i {
              font-style: normal;
              font-size: 12px;
              font-weight: 400;
              color: #333333;
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
}
</style>

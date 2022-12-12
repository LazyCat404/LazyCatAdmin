<template>
  <div class="monitor-detail-wrapper">
    <div class="monitor-oper">
      <!-- 视频容器 -->
      <div class="monitor-box">
        <Video :path="monitorDetail.path && monitorDetail.path != 0 ? monitorDetail.path : 0"></Video>
      </div>
      <!-- 按钮 -->
      <div class="monitor-btn-box">
        <el-button class="danger-btn" @click="monitorOper('急停')">
          <i class="iconfont icon-jiting"></i>
          <span>急停</span>
        </el-button>
        <el-button plain @click="monitorOper('远程桌面')">远程桌面</el-button>
        <el-button plain @click="monitorOper('工控机')">工控机</el-button>
        <el-button plain @click="monitorOper('通讯')">通讯</el-button>
      </div>
    </div>
    <div class="monitor-infor">
      <div class="name-status">
        <span>{{ monitorDetail.name }}</span>
        <span
          :style="[
            {
              background: monitorDetail.status == 0 ? '#5E6389' : monitorDetail.status == 1 ? '#01BC8F' : '#FF6A64'
            }
          ]"
        >
          {{ monitorDetail.status == 0 ? '停机' : monitorDetail.status == 1 ? '运行' : '故障' }}
        </span>
      </div>
      <!-- 数据总览 -->
      <div class="data-infor">
        <p>数据总览</p>
        <div class="data-top-box">
          <div>
            <div class="label">台架转速</div>
            <div class="value">
              <span>{{ monitorDetail.zhuansu ? '是' : '否' }}</span>
              <i class="unit">r/min</i>
            </div>
          </div>
          <div>
            <div class="label">台架扭矩</div>
            <div class="value">
              <span>{{ monitorDetail.niuju }}</span>
              <i class="unit">Nm</i>
            </div>
          </div>
        </div>
        <div class="data-bottom-box">
          <div>
            <div class="label">碳平衡</div>
            <div class="value">
              <span>{{ monitorDetail.tan }}</span>
            </div>
          </div>
          <div>
            <div class="label">自动实验</div>
            <div class="value">
              <span>{{ monitorDetail.shiyan }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 时长总览 -->
      <div class="time-infor">
        <p>时长总览</p>
        <ul>
          <li>
            <el-progress
              type="circle"
              :percentage="Math.round((monitorDetail.today / 24) * 100)"
              color="#01BC8F"
              :stroke-width="10"
            />
            <div>
              <span class="label">今日时长</span>
              <span class="value">{{ monitorDetail.today }}<i>h</i></span>
            </div>
          </li>
          <li>
            <el-progress
              type="circle"
              :percentage="Math.round((monitorDetail.yesterday / 24) * 100)"
              color="#E97E62"
              :stroke-width="10"
            />
            <div>
              <span class="label">昨日时长</span>
              <span class="value">{{ monitorDetail.yesterday }}<i>h</i></span>
            </div>
          </li>
          <li>
            <el-progress
              type="circle"
              :percentage="Math.round((monitorDetail.week / 105) * 100)"
              color="#01BC8F"
              :stroke-width="10"
            />
            <div>
              <span class="label">本周时长</span>
              <span class="value">{{ monitorDetail.week }}<i>h</i></span>
            </div>
          </li>
          <li>
            <el-progress
              type="circle"
              :percentage="Math.round((monitorDetail.month / 450) * 100)"
              color="#E97E62"
              :stroke-width="10"
            />
            <div>
              <span class="label">本月时长</span>
              <span class="value">{{ monitorDetail.month }}<i>h</i></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Video from '@/components/Video.vue';
defineProps({
  monitorDetail: {
    type: Object,
    required: true
  }
});
function monitorOper(type: string) {
  console.log(type);
}
</script>

<style lang="scss" scoped>
.monitor-detail-wrapper {
  width: 100%;
  height: 660px;
  background: #ffffff;
  display: flex;
  .monitor-oper {
    flex: 1;
    padding: 12px 0 20px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .monitor-box {
      flex: 1;
      background-image: url('@/assets/images/bench/screen-bg.png');
      background-size: 100% 100%;
      width: 100%;
      border-radius: 15px;
      overflow: hidden;
    }
    .monitor-btn-box {
      margin-top: 20px;
      .el-button {
        width: 72px;
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
    width: 240px;
    display: flex;
    flex-direction: column;
    padding: 33px 20px 0 20px;
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
    p {
      height: 24px;
      line-height: 24px;
      padding-left: 8px;
      background: #f7f6f9;
      border-radius: 4px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      margin-top: 20px;
    }
    .data-infor {
      > div {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        .label {
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 17px;
          margin-bottom: 4px;
        }
        .value {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #01bc8f;
          line-height: 20px;
          .unit {
            font-style: normal;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 17px;
            margin-left: 6px;
          }
        }
      }
      .data-top-box {
        border-bottom: 1px dashed #eeeeee;
        padding-bottom: 16px;
      }
      .data-bottom-box,
      .data-top-box {
        > div {
          width: 50%;
        }
      }
    }
    .time-infor {
      li {
        display: flex;
        align-items: center;
        padding: 16px 0;
        padding-left: 12px;
        border-bottom: 1px dashed #eeeeee;
        .el-progress {
          margin-right: 30px;
          ::v-deep .el-progress-circle {
            width: 56px !important;
            height: 56px !important;
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
              color: #333333;
              margin-left: 4px;
            }
          }
        }
      }
      li:nth-child(2n) {
        ::v-deep .el-progress-circle {
          path:first-child {
            stroke: rgba(233, 126, 98, 0.12);
          }
        }
      }
      li:nth-child(2n-1) {
        ::v-deep .el-progress-circle {
          path:first-child {
            stroke: rgba(1, 188, 143, 0.12);
          }
        }
      }
      li:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>

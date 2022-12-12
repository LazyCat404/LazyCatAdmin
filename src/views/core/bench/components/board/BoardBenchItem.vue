<template>
  <div class="board-bench-item-wrapper">
    <div class="status-time">
      <img src="@/assets/images/bench/台架运行.png" v-if="item.run == '运行'" />
      <img src="@/assets/images/bench/台架停机.png" v-else-if="item.run == '停机'" />
      <img src="@/assets/images/bench/台架警告.png" v-else />
      <div class="time-infor">
        <i>累计时长</i>
        <span>{{ item.runTime || item.time }}</span>
        <i>(小时)</i>
      </div>
    </div>
    <div class="dynamic-infor" :status="item.run">
      <div>
        <div class="name-status">
          <div class="name-status-box">
            <span>{{ item.name }}</span>
            <i class="status">{{ item.run }}</i>
          </div>
          <!-- 设置按钮 -->
          <el-dropdown>
            <i class="iconfont icon-shezhi"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="boardSet('急停', item)">
                  <i class="iconfont icon-jiting"></i>
                  <span>急停</span>
                </el-dropdown-item>
                <el-dropdown-item @click="boardSet('监控视频', item)">
                  <i class="iconfont icon-daping"></i>
                  <span>监控视频</span>
                </el-dropdown-item>
                <el-dropdown-item @click="boardSet('台架控制电脑', item)">台架控制电脑</el-dropdown-item>
                <el-dropdown-item @click="boardSet('客户端工控机', item)">客户端工控机</el-dropdown-item>
                <el-dropdown-item @click="boardSet('查看错误信息', item)">查看错误信息</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="num-label-value">
          <div>
            <span class="num-label">编号</span>
            <span class="num-value">{{ item.orderNum }}</span>
          </div>
          <div>
            <span class="num-label">型号</span>
            <span class="num-value">{{ item.orderNum }}</span>
          </div>
        </div>
      </div>
      <!-- 占比信息 -->
      <div>
        <div class="experiment-name">
          <span>{{ item.experimentName ? item.experimentName : '-' }}</span>
          <i class="iconfont icon-tishi"></i>
        </div>
        <el-progress
          :percentage="item.progress"
          :width="6"
          :show-text="false"
          :color="item.run == '停机' ? '#5E6389' : item.run == '运行' ? '#01BC8F' : '#FF6A64'"
        />
        <div class="plan-finish-time">
          <span>预计完成时间</span>
          <span>
            {{ item.planFinishTime
            }}<i :style="[{ color: item.run == '停机' ? '#5E6389' : item.run == '运行' ? '#01BC8F' : '#FF6A64' }]"
              >({{ item.progress }}%)
            </i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
});
const $emits = defineEmits(['boardSet']);
function boardSet(type: string, data: unknown) {
  $emits('boardSet', { type, data });
}
</script>

<style lang="scss" scoped>
.board-bench-item-wrapper {
  display: flex;
  padding-left: 12px;
  padding-right: 20px;
  padding-bottom: 11px;
  background: #f7f6f9;
  border-radius: 10px;
  .status-time {
    display: flex;
    flex-direction: column;
    > img {
      width: 102px;
    }
    .time-infor {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding-top: 10px;
      i {
        font-style: normal;
        display: inline-block;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 17px;
      }
      span {
        display: inline-block;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
        margin-top: 5px;
      }
    }
  }
  .dynamic-infor {
    flex: 1;
    display: flex;
    padding-left: 6px;
    flex-direction: column;
    > div {
      width: 100%;
    }
    .name-status {
      display: flex;
      align-items: center;
      position: relative;
      justify-content: space-between;
      padding-top: 18px;
      .name-status-box {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 25px;
        }
        .status {
          display: inline-block;
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          height: 18px;
          line-height: 18px;
          padding: 0 6px;
          border-radius: 3px;
          font-style: normal;
          margin-left: 12px;
        }
      }

      .iconfont {
        cursor: pointer;
        color: #5d677d;
      }
    }
    .num-label-value {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid #eeeeee;
      > div {
        display: flex;
        .num-label {
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 17px;
          margin-right: 6px;
        }
        .num-value {
          flex: 1;
          width: 80px;
          display: inline-block;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 17px;
          overflow: hidden; /*把超出的内容进行隐藏*/
          white-space: nowrap; /*设置内容不换行*/
          text-overflow: ellipsis; /*设置超出内容为省略号*/
        }
      }
    }
    // 占比信息
    .experiment-name {
      height: 20px;
      margin-top: 9px;
      width: 100%;
      overflow: hidden;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 20px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      > span {
        display: inline-block;
        width: calc(100% - 34px);
        overflow: hidden; /*把超出的内容进行隐藏*/
        white-space: nowrap; /*设置内容不换行*/
        text-overflow: ellipsis;
      }
      i.iconfont {
        font-size: 14px;
        color: #333333;
      }
    }
    .plan-finish-time {
      display: flex;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 17px;
      margin-top: 12px;
      justify-content: space-between;
      i {
        font-style: normal;
        margin-left: 6px;
        font-weight: 600;
      }
    }
  }
  .dynamic-infor[status='运行'] {
    .name-status {
      .status {
        background-color: #01bc8f;
      }
    }
  }
  .dynamic-infor[status='故障'] {
    .name-status {
      .status {
        background-color: #ff6a64;
      }
    }
  }
  .dynamic-infor[status='停机'] {
    .name-status {
      .status {
        background-color: #5e6389;
      }
    }
  }
}
// 设置-下拉菜单
.el-dropdown-menu {
  padding: 8px 0;
  min-width: 142px;
  ::v-deep .el-dropdown-menu__item {
    padding: 8px 20px;
    .iconfont {
      margin-right: 10px;
    }
  }
  ::v-deep .el-dropdown-menu__item:nth-child(2) {
    margin-bottom: 16px;
    position: relative;
    &::after {
      width: calc(100% - 40px);
      height: 1px;
      content: ' ';
      background: #eeeeee;
      position: absolute;
      bottom: -8px;
    }
  }
}
</style>

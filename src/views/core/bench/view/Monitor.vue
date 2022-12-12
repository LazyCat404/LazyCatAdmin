<template>
  <div class="monitor-wrapper">
    <div class="switch-screen-box">
      <p>
        <i class="iconfont icon-taijiaxinxi"></i>
        <span>监控大屏</span>
      </p>
      <ul class="switch-screen-btn">
        <li @click="switchScreen(2)" :active="state.activeScreen == 2 ? '' : null">
          <i class="iconfont icon-a-2lie"></i>
          <span>2列大屏</span>
        </li>
        <li @click="switchScreen(3)" :active="state.activeScreen == 3 ? '' : null">
          <i class="iconfont icon-a-3lie"></i>
          <span>3列大屏</span>
        </li>
      </ul>
    </div>
    <!-- 监控列表 -->
    <ScreenList
      @monitorOper="monitorOper"
      :monitorList="state.monitorList"
      :activeScreen="state.activeScreen"
    ></ScreenList>
    <!-- 弹出框 -->
    <el-dialog class="aa" v-model="state.dialog.show" :width="state.dialog.width" destroy-on-close draggable>
      <MonitorDetail :monitorDetail="state.dialog.data"></MonitorDetail>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import ScreenList from '../components/monitor/ScreenList.vue';
import MonitorDetail from '../components/monitor/MonitorDetail.vue';
import api from '@api';
import { reactive } from 'vue';

const state = reactive<any>({
  activeScreen: 2,
  monitorList: [],
  dialog: {
    show: false,
    width: '65.98958333333333%',
    data: {}
  }
});
// 展示切换
function switchScreen(par: number) {
  state.activeScreen = par;
}

function monitorOper(par: any) {
  switch (par.type) {
    case '监控':
      state.dialog.show = true;
      state.dialog.data = par.data;
      break;
    case '急停':
      break;
    case '远程桌面':
      break;
    case '工控机':
      break;
    case '通讯':
      break;
  }
}

// 获取监控列表
function getMonitorList() {
  api.bench.getMonitorList().then((res: res) => {
    state.monitorList = res.data;
  });
}
getMonitorList();
</script>
<style lang="scss" scoped>
.monitor-wrapper {
  // 切换按钮
  .switch-screen-box {
    background-color: #1c2d42;
    height: 154px;
    display: flex;
    padding-left: 40px;
    padding-top: 60px;
    box-sizing: border-box;
    > p {
      display: flex;
      align-items: center;
      height: 28px;
      i.iconfont {
        color: #01bc8f;
        margin-right: 12px;
        font-size: 23px;
        display: inline-block;
      }
      > span {
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
      }
    }
    .switch-screen-btn {
      display: flex;
      position: absolute;
      left: 182px;
      li {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        width: 88px;
        height: 28px;
        background: #ffffff;
        border-radius: 14px;
        background-color: rgba(255, 255, 255, 0.24);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        cursor: pointer;
        span {
          height: 20px;
          line-height: 20px;
        }
      }
      li[active] {
        color: #01bc8f;
        background-color: rgb(1, 188, 143, 0.24);
      }
      .iconfont {
        font-size: 14px;
        margin-right: 3px;
      }
    }
  }
  // 监控列表
  .monitor-list-wrapper {
    width: 100%;
    height: calc(100% - 118px);
    position: absolute;
    top: 118px;
    left: 0;
    box-sizing: border-box;
    padding-left: 30px;
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

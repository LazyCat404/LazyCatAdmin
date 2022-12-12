<template>
  <div class="config-overview-wrapper">
    <el-scrollbar height="100%">
      <ul class="board-config-box">
        <li v-for="(item, i) in configList" :key="i">
          <div class="board-name">
            <LazyTitle :title="item.name"></LazyTitle>
            <span :style="[{ color: item.show ? '#01BC8F' : '#5E6389' }]"
              >（{{ item.show ? '展示中' : '未展示' }}）</span
            >
          </div>
          <ul class="banch-box">
            <li v-for="(ite, j) in item.list" :key="j">
              <BoardBenchItem :item="ite" @boardSet="boardSet"></BoardBenchItem>
            </li>
          </ul>
        </li>
      </ul>
    </el-scrollbar>
    <!-- 弹出框 -->
    <el-dialog class="aa" v-model="state.dialog.show" :width="state.dialog.width" destroy-on-close draggable>
      <MonitorDetail :monitorDetail="state.dialog.data"></MonitorDetail>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import BoardBenchItem from './BoardBenchItem.vue';
import MonitorDetail from '../../components/monitor/MonitorDetail.vue';
import api from '@api';

defineProps({
  configList: {
    type: Object,
    required: true
  }
});

const state = reactive<any>({
  dialog: {
    show: false,
    width: '65.98958333333333%',
    data: {}
  }
});
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
</script>
<style lang="scss" scoped>
.config-overview-wrapper {
  height: calc(100% - 154px);
  width: calc(100% - 525px);
  box-sizing: border-box;
  padding: 0 0 0 40px;
  .board-config-box {
    > li {
      margin-top: 40px;
      .board-name {
        display: flex;
        align-items: center;
        > span {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 20px;
          margin-left: 12px;
        }
      }
      .banch-box {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        li {
          width: 384px;
          margin-top: 20px;
          margin-right: calc((100% - 1152px) / 3);
          .board-bench-item-wrapper {
            background-color: #fff;
          }
        }
      }
      @media (max-width: 1910px) {
        .banch-box {
          li {
            width: calc((100% - 60px) / 2);
            min-width: 384px;
            margin-right: 30px;
          }
        }
      }
      @media (max-width: 1500px) {
        .banch-box {
          li {
            width: 100%;
            min-width: 384px;
            margin-right: 30px;
          }
        }
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

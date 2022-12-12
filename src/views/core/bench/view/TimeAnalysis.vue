<template>
  <div class="time-analysis-wrapper">
    <Search></Search>
    <div class="time-analysis-content">
      <Table></Table>
      <div class="analysis-right-box">
        <div class="run-time-census">
          <div class="time-census-btn">
            <LazyTitle title="运行时间统计"></LazyTitle>
            <div class="top-btn">
              <span>
                <i class="iconfont icon-xiazai"></i>
                <i>导出图表</i>
              </span>
              <div class="analysis-switch">
                <span :active="state.analysisType == 'byTime' ? '' : null" @click="state.analysisType = 'byTime'">
                  按时长
                </span>
                <span :active="state.analysisType == 'byBench' ? '' : null" @click="state.analysisType = 'byBench'">
                  按台架
                </span>
              </div>
            </div>
          </div>
          <!-- 分析echart图 -->
          <ByBench v-if="state.analysisType == 'byBench'"></ByBench>
          <ByTime v-else></ByTime>
        </div>
        <div class="time-ratio-box">
          <DownRun></DownRun>
          <DownCause></DownCause>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import DownCause from '../components/time-analysis/DownCause.vue';
import DownRun from '../components/time-analysis/DownRun.vue';
import Search from '../components/time-analysis/Search.vue';
import Table from '../components/time-analysis/Table.vue';
import ByBench from '../components/time-analysis/ByBench.vue';
import ByTime from '../components/time-analysis/ByTime.vue';

const state = reactive<any>({
  analysisType: 'byTime'
});
</script>
<style lang="scss" scoped>
.time-analysis-wrapper {
  display: flex;
  flex-direction: column;
  > .time-analysis-content {
    display: flex;
    flex: 1;
    padding: 20px 40px 25px 30px;
    .analysis-right-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      .run-time-census {
        width: 100%;
        height: 54.015%;
        background: #ffffff;
        border-radius: 10px;
        padding: 20px 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .time-census-btn {
          display: flex;
          .top-btn {
            display: flex;
            flex: 1;
            position: relative;
            align-items: center;
            margin-left: 24px;
            > span {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              display: flex;
              align-items: center;
              height: 17px;
              cursor: pointer;
              i {
                margin-right: 10px;
                display: inline-block;
                font-style: normal;
              }
            }
            .analysis-switch {
              display: flex;
              position: absolute;
              right: 0;
              span {
                width: 72px;
                height: 28px;
                background: #f1f5f9;
                border-radius: 6px;
                cursor: pointer;
                text-align: center;
                display: inline-block;
                line-height: 28px;
                font-size: 12px;
                color: #5d677d;
                font-family: PingFangSC-Semibold, PingFang SC;
                position: relative;
                top: -3px;
              }
              span[active] {
                background-color: rgba(1, 188, 143, 0.1);
                font-weight: 600;
                color: #01bc8f;
              }
              span + span {
                margin-left: 20px;
              }
            }
          }
        }
      }
      .time-ratio-box {
        flex: 1;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        > div {
          width: calc((100% - 20px) / 2);
          background: #ffffff;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>

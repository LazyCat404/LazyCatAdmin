<template>
  <div class="census-overview-wrapper">
    <div class="census-overview-btn">
      <BasicTitle title="统计看板"></BasicTitle>
      <div class="top-btn">
        <span>
          <i class="iconfont icon-xiazai"></i>
          <i>导出图表</i>
        </span>
      </div>
    </div>
    <div class="census-overview-infor">
      <div class="total-oil">
        <p>台架总油耗</p>
        <div>
          <span>{{ oilList.totalOil }}</span>
          <i class="unit">L</i>
        </div>
      </div>
      <div class="data-bench">
        <div>
          <p>搜索总数</p>
          <div>
            <span>{{ oilList.totalData }}</span>
            <i class="unit">条</i>
          </div>
        </div>
        <div>
          <p>涉及台架</p>
          <div>
            <span>{{ oilList.benchNum }}</span>
            <i class="unit">台</i>
          </div>
        </div>
      </div>
      <ul class="top-list">
        <li v-for="(item, i) in oilList.topList" :key="i">
          <span class="top-num">{{ i + 1 }}</span>
          <span class="top-date">{{ tab == '台架' ? item.date : item.order }}</span>
          <span class="top-oil">{{ item.oil }}<i class="unit">L</i></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  tab: string;
  oilList: any;
}>();
</script>
<style lang="scss" scoped>
.census-overview-wrapper {
  padding-top: 20px;
  padding-left: 30px;
  .census-overview-btn {
    display: flex;
    align-items: center;
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
    }
  }
  .census-overview-infor {
    height: 330px;
    width: 252px;
    padding-top: 24px;
    margin-top: 26px;
    padding-left: 12px;
    box-sizing: border-box;
    color: #333333;
    font-family: PingFangSC-Regular, PingFang SC;
    display: flex;
    flex-direction: column;
    padding-right: 60px;
    border-right: 1px solid rgba(236, 236, 239, 1);
    .unit {
      display: inline-block;
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      font-style: normal;
    }
    p {
      height: 17px;
      font-size: 12px;
      font-weight: 400;
      line-height: 17px;
    }
    .total-oil {
      padding-bottom: 20px;
      padding-left: 12px;
      margin-bottom: 20px;
      border-bottom: 1px dashed rgba(236, 236, 239, 1);
      p {
        margin-bottom: 10px;
      }
      span {
        display: inline-block;
        height: 30px;
        font-size: 22px;
        font-weight: 600;
        line-height: 30px;
        margin-right: 7px;
      }
    }
    .data-bench {
      padding: 0 22px 20px 12px;
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed rgba(236, 236, 239, 1);
      p {
        margin-bottom: 8px;
      }
      span {
        display: inline-block;
        height: 25px;
        font-size: 18px;
        font-weight: 600;
        line-height: 25px;
      }
      .unit {
        margin-left: 6px;
      }
    }
    .top-list {
      padding-left: 12px;
      > li {
        font-family: PingFangSC-Semibold, PingFang SC;
        color: #333333;
        display: flex;
        height: 25px;
        align-items: center;
        margin-top: 18px;
        span {
          display: inline-block;
        }
        .top-num {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          height: 20px;
          width: 20px;
          border-radius: 4px;
          text-align: center;
          margin-right: 12px;
        }
        .top-date {
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin-right: 17px;
        }
        .top-oil {
          height: 25px;
          font-size: 18px;
          font-weight: 600;
          line-height: 25px;
          display: flex;
          align-items: flex-end;
          .unit {
            margin-left: 4px;
            position: relative;
            top: -2px;
          }
        }
      }
      > li:nth-child(1) {
        .top-num {
          background: #ff9a80;
          color: #fff;
        }
      }
      > li:nth-child(2) {
        .top-num {
          background: rgba(1, 188, 143, 1);
          color: #fff;
        }
      }
      > li:nth-child(3) {
        .top-num {
          background: rgba(93, 103, 125, 1);
          color: #fff;
        }
      }
    }
  }
}
</style>

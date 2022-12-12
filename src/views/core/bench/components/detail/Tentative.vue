<template>
  <div class="tentative-wrapper">
    <LazyTitle title="进行中的试验"></LazyTitle>
    <div class="tentative-one">
      <div class="tentative-infor">
        <div>YCK11460-60_QN11452_20220922-05</div>
        <div>
          <span>结晶实验</span>
          <i>RP20220922</i>
        </div>
      </div>
      <div class="other-tentative">
        <span>李超 2022-11-02 22:55</span>
        <span class="real-time-data">
          <span>可靠实时数据</span>
          <i class="iconfont icon-qianjin"></i>
          <img src="@/assets/images/bench/可靠实时数据1.png" />
        </span>
      </div>
    </div>
    <div class="tentative-two">
      <ul>
        <li>
          <div>39%</div>
          <span>实验进度</span>
        </li>
        <li>
          <div>22.6h</div>
          <span>累计耗时</span>
        </li>
      </ul>
      <el-progress :show-text="false" color="#01BC8F" :stroke-width="8" :percentage="70" />
      <div class="tentative-time">
        <span>开始：11-02 22:56</span>
        <span>结束：11-04 20:48</span>
      </div>
    </div>
    <div class="tentative-three">
      <div>
        <el-scrollbar>
          <ul>
            <li>
              <span class="tentative-label">项目编号</span>
              <span class="tentative-value">A201801G</span>
            </li>
            <li>
              <span class="tentative-label">订单号</span>
              <span class="tentative-value">A201801G</span>
            </li>
            <li>
              <span class="tentative-label">板块</span>
              <span class="tentative-value">A201801G</span>
            </li>
            <li>
              <span class="tentative-label">发动机编号</span>
              <span class="tentative-value">A201801G</span>
            </li>
            <li>
              <span class="tentative-label">发动机型号</span>
              <span class="tentative-value">A201801G</span>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  detail: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.tentative-wrapper {
  margin: 40px 30px 0 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .tentative-one {
    width: 340px;
    margin: 0 auto;
    margin-top: 20px;
    background: #f1f5fb;
    padding-top: 18px;
    border-radius: 10px;
    overflow: hidden;
    .tentative-infor {
      height: 64px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 32px;
      margin-left: 18px;
      margin-bottom: 8px;
      margin-right: 22px;
      > div:last-child {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        i {
          font-style: normal;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 17px;
        }
      }
    }
    .other-tentative {
      height: 28px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 28px;
      padding-left: 18px;
      display: flex;
      justify-content: space-between;
      background: linear-gradient(270deg, rgba(215, 222, 234, 0) 0%, #dde5f0 100%);
      > .real-time-data {
        color: #01bc8f;
        position: relative;
        display: flex;
        cursor: pointer;
        img {
          position: absolute;
          right: 0;
          bottom: 0;
        }
        > span {
          display: inline-block;
          z-index: 9;
        }
        .iconfont {
          z-index: 9;
          font-size: 12px;
          margin-left: 4px;
          margin-right: 10px;
        }
      }
    }
  }
  .tentative-two {
    margin-bottom: 30px;
    ul {
      display: flex;
      padding-top: 24px;
      padding-bottom: 20px;
      li {
        flex: 1;
        text-align: center;
        > div {
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 22px;
          margin-bottom: 4px;
        }
        span {
          width: 100%;
          display: inline-block;
          box-sizing: border-box;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 17px;
          position: relative;
          display: -webkit-flex;
          display: flex; /*定位（写在父元素中）*/
          justify-content: center; /*水平居中*/
          align-items: center;
        }
      }
      li:first-child {
        > div {
          color: #01bc8f;
        }
        span {
          &::after {
            width: 1px;
            height: 12px;
            content: ' ';
            position: absolute;
            background-color: #ececef;
            right: 0;
          }
        }
      }
    }
    ::v-deep .el-progress {
      margin-bottom: 12px;
      .el-progress-bar__outer {
        background: #f1f5fb;
      }
    }
    .tentative-time {
      display: flex;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      justify-content: space-between;
      align-items: center; /*垂直居中 */
    }
  }
  .tentative-three {
    flex: 1;
    > div {
      height: 100%;
      width: 100%;
      position: relative;
      .el-scrollbar {
        position: absolute;
        width: 100%;
        ul {
          padding-bottom: 20px;
          border-top: 1px dashed #ececef;
          li {
            height: 45px;
            display: -webkit-flex;
            display: flex; /*定位（写在父元素中）*/
            align-items: center; /*垂直居中 */
            justify-content: space-between;
            border-bottom: 1px dashed #ececef;
            .tentative-label {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
            }
            .tentative-value {
              font-size: 14px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #333333;
            }
          }
        }
      }
    }
  }
}
</style>

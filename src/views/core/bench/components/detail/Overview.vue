<template>
  <div class="overview-wrapper">
    <img src="@/assets/images/bench/overview-bg0.png" v-if="detail.run == '停机'" />
    <img src="@/assets/images/bench/overview-bg1.png" v-if="detail.run == '运行'" />
    <img src="@/assets/images/bench/overview-bg2.png" v-if="detail.run == '故障'" />
    <div class="overview-one">
      <img src="@/assets/images/bench/overview-pic0.png" v-if="detail.run == '停机'" />
      <img src="@/assets/images/bench/overview-pic1.png" v-if="detail.run == '运行'" />
      <img src="@/assets/images/bench/overview-pic2.png" v-if="detail.run == '故障'" />
      <div>
        <div>
          <span class="bench-name">{{ detail.name }}</span>
          <span class="bench-status" :status="detail.run">
            {{ detail.run }}
            <el-popover :width="190" v-if="detail.run == '故障'">
              <template #reference>
                <i class="iconfont icon-tishi"></i>
              </template>
              <div class="communication-popover tip-popover">
                <p class="tip-title">台架报警</p>
                <div>
                  <div class="label">报警时间</div>
                  <div class="content">2022-09-13 09:58:48</div>
                </div>
                <div>
                  <div class="label">报警事件</div>
                  <div class="content">超转速范围报警其他原因2</div>
                </div>
              </div>
            </el-popover>
          </span>
          <span class="bench-communication">
            {{ detail.communication }}
            <el-popover :width="190" v-if="detail.communication == '断开'">
              <template #reference>
                <i class="iconfont icon-tishi"></i>
              </template>
              <div class="communication-popover tip-popover">
                <p class="tip-title">通讯数据</p>
                <div>
                  <div class="label">上次上传时间</div>
                  <div class="content">2022-09-13 09:58:48</div>
                </div>
                <div>
                  <div class="label">与当前时间差</div>
                  <div class="content">244.8 h</div>
                </div>
              </div>
            </el-popover>
          </span>
        </div>
        <p class="bench-person">负责人：王永波</p>
      </div>
    </div>
    <div class="bench-ip">
      <span>台架上传IP :</span>
      <span>192.168.01.01</span>
    </div>
    <ul class="overview-two">
      <li>
        <div>{{ detail.runTime }}</div>
        <span>累计运行</span>
      </li>
      <li>
        <div>{{ detail.overTime }}</div>
        <span>累计超时</span>
      </li>
      <li>
        <div>{{ detail.maintain }}</div>
        <span>维护状态</span>
      </li>
    </ul>
    <div class="overview-three">
      <el-button type="danger" plain :status="detail.run">
        <i class="iconfont icon-jiting"></i>
        急停
      </el-button>
      <el-button bg text>···</el-button>
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
.overview-wrapper {
  width: 340px;
  height: 332px;
  background: #ffffff;
  box-shadow: 2px 4px 12px 0px #f1f5fb;
  border-radius: 16px;
  margin: 0 auto;
  margin-top: 92px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  > img {
    width: 100%;
    height: 96px;
  }
  .overview-one {
    display: flex;
    height: 79px;
    > img {
      width: 120px;
      height: 108px;
      margin-left: 19px;
      margin-right: 9px;
      position: relative;
      top: -54px;
    }
    > div {
      flex: 1;
      box-sizing: border-box;
      padding-top: 12px;
      > div {
        display: -webkit-flex;
        display: flex; /*定位（写在父元素中）*/
        align-items: center;
        .bench-name {
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 28px;
          margin-right: 12px;
        }
        .bench-status {
          padding: 4px 7px;
          border-radius: 5px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          margin-right: 6px;
        }
        .bench-status[status='运行'] {
          color: #01bc8f;
          background: rgb(1, 188, 143, 0.12);
        }
        .bench-status[status='故障'] {
          color: #ff6a64;
          background-color: rgba(255, 106, 100, 0.12);
        }
        .bench-status[status='停机'] {
          color: #5f658a;
          background-color: rgba(95, 101, 138, 0.12);
        }
        .bench-communication {
          padding: 4px 7px;
          border-radius: 5px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          margin-right: 6px;
          color: #333333;
          background: #f1f5fb;
        }
        span {
          display: -webkit-flex;
          display: flex; /*定位（写在父元素中）*/
          justify-content: center; /*水平居中*/
          align-items: center;
          height: 24px;
          box-sizing: border-box;
          .iconfont {
            font-size: 12px;
            margin-left: 4px;
            cursor: pointer;
          }
        }
      }
      .bench-person {
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 17px;
        margin-top: 8px;
      }
    }
  }
  .bench-ip {
    width: 280px;
    background: #f1f5fb;
    border-radius: 4px;
    margin: 0 auto;
    font-size: 12px;
    display: -webkit-flex;
    display: flex; /*定位（写在父元素中）*/
    justify-content: center; /*水平居中*/
    align-items: center;
    > span {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      color: #666666;
    }
    > span:first-child {
      margin-right: 12px;
    }
  }
  ul.overview-two {
    width: 100%;
    padding: 12px 40px 14px;
    box-sizing: border-box;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      > div {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
        margin-bottom: 4px;
      }
      > span {
        display: inline-block;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 17px;
        width: 100%;
        position: relative;
        display: -webkit-flex;
        display: flex; /*定位（写在父元素中）*/
        justify-content: center; /*水平居中*/
        align-items: center;
      }
    }
    > li:nth-child(2) {
      > span:nth-child(2) {
        &::after {
          width: 1px;
          height: 12px;
          content: ' ';
          position: absolute;
          background-color: #ececef;
          right: 0;
        }
        &::before {
          width: 1px;
          height: 12px;
          content: ' ';
          position: absolute;
          background-color: #ececef;
          left: 0;
        }
      }
    }
  }
  .overview-three {
    height: 36px;
    margin: 0 30px;
    display: flex;
    justify-content: space-between;
    > .el-button:first-child {
      width: 232px;
      height: 100%;
      color: rgba(255, 106, 100, 1);
      border: 0;
      .iconfont {
        margin-right: 12px;
      }
    }
    > .el-button:first-child:hover {
      color: #fff;
    }
    > .el-button[status='停机']:hover {
      color: #333333;
    }
    > .el-button[status='停机'] {
      background: #f1f5fb;
      color: #333333;
      cursor: no-drop;
    }
    > .el-button:last-child {
      height: 100%;
      width: 36px;
      margin-left: 0;
      background: #f1f5fb;
      border-radius: 8px;
      ::v-deep > span {
        color: #5d677d;
      }
    }
  }
}
// 提示框
.tip-popover {
  padding: 8px;
  .tip-title {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
    padding-top: 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
  }
  .label {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 17px;
    padding-top: 12px;
    padding-bottom: 6px;
  }
  .content {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 20px;
  }
}
</style>

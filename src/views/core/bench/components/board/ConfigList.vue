<template>
  <div class="config-list-wrapper">
    <div class="top-title-btn">
      <span>看板概览</span>
      <span><i>+</i>添加看板</span>
    </div>
    <el-scrollbar height="calc(100% - 36px)">
      <ul class="config-list-box">
        <li v-for="(item, i) in configList" :key="i">
          <div class="iconfont-box">
            <i class="iconfont icon-yidong"></i>
          </div>
          <div class="board-content">
            <div>
              <span>{{ item.name }}</span>
              <i
                :class="{
                  iconfont: true,
                  'icon-kejian': item.show,
                  'icon-bukejian': !item.show
                }"
                @click="switchShow(item, i)"
              ></i>
            </div>
            <ul class="board-infor">
              <li class="board-total">
                <span class="label">台架：</span>
                <span class="value">{{ item.list ? item.list.length : 0 }}</span>
              </li>
              <li class="run-infor status-infor">
                <span class="label">运行：</span>
                <span class="value">{{ item.runNum }}</span>
              </li>
              <li class="fault-infor status-infor">
                <span class="label">故障：</span>
                <span class="value">{{ item.faultNum }}</span>
              </li>
              <li class="down-infor status-infor">
                <span class="label">停机：</span>
                <span class="value">{{ item.downNum }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  configList: {
    type: Object,
    required: true
  }
});
const $emits = defineEmits(['switchShow']);
function switchShow(item: any, i: string) {
  $emits('switchShow', item, i);
}
</script>
<style lang="scss" scoped>
.config-list-wrapper {
  width: 465px;
  background: #ffffff;
  border-radius: 20px;
  height: calc(100% - 120px);
  right: 30px;
  top: 90px;
  position: absolute;
  padding: 40px;
  box-sizing: border-box;
  .top-title-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    > span:first-child {
      display: inline-block;
      height: 36px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 36px;
    }
    > span:last-child {
      cursor: pointer;
      width: 104px;
      height: 36px;
      background: linear-gradient(180deg, #02dfc2 0%, #01bc8f 100%);
      border-radius: 18px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      i {
        width: 18px;
        height: 18px;
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.24);
        border-radius: 50% 50%;
        font-style: normal;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 6px;
      }
    }
  }
  // 看板列表
  .config-list-box {
    > li {
      display: flex;
      padding: 16px 22px 10px 0;
      background: #f7f6f9;
      border-radius: 6px;
      margin-top: 12px;
      > .iconfont-box {
        width: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .board-content {
        flex: 1;
        > div {
          margin-bottom: 7px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          i.iconfont {
            cursor: pointer;
          }
          span {
            display: inline-block;
            height: 22px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 22px;
          }
        }
        .board-infor {
          display: flex;
          > li {
            height: 17px;
            display: flex;
            align-items: center;
          }
          span {
            height: 17px;
            font-size: 12px;
            line-height: 17px;
            display: inline-block;
          }
          .label {
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
          }
          .value {
            font-weight: 600;
          }
          .board-total {
            .value {
              color: #333333;
              &::after {
                width: 1px;
                height: 12px;
                content: ' ';
                display: inline-block;
                background: #e0e0e0;
                margin: 0 20px;
                position: relative;
                top: 1.5px;
              }
            }
          }
          .status-infor {
            .label {
              &::before {
                width: 10px;
                height: 10px;
                border-radius: 2px;
                content: ' ';
                margin-right: 4px;
                display: inline-block;
              }
            }
            .value {
              width: 28px;
            }
          }
          .run-infor {
            .value {
              color: #01bc8f;
            }
            .label {
              &::before {
                background-color: #01bc8f;
              }
            }
          }
          .fault-infor {
            .value {
              color: #ff6a64;
            }
            .label {
              &::before {
                background-color: #ff6a64;
              }
            }
          }
          .down-infor {
            .value {
              color: #5e6389;
            }
            .label {
              &::before {
                background-color: #5e6389;
              }
            }
          }
        }
      }
    }
  }
}
</style>

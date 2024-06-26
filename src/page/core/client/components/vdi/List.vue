<template>
  <div class="vdi-list-wrapper">
    <el-scrollbar height="100%" :empty="obj.dataList.length ? null : ''">
      <ul class="list-box" v-if="obj.dataList.length">
        <li
          class="list-item"
          v-for="(item, i) in obj.dataList"
          :key="i"
          :style="[{ width: boardWidth(item.list.length) }]"
          :active="obj.currentItem == i ? '' : null"
          @click="currentItemDetail(item, i)"
        >
          <p v-hide>{{ item.name }}</p>
          <ul class="item-box">
            <li
              class="item"
              v-for="(ite, j) in item.list"
              :key="j"
              :status="ite.onlineFlag == 0 ? '停机' : ite.onlineFlag == 1 ? '运行' : '故障'"
            >
              <span class="item-name"></span>
              <!-- 进度、占比 -->
              <div class="item-ratio">
                <span
                  :style="[{ width: `${ite.progress === undefined ? 100 : ite.progress > 100 ? 100 : ite.progress}%` }]"
                ></span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import api from '@api';
import { reactive } from 'vue';
const obj = reactive<any>({
  dataList: [],
  currentItem: 0
});

const $emits = defineEmits(['currentItemDetail']);

// 总宽度
function boardWidth(num: number) {
  let presetsMarginLeft = 10; // 预设外边距宽度
  let itemWidth = 96; // 每一项宽度
  let itemSun = 0; // 每一项的和（需要计算）
  // 特殊处理
  if (num < 3) {
    itemSun = itemWidth + presetsMarginLeft;
  } else if (num == 3 || num == 6 || num == 5 || num == 9) {
    itemSun = itemWidth * 3 + 3 * presetsMarginLeft;
  } else if (num == 4) {
    itemSun = itemWidth * 2 + 2 * presetsMarginLeft;
  } else if (num == 7 || num == 8) {
    itemSun = itemWidth * 4 + 4 * presetsMarginLeft;
  } else {
    // 算法处理
    itemSun = maxExcept(num) * itemWidth + maxExcept(num) * presetsMarginLeft;
  }
  return `${itemSun}px`;
}
// 计算一个数在4-8内最大整除数
function maxExcept(num: number) {
  let resNum = 0;
  if (num % 8 == 0 || 8 - (num % 8) < 3) {
    resNum = 8;
  } else if (num % 7 == 0 || 7 - (num % 7) < 3) {
    resNum = 7;
  } else if (num % 6 == 0 || 6 - (num % 6) < 3) {
    resNum = 6;
  } else if (num % 5 == 0 || 5 - (num % 5) < 3) {
    resNum = 5;
  } else if (num % 4 == 0 || 4 - (num % 4) < 3) {
    resNum = 4;
  } else {
    resNum = 8;
    // 其它情况暂不做处理
    // let retain = [8 - (num % 8), 7 - (num % 7), 6 - (num % 6), 5 - (num % 5), 4 - (num % 4)];
    // console.log(retain);
  }
  return resNum;
}
// 当前项详情
function currentItemDetail(item: any, i: number) {
  obj.currentItem = i;
  $emits('currentItemDetail', item);
}

(function getDataList() {
  api.client.getVDIList().then((res: res) => {
    obj.dataList = res.data;
    $emits('currentItemDetail', res.data && res.data.length ? res.data[0] : undefined);
  });
})();
</script>
<style lang="scss" scoped>
.vdi-list-wrapper {
  width: 100%;
  height: calc(100% - 154px);
  .list-box {
    width: calc(100% + 500px);
    height: 100%;
    padding: 52px 36px;
    padding-bottom: 0;
    padding-right: 650px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    > li.list-item {
      background: #e6ecf1;
      border-radius: 12px;
      height: fit-content;
      padding: 27px;
      padding-right: 17px;
      padding-top: 14px;
      padding-bottom: 0;
      margin-right: 54px;
      margin-bottom: 80px;
      border: 1px solid #e6ecf1;
      > p {
        text-align: center;
        padding-bottom: 18px;
        height: 22px;
        font-size: 16px;
        font-family:
          PingFangSC-Semibold,
          PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
      }
      .item-box {
        display: flex;
        flex-wrap: wrap;
        > li {
          width: 96px;
          height: 80px;
          border-radius: 10px;
          box-sizing: border-box;
          margin-bottom: 26px;
          margin-right: 10px;
          display: flex;
          justify-content: flex-start;
          cursor: pointer;
          position: relative;
          .item-name {
            position: absolute;
            width: 48px;
            height: 48px;
            background: #ffffff;
            box-shadow: 0px 6px 10px 0px rgba(137, 156, 174, 0.44);
            border-radius: 10px;
            top: -12px;
            left: 24px;
            font-size: 16px;
            font-family: 600;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .item-ratio {
            height: 100%;
            width: 100%;
            overflow: hidden;
            border-radius: 10px;
            box-sizing: border-box;
            > span {
              display: inline-block;
              height: 100%;
            }
          }
        }
        > li.item[status='运行'] {
          background: #bae5d4;
          .item-ratio > span {
            background: #01bc8f;
          }
        }
        li.item[status='运行']:hover {
          .item-name {
            background: #01bc8f;
            color: #fff;
            box-shadow: 0px 6px 10px 0px rgba(91, 101, 112, 0.38);
          }
          .item-ratio {
            border: 2px solid #01bc8f;
          }
        }
        > li.item[status='故障'] {
          background: #ffcac6;
          .item-ratio > span {
            background: #ff6a64;
          }
        }
        > li.item[status='故障']:hover {
          .item-name {
            background: #ff6a64;
            color: #fff;
            box-shadow: 0px 6px 10px 0px rgba(91, 101, 112, 0.38);
          }
          .item-ratio {
            border: 2px solid #ff6a64;
          }
        }
        > li.item[status='停机'] {
          background: #c2cedc;
        }
      }
    }
    > li.list-item[active] {
      border: 1px solid #01bc8f;
    }
  }
  .el-scrollbar[empty] {
    ::v-deep .el-scrollbar__wrap {
      .el-scrollbar__view {
        display: flex;
        align-items: center;
      }
    }
  }
  ::v-deep .el-scrollbar__wrap {
    .el-scrollbar__view {
      min-height: 100%;
    }
  }
}
</style>

<template>
  <div class="time-analysis-wrapper">
    <BasicTitle title="筛选条件设置"></BasicTitle>
    <div class="search-content">
      <!-- 固定筛选 -->
      <div class="fixed-list-box">
        <p>独立筛选条件</p>
        <div class="form-btn">
          <el-form :model="state.formData">
            <el-form-item v-for="item in state.searchList" :key="item.label">
              <el-select
                v-if="item.type == 'select'"
                v-model="state.formData[item.prop]"
                :placeholder="item.label"
                clearable
              >
                <el-option v-for="ite in item.selectList" :key="ite.label" :label="ite.label" :value="ite.value" />
              </el-select>
              <el-input
                v-else-if="item.type == 'input'"
                v-model="state.formData[item.prop]"
                :placeholder="item.label"
                clearable
              />
              <el-date-picker
                v-else
                v-model="state.formData[item.prop]"
                type="daterange"
                value-format="YYYY-MM-DD"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-form>
          <!-- 按钮 -->
          <el-form class="search-btn-box" :model="state.customForm">
            <el-form-item class="item-btn-box">
              <el-button color="#F1F5FB" @click="resetForm">重置</el-button>
            </el-form-item>
            <el-form-item class="item-btn-box">
              <el-button class="success-btn" @click="confirm">查询</el-button>
            </el-form-item>
            <el-form-item>
              <i class="iconfont icon-shangchuan"></i>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 自定义筛选 -->
      <el-collapse-transition>
        <div class="custom-list-box" v-show="state.isOpen">
          <p>自定义筛选</p>
          <el-form :model="state.customForm">
            <el-form-item>
              <el-select v-model="state.customForm.search1.label" placeholder="筛选条件1" clearable>
                <el-option
                  v-for="item in state.customList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.check"
                />
              </el-select>
              <span class="link-up"></span>
              <el-input v-model="state.customForm.search1.value" placeholder="条件1关键词" clearable />
            </el-form-item>
            <el-form-item>
              <el-select v-model="state.customForm.search2.label" placeholder="筛选条件2" clearable>
                <el-option
                  v-for="item in state.customList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.check"
                />
              </el-select>
              <span class="link-up"></span>
              <el-input v-model="state.customForm.search2.value" placeholder="条件2关键词" clearable />
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="open-btn">
      <span @click="state.isOpen = !state.isOpen"
        ><img
          src="@/assets/images/bench/下拉.png"
          :style="[{ transform: `rotate(${state.isOpen ? '180deg' : '0deg'}) ` }]"
      /></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  tab: String
});
const state = reactive<any>({
  isOpen: false,
  formData: {},
  customForm: {
    search1: {
      label: '',
      value: ''
    },
    search2: {
      label: '',
      value: ''
    }
  },
  searchList: [],
  customList: [
    {
      label: '油耗',
      value: 'name',
      check: false
    },
    {
      label: '编号',
      value: 'order',
      check: false
    }
  ]
});
// 查询按钮
function confirm() {
  let queryPar = <any>{
    custom: <any>[]
  };
  // 处理自定义筛选条件
  if (state.customForm.search1.label) {
    queryPar.custom.push({
      label: state.customForm.search1.label,
      value: state.customForm.search1.value
    });
  }
  if (state.customForm.search2.label) {
    queryPar.custom.push({
      label: state.customForm.search2.label,
      value: state.customForm.search2.value
    });
  }
  // 处理固定筛选条件
  for (let key in state.formData) {
    if (state.formData[key]) {
      queryPar[key] = state.formData[key];
    }
  }
  console.log('筛选条件：', queryPar);
}
// 自定义条件选择
function selectCustom(num: number, newVal: string, oldVal: string) {
  if (newVal) {
    state.customList.forEach((item: any) => {
      if (item.value == newVal) {
        item.check = true;
      }
    });
  } else {
    state.customList.forEach((item: any) => {
      if (item.value == oldVal) {
        item.check = false;
      }
    });
  }
  state.customForm['search' + num].value = '';
}
// 重置
function resetForm() {
  for (let key in state.formData) {
    state.formData[key] = null;
  }
  state.customForm = {
    search1: {
      label: '',
      value: ''
    },
    search2: {
      label: '',
      value: ''
    }
  };
}
function init() {
  if (props.tab == '台架') {
    state.searchList = [
      {
        label: '台架',
        prop: 'time',
        type: 'date'
      },
      {
        label: '燃料类型',
        prop: 'run',
        type: 'select',
        selectList: [
          {
            label: '燃料类型1',
            value: 'run1'
          },
          {
            label: '燃料类型2',
            value: 'run2'
          },
          {
            label: '燃料类型3',
            value: 'run3'
          }
        ]
      },
      {
        label: '统计颗粒度',
        prop: 'communication',
        type: 'select',
        selectList: [
          {
            label: '按日统计',
            value: 'communication1'
          },
          {
            label: '按周统计',
            value: 'communication22'
          },
          {
            label: '按月统计',
            value: 'communication12'
          },
          {
            label: '按季统计',
            value: 'communication21'
          },
          {
            label: '按年统计',
            value: 'communication23'
          }
        ]
      },
      {
        label: '台架',
        prop: 'name',
        type: 'select',
        selectList: [
          {
            label: 'T01',
            value: 'communication1'
          },
          {
            label: 'T02',
            value: 'communication2'
          },
          {
            label: 'T04',
            value: 'communication12'
          },
          {
            label: 'T05',
            value: 'communication25'
          }
        ]
      },
      {
        label: '油耗突变分组',
        prop: 'class',
        type: 'select',
        selectList: [
          {
            label: '开启',
            value: 'communication1'
          },
          {
            label: '关闭',
            value: 'communication2'
          }
        ]
      },
      {
        label: '突变绝对直',
        prop: 'rvalue',
        type: 'input'
      }
    ];
    state.formData = {
      name: 'communication1',
      class: 'communication1'
    };
  } else {
    state.searchList = [
      {
        label: '台架',
        prop: 'time',
        type: 'date'
      },
      {
        label: '燃料类型',
        prop: 'run',
        type: 'select',
        selectList: [
          {
            label: '燃料类型1',
            value: 'run1'
          },
          {
            label: '燃料类型2',
            value: 'run2'
          },
          {
            label: '燃料类型3',
            value: 'run3'
          }
        ]
      },
      {
        label: '统计颗维度',
        prop: 'communication',
        type: 'select',
        selectList: [
          {
            label: '按项目编号统计',
            value: 'communication1'
          },
          {
            label: '按订单号统计',
            value: 'communication22'
          },
          {
            label: '按发动机型号统计',
            value: 'communication12'
          },
          {
            label: '按发动机编号统计',
            value: 'communication21'
          },
          {
            label: '按按实验名称统计',
            value: 'communication23'
          }
        ]
      },
      {
        label: '油耗突变分组',
        prop: 'class',
        type: 'select',
        selectList: [
          {
            label: '开启',
            value: 'communication1'
          },
          {
            label: '关闭',
            value: 'communication2'
          }
        ]
      },
      {
        label: '突变绝对直',
        prop: 'rvalue',
        type: 'input'
      }
    ];
    state.formData = {
      class: 'communication1',
      communication: 'communication1'
    };
  }
}
init();
watch(
  () => [state.customForm.search1.label, state.customForm.search2.label],
  (newVal, oldVal) => {
    // 筛选条件1改变
    if (newVal[0] != oldVal[0]) {
      selectCustom(1, newVal[0], oldVal[0]);
    }
    // 筛选条件2改变
    if (newVal[1] != oldVal[1]) {
      selectCustom(2, newVal[1], oldVal[1]);
    }
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.time-analysis-wrapper {
  min-height: 110px;
  background: #ffffff;
  border-radius: 10px;
  margin-left: 30px;
  margin-right: 40px;
  margin-top: 20px;
  padding: 20px 0;
  padding-left: 30px;
  padding-right: 24px;
  box-sizing: border-box;
  position: relative;
  .search-content {
    display: flex;
    flex-direction: column;
    p {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #5d677d;
      line-height: 17px;
      padding-left: 12px;
      margin-top: 10px;
      margin-bottom: 6px;
    }
    .el-form {
      display: flex;
      > .el-form-item {
        margin-bottom: 0;
        ::v-deep .el-form-item__content {
          .el-date-editor {
            max-width: 234px;
          }
          .el-select,
          .el-input {
            max-width: 184px;
          }
        }
      }
      > .el-form-item + .el-form-item {
        margin-left: 20px;
      }
    }
    // 固定筛选
    .fixed-list-box {
      display: flex;
      flex-direction: column;
      .form-btn {
        display: flex;
        justify-content: space-between;
        // 按钮
        .search-btn-box {
          justify-content: flex-end;
          .item-btn-box {
            width: 100%;
            max-width: 72px;
            .el-button {
              width: 100%;
            }
          }
          .iconfont {
            width: 32px;
            height: 32px;
            background: #f1f5fb;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    // 自定义筛选
    .custom-list-box {
      .el-form-item {
        ::v-deep .el-form-item__content {
          display: flex;
          flex-wrap: nowrap;
          .link-up {
            display: inline-block;
            width: 12px;
            text-align: center;
          }
        }
      }
    }
  }
  .open-btn {
    position: absolute;
    height: 12px;
    border-radius: 1px;
    width: 100%;
    bottom: -12px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 94px;
      height: 12px;
      background-image: url('@/assets/images/bench/下拉凹槽.png');
      background-size: 100% 100%;
      margin: 0 auto;
      cursor: pointer;
      img {
        position: relative;
        top: -4px;
      }
    }
  }
}
</style>

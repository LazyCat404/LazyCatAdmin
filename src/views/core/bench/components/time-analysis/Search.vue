<template>
  <div class="time-search-wrapper">
    <LazyTitle title="筛选条件设置"></LazyTitle>
    <div class="search-content">
      <!-- 固定筛选 -->
      <div class="fixed-list-box">
        <p>固定筛选</p>
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
      </div>
      <div class="cut-apart-box">
        <i class="iconfont icon-fengexian"></i>
      </div>
      <!-- 自定义筛选 -->
      <div class="custom-list-box">
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
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';

const state = reactive<any>({
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
  searchList: [
    {
      label: '日期',
      prop: 'time',
      type: 'date'
    },
    {
      label: '统计周期',
      prop: 'run',
      type: 'select',
      selectList: [
        {
          label: '台架运行时间统计',
          value: 'run1'
        },
        {
          label: '台架自动试验统计',
          value: 'run2'
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
    }
  ],
  customList: [
    {
      label: '台架',
      value: 'name',
      check: false
    },
    {
      label: '转速',
      value: 'order',
      check: false
    },
    {
      label: '累计油耗',
      value: 'order1',
      check: false
    },
    {
      label: '统计时间',
      value: 'order2',
      check: false
    },
    {
      label: '实验类型',
      value: 'order3',
      check: false
    },
    {
      label: '累计气耗',
      value: 'order4',
      check: false
    },
    {
      label: '发电量',
      value: 'order5',
      check: false
    },
    {
      label: '耗电量',
      value: 'order6',
      check: false
    },
    {
      label: '实验名称',
      value: 'order7',
      check: false
    },
    {
      label: '发动机型号',
      value: 'order8',
      check: false
    },
    {
      label: '项目编号',
      value: 'order9',
      check: false
    },
    {
      label: '订单号',
      value: 'order10',
      check: false
    },
    {
      label: '板块',
      value: 'order11',
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
.time-search-wrapper {
  min-height: 110px;
  background: #ffffff;
  border-radius: 10px;
  margin-left: 30px;
  margin-right: 40px;
  margin-top: 80px;
  padding: 20px 0;
  padding-left: 30px;
  padding-right: 24px;
  box-sizing: border-box;
  .search-content {
    display: flex;
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
      justify-content: space-between;
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
        margin-left: 12px;
      }
    }
    // 分割
    .cut-apart-box {
      display: flex;
      align-items: flex-end;
      padding-bottom: 8px;
      justify-content: center;
      width: 2.434%;
    }
    // 固定筛选
    .fixed-list-box {
      width: 38.5788%;
      padding-left: 12px;
    }
    // 自定义筛选
    .custom-list-box {
      flex: 1;
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
    // 按钮
    .search-btn-box {
      width: 11.588%;
      padding-top: 33px;
      margin-left: 1.17%;
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
</style>

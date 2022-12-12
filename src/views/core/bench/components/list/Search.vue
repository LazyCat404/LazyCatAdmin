<template>
  <div class="bench-search-wrapper">
    <BasicTitle title="筛选条件设置"></BasicTitle>
    <el-form :model="state.formData">
      <el-form-item v-for="item in state.searchList" :key="item.label">
        <el-select v-if="item.type == 'select'" v-model="state.formData[item.prop]" :placeholder="item.label" clearable>
          <el-option v-for="ite in item.selectList" :key="ite.label" :label="ite.label" :value="ite.value" />
        </el-select>
        <el-input
          v-else-if="item.type == 'input'"
          v-model="state.formData[item.prop]"
          :placeholder="item.label"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button color="#F1F5FB" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';

const state = reactive<any>({
  formData: {},
  searchList: [
    {
      label: '台架',
      prop: 'name',
      type: 'input'
    },
    {
      label: '运行',
      prop: 'run',
      type: 'select',
      selectList: [
        {
          label: '运行',
          value: 'run1'
        },
        {
          label: '故障',
          value: 'run2'
        },
        {
          label: '停机',
          value: 'run3'
        }
      ]
    },
    {
      label: '通讯',
      prop: 'communication',
      type: 'select',
      selectList: [
        {
          label: '断开',
          value: 'communication1'
        },
        {
          label: '正常',
          value: 'communication2'
        }
      ]
    },
    {
      label: '维护',
      prop: 'maintain',
      type: 'select',
      selectList: [
        {
          label: '待维护',
          value: 'maintain1'
        },
        {
          label: '已维护',
          value: 'maintain1'
        }
      ]
    },
    {
      label: '项目编号',
      prop: 'projectNum',
      type: 'input'
    },
    {
      label: '订单编号',
      prop: 'orderNum',
      type: 'input'
    },
    {
      label: '板块',
      prop: 'plate',
      type: 'input'
    },
    {
      label: '发动机编号',
      prop: 'engineNum',
      type: 'input'
    },
    {
      label: '发动机型号',
      prop: 'engineModel',
      type: 'input'
    }
  ]
});
function resetForm() {
  for (let key in state.formData) {
    state.formData[key] = null;
  }
}
watch(
  () => state.formData,
  () => {
    console.log('搜索结果', state.formData);
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.bench-search-wrapper {
  min-height: 110px;
  background: #ffffff;
  border-radius: 10px;
  margin: 0 30px;
  margin-top: 80px;
  padding: 20px 0;
  padding-left: 30px;
  padding-right: 24px;
  box-sizing: border-box;
  .el-form {
    display: flex;
    flex-wrap: wrap; /*自动换行*/
    > .el-form-item {
      margin-right: 12px;
      min-width: 150px;
      max-width: 168px;
      margin-bottom: 0;
      margin-top: 12px;
    }
    > .el-form-item:last-child {
      margin-right: 0px;
      min-width: auto;
    }
  }
}
</style>

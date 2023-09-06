<template>
  <div class="test-other-wrapper">
    <el-form ref="formRef" label-width="100px">
      <el-form-item label="age">
        <LazySplitSelect
          v-model="obj.value"
          :data="obj.data"
          :clearable="true"
          :treeProps="obj.defaultProps"
          @change="valueChange"
        ></LazySplitSelect>
      </el-form-item>
    </el-form>
    <span>当前选中：{{ obj.value }}</span>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const obj = reactive<any>({
  data: [],
  // value: 3.111
  value: 1.1
});

function valueChange(val: unknown, radioItem: unknown): void {
  console.log('值发生改变', val, radioItem);
}
// 初始化
(function init() {
  obj.data = [
    {
      label: '一年级',
      value: 1,
      list: [
        {
          value: 1.1,
          label: '一年一班'
        },
        {
          value: 1.2,
          label: '一年二班'
        }
      ]
    },
    {
      label: '二年级',
      value: 2,
      children: [
        {
          value: 2.1,
          label: '二年一班'
        },
        {
          value: 2.2,
          label: '二年二班'
        }
      ]
    },
    {
      label: '初中',
      value: 3,
      children: [
        {
          label: '初中,一年级',
          value: 3.1,
          children: [
            {
              value: 3.11,
              label: '初中,一年一班',
              list: [
                {
                  value: 3.111,
                  label: '小红'
                }
              ]
            },
            {
              value: 3.12,
              label: '初中,一年二班'
            }
          ]
        },
        {
          label: '初中,二年级',
          value: 3.2,
          list: [
            {
              value: 3.21,
              label:
                '初中,二年一班初中,二年一班初中,二年一班初中,二年一班初中,二年一班初中,二年一班初中,二年一班初中,二年一班'
            }
          ]
        }
      ]
    }
  ];
})();
</script>
<style scoped lang="scss">
.test-other-wrapper {
  width: 100%;
  height: 100%;
  margin-top: 100px;
  .el-form-item {
    width: 500px;
  }
}
</style>

<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="文件名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="文件类型">
      <el-select v-model="form.type">
        <el-option label="XLSX（*.xlsx）" value=".xlsx" />
        <el-option label="DOCX（*.docx）" value=".docx" />
        <el-option label="CSV（*.csv）" value=".csv" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <i class="iconfont icon-zhankai"></i>
    </el-form-item>
    <!-- 详细设置 -->
    <template v-if="careful">
      <el-form-item label="导出字段">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <el-checkbox-group v-model="form.column" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(item, i) in checkListOptions" :key="i" :label="item.prop" name="type">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </template>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const props = defineProps({
  tableOptions: {
    type: <any>Array,
    required: true
  }
});
const form = reactive({
  name: '',
  type: '.xlsx',
  column: [] // 已选中
});
const careful = ref(false); // 详细设置
const isIndeterminate = ref(false); // 全选框中间状态
const checkAll = ref(true); // 是否全选
const checkList = ref<any>([]); // 全选中列表
const checkListOptions = ref<any>([]); // 全选列表
// 初始化
function init() {
  props.tableOptions.forEach((item: any) => {
    if (item.export || item.prop) {
      let prop = item.prop;
      if (item.export) {
        if (typeof item.export == 'string') {
          prop = item.export;
        } else if (Object.prototype.toString.call(item.export) === '[object Object]') {
          if (item.export.prop) {
            if (typeof item.export.prop == 'string') {
              prop = item.export.prop;
            } else {
              console.warn('导出字段仅支持 string 类型');
            }
          }
        } else {
          console.warn('export 类型检测失败，仅支持 string、object');
        }
      }
      if (prop) {
        checkList.value.push(prop);
        checkListOptions.value.push({
          prop,
          label: item.label
        });
      }
    }
  });
  form.column = checkList.value;
}
// 全选框改变
function handleCheckAllChange(val: boolean): void {
  if (val) {
    form.column = checkList.value;
  } else {
    form.column = [];
  }
  isIndeterminate.value = false;
}
// 复选框改变
function handleCheckedCitiesChange(value: string[]): void {
  const checkedCount = value.length;
  checkAll.value = checkedCount === checkList.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < checkList.value.length;
}
// 立即执行
init();
</script>
<style lang="scss" scoped></style>

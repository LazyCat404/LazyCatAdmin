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
    <el-form-item label="导出字段">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="form.column">
        <template v-for="(item, i) in tableOptions" :key="i">
          <el-checkbox v-if="item.prop" :label="item.exportProp ? item.exportProp : item.prop" name="type" />
        </template>
      </el-checkbox-group>
    </el-form-item>
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
console.log(props);
const isIndeterminate = ref(true);
const checkAll = ref(false);

// 全选框
function handleCheckAllChange(val: boolean) {
  // form.column = val ? [] : [];
  console.log(val);
  isIndeterminate.value = false;
  console.log(form.column);
}
// const handleCheckedCitiesChange = (value: string[]) => {
//   const checkedCount = value.length;
//   checkAll.value = checkedCount === cities.length;
//   isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
// };
</script>
<style lang="scss" scoped></style>

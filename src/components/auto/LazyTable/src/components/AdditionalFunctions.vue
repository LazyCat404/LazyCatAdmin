<template>
  <!-- 功能按钮 -->
  <ul class="additional-functions-wrapper">
    <li>
      <i class="iconfont icon-daochu" @click="operSelect('导出')"></i>
      <i class="iconfont icon-shezhi1" @click="operSelect('自定义列')"></i>
    </li>
  </ul>
  <!-- 功能弹框 -->
  <el-dialog :title="obj.dialogTitle" v-model="obj.dialogVisible" width="490px" draggable destroy-on-close>
    <CustomColumn
      :tableOptions="tableOptions"
      :templateList="templateList"
      @confirmBtn="confirmBtn"
      v-if="obj.dialogTitle == '自定义列'"
    ></CustomColumn>
    <Export
      :tableOptions="tableOptions"
      :page="page"
      @confirmBtn="confirmBtn"
      v-else-if="obj.dialogTitle == '导出'"
    ></Export>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import CustomColumn from './lib/components/additional/CustomColumn.vue';
import Export from './lib/components/additional/Export.vue';
defineProps<{
  tableOptions: Array<any>;
  templateList: Array<any>;
  page?: any;
}>();

const $emits = defineEmits(['additionalConfirm']);
const obj = reactive<any>({
  dialogVisible: false, // 弹框显示
  dialogTitle: null
});

// 操作选择
function operSelect(type: string) {
  switch (type) {
    case '自定义列':
      obj.dialogTitle = type;
      obj.dialogVisible = true;
      break;
    case '导出':
      obj.dialogTitle = type;
      obj.dialogVisible = true;
      break;
  }
}
// 确认按钮
function confirmBtn(par: any, type: string) {
  obj.dialogVisible = false;
  $emits('additionalConfirm', par, type);
}
</script>
<style lang="scss" scoped>
.additional-functions-wrapper {
  margin: 0 20px;
  margin-bottom: 16px;
  overflow: hidden;
  li {
    float: right;
    i.iconfont {
      width: 30px;
      height: 30px;
      display: inline-block;
      text-align: center;
      line-height: 30px;
      background-color: rgba(32, 107, 250, 0.05);
      border-radius: 4px;
      cursor: pointer;
    }
    i.iconfont + i.iconfont {
      margin-left: 10px;
    }
  }
}
</style>

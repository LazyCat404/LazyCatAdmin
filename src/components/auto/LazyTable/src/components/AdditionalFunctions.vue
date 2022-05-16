<template>
  <!-- 功能按钮 -->
  <ul class="table-additional-functions-wrapper">
    <li>
      <i class="iconfont icon-shezhi1" @click="operSelect('自定义列')"></i>
    </li>
  </ul>
  <!-- 功能弹框 -->
  <el-dialog :title="state.dialogTitle" v-model="state.dialogVisible" width="490px" draggable destroy-on-close>
    <CustomColumn
      :tableOptions="tableOptions"
      :templateList="templateList"
      @confirmBtn="confirmBtn"
      v-if="state.dialogTitle == '自定义列'"
    ></CustomColumn>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import CustomColumn from './lib/components/additional/CustomColumn.vue';
defineProps({
  tableOptions: {
    type: <any>Array,
    required: true
  },
  templateList: {
    type: <any>Array,
    required: true
  }
});
const $emits = defineEmits(['additionalConfirm']);
const state = reactive<any>({
  dialogVisible: false, // 弹框显示
  dialogTitle: null
});

// 操作选择
function operSelect(type: string) {
  switch (type) {
    case '自定义列':
      state.dialogTitle = type;
      state.dialogVisible = true;
      break;
  }
}
// 确认按钮
function confirmBtn(par: any, type: string) {
  state.dialogVisible = false;
  $emits('additionalConfirm', par, type);
}
</script>
<style lang="scss" scoped>
.table-additional-functions-wrapper {
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
  }
}
</style>

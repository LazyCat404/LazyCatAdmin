<template>
  <el-popover
    placement="top-start"
    title="Title"
    :width="200"
    trigger="hover"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button size="small" @click="btnClick">Hover to activate</el-button>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  scope: <any>Object //行数据
});
function btnClick() {
  console.log('你成功了', props.scope.name);
}
</script>
<style lang="scss" scoped>
div {
  color: red;
}
</style>

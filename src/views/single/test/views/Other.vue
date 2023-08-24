<template>
  <div class="test-other-wrapper">
    <el-form ref="formRef" label-width="100px">
      <el-form-item label="age">
        <LazySplitSelect :disabled="false" :leftData="[]" :rightData="[]" @change="valueChange"></LazySplitSelect>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
function valueChange(val: unknown): void {
  console.log('值发生改变', val);
}
</script>
<style scoped lang="scss">
.test-other-wrapper {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="option-wrapper">
    <el-input v-model="obj.input3" placeholder="Please input" class="input-with-select">
      <template #prepend>
        <el-select v-model="obj.criteria" placeholder="Select" style="width: 115px">
          <el-option label="Restaurant" value="1" />
          <el-option label="Order No." value="2" />
          <el-option label="Tel" value="3" />
        </el-select>
      </template>
    </el-input>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
const obj = reactive<any>({
  criteria: '',
  input3: ''
});
</script>
<style scoped lang="scss"></style>

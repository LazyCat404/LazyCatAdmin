<template>
  <div class="lazy-split-select-wrapper">
    <el-popover placement="bottom" :width="400" trigger="click">
      <template #reference>
        <PopoverBtn :disabled="disabled"></PopoverBtn>
      </template>
      <PopoverBox></PopoverBox>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import PopoverBtn from './components/PopoverBtn.vue';
import PopoverBox from './components/PopoverBox.vue';

interface Props {
  disabled?: boolean | number | string;
  leftData: Array<any>;
  rightData?: Array<any>;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: () => false,
  leftData: () => [],
  rightData: () => []
});
const obj = reactive<any>({});
console.log(props.disabled, obj);
</script>
<style scoped lang="scss"></style>

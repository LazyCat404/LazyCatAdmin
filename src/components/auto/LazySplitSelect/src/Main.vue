<template>
  <div class="lazy-split-select-wrapper" ref="lazySplitSelectWrapper">
    <el-popover
      placement="bottom"
      trigger="click"
      :width="obj.width"
      @show="popoverShow"
      @hide="popoverHide"
      @before-enter="obj.isHide = false"
      @before-leave="obj.isHide = true"
      :disabled="disabled"
    >
      <template #reference>
        <PopoverBtn :disabled="disabled" :clearable="clearable" :isHide="obj.isHide"></PopoverBtn>
      </template>
      <PopoverBox></PopoverBox>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import PopoverBtn from './components/PopoverBtn.vue';
import PopoverBox from './components/PopoverBox.vue';
import { onMounted, reactive, ref } from 'vue';

interface Props {
  data: Array<any>;
  label?: string;
  valueKey?: string;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
}
withDefaults(defineProps<Props>(), {
  data: () => [],
  label: () => 'name',
  valueKey: () => 'id',
  disabled: () => false,
  clearable: () => false,
  placeholder: () => '请选择'
});
const $emits = defineEmits(['show', 'hide']);
const obj = reactive<any>({
  isHide: true,
  width: 150
});
function popoverShow(par: PointerEvent) {
  $emits('show', par);
}
function popoverHide(par: PointerEvent) {
  $emits('hide', par);
}
// 计算弹出框宽度
const lazySplitSelectWrapper = ref();
function computeWidth() {
  if (lazySplitSelectWrapper.value) {
    obj.width = lazySplitSelectWrapper.value.offsetWidth;
  }
}
onMounted(() => {
  computeWidth();
});
</script>
<style scoped lang="scss">
.lazy-split-select-wrapper {
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>

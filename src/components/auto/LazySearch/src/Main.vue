<template>
  <div class="lazy-search-wrapper">
    <!-- ico 展开 -->
    <Expand v-if="type.toLowerCase() == 'expand'" :modelValue="modelValue" :list="list" @change="change"></Expand>
    <!-- 选项（默认）-->
    <ElConfigProvider v-else :locale="locale">
      <Option :list="list" :modelValue="modelValue" @change="change"></Option>
    </ElConfigProvider>
  </div>
</template>
<script setup lang="ts">
import Expand from './components/Expand.vue';
import Option from './components/Option.vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
interface Props {
  modelValue?: object;
  type?: string; // 筛选展示类型
  list: Array<{
    label: string;
    key: string;
  }>; // 筛选列表
}
const props = withDefaults(defineProps<Props>(), {
  type: () => 'option',
  list: () => []
});
const $emits = defineEmits(['update:modelValue', 'change']);
// 检查props
function inspectProps() {
  props.list.forEach(item => {
    if (typeof item.key != 'string') {
      console.warn('查询条件 key 仅支持 string 类型');
    }
    if (typeof item.label != 'string') {
      console.warn('查询条件 label 仅支持 string 类型');
    }
    let sameKey = props.list.filter(ite => ite.key == item.key);
    if (sameKey.length > 1) {
      console.error('检测到条件列表 key 值重复');
    }
  });
  if (props.modelValue && Object.prototype.toString.call(props.modelValue) === '[object Array]') {
    console.warn(`prop "modelValue" 不支持 Array 类型`);
  }
}

const locale = zhCn;
// 搜索值改变回调
function change(val: Array<{ key: string; value: string }>) {
  let par: any = {};
  val.forEach(item => {
    par[item.key] = item.value;
  });
  $emits('update:modelValue', par);
  $emits('change', par);
}
(function init() {
  inspectProps();
})();
</script>
<style scoped lang="scss">
.lazy-search-wrapper {
  width: 100%;
}
</style>

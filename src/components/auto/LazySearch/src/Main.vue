<template>
  <div class="lazy-search-wrapper">
    <!-- ico 展开 -->
    <Expand v-if="type.toLowerCase() == 'expand'"></Expand>
    <!-- 选项（默认）-->
    <Option v-else></Option>
  </div>
</template>
<script setup lang="ts">
import Expand from './components/Expand.vue';
import Option from './components/Option.vue';

interface Props {
  type?: string; // 筛选展示类型
  list: Array<any>; // 筛选列表
}
const props = withDefaults(defineProps<Props>(), {
  type: () => 'option',
  list: () => []
});
// 处理props
function readjustProps() {
  console.log(props);
}
(function init() {
  readjustProps();
})();
</script>
<style scoped lang="scss">
.lazy-search-wrapper {
  width: 100%;
}
</style>

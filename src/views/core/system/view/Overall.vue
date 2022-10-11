<template>
  <Splitpanes class="default-theme">
    <Pane min-size="5" size="20">
      <el-scrollbar height="100%">
        <MenuTree @cutMenu="cutMenu"></MenuTree>
      </el-scrollbar>
    </Pane>
    <Pane min-size="80">
      <el-scrollbar height="100%">
        <AbilityTable ref="abilityTable"></AbilityTable>
      </el-scrollbar>
    </Pane>
  </Splitpanes>
</template>

<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import MenuTree from './components/Overall/entry/MenuTree.vue';
import AbilityTable from './components/Overall/entry/AbilityTable.vue';
import { ref } from 'vue';

const abilityTable = ref(); // 子组件实例

// 菜单切换
function cutMenu(item: unknown) {
  // 调用子组件同名方法
  abilityTable.value.cutMenu(item);
}
</script>
<style lang="scss" scoped>
.splitpanes.default-theme {
  ::v-deep .splitpanes__pane {
    background-color: #fff;
  }
}
</style>

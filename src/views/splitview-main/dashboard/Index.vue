<template>
  <Splitpanes class="default-theme">
    <Pane min-size="5" size="80">
      <MenuTree></MenuTree>
    </Pane>
    <Pane min-size="20">
      <AbilityTable></AbilityTable>
    </Pane>
  </Splitpanes>
</template>

<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import MenuTree from './components/entry/MenuTree.vue';
import AbilityTable from './components/entry/AbilityTable.vue';
</script>
<style lang="scss" scoped>
.splitpanes.default-theme {
  ::v-deep .splitpanes__pane {
    background-color: #fff;
  }
}
</style>

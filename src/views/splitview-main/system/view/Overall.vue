<template>
  <Splitpanes class="default-theme">
    <Pane v-for="i in 3" :key="i">
      <div>全局设置{{ i }}</div>
    </Pane>
  </Splitpanes>
</template>

<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
</script>

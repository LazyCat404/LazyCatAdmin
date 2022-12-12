<template>
  <div class="board-config-wrapper">
    <SwitchTab active="看板配置" @switchTab="switchTab"></SwitchTab>
    <ConfigOverview :configList="state.configList" v-if="state.configList && state.configList.length"></ConfigOverview>
    <ConfigList
      :configList="state.configList"
      @switchShow="switchShow"
      v-if="state.configList && state.configList.length"
    ></ConfigList>
  </div>
</template>

<script lang="ts" setup>
import SwitchTab from '../components/board/SwitchTab.vue';
import ConfigOverview from '../components/board/ConfigOverview.vue';
import ConfigList from '../components/board/ConfigList.vue';
import api from '@api';
import { reactive } from 'vue';
const state = reactive<any>({
  configList: []
});
const route = useRoute();
const router = useRouter();
function switchTab(path: string) {
  if (path != route.path) {
    router.push({ path: path });
  }
}
function switchShow(item: any, i: string) {
  state.configList[i].show = !state.configList[i].show;
  // 请求接口
}

function getConfigList() {
  api.bench.getConfigList().then((res: res) => {
    state.configList = res.data;
  });
}
getConfigList();
</script>
<style lang="scss" scoped></style>

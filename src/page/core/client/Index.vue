<template>
  <div class="client-wrapper">
    <SwitchTab :activeTab="activeTab" @switchTab="switchTab"></SwitchTab>
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SwitchTab from './components/SwitchTab.vue';

const activeTab = ref('/client/vdi');
const route = useRoute();
const router = useRouter();
function switchTab(path: string) {
  if (path != route.path) {
    router.push({ path: path });
    activeTab.value = path;
  }
}
</script>
<style lang="scss" scoped>
.client-wrapper {
  margin-top: 0 !important;
}
</style>

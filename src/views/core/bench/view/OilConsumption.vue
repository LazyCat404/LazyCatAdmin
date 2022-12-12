<template>
  <div class="oil-consumption-wrapper">
    <SwitchTab active="台架消耗油耗" @switchTab="switchTab"></SwitchTab>
    <OilConsumption></OilConsumption>
  </div>
</template>

<script lang="ts" setup>
import SwitchTab from '../components/oil-consumption/SwitchTab.vue';
import OilConsumption from '../components/oil-consumption/OilConsumption.vue';

const route = useRoute();
const router = useRouter();
function switchTab(path: string) {
  if (path != route.path) {
    router.push({ path: path });
  }
}
</script>
<style lang="scss" scoped></style>

<template>
  <div class="order-oil-consumption-wrapper">
    <SwitchTab active="订单消耗油耗" @switchTab="switchTab"></SwitchTab>
    <OrderOilConsumption></OrderOilConsumption>
  </div>
</template>

<script lang="ts" setup>
import SwitchTab from '../components/oil-consumption/SwitchTab.vue';
import OrderOilConsumption from '../components/oil-consumption/OrderOilConsumption.vue';

const route = useRoute();
const router = useRouter();
function switchTab(path: string) {
  if (path != route.path) {
    router.push({ path: path });
  }
}
</script>
<style lang="scss" scoped></style>

<template>
  <div class="other-wrapper" :dark="excludeRoute.includes(route.path)">
    <i class="iconfont icon-yunyingdaping" @click="commonAct('大屏')"></i>
  </div>
</template>
<script setup lang="ts">
defineProps({
  excludeRoute: {
    type: Array, // 排除路由
    required: false,
    default: () => {
      return [];
    }
  }
});
const router = useRouter();
const route = useRoute();

function commonAct(type: string) {
  switch (type) {
    case '大屏':
      router.push('/digital-twin');
      break;
  }
}
</script>
<style scoped lang="scss">
.other-wrapper {
  display: flex;
  align-items: center;
  margin-right: 60px;
  .iconfont {
    font-size: 28px;
    cursor: pointer;
  }
}
</style>

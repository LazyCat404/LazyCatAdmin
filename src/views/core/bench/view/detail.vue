<template>
  <div class="bench-detail-wrapper">
    <div class="card-box-one">
      <Overview :detail="state.detail"></Overview>
      <Tentative :detail="state.detail"></Tentative>
    </div>
    <div class="card-box-two">
      <div class="top-card-box">
        <WorkLog :detail="state.detail"></WorkLog>
        <RunRatio :detail="state.detail"></RunRatio>
      </div>
      <TimeCensus :detail="state.detail"></TimeCensus>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Overview from '../components/detail/Overview.vue';
import WorkLog from '../components/detail/WorkLog.vue';
import RunRatio from '../components/detail/RunRatio.vue';
import TimeCensus from '../components/detail/TimeCensus.vue';
import Tentative from '../components/detail/Tentative.vue';
import api from '@api';
import { reactive } from 'vue';
const state = reactive<any>({
  detail: {}
});

const route = useRoute();

function getBenchDetail() {
  api.bench.getBenchDetail({ id: route.query.id }).then((res: res) => {
    state.detail = res.data;
  });
}
getBenchDetail();
</script>

<style lang="scss" scoped>
.bench-detail-wrapper {
  display: flex;
  .card-box-one {
    width: 410px;
    background: #fff;
    box-sizing: border-box;
    margin-right: 30px;
    border-left: 1px solid #ececef;
    display: flex;
    flex-direction: column;
  }
  .card-box-two {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 40px;
    margin-top: 80px;
    margin-bottom: 40px;
    > .top-card-box {
      display: flex;
      height: 53.33333%;
      margin-bottom: 30px;
      box-sizing: border-box;
    }
  }
}
</style>

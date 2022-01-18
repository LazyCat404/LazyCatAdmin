<template>
  <div class="system-role-detail-wrapper">
    <div
      class="system-role-detail-ico"
      :style="[
        {
          backgroundColor:
            !props.detail.default && props.detail.modify
              ? '#f0cf9e'
              : props.detail.default && !props.detail.modify
              ? '#a0a6ff'
              : '#a1d9ce'
        }
      ]"
    >
      <!-- 默认角色，不可编辑 -->
      <span v-if="props.detail.default && !props.detail.modify" class="iconfont icon-qiyeguanli_yuangongguanli"></span>
      <!-- 默认角色，可编辑 -->
      <span v-if="props.detail.default && props.detail.modify" class="iconfont icon-yonghu2"></span>
      <!-- 自定义角色，可编辑 -->
      <span v-if="!props.detail.default && props.detail.modify" class="iconfont icon-yonghuguanli1"></span>
    </div>
    <div class="system-role-detail-box">
      <div style="color: #434e7e">{{ props.detail.default ? '默认角色' : '自定义角色' }}</div>
      <div style="color: #767d83; font-size: 12px">{{ props.detail.des }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  detail: <any>Object
});
</script>
<style lang="scss" scoped>
.system-role-detail-wrapper {
  float: left;
  width: calc(100% - 222px);
  padding: 10px;
  margin: 10px;
  border: 1px solid #becef6;
  border-radius: 5px;
  background-image: linear-gradient(#eaf5ff, #fefeff);

  .system-role-detail-ico {
    float: left;
    width: 48px;
    height: 48px;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    margin-right: 10px;
    .iconfont {
      font-size: 32px;
      color: #fff;
    }
  }
  .system-role-detail-box {
    padding-top: 4px;
    float: left;
    & > div {
      line-height: 20px;
    }
  }
}
</style>

<template>
  <div class="basic-title-wrapper">
    <i></i><span>{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>
<style lang="scss" scoped>
.basic-title-wrapper {
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 25px;
  display: -webkit-flex;
  display: flex; /*定位（写在父元素中）*/
  align-items: center;
  > i {
    display: inline-block;
    width: 3px;
    height: 16px;
    background: #01bc8f;
    margin-right: 5px;
  }
}
</style>

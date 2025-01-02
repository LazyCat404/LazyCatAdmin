<template>
  <div class="error-wrapper">
    <div>
      <LazySplitSelect
        v-model="form.userList"
        :data="userList"
        :treeProps="treeProps"
        :listProps="listProps"
        :filterable="true"
        :filter-method="filterMethod"
        :clearable="true"
        :multiple="false"
        @change="userChange"
      ></LazySplitSelect>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import userList from './data.json';
const form = ref<any>({
  // userList: ['a54d4ce8-d922-4883-afae-e2aa32ac2cb5', '3711ac1f-07b7-416b-ad7a-1723795a97d7']
  userList: 'a54d4ce8-d922-4883-afae-e2aa32ac2cb5'
});
const treeProps = ref<any>({
  label: 'name',
  list: 'userList',
  children: 'child',
  value: 'uuid'
});
const listProps = ref<any>({
  label: 'nameId',
  value: 'uuid'
});
function userChange() {
  // console.log('绑定值：', form.value.userList);
}
function filterMethod() {
  //
}
</script>
<style lang="scss" scoped>
.error-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  > div {
    width: 310px;
  }
}
</style>

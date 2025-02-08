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
        :multiple="true"
        @change="userChange"
      ></LazySplitSelect>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import userList from './data.json';
const form = ref<any>({
  userList: [
    '00008ed4-0441-4373-8d6f-57188fb52bc1',
    '0baef745-6a70-4a5d-a769-9be2170408a3',
    '0fb64acd-5eb1-41f7-9b65-dde5e1dfc206',
    '199adfe9-0723-4b2b-a4ff-98f8e03d16e1',
    '22f0efcc-db57-4482-b84e-e989d38cbcb6',
    '354b4bcc-a7a4-4a04-b528-47efe1f81f1d',
    '360a212b-79a4-45e5-bf8e-270a261398b1',
    '44e71dc4-4726-4b08-8390-a4c7e19f666e',
    '62a3a911-104c-4dd2-a487-142e49b4334c',
    '735f58a9-6d46-4ee0-8923-860bc270452a',
    'a6628012-47a7-4181-9ac4-4163b66d3895',
    'c2d65918-f962-4a19-ae76-076f7f359576',
    'fda1577d-2e75-453e-bbf5-2607534ec728',
    '6e231595-61a8-4543-9b7d-9022e5b6864d',
    'ae649fff-200d-458d-bf1c-aaec57f6edcf',
    'c0408508-bc64-4cbb-8064-fc66d426c62f',
    '02ac5014-85f5-41e7-a7dc-0e684d599f1c',
    '44fc9b8a-d794-4548-85a4-dc9a94540090',
    '0ac1c1eb-d5e5-4ad1-bd27-38ab715b2b87'
  ]
  // userList: 'a54d4ce8-d922-4883-afae-e2aa32ac2cb5'
});
const treeProps = ref<any>({
  label: 'name',
  list: 'userList',
  children: 'child',
  value: 'uuid'
});
const listProps = ref<any>({
  label: 'name',
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

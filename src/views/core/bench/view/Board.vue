<template>
  <div class="bench-board-wrapper">
    <SwitchTab active="看板展示" @switchTab="switchTab"></SwitchTab>
    <BoardList @boardDetail="boardDetail"></BoardList>
    <BoardDetail :currentBoard="state.currentBoard" v-if="state.currentBoard"></BoardDetail>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import BoardDetail from '../components/board/BoardDetail.vue';
import BoardList from '../components/board/BoardList.vue';
import SwitchTab from '../components/board/SwitchTab.vue';
const state = reactive<any>({
  currentBoard: null
});

const route = useRoute();
const router = useRouter();
function switchTab(path: string) {
  if (path != route.path) {
    router.push({ path: path });
  }
}

function boardDetail(item: any) {
  state.currentBoard = item;
}
</script>
<style lang="scss" scoped></style>

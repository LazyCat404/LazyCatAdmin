<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  msg: String
});
</script>

<style scoped>

</style>

<template>
  <div v-if="loading" class="loading_bg">
    加载中
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const loading=ref(true);

onMounted(()=>{
  
})
</script>

<style>
body{
  margin: 0;
}
</style>

<style scoped>
.loading_bg{
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
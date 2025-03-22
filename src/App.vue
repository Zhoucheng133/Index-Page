<template>
  <Toast />
  <ConfirmPopup />
  <router-view v-if="!loading"></router-view>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { hostname } from './static/env';
import { ConfirmPopup } from 'primevue';
const router=useRouter();
import Toast from 'primevue/toast';
import store from './store/store';
const loading=ref(true);

onMounted(async ()=>{
  const {data: response}=await axios.get(`${hostname}/api/init`);
  if(!response.ok){
    return;
  }else if(response.msg){
    loading.value=false;
    router.replace("/register")
  }else{
    loading.value=false;
    const token=localStorage.getItem("token");

    if(token==null){
      router.push("/login")
    }else{
      store().token=token;
    }
  }
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
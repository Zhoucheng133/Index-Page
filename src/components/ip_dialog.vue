<template>
  <Dialog v-model:visible="showIp" modal header="IP地址" :style="{ width: '25rem' }" >
    <div class="ip_text" @click="copy(IPv4)">{{ IPv4 }}</div>
    <div class="ip_text" @click="copy(IPv6)">{{ IPv6 }}</div>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Dialog } from 'primevue';
import axios from 'axios';
import { hostname } from '../static/env';
import { useToast } from 'primevue';
import useClipboard from 'vue-clipboard3';
const { toClipboard } = useClipboard();

const IPv4=ref("");
const IPv6=ref("");

const toast=useToast();

const copy=(ip: string)=>{
  toClipboard(ip);
  toast.add({ severity: 'success', summary: '复制成功', detail: "已复制IP地址", life: 3000 });
}

onMounted(async ()=>{
  const {data: ipv4R}=await axios.get(`${hostname}/api/ipv4`, {
    headers: {
      name: localStorage.getItem("name"),
      password: localStorage.getItem("password")
    }
  });
  if(ipv4R.ok){
    IPv4.value=ipv4R.msg;
  }
  const {data: ipv6R}=await axios.get(`${hostname}/api/ipv6`, {
    headers: {
      name: localStorage.getItem("name"),
      password: localStorage.getItem("password")
    }
  });
  if(ipv6R.ok){
    IPv6.value=ipv6R.msg;
  }
})

const showIp=ref(false);

const showIpHandler=()=>{
  showIp.value=true;
}

defineExpose({
  showIpHandler
})

</script>

<style scoped>
.ip_text:hover{
  color: rgb(6, 182, 212);
}
.ip_text{
  user-select: none;
  cursor: pointer;
  transition: color linear .2s;
}
</style>
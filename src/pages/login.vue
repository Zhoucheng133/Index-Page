<template>
  <div class="body">
    <div class="panel">
      <div class="title">登录</div>
      <div class="sub">Hi, 欢迎回来👋</div>
      <div class="item">
        <div className="label">用户名</div>
        <InputText type="text" v-model="name" style="width: 100%;" />
      </div>
      <div class="item">
        <div className="label">密码</div>
        <InputText type="password" v-model="password" style="width: 100%;" @keydown.enter="loginHandler" />
      </div>
      <Button style="margin-top: 30px; width: 100%; margin-bottom: 50px;" @click="loginHandler">登录</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InputText, Button } from 'primevue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { hostname } from '../static/env';
import CryptoJS from 'crypto-js';
import { useRouter } from 'vue-router';
import store from '../store/store';
const toast = useToast();
const router=useRouter();

const name=ref("");
const password=ref("");

const loginHandler=async ()=>{

  const {data: response}=await axios.post(`${hostname}/api/login`, {
    name: name.value,
    password: CryptoJS.SHA256(password.value).toString()
  })
  if(response.ok){
    localStorage.setItem("token", response.msg);
    store().token=response.msg;
    toast.add({ severity: 'success', summary: '登录成功', detail: '正在跳转到主页', life: 3000 });
    router.push("/");
  }else{
    toast.add({ severity: 'error', summary: '登录失败', detail: response.msg, life: 3000 });
  }
}

</script>

<style scoped>
.body{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.panel{
  width: 400px;
  user-select: none;
}
@media screen and (max-width: 500px) {
  .panel {
    width: calc(100vw - 100px);
  }
}
.title{
  font-weight: bold;
  font-size: 30px;
}
.sub{
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.item{
  margin-top: 20px;
}
.label{
  margin-bottom: 10px;
}
</style>
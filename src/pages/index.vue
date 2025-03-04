<template>
  <div class="bg">
    <div class="table">
      <div class="title">
        <div>{{ hello }}</div>
        <Button label="添加" style="margin-left: auto;" variant="text" size="small" />
      </div>
      <DataTable :value="data">
        <Column field="name" header="名称"></Column>
        <Column field="port" header="端口"></Column>
        <Column field="webui" header="UI">
          <template #body="slotProps">
            {{ slotProps.data.webui==1 ? "❌" : "✅" }}
          </template>
        </Column>
        <Column field="tip" header="备注"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { hostname } from '../static/env';
import { Column, DataTable, useToast, Button } from 'primevue';
const toast = useToast();

interface Data{
  id: number,
  name: string,
  port: string,
  webui: number,
  tip: string
}

const hello=ref("");
const now=new Date();
if(now.getHours()<6){
  hello.value="晚上好！";
}else if(now.getHours()<12){
  hello.value="早上好!";
}else if(now.getHours()<18){
  hello.value="下午好!";
}else{
  hello.value="晚上好！";
}

const data=ref<Data[]>([]);
async function initData(){
  const {data: response}=await axios.get(`${hostname}/api/list`, {
    headers: {
      name: localStorage.getItem("name"),
      password: localStorage.getItem("password")
    }
  });
  if(response!=null && response.ok){
    data.value=response.data;
  }else if(response!=null){
    toast.add({ severity: 'error', summary: '请求出错', detail: response.msg, life: 3000 });
  }
}


onMounted(()=>{
  initData();
})

</script>

<style scoped>
.title{
  text-align: left;
  padding-left: 16px;
  display: flex;
  align-items: center;
}
.bg{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.table{
  width: 600px;
  user-select: none;
  margin-top: 15px;
}
</style>
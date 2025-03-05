<template>
  <div class="bg">
    <div class="table">
      <div class="title">
        <div>{{ hello }}</div>
        <Button icon="pi pi-globe" variant="text" @click="showIpHandler" />
        <Button label="添加" style="margin-left: auto;" variant="text" size="small" @click="showAddHandler" />
      </div>
      <DataTable :value="data" stripedRows>
        <Column field="name" header="名称"></Column>
        <Column field="port" header="端口" sortable></Column>
        <Column field="webui" header="UI">
          <template #body="slotProps">
            {{ slotProps.data.webui==1 ? "✅": "❌" }}
          </template>
        </Column>
        <Column field="tip" header="备注"></Column>
        <Column header="操作">
          <template #body="slotProps">
            <Button severity="danger" variant="text" icon="pi pi-trash" @click="(e)=>delHandler(e, slotProps.data)" />
            <Button v-if="slotProps.data.webui==1" icon="pi pi-link" style="margin-left: 10px;" @click="openHandler(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <AddDialog ref="addDialog" @refresh="initData" />
  <IpDialog ref="ipRef"/>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { hostname } from '../static/env';
import { Column, DataTable, useToast, Button } from 'primevue';
const toast = useToast();
import AddDialog from '../components/add_dialog.vue';
import IpDialog from '../components/ip_dialog.vue';
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();

const openHandler=(item: Data)=>{
  window.location.href=`http://${window.location.hostname}:${item.port}`;
}

const delHandler=async (event: any, item: Data)=>{
  confirm.require({
    target: event.currentTarget,
    message: '你确定要删除这个索引吗',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: '取消',
      severity: 'secondary',
      outlined: true,
      size: "small",
    },
    acceptProps: {
      label: '删除',
      size: "small",
      severity: "danger"
    },
    accept: async () => {
      const {data: response}=await axios.delete(`${hostname}/api/del/${item.id}`, {
        headers: {
          name: localStorage.getItem("name"),
          password: localStorage.getItem("password")
        }
      });
      if(response.msg){
        toast.add({ severity: 'success', summary: '删除成功', detail: "正在刷新列表", life: 3000 });
        initData();
      }else{
        toast.add({ severity: 'error', summary: '删除出错', detail: response.msg, life: 3000 });
      }
    },
  });
}

const ipRef=ref<any>(null);
const showIpHandler=()=>{
  if(ipRef){
    ipRef.value.showIpHandler();
  }
}

const addDialog=ref<any>(null);
const showAddHandler=()=>{
  if(addDialog.value){
    addDialog.value.showAddHandler();
  }
}

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
    data.value=response.msg;
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
  width: 800px;
  user-select: none;
  margin-top: 15px;
}
</style>
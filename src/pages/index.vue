<template>
  <div class="bg">
    <div class="content">
      <div class="title">
        <div>{{ hello }}</div>
        <Button icon="pi pi-globe" variant="text" @click="showIpHandler" />
        <Button label="添加" style="margin-left: auto;" variant="text" size="small" @click="showAddHandler" />
      </div>
      <div class="table_content">
        <DataTable :value="data" stripedRows scrollable>
          <Column field="name" header="名称" style="min-width: 120px;">
              <template #body="slotProps">
                <div :class="slotProps.data.webui==1 ? 'underline cursor-pointer':''" @click="openHandler(slotProps.data)">{{ slotProps.data.name }}</div>
              </template>
          </Column>
          <Column field="port" header="端口" sortable style="min-width: 100px;"></Column>
          <Column field="webui" header="UI" style="min-width: 50px;">
            <template #body="slotProps">
              <i class="pi pi-check" v-if="slotProps.data.webui==1"/>
              <i class="pi pi-times" v-else/>
            </template>
          </Column>
          <Column field="tip" header="备注" style="min-width: 100px;"></Column>
          <Column header="操作" style="min-width: 150px;">
            <template #body="slotProps">
              <Button severity="danger" variant="text" icon="pi pi-trash" @click="(e)=>delHandler(e, slotProps.data)" />
              <Button variant="text" icon="pi pi-pen-to-square" style="margin-left: 10px;" @click="editHandler(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
  <AddDialog ref="addRef" @refresh="initData" />
  <IpDialog ref="ipRef"/>
  <EditDialog ref="editRef" @refresh="initData" />
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { hostname } from '../static/env';
import { Column, DataTable, useToast, Button } from 'primevue';
const toast = useToast();
import AddDialog from '../components/add_dialog.vue';
import IpDialog from '../components/ip_dialog.vue';
import EditDialog from '../components/edit_dialog.vue';
import { useConfirm } from "primevue/useconfirm";
import type { Data } from '../static/interface';
const confirm = useConfirm();

const editRef=ref<any>(null)
const editHandler=(item: Data)=>{
  if(editRef.value){
    editRef.value.showEditHandler(item);
  }
}

const openHandler=(item: Data)=>{
  if(item.webui==1){
    window.location.href=`http://${window.location.hostname}:${item.port}`;
  }
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

const addRef=ref<any>(null);
const showAddHandler=()=>{
  if(addRef.value){
    addRef.value.showAddHandler();
  }
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
.table_content{
  width: 100%;
}
.bg{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content{
  width: 800px;
  user-select: none;
  margin-top: 15px;
}
@media screen and (max-width: 840px) {
  .content {
    width: calc(100vw - 40px);
  }
}
</style>
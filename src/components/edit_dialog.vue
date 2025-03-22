<template>
  <Dialog v-model:visible="showEdit" modal header="编辑" :style="{ width: '25rem' }" >
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">名称</label>
      <InputText id="username" class="flex-auto" autocomplete="off" size="small" v-model="name"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">端口</label>
      <InputText id="email" class="flex-auto" autocomplete="off" size="small" type="number" v-model="port"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">备注</label>
      <InputText id="email" class="flex-auto" autocomplete="off" size="small" v-model="tip" />
    </div>
    <div class="flex items-center gap-2 mb-8">
        <Checkbox v-model="webui" binary inputId="checkbox"/>
        <label for="checkbox" style="user-select: none; cursor: pointer;">WebUI</label>
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="取消" severity="secondary" @click="showEdit=false" size="small"></Button>
      <Button type="button" label="完成" @click="editHandler" size="small"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Data } from '../static/interface';
import { Dialog, InputText, Button, Checkbox, useToast } from 'primevue';
import { hostname } from '../static/env';
import axios from 'axios';
import store from '../store/store';

const showEdit=ref(false);

const toast=useToast();

const id=ref(0);
const name=ref("");
const port=ref("");
const tip=ref("");
const webui=ref(false);


const showEditHandler=(item: Data)=>{
  id.value=item.id;
  name.value=item.name;
  port.value=item.port;
  tip.value=item.tip;
  webui.value=item.webui==1;
  showEdit.value=true;
}

const editHandler=async ()=>{
  if(name.value.length==0){
    toast.add({ severity: 'error', summary: '编辑失败', detail: "名称不能为空", life: 3000 });
    return;
  }else if(port.value.length==0){
    toast.add({ severity: 'error', summary: '编辑失败', detail: "端口不能为空", life: 3000 });
    return;
  }
  
  const {data: response}=await axios.post(`${hostname}/api/edit`, {
    id: id.value,
    name: name.value,
    port: port.value,
    tip: tip.value,
    webui: webui.value?1:0
  }, {
    headers: {
      auth: store().token
    }
  })

  if(response.ok){
    toast.add({ severity: 'success', summary: '编辑成功', detail: "已刷新列表", life: 3000 });
    emits("refresh");
    showEdit.value=false;
    name.value="";
    port.value="";
    tip.value="";
    webui.value=false;
  }else{
    toast.add({ severity: 'error', summary: '编辑失败', detail: response.msg, life: 3000 });
  }
}

const emits=defineEmits(["refresh"])

defineExpose({
  showEditHandler,
})
</script>
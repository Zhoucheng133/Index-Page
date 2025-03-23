<template>
  <Dialog v-model:visible="showAdd" modal header="添加一个页面" :style="{ width: '25rem' }" >
    <div class="flex items-center gap-4 mb-4">
      <label for="icon" class="font-semibold w-24" style="flex-shrink: 0;">图标</label>
      <InputText id="icon" class="flex-auto" autocorrect="off" size="small" v-model="icon" placeholder="http(s)://"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">名称</label>
      <InputText id="name" class="flex-auto" autocomplete="off" size="small" v-model="name"/>
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
      <Button type="button" label="取消" severity="secondary" @click="showAdd=false" size="small"></Button>
      <Button type="button" label="添加" @click="addHandler" size="small"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, Button, InputText, Checkbox, useToast } from 'primevue';
import { ref } from 'vue';
import { hostname } from '../static/env';
import axios from 'axios';
import store from '../store/store';
const showAdd=ref(false);
const showAddHandler=()=>showAdd.value=true;
const toast=useToast();

const name=ref("");
const port=ref("");
const tip=ref("");
const webui=ref(false);
const icon=ref("");

const addHandler=async ()=>{
  if(name.value.length==0){
    toast.add({ severity: 'error', summary: '添加失败', detail: "名称不能为空", life: 3000 });
    return;
  }else if(port.value.length==0){
    toast.add({ severity: 'error', summary: '添加失败', detail: "端口不能为空", life: 3000 });
    return;
  }
  
  
  const {data: response}=await axios.post(`${hostname}/api/add`, {
    name: name.value,
    port: port.value,
    tip: tip.value,
    webui: webui.value?"1":"0",
    icon: icon.value
  }, {
    headers: {
      auth: store().token
    }
  })

  if(response.ok){
    toast.add({ severity: 'success', summary: '添加成功', detail: "已刷新列表", life: 3000 });
    emits("refresh");
    showAdd.value=false;
    name.value="";
    port.value="";
    tip.value="";
    webui.value=false;
    icon.value="";
  }else{
    toast.add({ severity: 'error', summary: '添加失败', detail: response.msg, life: 3000 });
  }
}

const emits=defineEmits(["refresh"])

defineExpose({
  showAddHandler
})

</script>
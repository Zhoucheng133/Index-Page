<template>
  <div>
    <DataTable :value="data" tableStyle="min-width: 50rem">
      <Column field="name" header="名称"></Column>
      <Column field="port" header="端口"></Column>
      <Column field="webui" header="WebUI">
        <template #body="slotProps">
          {{ slotProps.data.webui==1 ? "❌" : "✅" }}
        </template>
      </Column>
      <Column field="tip" header="备注"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { hostname } from './static/env';
import { Column, DataTable } from 'primevue';

interface Data{
  id: number,
  name: string,
  port: string,
  webui: number,
  tip: string
}

const data=ref<Data[]>([]);
async function initData(){
  const {data: response}=await axios.get(`${hostname}/api/list`);
  console.log(response);
  if(response!=null){
    data.value=response.data;
  }
}


onMounted(()=>{
  initData();
})

</script>
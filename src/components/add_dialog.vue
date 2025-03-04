<template>
  <Dialog v-model:visible="showAdd" modal header="添加一个页面" :style="{ width: '25rem' }" >
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">名称</label>
      <InputText id="username" class="flex-auto" autocomplete="off" size="small"/>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">端口</label>
      <InputText id="email" class="flex-auto" autocomplete="off" size="small" type="number" />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">备注</label>
      <InputText id="email" class="flex-auto" autocomplete="off" size="small" />
    </div>
    <div class="flex items-center gap-2 mb-8">
        <Checkbox v-model="webui" binary inputId="checkbox"/>
        <label for="checkbox" style="user-select: none; cursor: pointer;">WebUI</label>
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="取消" severity="secondary" @click="showAdd=false" size="small"></Button>
      <Button type="button" label="添加" @click="showAdd=false" size="small"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, Button, InputText, Checkbox } from 'primevue';
import { ref } from 'vue';
const showAdd=ref(false);
const showAddHandler=()=>showAdd.value=true;

const webui=ref(false);

defineExpose({
  showAddHandler
})

</script>
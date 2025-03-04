<template>
  <Dialog v-model:visible="props.showAdd" modal header="Edit Profile" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">添加一个页面</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Username</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="取消" severity="secondary" @click="emit('closeAdd')"></Button>
      <Button type="button" label="添加" @click="emit('closeAdd')"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, Button, InputText } from 'primevue';

const props = defineProps(["showAdd"])
const emit = defineEmits(["closeAdd"]);

</script>
import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("main", ()=>{
  const token=ref("");

  return {token};
})
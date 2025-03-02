import {createRouter, createWebHistory} from "vue-router";

const router=createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "主页",
      path: "/",
      component: ()=>import("../pages/index.vue")
    },
    // ... 其它路由
  ]
})

export default router;
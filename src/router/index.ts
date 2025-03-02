import {createRouter, createWebHistory} from "vue-router";

const router=createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "主页",
      path: "/",
      component: ()=>import("../pages/index.vue")
    },
    {
      name: "注册",
      path: "/register",
      component: ()=>import("../pages/register.vue")
    },
    {
      name: "登录",
      path: "/login",
      component: ()=>import("../pages/login.vue")
    },
  ]
})

export default router;
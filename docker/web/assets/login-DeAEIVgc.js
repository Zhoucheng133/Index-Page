import{aC as f,aE as c,aD as r,c as y,a as e,n as i,aF as d,M as g,z as w,Q as x,aL as V,o as S,aG as _,aH as C,aJ as b}from"./index-DRb7DRjQ.js";import{C as m}from"./index-iCYYr22m.js";import{a as u}from"./index-CoUefpNI.js";const H={class:"body"},N={class:"panel"},k={class:"item"},B={class:"item"},I=f({__name:"login",setup(A){const n=c(),p=V(),a=r(""),t=r(""),v=async()=>{const{data:o}=await _.post(`${C}/api/login`,{name:a.value,password:m.SHA256(t.value).toString()});o.ok?(localStorage.setItem("name",a.value),localStorage.setItem("password",m.SHA256(t.value).toString()),n.add({severity:"success",summary:"登录成功",detail:"正在跳转到主页",life:3e3}),p.push("/")):n.add({severity:"error",summary:"登录失败",detail:o.msg,life:3e3})};return(o,s)=>(S(),y("div",H,[e("div",N,[s[5]||(s[5]=e("div",{class:"title"},"登录",-1)),s[6]||(s[6]=e("div",{class:"sub"},"Hi, 欢迎回来👋",-1)),e("div",k,[s[2]||(s[2]=e("div",{className:"label"},"用户名",-1)),i(d(u),{type:"text",modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=l=>a.value=l),style:{width:"100%"}},null,8,["modelValue"])]),e("div",B,[s[3]||(s[3]=e("div",{className:"label"},"密码",-1)),i(d(u),{type:"password",modelValue:t.value,"onUpdate:modelValue":s[1]||(s[1]=l=>t.value=l),style:{width:"100%"}},null,8,["modelValue"])]),i(d(w),{style:{"margin-top":"30px",width:"100%","margin-bottom":"50px"},onClick:v},{default:g(()=>s[4]||(s[4]=[x("登录")])),_:1})])]))}}),U=b(I,[["__scopeId","data-v-76faa79f"]]);export{U as default};

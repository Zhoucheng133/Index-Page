import{aC as f,aE as y,aD as u,c as g,a as s,n as i,aF as d,M as V,z as w,Q as x,aL as c,o as b,aG as C,aH as N,aJ as _}from"./index-Ct9GP-n3.js";import{C as k}from"./index-Cap3_9Dm.js";import{a as m}from"./_commonjsHelpers-C8CauOEc.js";const H={class:"body"},B={class:"panel"},S={class:"item"},U={class:"item"},E={class:"item"},J=f({__name:"register",setup(T){const a=y(),p=c(),r=u(""),t=u(""),o=u(""),v=async()=>{if(r.value.length==0){a.add({severity:"error",summary:"注册失败",detail:"用户名不能为空",life:3e3});return}else if(t.value.length==0){a.add({severity:"error",summary:"注册失败",detail:"密码不能为空",life:3e3});return}else if(o.value.length==0){a.add({severity:"error",summary:"注册失败",detail:"重复密码不能为空",life:3e3});return}else if(t.value!=o.value){a.add({severity:"error",summary:"注册失败",detail:"两次密码输入不一致",life:3e3});return}const{data:n}=await C.post(`${N}/api/register`,{name:r.value,password:k.SHA256(t.value).toString()});n.ok?(a.add({severity:"success",summary:"注册成功",detail:"正在跳转到登录",life:3e3}),p.replace("/login")):a.add({severity:"error",summary:"注册失败",detail:n.msg,life:3e3})};return(n,e)=>(b(),g("div",H,[s("div",B,[e[7]||(e[7]=s("div",{class:"title"},"注册",-1)),e[8]||(e[8]=s("div",{class:"sub"},"Hi, 从这里开始吧👋",-1)),s("div",S,[e[3]||(e[3]=s("div",{className:"label"},"用户名",-1)),i(d(m),{type:"text",modelValue:r.value,"onUpdate:modelValue":e[0]||(e[0]=l=>r.value=l),style:{width:"100%"}},null,8,["modelValue"])]),s("div",U,[e[4]||(e[4]=s("div",{className:"label"},"密码",-1)),i(d(m),{type:"password",modelValue:t.value,"onUpdate:modelValue":e[1]||(e[1]=l=>t.value=l),style:{width:"100%"}},null,8,["modelValue"])]),s("div",E,[e[5]||(e[5]=s("div",{className:"label"},"重复密码",-1)),i(d(m),{type:"password",modelValue:o.value,"onUpdate:modelValue":e[2]||(e[2]=l=>o.value=l),style:{width:"100%"}},null,8,["modelValue"])]),i(d(w),{style:{"margin-top":"30px",width:"100%","margin-bottom":"50px"},onClick:v},{default:V(()=>e[6]||(e[6]=[x("注册")])),_:1})])]))}}),D=_(J,[["__scopeId","data-v-f007b46a"]]);export{D as default};

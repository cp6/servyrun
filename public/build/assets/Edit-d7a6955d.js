import{A as N}from"./AuthenticatedLayout-c4be06bd.js";import{u as n,b as _,j as s,a as e,H as k}from"./app-a8d4275f.js";import{I as l}from"./InputLabel-a7ee92ff.js";import{T as d,I as c}from"./TextInput-1e9aadbd.js";import{S as m}from"./Toast-ee00046f.js";import"./Table-f19b692a.js";import{U as y}from"./UpdateButton-5faf9e0a.js";import{B as b}from"./BackButton-2b60c346.js";import{R as C}from"./Alert-d503f44b.js";import"./ApplicationLogo-ae419612.js";import"./transition-fbe58e1e.js";import"./index.esm-2010c99b.js";function R({auth:p}){const u=n().props.alert,h=n().props.servers,v=n().props.keys,r=n().props.resource,g=n().props.ip,{data:o,setData:t,patch:f,processing:w,errors:i}=_({server_id:r.server_id,username:r.username,ssh_port:r.ssh_port,key_id:r.key_id,password:""}),x=a=>{a.preventDefault(),f(route("connection.update",r.id)),navigate(route("connection.show",r.id))};return s(N,{auth:p,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Edit connection"}),children:[e(k,{title:"Edit connection"}),s("div",{className:"py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(b,{href:route("connection.show",r.id),children:"Back to connection"})}),e(C,{details:u}),e("section",{className:"bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6",children:s("form",{onSubmit:x,children:[s("div",{className:"grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4",children:[s("div",{className:"sm:col-span-2 col-span-4",children:[e("div",{className:"mb-2 block",children:e(l,{forInput:"server_id",value:"Server"})}),s(m,{onChange:a=>t("server_id",a.target.value),name:"server_id",required:!0,value:o.server_id,handleChange:a=>t("server_id",a.target.value),children:[e("option",{value:"",children:"Choose one"}),h.map(a=>s("option",{value:a.id,children:[a.title," (",a.hostname," | ",g,")"]},a.id))]})]}),s("div",{className:"sm:col-span-1 col-span-4",children:[e(l,{forInput:"username",value:"Username"}),e(d,{id:"username",name:"username",value:o.username,className:"mt-1 block w-full",autoComplete:"username",handleChange:a=>t("username",a.target.value),maxLength:64,required:!0}),e(c,{message:i.username,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-4",children:[e(l,{forInput:"ssh_port",value:"SSH port"}),e(d,{type:"number",name:"ssh_port",className:"mt-1 block w-full",autoComplete:"ssh_port",value:o.ssh_port,handleChange:a=>t("ssh_port",a.target.value),required:!0}),e(c,{message:i.ssh_port,className:"mt-2"})]}),e("p",{children:e("a",{className:"font-medium text-blue-600 dark:text-blue-500 hover:underline",href:route("key.index"),children:"Manage keys"})}),s("div",{className:"sm:col-span-4 col-span-4",children:[e("div",{className:"mb-2 block",children:e(l,{forInput:"key_id",value:"Key"})}),s(m,{onChange:a=>t("key_id",a.target.value),name:"key_id",value:o.key_id,handleChange:a=>t("key_id",a.target.value),children:[e("option",{value:"",children:"None. Use password"}),v.map(a=>e("option",{value:a.id,children:a.original_name},a.id))]})]}),s("div",{className:"mt-2 sm:col-span-4 col-span-4",children:[e("p",{className:"text-gray-500 dark:text-gray-400",children:"Passwords are stored encrypted"}),e("p",{className:"text-yellow-500 dark:text-yellow-400",children:"You cannot edit the existing password, it must be re-set"})]}),s("div",{className:"col-span-4",children:[e(l,{forInput:"password",value:"Password"}),e(d,{name:"password",className:"mt-1 block w-full",autoComplete:"password",value:o.password,handleChange:a=>t("password",a.target.value),required:!0}),e(c,{message:i.password,className:"mt-2"})]})]}),e(y,{processing:w,children:"Update connection"})]})})]})]})}export{R as default};

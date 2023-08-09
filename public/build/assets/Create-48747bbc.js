import{A as C}from"./AuthenticatedLayout-c4be06bd.js";import{u as i,b as I,j as s,a as e,H as k}from"./app-a8d4275f.js";import{I as o}from"./InputLabel-a7ee92ff.js";import{T as n,I as m}from"./TextInput-1e9aadbd.js";import{S as y}from"./Toast-ee00046f.js";import"./Table-f19b692a.js";import{P as B}from"./PrimaryButton-19cc4f5a.js";import{R as _}from"./Alert-d503f44b.js";import{a as D}from"./axios-4a70c6fc.js";import{B as P}from"./BackButton-2b60c346.js";import"./ApplicationLogo-ae419612.js";import"./transition-fbe58e1e.js";import"./index.esm-2010c99b.js";function J({auth:p}){const u=i().props.alert,h=i().props.servers,g=i().props.title,{data:t,setData:r,post:v,processing:f,reset:A,errors:l}=I({title:g,server_id:"",address:"",port:"3306",username:"root",password:""}),x=i().props.auth.user,N=a=>{a.preventDefault(),v(route("db.connection.store")),navigate(route("db.connection.index"))},b=a=>{const w={headers:{Authorization:`Bearer ${x.api_token}`}};a.target.value!==""&&D.get(route("api.server.ip",a.target.value),w).then(c=>{r(d=>({...d,address:c.data.ip})),r(d=>({...d,server_id:a.target.value}))}).catch(c=>{console.log("Error fetching IP")}),r("server_id",a.target.value)};return s(C,{auth:p,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Create DB connection"}),children:[e(k,{title:"Create DB connection"}),s("div",{className:"py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(P,{href:route("db.connection.index"),children:"Back to DB connections"})}),e(_,{details:u}),e("div",{className:"bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6",children:s("form",{onSubmit:N,children:[s("div",{className:"grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4",children:[s("div",{className:"sm:col-span-2 col-span-4",children:[e("div",{className:"mb-2 block",children:e(o,{forInput:"server_id",value:"Server"})}),s(y,{onChange:b,name:"server_id",value:t.server_id,handleChange:a=>r("server_id",a.target.value),children:[e("option",{value:"",children:"Choose to fill address"}),h.map(a=>s("option",{value:a.id,children:[a.title," (",a.hostname,")"]},a.id))]})]}),s("div",{className:"sm:col-span-2 col-span-4",children:[e(o,{forInput:"address",value:"Address/hostname"}),e(n,{name:"address",className:"mt-1 block w-full",autoComplete:"address",value:t.address,handleChange:a=>r("address",a.target.value),maxLength:125,required:!0}),e(m,{message:l.address,className:"mt-2"})]}),s("div",{className:"sm:col-span-2 col-span-4",children:[e(o,{forInput:"title",value:"Title"}),e(n,{name:"title",className:"mt-1 block w-full",autoComplete:"title",value:t.title,handleChange:a=>r("title",a.target.value),maxLength:64,required:!0}),e(m,{message:l.title,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-1",children:[e(o,{forInput:"port",value:"Port"}),e(n,{type:"number",name:"port",className:"mt-1 block w-full",autoComplete:"port",value:t.port,handleChange:a=>r("port",a.target.value)}),e(m,{message:l.port,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-3",children:[e(o,{forInput:"username",value:"Username"}),e(n,{name:"username",className:"mt-1 block w-full",autoComplete:"username",value:t.username,handleChange:a=>r("username",a.target.value),maxLength:64,required:!0}),e(m,{message:l.username,className:"mt-2"})]}),s("div",{className:"sm:col-span-2 col-span-4",children:[e(o,{forInput:"password",value:"Password"}),e(n,{name:"password",className:"mt-1 block w-full",autoComplete:"password",value:t.password,handleChange:a=>r("password",a.target.value),maxLength:255}),e(m,{message:l.password,className:"mt-2"})]})]}),e(B,{className:"inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800",processing:f,children:"Create DB connection"})]})})]})]})}export{J as default};

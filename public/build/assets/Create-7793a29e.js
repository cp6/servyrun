import{A as h}from"./AuthenticatedLayout-c4be06bd.js";import{u as i,b as g,j as a,a as e,H as f}from"./app-a8d4275f.js";import{I as o}from"./InputLabel-a7ee92ff.js";import{T as v,I as x}from"./TextInput-1e9aadbd.js";import{S as b}from"./Toast-ee00046f.js";import"./Table-f19b692a.js";import{P as y}from"./PrimaryButton-19cc4f5a.js";import{R as I}from"./Alert-d503f44b.js";import{B as N}from"./BackButton-2b60c346.js";import"./ApplicationLogo-ae419612.js";import"./transition-fbe58e1e.js";import"./index.esm-2010c99b.js";function L({auth:l}){const d=i().props.alert,n=i().props.servers,{data:s,setData:t,post:m,processing:p,reset:w,errors:c}=g({server_id:"",ip:"   "}),u=r=>{r.preventDefault(),m(route("ip.store")),navigate(route("ip.index"))};return a(h,{auth:l,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Create an IP address"}),children:[e(f,{title:"Create IP address"}),a("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(N,{href:route("ip.index"),children:"Back to IPs"})}),e(I,{details:d}),e("section",{className:"bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6",children:a("form",{onSubmit:u,children:[a("div",{className:"grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4",children:[a("div",{className:"sm:col-span-2 col-span-4",children:[e("div",{className:"mb-2 block",children:e(o,{forInput:"server_id",value:"Server"})}),a(b,{onChange:r=>t("server_id",r.target.value),name:"server_id",required:!0,value:s.server_id,handleChange:r=>t("server_id",r.target.value),children:[e("option",{value:"",children:"Choose one"}),n.map(r=>a("option",{value:r.id,children:[r.title," (",r.hostname,")"]},r.id))]})]}),a("div",{className:"sm:col-span-2 col-span-4",children:[e(o,{forInput:"ip",value:"IP address"}),e(v,{id:"ip",name:"ip",value:s.ip,className:"mt-1 block w-full",autoComplete:"ip",handleChange:r=>t("ip",r.target.value),maxLength:155,required:!0}),e(x,{message:c.ip,className:"mt-2"})]}),e("div",{className:"sm:col-span-2 col-span-4",children:e("p",{className:"text-gray-500 dark:text-gray-400",children:"GEO IP address data will be fetched which you can then edit."})})]}),e(y,{className:"inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800",processing:p,children:"Create IP address"})]})})]})]})}export{L as default};
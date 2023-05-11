import{A as v}from"./AuthenticatedLayout-c4be06bd.js";import{u as i,b as f,j as t,a as e,H as w}from"./app-a8d4275f.js";import{I as n}from"./InputLabel-a7ee92ff.js";import{T as m,I as c}from"./TextInput-1e9aadbd.js";import{U as N}from"./UpdateButton-5faf9e0a.js";import{B as x}from"./BackButton-2b60c346.js";import{R as b}from"./Alert-d503f44b.js";import"./ApplicationLogo-ae419612.js";import"./transition-fbe58e1e.js";import"./index.esm-2010c99b.js";import"./Toast-ee00046f.js";import"./Table-f19b692a.js";function A({auth:d}){const p=i().props.alert,s=i().props.resource,{data:r,setData:o,patch:u,processing:h,errors:l}=f({host:s.host,title:s.title,port:s.port,username:s.username,password:""}),g=a=>{a.preventDefault(),u(route("db.connection.update",s.id)),navigate(route("db.connection.show",s.id))};return t(v,{auth:d,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Edit DB connection"}),children:[e(w,{title:"Edit DB connection"}),t("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(x,{href:route("db.connection.show",s.id),children:"Back to DB connection"})}),e(b,{details:p}),e("section",{className:"bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6",children:t("form",{onSubmit:g,children:[t("div",{className:"grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4",children:[t("div",{className:"sm:col-span-1 col-span-4",children:[e(n,{forInput:"title",value:"Title"}),e(m,{name:"title",value:r.title,className:"mt-1 block w-full",autoComplete:"title",handleChange:a=>o("title",a.target.value),maxLength:64,required:!0}),e(c,{message:l.title,className:"mt-2"})]}),t("div",{className:"sm:col-span-1 col-span-4",children:[e(n,{forInput:"host",value:"Host"}),e(m,{name:"host",value:r.host,className:"mt-1 block w-full",autoComplete:"host",handleChange:a=>o("host",a.target.value),maxLength:64,required:!0}),e(c,{message:l.host,className:"mt-2"})]}),t("div",{className:"sm:col-span-1 col-span-4",children:[e(n,{forInput:"username",value:"Username"}),e(m,{name:"username",value:r.username,className:"mt-1 block w-full",autoComplete:"username",handleChange:a=>o("username",a.target.value),maxLength:64,required:!0}),e(c,{message:l.username,className:"mt-2"})]}),t("div",{className:"sm:col-span-1 col-span-4",children:[e(n,{forInput:"port",value:"Port"}),e(m,{type:"number",name:"port",className:"mt-1 block w-full",autoComplete:"port",value:r.port,handleChange:a=>o("port",a.target.value),required:!0}),e(c,{message:l.port,className:"mt-2"})]}),t("div",{className:"mt-2 sm:col-span-4 col-span-4",children:[e("p",{className:"text-gray-500 dark:text-gray-400",children:"Passwords are stored encrypted"}),e("p",{className:"text-yellow-500 dark:text-yellow-400",children:"You cannot edit the existing password, it must be re-set"})]}),t("div",{className:"md:col-span-2 col-span-4",children:[e(n,{forInput:"password",value:"Password"}),e(m,{name:"password",className:"mt-1 block w-full",autoComplete:"password",value:r.password,handleChange:a=>o("password",a.target.value),required:!0}),e(c,{message:l.password,className:"mt-2"})]})]}),e(N,{processing:h,children:"Update DB connection"})]})})]})]})}export{A as default};
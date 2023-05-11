import{A as g}from"./AuthenticatedLayout-c4be06bd.js";import{u as m,b as h,j as t,a as e,H as f}from"./app-a8d4275f.js";import{I as i}from"./InputLabel-a7ee92ff.js";import{T as x,I as v}from"./TextInput-1e9aadbd.js";import{P as b}from"./PrimaryButton-19cc4f5a.js";import{B as C}from"./BackButton-2b60c346.js";import{R as N}from"./Alert-d503f44b.js";import{S as y}from"./Toast-ee00046f.js";import"./Table-f19b692a.js";import"./ApplicationLogo-ae419612.js";import"./transition-fbe58e1e.js";import"./index.esm-2010c99b.js";function q({auth:s}){const n=m().props.alert,l=m().props.commands,{data:o,setData:r,post:d,processing:c,reset:w,errors:p}=h({command_id:"",title:""}),u=a=>{a.preventDefault(),d(route("command-group.store")),navigate(route("command-group.index"))};return t(g,{auth:s,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Create a command group"}),children:[e(f,{title:"Create command group"}),t("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(C,{href:route("command-group.index"),children:"Back to command groups"})}),e(N,{details:n}),e("section",{className:"bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6",children:t("form",{onSubmit:u,children:[t("div",{className:"grid gap-2 sm:grid-cols-1 md:grid-cols-4 sm:gap-4",children:[t("div",{className:"sm:col-span-2 col-span-4",children:[e("div",{className:"mb-2 block",children:e(i,{forInput:"command_id",value:"Command"})}),t(y,{onChange:a=>r("command_id",a.target.value),name:"command_id",required:!0,value:o.command_id,handleChange:a=>r("command_id",a.target.value),children:[e("option",{value:"",children:"Choose one"}),l.map(a=>e("option",{value:a.id,children:a.title},a.id))]})]}),t("div",{className:"sm:col-span-2 col-span-4",children:[e(i,{forInput:"title",value:"Command group title"}),e(x,{name:"title",className:"mt-1 block w-full",autoComplete:"title",value:o.title,handleChange:a=>r("title",a.target.value)}),e(v,{message:p.title,className:"mt-2"})]})]}),e(b,{className:"inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800",processing:c,children:"Create command group"})]})})]})]})}export{q as default};
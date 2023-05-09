import{A as o}from"./AuthenticatedLayout-e0b7f8ec.js";import{u as s,j as t,a as e,H as l}from"./app-3b14edf2.js";import"./Toast-1f814f61.js";import"./Table-29b362e9.js";import{C as i}from"./Card-edd712ec.js";import{R as n}from"./Alert-10dd726c.js";import{R as c}from"./ResourceEmptyText-c0a0960b.js";import{A as p}from"./AddButton-882fb209.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";import"./index.esm-b46f3593.js";function j({auth:m}){const d=s().props.alert,a=s().props.groups;return t(o,{auth:m,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Command groups"}),children:[e(l,{title:"Command groups"}),t("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(p,{href:route("command-group.create"),children:"Add command group"})}),e(n,{details:d}),e("div",{className:"grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4",children:a.length===0?e(c,{resource:"command groups"}):a.map(r=>t(i,{href:route("command-group.show",r.id),className:"dark:bg-gray-700 hover:dark:bg-gray-900",children:[e("div",{className:"flex justify-end px-1",children:e("span",{className:"bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300",children:(()=>r.server_count!==null?r.server_count===1?r.server_count+" server":r.server_count+" servers":"No servers")()})}),t("div",{className:"flex flex-col justify-center items-center pb-3",children:[e("h5",{className:"mb-1 lg font-medium text-gray-900 dark:text-white",children:r.title}),e("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:r.the_command.title})]})]},r.id))})]})]})}export{j as default};
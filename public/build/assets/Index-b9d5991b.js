import{A as o}from"./AuthenticatedLayout-e0b7f8ec.js";import{u as s,j as a,a as e,H as d}from"./app-3b14edf2.js";import{m,k as l}from"./index.esm-b46f3593.js";import{R as c}from"./ResourceEmptyText-c0a0960b.js";import{R as p}from"./Alert-10dd726c.js";import{A as x}from"./AddButton-882fb209.js";import{T as h}from"./TealButton-f25041ad.js";import{I as g}from"./IndigoButton-18e459e1.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";import"./Toast-1f814f61.js";import"./Table-29b362e9.js";function B({auth:n}){const i=s().props.alert,r=s().props.databases;return a(o,{auth:n,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Databases"}),children:[e(d,{title:"Databases"}),a("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[a("div",{className:"flex flex-wrap gap-2 mb-4",children:[e(x,{href:route("db.create"),children:"Add database"}),a(h,{href:route("db.connection.index"),children:[e(m,{className:"mr-2 h-5 w-5"})," Database connections"]}),a(g,{href:route("mysqldump.index"),children:[e(l,{className:"mr-2 h-5 w-5"})," MySQLdump"]})]}),e(p,{details:i}),e("div",{className:"grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4",children:r.length>0?r.map(t=>e("section",{className:"bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer",onClick:u=>window.location.href=route("db.show",t.id),children:a("div",{className:"md:py-2 py-4 px-2 mx-auto max-w-6xl",children:[a("div",{className:"flex items-center justify-between mb-3",children:[a("div",{children:[e("span",{className:"bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300",children:t.conn.type===1?"MySQL":"Other"}),t.conn.version!==null?e("span",{className:"bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300",children:t.conn.version}):null]}),e("small",{className:"text-end"})]}),a("div",{className:"flex flex-col items-center pb-3",children:[e("h5",{className:"mb-1 text-xl font-medium text-gray-900 dark:text-white",children:t.name}),a("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:[t.conn.username,"@",t.conn.host]})]})]})},t.id)):e(c,{resource:"databases"})})]})]})}export{B as default};

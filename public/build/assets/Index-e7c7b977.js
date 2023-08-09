import{A as o}from"./AuthenticatedLayout-c4be06bd.js";import{r as d,a as e,F as m,u as l,j as a,H as c}from"./app-a8d4275f.js";import{R as p}from"./Alert-d503f44b.js";import{A as x}from"./AddButton-35ed8727.js";import{a as u}from"./axios-4a70c6fc.js";import{F as g}from"./index.esm-6d0014d4.js";import{R as h}from"./ResourceEmptyText-f0a77405.js";import"./ApplicationLogo-ae419612.js";import"./transition-fbe58e1e.js";import"./Toast-ee00046f.js";import"./Table-f19b692a.js";import"./index.esm-2010c99b.js";function f({resource:i}){const[r,s]=d.useState(null);async function t(n){return await(await u.get(route("check-is-up",n.id))).data}return d.useEffect(()=>{t(i).then(n=>{s(n.is_up)})},[]),e(m,{children:e(g,{className:(()=>r?"md:ml-2 ml-1 h-3 w-3 text-green-300 dark:text-green-400 inline":r===null?"md:ml-2 ml-1 h-3 w-3 text-gray-300 dark:text-gray-500 inline":"md:ml-2 ml-1 h-3 w-3 text-red-300 dark:text-red-400 inline")(),title:(()=>r?"online":r===null?"unknown":"offline")()})})}function U(){const i=l().props.alert,r=l().props.auth,s=l().props.servers;return a(o,{auth:r,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Servers"}),children:[e(c,{title:"Servers"}),a("div",{className:"py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(x,{href:route("server.create"),children:"Add a server"})}),e(p,{details:i}),e("div",{className:"grid gap-2 grid-cols-1 sm:grid-cols-4 sm:gap-4",children:s.length===0?e(h,{resource:"servers"}):s.map(t=>e("section",{className:"bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm hover:cursor-pointer",onClick:n=>window.location.href=route("server.show",t.id),children:a("div",{className:"md:py-2 py-4 px-2 mx-auto max-w-6xl",children:[a("div",{className:"flex items-center justify-between mb-3",children:[a("div",{children:["            ",t.operating_system!==null?e("span",{className:"bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300",children:t.operating_system}):null,e("span",{className:"bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300",children:t.type.name}),(()=>{if(t.conn===null)return e("span",{className:"bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300",children:"No connection"})})()]}),e("small",{className:"text-end",children:e(f,{resource:t})})]}),a("div",{className:"flex flex-col items-center pb-3",children:[e("h5",{className:"mb-1 text-xl font-medium text-gray-900 dark:text-white",children:t.hostname}),e("span",{className:"text-sm text-gray-500 dark:text-gray-400",children:t.title})]})]})},t.id))})]})]})}export{U as default};

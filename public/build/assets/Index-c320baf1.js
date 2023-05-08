import{A as u}from"./AuthenticatedLayout-e0b7f8ec.js";import{u as l,r as f,j as a,a as e,H as p}from"./app-3b14edf2.js";import{s as x,G as i,g as y,a as w}from"./gridJsConfig-b29e7932.js";import{R as N}from"./ResourceEmptyText-c0a0960b.js";import{M as d,B as n}from"./Toast-1f814f61.js";import"./Table-29b362e9.js";import{H as v}from"./index.esm-b46f3593.js";import{R as k}from"./Alert-10dd726c.js";import{f as b}from"./index-a84c5b70.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";function I({auth:m}){const c=l().props.alert,r=l().props.logs,[h,s]=f.useState(!1),g=()=>{const t={method:"DELETE",headers:{"X-CSRF-TOKEN":document.getElementsByName("csrf-token")[0].getAttribute("content")}};fetch(route("log.destroy-all"),t).then(o=>{o.redirected&&(window.location.href=o.url)})};return a(u,{auth:m,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Action logs"}),children:[e(p,{title:"Action logs"}),a("div",{className:"py-8 px-1 mx-auto max-w-7xl lg:py-10",children:[e(k,{details:c}),r.length===0?e(N,{className:"ml-2 pb-4",resource:"action logs"}):a("section",{className:"pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg",children:[a("div",{className:"flex items-center justify-between mb-4",children:[e("div",{}),e("small",{className:"text-end",children:r.length>0?e(v,{className:"mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:()=>s(!0),title:"Delete ALL logs"}):e("div",{})})]}),e(x,{data:r,columns:[{id:"id",name:"Hostname",sort:!1,data:t=>t.server?i(`<a class="" href='${route("server.show",t.server.id)}'>${t.server.hostname}</a>`):null},{id:"action",name:"Action",sort:!0},{id:"resource_type",name:"Resource",sort:!1},{id:"message",name:"Message",sort:!1},{id:"id",name:"View",data:t=>i(`<a class="text-blue-700 dark:text-blue-400" href='${route("log.show",t.id)}'>View</a>`)},{id:"created_at",name:"Datetime",sort:!0,formatter:t=>b(new Date(t),"yyyy-MM-dd HH:mm:ss")}],search:!0,className:y,pagination:w})]})]}),e(d,{show:h,size:"md",children:e(d.Body,{children:a("div",{className:"text-center",children:[e("h3",{className:"mb-5 text-lg font-normal text-gray-500 dark:text-gray-400",children:"Are you sure you want to delete all logs?"}),a("div",{className:"flex justify-center gap-4",children:[e(n,{color:"failure",onClick:g,children:"Yes, I'm sure"}),e(n,{onClick:()=>s(!1),color:"gray",children:"No, cancel"})]})]})})})]})}export{I as default};

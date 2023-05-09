import{A as g}from"./AuthenticatedLayout-b0ac98cc.js";import{u as l,r as p,j as t,a as e,H as f}from"./app-7082a047.js";import{M as s,B as i}from"./Toast-a9c7a83a.js";import"./Table-13305096.js";import{H as u,k as w,o as y}from"./index.esm-eebfcfab.js";import{R as v}from"./Alert-af0dbb46.js";import{C as N}from"./CreatedAtText-a1e22ba4.js";import{B as k}from"./BackButton-c0685269.js";import{n}from"./helpers-2aabf79e.js";import"./ApplicationLogo-db4f8950.js";import"./transition-eb04b526.js";import"./index-9b0dda6f.js";function L({auth:c}){const m=l().props.alert,a=l().props.resource,[h,o]=p.useState(!1),x=()=>{const r={method:"DELETE",headers:{"X-CSRF-TOKEN":document.getElementsByName("csrf-token")[0].getAttribute("content")}};fetch(route("downloaded.destroy",a.id),r).then(d=>{d.redirected&&(window.location.href=d.url)})};return t(g,{auth:c,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"File "+a.saved_as}),children:[e(f,{title:"File "+a.saved_as}),t("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(k,{href:route("downloaded.index"),children:"Back to downloaded"})}),e(v,{details:m}),e("section",{className:"bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm",children:t("div",{className:"py-4 px-4 mx-auto max-w-7xl",children:[t("div",{className:"flex items-center justify-between",children:[t("div",{children:[t("span",{className:"bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300",children:["Size ",n(a.size/1e3/1e3)," MB"]}),t("span",{className:"ml-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300",children:["DL speed ",n(a.speed_mbps)," Mbps"]})]}),t("small",{className:"text-sm text-gray-700",children:[e(u,{className:"mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:()=>o(!0),title:"Delete file"}),e(w,{className:"md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:r=>window.location.href=route("downloaded.download",a.id),title:"Download file through browser"}),e(y,{className:"md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:r=>window.location.href=route("downloaded.upload.form",a.id),title:"Upload file to another SFTP"})]})]}),t("div",{className:"grid grid-cols-2",children:[e("div",{className:"md:col-span-1 col-span-2",children:e("h2",{className:"mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white",children:a.saved_as})}),e("div",{className:"md:col-span-1 col-span-2",children:t("p",{className:"mt-4 mb-4 text-lg font-bold leading-none text-gray-600 md:text-lg dark:text-gray-400",children:["Downloaded from ",t("span",{className:"text-gray-700 dark:text-gray-300",children:[a.conn.server.hostname," ",a.from_dir,"/",a.filename]})]})})]}),t("div",{className:"grid md:grid-cols-2 grid-cols-1",children:[e("div",{className:"col-span-1",children:e(N,{created_at:a.created_at,string_format:"hh:mm:ssa do LLL yyyy",pre_text:"Downloaded: "})}),e("div",{className:"col-span-1"})]})]})})]}),e(s,{show:h,size:"md",children:e(s.Body,{children:t("div",{className:"text-center",children:[e("h3",{className:"mb-5 text-lg font-normal text-gray-500 dark:text-gray-400",children:"Are you sure you want to delete this File?"}),t("div",{className:"flex justify-center gap-4",children:[e(i,{color:"failure",onClick:x,children:"Yes, I'm sure"}),e(i,{onClick:()=>o(!1),color:"gray",children:"No, cancel"})]})]})})})]})}export{L as default};

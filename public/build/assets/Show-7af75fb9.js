import{A as x}from"./AuthenticatedLayout-c4be06bd.js";import{u as s,r as g,j as a,a as e,H as p}from"./app-a8d4275f.js";import{M as l,B as o}from"./Toast-ee00046f.js";import"./Table-f19b692a.js";import{H as y,a as f,e as u,z as N}from"./index.esm-2010c99b.js";import{R as b}from"./Alert-d503f44b.js";import{C as v}from"./CreatedAtText-a06948df.js";import{U as w}from"./UpdatedAtText-9a96553e.js";import{B as k}from"./BackButton-2b60c346.js";import"./ApplicationLogo-ae419612.js";import"./transition-fbe58e1e.js";import"./index-9b0dda6f.js";function S({auth:n}){const c=s().props.alert,t=s().props.resource,[m,i]=g.useState(!1),h=()=>{const r={method:"DELETE",headers:{"X-CSRF-TOKEN":document.getElementsByName("csrf-token")[0].getAttribute("content")}};fetch(route("ip.destroy",t.id),r).then(d=>{d.redirected&&(window.location.href=d.url)})};return a(x,{auth:n,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"IP "+t.ip}),children:[e(p,{title:"IP "+t.ip}),a("div",{className:"py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(k,{href:route("ip.index"),children:"Back to IPs"})}),e(b,{details:c}),e("section",{className:"bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm",children:a("div",{className:"py-4 px-4 mx-auto max-w-7xl",children:[a("div",{className:"flex items-center justify-between",children:[e("span",{className:"bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300",children:t.is_ipv4===1?"IPv4":"IPv6"}),a("small",{className:"text-end",children:[e(y,{className:"mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:()=>i(!0),title:"Delete IP address"}),e(f,{className:"md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:r=>window.location.href=route("ip.edit",t.id),title:"Edit IP address"}),e(u,{className:"md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:r=>window.location.href=route("server.show",t.server.id),title:"Go to server"})]})]}),a("div",{className:"grid md:grid-cols-2 grid-cols-1",children:[a("div",{className:"md:col-span-1 col-span-2",children:[a("h2",{className:"mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white",children:[t.ip," ",e(N,{className:"mr-4 mb-1 h-5 w-5 inline hover:cursor-grab text-gray-500 dark:text-gray-300",onClick:()=>{navigator.clipboard.writeText(t.ip)},title:"Copy IP"})]}),a("p",{className:"mb-4 text-xl font-bold leading-none text-gray-800 md:text-2xl dark:text-gray-300",children:[t.server.hostname," (",t.server.title,")"]}),a("p",{className:"mb-4 text-lg font-bold leading-none text-gray-700 md:text-xl dark:text-gray-300",children:[t.asn," ",t.org]})]}),e("div",{className:"md:col-span-1 col-span-2 md:mt-4",children:a("dl",{className:"flex space-x-2 sm:space-x-10",children:[a("div",{children:[e("dt",{className:"mb-2 font-semibold leading-none text-gray-900 dark:text-white",children:"Country"}),e("dd",{className:"mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400",children:t.country})]}),a("div",{children:[e("dt",{className:"mb-2 font-semibold leading-none text-gray-900 dark:text-white",children:"City"}),e("dd",{className:"mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400",children:t.city})]}),a("div",{children:[e("dt",{className:"mb-2 font-semibold leading-none text-gray-900 dark:text-white",children:"Continent"}),e("dd",{className:"mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400",children:t.continent})]}),a("div",{children:[e("dt",{className:"mb-2 font-semibold leading-none text-gray-900 dark:text-white",children:"GMT"}),e("dd",{className:"mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400",children:t.timezone_gmt})]})]})})]}),a("div",{className:"grid md:grid-cols-2 grid-cols-1",children:[e("div",{className:"col-span-1",children:e(v,{created_at:t.created_at,string_format:"hh:mm:ssa do LLL yyyy"})}),e("div",{className:"col-span-1",children:e(w,{updated_at:t.updated_at,string_format:"hh:mm:ssa do LLL yyyy"})})]})]})})]}),e(l,{show:m,size:"md",children:e(l.Body,{children:a("div",{className:"text-center",children:[e("h3",{className:"mb-5 text-lg font-normal text-gray-500 dark:text-gray-400",children:"Are you sure you want to delete this IP address?"}),a("div",{className:"flex justify-center gap-4",children:[e(o,{color:"failure",onClick:h,children:"Yes, I'm sure"}),e(o,{onClick:()=>i(!1),color:"gray",children:"No, cancel"})]})]})})})]})}export{S as default};

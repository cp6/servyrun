import{A as u}from"./AuthenticatedLayout-e0b7f8ec.js";import{u as a,r as v,j as t,a as e,H as x}from"./app-3b14edf2.js";import{s as _,G as i,g as b,a as y}from"./gridJsConfig-b29e7932.js";import{R as N}from"./Alert-10dd726c.js";import{B as w}from"./BackButton-d8b9f37c.js";import{T as P}from"./TealButton-f25041ad.js";import{a as k}from"./axios-468742d6.js";import{b as A}from"./index.esm-b46f3593.js";import{f as B}from"./index-a84c5b70.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";import"./Toast-1f814f61.js";import"./Table-29b362e9.js";function z({auth:n}){const m=a().props.alert,s=a().props.pings,d=a().props.minPing,l=a().props.maxPing,c=a().props.avgPing,h=a().props.auth.user,[p,o]=v.useState(!1),g=()=>{o(!0);const r={headers:{Authorization:`Bearer ${h.api_token}`}};k.get(route("run.ping-from-to",[s[0].from_server.id,s[0].to_server.id]),r).then(f=>{window.location.reload()}).catch(f=>{console.log("Error running ping"),o(!1)})};return t(u,{auth:n,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Pings from "+s[0].from_server.hostname+" to "+s[0].to_server.hostname}),children:[e(x,{title:"Pings from "+s[0].from_server.hostname+" to "+s[0].to_server.hostname}),t("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[t("div",{className:"flex flex-wrap gap-2 mb-4",children:[e(w,{href:route("ping.index"),children:"Pings"}),t(P,{onClick:g,disabled:p,children:[e(A,{className:"mr-2 h-5 w-5"}),"Run this ping"]})]}),e(N,{details:m}),t("div",{className:"grid grid-cols-2 pb-2",children:[e("div",{className:"col md:col-span-1 col-span-2",children:t("h2",{className:"font-medium text-gray-900 dark:text-gray-300",children:["From: ",e("b",{children:e("a",{href:route("ip.show",s[0].from_server.ip_ssh.id),children:s[0].from_server.ip_ssh.ip})})," To: ",e("b",{children:e("a",{href:route("ip.show",s[0].to_server.ip_ssh.id),children:s[0].to_server.ip_ssh.ip})})]})}),e("div",{className:"col md:col-span-1 col-span-2 md:text-end",children:t("h2",{className:"font-medium text-gray-900 dark:text-gray-300",children:["Average: ",e("b",{children:new Intl.NumberFormat("en-IN",{maximumSignificantDigits:6}).format(c)})," Lowest: ",e("b",{children:d})," Highest: ",e("b",{children:l})]})})]}),e("section",{className:"pt-4 shadow-md dark:shadow-md bg-white/50 dark:bg-gray-700 dark:shadow rounded-lg",children:s.length===0?e("h2",{className:"text-md p-2 font-semibold leading-none text-yellow-500 md:text-lg dark:text-yellow-400",children:"No pings yet"}):e(_,{data:s,columns:[{id:"from_server_id",name:"From",sort:!1,data:r=>r.from_server?i(`<a href='${route("server.show",r.from_server.id)}'>${r.from_server.hostname}</a>`):null},{id:"server_id",name:"To",sort:!0,data:r=>r.to_server?i(`<a href='${route("server.show",r.to_server.id)}'>${r.to_server.hostname}</a>`):null},{id:"was_up",name:"Up",sort:!0,formatter:r=>r===1?"Y":"N"},{id:"avg",name:"AVG",sort:!0},{id:"min",name:"MIN",sort:!0},{id:"max",name:"MAX",sort:!0},{id:"created_at",name:"Datetime",sort:!0,formatter:r=>B(new Date(r),"yyyy-MM-dd HH:mm:ss")}],search:!1,className:b,pagination:y})})]})]})}export{z as default};

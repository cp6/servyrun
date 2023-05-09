import{A as B}from"./AuthenticatedLayout-e0b7f8ec.js";import{j as r,a as e,u as p,r as v,b as E,H as z}from"./app-3b14edf2.js";import{I as o}from"./InputLabel-8665140f.js";import{T as l,I as i}from"./TextInput-edb2b3ad.js";import{S as P,M as b,B as y}from"./Toast-1f814f61.js";import"./Table-29b362e9.js";import{H as D,j as S}from"./index.esm-b46f3593.js";import{U as T}from"./UpdateButton-980ba00c.js";import{B as j}from"./BackButton-d8b9f37c.js";import{R as q}from"./Alert-10dd726c.js";import{T as A}from"./TealButton-f25041ad.js";import{a as H}from"./axios-468742d6.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";function R({className:d="",disabled:m,children:u,onClick:a}){return r("button",{onClick:a,className:"text-white bg-red-600 border border-transparent hover:bg-red-700 focus:ring-4 focus:ring-red-300 disabled:hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dark:disabled:hover:bg-red-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5 text-center"+d,disabled:m,children:[e(D,{className:"mr-2 h-5 w-5"}),u]})}function $({auth:d}){const m=p().props.alert,u=p().props.servers,a=p().props.resource,[N,h]=v.useState(!1),[x,g]=v.useState(!1),{data:c,setData:s,patch:w,processing:k,errors:n}=E({ip:a.ip,asn:a.asn,org:a.org,isp:a.isp,timezone_gmt:a.timezone_gmt,country:a.country,city:a.city,continent:a.continent,server_id:a.server_id?a.server_id:null}),C=t=>{t.preventDefault(),w(route("ip.update",a.id)),navigate(route("ip.show",a.id))},I=()=>{const t={method:"DELETE",headers:{"X-CSRF-TOKEN":document.getElementsByName("csrf-token")[0].getAttribute("content")}};fetch(route("ip.destroy",a.id),t).then(f=>{f.redirected&&(window.location.href=f.url)})},_=()=>{g(!0),H.get(route("ip.geo.update",a.id)).then(t=>{window.location.reload()}).catch(t=>{console.log("Error fetching data"),g(!1)})};return r(B,{auth:d,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Edit IP address"}),children:[e(z,{title:"Edit IP"}),r("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[r("div",{className:"flex flex-wrap gap-2 mb-4",children:[e(j,{href:route("ip.show",a.id),children:"Back to IP"}),r(A,{onClick:_,disabled:x,children:[e(S,{className:"mr-2 h-5 w-5"}),"Refresh GEO IP"]}),e(R,{onClick:()=>h(!0),children:"Delete IP"})]}),e(q,{details:m}),e("section",{className:"bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6",children:r("form",{onSubmit:C,children:[r("div",{className:"grid gap-2 sm:grid-cols-2 sm:gap-4",children:[r("div",{className:"col-span-2",children:[e("div",{className:"mb-2 block",children:e(o,{forInput:"server_id",value:"Server"})}),r(P,{onChange:t=>s("server_id",t.target.value),name:"server_id",required:!0,value:a.server_id?a.server_id:null,handleChange:t=>s("server_id",t.target.value),children:[e("option",{value:"",children:"Choose"}),u.map(t=>r("option",{value:t.id,children:[t.hostname," (",t.title,")"]},t.id))]})]}),r("div",{children:[e(o,{forInput:"ip",value:"IP"}),e(l,{name:"ip",value:c.ip||"",className:"mt-1 block w-full",autoComplete:"ip",handleChange:t=>s("ip",t.target.value),required:!0}),e(i,{message:n.ip,className:"mt-2"})]}),r("div",{children:[e(o,{forInput:"asn",value:"asn"}),e(l,{name:"asn",className:"mt-1 block w-full",autoComplete:"asn",value:c.asn||"",handleChange:t=>s("asn",t.target.value),required:!0}),e(i,{message:n.asn,className:"mt-2"})]}),r("div",{children:[e(o,{forInput:"org",value:"org"}),e(l,{name:"org",className:"mt-1 block w-full",autoComplete:"org",value:a.org||"",handleChange:t=>s("org",t.target.value),required:!0}),e(i,{message:n.org,className:"mt-2"})]}),r("div",{children:[e(o,{forInput:"isp",value:"isp"}),e(l,{name:"isp",className:"mt-1 block w-full",autoComplete:"isp",value:c.isp||"",handleChange:t=>s("isp",t.target.value)}),e(i,{message:n.isp,className:"mt-2"})]}),r("div",{children:[e(o,{forInput:"timezone_gmt",value:"timezone_gmt"}),e(l,{name:"timezone_gmt",className:"mt-1 block w-full",autoComplete:"timezone_gmt",value:c.timezone_gmt||"",handleChange:t=>s("timezone_gmt",t.target.value)}),e(i,{message:n.timezone_gmt,className:"mt-2"})]}),r("div",{children:[e(o,{forInput:"country",value:"country"}),e(l,{name:"country",className:"mt-1 block w-full",autoComplete:"country",value:c.country||"",handleChange:t=>s("country",t.target.value)}),e(i,{message:n.country,className:"mt-2"})]}),r("div",{children:[e(o,{forInput:"city",value:"city"}),e(l,{name:"city",className:"mt-1 block w-full",autoComplete:"city",value:c.city||"",handleChange:t=>s("city",t.target.value)}),e(i,{message:n.cpu_freq,className:"mt-2"})]}),r("div",{children:[e(o,{forInput:"continent",value:"continent"}),e(l,{name:"continent",className:"mt-1 block w-full",autoComplete:"continent",value:c.continent||"",handleChange:t=>s("continent",t.target.value)}),e(i,{message:n.disk_gb,className:"mt-2"})]}),e("div",{})]}),e(T,{processing:k,children:"Update IP"})]})})]}),e(b,{show:N,size:"md",children:e(b.Body,{children:r("div",{className:"text-center",children:[e("h3",{className:"mb-5 text-lg font-normal text-gray-500 dark:text-gray-400",children:"Are you sure you want to delete this IP address?"}),r("div",{className:"flex justify-center gap-4",children:[e(y,{color:"failure",onClick:I,children:"Yes, I'm sure"}),e(y,{onClick:()=>h(!1),color:"gray",children:"No, cancel"})]})]})})})]})}export{$ as default};
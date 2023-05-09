import{A}from"./AuthenticatedLayout-e0b7f8ec.js";import{u as B,b as P,j as s,a as e,H as T}from"./app-3b14edf2.js";import{I as n}from"./InputLabel-8665140f.js";import{T as o,I as i}from"./TextInput-edb2b3ad.js";import{B as d,S as g}from"./Toast-1f814f61.js";import"./Table-29b362e9.js";import{P as q}from"./PrimaryButton-28166509.js";import{R as H}from"./Alert-10dd726c.js";import{B as j}from"./BackButton-d8b9f37c.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";import"./index.esm-b46f3593.js";function X({auth:p,types:h,locations:v,title:b}){const c=B().props.alert,{data:l,setData:t,post:f,processing:N,reset:E,errors:m}=P({title:b,hostname:"",server_type:"1",location:"",ip:"",os:"",cpu:"",cpu_cores:"",cpu_freq:"",disk_gb:"",disk_tb:"",ram_mb:"",ram_gb:"",swap:"",ping_port:"80"}),_=a=>{a.preventDefault(),f(route("server.store")),navigate(route("server.index"))};async function u(a="A"){return(await fetch(route("domain-for-ip",[l.hostname,a]),{method:"GET",headers:{Authorization:"Bearer "+p.user.api_token,"X-CSRF-TOKEN":document.getElementsByName("csrf-token")[0].getAttribute("content"),"Content-Type":"application/json",Accept:"application/json"}})).json()}const k=()=>{l.hostname!==""&&(u("A").then(a=>{typeof a.ip<"u"&&a.ip!==null&&t("ip",a.ip)}),c("NOTE: If this hostname is behind Cloudflare this IP may be wrong"))},C=()=>{l.hostname!==""&&(u("AAAA").then(a=>{typeof a.ip<"u"&&a.ip!==null&&t("ip",a.ip)}),c("NOTE: If this hostname is behind Cloudflare this IP may be wrong"))},I=a=>{t(r=>({...r,disk_tb:parseInt(a.target.value)/1024})),t(r=>({...r,disk_gb:a.target.value}))},y=a=>{t(r=>({...r,disk_gb:parseInt(a.target.value)*1024})),t(r=>({...r,disk_tb:a.target.value}))},w=a=>{t(r=>({...r,ram_gb:parseInt(a.target.value)/1024})),t(r=>({...r,ram_mb:a.target.value}))},x=a=>{t(r=>({...r,ram_mb:parseInt(a.target.value)*1024})),t(r=>({...r,ram_gb:a.target.value}))};return s(A,{auth:p,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Create server"}),children:[e(T,{title:"Create server"}),s("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(j,{href:route("server.index"),children:"Back to servers"})}),e(H,{details:c}),e("div",{className:"bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6",children:s("form",{onSubmit:_,children:[s("div",{className:"grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4",children:[s("div",{className:"sm:col-span-3 col-span-4",children:[e(n,{forInput:"hostname",value:"Hostname"}),e(o,{name:"hostname",value:l.hostname,className:"mt-1 block w-full",autoComplete:"hostname",handleChange:a=>t("hostname",a.target.value),maxLength:64,required:!0}),e(i,{message:m.hostname,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-4",children:[e(n,{value:"Auto fill IP"}),s("div",{className:"flex items-center space-x-4",children:[e(d,{color:"light",size:"xs",onClick:k,type:"button",children:"IPv4"}),e(d,{color:"light",size:"xs",onClick:C,type:"button",children:"Ipv6"})]})]}),s("div",{className:"sm:col-span-2 col-span-4",children:[e(n,{forInput:"title",value:"Title"}),e(o,{name:"title",className:"mt-1 block w-full",autoComplete:"title",value:l.title,handleChange:a=>t("title",a.target.value),maxLength:64,required:!0}),e(i,{message:m.title,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-4",children:[e("div",{className:"mb-2 block",children:e(n,{forInput:"server_type",value:"Type"})}),s(g,{onChange:a=>t("server_type",a.target.value),name:"server_type",required:!0,value:l.server_type,children:[e("option",{value:"",children:"Choose"}),h.map(a=>e("option",{value:a.id,children:a.name},a.id))]})]}),s("div",{className:"sm:col-span-2 col-span-4",children:[e("div",{className:"mb-2 block",children:e(n,{forInput:"location",value:"Location"})}),s(g,{onChange:a=>t("location",a.target.value),name:"location",required:!0,value:l.location,children:[e("option",{value:"",children:"Choose"}),v.map(a=>e("option",{value:a.id,children:a.name},a.id))]})]}),s("div",{className:"sm:col-span-2 col-span-3",children:[e(n,{forInput:"ip",value:"Main IP address"}),e(o,{name:"ip",className:"mt-1 block w-full",autoComplete:"ip",value:l.ip,handleChange:a=>t("ip",a.target.value),required:!0}),e(i,{message:m.ip,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-1",children:[e(n,{forInput:"ping_port",value:"Ping port"}),e(o,{type:"number",name:"ping_port",className:"mt-1 block w-full",autoComplete:"ping_port",value:l.ping_port,handleChange:a=>t("ping_port",a.target.value)}),e(i,{message:m.ping_port,className:"mt-2"})]}),e("div",{className:"text-center mt-2 sm:col-span-6 col-span-4",children:e("p",{className:"text-gray-400 dark:text-gray-300",children:"The following can be auto filled with the server connection"})}),s("div",{className:"sm:col-span-2 col-span-4",children:[e(n,{forInput:"os",value:"Operating system"}),e(o,{name:"os",className:"mt-1 block w-full",autoComplete:"os",value:l.os,handleChange:a=>t("os",a.target.value),maxLength:64}),e(i,{message:m.os,className:"mt-2"})]}),s("div",{className:"sm:col-span-2 col-span-2",children:[e(n,{forInput:"cpu",value:"CPU"}),e(o,{name:"cpu",className:"mt-1 block w-full",autoComplete:"cpu",value:l.cpu,handleChange:a=>t("cpu",a.target.value)}),e(i,{message:m.cpu,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-2",children:[e(n,{forInput:"cpu_cores",value:"CPU Cores"}),e(o,{type:"number",name:"cpu_cores",className:"mt-1 block w-full",autoComplete:"cpu_cores",value:l.cpu_cores,handleChange:a=>t("cpu_cores",a.target.value)}),e(i,{message:m.cpu_cores,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-2",children:[e(n,{forInput:"cpu_freq",value:"CPU Freq"}),e(o,{type:"number",step:"0.01",name:"cpu_freq",className:"mt-1 block w-full",autoComplete:"title"}),e(i,{message:m.cpu_freq,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-2",children:[e(n,{forInput:"disk_gb",value:"Disk GB"}),e(o,{type:"number",name:"disk_gb",className:"mt-1 block w-full",autoComplete:"disk_gb",value:l.disk_gb,handleChange:I}),e(i,{message:m.disk_gb,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-2",children:[e(n,{forInput:"disk_tb",value:"Disk TB"}),e(o,{type:"number",name:"disk_tb",className:"mt-1 block w-full",autoComplete:"disk_tb",value:l.disk_tb,handleChange:y}),e(i,{message:m.disk_tb,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-2",children:[e(n,{forInput:"ram_mb",value:"RAM MB"}),e(o,{type:"number",step:"1",name:"ram_mb",className:"mt-1 block w-full",autoComplete:"ram_mb",value:l.ram_mb,handleChange:w}),e(i,{message:m.ram_mb,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-2",children:[e(n,{forInput:"ram_gb",value:"RAM GB"}),e(o,{type:"number",step:"1",name:"ram_gb",className:"mt-1 block w-full",autoComplete:"ram_gb",value:l.ram_gb,handleChange:x}),e(i,{message:m.ram_gb,className:"mt-2"})]}),s("div",{className:"sm:col-span-1 col-span-2",children:[e(n,{forInput:"swap",value:"SWAP MB"}),e(o,{type:"number",step:"1",name:"swap",className:"mt-1 block w-full",autoComplete:"swap",value:l.ram,handleChange:a=>t("swap",a.target.value)}),e(i,{message:m.swap,className:"mt-2"})]})]}),e(q,{className:"inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800",processing:N,children:"Create Server"})]})})]})]})}export{X as default};
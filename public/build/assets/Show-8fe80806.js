import{A as p}from"./AuthenticatedLayout-e0b7f8ec.js";import{r as i,a as e,F as f,u as h,j as r,H as y}from"./app-3b14edf2.js";import{M as x,B as u}from"./Toast-1f814f61.js";import"./Table-29b362e9.js";import{h as w,H as k,a as b,i as v}from"./index.esm-b46f3593.js";import{R as N}from"./Alert-10dd726c.js";import{a as g}from"./axios-468742d6.js";import{B}from"./BackButton-d8b9f37c.js";import{C}from"./CreatedAtText-569a5c4f.js";import{U as L}from"./UpdatedAtText-53995cea.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";import"./index-a84c5b70.js";function S({resource:s}){const[n,t]=i.useState(null),[l,d]=i.useState("Check if can connect"),c=()=>{g.get(route("db.connection.connect",s.id)).then(a=>{t(a.data.result)}).catch(a=>{t(!n)})};return e(f,{children:e(w,{className:(()=>n?"md:ml-3 ml-2 h-6 w-6 text-green-500 dark:text-green-400 inline hover:cursor-pointer":n===null?"md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer":"md:ml-3 ml-2 h-6 w-6 text-red-500 dark:text-red-400 inline hover:cursor-pointer")(),onClick:c,title:l})})}function P({auth:s}){const n=h().props.alert,t=h().props.resource,[l,d]=i.useState(!1);i.useState(null);const c=()=>{const o={method:"DELETE",headers:{"X-CSRF-TOKEN":document.getElementsByName("csrf-token")[0].getAttribute("content")}};fetch(route("db.connection.destroy",t.id),o).then(m=>{m.redirected&&(window.location.href=m.url)})},a=()=>{g.get(route("db.connection.version",t.id)).then(o=>{window.location.reload()}).catch(o=>{console.log("Error getting version")})};return r(p,{auth:s,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"DB connections"}),children:[e(y,{title:"DB connection"}),r("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(B,{href:route("db.connection.index"),children:"Back to DB connections"})}),e(N,{details:n}),e("section",{className:"bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm",children:r("div",{className:"py-4 px-4 mx-auto max-w-7xl",children:[r("div",{className:"flex items-center justify-between",children:[r("div",{children:["           ",e("span",{className:"bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300",children:t.type===1?"MySQL":"Other"}),t.version!==null?e("span",{className:"bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300",children:t.version}):null]}),r("small",{className:"text-end",children:[e(k,{className:"mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:()=>d(!0),title:"Delete database connection"}),e(b,{className:"md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:o=>window.location.href=route("db.connection.edit",t.id),title:"Edit database connection"}),e(v,{className:"md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:a,title:"Get database version"}),e(S,{resource:t})]})]}),e("h2",{className:"mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white",children:t.host}),e("p",{className:"mb-4 text-xl font-bold leading-none text-gray-600 md:text-xl dark:text-gray-300",children:t.title}),r("div",{className:"grid md:grid-cols-2 grid-cols-1",children:[e("div",{className:"col-span-1",children:e(C,{created_at:t.created_at,string_format:"hh:mm:ssa do LLL yyyy"})}),e("div",{className:"col-span-1",children:e(L,{updated_at:t.updated_at,string_format:"hh:mm:ssa do LLL yyyy"})})]})]})})]}),e(x,{show:l,size:"md",children:e(x.Body,{children:r("div",{className:"text-center",children:[e("h3",{className:"mb-5 text-lg font-normal text-gray-500 dark:text-gray-400",children:"Are you sure you want to delete this DB connection?"}),r("div",{className:"flex justify-center gap-4",children:[e(u,{color:"failure",onClick:c,children:"Yes, I'm sure"}),e(u,{onClick:()=>d(!1),color:"gray",children:"No, cancel"})]})]})})})]})}export{P as default};

import{A as p}from"./AuthenticatedLayout-e0b7f8ec.js";import{u as i,r as l,j as a,a as e,H as u}from"./app-3b14edf2.js";import{M as n,B as d}from"./Toast-1f814f61.js";import"./Table-29b362e9.js";import{H as g,n as f}from"./index.esm-b46f3593.js";import{R as y}from"./Alert-10dd726c.js";import{B as w}from"./BackButton-d8b9f37c.js";import{C as b}from"./CreatedAtText-569a5c4f.js";import{U as N}from"./UpdatedAtText-53995cea.js";import{a as k}from"./index.esm-51371050.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";import"./index-a84c5b70.js";function D({auth:c}){const m=i().props.alert,t=i().props.resource,[h,o]=l.useState(!1);l.useState(null);const x=()=>{const r={method:"DELETE",headers:{"X-CSRF-TOKEN":document.getElementsByName("csrf-token")[0].getAttribute("content")}};fetch(route("db.destroy",t.id),r).then(s=>{s.redirected&&(window.location.href=s.url)})};return a(p,{auth:c,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:t.name+" database"}),children:[e(u,{title:t.name+" database"}),a("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(w,{href:route("db.index"),children:"Back to databases"})}),e(y,{details:m}),e("section",{className:"bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm",children:a("div",{className:"py-4 px-4 mx-auto max-w-7xl",children:[a("div",{className:"flex items-center justify-between",children:[e("div",{}),a("small",{className:"text-end",children:[e(g,{className:"mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:()=>o(!0),title:"Delete database"}),e(k,{className:"md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:r=>window.location.href=route("db.show.tables",t.id),title:"View tables"}),e(f,{className:"md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:r=>window.location.href=route("db.connection.show",t.db_connection_id),title:"View connection"})]})]}),e("h2",{className:"mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white",children:t.name}),a("p",{className:"mb-4 text-xl font-bold leading-none text-gray-600 md:text-xl dark:text-gray-300",children:[t.conn.host," (",t.conn.title,")"]}),a("div",{className:"grid md:grid-cols-2 grid-cols-1",children:[e("div",{className:"col-span-1",children:e(b,{created_at:t.created_at,string_format:"hh:mm:ssa do LLL yyyy"})}),e("div",{className:"col-span-1",children:e(N,{updated_at:t.updated_at,string_format:"hh:mm:ssa do LLL yyyy"})})]})]})})]}),e(n,{show:h,size:"md",children:e(n.Body,{children:a("div",{className:"text-center",children:[e("h3",{className:"mb-5 text-lg font-normal text-gray-500 dark:text-gray-400",children:"Are you sure you want to delete this database?"}),a("div",{className:"flex justify-center gap-4",children:[e(d,{color:"failure",onClick:x,children:"Yes, I'm sure"}),e(d,{onClick:()=>o(!1),color:"gray",children:"No, cancel"})]})]})})})]})}export{D as default};

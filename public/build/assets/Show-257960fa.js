import{A as d}from"./AuthenticatedLayout-e0b7f8ec.js";import{u as l,j as a,a as e,H as n}from"./app-3b14edf2.js";import{C as s}from"./CreatedAtText-569a5c4f.js";import{B as i}from"./BackButton-d8b9f37c.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";import"./index-a84c5b70.js";import"./index.esm-b46f3593.js";function u({auth:r}){const t=l().props.resource;return a(d,{auth:r,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Log #"+t.id}),children:[e(n,{title:"Log #"+t.id}),a("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(i,{href:route("log.index"),children:"All logs"})}),e("section",{className:"bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm",children:e("div",{className:"py-6 px-2 mx-auto max-w-6xl lg:py-10",children:a("div",{className:"grid grid-cols-2",children:[a("div",{className:"md:col-span-2 col-span-2",children:[e("span",{className:"bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300",children:t.action}),e("h2",{className:"mt-4 mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white",children:t.resource_type}),e("p",{className:"mb-4 text-md font-bold leading-none text-gray-800 md:text-lg dark:text-gray-300",children:t.message}),e(s,{created_at:t.created_at,string_format:"hh:mm:ssa do LLL yyyy",pre_text:"When: "})]}),a("div",{className:"md:col-span-1 col-span-2 pl-4",children:[(()=>{if(t.server_id!==null)return e("div",{className:"mt-2",children:a("h2",{className:"text-md font-bold my-2 text-gray-800 md:text-lg dark:text-gray-200",children:[e("span",{className:"text-gray-600 dark:text-gray-400",children:"Server:"})," ",t.server.hostname," ",t.server.title]})})})(),(()=>{if(t.connection_id!==null)return e("div",{className:"mt-2",children:a("h2",{className:"text-md font-bold my-2 text-gray-800 md:text-lg dark:text-gray-200",children:[e("span",{className:"text-gray-600 dark:text-gray-400",children:"Connection:"})," ",t.connection.username," with ",t.connection.key_id===null?"Password":"Key"]})})})(),(()=>{if(t.command_id!==null)return e("div",{className:"mt-2",children:a("h2",{className:"text-md font-bold my-2 text-gray-800 md:text-lg dark:text-gray-200",children:[e("span",{className:"text-gray-600 dark:text-gray-400",children:"Command:"})," ",t.command.command]})})})()]})]})})})]})]})}export{u as default};
import{A as p}from"./AuthenticatedLayout-c4be06bd.js";import{u as o,r as x,j as t,a as e,H as y}from"./app-a8d4275f.js";import{M as l,B as i}from"./Toast-ee00046f.js";import"./Table-f19b692a.js";import{H as f,a as N,b as v}from"./index.esm-2010c99b.js";import{R as w}from"./Alert-d503f44b.js";import{C as k}from"./CreatedAtText-a06948df.js";import{B as b}from"./BackButton-2b60c346.js";import{a as C}from"./axios-4a70c6fc.js";import{U as E}from"./UpdatedAtText-9a96553e.js";import"./ApplicationLogo-ae419612.js";import"./transition-fbe58e1e.js";import"./index-9b0dda6f.js";function O({auth:n}){const m=o().props.auth.user,c=o().props.alert,r=o().props.resource,[h,s]=x.useState(!1),g=()=>{const a={method:"DELETE",headers:{"X-CSRF-TOKEN":document.getElementsByName("csrf-token")[0].getAttribute("content")}};fetch(route("command-group.destroy",r.id),a).then(d=>{d.redirected&&(window.location.href=d.url)})},u=()=>{C.get(route("command-group.run",r.id)).then(a=>{}).catch(a=>{console.log("Error running this command group")})};return t(p,{auth:n,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:"Command group: "+r.title}),children:[e(y,{title:"Command group "+r.id}),t("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(b,{href:route("command-group.index"),children:"Back to command groups"})}),e(w,{details:c}),e("section",{className:"bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm",children:t("div",{className:"py-4 px-4 mx-auto max-w-7xl",children:[t("div",{className:"flex items-center justify-between mb-2",children:[e("h2",{className:"mb-2 text-xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white",children:r.title}),t("small",{className:"text-end",children:[e(f,{className:"mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:()=>s(!0),title:"Delete command group"}),e(N,{className:"md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:a=>window.location.href=route("command-group.edit",r.id),title:"Edit command group"}),e(v,{className:"md:ml-3 ml-1 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:u,title:"Run command group"})]})]}),t("div",{className:"grid grid-cols-2",children:[t("div",{className:"md:col-span-1 col-span-2",children:[e("code",{className:"text-red-500 bg-gray-300 dark:bg-black p-1 rounded-md my-2",children:r.the_command.command}),r.email_output?t("p",{className:"my-2 text-md text-gray-900 dark:text-white",children:["Emails to ",m.email]}):null]}),e("div",{className:"md:col-span-1 col-span-2",children:(()=>r.assigned.length>0?t("div",{className:"mt-2",children:[e("h2",{className:"text-md font-bold mb-2 text-gray-800 md:text-lg dark:text-gray-200",children:"Servers in group"}),e("ul",{className:"list-disc",children:r.assigned.map(a=>e("li",{className:"text-gray-800 dark:text-gray-300",children:t("a",{href:route("server.show",a.server.id),children:[a.server.hostname," (",a.server.title,")"]})},a.server.id))})]}):e("h2",{className:"text-md ml-2 my-4 font-semibold leading-none text-gray-800 md:text-lg dark:text-gray-300",children:"There are no servers in this group"}))()})]}),t("div",{className:"grid md:grid-cols-2 grid-cols-1",children:[e("div",{className:"col-span-1",children:e(k,{created_at:r.created_at,string_format:"hh:mm:ssa do LLL yyyy"})}),e("div",{className:"col-span-1",children:e(E,{updated_at:r.updated_at,string_format:"hh:mm:ssa do LLL yyyy"})})]})]})})]}),e(l,{show:h,size:"md",children:e(l.Body,{children:t("div",{className:"text-center",children:[e("h3",{className:"mb-5 text-lg font-normal text-gray-500 dark:text-gray-400",children:"Are you sure you want to delete this Command group?"}),t("div",{className:"flex justify-center gap-4",children:[e(i,{color:"failure",onClick:g,children:"Yes, I'm sure"}),e(i,{onClick:()=>s(!1),color:"gray",children:"No, cancel"})]})]})})})]})}export{O as default};
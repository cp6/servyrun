import{A as N}from"./AuthenticatedLayout-c4be06bd.js";import{u as r,b,j as i,a as n,H as C}from"./app-a8d4275f.js";import{I as l}from"./InputLabel-a7ee92ff.js";import{T as m,I as u}from"./TextInput-1e9aadbd.js";import{S as t}from"./Toast-ee00046f.js";import"./Table-f19b692a.js";import{B as I}from"./BackButton-2b60c346.js";import{R as k}from"./Alert-d503f44b.js";import{U as x}from"./UpdateButton-5faf9e0a.js";import"./ApplicationLogo-ae419612.js";import"./transition-fbe58e1e.js";import"./index.esm-2010c99b.js";function L({auth:v}){const h=r().props.alert,p=r().props.commands,a=r().props.resource,c=r().props.connections,{data:d,setData:o,patch:g,processing:_,errors:s}=b({connection1_id:typeof a.assigned[0]<"u"?a.assigned[0].connection_id:null,connection2_id:typeof a.assigned[1]<"u"?a.assigned[1].connection_id:null,connection3_id:typeof a.assigned[2]<"u"?a.assigned[2].connection_id:null,connection4_id:typeof a.assigned[3]<"u"?a.assigned[3].connection_id:null,connection5_id:typeof a.assigned[4]<"u"?a.assigned[4].connection_id:null,connection6_id:typeof a.assigned[5]<"u"?a.assigned[5].connection_id:null,connection7_id:typeof a.assigned[6]<"u"?a.assigned[6].connection_id:null,connection8_id:typeof a.assigned[7]<"u"?a.assigned[7].connection_id:null,connection9_id:typeof a.assigned[8]<"u"?a.assigned[8].connection_id:null,connection10_id:typeof a.assigned[9]<"u"?a.assigned[9].connection_id:null,connection11_id:typeof a.assigned[10]<"u"?a.assigned[10].connection_id:null,connection12_id:typeof a.assigned[11]<"u"?a.assigned[11].connection_id:null,title:a.title,command_id:a.command_id,timeout:a.timeout}),f=e=>{e.preventDefault(),g(route("command-group.update",a.id)),navigate(route("command-group.show",a.id))};return i(N,{auth:v,header:i("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:["Edit command group: ",a.title]}),children:[n(C,{title:"Edit command group"}),i("div",{className:"py-8 sm:px-0 px-1 mx-auto max-w-7xl lg:py-10",children:[n("div",{className:"flex flex-wrap gap-2 mb-4",children:n(I,{href:route("command-group.show",a.id),children:"Back to command group"})}),n(k,{details:h}),n("section",{className:"bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6",children:i("form",{onSubmit:f,children:[i("div",{className:"grid gap-2 grid-cols-1 sm:grid-cols-6",children:[i("div",{className:"col-span-2 mb-3",children:[n(l,{forInput:"title",value:"Title"}),n(m,{name:"title",value:d.title,className:"mt-1 block w-full",autoComplete:"title",handleChange:e=>o("title",e.target.value),maxLength:64,required:!0}),n(u,{message:s.title,className:"mt-2"})]}),i("div",{className:"col-span-1 mb-3",children:[n(l,{forInput:"timeout",value:"Timeout"}),n(m,{name:"timeout",value:d.timeout,className:"mt-1 block w-full",autoComplete:"timeout",handleChange:e=>o("timeout",e.target.value),max:999999,min:1,required:!0}),n(u,{message:s.timeout,className:"mt-2"})]}),i("div",{className:"sm:col-span-3 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"command_id",value:"Command"})}),i(t,{onChange:e=>o("command_id",e.target.value),name:"command_id",required:!0,value:d.command_id,children:[n("option",{value:"",children:"Choose one"}),p.map(e=>n("option",{value:e.id,children:e.title},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection1_id",value:"Server 1"})}),i(t,{onChange:e=>o("connection1_id",e.target.value),name:"connection1_id",required:!0,value:d.connection1_id,children:[n("option",{value:"",children:"Choose one"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"server2_id",value:"Server 2"})}),i(t,{onChange:e=>o("connection2_id",e.target.value),name:"connection2_id",value:d.connection2_id,handleChange:e=>o("connection2_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection3_id",value:"Server 3"})}),i(t,{onChange:e=>o("connection3_id",e.target.value),name:"connection3_id",value:d.connection3_id,handleChange:e=>o("connection3_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection4_id",value:"Server 4"})}),i(t,{onChange:e=>o("connection4_id",e.target.value),name:"connection4_id",value:d.connection4_id,handleChange:e=>o("connection4_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection5_id",value:"Server 5"})}),i(t,{onChange:e=>o("connection5_id",e.target.value),name:"connection5_id",value:d.connection5_id,handleChange:e=>o("connection5_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection6_id",value:"Server 6"})}),i(t,{onChange:e=>o("connection6_id",e.target.value),name:"connection6_id",value:d.connection6_id,handleChange:e=>o("connection6_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection7_id",value:"Server 7"})}),i(t,{onChange:e=>o("connection7_id",e.target.value),name:"connection7_id",value:d.connection7_id,handleChange:e=>o("connection7_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection8_id",value:"Server 8"})}),i(t,{onChange:e=>o("connection8_id",e.target.value),name:"connection8_id",value:d.connection8_id,handleChange:e=>o("connection8_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection9_id",value:"Server 9"})}),i(t,{onChange:e=>o("connection9_id",e.target.value),name:"connection9_id",value:d.connection9_id,handleChange:e=>o("connection9_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection10_id",value:"Server 10"})}),i(t,{onChange:e=>o("connection10_id",e.target.value),name:"connection10_id",value:d.connection10_id,handleChange:e=>o("connection10_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection11_id",value:"Server 11"})}),i(t,{onChange:e=>o("connection11_id",e.target.value),name:"connection11_id",value:d.connection11_id,handleChange:e=>o("connection11_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]}),i("div",{className:"sm:col-span-2 col-span-6",children:[n("div",{className:"mb-2 block",children:n(l,{forInput:"connection12_id",value:"Server 12"})}),i(t,{onChange:e=>o("connection12_id",e.target.value),name:"connection12_id",value:d.connection12_id,handleChange:e=>o("connection12_id",e.target.value),children:[n("option",{value:"",children:"None"}),c.map(e=>i("option",{value:e.id,children:[e.server.hostname," (",e.server.title,")"]},e.id))]})]})]}),n(x,{processing:_,children:"Update command group"})]})})]})]})}export{L as default};

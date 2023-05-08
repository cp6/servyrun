import{A as y}from"./AuthenticatedLayout-e0b7f8ec.js";import{u as i,b as N,r as l,j as s,a,H as I}from"./app-3b14edf2.js";import{I as p}from"./InputLabel-8665140f.js";import{T as P,I as S}from"./TextInput-edb2b3ad.js";import{S as k}from"./Toast-1f814f61.js";import"./Table-29b362e9.js";import{P as U}from"./PrimaryButton-28166509.js";import{R as B}from"./Alert-10dd726c.js";import{B as C}from"./BackButton-d8b9f37c.js";import{a as E}from"./axios-468742d6.js";import{P as F}from"./ProgressBar-aaff48f0.js";import"./ApplicationLogo-30229999.js";import"./transition-da3d9d06.js";import"./index.esm-b46f3593.js";function Q({auth:u}){const g=i().props.alert,t=i().props.resource,v=i().props.connections,{data:d,setData:o,post:h,processing:f,reset:T,errors:x}=N({connection_id:"",save_as:t.saved_as}),[n,c]=l.useState(!1),[_,m]=l.useState(null);async function w(e){return await(await E.get(route("downloaded.upload.progress",e.id))).data}l.useEffect(()=>{let e;return n?e=setInterval(()=>{w(t).then(r=>{m(r.progress)})},500):n||(m(null),clearInterval(e)),()=>clearInterval(e)},[n]);const b=e=>{e.preventDefault(),h(route("downloaded.upload",t.id),{onStart:r=>{c(!0)},onFinish:r=>{c(!1)}})};return s(y,{auth:u,header:s("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:["Upload ",t.saved_as," to SFTP"]}),children:[a(I,{title:"Upload "+t.saved_as}),s("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[a("div",{className:"flex flex-wrap gap-2 mb-4",children:a(C,{href:route("downloaded.index"),children:"Back to downloaded files"})}),a(B,{details:g}),s("div",{className:"bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg p-2 sm:p-6",children:[s("form",{onSubmit:b,children:[s("div",{className:"grid gap-2 sm:grid-cols-1 md:grid-cols-6 sm:gap-4",children:[s("div",{className:"sm:col-span-2 col-span-4",children:[a("div",{className:"mb-2 block",children:a(p,{forInput:"connection_id",value:"SFTP connection"})}),s(k,{onChange:e=>o("connection_id",e.target.value),name:"connection_id",required:!0,value:d.connection_id,handleChange:e=>o("connection_id",e.target.value),children:[a("option",{value:"",children:"Choose"}),v.map(e=>s("option",{value:e.id,children:[e.username,"@",e.server.hostname," (",e.server.title,")"]},e.id))]})]}),s("div",{className:"sm:col-span-4 col-span-4",children:[a(p,{forInput:"save_as",value:"Save as"}),a(P,{name:"save_as",className:"mt-1 block w-full",autoComplete:"save_as",value:d.save_as,handleChange:e=>o("save_as",e.target.value),maxLength:125,required:!0}),a(S,{message:x.save_as,className:"mt-2"})]})]}),a(U,{className:"inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800",processing:f,children:"Upload"})]}),a(F,{value:_})]})]})]})}export{Q as default};

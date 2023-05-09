import{A as F}from"./AuthenticatedLayout-b0ac98cc.js";import{j as a,a as e,F as m,r as b,R as i,u as y,H as j}from"./app-7082a047.js";import{D as k,M as N,B as v}from"./Toast-a9c7a83a.js";import"./Table-13305096.js";import{z as G,v as I,d as O,h as q,j as w,H as z,a as K,n as X,A as V}from"./index.esm-eebfcfab.js";import{R as Y}from"./Alert-af0dbb46.js";import{n as u}from"./helpers-2aabf79e.js";import{C as J}from"./CreatedAtText-a1e22ba4.js";import{U as Q}from"./UpdatedAtText-1126b185.js";import{a as p}from"./axios-4a70c6fc.js";import{B as W}from"./BackButton-c0685269.js";import{b as Z}from"./index.esm-6768e5ef.js";import"./ApplicationLogo-db4f8950.js";import"./transition-eb04b526.js";import"./index-9b0dda6f.js";function $({resource:t}){return a("dl",{className:"flex items-center space-x-6 mt-2",children:[a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"CPU"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:t.cpu_cores??"-"})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Ghz"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:u(t.cpu_freq,3)??"-"})]}),e("div",{children:(()=>t.disk_tb!==null?a(m,{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Disk TB"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:u(t.disk_tb,3)})]}):a(m,{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Disk GB"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:t.disk_gb===null?"-":u(t.disk_gb,3)})]}))()}),e("div",{children:(()=>t.ram_gb!==null?a(m,{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"RAM GB"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:u(t.ram_gb,3)})]}):a(m,{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"RAM MB"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:t.ram_mb===null?"-":u(t.ram_mb,3)})]}))()}),e("div",{children:(()=>{if(t.price!==null&&t.currency!==null)return a(m,{children:[a("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:["Price ",t.currency]}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:t.price})]})})()})]})}function ee({connection:t=null}){return e(m,{children:e("dl",{className:"flex items-center space-x-6 mt-4",children:a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:(()=>typeof t<"u"&&t!==null?e("p",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300 inline",children:"Connection"}):e("p",{className:"mb-2 font-semibold leading-none text-yellow-500 dark:text-yellow-400 inline",children:"No connection set, create a connection to fetch more information."}))()}),e("dd",{className:"",children:e("p",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white inline",children:(()=>{if(typeof t<"u"&&t!==null)return typeof t.key_id<"u"&&t.key_id!==null?t.username+":"+t.ssh_port+" with key":t.password!=="undefined"?t.username+":"+t.ssh_port+" with password":""})()})})]})})})}function te({resource:t}){return a(m,{children:[e("h2",{className:"my-2 text-2xl font-bold leading-none text-gray-900 md:text-2xl dark:text-white",children:t.hostname}),e("p",{className:"mb-4 text-lg font-semibold leading-none text-gray-600 md:text-lg dark:text-gray-200",children:t.location!==null?t.location.name:""}),e("dl",{children:e("dd",{className:"mb-4 font-light text-gray-600 sm:mb-5 dark:text-gray-300",children:t.ips.map(n=>a("p",{children:[e(G,{className:"mr-2 mb-1 h-5 w-5 inline hover:cursor-grab dark:text-gray-300",onClick:()=>{navigator.clipboard.writeText(n.ip)},title:"Copy IP"}),e("a",{href:route("ip.show",n.id),children:n.ip}),n.is_main?e(I,{className:"ml-2 mb-1 h-5 w-5 inline text-yellow-500",title:"Main ip"}):null,n.is_ssh?e(O,{className:"ml-2 mb-1 h-5 w-5 inline text-green-500",title:"SSH ip"}):null]},n.id))})})]})}function ae({resource:t}){const[n,r]=b.useState(null),[d,h]=b.useState("Check if server is up"),o=()=>{p.get(route("check-is-up",t.id)).then(c=>{r(c.data.is_up)}).catch(c=>{r(!n)})};return e(m,{children:e(q,{className:(()=>n?"md:ml-3 ml-2 h-6 w-6 text-green-500 dark:text-green-400 inline hover:cursor-pointer":n===null?"md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer":"md:ml-3 ml-2 h-6 w-6 text-red-500 dark:text-red-400 inline hover:cursor-pointer")(),onClick:o,title:d})})}function re({serverId:t,usage:n,uptime:r}){const[d,h]=i.useState(!1),[o,c]=i.useState(!1),[s,f]=i.useState("-"),[g,x]=i.useState("-"),[_,C]=i.useState("-"),[S,B]=i.useState("-"),[A,U]=i.useState("-"),[D,H]=i.useState("-"),[L,R]=i.useState("-"),[P,M]=i.useState("-"),[E,T]=i.useState("-");return a("div",{className:"grid md:grid-cols-2 grid-cols-1",children:[e("div",{className:"md:col-span-2",children:a("dl",{className:"flex items-center space-x-6 mt-4",children:[a("div",{children:[e("dt",{className:d?"mb-2 font-light leading-none text-white/50 dark:text-gray-900":"mb-2 font-light leading-none text-gray-900 dark:text-gray-300 hover:dark:text-gray-200",children:e(w,{title:"Refresh usage stats",onClick:()=>{h(!0),p.get(route("server.usage",t)).then(l=>{f(u(l.data.cpu_used_percent,3)),x(u(l.data.ram_used_percent,3)),C(l.data.disk_used_percent),B(u(l.data.disk_available_gb,3)+" GB"),console.log("Updated usage"),h(!1)}).catch(l=>{console.log("Error fetching usage data"),h(!1)})},className:d?"mt-2 h-5 w-5 text-white/50 dark:text-gray-700":"mt-2 h-5 w-5 hover:cursor-pointer"})}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white"})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"CPU %"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:s})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"RAM %"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:g})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Disk %"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:_})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Disk Avail"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:S})]})]})}),e("div",{className:"md:col-span-1 md:col-span-2",children:a("dl",{className:"flex items-center space-x-6 mt-4",children:[a("div",{children:[e("dt",{className:o?"mb-2 font-light leading-none text-white/50 dark:text-gray-900":"mb-2 font-light leading-none text-gray-900 dark:text-gray-300 hover:dark:text-gray-200",children:e(w,{title:"Refresh usage stats",onClick:()=>{c(!0),p.get(route("server.uptime",t)).then(l=>{U(l.data.last_minute),H(l.data.last_5_minutes),R(l.data.last_15_minutes),M(l.data.users),T(l.data.uptime),console.log("Updated uptime"),c(!1)}).catch(l=>{console.log("Error fetching uptime data"),c(!1)})},className:o?"mt-2 h-5 w-5 text-white/50 dark:text-gray-700":"mt-2 h-5 w-5 hover:cursor-pointer"})}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white"})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Load 1m"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:A})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Load 5m"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:D})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Load 15m"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:L})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Users"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:P})]}),a("div",{children:[e("dt",{className:"mb-2 font-light leading-none text-gray-900 dark:text-gray-300",children:"Uptime"}),e("dd",{className:"mb-4 font-semibold text-gray-600 sm:mb-5 dark:text-white",children:E})]})]})})]})}function ne({serverId:t,servers:n}){const[r,d]=i.useState(!1),[h,o]=i.useState(null),[c,s]=i.useState("Ping another server"),f=g=>{d(!0),s("Pinging....."),p.get(route("run.ping-from-to",[t,g.target.id])).then(x=>{console.log("Ran ping"),Object.keys(x.data).length===0?o(""):o("AVG: "+x.data.avg+" MIN: "+x.data.min+" MAX: "+x.data.max),d(!1),s("Ping another server")}).catch(x=>{console.log("Error running ping"),d(!1),s("Ping another server")})};return a("div",{className:"grid md:grid-cols-2 grid-cols-1 mt-2",children:[e("div",{className:"col-span-2 md:col-span-1",children:e(k,{label:c,dismissOnClick:!1,disabled:r,className:"dark:bg-gray-500",size:"sm",children:n.map(g=>e(k.Item,{className:r?"hidden":null,children:a("a",{onClick:f,id:g.id,children:[g.hostname," (",g.title,")"]})},g.id))})}),e("div",{className:"col-span-2 md:col-span-1",children:e("code",{className:"text-red-500 dark:text-red-400",children:h})})]})}function ie({commands:t}){return e("dl",{children:e("dd",{className:"mb-2 font-light text-gray-600 sm:mb-5 dark:text-gray-300",children:t.map(n=>e("code",{className:"text-red-500 dark:text-red-400",children:e("p",{className:"mt-2",children:e("a",{href:route("outputs.show",n.id),children:n.the_command})})},n.id))})})}function we({auth:t}){const n=y().props.alert,r=y().props.resource,d=y().props.servers,[h,o]=b.useState(!1),c=()=>{const s={method:"DELETE",headers:{"X-CSRF-TOKEN":document.getElementsByName("csrf-token")[0].getAttribute("content")}};fetch(route("server.destroy",r.id),s).then(f=>{f.redirected&&(window.location.href=f.url)})};return a(F,{auth:t,header:e("h2",{className:"font-semibold text-xl text-gray-800 dark:text-white leading-tight",children:r.title}),children:[e(j,{title:"Server "+r.hostname}),a("div",{className:"py-8 px-2 mx-auto max-w-7xl lg:py-10",children:[e("div",{className:"flex flex-wrap gap-2 mb-4",children:e(W,{href:route("server.index"),children:"Back to servers"})}),e(Y,{details:n}),e("section",{className:"bg-white/50 dark:bg-gray-700 rounded-lg shadow-sm",children:a("div",{className:"py-4 px-4 mx-auto max-w-7xl",children:[a("div",{className:"flex items-center justify-between mb-4",children:[a("div",{children:[r.operating_system!==null?e("span",{className:"bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300",children:r.operating_system}):null,e("span",{className:"bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300",children:r.type.name})]}),a("small",{className:"text-end",children:[e(z,{className:"mr-2 h-6 w-6 text-gray-600 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 inline hover:cursor-pointer",onClick:()=>o(!0),title:"Delete server"}),(()=>{if(typeof r.conn<"u"&&r.conn!==null&&(typeof r.cpu_freq>"u"||r.cpu_freq===null))return e(Z,{className:"md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:s=>window.location.href=route("server.get-information",r.id),title:"Fetch server specs"})})(),e(K,{className:"md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:s=>window.location.href=route("server.edit",r.id),title:"Edit server"}),(()=>{if(typeof r.conn<"u"&&r.conn!==null)return e(X,{className:"md:ml-2 ml-1 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:s=>window.location.href=route("connection.show",r.conn.id),title:"Go to connection"})})(),(()=>{if(typeof r.sftp_conn<"u"&&r.sftp_conn!==null)return e(V,{className:"md:ml-3 ml-2 h-6 w-6 text-gray-600 dark:text-white inline hover:cursor-pointer",onClick:s=>window.location.href=route("sftp.show",r.sftp_conn.id),title:"Go to SFTP connection"})})(),e(ae,{resource:r})]})]}),a("div",{className:"grid md:grid-cols-2 grid-cols-1",children:[e("div",{className:"md:col-span-1 col-span-2",children:e(te,{resource:r})}),a("div",{className:"md:col-span-1 col-span-2",children:[e("p",{className:"mb-2 text-gray-700 dark:text-gray-300",children:r.cpu??null}),e(ee,{connection:r.conn})]})]}),a("div",{className:"grid md:grid-cols-2 grid-cols-1",children:[e("div",{className:"col-span-1",children:e($,{resource:r})}),e("div",{className:"col-span-1",children:(()=>{if(r.conn!==null&&r.conn.outputs_last3!==null&&r.conn.outputs_last3.length>0)return a(m,{children:[e("p",{className:"mb-2 text-gray-800 dark:text-gray-200",children:"Last 3 commands ran"}),e(ie,{commands:r.conn.outputs_last3})]})})()})]}),e(re,{serverId:r.id,usage:null,uptime:null}),(()=>{if(typeof r.conn<"u"&&r.conn!==null&&d.length>0)return e(ne,{serverId:r.id,servers:d})})(),a("div",{className:"grid md:grid-cols-2 grid-cols-1 mt-4",children:[e("div",{className:"col-span-1",children:e(J,{created_at:r.created_at,string_format:"hh:mm:ssa do LLL yyyy"})}),e("div",{className:"col-span-1",children:e(Q,{updated_at:r.updated_at,string_format:"hh:mm:ssa do LLL yyyy"})})]})]})})]}),e(N,{show:h,size:"md",children:e(N.Body,{children:a("div",{className:"text-center",children:[e("h3",{className:"mb-5 text-lg font-normal text-gray-500 dark:text-gray-400",children:"Are you sure you want to delete this server?"}),a("div",{className:"flex justify-center gap-4",children:[e(v,{color:"failure",onClick:c,children:"Yes, I'm sure"}),e(v,{onClick:()=>o(!1),color:"gray",children:"No, cancel"})]})]})})})]})}export{we as default};

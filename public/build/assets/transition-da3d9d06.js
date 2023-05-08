import{r as o,R as k,a as $,F as Ee}from"./app-3b14edf2.js";const ye=typeof window>"u"||typeof document>"u";let A=ye?o.useEffect:o.useLayoutEffect;function R(e){let t=o.useRef(e);return A(()=>{t.current=e},[e]),t}function we(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function H(){let e=[],t=[],r={enqueue(n){t.push(n)},addEventListener(n,i,c,f){return n.addEventListener(i,c,f),r.add(()=>n.removeEventListener(i,c,f))},requestAnimationFrame(...n){let i=requestAnimationFrame(...n);return r.add(()=>cancelAnimationFrame(i))},nextFrame(...n){return r.requestAnimationFrame(()=>r.requestAnimationFrame(...n))},setTimeout(...n){let i=setTimeout(...n);return r.add(()=>clearTimeout(i))},microTask(...n){let i={current:!0};return we(()=>{i.current&&n[0]()}),r.add(()=>{i.current=!1})},add(n){return e.push(n),()=>{let i=e.indexOf(n);if(i>=0){let[c]=e.splice(i,1);c()}}},dispose(){for(let n of e.splice(0))n()},async workQueue(){for(let n of t.splice(0))await n()}};return r}function ne(){let[e]=o.useState(H);return o.useEffect(()=>()=>e.dispose(),[e]),e}let S=function(e){let t=R(e);return k.useCallback((...r)=>t.current(...r),[t])},K={serverHandoffComplete:!1};function re(){let[e,t]=o.useState(K.serverHandoffComplete);return o.useEffect(()=>{e!==!0&&t(!0)},[e]),o.useEffect(()=>{K.serverHandoffComplete===!1&&(K.serverHandoffComplete=!0)},[]),e}function E(e,t,...r){if(e in t){let i=t[e];return typeof i=="function"?i(...r):i}let n=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(i=>`"${i}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,E),n}let ie=Symbol();function Me(e,t=!0){return Object.assign(e,{[ie]:t})}function oe(...e){let t=o.useRef(e);o.useEffect(()=>{t.current=e},[e]);let r=S(n=>{for(let i of t.current)i!=null&&(typeof i=="function"?i(n):i.current=n)});return e.every(n=>n==null||(n==null?void 0:n[ie]))?void 0:r}var ue=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(ue||{}),w=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(w||{});function le({ourProps:e,theirProps:t,slot:r,defaultTag:n,features:i,visible:c=!0,name:f}){let l=se(t,e);if(c)return N(l,r,n,f);let a=i??0;if(a&2){let{static:s=!1,...d}=l;if(s)return N(d,r,n,f)}if(a&1){let{unmount:s=!0,...d}=l;return E(s?0:1,{[0](){return null},[1](){return N({...d,hidden:!0,style:{display:"none"}},r,n,f)}})}return N(l,r,n,f)}function N(e,t={},r,n){let{as:i=r,children:c,refName:f="ref",...l}=Q(e,["unmount","static"]),a=e.ref!==void 0?{[f]:e.ref}:{},s=typeof c=="function"?c(t):c;l.className&&typeof l.className=="function"&&(l.className=l.className(t));let d={};if(t){let v=!1,g=[];for(let[p,u]of Object.entries(t))typeof u=="boolean"&&(v=!0),u===!0&&g.push(p);v&&(d["data-headlessui-state"]=g.join(" "))}if(i===o.Fragment&&Object.keys(ee(l)).length>0){if(!o.isValidElement(s)||Array.isArray(s)&&s.length>1)throw new Error(['Passing props on "Fragment"!',"",`The current component <${n} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(l).map(v=>`  - ${v}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(v=>`  - ${v}`).join(`
`)].join(`
`));return o.cloneElement(s,Object.assign({},se(s.props,ee(Q(l,["ref"]))),d,a,Te(s.ref,a.ref)))}return o.createElement(i,Object.assign({},Q(l,["ref"]),i!==o.Fragment&&a,i!==o.Fragment&&d),s)}function Te(...e){return{ref:e.every(t=>t==null)?void 0:t=>{for(let r of e)r!=null&&(typeof r=="function"?r(t):r.current=t)}}}function se(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},r={};for(let n of e)for(let i in n)i.startsWith("on")&&typeof n[i]=="function"?(r[i]!=null||(r[i]=[]),r[i].push(n[i])):t[i]=n[i];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(r).map(n=>[n,void 0])));for(let n in r)Object.assign(t,{[n](i,...c){let f=r[n];for(let l of f){if((i instanceof Event||(i==null?void 0:i.nativeEvent)instanceof Event)&&i.defaultPrevented)return;l(i,...c)}}});return t}function z(e){var t;return Object.assign(o.forwardRef(e),{displayName:(t=e.displayName)!=null?t:e.name})}function ee(e){let t=Object.assign({},e);for(let r in t)t[r]===void 0&&delete t[r];return t}function Q(e,t=[]){let r=Object.assign({},e);for(let n of t)n in r&&delete r[n];return r}let X=o.createContext(null);X.displayName="OpenClosedContext";var j=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(j||{});function ae(){return o.useContext(X)}function Fe({value:e,children:t}){return k.createElement(X.Provider,{value:e},t)}function fe(){let e=o.useRef(!1);return A(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function Ce(e){let t={called:!1};return(...r)=>{if(!t.called)return t.called=!0,e(...r)}}function W(e,...t){e&&t.length>0&&e.classList.add(...t)}function Y(e,...t){e&&t.length>0&&e.classList.remove(...t)}function Se(e,t){let r=H();if(!e)return r.dispose;let{transitionDuration:n,transitionDelay:i}=getComputedStyle(e),[c,f]=[n,i].map(l=>{let[a=0]=l.split(",").filter(Boolean).map(s=>s.includes("ms")?parseFloat(s):parseFloat(s)*1e3).sort((s,d)=>d-s);return a});if(c+f!==0){let l=r.addEventListener(e,"transitionend",a=>{a.target===a.currentTarget&&(t(),l())})}else t();return r.add(()=>t()),r.dispose}function Re(e,t,r,n){let i=r?"enter":"leave",c=H(),f=n!==void 0?Ce(n):()=>{};i==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let l=E(i,{enter:()=>t.enter,leave:()=>t.leave}),a=E(i,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),s=E(i,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return Y(e,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),W(e,...l,...s),c.nextFrame(()=>{Y(e,...s),W(e,...a),Se(e,()=>(Y(e,...l),W(e,...t.entered),f()))}),c.dispose}function $e({container:e,direction:t,classes:r,onStart:n,onStop:i}){let c=fe(),f=ne(),l=R(t);A(()=>{let a=H();f.add(a.dispose);let s=e.current;if(s&&l.current!=="idle"&&c.current)return a.dispose(),n.current(l.current),a.add(Re(s,r.current,l.current==="enter",()=>{a.dispose(),i.current(l.current)})),a.dispose},[t])}function je(...e){return e.filter(Boolean).join(" ")}function C(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let q=o.createContext(null);q.displayName="TransitionContext";var Oe=(e=>(e.Visible="visible",e.Hidden="hidden",e))(Oe||{});function xe(){let e=o.useContext(q);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Pe(){let e=o.useContext(M);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let M=o.createContext(null);M.displayName="NestingContext";function D(e){return"children"in e?D(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function ce(e,t){let r=R(e),n=o.useRef([]),i=fe(),c=ne(),f=S((p,u=w.Hidden)=>{let h=n.current.findIndex(({el:m})=>m===p);h!==-1&&(E(u,{[w.Unmount](){n.current.splice(h,1)},[w.Hidden](){n.current[h].state="hidden"}}),c.microTask(()=>{var m;!D(n)&&i.current&&((m=r.current)==null||m.call(r))}))}),l=S(p=>{let u=n.current.find(({el:h})=>h===p);return u?u.state!=="visible"&&(u.state="visible"):n.current.push({el:p,state:"visible"}),()=>f(p,w.Unmount)}),a=o.useRef([]),s=o.useRef(Promise.resolve()),d=o.useRef({enter:[],leave:[],idle:[]}),v=S((p,u,h)=>{a.current.splice(0),t&&(t.chains.current[u]=t.chains.current[u].filter(([m])=>m!==p)),t==null||t.chains.current[u].push([p,new Promise(m=>{a.current.push(m)})]),t==null||t.chains.current[u].push([p,new Promise(m=>{Promise.all(d.current[u].map(([b,y])=>y)).then(()=>m())})]),u==="enter"?s.current=s.current.then(()=>t==null?void 0:t.wait.current).then(()=>h(u)):h(u)}),g=S((p,u,h)=>{Promise.all(d.current[u].splice(0).map(([m,b])=>b)).then(()=>{var m;(m=a.current.shift())==null||m()}).then(()=>h(u))});return o.useMemo(()=>({children:n,register:l,unregister:f,onStart:v,onStop:g,wait:s,chains:d}),[l,f,n,v,g,d,s])}function Le(){}let Ne=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function te(e){var t;let r={};for(let n of Ne)r[n]=(t=e[n])!=null?t:Le;return r}function ke(e){let t=o.useRef(te(e));return o.useEffect(()=>{t.current=te(e)},[e]),t}let Ae="div",de=ue.RenderStrategy,me=z(function(e,t){let{beforeEnter:r,afterEnter:n,beforeLeave:i,afterLeave:c,enter:f,enterFrom:l,enterTo:a,entered:s,leave:d,leaveFrom:v,leaveTo:g,...p}=e,u=o.useRef(null),h=oe(u,t),m=p.unmount?w.Unmount:w.Hidden,{show:b,appear:y,initial:pe}=xe(),[T,U]=o.useState(b?"visible":"hidden"),Z=Pe(),{register:O,unregister:x}=Z,B=o.useRef(null);o.useEffect(()=>O(u),[O,u]),o.useEffect(()=>{if(m===w.Hidden&&u.current){if(b&&T!=="visible"){U("visible");return}return E(T,{hidden:()=>x(u),visible:()=>O(u)})}},[T,u,O,x,b,m]);let J=R({enter:C(f),enterFrom:C(l),enterTo:C(a),entered:C(s),leave:C(d),leaveFrom:C(v),leaveTo:C(g)}),P=ke({beforeEnter:r,afterEnter:n,beforeLeave:i,afterLeave:c}),V=re();o.useEffect(()=>{if(V&&T==="visible"&&u.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[u,T,V]);let I=pe&&!y,ve=(()=>!V||I||B.current===b?"idle":b?"enter":"leave")(),he=S(F=>E(F,{enter:()=>P.current.beforeEnter(),leave:()=>P.current.beforeLeave(),idle:()=>{}})),be=S(F=>E(F,{enter:()=>P.current.afterEnter(),leave:()=>P.current.afterLeave(),idle:()=>{}})),L=ce(()=>{U("hidden"),x(u)},Z);$e({container:u,classes:J,direction:ve,onStart:R(F=>{L.onStart(u,F,he)}),onStop:R(F=>{L.onStop(u,F,be),F==="leave"&&!D(L)&&(U("hidden"),x(u))})}),o.useEffect(()=>{!I||(m===w.Hidden?B.current=null:B.current=b)},[b,I,T]);let G=p,ge={ref:h};return y&&b&&(typeof window>"u"||typeof document>"u")&&(G={...G,className:je(p.className,...J.current.enter,...J.current.enterFrom)}),$(M.Provider,{value:L,children:$(Fe,{value:E(T,{visible:j.Open,hidden:j.Closed}),children:le({ourProps:ge,theirProps:G,defaultTag:Ae,features:de,visible:T==="visible",name:"Transition.Child"})})})}),_=z(function(e,t){let{show:r,appear:n=!1,unmount:i,...c}=e,f=o.useRef(null),l=oe(f,t);re();let a=ae();if(r===void 0&&a!==null&&(r=E(a,{[j.Open]:!0,[j.Closed]:!1})),![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[s,d]=o.useState(r?"visible":"hidden"),v=ce(()=>{d("hidden")}),[g,p]=o.useState(!0),u=o.useRef([r]);A(()=>{g!==!1&&u.current[u.current.length-1]!==r&&(u.current.push(r),p(!1))},[u,r]);let h=o.useMemo(()=>({show:r,appear:n,initial:g}),[r,n,g]);o.useEffect(()=>{if(r)d("visible");else if(!D(v))d("hidden");else{let b=f.current;if(!b)return;let y=b.getBoundingClientRect();y.x===0&&y.y===0&&y.width===0&&y.height===0&&d("hidden")}},[r,v]);let m={unmount:i};return $(M.Provider,{value:v,children:$(q.Provider,{value:h,children:le({ourProps:{...m,as:o.Fragment,children:k.createElement(me,{ref:l,...m,...c})},theirProps:{},defaultTag:o.Fragment,features:de,visible:s==="visible",name:"Transition"})})})}),He=z(function(e,t){let r=o.useContext(q)!==null,n=ae()!==null;return $(Ee,{children:!r&&n?$(_,{ref:t,...e}):k.createElement(me,{ref:t,...e})})}),De=Object.assign(_,{Child:He,Root:_});export{le as $,z as C,De as J,ue as S,Me as T,re as a,R as b,ae as c,j as d,ye as e,fe as f,H as m,S as o,ne as p,A as s,we as t,E as u,oe as y};

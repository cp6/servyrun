import{j as c,a as s,r as p}from"./app-a8d4275f.js";import{m as h}from"./Toast-ee00046f.js";import{u as f,c as i}from"./Table-f19b692a.js";import{w as b}from"./index.esm-2010c99b.js";const N=({additionalContent:t,children:o,color:r="info",icon:a,onDismiss:l,rounded:n=!0,withBorderAccent:m,className:u,theme:d={}})=>{const e=h(f().theme.alert,d);return c("div",{className:i(e.root.base,e.root.color[r],n&&e.root.rounded,m&&e.root.borderAccent,u),role:"alert",children:[c("div",{className:e.root.wrapper,"data-testid":"flowbite-alert-wrapper",children:[a&&s(a,{className:e.root.icon,"data-testid":"flowbite-alert-icon"}),s("div",{children:o}),typeof l=="function"&&s("button",{"aria-label":"Dismiss",className:i(e.closeButton.base,e.closeButton.color[r]),onClick:l,type:"button",children:s(b,{"aria-hidden":!0,className:e.closeButton.icon})})]}),t&&s("div",{children:t})]})};function y({details:t=null}){const[o,r]=p.useState(t!==null);return o?s(N,{color:t.type,className:"mb-3 shadow-sm",onDismiss:function(){r(!1)},children:s("span",{children:t.message})}):s("div",{className:"py-8"})}export{y as R};
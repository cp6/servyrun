import{a,r as t}from"./app-3b14edf2.js";function w({message:r,className:e=""}){return r?a("p",{className:"text-sm text-red-600 "+e,children:r}):null}const E=t.forwardRef(function({type:e="text",name:n,id:c,value:u,className:d,autoComplete:f,required:i,step:l,minLength:p,maxLength:x,min:g,max:m,isFocused:y,handleChange:b,disabled:k},o){const s=o||t.useRef();return t.useEffect(()=>{y&&s.current.focus()},[]),a("div",{className:"flex flex-col items-start",children:a("input",{type:e,name:n,id:c,value:u,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"+d,ref:s,autoComplete:f,required:i,step:l,minLength:p,maxLength:x,min:g,max:m,onChange:h=>b(h),disabled:k})})});export{w as I,E as T};
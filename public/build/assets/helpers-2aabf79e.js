const m=(n,r=3,t="en-IN")=>n===null?null:new Intl.NumberFormat(t,{maximumSignificantDigits:r}).format(n);export{m as n};

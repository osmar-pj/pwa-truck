(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[875],{7570:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/crud",function(){return n(622)}])},622:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var s=n(5893),r=n(7294),a=n(2427),c=n(3045);n(7091);var i=n(598),l=n(7062);function o(e){let{data:t}=e,[n,o]=(0,r.useState)(!1),[d,h]=(0,r.useState)(!1),[j,u]=(0,r.useState)(""),[x,p]=(0,r.useState)(!1),[m,g]=(0,r.useState)(""),[b,f]=(0,r.useState)(null),w=async e=>{console.log(e);try{let t=await fetch("".concat("https://truck.paranoid.lat","/tajo/").concat(e),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json","ngrok-skip-browser-warning":!0}});if(t.ok){let e=await t.json();console.log(e),g(e),o(!0),p(!1)}else console.error("Error al obtener datos:",t.statusText)}catch(e){console.error("Error en la solicitud:",e)}},v=async(e,t)=>{try{h(!0),f(e)}catch(e){console.error("Error en la solicitud:",e)}};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"Container-title",children:[(0,s.jsx)("div",{className:"D-title-name",children:(0,s.jsx)("div",{children:(0,s.jsx)("h2",{children:"Lista de Operadores "})})}),(0,s.jsx)("div",{className:"D-title-more",children:(0,s.jsx)("button",{onClick:()=>o(!0)&p(!0),children:"+ Crear nuevo"})})]}),(0,s.jsxs)("div",{className:"Container-table",children:[(0,s.jsxs)("div",{className:"C-table-header",children:[(0,s.jsx)("div",{className:"c-t-h-search",children:(0,s.jsx)("input",{type:"text",value:j,onChange:e=>u(e.target.value),placeholder:"Buscar por nombre..."})}),(0,s.jsx)("div",{className:"c-t-h-items",children:"Items:"})]}),(0,s.jsx)("div",{className:"C-table-body",children:(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"#"}),(0,s.jsx)("th",{children:"Nombre"}),(0,s.jsx)("th",{children:"Mina"}),(0,s.jsx)("th",{children:"Tara"}),(0,s.jsx)("th",{children:"Validez"}),(0,s.jsx)("th",{children:"Fecha de creaci\xf3n"}),(0,s.jsx)("th",{children:"Acciones"})]})}),(0,s.jsx)("tbody",{children:t&&t.length>0?t.slice().sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime()).map((e,t)=>(0,s.jsxs)("tr",{children:[(0,s.jsxs)("td",{children:[t+1," "]}),(0,s.jsx)("td",{children:e.tag}),(0,s.jsx)("td",{children:e.mining}),(0,s.jsx)("td",{children:e.tara}),(0,s.jsx)("td",{children:e.valid}),(0,s.jsx)("td",{children:function(e){let t=new Date(e),n=t.getHours(),s=t.getMinutes(),r=t.getDate(),a=t.getMonth()+1,c=t.getFullYear()%100;return"".concat(r,"/").concat(a,"/").concat(c,", ").concat(n<10?"0".concat(n):n,":").concat(s<10?"0".concat(s):s)}(e.createdAt)}),(0,s.jsx)("td",{children:(0,s.jsxs)("div",{className:"btns",children:[(0,s.jsx)("button",{onClick:()=>w(e.tajoId),children:(0,s.jsx)(a.Z,{})}),(0,s.jsx)("button",{onClick:()=>v(e._id),children:(0,s.jsx)(c.Z,{})})]})})]},t)):(0,s.jsx)("tr",{children:(0,s.jsx)("td",{colSpan:"5",children:"Sin datos"})})})]})})]}),n&&(0,s.jsx)(l.Z,{setCreate:o,userToEdit:m,isCreateUser:x}),d&&(0,s.jsx)(i.Z,{setDelet:h,userToDeleteId:b})]})}function d(){let[e,t]=(0,r.useState)(null);return(0,r.useEffect)(()=>{let e=async()=>{try{let e=await fetch("".concat("https://truck.paranoid.lat","/testWagon"),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json","ngrok-skip-browser-warning":!0}});if(e.ok){let n=await e.json();console.log(n),t(n)}else setError("Error al obtener datos")}catch(e){console.error("Database Error:",e)}};e()},[]),(0,s.jsx)("section",{className:"w-Crud",children:(0,s.jsx)("div",{className:"Cont",children:(0,s.jsx)(o,{data:e})})})}}},function(e){e.O(0,[448,832,356,774,888,179],function(){return e(e.s=7570)}),_N_E=e.O()}]);
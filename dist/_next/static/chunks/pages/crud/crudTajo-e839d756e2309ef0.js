(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[550],{7462:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/crud/crudTajo",function(){return n(6224)}])},6224:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(5893);n(863);var s=n(7294),c=n(2427),a=n(3045),o=n(7091),i=n(598);function l(e){let{data:t}=e,[n,l]=(0,s.useState)(!1),[d,h]=(0,s.useState)(!1),[j,x]=(0,s.useState)(""),[u,p]=(0,s.useState)(!1),[m,g]=(0,s.useState)(""),[v,b]=(0,s.useState)(null),C=async e=>{console.log(e);try{let t=await fetch("".concat("https://truck.paranoid.lat","/tajo/").concat(e),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json","ngrok-skip-browser-warning":!0}});if(t.ok){let e=await t.json();console.log(e),g(e),l(!0),p(!1)}else console.error("Error al obtener datos:",t.statusText)}catch(e){console.error("Error en la solicitud:",e)}},N=async(e,t)=>{try{h(!0),b(e)}catch(e){console.error("Error en la solicitud:",e)}};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"Container-title",children:[(0,r.jsx)("div",{className:"D-title-name",children:(0,r.jsx)("div",{children:(0,r.jsx)("h2",{children:"Lista de operaciones "})})}),(0,r.jsx)("div",{className:"D-title-more",children:(0,r.jsx)("button",{onClick:()=>l(!0)&p(!0),children:"+ Crear nuevo"})})]}),(0,r.jsxs)("div",{className:"Container-table",children:[(0,r.jsxs)("div",{className:"C-table-header",children:[(0,r.jsx)("div",{className:"c-t-h-search",children:(0,r.jsx)("input",{type:"text",value:j,onChange:e=>x(e.target.value),placeholder:"Buscar por nombre..."})}),(0,r.jsx)("div",{className:"c-t-h-items",children:"Items:"})]}),(0,r.jsx)("div",{className:"C-table-body",children:(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"#"}),(0,r.jsx)("th",{children:"Operador"}),(0,r.jsx)("th",{children:"Cami\xf3n"}),(0,r.jsx)("th",{children:"Ruta"}),(0,r.jsx)("th",{children:"Turno"}),(0,r.jsx)("th",{children:"Horometro"}),(0,r.jsx)("th",{children:"Color"}),(0,r.jsx)("th",{children:"# Viajes"}),(0,r.jsx)("th",{children:"Fecha de creaci\xf3n"}),(0,r.jsx)("th",{children:"Acciones"})]})}),(0,r.jsx)("tbody",{children:t&&t.length>0?t.slice().sort((e,t)=>new Date(t.operation.createdAt).getTime()-new Date(e.operation.createdAt).getTime()).map((e,t)=>(0,r.jsxs)("tr",{children:[(0,r.jsxs)("td",{children:[t+1," "]}),(0,r.jsx)("td",{children:e.operation.operator}),(0,r.jsx)("td",{children:e.operation.locomotive}),(0,r.jsx)("td",{children:e.operation.ruta}),(0,r.jsx)("td",{children:e.operation.turno}),(0,r.jsx)("td",{children:e.operation.qtyHorometer}),(0,r.jsx)("td",{children:e.operation.color}),(0,r.jsx)("td",{children:e.operation.travels}),(0,r.jsx)("td",{children:function(e){let t=new Date(e),n=t.getHours(),r=t.getMinutes(),s=t.getDate(),c=t.getMonth()+1,a=t.getFullYear()%100;return"".concat(s,"/").concat(c,"/").concat(a,", ").concat(n<10?"0".concat(n):n,":").concat(r<10?"0".concat(r):r)}(e.operation.createdAt)}),(0,r.jsx)("td",{children:(0,r.jsxs)("div",{className:"btns",children:[(0,r.jsx)("button",{onClick:()=>C(e.tajoId),children:(0,r.jsx)(c.Z,{})}),(0,r.jsx)("button",{onClick:()=>N(e.tajoId),children:(0,r.jsx)(a.Z,{})})]})})]},t)):(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:"9",children:"Sin datos"})})})]})})]}),n&&(0,r.jsx)(o.Z,{setCreate:l,userToEdit:m,isCreateUser:u}),d&&(0,r.jsx)(i.Z,{setDelet:h,userToDeleteId:v})]})}function d(){let[e,t]=(0,s.useState)(null);return(0,s.useEffect)(()=>{let e=async()=>{try{let e=await fetch("".concat("https://truck.paranoid.lat","/tajo"),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json","ngrok-skip-browser-warning":!0}});if(e.ok){let n=await e.json();console.log(n),t(n)}else setError("Error al obtener datos")}catch(e){console.error("Database Error:",e)}};e()},[]),(0,r.jsx)("section",{className:"w-Crud",children:(0,r.jsx)("div",{className:"Cont",children:(0,r.jsx)(l,{data:e})})})}},863:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(5893),s=n(7294),c=n(2427),a=n(3045);n(7091);var o=n(598),i=n(7062);function l(e){let{data:t}=e,[n,l]=(0,s.useState)(!1),[d,h]=(0,s.useState)(!1),[j,x]=(0,s.useState)(""),[u,p]=(0,s.useState)(!1),[m,g]=(0,s.useState)(""),[v,b]=(0,s.useState)(null),C=async e=>{console.log(e);try{let t=await fetch("".concat("https://truck.paranoid.lat","/tajo/").concat(e),{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json","ngrok-skip-browser-warning":!0}});if(t.ok){let e=await t.json();console.log(e),g(e),l(!0),p(!1)}else console.error("Error al obtener datos:",t.statusText)}catch(e){console.error("Error en la solicitud:",e)}},N=async(e,t)=>{try{h(!0),b(e)}catch(e){console.error("Error en la solicitud:",e)}};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"Container-title",children:[(0,r.jsx)("div",{className:"D-title-name",children:(0,r.jsx)("div",{children:(0,r.jsx)("h2",{children:"Lista de Operadores "})})}),(0,r.jsx)("div",{className:"D-title-more",children:(0,r.jsx)("button",{onClick:()=>l(!0)&p(!0),children:"+ Crear nuevo"})})]}),(0,r.jsxs)("div",{className:"Container-table",children:[(0,r.jsxs)("div",{className:"C-table-header",children:[(0,r.jsx)("div",{className:"c-t-h-search",children:(0,r.jsx)("input",{type:"text",value:j,onChange:e=>x(e.target.value),placeholder:"Buscar por nombre..."})}),(0,r.jsx)("div",{className:"c-t-h-items",children:"Items:"})]}),(0,r.jsx)("div",{className:"C-table-body",children:(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"#"}),(0,r.jsx)("th",{children:"Nombre"}),(0,r.jsx)("th",{children:"Mina"}),(0,r.jsx)("th",{children:"Validez"}),(0,r.jsx)("th",{children:"Fecha de creaci\xf3n"}),(0,r.jsx)("th",{children:"Acciones"})]})}),(0,r.jsx)("tbody",{children:t&&t.length>0?t.slice().sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime()).map((e,t)=>(0,r.jsxs)("tr",{children:[(0,r.jsxs)("td",{children:[t+1," "]}),(0,r.jsx)("td",{children:e.name}),(0,r.jsx)("td",{children:e.mining}),(0,r.jsx)("td",{children:e.valid}),(0,r.jsx)("td",{children:function(e){let t=new Date(e),n=t.getHours(),r=t.getMinutes(),s=t.getDate(),c=t.getMonth()+1,a=t.getFullYear()%100;return"".concat(s,"/").concat(c,"/").concat(a,", ").concat(n<10?"0".concat(n):n,":").concat(r<10?"0".concat(r):r)}(e.createdAt)}),(0,r.jsx)("td",{children:(0,r.jsxs)("div",{className:"btns",children:[(0,r.jsx)("button",{onClick:()=>C(e.tajoId),children:(0,r.jsx)(c.Z,{})}),(0,r.jsx)("button",{onClick:()=>N(e._id),children:(0,r.jsx)(a.Z,{})})]})})]},t)):(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:"5",children:"Sin datos"})})})]})})]}),n&&(0,r.jsx)(i.Z,{setCreate:l,userToEdit:m,isCreateUser:u}),d&&(0,r.jsx)(o.Z,{setDelet:h,userToDeleteId:v})]})}}},function(e){e.O(0,[448,832,356,774,888,179],function(){return e(e.s=7462)}),_N_E=e.O()}]);
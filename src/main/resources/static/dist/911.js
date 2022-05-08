"use strict";(self.webpackChunkjavascript=self.webpackChunkjavascript||[]).push([[911],{7911:function(e,t,n){n.r(t),n.d(t,{AddPenaltyPage:function(){return b}});var a=n(7294),r=n(6668),c=n(9669),l=n.n(c),o=n(9942),i=n(6974),s=n(9952),u=n(5005),d=n(7577);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){m(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,c=[],l=!0,o=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);l=!0);}catch(e){o=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(o)throw r}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var b=function(e){var t=(0,i.TH)(),n=(0,i.s0)(),c=t.state.eventId,f=v((0,a.useState)([]),2),y=f[0],b=f[1],g=v((0,a.useState)([]),2),h=g[0],E=g[1],O=v((0,a.useState)([]),2),w=O[0],S=O[1],j=v((0,a.useState)(),2),N=j[0],k=j[1],P=v((0,a.useState)(),2),x=P[0],C=P[1],I=v((0,a.useState)({penaltyDesc:"",penaltyKind:null}),2),A=I[0],D=I[1],K=v((0,a.useState)(!1),2),T=K[0],Z=K[1],z=v((0,a.useState)(!1),2),L=z[0],Q=z[1],V=v((0,a.useState)(),2),H=V[0],M=V[1],R=v((0,a.useState)(0),2),U=R[0],W=R[1];(0,a.useEffect)((function(){void 0===c&&n("/"),l().get("".concat((0,o.AC)(),"/penalty/getPenaltyOptions")).then((function(e){S(e.data)}))}),[]),(0,a.useEffect)((function(){void 0!==c&&l().get("".concat((0,o.AC)(),"/event/getPsOptions?eventId=").concat(c)).then((function(e){var t;b(e.data),C(null===(t=e.data[0])||void 0===t?void 0:t.value)}))}),[c]),(0,a.useEffect)((function(){void 0!==x&&(Z(!0),l().get("".concat((0,o.AC)(),"/team/getTeamOptions?stageId=").concat(x,"&mode=PENALTY")).then((function(e){E(e.data),Z(!1),Q(!1),0===e.data.length&&Q(!0)})))}),[x]),(0,a.useEffect)((function(){if(0!==h.length){var e=h.find((function(e){return e.value===N}));k(e?null==e?void 0:e.value:h[0].value)}}),[h]),(0,a.useEffect)((function(){w.length>0&&D(p(p({},A),{},{penaltyKind:w[0].value}))}),[w]);return a.createElement("div",{className:"u-text-center card-body pb-5"},a.createElement("div",{className:"u-box-shadow "},a.createElement("div",{className:"col-xl-12"},a.createElement("h5",{className:"pb-2 mb-1 border-bottom"},"Dodaj kare:")),a.createElement("div",{className:"row justify-content-center text-center"},a.createElement("div",{className:"col-lg-4 pb-1"},a.createElement(r.Q,{label:"Odcinek PS",options:y,value:sessionStorage.getItem("refereeStageId"),handleChange:function(e){C(e),sessionStorage.setItem("refereeStageId",e)},isValid:!0}),a.createElement(r.Q,{label:"Załoga",options:h,value:N,handleChange:function(e){return k(e)},isValid:!0,isLoading:T}),a.createElement("div",{className:"d-flex"},a.createElement("div",{className:"py-1",style:{width:"100%"}},a.createElement(r.Q,{label:"Rodzaj kary",options:w,handleChange:function(e){return D(p(p({},A),{},{penaltyKind:e}))},isValid:!0,isLoading:0===w.length})),"100"===A.penaltyKind&&a.createElement("div",{className:"px-1"},a.createElement(d.K,{label:"Kara w sekundach",inputPlaceholder:"00",value:U,handleChange:function(e){return W(e.target.value)},onlyNumber:!0,big:!0,type:"number"}))),a.createElement("textarea",{placeholder:"Dodatkowy opis",value:A.penaltyDesc,name:"penaltyDesc",onChange:function(e){D(p(p({},A),{},m({},e.target.name,e.target.value)))},className:"form-control centered-grid ",rows:2,disabled:L}),a.createElement("div",{className:"col-xl-12 pt-1"},a.createElement("button",{type:"button",className:"btn btn-success mx-2 py-1",onClick:function(){var e,t;e={teamId:N,stageId:x,penaltyKind:A.penaltyKind,description:A.penaltyDesc},t=U,l().post("".concat((0,o.AC)(),"/penalty/addPenalty?seconds=").concat(t),e,{headers:(0,s.Z)()}).then((function(n){if(1===n.data){var a,r=null===(a=h.find((function(t){return t.value===e.teamId})))||void 0===a?void 0:a.label,c=w.find((function(t){return t.value===e.penaltyKind}));M("Dodano kare: ".concat(c.label," ").concat(0!==t?";Liczba sekund: "+t+"s ":"","; Kierowca:").concat(r)),setTimeout((function(){return M()}),1e4)}})),D(p(p({},A),{},{penaltyDesc:""})),W(0)},disabled:L||void 0===N},"Zapisz kare"))),a.createElement("div",{className:"col-lg-10 border-bottom",style:{height:"40px"}},a.createElement("p",{className:"px-0"},H)))),a.createElement("div",{className:"col-sm pt-1"}),a.createElement(u.Z,{className:"mx-2 py-1 px-2",variant:"primary",onClick:function(){return n("/add_score",{state:{eventId:c}})}},"Przejdź do dodawania wyników"),a.createElement(u.Z,{className:"mx-2 py-1 px-2",variant:"success",onClick:function(){return n("/event",{state:{eventId:c}})}},"Wyniki"))};t.default=b}}]);
//# sourceMappingURL=911.js.map
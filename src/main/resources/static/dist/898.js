"use strict";(self.webpackChunkjavascript=self.webpackChunkjavascript||[]).push([[898],{7091:function(e,t,a){a.d(t,{m:function(){return c}});var n=a(7294),r=a(1881),l=a(5005),c=(a(4039),function(e){var t=e.show,a=e.title,c=e.text,o=e.handleAccept,u=e.handleClose;return n.createElement(r.Z,{show:t,onHide:u,backdrop:"static",keyboard:!1},n.createElement(r.Z.Header,{closeButton:!0},n.createElement(r.Z.Title,null,a)),n.createElement(r.Z.Body,null,n.createElement("p",null,c)),n.createElement(r.Z.Footer,{className:"justify-content-center"},n.createElement(l.Z,{className:"mx-3",variant:"secondary",onClick:u},"Anuluj"),n.createElement(l.Z,{className:"px-4 mx-3",variant:"success",onClick:o},"OK")))})},9898:function(e,t,a){a.r(t),a.d(t,{AddScorePage:function(){return p},default:function(){return y}});var n=a(7294),r=a(6668),l=a(9669),c=a.n(l),o=(a(4039),a(7577)),u=function(e){var t=e.onClick,a=e.label,r=e.isConfirmed,l=void 0!==r&&r,c=e.name,o=e.value;return n.createElement("div",{className:"form-check"},n.createElement("input",{onClick:t,defaultChecked:l,className:"form-check-input",type:"radio",name:c,value:o}),n.createElement("label",{className:"form-check-label"},a))},i=a(9942),s=a(6974),d=a(9952),m=a(5005),f=a(7091);function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,l=[],c=!0,o=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);c=!0);}catch(e){o=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(o)throw r}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?b(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var p=function(e){var t,a=(0,s.TH)(),l=(0,s.s0)(),b=a.state.eventId,p=[{value:"NEW",desc:"Wprowadzanie nowych wyników"},{value:"EDIT",desc:"Tryb edycji wyników"}],y=v((0,n.useState)(""),2),h=y[0],g=y[1],E=v((0,n.useState)(p[0].value),2),S=E[0],k=E[1],N=v((0,n.useState)(),2),w=N[0],C=N[1],I=v((0,n.useState)([]),2),x=I[0],A=I[1],Z=v((0,n.useState)([]),2),j=Z[0],z=Z[1],T=v((0,n.useState)(),2),P=T[0],M=(T[1],v((0,n.useState)(),2)),O=M[0],W=(M[1],v((0,n.useState)(),2)),K=W[0],H=W[1],U=v((0,n.useState)(),2),B=U[0],D=U[1],Q=v((0,n.useState)(),2),V=Q[0],F=Q[1],L=v((0,n.useState)(),2),$=L[0],_=L[1],q=v((0,n.useState)(),2),G=q[0],J=q[1],R=v((0,n.useState)(!1),2),X=R[0],Y=R[1],ee=v((0,n.useState)(!1),2),te=ee[0],ae=ee[1],ne=v((0,n.useState)(!0),2),re=ne[0],le=ne[1],ce=v((0,n.useState)(!1),2),oe=ce[0],ue=ce[1],ie=function(){Y(!0),c().get("".concat((0,i.AC)(),"/team/getTeamOptions?stageId=").concat(G,"&mode=").concat(S),{headers:(0,d.Z)()}).then((function(e){z(e.data),Y(!1),ae(!1),0===e.data.length&&(me(),g("Wszystkie wyniki wybranego odcinka zostały wprowadzone"))}))};(0,n.useEffect)((function(){void 0===b&&l("/"),c().get("".concat((0,i.AC)(),"/event/getPsOptions?eventId=").concat(b),{headers:(0,d.Z)()}).then((function(e){var t;A(e.data),J(null===(t=e.data[0])||void 0===t?void 0:t.value)}))}),[]),(0,n.useEffect)((function(){x.length>0&&void 0!==G&&ie()}),[G,x]),(0,n.useEffect)((function(){if(0!==j.length){var e=j.find((function(e){return e.value===$}));_(e?null==e?void 0:e.value:j[0].value)}}),[j]),(0,n.useEffect)((function(){void 0!==$&&S===p[1].value&&se()}),[$,S]),(0,n.useEffect)((function(){void 0!==G&&ie()}),[S]);var se=function(){c().get("".concat((0,i.AC)(),"/score/getTeamScore?eventId=").concat(b,"&stageId=").concat(G,"&teamId=").concat($)).then((function(e){H(e.data.scoreMin),D(e.data.scoreSec),F(e.data.scoreMiliSec),C(e.data.stageScoreId)}))},de=function(e){e.target.checked&&S!==e.target.value&&(k(e.target.value),me(),z([]))},me=function(){ae(!0),H(""),D(""),F("")};return n.createElement("div",{className:"u-text-center"},n.createElement("div",{className:"u-box-shadow"},n.createElement("div",{className:"col-xl-12"},n.createElement("h5",{className:"pb-1 mb-0 border-bottom"},"Dodaj wynik:")),n.createElement("div",{className:"row justify-content-center"},n.createElement("div",{className:"col-lg-4 pb-1 border-bottom"},n.createElement("div",{className:"centered-grid form-group "},n.createElement(u,{label:p[0].desc,value:p[0].value,isConfirmed:S===p[0].value,onClick:function(e){return de(e)},name:"editMode"}),n.createElement(u,{label:p[1].desc,value:p[1].value,isConfirmed:!1,onClick:function(e){return de(e)},name:"editMode"})),n.createElement("div",{className:"pb-0"}),n.createElement(r.Q,{label:"Odcinek PS",options:x,value:sessionStorage.getItem("refereeStageId"),handleChange:function(e){J(e),sessionStorage.setItem("refereeStageId",e)},isValid:!0}),n.createElement(r.Q,{label:"Załoga",options:j,value:$,handleChange:function(e){return _(e)},isValid:!0,isLoading:X})),n.createElement("div",{className:"col-lg-4 pb-1 border-bottom"},n.createElement("div",{className:"row"},n.createElement("div",{className:"col-xl-12"},n.createElement("h5",{className:"mb-0"},"Czas"),n.createElement("div",{className:"inline-flex"},n.createElement(o.K,{label:"Minuty",inputPlaceholder:"00",value:K,handleChange:function(e){return H(e.target.value)},disabled:te,onlyNumber:!0,type:"number"}),n.createElement(o.K,{label:"Sekundy",inputPlaceholder:"00",value:B,handleChange:function(e){return D(e.target.value)},disabled:te,onlyNumber:!0,max:59,type:"number"}),n.createElement(o.K,{label:"Setne",inputPlaceholder:"00",value:V,handleChange:function(e){return F(e.target.value)},disabled:te,onlyNumber:!0,max:99,type:"number"})),n.createElement("div",{className:"col-xl-12 pt-1 fw-bolder"},h),n.createElement("div",{className:"col-xl-12 pt-1 fw-bolder"},re),n.createElement("div",{className:"col-xl-12 pt-2"},n.createElement("button",{type:"button",className:"btn btn-success mx-2 py-1",onClick:function(){if(null==K||""===K||null==B||""===B||null==V||""===V)le("Wprowadź pełny wynik");else{le();var e=60*P+O,t=60*Number(K)*1e3+1e3*Number(B)+10*Number(V);a={teamId:$,stageId:G,stageStartTime:e,score:t,stageScoreId:S===p[1].value?w:null},c().post("".concat((0,i.AC)(),"/score/addScore"),a,{headers:(0,d.Z)()}).then((function(e){ie(),g(e.data),setTimeout((function(){return g()}),1e4)})),me()}var a},disabled:te},"Zapisz wynik"),S===p[1].value&&n.createElement("button",{type:"button",className:"btn btn-danger mx-2",onClick:function(){return ue(!0)},disabled:te},"Usuń wynik"))))))),n.createElement("div",{className:"col-sm pt-3"}),n.createElement(m.Z,{className:"mx-2 py-1 px-2",variant:"primary",onClick:function(){return l("/add_penalty",{state:{eventId:b}})}},"Przejdź do dodawania kar"),n.createElement(m.Z,{className:"mx-2 py-1 px-2",variant:"success",onClick:function(){return l("/event",{state:{eventId:b}})}},"Wyniki"),oe&&n.createElement(f.m,{show:!0,title:"Usuwanie załogi",text:"Czy napewno chcesz usunąć wynik załogi:  ".concat(null===(t=j.find((function(e){return e.value===$})))||void 0===t?void 0:t.label),handleAccept:function(){var e;e={teamId:$,stageId:G,stageScoreId:S===p[1].value?w:null},c().post("".concat((0,i.AC)(),"/score/removeScore"),e,{headers:(0,d.Z)()}).then((function(e){ie(),g(e.data),setTimeout((function(){return g()}),1e4)})),ue(!1)},handleClose:function(){ue(!1)}}))},y=p}}]);
//# sourceMappingURL=898.js.map
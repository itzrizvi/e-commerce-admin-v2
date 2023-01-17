/*! For license information please see 24.0798cc23.chunk.js.LICENSE.txt */
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[24],{1048:function(e,t,a){"use strict";a.r(t);a(216);var n=a(132),r=(a(303),a(151)),i=(a(235),a(72)),l=(a(327),a(180)),o=(a(237),a(77)),u=(a(232),a(150)),d=(a(127),a(25)),s=(a(103),a(32)),c=(a(149),a(84)),m=(a(126),a(38)),f=(a(387),a(328)),p=a(92),v=a(73),h=a(6),y=a(59),g=(a(215),a(19)),b=a(13),E=a(0),O=a.n(E),j=a(128),_=a(109),C=a(108),w=a(67),x=a(12),S=a(26),A=a(20),T=(a(98),a(42)),I=(a(129),a(60)),N=(a(302),a(131)),D=(a(164),a(33)),P=a(22),L=a.n(P),k=a(99),U=function(e){var t=e.defaultBilling,a=e.initialData,n=e.billingAddress,r=e.setBillingAddress,i=e.setDefaultBilling,l=Object(E.useState)([]),o=Object(b.a)(l,2),d=o[0],c=o[1],m=Object(E.useState)({data:[],loading:!0}),f=Object(b.a)(m,2),p=f[0],y=f[1];Object(E.useEffect)((function(){S.j.query({query:k.a.GET_COUNTRY_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t=e.data.getCountryList;if(!t.status)return!0;c(null===t||void 0===t?void 0:t.data)})),S.j.query({query:k.a.GET_STATE_LISTS,variables:{query:{code:""}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getStateList;(null===i||void 0===i?void 0:i.status)&&(y({data:Object(h.a)(Object(h.a)({},a),{},{states:null===i||void 0===i?void 0:i.data}),loading:!1}),r(n.map((function(e){var t;return Object(h.a)(Object(h.a)({},e),{},{states:null===i||void 0===i||null===(t=i.data)||void 0===t?void 0:t.filter((function(t){return t.country_code===e.countryCode.code}))})}))))})).finally((function(){y((function(e){return Object(h.a)(Object(h.a)({},e),{},{loading:!1})}))}))}),[]);var g=[{title:"Country",dataIndex:["countryCode","name"],key:"name",render:function(e,t){var a;return O.a.createElement(D.a,{onSelect:function(e){r(n.map((function(a){return a.id===t.id?Object(h.a)(Object(h.a)({},a),{},{country:e,states:p.data.states.filter((function(t){return t.country_code===e}))}):a})))},style:{width:"100%"},placeholder:"Country",defaultValue:null===t||void 0===t||null===(a=t.countryCode)||void 0===a?void 0:a.code,options:null===d||void 0===d?void 0:d.map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e.code}}))})}},{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return O.a.createElement(s.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return O.a.createElement(s.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return O.a.createElement(s.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"states",key:"states",width:150,render:function(e,t){return O.a.createElement(D.a,{style:{width:"100%"},placeholder:"State",options:null===e||void 0===e?void 0:e.map((function(e){return{label:e.state,value:e.abbreviation}})),onSelect:function(e){return t.state=e},defaultValue:t.state})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return O.a.createElement(s.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return O.a.createElement(u.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return O.a.createElement(N.a,{checked:t===a.id,onChange:function(e){return i(a.id)}})}}];return O.a.createElement("div",null,O.a.createElement(I.a,{loading:null===p||void 0===p?void 0:p.loading,className:"table-responsive",columns:g,pagination:!1,rowKey:"id",size:"small",dataSource:n}),O.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},O.a.createElement(T.a,{disabled:null===p||void 0===p?void 0:p.loading,title:"Add Address",htmlType:"button",type:"primary",onClick:function(){r((function(e){return[].concat(Object(v.a)(e),[Object(h.a)(Object(h.a)({},p.data),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},O.a.createElement(L.a,{icon:"plus"}))))},F=function(e){var t=e.defaultShipping,a=e.initialData,n=e.shippingAddress,r=e.setShippingAddress,i=e.setDefaultShipping,l=Object(E.useState)([]),o=Object(b.a)(l,2),d=o[0],c=o[1],m=Object(E.useState)({data:[],loading:!0}),f=Object(b.a)(m,2),p=f[0],y=f[1];Object(E.useEffect)((function(){S.j.query({query:k.a.GET_COUNTRY_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t=e.data.getCountryList;if(!t.status)return!0;c(null===t||void 0===t?void 0:t.data)})),S.j.query({query:k.a.GET_STATE_LISTS,variables:{query:{code:""}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getStateList;(null===i||void 0===i?void 0:i.status)&&(y({data:Object(h.a)(Object(h.a)({},a),{},{states:null===i||void 0===i?void 0:i.data}),loading:!1}),r(n.map((function(e){var t;return Object(h.a)(Object(h.a)({},e),{},{states:null===i||void 0===i||null===(t=i.data)||void 0===t?void 0:t.filter((function(t){return t.country_code===e.countryCode.code}))})}))))})).finally((function(){y((function(e){return Object(h.a)(Object(h.a)({},e),{},{loading:!1})}))}))}),[]);var g=[{title:"Country",dataIndex:["countryCode","name"],key:"name",render:function(e,t){var a;return O.a.createElement(D.a,{onSelect:function(e){r(n.map((function(a){return a.id===t.id?Object(h.a)(Object(h.a)({},a),{},{country:e,states:p.data.states.filter((function(t){return t.country_code===e}))}):a})))},style:{width:"100%"},placeholder:"Country",defaultValue:null===t||void 0===t||null===(a=t.countryCode)||void 0===a?void 0:a.code,options:null===d||void 0===d?void 0:d.map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e.code}}))})}},{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return O.a.createElement(s.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return O.a.createElement(s.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return O.a.createElement(s.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"states",key:"states",width:150,render:function(e,t){return O.a.createElement(D.a,{style:{width:"100%"},placeholder:"State",options:null===e||void 0===e?void 0:e.map((function(e){return{label:e.state,value:e.abbreviation}})),onSelect:function(e){return t.state=e},defaultValue:t.state})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return O.a.createElement(s.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return O.a.createElement(u.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return O.a.createElement(N.a,{name:"isDefault",checked:t===a.id,onChange:function(e){return i(a.id)}})}}];return O.a.createElement("div",null,O.a.createElement(I.a,{className:"table-responsive",columns:g,pagination:!1,rowKey:"id",size:"small",loading:null===p||void 0===p?void 0:p.loading,dataSource:n}),O.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},O.a.createElement(T.a,{disabled:null===p||void 0===p?void 0:p.loading,title:"Add Address",htmlType:"button",type:"primary",onClick:function(){r((function(e){return[].concat(Object(v.a)(e),[Object(h.a)(Object(h.a)({},p.data),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},O.a.createElement(L.a,{icon:"plus"}))))},R=a(47),V=a(54),z=a(649),q=a(655),G=["__typename","type","createdAt","updatedAt"],B=["parent_id","isNew","id","isDefault","countryCode","states"],$=["parent_id","isNew","isDefault","id","countryCode","states"];function M(){M=function(){return e};var e={},t=Object.prototype,a=t.hasOwnProperty,n=Object.defineProperty||function(e,t,a){e[t]=a.value},r="function"==typeof Symbol?Symbol:{},i=r.iterator||"@@iterator",l=r.asyncIterator||"@@asyncIterator",o=r.toStringTag||"@@toStringTag";function u(e,t,a){return Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(A){u=function(e,t,a){return e[t]=a}}function d(e,t,a,r){var i=t&&t.prototype instanceof m?t:m,l=Object.create(i.prototype),o=new w(r||[]);return n(l,"_invoke",{value:O(e,a,o)}),l}function s(e,t,a){try{return{type:"normal",arg:e.call(t,a)}}catch(A){return{type:"throw",arg:A}}}e.wrap=d;var c={};function m(){}function f(){}function p(){}var v={};u(v,i,(function(){return this}));var h=Object.getPrototypeOf,y=h&&h(h(x([])));y&&y!==t&&a.call(y,i)&&(v=y);var g=p.prototype=m.prototype=Object.create(v);function b(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function E(e,t){var r;n(this,"_invoke",{value:function(n,i){function l(){return new t((function(r,l){!function n(r,i,l,o){var u=s(e[r],e,i);if("throw"!==u.type){var d=u.arg,c=d.value;return c&&"object"==typeof c&&a.call(c,"__await")?t.resolve(c.__await).then((function(e){n("next",e,l,o)}),(function(e){n("throw",e,l,o)})):t.resolve(c).then((function(e){d.value=e,l(d)}),(function(e){return n("throw",e,l,o)}))}o(u.arg)}(n,i,r,l)}))}return r=r?r.then(l,l):l()}})}function O(e,t,a){var n="suspendedStart";return function(r,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===r)throw i;return S()}for(a.method=r,a.arg=i;;){var l=a.delegate;if(l){var o=j(l,a);if(o){if(o===c)continue;return o}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if("suspendedStart"===n)throw n="completed",a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);n="executing";var u=s(e,t,a);if("normal"===u.type){if(n=a.done?"completed":"suspendedYield",u.arg===c)continue;return{value:u.arg,done:a.done}}"throw"===u.type&&(n="completed",a.method="throw",a.arg=u.arg)}}}function j(e,t){var a=t.method,n=e.iterator[a];if(void 0===n)return t.delegate=null,"throw"===a&&e.iterator.return&&(t.method="return",t.arg=void 0,j(e,t),"throw"===t.method)||"return"!==a&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+a+"' method")),c;var r=s(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,c;var i=r.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,c):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,c)}function _(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function C(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function w(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(_,this),this.reset(!0)}function x(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(a.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:S}}function S(){return{value:void 0,done:!0}}return f.prototype=p,n(g,"constructor",{value:p,configurable:!0}),n(p,"constructor",{value:f,configurable:!0}),f.displayName=u(p,o,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,u(e,o,"GeneratorFunction")),e.prototype=Object.create(g),e},e.awrap=function(e){return{__await:e}},b(E.prototype),u(E.prototype,l,(function(){return this})),e.AsyncIterator=E,e.async=function(t,a,n,r,i){void 0===i&&(i=Promise);var l=new E(d(t,a,n,r),i);return e.isGeneratorFunction(a)?l:l.next().then((function(e){return e.done?e.value:l.next()}))},b(g),u(g,o,"Generator"),u(g,i,(function(){return this})),u(g,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),a=[];for(var n in t)a.push(n);return a.reverse(),function e(){for(;a.length;){var n=a.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=x,w.prototype={constructor:w,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(C),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(a,n){return l.type="throw",l.arg=e,t.next=a,n&&(t.method="next",t.arg=void 0),!!n}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],l=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var o=a.call(i,"catchLoc"),u=a.call(i,"finallyLoc");if(o&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(o){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var l=i?i.completion:{};return l.type=e,l.arg=t,i?(this.method="next",this.next=i.finallyLoc,c):this.complete(l)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),c},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.finallyLoc===e)return this.complete(a.completion,a.afterLoc),C(a),c}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.tryLoc===e){var n=a.completion;if("throw"===n.type){var r=n.arg;C(a)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,a){return this.delegate={iterator:x(e),resultName:t,nextLoc:a},"next"===this.method&&(this.arg=void 0),c}},e}var Y={labelCol:{span:4},wrapperCol:{span:18}};t.default=function(){var e,t,a,T,I,N,D,P,L;Object(A.d)("customer");var k=Object(w.useHistory)(),Z=Object(w.useParams)(),H=Object(V.d)((function(e){return e.auth.token})),J=Object(E.useState)(!0),K=Object(b.a)(J,2),Q=K[0],W=K[1],X=Object(E.useState)(null),ee=Object(b.a)(X,2),te=ee[0],ae=ee[1],ne=Object(E.useState)(null),re=Object(b.a)(ne,2),ie=re[0],le=re[1],oe=Object(E.useState)(!1),ue=Object(b.a)(oe,2),de=ue[0],se=ue[1],ce=Object(E.useState)(!1),me=Object(b.a)(ce,2),fe=me[0],pe=me[1],ve=Object(E.useState)(!1),he=Object(b.a)(ve,2),ye=he[0],ge=he[1],be=g.a.useForm(),Ee=Object(b.a)(be,1)[0],Oe=g.a.useForm(),je=Object(b.a)(Oe,1)[0],_e=Object(E.useState)({data:null,isLoading:!0}),Ce=Object(b.a)(_e,2),we=Ce[0],xe=Ce[1],Se={address1:null,address2:null,city:null,state:null,zip_code:null,country:null,isDefault:!1,isNew:!0},Ae=Object(E.useState)([]),Te=Object(b.a)(Ae,2),Ie=Te[0],Ne=Te[1],De=Object(E.useState)([]),Pe=Object(b.a)(De,2),Le=Pe[0],ke=Pe[1],Ue=Object(E.useState)([]),Fe=Object(b.a)(Ue,2),Re=Fe[0],Ve=Fe[1],ze=Object(E.useState)(!1),qe=Object(b.a)(ze,2),Ge=qe[0],Be=qe[1],$e=Object(E.useState)("Add"),Me=Object(b.a)($e,2),Ye=Me[0],Ze=Me[1],He=Object(E.useState)(!0),Je=Object(b.a)(He,2),Ke=Je[0],Qe=Je[1],We=Object(E.useState)(null),Xe=Object(b.a)(We,2),et=Xe[0],tt=Xe[1],at=Object(E.useState)(null),nt=Object(b.a)(at,2),rt=nt[0],it=nt[1];Object(E.useEffect)((function(){(null===Z||void 0===Z?void 0:Z.id)&&S.j.query({query:S.i.GET_SINGLE_CUSTOMER,variables:{customer_id:parseInt(null===Z||void 0===Z?void 0:Z.id)},context:{headers:{TENANTID:"100001",Authorization:H}},fetchPolicy:"network-only"}).then((function(e){var t,a,n,r,i,l,o,u,d=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleCustomer;if(null===d||void 0===d?void 0:d.status){var s=[],c=[],m=[];xe({data:null===d||void 0===d?void 0:d.data,isLoading:!1}),W(null===d||void 0===d||null===(a=d.data)||void 0===a?void 0:a.user_status),Ee.setFieldsValue({first_name:null===d||void 0===d||null===(n=d.data)||void 0===n?void 0:n.first_name,last_name:null===d||void 0===d||null===(r=d.data)||void 0===r?void 0:r.last_name,email:null===d||void 0===d||null===(i=d.data)||void 0===i?void 0:i.email}),null===d||void 0===d||null===(l=d.data)||void 0===l||null===(o=l.addresses)||void 0===o||o.forEach((function(e){e.__typename,e.type,e.createdAt,e.updatedAt;var t=Object(y.a)(e,G);"shipping"===e.type&&(e.isDefault&&le(e.id),s.push(Object(h.a)(Object(h.a)({},t),{},{isNew:!1}))),"billing"===e.type&&(e.isDefault&&ae(e.id),c.push(Object(h.a)(Object(h.a)({},t),{},{isNew:!1})))})),null===d||void 0===d||null===(u=d.data)||void 0===u||u.contactPersons.forEach((function(e){m.push(Object(h.a)(Object(h.a)({},e),{},{isNew:!1}))})),Ve(m),Ne(s),ke(c)}})).catch((function(e){console.log("\ud83d\ude80 ~ file: AddAdmin.js ~ line 85 ~ useEffect ~ err",e)}))}),[null===Z||void 0===Z?void 0:Z.id]);Object(E.useEffect)((function(){if(de&&(null===Z||void 0===Z?void 0:Z.id)){var e=Le.map((function(e){e.parent_id;var t=e.isNew,a=e.id,n=(e.isDefault,e.countryCode,e.states,Object(y.a)(e,B));return Object(h.a)(Object(h.a)(Object(h.a)({isDefault:te===a,parent_id:parseInt(null===Z||void 0===Z?void 0:Z.id)},t?{isNew:t}:{isNew:!1}),n),!t&&{id:a})})),t=Ie.map((function(e){e.parent_id;var t=e.isNew,a=(e.isDefault,e.id),n=(e.countryCode,e.states,Object(y.a)(e,$));return Object(h.a)(Object(h.a)(Object(h.a)({isDefault:ie===a,parent_id:parseInt(null===Z||void 0===Z?void 0:Z.id)},t?{isNew:t}:{isNew:!1}),n),!t&&{id:a})}));["person","billing","shipping"].forEach((function(a){"person"===a?S.j.mutate({mutation:q.a.UPDATE_CONTACT_PERSON,variables:{data:{ref_id:parseInt(null===Z||void 0===Z?void 0:Z.id),type:"customer",contact_persons:Re.map((function(e){return Object(h.a)(Object(h.a)({},!e.isNew&&{id:e.id}),{},{name:e.name,email:e.email,phone:e.phone,fax:e.fax,status:e.status,isNew:e.isNew})}))}},context:{headers:{TENANTID:"100001",Authorization:H}}}).then((function(e){var t,a,n=(null===Z||void 0===Z?void 0:Z.id)?null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateContactPerson:null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.createContactPerson;if(!(null===n||void 0===n?void 0:n.status))return pe(!0)})).catch((function(e){pe(!0)})):(ge(!0),S.j.mutate({mutation:z.a.UPDATE_CUSTOMER_ADDRESSES,variables:{data:{ref_id:parseInt(null===Z||void 0===Z?void 0:Z.id),type:a,addresses:Object(v.a)("billing"===a?e:t)}},context:{headers:{TENANTID:"100001",Authorization:H}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateCustomerAddress;null===a||void 0===a||a.status})).catch((function(e){pe(!0)})).finally((function(e){ge(!1),"shipping"===a&&(fe||(it({type:"success",message:"Customer Updated Successfully."}),setTimeout((function(){k.push("/admin/customers/list")}),[2e3])))})))}))}}),[de,null===Z||void 0===Z?void 0:Z.id]);var lt=function(){var e=Object(p.a)(M().mark((function e(){var t;return M().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.validateFields(["email","name","phone"]);case 2:t=je.getFieldsValue(),Ve(et?function(e){return e.map((function(e){return e.id===et?Object(h.a)(Object(h.a)({},t),{},{id:et,isNew:!1}):e}))}:function(e){return[].concat(Object(v.a)(e),[Object(h.a)(Object(h.a)({},t),{},{id:(new Date).getTime(),isNew:!0})])}),Be(!1),je.resetFields();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return O.a.createElement(O.a.Fragment,null,O.a.createElement(j.a,{title:"Manage Customer | Edit Customer ".concat(we.isLoading?"":"(".concat(null===we||void 0===we||null===(e=we.data)||void 0===e?void 0:e.email,")"))}),O.a.createElement(_.b,null,O.a.createElement(m.a,{align:"middle",justify:"center",style:{margin:0,padding:0}},rt&&O.a.createElement(f.a,{style:{width:"50%",marginBottom:10},message:null===rt||void 0===rt?void 0:rt.message,type:null===rt||void 0===rt?void 0:rt.type,showIcon:!0,closable:!0})),O.a.createElement(m.a,{gutter:25},O.a.createElement(d.a,{sm:24,xs:24},O.a.createElement(C.a,{headless:!0},we.isLoading?O.a.createElement("div",{div:!0,className:"spin"},O.a.createElement(c.a,null)):O.a.createElement(g.a,{style:{width:"100%"},form:Ee,name:"editUser",onFinish:function(e){var t=Le.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,i=e.state,l=e.zip_code,o=e.address2;return!(t&&a&&n&&r&&i&&l&&o)}));if(null===t||void 0===t?void 0:t.id)return it({type:"warning",message:"Enter Billing Address Correctly!"});var a=Ie.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,i=e.state,l=e.zip_code,o=e.address2;return!(t&&a&&n&&r&&i&&l&&o)}));if(null===a||void 0===a?void 0:a.id)return it({type:"warning",message:"Enter Shipping Address Correctly!"});var n={data:Object(h.a)(Object(h.a)({},e),{},{user_status:Q,send_mail:!0,id:parseInt(null===Z||void 0===Z?void 0:Z.id)})};S.j.mutate({mutation:z.a.UPDATE_CUSTOMER,variables:n,context:{headers:{TENANTID:"100001",Authorization:H}},refetchQueries:[{query:S.i.GET_ALL_CUSTOMER,context:{headers:{TENANTID:"100001",Authorization:H}},fetchPolicy:"no-cache"},["getAllCustomer"]]}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateCustomer;if(!a.status)return it({type:"error",message:a.message});se(!0)})).catch((function(e){console.log("error on adding customer",e),pe(!0)})).finally((function(){return ge(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},O.a.createElement(o.a,null,O.a.createElement(o.a.TabPane,{tab:"Information",key:"information"},O.a.createElement(m.a,{gutter:25},O.a.createElement(d.a,{span:10},O.a.createElement(g.a.Item,{rules:[{required:!0,max:30,message:"Please Enter First Name"}],name:"first_name",label:"First Name",labelCol:{style:{width:"40%"}},initialValue:null===we||void 0===we||null===(t=we.data)||void 0===t?void 0:t.first_name},O.a.createElement(m.a,null,O.a.createElement(d.a,{span:20},O.a.createElement(s.a,{placeholder:"Enter First Name",defaultValue:null===we||void 0===we||null===(a=we.data)||void 0===a?void 0:a.first_name})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(d.a,{span:10},O.a.createElement(g.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Last Name"}],name:"last_name",label:"Last Name",labelCol:{style:{width:"40%"}},initialValue:null===we||void 0===we||null===(T=we.data)||void 0===T?void 0:T.last_name},O.a.createElement(m.a,null,O.a.createElement(d.a,{span:20},O.a.createElement(s.a,{placeholder:"Enter Last Name",defaultValue:null===we||void 0===we||null===(I=we.data)||void 0===I?void 0:I.last_name})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(d.a,{span:10},O.a.createElement(g.a.Item,{label:"Company Name",name:"company_name",labelCol:{style:{width:"40%"}}},O.a.createElement(m.a,null,O.a.createElement(d.a,{span:20},O.a.createElement(s.a,{type:"text",defaultValue:null===we||void 0===we||null===(N=we.data)||void 0===N?void 0:N.company_name,placeholder:"Enter Company Name"})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(d.a,{span:10},O.a.createElement(g.a.Item,{label:"Email",labelCol:{style:{width:"40%"}}},O.a.createElement(m.a,null,O.a.createElement(d.a,{span:20},O.a.createElement(s.a,{type:"email",disabled:!0,defaultValue:null===we||void 0===we||null===(D=we.data)||void 0===D?void 0:D.email})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(d.a,{span:10},O.a.createElement(g.a.Item,{label:"Phone",name:"phone",labelCol:{style:{width:"40%"}}},O.a.createElement(m.a,null,O.a.createElement(d.a,{span:20},O.a.createElement(s.a,{type:"text",defaultValue:null===we||void 0===we||null===(P=we.data)||void 0===P?void 0:P.phone,placeholder:"Enter Phone Number"})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(d.a,{span:10},O.a.createElement(g.a.Item,{label:"Fax",name:"fax",labelCol:{style:{width:"40%"}}},O.a.createElement(m.a,null,O.a.createElement(d.a,{span:20},O.a.createElement(s.a,{type:"text",defaultValue:null===we||void 0===we||null===(L=we.data)||void 0===L?void 0:L.fax,placeholder:"Enter Fax Number"})))))),O.a.createElement(g.a.Item,{label:"User Status"},O.a.createElement(u.a,{checked:Q,onChange:function(e){return W(e)}}))),O.a.createElement(o.a.TabPane,{tab:"Shipping Address",key:"shipping_address"},O.a.createElement(F,{initialData:Se,shippingAddress:Ie,setShippingAddress:Ne,defaultShipping:ie,setDefaultShipping:le})),O.a.createElement(o.a.TabPane,{tab:"Billing Address",key:"billing_address"},O.a.createElement(U,{initialData:Se,billingAddress:Le,setBillingAddress:ke,defaultBilling:te,setDefaultBilling:ae})),O.a.createElement(o.a.TabPane,{tab:"Contact Person",key:"contact_person"},O.a.createElement(m.a,{gutter:25},O.a.createElement(d.a,{span:24},O.a.createElement(R.a,{size:"small",style:{float:"right",marginBottom:20},title:"Add Person",htmlType:"button",type:"primary",onClick:function(){je.setFieldsValue({name:"",email:"",status:!0,phone:"",fax:""}),Ze("Add"),Qe(!0),Be(!0)}},"Add Person"))),O.a.createElement(m.a,{gutter:25},Re.map((function(e){return O.a.createElement(d.a,{key:e.id,sm:24,md:12,lg:8},(null===Z||void 0===Z?void 0:Z.id)&&O.a.createElement(O.a.Fragment,null,O.a.createElement(R.a,{size:"small",style:{position:"absolute",right:14,zIndex:1e3},title:"Edit Person",htmlType:"button",type:"info",onClick:function(){return function(e){tt(e);var t=Re.filter((function(t){return t.id===e}));t&&je.setFieldsValue({name:t[0].name,email:t[0].email,status:t[0].status,phone:t[0].phone,fax:t[0].fax}),Ze("Update"),Qe(t[0].status),Be(!0)}(e.id)}},"Edit")),O.a.createElement(r.a,{style:{border:"1px solid #ddd"}},O.a.createElement(l.a.Paragraph,null,e.name),O.a.createElement(l.a.Paragraph,null,e.email),O.a.createElement(l.a.Paragraph,null,e.phone),O.a.createElement(l.a.Paragraph,null,e.fax),O.a.createElement(l.a.Paragraph,null,O.a.createElement(i.a,{color:e.status?"cyan":"orange",count:e.status?"Active":"Inactive"}))))}))))),O.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},O.a.createElement(g.a.Item,null,O.a.createElement(R.a,{loading:ye,size:"default",htmlType:"submit",type:"primary",raised:!0},ye?"Processing":"Update Customer"),O.a.createElement(x.b,{to:"/admin/customers/list"},O.a.createElement(R.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel")))))))),O.a.createElement(n.a,{title:"".concat(Ye," Person"),style:{top:20},width:600,open:Ge,onOk:lt,onCancel:function(){return Be(!1)},okText:"Save"},O.a.createElement(g.a,{preserve:!1,style:{width:"100%"},form:je,name:"personForm",layout:"horizontal",size:"small"},O.a.createElement(g.a.Item,Object.assign({},Y,{rules:[{required:!0,message:"Please Enter Name"}],name:"name",label:"Name"}),O.a.createElement(s.a,{placeholder:"Name"})),O.a.createElement(g.a.Item,Object.assign({},Y,{rules:[{required:!0,message:"Please Enter Email"}],name:"email",label:"Email"}),O.a.createElement(s.a,{placeholder:"Email"})),O.a.createElement(g.a.Item,Object.assign({rules:[{required:!0,message:"Please Enter Phone"}]},Y,{name:"phone",label:"Phone"}),O.a.createElement(s.a,{placeholder:"Phone"})),O.a.createElement(g.a.Item,Object.assign({},Y,{name:"fax",label:"Fax"}),O.a.createElement(s.a,{placeholder:"Fax"})),O.a.createElement(g.a.Item,Object.assign({},Y,{name:"status",label:"Status",initialValue:Ke}),O.a.createElement(u.a,{checked:Ke,onChange:function(e){return Qe(e)}}))))))}},649:function(e,t,a){"use strict";a.d(t,"b",(function(){return m})),a.d(t,"a",(function(){return f}));var n,r,i,l,o,u,d,s=a(8),c=a(15),m={GET_ALL_CUSTOMER:Object(c.d)(n||(n=Object(s.a)(["\n    query {\n      getAllCustomer {\n        status\n        message\n        data {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n          addresses {\n            id\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            type\n            status\n            updatedAt\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),GET_RATING_BY_USER_ID:Object(c.d)(r||(r=Object(s.a)(["\n    query getRatingsByUserID($query: GetRatingsByUserInput) {\n      getRatingsByUserID(query: $query) {\n        message\n        status\n        data {\n          id\n          rating_description\n          rating\n          createdAt\n          updatedAt\n          product {\n            id\n            prod_name\n            prod_slug\n            prod_short_desc\n            prod_thumbnail\n            prod_sku\n            prod_regular_price\n            prod_sale_price\n            prod_status\n          }\n        }\n      }\n    }\n  "])))},f={ADD_CUSTOMER:Object(c.d)(i||(i=Object(s.a)(["\n    mutation addCustomer($data: CustomerInput) {\n      addCustomer(data: $data) {\n        message\n        status\n        id\n      }\n    }\n  "]))),ADD_CUSTOMER_BILLING_ADDRESS:Object(c.d)(l||(l=Object(s.a)(["\n    mutation addCustomerBillingAddress($data: AddCustomerBillingAddressInput) {\n      addCustomerBillingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),ADD_CUSTOMER_SHIPPING_ADDRESS:Object(c.d)(o||(o=Object(s.a)(["\n    mutation addCustomerShippingAddress($data: AddCustomerShippingAddressInput) {\n      addCustomerShippingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER:Object(c.d)(u||(u=Object(s.a)(["\n    mutation updateCustomer($data: UpdateCustomerInput) {\n      updateCustomer(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER_ADDRESSES:Object(c.d)(d||(d=Object(s.a)(["\n    mutation updateCustomerAddress($data: UpdateCustomerAddressInput) {\n      updateCustomerAddress(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},655:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n,r,i=a(8),l=a(15),o={ADD_CONTACT_PERSON:Object(l.d)(n||(n=Object(i.a)(["\n    mutation createContactPerson($data: CreateContactPersonInput) {\n      createContactPerson(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "]))),UPDATE_CONTACT_PERSON:Object(l.d)(r||(r=Object(i.a)(["\n    mutation updateContactPerson($data: UpdateContactPersonInput) {\n      updateContactPerson(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}}}]);
//# sourceMappingURL=24.0798cc23.chunk.js.map
/*! For license information please see 20.3fc7a202.chunk.js.LICENSE.txt */
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[20],{640:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n,r,i,o=a(8),l=a(16),c={ADD_CONTACT_PERSON:Object(l.d)(n||(n=Object(o.a)(["\n    mutation createContactPerson($data: CreateContactPersonInput) {\n      createContactPerson(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CONTACT_PERSON:Object(l.d)(r||(r=Object(o.a)(["\n    mutation updateContactPerson($data: UpdateContactPersonInput) {\n      updateContactPerson(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),GET_CONTACT_PERSON_BY_ID:Object(l.d)(i||(i=Object(o.a)(["\n    query getContactPerson($query: GetContactPersonInput) {\n      getContactPerson(query: $query) {\n        message\n        status\n        data {\n          id\n          name\n          email\n          phone\n          fax\n          status\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "])))}},643:function(e,t,a){"use strict";a.d(t,"b",(function(){return m})),a.d(t,"a",(function(){return f}));var n,r,i,o,l,c,s,u=a(8),d=a(16),m={GET_ALL_CUSTOMER:Object(d.d)(n||(n=Object(u.a)(["\n    query {\n      getAllCustomer {\n        status\n        message\n        data {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n          addresses {\n            id\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            type\n            status\n            updatedAt\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),GET_RATING_BY_USER_ID:Object(d.d)(r||(r=Object(u.a)(["\n    query getRatingsByUserID($query: GetRatingsByUserInput) {\n      getRatingsByUserID(query: $query) {\n        message\n        status\n        data {\n          id\n          rating_description\n          rating\n          createdAt\n          updatedAt\n          product {\n            id\n            prod_name\n            prod_slug\n            prod_short_desc\n            prod_thumbnail\n            prod_sku\n            prod_regular_price\n            prod_sale_price\n            prod_status\n          }\n        }\n      }\n    }\n  "])))},f={ADD_CUSTOMER:Object(d.d)(i||(i=Object(u.a)(["\n    mutation addCustomer($data: CustomerInput) {\n      addCustomer(data: $data) {\n        message\n        status\n        id\n      }\n    }\n  "]))),ADD_CUSTOMER_BILLING_ADDRESS:Object(d.d)(o||(o=Object(u.a)(["\n    mutation addCustomerBillingAddress($data: AddCustomerBillingAddressInput) {\n      addCustomerBillingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),ADD_CUSTOMER_SHIPPING_ADDRESS:Object(d.d)(l||(l=Object(u.a)(["\n    mutation addCustomerShippingAddress($data: AddCustomerShippingAddressInput) {\n      addCustomerShippingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER:Object(d.d)(c||(c=Object(u.a)(["\n    mutation updateCustomer($data: UpdateCustomerInput) {\n      updateCustomer(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER_ADDRESSES:Object(d.d)(s||(s=Object(u.a)(["\n    mutation updateCustomerAddress($data: UpdateCustomerAddressInput) {\n      updateCustomerAddress(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},648:function(e,t,a){"use strict";a(42),a(649)},649:function(e,t,a){},650:function(e,t,a){"use strict";var n=a(1),r=a(5),i=a(2),o=a(138),l=a(224),c=a(88),s=a(226),u=a(101),d=a(168),m=a(203),f=a(322),p=a(225),v=a(4),h=a.n(v),y=a(46),b=a(0),g=a(67),E=a(321),O=a(25),j=a(28),C=a(29),_=a(33),x=a(34),w=function(e){Object(_.a)(a,e);var t=Object(x.a)(a);function a(){var e;return Object(j.a)(this,a),(e=t.apply(this,arguments)).state={error:void 0,info:{componentStack:""}},e}return Object(C.a)(a,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,info:t})}},{key:"render",value:function(){var e=this.props,t=e.message,a=e.description,n=e.children,r=this.state,i=r.error,o=r.info,l=o&&o.componentStack?o.componentStack:null,c="undefined"===typeof t?(i||"").toString():t,s="undefined"===typeof a?l:a;return i?b.createElement(P,{type:"error",message:c,description:b.createElement("pre",null,s)}):n}}]),a}(b.Component),S=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a},A={success:o.a,info:f.a,error:c.a,warning:d.a},N={success:l.a,info:p.a,error:s.a,warning:m.a},T=function(e){var t=e.description,a=e.icon,n=e.prefixCls,r=e.type,o=(t?N:A)[r]||null;return a?Object(O.d)(a,b.createElement("span",{className:"".concat(n,"-icon")},a),(function(){return{className:h()("".concat(n,"-icon"),Object(i.a)({},a.props.className,a.props.className))}})):b.createElement(o,{className:"".concat(n,"-icon")})},I=function(e){var t=e.isClosable,a=e.closeText,n=e.prefixCls,r=e.closeIcon,i=e.handleClose;return t?b.createElement("button",{type:"button",onClick:i,className:"".concat(n,"-close-icon"),tabIndex:0},a?b.createElement("span",{className:"".concat(n,"-close-text")},a):r):null},D=function(e){var t,a=e.description,o=e.prefixCls,l=e.message,c=e.banner,s=e.className,d=void 0===s?"":s,m=e.style,f=e.onMouseEnter,p=e.onMouseLeave,v=e.onClick,O=e.afterClose,j=e.showIcon,C=e.closable,_=e.closeText,x=e.closeIcon,w=void 0===x?b.createElement(u.a,null):x,A=e.action,N=S(e,["description","prefixCls","message","banner","className","style","onMouseEnter","onMouseLeave","onClick","afterClose","showIcon","closable","closeText","closeIcon","action"]),D=b.useState(!1),P=Object(r.a)(D,2),k=P[0],L=P[1],U=b.useRef(),R=b.useContext(g.b),q=R.getPrefixCls,F=R.direction,V=q("alert",o),z=function(e){var t;L(!0),null===(t=N.onClose)||void 0===t||t.call(N,e)},G=!!_||C,B=function(){var e=N.type;return void 0!==e?e:c?"warning":"info"}(),$=!(!c||void 0!==j)||j,M=h()(V,"".concat(V,"-").concat(B),(t={},Object(i.a)(t,"".concat(V,"-with-description"),!!a),Object(i.a)(t,"".concat(V,"-no-icon"),!$),Object(i.a)(t,"".concat(V,"-banner"),!!c),Object(i.a)(t,"".concat(V,"-rtl"),"rtl"===F),t),d),Y=Object(E.a)(N);return b.createElement(y.default,{visible:!k,motionName:"".concat(V,"-motion"),motionAppear:!1,motionEnter:!1,onLeaveStart:function(e){return{maxHeight:e.offsetHeight}},onLeaveEnd:O},(function(e){var t=e.className,r=e.style;return b.createElement("div",Object(n.a)({ref:U,"data-show":!k,className:h()(M,t),style:Object(n.a)(Object(n.a)({},m),r),onMouseEnter:f,onMouseLeave:p,onClick:v,role:"alert"},Y),$?b.createElement(T,{description:a,icon:N.icon,prefixCls:V,type:B}):null,b.createElement("div",{className:"".concat(V,"-content")},l?b.createElement("div",{className:"".concat(V,"-message")},l):null,a?b.createElement("div",{className:"".concat(V,"-description")},a):null),A?b.createElement("div",{className:"".concat(V,"-action")},A):null,b.createElement(I,{isClosable:!!G,closeText:_,prefixCls:V,closeIcon:w,handleClose:z}))}))};D.ErrorBoundary=w;var P=t.a=D},995:function(e,t,a){"use strict";a.r(t);a(315);var n=a(316),r=(a(379),a(318)),i=(a(319),a(80)),o=(a(637),a(639)),l=(a(291),a(89)),c=(a(314),a(218)),s=(a(201),a(74)),u=(a(148),a(45)),d=(a(166),a(98)),m=(a(200),a(97)),f=(a(648),a(650)),p=a(116),v=a(92),h=a(9),y=a(64),b=(a(289),a(52)),g=a(23),E=a(0),O=a.n(E),j=a(217),C=a(165),_=a(164),x=a(58),w=a(12),S=a(71),A=a(22),N=(a(100),a(38)),T=(a(150),a(77)),I=(a(290),a(117)),D=(a(202),a(63)),P=a(21),k=a.n(P),L=a(167),U=a(76),R=function(e){var t=e.defaultBilling,a=e.initialData,n=e.billingAddress,r=e.setBillingAddress,i=e.setDefaultBilling,o=Object(E.useState)([]),l=Object(g.a)(o,2),s=l[0],d=l[1],m=Object(E.useState)({data:[],loading:!0}),f=Object(g.a)(m,2),p=f[0],y=f[1];Object(E.useEffect)((function(){S.j.query({query:L.a.GET_COUNTRY_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t=e.data.getCountryList;if(!(null===t||void 0===t?void 0:t.status))return Object(U.a)();d(null===t||void 0===t?void 0:t.data)})),S.j.query({query:L.a.GET_STATE_LISTS,variables:{query:{code:""}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getStateList;if(!(null===i||void 0===i?void 0:i.status))return Object(U.a)();y({data:Object(h.a)(Object(h.a)({},a),{},{states:null===i||void 0===i?void 0:i.data}),loading:!1}),r(n.map((function(e){var t;return Object(h.a)(Object(h.a)({},e),{},{states:null===i||void 0===i||null===(t=i.data)||void 0===t?void 0:t.filter((function(t){return t.country_code===e.countryCode.code}))})})))})).finally((function(){y((function(e){return Object(h.a)(Object(h.a)({},e),{},{loading:!1})}))}))}),[]);var b=[{title:"Country",dataIndex:["countryCode","name"],key:"name",render:function(e,t){var a;return O.a.createElement(D.a,{onSelect:function(e){r(n.map((function(a){return a.id===t.id?Object(h.a)(Object(h.a)({},a),{},{country:e,states:p.data.states.filter((function(t){return t.country_code===e}))}):a})))},style:{width:"100%"},placeholder:"Country",defaultValue:null===t||void 0===t||null===(a=t.countryCode)||void 0===a?void 0:a.code,options:null===s||void 0===s?void 0:s.map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e.code}}))})}},{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return O.a.createElement(u.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return O.a.createElement(u.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return O.a.createElement(u.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"states",key:"states",width:150,render:function(e,t){return O.a.createElement(D.a,{style:{width:"100%"},placeholder:"State",options:null===e||void 0===e?void 0:e.map((function(e){return{label:e.state,value:e.abbreviation}})),onSelect:function(e){return t.state=e},defaultValue:t.state})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return O.a.createElement(u.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return O.a.createElement(c.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return O.a.createElement(I.a,{checked:t===a.id,onChange:function(e){return i(a.id)}})}}];return O.a.createElement("div",null,O.a.createElement(T.a,{loading:null===p||void 0===p?void 0:p.loading,className:"table-responsive",columns:b,pagination:!1,rowKey:"id",size:"small",dataSource:n}),O.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},O.a.createElement(N.a,{disabled:null===p||void 0===p?void 0:p.loading,title:"Add Address",htmlType:"button",type:"primary",onClick:function(){r((function(e){return[].concat(Object(v.a)(e),[Object(h.a)(Object(h.a)({},p.data),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},O.a.createElement(k.a,{icon:"plus"}))))},q=function(e){var t=e.defaultShipping,a=e.initialData,n=e.shippingAddress,r=e.setShippingAddress,i=e.setDefaultShipping,o=Object(E.useState)([]),l=Object(g.a)(o,2),s=l[0],d=l[1],m=Object(E.useState)({data:[],loading:!0}),f=Object(g.a)(m,2),p=f[0],y=f[1];Object(E.useEffect)((function(){S.j.query({query:L.a.GET_COUNTRY_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t=e.data.getCountryList;if(!(null===t||void 0===t?void 0:t.status))return Object(U.a)();d(null===t||void 0===t?void 0:t.data)})),S.j.query({query:L.a.GET_STATE_LISTS,variables:{query:{code:""}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getStateList;if(!(null===i||void 0===i?void 0:i.status))return Object(U.a)();y({data:Object(h.a)(Object(h.a)({},a),{},{states:null===i||void 0===i?void 0:i.data}),loading:!1}),r(n.map((function(e){var t;return Object(h.a)(Object(h.a)({},e),{},{states:null===i||void 0===i||null===(t=i.data)||void 0===t?void 0:t.filter((function(t){return t.country_code===e.countryCode.code}))})})))})).finally((function(){y((function(e){return Object(h.a)(Object(h.a)({},e),{},{loading:!1})}))}))}),[]);var b=[{title:"Country",dataIndex:["countryCode","name"],key:"name",render:function(e,t){var a;return O.a.createElement(D.a,{onSelect:function(e){r(n.map((function(a){return a.id===t.id?Object(h.a)(Object(h.a)({},a),{},{country:e,states:p.data.states.filter((function(t){return t.country_code===e}))}):a})))},style:{width:"100%"},placeholder:"Country",defaultValue:null===t||void 0===t||null===(a=t.countryCode)||void 0===a?void 0:a.code,options:null===s||void 0===s?void 0:s.map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e.code}}))})}},{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return O.a.createElement(u.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return O.a.createElement(u.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return O.a.createElement(u.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"states",key:"states",width:150,render:function(e,t){return O.a.createElement(D.a,{style:{width:"100%"},placeholder:"State",options:null===e||void 0===e?void 0:e.map((function(e){return{label:e.state,value:e.abbreviation}})),onSelect:function(e){return t.state=e},defaultValue:t.state})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return O.a.createElement(u.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return O.a.createElement(c.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return O.a.createElement(I.a,{name:"isDefault",checked:t===a.id,onChange:function(e){return i(a.id)}})}}];return O.a.createElement("div",null,O.a.createElement(T.a,{className:"table-responsive",columns:b,pagination:!1,rowKey:"id",size:"small",loading:null===p||void 0===p?void 0:p.loading,dataSource:n}),O.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},O.a.createElement(N.a,{disabled:null===p||void 0===p?void 0:p.loading,title:"Add Address",htmlType:"button",type:"primary",onClick:function(){r((function(e){return[].concat(Object(v.a)(e),[Object(h.a)(Object(h.a)({},p.data),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},O.a.createElement(k.a,{icon:"plus"}))))},F=a(287),V=a(50),z=a(643),G=a(640),B=["__typename","type","createdAt","updatedAt"],$=["parent_id","isNew","id","isDefault","countryCode","states"],M=["parent_id","isNew","isDefault","id","countryCode","states"];function Y(){Y=function(){return e};var e={},t=Object.prototype,a=t.hasOwnProperty,n=Object.defineProperty||function(e,t,a){e[t]=a.value},r="function"==typeof Symbol?Symbol:{},i=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",l=r.toStringTag||"@@toStringTag";function c(e,t,a){return Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(A){c=function(e,t,a){return e[t]=a}}function s(e,t,a,r){var i=t&&t.prototype instanceof m?t:m,o=Object.create(i.prototype),l=new x(r||[]);return n(o,"_invoke",{value:O(e,a,l)}),o}function u(e,t,a){try{return{type:"normal",arg:e.call(t,a)}}catch(A){return{type:"throw",arg:A}}}e.wrap=s;var d={};function m(){}function f(){}function p(){}var v={};c(v,i,(function(){return this}));var h=Object.getPrototypeOf,y=h&&h(h(w([])));y&&y!==t&&a.call(y,i)&&(v=y);var b=p.prototype=m.prototype=Object.create(v);function g(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function E(e,t){var r;n(this,"_invoke",{value:function(n,i){function o(){return new t((function(r,o){!function n(r,i,o,l){var c=u(e[r],e,i);if("throw"!==c.type){var s=c.arg,d=s.value;return d&&"object"==typeof d&&a.call(d,"__await")?t.resolve(d.__await).then((function(e){n("next",e,o,l)}),(function(e){n("throw",e,o,l)})):t.resolve(d).then((function(e){s.value=e,o(s)}),(function(e){return n("throw",e,o,l)}))}l(c.arg)}(n,i,r,o)}))}return r=r?r.then(o,o):o()}})}function O(e,t,a){var n="suspendedStart";return function(r,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===r)throw i;return S()}for(a.method=r,a.arg=i;;){var o=a.delegate;if(o){var l=j(o,a);if(l){if(l===d)continue;return l}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if("suspendedStart"===n)throw n="completed",a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);n="executing";var c=u(e,t,a);if("normal"===c.type){if(n=a.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:a.done}}"throw"===c.type&&(n="completed",a.method="throw",a.arg=c.arg)}}}function j(e,t){var a=t.method,n=e.iterator[a];if(void 0===n)return t.delegate=null,"throw"===a&&e.iterator.return&&(t.method="return",t.arg=void 0,j(e,t),"throw"===t.method)||"return"!==a&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+a+"' method")),d;var r=u(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,d;var i=r.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function _(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function x(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function w(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(a.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:S}}function S(){return{value:void 0,done:!0}}return f.prototype=p,n(b,"constructor",{value:p,configurable:!0}),n(p,"constructor",{value:f,configurable:!0}),f.displayName=c(p,l,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,c(e,l,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},g(E.prototype),c(E.prototype,o,(function(){return this})),e.AsyncIterator=E,e.async=function(t,a,n,r,i){void 0===i&&(i=Promise);var o=new E(s(t,a,n,r),i);return e.isGeneratorFunction(a)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},g(b),c(b,l,"Generator"),c(b,i,(function(){return this})),c(b,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),a=[];for(var n in t)a.push(n);return a.reverse(),function e(){for(;a.length;){var n=a.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=w,x.prototype={constructor:x,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(a,n){return o.type="throw",o.arg=e,t.next=a,n&&(t.method="next",t.arg=void 0),!!n}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],o=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var l=a.call(i,"catchLoc"),c=a.call(i,"finallyLoc");if(l&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.finallyLoc===e)return this.complete(a.completion,a.afterLoc),_(a),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.tryLoc===e){var n=a.completion;if("throw"===n.type){var r=n.arg;_(a)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,a){return this.delegate={iterator:w(e),resultName:t,nextLoc:a},"next"===this.method&&(this.arg=void 0),d}},e}var H={labelCol:{span:4},wrapperCol:{span:18}};t.default=function(){var e,t,a,N,T,I,D,P,k;Object(A.f)("customer");var L=Object(x.useHistory)(),Z=Object(x.useParams)(),J=Object(V.d)((function(e){return e.auth.token})),K=Object(E.useState)(!0),Q=Object(g.a)(K,2),W=Q[0],X=Q[1],ee=Object(E.useState)(null),te=Object(g.a)(ee,2),ae=te[0],ne=te[1],re=Object(E.useState)(null),ie=Object(g.a)(re,2),oe=ie[0],le=ie[1],ce=Object(E.useState)(!1),se=Object(g.a)(ce,2),ue=se[0],de=se[1],me=Object(E.useState)(!1),fe=Object(g.a)(me,2),pe=fe[0],ve=(fe[1],Object(E.useState)(!1)),he=Object(g.a)(ve,2),ye=he[0],be=he[1],ge=b.a.useForm(),Ee=Object(g.a)(ge,1)[0],Oe=b.a.useForm(),je=Object(g.a)(Oe,1)[0],Ce=Object(E.useState)({data:null,isLoading:!0}),_e=Object(g.a)(Ce,2),xe=_e[0],we=_e[1],Se={address1:null,address2:null,city:null,state:null,zip_code:null,country:null,isDefault:!1,isNew:!0},Ae=Object(E.useState)([]),Ne=Object(g.a)(Ae,2),Te=Ne[0],Ie=Ne[1],De=Object(E.useState)([]),Pe=Object(g.a)(De,2),ke=Pe[0],Le=Pe[1],Ue=Object(E.useState)([]),Re=Object(g.a)(Ue,2),qe=Re[0],Fe=Re[1],Ve=Object(E.useState)(!1),ze=Object(g.a)(Ve,2),Ge=ze[0],Be=ze[1],$e=Object(E.useState)("Add"),Me=Object(g.a)($e,2),Ye=Me[0],He=Me[1],Ze=Object(E.useState)(!0),Je=Object(g.a)(Ze,2),Ke=Je[0],Qe=Je[1],We=Object(E.useState)(null),Xe=Object(g.a)(We,2),et=Xe[0],tt=Xe[1],at=Object(E.useState)(null),nt=Object(g.a)(at,2),rt=nt[0],it=nt[1];Object(E.useEffect)((function(){(null===Z||void 0===Z?void 0:Z.id)&&S.j.query({query:S.i.GET_SINGLE_CUSTOMER,variables:{customer_id:parseInt(null===Z||void 0===Z?void 0:Z.id)},context:{headers:{TENANTID:"100001",Authorization:J}},fetchPolicy:"network-only"}).then((function(e){var t,a,n,r,i,o,l,c,s=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleCustomer;if(!(null===s||void 0===s?void 0:s.status))return Object(U.a)();var u=[],d=[],m=[];we({data:null===s||void 0===s?void 0:s.data,isLoading:!1}),X(null===s||void 0===s||null===(a=s.data)||void 0===a?void 0:a.user_status),Ee.setFieldsValue({first_name:null===s||void 0===s||null===(n=s.data)||void 0===n?void 0:n.first_name,last_name:null===s||void 0===s||null===(r=s.data)||void 0===r?void 0:r.last_name,email:null===s||void 0===s||null===(i=s.data)||void 0===i?void 0:i.email}),null===s||void 0===s||null===(o=s.data)||void 0===o||null===(l=o.addresses)||void 0===l||l.forEach((function(e){e.__typename,e.type,e.createdAt,e.updatedAt;var t=Object(y.a)(e,B);"shipping"===e.type&&(e.isDefault&&le(e.id),u.push(Object(h.a)(Object(h.a)({},t),{},{isNew:!1}))),"billing"===e.type&&(e.isDefault&&ne(e.id),d.push(Object(h.a)(Object(h.a)({},t),{},{isNew:!1})))})),null===s||void 0===s||null===(c=s.data)||void 0===c||c.contactPersons.forEach((function(e){m.push(Object(h.a)(Object(h.a)({},e),{},{isNew:!1}))})),Fe(m),Ie(u),Le(d)}))}),[null===Z||void 0===Z?void 0:Z.id]);Object(E.useEffect)((function(){if(ue&&(null===Z||void 0===Z?void 0:Z.id)){var e=ke.map((function(e){e.parent_id;var t=e.isNew,a=e.id,n=(e.isDefault,e.countryCode,e.states,Object(y.a)(e,$));return Object(h.a)(Object(h.a)(Object(h.a)({isDefault:ae===a,parent_id:parseInt(null===Z||void 0===Z?void 0:Z.id)},t?{isNew:t}:{isNew:!1}),n),!t&&{id:a})})),t=Te.map((function(e){e.parent_id;var t=e.isNew,a=(e.isDefault,e.id),n=(e.countryCode,e.states,Object(y.a)(e,M));return Object(h.a)(Object(h.a)(Object(h.a)({isDefault:oe===a,parent_id:parseInt(null===Z||void 0===Z?void 0:Z.id)},t?{isNew:t}:{isNew:!1}),n),!t&&{id:a})}));["person","billing","shipping"].forEach((function(a){"person"===a?S.j.mutate({mutation:G.a.UPDATE_CONTACT_PERSON,variables:{data:{ref_id:parseInt(null===Z||void 0===Z?void 0:Z.id),type:"customer",contact_persons:qe.map((function(e){return Object(h.a)(Object(h.a)({},!e.isNew&&{id:e.id}),{},{name:e.name,email:e.email,phone:e.phone,fax:e.fax,status:e.status,isNew:e.isNew})}))}},context:{headers:{TENANTID:"100001",Authorization:J}}}).then((function(e){var t,a,n=(null===Z||void 0===Z?void 0:Z.id)?null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateContactPerson:null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.createContactPerson;if(!(null===n||void 0===n?void 0:n.status))return Object(U.a)()})):(be(!0),S.j.mutate({mutation:z.a.UPDATE_CUSTOMER_ADDRESSES,variables:{data:{ref_id:parseInt(null===Z||void 0===Z?void 0:Z.id),type:a,addresses:Object(v.a)("billing"===a?e:t)}},context:{headers:{TENANTID:"100001",Authorization:J}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateCustomerAddress;if(!(null===a||void 0===a?void 0:a.status))return Object(U.a)()})).finally((function(e){be(!1),"shipping"===a&&(pe||(it({type:"success",message:"Customer Updated Successfully."}),setTimeout((function(){L.push("/admin/customers/list")}),[2e3])))})))}))}}),[ue,null===Z||void 0===Z?void 0:Z.id]);var ot=function(){var e=Object(p.a)(Y().mark((function e(){var t;return Y().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.validateFields(["email","name","phone"]);case 2:t=je.getFieldsValue(),Fe(et?function(e){return e.map((function(e){return e.id===et?Object(h.a)(Object(h.a)({},t),{},{id:et,isNew:!1}):e}))}:function(e){return[].concat(Object(v.a)(e),[Object(h.a)(Object(h.a)({},t),{},{id:(new Date).getTime(),isNew:!0})])}),Be(!1),je.resetFields();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return O.a.createElement(O.a.Fragment,null,O.a.createElement(j.a,{title:"Manage Customer | Edit Customer ".concat(xe.isLoading?"":"(".concat(null===xe||void 0===xe||null===(e=xe.data)||void 0===e?void 0:e.email,")"))}),O.a.createElement(C.b,null,O.a.createElement(m.a,{align:"middle",justify:"center",style:{margin:0,padding:0}},rt&&O.a.createElement(f.a,{style:{width:"50%",marginBottom:10},message:null===rt||void 0===rt?void 0:rt.message,type:null===rt||void 0===rt?void 0:rt.type,showIcon:!0,closable:!0})),O.a.createElement(m.a,{gutter:25},O.a.createElement(s.a,{sm:24,xs:24},O.a.createElement(_.a,{headless:!0},xe.isLoading?O.a.createElement("div",{div:!0,className:"spin"},O.a.createElement(d.a,null)):O.a.createElement(b.a,{style:{width:"100%"},form:Ee,name:"editUser",onFinish:function(e){var t=ke.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,i=e.state,o=e.zip_code;return!(t&&a&&n&&r&&i&&o)}));if(null===t||void 0===t?void 0:t.id)return it({type:"warning",message:"Enter Billing Address Correctly!"});var a=Te.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,i=e.state,o=e.zip_code;return!(t&&a&&n&&r&&i&&o)}));if(null===a||void 0===a?void 0:a.id)return it({type:"warning",message:"Enter Shipping Address Correctly!"});var n={data:Object(h.a)(Object(h.a)({},e),{},{user_status:W,send_mail:!0,id:parseInt(null===Z||void 0===Z?void 0:Z.id)})};S.j.mutate({mutation:z.a.UPDATE_CUSTOMER,variables:n,context:{headers:{TENANTID:"100001",Authorization:J}},refetchQueries:[{query:S.i.GET_ALL_CUSTOMER,context:{headers:{TENANTID:"100001",Authorization:J}},fetchPolicy:"no-cache"},["getAllCustomer"]]}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateCustomer;if(!(null===a||void 0===a?void 0:a.status))return Object(U.a)();de(!0)})).finally((function(){return be(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},O.a.createElement(l.a,null,O.a.createElement(l.a.TabPane,{tab:"Information",key:"information"},O.a.createElement(m.a,{gutter:25},O.a.createElement(s.a,{span:10},O.a.createElement(b.a.Item,{rules:[{required:!0,max:30,message:"Please Enter First Name"}],name:"first_name",label:"First Name",labelCol:{style:{width:"40%"}},initialValue:null===xe||void 0===xe||null===(t=xe.data)||void 0===t?void 0:t.first_name},O.a.createElement(m.a,null,O.a.createElement(s.a,{span:20},O.a.createElement(u.a,{placeholder:"Enter First Name",defaultValue:null===xe||void 0===xe||null===(a=xe.data)||void 0===a?void 0:a.first_name})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(s.a,{span:10},O.a.createElement(b.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Last Name"}],name:"last_name",label:"Last Name",labelCol:{style:{width:"40%"}},initialValue:null===xe||void 0===xe||null===(N=xe.data)||void 0===N?void 0:N.last_name},O.a.createElement(m.a,null,O.a.createElement(s.a,{span:20},O.a.createElement(u.a,{placeholder:"Enter Last Name",defaultValue:null===xe||void 0===xe||null===(T=xe.data)||void 0===T?void 0:T.last_name})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(s.a,{span:10},O.a.createElement(b.a.Item,{label:"Company Name",name:"company_name",labelCol:{style:{width:"40%"}}},O.a.createElement(m.a,null,O.a.createElement(s.a,{span:20},O.a.createElement(u.a,{type:"text",defaultValue:null===xe||void 0===xe||null===(I=xe.data)||void 0===I?void 0:I.company_name,placeholder:"Enter Company Name"})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(s.a,{span:10},O.a.createElement(b.a.Item,{label:"Email",labelCol:{style:{width:"40%"}}},O.a.createElement(m.a,null,O.a.createElement(s.a,{span:20},O.a.createElement(u.a,{type:"email",disabled:!0,defaultValue:null===xe||void 0===xe||null===(D=xe.data)||void 0===D?void 0:D.email})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(s.a,{span:10},O.a.createElement(b.a.Item,{label:"Phone",name:"phone",labelCol:{style:{width:"40%"}}},O.a.createElement(m.a,null,O.a.createElement(s.a,{span:20},O.a.createElement(u.a,{type:"text",defaultValue:null===xe||void 0===xe||null===(P=xe.data)||void 0===P?void 0:P.phone,placeholder:"Enter Phone Number"})))))),O.a.createElement(m.a,{gutter:25},O.a.createElement(s.a,{span:10},O.a.createElement(b.a.Item,{label:"Fax",name:"fax",labelCol:{style:{width:"40%"}}},O.a.createElement(m.a,null,O.a.createElement(s.a,{span:20},O.a.createElement(u.a,{type:"text",defaultValue:null===xe||void 0===xe||null===(k=xe.data)||void 0===k?void 0:k.fax,placeholder:"Enter Fax Number"})))))),O.a.createElement(b.a.Item,{label:"User Status"},O.a.createElement(c.a,{checked:W,onChange:function(e){return X(e)}}))),O.a.createElement(l.a.TabPane,{tab:"Shipping Address",key:"shipping_address"},O.a.createElement(q,{initialData:Se,shippingAddress:Te,setShippingAddress:Ie,defaultShipping:oe,setDefaultShipping:le})),O.a.createElement(l.a.TabPane,{tab:"Billing Address",key:"billing_address"},O.a.createElement(R,{initialData:Se,billingAddress:ke,setBillingAddress:Le,defaultBilling:ae,setDefaultBilling:ne})),O.a.createElement(l.a.TabPane,{tab:"Contact Person",key:"contact_person"},O.a.createElement(m.a,{gutter:25},O.a.createElement(s.a,{span:24},O.a.createElement(F.a,{size:"small",style:{float:"right",marginBottom:20},title:"Add Person",htmlType:"button",type:"primary",onClick:function(){je.setFieldsValue({name:"",email:"",status:!0,phone:"",fax:""}),He("Add"),Qe(!0),Be(!0)}},"Add Person"))),O.a.createElement(m.a,{gutter:25},qe.map((function(e){return O.a.createElement(s.a,{key:e.id,sm:24,md:12,lg:8},(null===Z||void 0===Z?void 0:Z.id)&&O.a.createElement(O.a.Fragment,null,O.a.createElement(F.a,{size:"small",style:{position:"absolute",right:14,zIndex:1e3},title:"Edit Person",htmlType:"button",type:"info",onClick:function(){return function(e){tt(e);var t=qe.filter((function(t){return t.id===e}));t&&je.setFieldsValue({name:t[0].name,email:t[0].email,status:t[0].status,phone:t[0].phone,fax:t[0].fax}),He("Update"),Qe(t[0].status),Be(!0)}(e.id)}},"Edit")),O.a.createElement(r.a,{style:{border:"1px solid #ddd"}},O.a.createElement(o.a.Paragraph,null,e.name),O.a.createElement(o.a.Paragraph,null,e.email),O.a.createElement(o.a.Paragraph,null,e.phone),O.a.createElement(o.a.Paragraph,null,e.fax),O.a.createElement(o.a.Paragraph,null,O.a.createElement(i.a,{color:e.status?"cyan":"orange",count:e.status?"Active":"Inactive"}))))}))))),O.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},O.a.createElement(b.a.Item,null,O.a.createElement(F.a,{loading:ye,size:"default",htmlType:"submit",type:"primary",raised:!0},ye?"Processing":"Update Customer"),O.a.createElement(w.b,{to:"/admin/customers/list"},O.a.createElement(F.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel")))))))),O.a.createElement(n.a,{title:"".concat(Ye," Person"),style:{top:20},width:600,open:Ge,onOk:ot,onCancel:function(){return Be(!1)},okText:"Save"},O.a.createElement(b.a,{preserve:!1,style:{width:"100%"},form:je,name:"personForm",layout:"horizontal"},O.a.createElement(b.a.Item,Object.assign({},H,{rules:[{required:!0,message:"Please Enter Name"}],name:"name",label:"Name"}),O.a.createElement(u.a,{placeholder:"Name"})),O.a.createElement(b.a.Item,Object.assign({},H,{rules:[{required:!0,message:"Please Enter Email"}],name:"email",label:"Email"}),O.a.createElement(u.a,{placeholder:"Email"})),O.a.createElement(b.a.Item,Object.assign({rules:[{required:!0,message:"Please Enter Phone"}]},H,{name:"phone",label:"Phone"}),O.a.createElement(u.a,{placeholder:"Phone"})),O.a.createElement(b.a.Item,Object.assign({},H,{name:"fax",label:"Fax"}),O.a.createElement(u.a,{placeholder:"Fax"})),O.a.createElement(b.a.Item,Object.assign({},H,{name:"status",label:"Status",initialValue:Ke}),O.a.createElement(c.a,{checked:Ke,onChange:function(e){return Qe(e)}}))))))}}}]);
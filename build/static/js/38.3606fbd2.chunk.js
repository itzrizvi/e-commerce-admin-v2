/*! For license information please see 38.3606fbd2.chunk.js.LICENSE.txt */
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[38],{929:function(t,e,r){"use strict";r.r(e);r(194);var n=r(88),o=(r(110),r(30)),a=(r(193),r(111)),i=(r(271),r(157)),c=r(22),s=r(0),u=r.n(s),l=r(21),f=r.n(l),h=r(192),d=r(130),p=r(48),v=r(117),m=r(52),y=r.n(m),g=r(37),w=r(49),E=r(159),b=r(152);function _(){_=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(N){s=function(t,e,r){return t[e]=r}}function u(t,e,r,o){var a=e&&e.prototype instanceof h?e:h,i=Object.create(a.prototype),c=new j(o||[]);return n(i,"_invoke",{value:b(t,r,c)}),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(N){return{type:"throw",arg:N}}}t.wrap=u;var f={};function h(){}function d(){}function p(){}var v={};s(v,a,(function(){return this}));var m=Object.getPrototypeOf,y=m&&m(m(k([])));y&&y!==e&&r.call(y,a)&&(v=y);var g=p.prototype=h.prototype=Object.create(v);function w(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){var o;n(this,"_invoke",{value:function(n,a){function i(){return new e((function(o,i){!function n(o,a,i,c){var s=l(t[o],t,a);if("throw"!==s.type){var u=s.arg,f=u.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(f).then((function(t){u.value=t,i(u)}),(function(t){return n("throw",t,i,c)}))}c(s.arg)}(n,a,o,i)}))}return o=o?o.then(i,i):i()}})}function b(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return S()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=x(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=l(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===f)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}function x(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=l(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function k(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:S}}function S(){return{value:void 0,done:!0}}return d.prototype=p,n(g,"constructor",{value:p,configurable:!0}),n(p,"constructor",{value:d,configurable:!0}),d.displayName=s(p,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,s(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},w(E.prototype),s(E.prototype,i,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new E(u(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},w(g),s(g,c,"Generator"),s(g,a,(function(){return this})),s(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=k,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}var x=b.a.rolesReadBegin,L=b.a.rolesReadSuccess,O=b.a.rolesReadErr,j=(b.a.roleAddBegin,b.a.roleAddSuccess,b.a.roleAddError,r(296)),k=r.n(j),S=r(12),N=r(121),A=r.n(N),P=r(132);e.default=function(){var t=Object(p.c)(),e=Object(p.d)((function(t){var e;return{rolesData:null!==(e=t.roles.data)&&void 0!==e?e:[]}})).rolesData,r=[],l=Object(s.useState)([]),m=Object(c.a)(l,2),b=m[0],j=m[1];e.map((function(t){var e=t.id,n=t.role,o=t.createdAt,a=t.role_description,i=t.permissions,c=t.role_status;return r.push({key:e,name:n,role_description:a,permissions:i,role_status:c,createdAt:o,dateTime:u.a.createElement("span",{className:"status-text"},u.a.createElement(k.a,{format:"DD MMMM  YYYY "},parseInt(o))),action:u.a.createElement("div",{className:"table-actions"},u.a.createElement(u.a.Fragment,null,u.a.createElement(h.a,{className:"btn-icon",type:"info",to:"#",shape:"circle"},u.a.createElement(f.a,{icon:"edit",size:16}))))})})),Object(s.useEffect)((function(){t(function(){var t=Object(v.a)(_().mark((function t(e){return _().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(x());case 2:w.j.query({query:w.e.GET_ALL_ROLES,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(t){var r,n;(null===t||void 0===t||null===(r=t.data)||void 0===r||null===(n=r.getAllRoles)||void 0===n?void 0:n.status)||e(Object(E.b)()),e(L(t.data.getAllRoles.data))})).catch((function(t){e(O(t))}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[t]);var N=[{title:"Name",dataIndex:"name",key:"name",sorter:function(t,e){return t.name.toUpperCase()>e.name.toUpperCase()?1:-1}},{title:"Description",dataIndex:"role_description",key:"role_description",sorter:function(t,e){return t.role_description.toUpperCase()>e.role_description.toUpperCase()?1:-1}},{title:"Permissions",dataIndex:"permissions",key:"permissions",ellipsis:!0,sorter:function(t,e){return t.permissions.length>e.permissions.length?-1:1},render:function(t){var e=t.map((function(t){return t.rolesPermission.roles_permission_name})).join(", ");return u.a.createElement("p",null,e)}},{title:"Status",dataIndex:"role_status",key:"role_status",width:100,align:"center",filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(t,e){return e.role_status===t},sorter:function(t,e){return t.role_status===e.role_status?0:t.role_status?-1:1},render:function(t,e){return u.a.createElement(i.a,{defaultChecked:t,title:"Status",onChange:function(t){return function(t,e){var r={data:{id:t.key,role_status:e}};w.j.mutate({mutation:w.d.UPDATE_ROLE,variables:r,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(e){var r,n=null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.updateRole;if(!(null===n||void 0===n?void 0:n.status))return g.b.error(n.message);g.b.success("".concat(t.name," Role Status updated successfully."))})).catch((function(t){g.b.error("Something went wrong.!"),console.log("Error on role status change: ",t)}))}(e,t)}})}},{title:"Action",dataIndex:"key",key:"action",width:90,align:"center",render:function(t,e){return u.a.createElement(S.b,{to:"/admin/roles/update?id=".concat(e.key),style:{cursor:"pointer"}},u.a.createElement(A.a,{name:"edit",style:{margin:".5em 1em"}}))}}],T=Object(s.useState)(""),I=Object(c.a)(T,2),R=I[0],C=I[1];return u.a.createElement(d.a,{headless:!0},r.length?u.a.createElement(u.a.Fragment,null,u.a.createElement(o.a,{prefix:u.a.createElement(f.a,{icon:"search",size:14}),placeholder:"Search Roles..",onChange:function(t){var e=t.target.value;C(e),j(r.filter((function(t){return(t.name+t.role_description).toLowerCase().includes(e.toLowerCase())})))},style:{marginBottom:"1em"}}),u.a.createElement("span",{className:"psp_list"},u.a.createElement(n.a,{dataSource:R?b:r,columns:N,size:"small",rowClassName:function(t,e){return e%2==0?"":"altTableClass"},rowKey:"key",pagination:{defaultPageSize:P.a.ROLES_PER_PAGE,total:R?b.length:r.length,showTotal:function(t,e){return"".concat(e[0],"-").concat(e[1]," of ").concat(t," items")}}}))):u.a.createElement("div",{className:"spin"},u.a.createElement(a.a,null)))}}}]);
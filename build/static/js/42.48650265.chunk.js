(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[42],{697:function(e,t,a){"use strict";a.r(t);a(156);var n=a(79),r=(a(157),a(37)),i=(a(545),a(544)),l=(a(300),a(218)),s=(a(220),a(159)),u=(a(521),a(522)),o=a(9),c=a(48),d=a(0),m=a.n(d),f=a(16),v=a.n(f),p=a(519),h=a(518),b=a(517),g=a(242),E=a(516),_=a(136),j=a(43),O=a(8),S=a(106),A=a.n(S),x=a(54),y=a.n(x),C=a(219),k=a(120),w=a(229);t.default=function(){var e=Object(j.d)((function(e){return e.auth.token})),t=Object(d.useState)(""),a=Object(c.a)(t,2),f=a[0],S=a[1],x=Object(d.useState)([]),I=Object(c.a)(x,2),N=I[0],U=I[1],L=Object(d.useState)({data:[],isLoading:!0,error:""}),T=Object(c.a)(L,2),F=T[0],D=T[1],z=Object(d.useState)({data:[],isLoading:!0}),P=Object(c.a)(z,2),R=(P[0],P[1],Object(d.useState)([])),V=Object(c.a)(R,2),q=V[0];V[1];Object(d.useEffect)((function(){_.h.query({query:_.e.GET_ALL_STAFF,context:{headers:{TENANTID:"100001",Authorization:e}}}).then((function(e){var t,a;(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.getAllStaff)||void 0===a?void 0:a.isAuth)?D((function(t){var a,n;return Object(o.a)(Object(o.a)({},t),{},{data:null===e||void 0===e||null===(a=e.data)||void 0===a||null===(n=a.getAllStaff)||void 0===n?void 0:n.data,error:""})})):dispatch(Object(w.a)())})).catch((function(e){D((function(e){return Object(o.a)(Object(o.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){D((function(e){return Object(o.a)(Object(o.a)({},e),{},{isLoading:!1})}))}))}),[]);var G=[{title:"UID",dataIndex:"uid",key:"uid",width:120,ellipsis:!0,sorter:function(e,t){return e.uid.toUpperCase()>t.uid.toUpperCase()?1:-1}},{title:"Email",dataIndex:"email",key:"email",width:200,ellipsis:!0,sorter:function(e,t){return e.email.toUpperCase()>t.email.toUpperCase()?1:-1}},{title:"First Name",dataIndex:"first_name",key:"first_name",sorter:function(e,t){return e.first_name.toUpperCase()>t.first_name.toUpperCase()?1:-1}},{title:"Last Name",dataIndex:"last_name",key:"last_name",sorter:function(e,t){return e.last_name.toUpperCase()>t.last_name.toUpperCase()?1:-1}},{title:"Roles",dataIndex:"roles",key:"roles",ellipsis:!0,sorter:function(e,t){return e.roles.length>t.roles.length?-1:1},render:function(e){var t=e.map((function(e){return e.role})).join(", ");return m.a.createElement("p",null,t)},filters:q},{title:"Verified",dataIndex:"email_verified",key:"email_verified",width:100,align:"center",render:function(e){return e.toString()},sorter:function(e,t){return e.email_verified===t.email_verified?0:e.email_verified?-1:1},filters:[{text:"Verified",value:!0},{text:"Not Verified",value:!1}],onFilter:function(e,t){return t.email_verified===e}},{title:"Status",dataIndex:"status",key:"status",width:100,align:"center",sorter:function(e,t){return e.status===t.status?0:e.status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.user_status===e},render:function(e,t){return m.a.createElement(u.a,{defaultChecked:t.user_status,title:"Status",onChange:function(e){return function(e,t){Object(j.c)();var a={data:{uid:e.uid,user_status:t}};_.h.mutate({mutation:_.d.ADMIN_UPDATE,variables:a,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(t){var a,n;if(!(null===t||void 0===t||null===(a=t.data)||void 0===a||null===(n=a.adminUpdate)||void 0===n?void 0:n.status))return C.b.error(data.message);C.b.success("".concat(e.email," user Status updated successfully."))})).catch((function(e){console.log("\ud83d\ude80 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err",e),C.b.error("Something went wrong!!")}))}(t,e)}})}},{title:"Action",dataIndex:"action",width:90,align:"center",render:function(e,t){return m.a.createElement(m.a.Fragment,null,m.a.createElement(O.b,{to:"/admin/admin/add-admin?uid=".concat(t.uid,"&first_name=").concat(t.first_name,"&last_name=").concat(t.last_name,"&email=").concat(t.email,"&status=").concat(t.status)},m.a.createElement(A.a,{name:"edit"})))},key:"last_name"}];return m.a.createElement(m.a.Fragment,null,m.a.createElement(p.a,{title:"Users",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(O.b,{to:"/admin/admin/add-admin"},m.a.createElement(E.a,{size:"small",title:"Add user",type:"primary"},m.a.createElement(v.a,{icon:"user-plus"}))))]}),m.a.createElement(h.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(b.a,{headless:!0},F.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(s.a,null)):F.error?m.a.createElement("p",null,F.error):m.a.createElement(m.a.Fragment,null,m.a.createElement(l.a,{placeholder:"Search user",prefix:m.a.createElement(g.a,null),onChange:function(e){var t=e.target.value;S(t),U(F.data.filter((function(e){var a;return((null===e||void 0===e?void 0:e.email)+(null===e||void 0===e?void 0:e.first_name)+(null===e||void 0===e?void 0:e.last_name)+(null===e||void 0===e||null===(a=e.roles)||void 0===a?void 0:a.role)).toLowerCase().includes(t.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(i.a,{className:"table-responsive",columns:G,rowKey:"uid",size:"small",dataSource:f?N:F.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:k.a.USERS_PER_PAGE,total:f?N.length:F.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
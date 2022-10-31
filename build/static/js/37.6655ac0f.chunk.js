(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[37],{872:function(e,t,a){"use strict";a.r(t);a(131);var n=a(67),r=(a(132),a(44)),i=(a(282),a(133)),l=(a(143),a(68)),s=(a(199),a(122)),o=(a(257),a(147)),u=a(12),c=a(33),d=a(0),m=a.n(d),f=a(26),v=a.n(f),p=a(146),b=a(145),g=a(144),h=a(174),E=a(178),_=a(39),j=a(46),S=a(10),O=a(112),x=a.n(O),y=a(42),I=a.n(y),w=a(50),A=a(123),C=a(148),k=a(285),N=a(260),U=a(34);t.default=function(){Object(U.b)("user");var e=Object(j.d)((function(e){return e.auth.token})),t=Object(d.useState)(""),a=Object(c.a)(t,2),f=a[0],O=a[1],y=Object(d.useState)([]),L=Object(c.a)(y,2),T=L[0],F=L[1],z=Object(d.useState)({data:[],isLoading:!0,error:""}),P=Object(c.a)(z,2),D=P[0],R=P[1],V=Object(d.useState)({data:[],isLoading:!0}),q=Object(c.a)(V,2),G=(q[0],q[1],Object(d.useState)([])),J=Object(c.a)(G,2),K=J[0];J[1];Object(d.useEffect)((function(){_.j.query({query:_.e.GET_ALL_STAFF,context:{headers:{TENANTID:"100001",Authorization:e}}}).then((function(e){var t,a;(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.getAllStaff)||void 0===a?void 0:a.isAuth)?R((function(t){var a,n;return Object(u.a)(Object(u.a)({},t),{},{data:null===e||void 0===e||null===(a=e.data)||void 0===a||null===(n=a.getAllStaff)||void 0===n?void 0:n.data,error:""})})):dispatch(Object(C.b)())})).catch((function(e){R((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){R((function(e){return Object(u.a)(Object(u.a)({},e),{},{isLoading:!1})}))}))}),[]);var M=[{title:"ID",dataIndex:"id",key:"id",width:100,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Image",dataIndex:"id",key:"id",width:70,render:function(e,t){return m.a.createElement(k.LazyLoadImage,{effect:"blur",width:"40",src:Object(N.renderImage)(t.id,t.image,"user","128x128"),onError:N.errorImageSrc,alt:t.id})}},{title:"Email",dataIndex:"email",key:"email",width:200,ellipsis:!0,sorter:function(e,t){return e.email.toUpperCase()>t.email.toUpperCase()?1:-1}},{title:"First Name",dataIndex:"first_name",key:"first_name",ellipsis:!0,sorter:function(e,t){return e.first_name.toUpperCase()>t.first_name.toUpperCase()?1:-1}},{title:"Last Name",dataIndex:"last_name",key:"last_name",ellipsis:!0,sorter:function(e,t){return e.last_name.toUpperCase()>t.last_name.toUpperCase()?1:-1}},{title:"Roles",dataIndex:"roles",key:"roles",ellipsis:!0,sorter:function(e,t){return e.roles.length>t.roles.length?-1:1},render:function(e){var t=e.map((function(e){return e.role})).join(", ");return m.a.createElement("p",null,t)},filters:K},{title:"Verified",dataIndex:"email_verified",key:"email_verified",width:100,align:"center",render:function(e){return e.toString()},sorter:function(e,t){return e.email_verified===t.email_verified?0:e.email_verified?-1:1},filters:[{text:"Verified",value:!0},{text:"Not Verified",value:!1}],onFilter:function(e,t){return t.email_verified===e}},{title:"Status",dataIndex:"status",key:"status",width:100,align:"center",sorter:function(e,t){return e.status===t.status?0:e.status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.user_status===e},render:function(e,t){return m.a.createElement(o.a,{defaultChecked:t.user_status,title:"Status",onChange:function(e){return function(e,t){var a={data:{id:e.id,user_status:t,sendEmail:!1}};_.j.mutate({mutation:_.d.ADMIN_UPDATE,variables:a,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(t){var a,n;if(!(null===t||void 0===t||null===(a=t.data)||void 0===a||null===(n=a.adminUpdate)||void 0===n?void 0:n.status))return w.b.error(data.message);w.b.success("".concat(e.email," user Status updated successfully."))})).catch((function(e){console.log("\ud83d\ude80 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err",e),w.b.error("Something went wrong!!")}))}(t,e)}})}},{title:"Action",dataIndex:"action",width:90,align:"center",render:function(e,t){return m.a.createElement(m.a.Fragment,null,m.a.createElement(S.b,{to:"/admin/admin/add-admin?id=".concat(t.id,"&first_name=").concat(t.first_name,"&last_name=").concat(t.last_name,"&email=").concat(t.email,"&status=").concat(t.status)},m.a.createElement(x.a,{name:"edit"})))},key:"last_name"}];return m.a.createElement(m.a.Fragment,null,m.a.createElement(p.a,{title:"Users",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(S.b,{to:"/admin/admin/add-admin"},m.a.createElement(E.a,{size:"small",title:"Add user",type:"primary"},m.a.createElement(v.a,{icon:"user-plus"}))))]}),m.a.createElement(b.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(g.a,{headless:!0},D.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(s.a,null)):D.error?m.a.createElement("p",null,D.error):m.a.createElement(m.a.Fragment,null,m.a.createElement(l.a,{placeholder:"Search user",prefix:m.a.createElement(h.a,null),onChange:function(e){var t=e.target.value;O(t),F(D.data.filter((function(e){var a;return((null===e||void 0===e?void 0:e.email)+(null===e||void 0===e?void 0:e.first_name)+(null===e||void 0===e?void 0:e.last_name)+(null===e||void 0===e||null===(a=e.roles)||void 0===a?void 0:a.role)).toLowerCase().includes(t.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(i.a,{className:"table-responsive",columns:M,rowKey:"id",size:"small",dataSource:f?T:D.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:A.a.USERS_PER_PAGE,total:f?T.length:D.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
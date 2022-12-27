(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[55],{998:function(e,t,a){"use strict";a.r(t);a(131);var n=a(63),r=(a(132),a(47)),i=(a(143),a(74)),l=(a(119),a(39)),s=(a(133),a(73)),o=(a(374),a(302)),u=a(7),c=a(15),d=a(0),m=a.n(d),f=a(22),p=a.n(f),v=a(120),h=a(101),E=a(100),g=a(194),b=a(99),_=a(33),j=a(48),S=a(10),x=a(103),y=a.n(x),I=a(71),w=a.n(I),A=a(31),C=a(121),O=a(219),k=a(217),N=a(156),U=a(23);t.default=function(){Object(U.c)("user");var e=Object(j.d)((function(e){return e.auth.token})),t=Object(d.useState)(""),a=Object(c.a)(t,2),f=a[0],x=a[1],I=Object(d.useState)([]),L=Object(c.a)(I,2),T=L[0],F=L[1],z=Object(d.useState)({data:[],isLoading:!0,error:""}),P=Object(c.a)(z,2),D=P[0],R=P[1];Object(d.useEffect)((function(){_.j.query({query:_.e.GET_ALL_STAFF,context:{headers:{TENANTID:"100001",Authorization:e}}}).then((function(e){var t,a;(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.getAllStaff)||void 0===a?void 0:a.isAuth)?R((function(t){var a,n;return Object(u.a)(Object(u.a)({},t),{},{data:null===e||void 0===e||null===(a=e.data)||void 0===a||null===(n=a.getAllStaff)||void 0===n?void 0:n.data,error:""})})):dispatch(Object(O.b)())})).catch((function(e){R((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){R((function(e){return Object(u.a)(Object(u.a)({},e),{},{isLoading:!1})}))}))}),[]);var V=[{title:"ID",dataIndex:"id",key:"id",width:100,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Image",dataIndex:"id",key:"id",width:70,render:function(e,t){return m.a.createElement(k.LazyLoadImage,{effect:"blur",width:"40",src:Object(N.renderImage)(t.id,t.image,"user","128x128"),onError:N.errorImageSrc,alt:t.id})}},{title:"Email",dataIndex:"email",key:"email",width:200,ellipsis:!0,sorter:function(e,t){return e.email.toUpperCase()>t.email.toUpperCase()?1:-1}},{title:"First Name",dataIndex:"first_name",key:"first_name",ellipsis:!0,sorter:function(e,t){return e.first_name.toUpperCase()>t.first_name.toUpperCase()?1:-1}},{title:"Last Name",dataIndex:"last_name",key:"last_name",ellipsis:!0,sorter:function(e,t){return e.last_name.toUpperCase()>t.last_name.toUpperCase()?1:-1}},{title:"Roles",dataIndex:"roles",key:"roles",ellipsis:!0,sorter:function(e,t){return e.roles.length>t.roles.length?-1:1},render:function(e){var t=e.map((function(e){return e.role})).join(", ");return m.a.createElement("p",null,t)}},{title:"Verified",dataIndex:"email_verified",key:"email_verified",width:100,align:"center",render:function(e){return e.toString().toUpperCase()},sorter:function(e,t){return e.email_verified===t.email_verified?0:e.email_verified?-1:1},filters:[{text:"Verified",value:!0},{text:"Not Verified",value:!1}],onFilter:function(e,t){return t.email_verified===e}},{title:"Status",dataIndex:"status",key:"status",width:100,align:"center",sorter:function(e,t){return e.status===t.status?0:e.status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.user_status===e},render:function(e,t){return m.a.createElement(o.a,{defaultChecked:t.user_status,title:"Status",onChange:function(e){return function(e,t){var a={data:{id:e.id,user_status:t,sendEmail:!1}};_.j.mutate({mutation:_.d.ADMIN_UPDATE,variables:a,context:{headers:{TENANTID:"100001",Authorization:w.a.get("psp_t")}}}).then((function(t){var a,n;if(!(null===t||void 0===t||null===(a=t.data)||void 0===a||null===(n=a.adminUpdate)||void 0===n?void 0:n.status))return A.b.error(data.message);A.b.success("".concat(e.email," user Status updated successfully."))})).catch((function(e){console.log("\ud83d\ude80 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err",e),A.b.error("Something went wrong!!")}))}(t,e)}})}},{title:"Action",dataIndex:"action",width:90,align:"center",render:function(e,t){return m.a.createElement(m.a.Fragment,null,m.a.createElement(S.b,{to:"/admin/admin/add-admin?id=".concat(t.id)},m.a.createElement(y.a,{name:"edit"})))},key:"last_name"}];return m.a.createElement(m.a.Fragment,null,m.a.createElement(v.a,{title:"Users",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(S.b,{to:"/admin/admin/add-admin"},m.a.createElement(b.a,{size:"small",title:"Add user",type:"primary"},m.a.createElement(p.a,{icon:"user-plus"}))))]}),m.a.createElement(h.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(E.a,{headless:!0},D.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(s.a,null)):D.error?m.a.createElement("p",null,D.error):m.a.createElement(m.a.Fragment,null,m.a.createElement(l.a,{placeholder:"Search user",prefix:m.a.createElement(g.a,null),onChange:function(e){var t=e.target.value;x(t),F(D.data.filter((function(e){var a;return((null===e||void 0===e?void 0:e.email)+(null===e||void 0===e?void 0:e.first_name)+(null===e||void 0===e?void 0:e.last_name)+(null===e||void 0===e||null===(a=e.roles)||void 0===a?void 0:a.role)).toLowerCase().includes(t.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(i.a,{className:"table-responsive",columns:V,rowKey:"id",size:"small",dataSource:f?T:D.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:C.a.USERS_PER_PAGE,total:f?T.length:D.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
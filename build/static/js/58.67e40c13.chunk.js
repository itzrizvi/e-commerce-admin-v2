(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[58],{986:function(e,t,a){"use strict";a.r(t);a(129);var r=a(61),n=(a(130),a(45)),i=(a(140),a(72)),l=(a(117),a(38)),o=(a(131),a(71)),c=a(7),s=a(14),u=a(0),d=a.n(u),m=a(20),f=a.n(m),p=a(118),E=a(99),v=a(98),b=a(189),g=a(97),h=a(33),_=a(46),C=a(10),O=a(101),j=a.n(O),y=a(119),w=a(212),x=a(152),S=a(23);t.default=function(){Object(S.c)("customer");var e=Object(_.d)((function(e){return e.auth.token})),t=Object(u.useState)(""),a=Object(s.a)(t,2),m=a[0],O=a[1],I=Object(u.useState)([]),k=Object(s.a)(I,2),L=k[0],N=k[1],U=Object(u.useState)({data:[],isLoading:!0,error:""}),A=Object(s.a)(U,2),T=A[0],z=A[1];Object(u.useEffect)((function(){h.j.query({query:h.i.GET_ALL_CUSTOMER,context:{headers:{TENANTID:"100001",Authorization:e}}}).then((function(e){var t=e.data.getAllCustomer;(null===t||void 0===t?void 0:t.status)&&z((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===t||void 0===t?void 0:t.data,error:""})}))})).catch((function(e){z((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){z((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[]);var F=[{title:"id",dataIndex:"id",key:"id",width:100,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Image",dataIndex:"id",key:"id",width:70,render:function(e,t){return d.a.createElement(w.LazyLoadImage,{effect:"blur",width:"40",src:Object(x.renderImage)(t.id,t.image,"user","128x128",!0),onError:x.errorImageSrc,alt:t.id})}},{title:"Email",dataIndex:"email",key:"email",width:200,ellipsis:!0,sorter:function(e,t){return e.email.toUpperCase()>t.email.toUpperCase()?1:-1}},{title:"First Name",dataIndex:"first_name",key:"first_name",sorter:function(e,t){return e.first_name.toUpperCase()>t.first_name.toUpperCase()?1:-1}},{title:"Last Name",dataIndex:"last_name",key:"last_name",sorter:function(e,t){return e.last_name.toUpperCase()>t.last_name.toUpperCase()?1:-1}},{title:"Verified",dataIndex:"email_verified",key:"email_verified",width:100,align:"center",render:function(e){return e.toString()},sorter:function(e,t){return e.email_verified===t.email_verified?0:e.email_verified?-1:1},filters:[{text:"Verified",value:!0},{text:"Not Verified",value:!1}],onFilter:function(e,t){return t.email_verified===e}},{title:"Action",dataIndex:"id",key:"id",width:90,align:"center",render:function(e,t){return d.a.createElement(d.a.Fragment,null,d.a.createElement(C.b,{to:"/admin/customers/edit/".concat(e),style:{marginRight:"10px"}},d.a.createElement(j.a,{name:"edit"})),d.a.createElement(C.b,{to:"/admin/customers/view/".concat(e)},d.a.createElement(j.a,{name:"eye"})))}}];return d.a.createElement(d.a.Fragment,null,d.a.createElement(p.a,{title:"Customers",buttons:[d.a.createElement("div",{key:"1",className:"page-header-actions"},d.a.createElement(C.b,{to:"/admin/customers/add"},d.a.createElement(g.a,{size:"small",title:"Add Customer",type:"primary"},d.a.createElement(f.a,{icon:"user-plus"}))))]}),d.a.createElement(E.b,null,d.a.createElement(r.a,{gutter:25},d.a.createElement(n.a,{sm:24,xs:24},d.a.createElement(v.a,{headless:!0},T.isLoading?d.a.createElement("div",{className:"spin"},d.a.createElement(o.a,null)):T.error?d.a.createElement("p",null,T.error):d.a.createElement(d.a.Fragment,null,d.a.createElement(l.a,{placeholder:"Search user",prefix:d.a.createElement(b.a,null),onChange:function(e){var t=e.target.value;O(t),N(T.data.filter((function(e){var a;return((null===e||void 0===e?void 0:e.email)+(null===e||void 0===e?void 0:e.first_name)+(null===e||void 0===e?void 0:e.last_name)+(null===e||void 0===e||null===(a=e.roles)||void 0===a?void 0:a.role)).toLowerCase().includes(t.toLowerCase())})))}}),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("span",{className:"psp_list"},d.a.createElement(i.a,{className:"table-responsive",columns:F,rowKey:"uid",size:"small",dataSource:m?L:T.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:y.a.CUSTOMER_PER_PAGE,total:m?L.length:T.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[15],{583:function(e,t,a){"use strict";a.r(t);a(140);var n=a(74),r=(a(141),a(34)),i=(a(577),a(574)),l=(a(250),a(187)),c=(a(189),a(152)),o=a(9),u=a(45),d=a(0),m=a.n(d),s=a(21),f=a.n(s),b=a(452),E=a(451),v=a(453),h=a(202),g=a(448),_=a(125),j=a(40),p=a(8),O=a(573),y=a.n(O),k=[{title:"Roles",dataIndex:"roles",key:"roles",render:function(e){return e.role},sorter:function(e,t){return e.roles.role_no-t.roles.role_no}},{title:"First Name",dataIndex:"first_name",key:"first_name"},{title:"Last Name",dataIndex:"last_name",key:"last_name"},{title:"email",dataIndex:"email",key:"email"},{title:"Email Verified",dataIndex:"email_verified",key:"email_verified",render:function(e){return e.toString()},sorter:function(e,t){return Number(t.email_verified)-Number(e.email_verified)}},{title:"Action",dataIndex:"action",render:function(e,t){return m.a.createElement(p.b,{to:"/admin/admin/add-admin?email=".concat(t.email,"&first_name=").concat(t.first_name,"&last_name=").concat(t.last_name)},m.a.createElement(g.a,{size:"default",type:"white"},m.a.createElement(y.a,{name:"edit"})))},key:"last_name"}];t.default=function(){var e=Object(j.d)((function(e){return e.auth.token})),t=Object(d.useState)(""),a=Object(u.a)(t,2),s=a[0],O=a[1],y=Object(d.useState)([]),A=Object(u.a)(y,2),S=A[0],x=A[1],N=Object(d.useState)({data:[],isLoading:!0,error:""}),I=Object(u.a)(N,2),L=I[0],w=I[1];Object(d.useEffect)((function(){_.c.query({query:_.b.GET_ALL_STAFF,context:{headers:{TENANTID:100001,Authorization:e}}}).then((function(e){var t,a;if(!(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.getAllStaff)||void 0===a?void 0:a.isAuth))return w((function(e){return Object(o.a)(Object(o.a)({},e),{},{error:"You Are not Authorized"})}));w((function(t){var a,n;return Object(o.a)(Object(o.a)({},t),{},{data:null===e||void 0===e||null===(a=e.data)||void 0===a||null===(n=a.getAllStaff)||void 0===n?void 0:n.data,error:""})}))})).catch((function(e){w((function(e){return Object(o.a)(Object(o.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){w((function(e){return Object(o.a)(Object(o.a)({},e),{},{isLoading:!1})}))}))}),[]);return m.a.createElement(m.a.Fragment,null,m.a.createElement(b.a,{title:"Users",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(p.b,{to:"/admin/admin/add-admin"},m.a.createElement(g.a,{size:"small",type:"primary"},m.a.createElement(f.a,{icon:"user-plus"}),"Add Admin")))]}),m.a.createElement(E.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(v.a,{headless:!0},L.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(c.a,null)):L.error?m.a.createElement("p",null,L.error):m.a.createElement(m.a.Fragment,null,m.a.createElement(l.a,{placeholder:"Search user by Email",prefix:m.a.createElement(h.a,null),onChange:function(e){var t=e.target.value;O(t),x(L.data.filter((function(e){return e.email.includes(t)})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement(i.a,{className:"table-responsive",pagination:!1,columns:k,dataSource:s?S:L.data,rowKey:"uid"})))))))}}}]);
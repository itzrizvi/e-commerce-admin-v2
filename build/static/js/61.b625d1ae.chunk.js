(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[61],{965:function(e,t,a){"use strict";a.r(t);a(140);var n=a(65),r=(a(141),a(50)),s=(a(131),a(69)),i=(a(113),a(38)),o=(a(130),a(72)),l=(a(295),a(212)),c=a(7),u=a(14),m=a(0),d=a.n(m),p=a(190),_=a(19),f=a.n(_),E=a(118),g=a(99),v=a(97),b=a(98),h=a(12),O=a(28),S=a(70),j=a.n(S),P=a(101),y=a.n(P),A=a(33),I=a(120),N=a(216),C=a(45),w=a(23);t.default=function(){Object(w.c)("permission");var e=Object(C.c)(),t=Object(m.useState)({data:[],loading:!0,error:""}),a=Object(u.a)(t,2),_=a[0],S=a[1],P=Object(m.useState)(""),x=Object(u.a)(P,2),k=x[0],R=x[1],T=Object(m.useState)([]),L=Object(u.a)(T,2),z=L[0],U=L[1];Object(m.useEffect)((function(){O.j.query({query:O.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:"100001",Authorization:j.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.getAllRolesPermission;if(!(null===n||void 0===n?void 0:n.isAuth))return e(Object(N.b)());S((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===n||void 0===n?void 0:n.data,error:""})}))})).catch((function(e){S((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){S((function(e){return Object(c.a)(Object(c.a)({},e),{},{loading:!1})}))}))}),[]);var F=[{title:"Permission Name",dataIndex:"roles_permission_name",key:"roles_permission_name",sorter:function(e,t){return e.roles_permission_name.toUpperCase()>t.roles_permission_name.toUpperCase()?1:-1}},{title:"Permission Alias",dataIndex:"roles_permission_slug",key:"roles_permission_slug",sorter:function(e,t){return e.roles_permission_slug.toUpperCase()>t.roles_permission_slug.toUpperCase()?1:-1}},{title:"Status",dataIndex:"roles_permission_status",key:"roles_permission_status",align:"right",sorter:function(e,t){return e.roles_permission_status===t.roles_permission_status?0:e.roles_permission_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.roles_permission_status===e},render:function(e,t){return d.a.createElement(l.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){var a={data:{id:e.id,roles_permission_status:t}};O.j.mutate({mutation:O.d.UPDATE_ROLES_PERMISSION,variables:a,context:{headers:{TENANTID:"100001",Authorization:j.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateRolesPermission;if(!(null===n||void 0===n?void 0:n.status))return A.b.error(null===n||void 0===n?void 0:n.message);A.b.success("".concat(e.roles_permission_name," Permission Status updated successfully."))})).catch((function(e){console.log("error on status change: ",e),A.b.error("Something went wrong!!")}))}(t,e)}})}},{title:"Action",dataIndex:"action",align:"right",render:function(e,t){return d.a.createElement(d.a.Fragment,null,d.a.createElement(h.b,{to:"/admin/permission/add?id=".concat(t.id)},d.a.createElement(y.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];return d.a.createElement(d.a.Fragment,null,d.a.createElement(E.a,{title:"Permissions",buttons:[d.a.createElement("div",{key:"1",className:"page-header-actions"},d.a.createElement(h.b,{to:"/admin/permission/add"},d.a.createElement(b.a,{size:"small",title:"Add Permission",type:"primary"},d.a.createElement(f.a,{icon:"file-plus"}))))]}),d.a.createElement(g.b,null,d.a.createElement(n.a,{gutter:25},d.a.createElement(r.a,{sm:24,xs:24},d.a.createElement(v.a,{headless:!0},_.loading?d.a.createElement("div",{className:"spin"},d.a.createElement(o.a,null)):_.error?d.a.createElement("p",null,_.error):d.a.createElement(d.a.Fragment,null,d.a.createElement(i.a,{placeholder:"Search Permission...",prefix:d.a.createElement(p.a,null),onChange:function(e){var t=e.target.value;R(t),U(_.data.filter((function(e){return null===e||void 0===e?void 0:e.roles_permission_name.toLowerCase().includes(t.toLowerCase())})))}}),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("span",{className:"psp_list"},d.a.createElement(s.a,{className:"table-responsive",columns:F,rowKey:"id",size:"small",dataSource:k?z:_.data,rowClassName:function(e,t){return t%2===0?"":"altTableClass"},pagination:{defaultPageSize:I.a.PERMISSIONS_PER_PAGE,total:k?z.length:_.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
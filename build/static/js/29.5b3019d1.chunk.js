(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[29],{602:function(e,t,a){"use strict";a.r(t);a(523);var n=a(521),r=(a(257),a(192)),s=(a(195),a(146)),o=(a(467),a(470)),i=a(46),l=a(0),c=a.n(l),u=a(18),m=a.n(u),d=(a(464),a(461)),p=a(463),f=a(40),h=a(580),E=a(603),_=a.n(E),g=a(8),b=a(98),v=a.n(b),y=a(127),k=a(51),j=a.n(k),O=a(193),S=a(115);t.default=function(){var e=Object(f.c)(),t=Object(f.d)((function(e){var t;return{rolesData:null!==(t=e.roles.data)&&void 0!==t?t:[]}})).rolesData,a=[],u=Object(l.useState)([]),E=Object(i.a)(u,2),b=E[0],k=E[1],C=Object(l.useState)(!1),w=Object(i.a)(C,2);w[0],w[1];t.map((function(e){var t=e.role_uuid,n=e.role,r=e.createdAt,s=e.role_description,o=e.permissions,i=e.role_status;return a.push({key:t,name:n,role_description:s,permissions:o,role_status:i,createdAt:r,dateTime:c.a.createElement("span",{className:"status-text"},c.a.createElement(_.a,{format:"DD MMMM  YYYY "},parseInt(r))),action:c.a.createElement("div",{className:"table-actions"},c.a.createElement(c.a.Fragment,null,c.a.createElement(d.a,{className:"btn-icon",type:"info",to:"#",shape:"circle"},c.a.createElement(m.a,{icon:"edit",size:16}))))})})),Object(l.useEffect)((function(){e(Object(h.a)())}),[e]);var D=[{title:"Name",dataIndex:"name",key:"name",sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Description",dataIndex:"role_description",key:"role_description",sorter:function(e,t){return e.role_description.toUpperCase()>t.role_description.toUpperCase()?1:-1}},{title:"Permissions",dataIndex:"permissions",key:"permissions",ellipsis:!0,sorter:function(e,t){return e.permissions.length>t.permissions.length?-1:1},render:function(e){var t=e.map((function(e){return e.rolesPermission.roles_permission_name})).join(", ");return c.a.createElement("p",null,t)}},{title:"Status",dataIndex:"role_status",key:"role_status",align:"center",sorter:function(e,t){return e.role_status===t.role_status?0:e.role_status?-1:1},render:function(e,t){return c.a.createElement(o.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){var a={data:{role_uuid:e.key,role_status:t}};y.c.mutate({mutation:y.a.UPDATE_ROLE,variables:a,context:{headers:{TENANTID:"100001",Authorization:j.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateRole;if(!(null===n||void 0===n?void 0:n.status))return O.b.error(n.message);O.b.success("".concat(e.name," Role Status updated successfully."))})).catch((function(e){O.b.error("Something went wrong.!"),console.log("\ud83d\ude80 ~ file: UpdateRole.js ~ line 193 ~ handleSubmit ~ err",e)}))}(t,e)}})}},{title:"Action",dataIndex:"key",key:"action",render:function(e,t){return c.a.createElement(g.b,{to:"/admin/roles/update?id=".concat(t.key,"&role=").concat(t.name),style:{cursor:"pointer"}},c.a.createElement(v.a,{name:"edit",style:{margin:".5em 1em"}}))}}],N=Object(l.useState)(""),x=Object(i.a)(N,2),A=x[0],I=x[1];return c.a.createElement(p.a,{headless:!0},a.length?c.a.createElement(c.a.Fragment,null,c.a.createElement(r.a,{prefix:c.a.createElement(m.a,{icon:"search",size:14}),placeholder:"Search Roles..",onChange:function(e){var t=e.target.value;I(t),k(a.filter((function(e){return(e.name+e.role_description).toLowerCase().includes(t.toLowerCase())})))},style:{marginBottom:"1em"}}),c.a.createElement("span",{className:"psp_list"},c.a.createElement(n.a,{dataSource:A?b:a,columns:D,size:"small",rowClassName:function(e,t){return t%2==0?"":"altTableClass"},rowKey:"key",pagination:{defaultPageSize:S.a.ROLES_PER_PAGE,total:A?b.length:a.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))):c.a.createElement("div",{className:"spin"},c.a.createElement(s.a,null)))}}}]);
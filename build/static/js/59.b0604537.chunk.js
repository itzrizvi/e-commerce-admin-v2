(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[59],{952:function(e,t,a){"use strict";a.r(t);a(119);var n=a(53),s=(a(120),a(41)),i=(a(363),a(292)),r=(a(114),a(35)),o=(a(131),a(71)),l=a(7),c=(a(195),a(27)),m=a(14),u=a(0),d=a.n(u),p=a(121),E=a(99),g=a(98),f=a(97),h=a(58),b=a(10),S=a(33),_=a(69),v=a.n(_),N=a(31),O=a(164),I=a.n(O),P=a(23);t.default=function(){Object(P.c)("permission");var e=Object(h.useLocation)().search,t=I.a.parse(e),a=Object(h.useHistory)(),_=c.a.useForm(),O=Object(m.a)(_,1)[0],y=Object(u.useState)(!0),T=Object(m.a)(y,2),A=T[0],R=T[1],j=Object(u.useState)(!1),L=Object(m.a)(j,2),x=L[0],z=L[1],q=Object(u.useState)({data:[],isLoading:!0}),D=Object(m.a)(q,2),M=D[0],w=D[1];Object(u.useEffect)((function(){t.id&&S.j.query({query:S.e.GET_SINGLE_ROLES_PERMISSION,variables:{query:{id:parseInt(t.id)}},context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleRolesPermission;w({data:a.data,isLoading:!1}),R(a.data.roles_permission_status)})).catch((function(e){console.log(e)}))}),[]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(p.a,{title:t.id?"Manage Permission | Edit Permission ".concat(M.isLoading?"":"(".concat(M.data.roles_permission_name,")")):"Add Permission"}),d.a.createElement(E.b,null,d.a.createElement(n.a,{gutter:25},d.a.createElement(s.a,{sm:24,xs:24},d.a.createElement(g.a,{headless:!0},t.id&&M.isLoading?d.a.createElement("div",{style:{textAlign:"center"}},d.a.createElement(o.a,{tip:"processing..."})):d.a.createElement(c.a,{style:{width:"100%"},form:O,name:"addRole",onFinish:function(e){if(console.log(e),z(!0),t.id){var n={data:{id:parseInt(t.id),roles_permission_name:e.permissionName,roles_permission_status:A}};S.j.mutate({mutation:S.d.UPDATE_ROLES_PERMISSION,variables:n,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}},refetchQueries:[{query:S.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},["getAllRolesPermission"]]}).then((function(t){var n,s=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.updateRolesPermission;if(!s.status)return N.b.error(s.message);setTimeout((function(){a.push("/admin/permission/list")}),1e3),N.b.success("".concat(e.permissionName," updated successfully"))})).catch((function(e){return console.log("got error on update Permission",e),N.b.error("Soemthing Went wrong !!")})).finally((function(){z(!1)}))}else S.j.mutate({mutation:S.d.CREATE_ROLES_PERMISSION,variables:{data:Object(l.a)(Object(l.a)({},e),{},{permissionStatus:A})},context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}},refetchQueries:[{query:S.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},["getAllRolesPermission"]]}).then((function(t){var n,s=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.createRolesPermission;if(!s.status)return N.b.error(s.message);setTimeout((function(){a.push("/admin/permission/list")}),1e3),N.b.success("".concat(e.permissionName," added successfully"))})).catch((function(e){return console.log("got error on addPermission",e),N.b.error("Soemthing Went wrong !!")})).finally((function(){z(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},d.a.createElement(c.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"permissionName",label:"Name",initialValue:t.id?M.data.roles_permission_name:""},d.a.createElement(r.a,{placeholder:"Enter Permission Name"})),d.a.createElement(c.a.Item,{name:"permissionStatus",label:"Status"},d.a.createElement(i.a,{checked:A,onChange:function(e){return R(e)}})),d.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},d.a.createElement(c.a.Item,null,d.a.createElement(f.a,{loading:x,size:"default",htmlType:"submit",type:"primary",raised:!0},x?"Processing":"Save"),d.a.createElement(b.b,{to:"/admin/permission/list"},d.a.createElement(f.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
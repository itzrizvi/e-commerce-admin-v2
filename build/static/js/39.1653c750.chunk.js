(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[39],{942:function(e,t,a){"use strict";a.r(t);a(113);var n=a(55),s=(a(114),a(41)),i=(a(272),a(163)),r=(a(88),a(24)),o=(a(131),a(70)),l=a(8),c=(a(162),a(23)),m=a(16),u=a(0),d=a.n(u),p=a(103),E=a(90),g=a(89),h=a(75),f=a(62),b=a(12),S=a(37),_=a(64),v=a.n(_),N=a(31),O=a(150),I=a.n(O),P=a(25);t.default=function(){Object(P.c)("permission");var e=Object(f.useLocation)().search,t=I.a.parse(e),a=Object(f.useHistory)(),_=c.a.useForm(),O=Object(m.a)(_,1)[0],y=Object(u.useState)(!0),A=Object(m.a)(y,2),R=A[0],j=A[1],T=Object(u.useState)(!1),L=Object(m.a)(T,2),w=L[0],x=L[1],z=Object(u.useState)({data:[],isLoading:!0}),q=Object(m.a)(z,2),D=q[0],M=q[1];Object(u.useEffect)((function(){t.id&&S.j.query({query:S.e.GET_SINGLE_ROLES_PERMISSION,variables:{query:{id:parseInt(t.id)}},context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleRolesPermission;M({data:a.data,isLoading:!1}),j(a.data.roles_permission_status)})).catch((function(e){console.log(e)}))}),[]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(p.a,{title:t.id?"Manage Permission | Edit Permission ".concat(D.isLoading?"":"(".concat(D.data.roles_permission_name,")")):"Add Permission"}),d.a.createElement(E.b,null,d.a.createElement(n.a,{gutter:25},d.a.createElement(s.a,{sm:24,xs:24},d.a.createElement(g.a,{headless:!0},t.id&&D.isLoading?d.a.createElement("div",{style:{textAlign:"center"}},d.a.createElement(o.a,{tip:"processing..."})):d.a.createElement(c.a,{style:{width:"100%"},form:O,name:"addRole",onFinish:function(e){if(console.log(e),x(!0),t.id){var n={data:{id:parseInt(t.id),roles_permission_name:e.permissionName,roles_permission_status:R}};S.j.mutate({mutation:S.d.UPDATE_ROLES_PERMISSION,variables:n,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}},refetchQueries:[{query:S.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},"getAllRolesPermission"]}).then((function(t){var n,s=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.updateRolesPermission;if(!s.status)return N.b.error(s.message);a.push("/admin/permission/list"),window.location.reload(),N.b.success("".concat(e.permissionName," updated successfully"))})).catch((function(e){return console.log("got error on update Permission",e),N.b.error("Soemthing Went wrong !!")})).finally((function(){x(!1)}))}else S.j.mutate({mutation:S.d.CREATE_ROLES_PERMISSION,variables:{data:Object(l.a)(Object(l.a)({},e),{},{permissionStatus:R})},context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}},refetchQueries:[{query:S.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},"getAllRolesPermission"]}).then((function(t){var n,s=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.createRolesPermission;if(!s.status)return N.b.error(s.message);a.push("/admin/permission/list"),window.location.reload(),N.b.success("".concat(e.permissionName," added successfully"))})).catch((function(e){return console.log("got error on addPermission",e),N.b.error("Soemthing Went wrong !!")})).finally((function(){x(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},d.a.createElement(c.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"permissionName",label:"Name",initialValue:t.id?D.data.roles_permission_name:""},d.a.createElement(r.a,{placeholder:"Enter Permission Name"})),d.a.createElement(c.a.Item,{name:"permissionStatus",label:"Status"},d.a.createElement(i.a,{checked:R,onChange:function(e){return j(e)}})),d.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},d.a.createElement(c.a.Item,null,d.a.createElement(h.a,{loading:w,size:"default",htmlType:"submit",type:"primary",raised:!0},w?"Processing":"Save"),d.a.createElement(b.b,{to:"/admin/permission/list"},d.a.createElement(h.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[56],{947:function(e,t,a){"use strict";a.r(t);a(113);var n=a(55),r=(a(114),a(41)),i=(a(149),a(73)),o=(a(272),a(163)),l=(a(131),a(70)),c=(a(297),a(138)),s=a(8),d=a(83),u=(a(162),a(23)),m=a(16),f=(a(88),a(24)),v=a(0),g=a.n(v),p=a(103),h=a(90),b=a(89),E=a(75),_=a(62),O=a(150),j=a.n(O),S=a(37),I=a(64),y=a.n(I),A=a(31),N=a(25),R=f.a.TextArea;t.default=function(){Object(N.c)("role");var e=Object(_.useHistory)(),t=Object(_.useLocation)().search,a=j.a.parse(t),O=Object(v.useState)([]),I=Object(m.a)(O,2),w=I[0],P=I[1],T=Object(v.useState)(!0),D=Object(m.a)(T,2),x=D[0],C=D[1],k=Object(v.useState)(!1),L=Object(m.a)(k,2),z=L[0],q=L[1],F=Object(v.useState)({data:{},loading:!0,error:""}),W=Object(m.a)(F,2),G=W[0],M=W[1],U=u.a.useForm(),H=Object(m.a)(U,1)[0],J=[{title:"",dataIndex:"roles_permission_name"},{title:"Access",dataIndex:"read_access",render:function(e,t,a){return g.a.createElement(c.a,{defaultChecked:e,onChange:function(e){var n,r=t.id,i=(t.read_access,t.edit_access),o={data:{permissionsData:{role_id:parseInt(null===G||void 0===G||null===(n=G.data)||void 0===n?void 0:n.id),permission_id:parseInt(r),read_access:e.target.checked,edit_access:i}}};q(!0),S.j.mutate({mutation:S.d.UPDATE_ROLE_PERMISSIONS_ONCHANGE,variables:o,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(t){var n;if(!(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.updateRolePermissions).status)return A.b.error("Something Went wrong !!");A.b.success("Permission Updated Successfully"),P((function(t){var n=Object(d.a)(t);return n[a]=Object(s.a)(Object(s.a)({},n[a]),{},{read_access:e.target.checked}),n}))})).catch((function(e){A.b.error("Something Went wrong !!")})).finally((function(){q(!1)}))}})}},{title:"Modify",dataIndex:"edit_access",render:function(e,t,a){return g.a.createElement(c.a,{defaultChecked:e,onChange:function(e){var n,r=t.id,i=t.read_access,o=(t.edit_access,{data:{permissionsData:{role_id:parseInt(null===G||void 0===G||null===(n=G.data)||void 0===n?void 0:n.id),permission_id:parseInt(r),read_access:i,edit_access:e.target.checked}}});q(!0),S.j.mutate({mutation:S.d.UPDATE_ROLE_PERMISSIONS_ONCHANGE,variables:o,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(t){var n;if(!(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.updateRolePermissions).status)return A.b.error("Something Went wrong !!");A.b.success("Permission Updated Successfully"),P((function(t){var n=Object(d.a)(t);return n[a]=Object(s.a)(Object(s.a)({},n[a]),{},{edit_access:e.target.checked}),n}))})).catch((function(e){A.b.error("Something Went wrong !!")})).finally((function(){q(!1)}))}})}}],V=Object(v.useState)({data:[],loading:!0,error:""}),K=Object(m.a)(V,2),Y=K[0],B=K[1];Object(v.useEffect)((function(){a.id&&(S.j.query({query:S.e.GET_SINGLE_ROLE,variables:{query:{id:parseInt(a.id)}},context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(e){var t,a,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleRole;n.status&&(M({data:null===n||void 0===n?void 0:n.data,loading:!1,error:""}),C(null===n||void 0===n||null===(a=n.data)||void 0===a?void 0:a.role_status))})).catch((function(e){console.log("got error loading single",e),M({data:{},loading:!1,error:"Something went worng"})})),S.j.query({query:S.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllRolesPermission;if(!(null===a||void 0===a?void 0:a.isAuth))return B((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"You Are not Authorized"})}));B((function(e){return{data:null===a||void 0===a?void 0:a.data,loading:!1,error:""}}))})).catch((function(e){B((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})))}),[]),Object(v.useEffect)((function(){if(!G.loading&&!Y.loading){var e=Y.data.map((function(e){var t,a,n=e.id,r=null===G||void 0===G||null===(t=G.data)||void 0===t||null===(a=t.permissions)||void 0===a?void 0:a.find((function(e){return e.rolesPermission.id==n})),i=Object(s.a)(Object(s.a)({},e),{},{edit_access:!1,read_access:!1});return r&&(i.read_access=r.read_access,i.edit_access=r.edit_access),i}));P(e)}}),[G,Y]);return g.a.createElement(g.a.Fragment,null,g.a.createElement(p.a,{title:"Manage Role | Edit Role ".concat(G.loading?"":"(".concat(G.data.role,")"))}),g.a.createElement(h.b,null,g.a.createElement(n.a,{gutter:25},g.a.createElement(r.a,{sm:24,xs:24},g.a.createElement(b.a,{headless:!0},G.loading||Y.loading?g.a.createElement("div",{className:"spin"},g.a.createElement(l.a,null)):g.a.createElement(g.a.Fragment,null,g.a.createElement(u.a,{style:{width:"100%"},form:H,name:"addRole",onFinish:function(t){q(!0);var a={data:Object(s.a)(Object(s.a)({},t),{},{role_status:x,id:G.data.id})};S.j.mutate({mutation:S.d.UPDATE_ROLE,variables:a,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateRole;if(!(null===n||void 0===n?void 0:n.status))return A.b.error("Something Went wrong !!");e.push("/admin/roles/list"),window.location.reload(),A.b.success("".concat(G.data.role," updated successfully."))})).catch((function(e){console.log("Error on update role: ",e)})).finally((function(){q(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},g.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"role",label:"Name",initialValue:G.data.role},g.a.createElement(f.a,{placeholder:"Enter Role Name"})),g.a.createElement(u.a.Item,{rules:[{required:!0,message:"Please enter Role Description"}],name:"roleDescription",label:"Description",initialValue:G.data.role_description},g.a.createElement(R,{rows:4,placeholder:"Enter Role Description"})),g.a.createElement(u.a.Item,{name:"role_status",label:"Status"},g.a.createElement(o.a,{checked:x,onChange:function(e){return C(e)}})),g.a.createElement(u.a.Item,{name:"permissionsData",label:"Permissions"},g.a.createElement(i.a,{pagination:!1,columns:J,rowKey:"id",dataSource:w})),g.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},g.a.createElement(u.a.Item,null,g.a.createElement(E.a,{loading:z,size:"default",htmlType:"submit",type:"primary",raised:!0},z?"Processing":"Save"),g.a.createElement(E.a,{type:"white",size:"large",onClick:function(){e.push("/admin/roles/list"),window.location.reload()}},"Cancel"))))))))))}}}]);
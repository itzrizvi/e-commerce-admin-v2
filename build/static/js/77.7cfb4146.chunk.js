(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[77],{971:function(e,t,a){"use strict";a.r(t);a(140);var n=a(65),r=(a(141),a(50)),i=(a(131),a(69)),o=(a(295),a(212)),l=(a(130),a(72)),s=(a(271),a(122)),c=a(7),d=a(81),u=(a(196),a(27)),m=a(14),f=(a(113),a(38)),v=a(0),p=a.n(v),g=a(118),h=a(99),b=a(97),E=a(98),_=a(57),O=a(164),j=a.n(O),S=a(28),I=a(70),y=a.n(I),A=a(33),N=a(23),R=f.a.TextArea;t.default=function(){Object(N.c)("role");var e=Object(_.useHistory)(),t=Object(_.useLocation)().search,a=j.a.parse(t),O=Object(v.useState)([]),I=Object(m.a)(O,2),T=I[0],P=I[1],D=Object(v.useState)(!0),w=Object(m.a)(D,2),x=w[0],C=w[1],k=Object(v.useState)(!1),L=Object(m.a)(k,2),z=L[0],q=L[1],F=Object(v.useState)({data:{},loading:!0,error:""}),W=Object(m.a)(F,2),G=W[0],M=W[1],U=u.a.useForm(),H=Object(m.a)(U,1)[0],J=[{title:"",dataIndex:"roles_permission_name"},{title:"Access",dataIndex:"read_access",render:function(e,t,a){return p.a.createElement(s.a,{defaultChecked:e,onChange:function(e){var n,r=t.id,i=t.edit_access,o={data:{permissionsData:{role_id:parseInt(null===G||void 0===G||null===(n=G.data)||void 0===n?void 0:n.id),permission_id:parseInt(r),read_access:e.target.checked,edit_access:i}}};q(!0),S.j.mutate({mutation:S.d.UPDATE_ROLE_PERMISSIONS_ONCHANGE,variables:o,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(t){var n;if(!(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.updateRolePermissions).status)return A.b.error("Something Went wrong !!");A.b.success("Permission Updated Successfully"),P((function(t){var n=Object(d.a)(t);return n[a]=Object(c.a)(Object(c.a)({},n[a]),{},{read_access:e.target.checked}),n}))})).catch((function(e){A.b.error("Something Went wrong !!")})).finally((function(){q(!1)}))}})}},{title:"Modify",dataIndex:"edit_access",render:function(e,t,a){return p.a.createElement(s.a,{defaultChecked:e,onChange:function(e){var n,r=t.id,i=t.read_access,o={data:{permissionsData:{role_id:parseInt(null===G||void 0===G||null===(n=G.data)||void 0===n?void 0:n.id),permission_id:parseInt(r),read_access:i,edit_access:e.target.checked}}};q(!0),S.j.mutate({mutation:S.d.UPDATE_ROLE_PERMISSIONS_ONCHANGE,variables:o,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(t){var n;if(!(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.updateRolePermissions).status)return A.b.error("Something Went wrong !!");A.b.success("Permission Updated Successfully"),P((function(t){var n=Object(d.a)(t);return n[a]=Object(c.a)(Object(c.a)({},n[a]),{},{edit_access:e.target.checked}),n}))})).catch((function(e){A.b.error("Something Went wrong !!")})).finally((function(){q(!1)}))}})}}],V=Object(v.useState)({data:[],loading:!0,error:""}),K=Object(m.a)(V,2),Y=K[0],B=K[1];Object(v.useEffect)((function(){a.id&&(S.j.query({query:S.e.GET_SINGLE_ROLE,variables:{query:{id:parseInt(a.id)}},context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(e){var t,a,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleRole;n.status&&(M({data:null===n||void 0===n?void 0:n.data,loading:!1,error:""}),C(null===n||void 0===n||null===(a=n.data)||void 0===a?void 0:a.role_status))})).catch((function(e){console.log("got error loading single",e),M({data:{},loading:!1,error:"Something went worng"})})),S.j.query({query:S.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllRolesPermission;if(!(null===a||void 0===a?void 0:a.isAuth))return B((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"You Are not Authorized"})}));B((function(e){return{data:null===a||void 0===a?void 0:a.data,loading:!1,error:""}}))})).catch((function(e){B((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})))}),[]),Object(v.useEffect)((function(){if(!G.loading&&!Y.loading){var e=Y.data.map((function(e){var t,a,n=e.id,r=null===G||void 0===G||null===(t=G.data)||void 0===t||null===(a=t.permissions)||void 0===a?void 0:a.find((function(e){return e.rolesPermission.id===n})),i=Object(c.a)(Object(c.a)({},e),{},{edit_access:!1,read_access:!1});return r&&(i.read_access=r.read_access,i.edit_access=r.edit_access),i}));P(e)}}),[G,Y]);return p.a.createElement(p.a.Fragment,null,p.a.createElement(g.a,{title:"Manage Role | Edit Role ".concat(G.loading?"":"(".concat(G.data.role,")"))}),p.a.createElement(h.b,null,p.a.createElement(n.a,{gutter:25},p.a.createElement(r.a,{sm:24,xs:24},p.a.createElement(b.a,{headless:!0},G.loading||Y.loading?p.a.createElement("div",{className:"spin"},p.a.createElement(l.a,null)):p.a.createElement(p.a.Fragment,null,p.a.createElement(u.a,{style:{width:"100%"},form:H,name:"addRole",onFinish:function(t){q(!0);var a={data:Object(c.a)(Object(c.a)({},t),{},{role_status:x,id:G.data.id})};S.j.mutate({mutation:S.d.UPDATE_ROLE,variables:a,context:{headers:{TENANTID:"100001",Authorization:y.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateRole;if(!(null===n||void 0===n?void 0:n.status))return A.b.error("Something Went wrong !!");setTimeout((function(){e.push("/admin/roles/list")}),1e3),A.b.success("".concat(G.data.role," updated successfully."))})).catch((function(e){console.log("Error on update role: ",e)})).finally((function(){q(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},p.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"role",label:"Name",initialValue:G.data.role},p.a.createElement(f.a,{placeholder:"Enter Role Name"})),p.a.createElement(u.a.Item,{rules:[{required:!0,message:"Please enter Role Description"}],name:"roleDescription",label:"Description",initialValue:G.data.role_description},p.a.createElement(R,{rows:4,placeholder:"Enter Role Description"})),p.a.createElement(u.a.Item,{name:"role_status",label:"Status"},p.a.createElement(o.a,{checked:x,onChange:function(e){return C(e)}})),p.a.createElement(u.a.Item,{name:"permissionsData",label:"Permissions"},p.a.createElement(i.a,{pagination:!1,columns:J,rowKey:"id",dataSource:T})),p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},p.a.createElement(u.a.Item,null,p.a.createElement(E.a,{loading:z,size:"default",htmlType:"submit",type:"primary",raised:!0},z?"Processing":"Save"),p.a.createElement(E.a,{style:{marginLeft:10},type:"light",size:"default",onClick:function(){e.push("/admin/roles/list")}},"Cancel"))))))))))}}}]);
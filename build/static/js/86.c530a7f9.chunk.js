(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[86],{1024:function(e,t,a){"use strict";a.r(t);a(147);var n=a(74),r=(a(304),a(214)),i=(a(196),a(95)),o=(a(197),a(72)),l=(a(162),a(96)),s=(a(279),a(115)),c=a(9),d=a(89),u=(a(278),a(50)),m=a(23),f=(a(145),a(44)),p=a(0),v=a.n(p),E=a(213),g=a(161),h=a(160),b=a(212),_=a(56),O=a(305),j=a.n(O),S=a(69),y=a(68),I=a.n(y),N=a(45),A=a(22),R=f.a.TextArea;t.default=function(){var e,t;Object(A.f)("role");var a=Object(_.useHistory)(),O=Object(_.useLocation)().search,y=j.a.parse(O),T=Object(p.useState)([]),P=Object(m.a)(T,2),w=P[0],D=P[1],x=Object(p.useState)(!0),C=Object(m.a)(x,2),k=C[0],L=C[1],z=Object(p.useState)(!1),q=Object(m.a)(z,2),F=q[0],W=q[1],U=Object(p.useState)({data:{},loading:!0,error:""}),G=Object(m.a)(U,2),M=G[0],V=G[1],H=u.a.useForm(),J=Object(m.a)(H,1)[0],K=[{title:"Permission Name",dataIndex:"roles_permission_name"},{title:"Access",dataIndex:"read_access",render:function(e,t,a){return v.a.createElement(s.a,{defaultChecked:e,onChange:function(e){var n,r=t.id,i=t.edit_access,o={data:{permissionsData:{role_id:parseInt(null===M||void 0===M||null===(n=M.data)||void 0===n?void 0:n.id),permission_id:parseInt(r),read_access:e.target.checked,edit_access:i}}};W(!0),S.j.mutate({mutation:S.d.UPDATE_ROLE_PERMISSIONS_ONCHANGE,variables:o,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(t){var n;if(!(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.updateRolePermissions).status)return N.b.error("Something Went wrong !!");N.b.success("Permission Updated Successfully"),D((function(t){var n=Object(d.a)(t);return n[a]=Object(c.a)(Object(c.a)({},n[a]),{},{read_access:e.target.checked}),n}))})).catch((function(e){N.b.error("Something Went wrong !!")})).finally((function(){W(!1)}))}})}},{title:"Modify",dataIndex:"edit_access",render:function(e,t,a){return v.a.createElement(s.a,{defaultChecked:e,onChange:function(e){var n,r=t.id,i=t.read_access,o={data:{permissionsData:{role_id:parseInt(null===M||void 0===M||null===(n=M.data)||void 0===n?void 0:n.id),permission_id:parseInt(r),read_access:i,edit_access:e.target.checked}}};W(!0),S.j.mutate({mutation:S.d.UPDATE_ROLE_PERMISSIONS_ONCHANGE,variables:o,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(t){var n;if(!(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.updateRolePermissions).status)return N.b.error("Something Went wrong !!");N.b.success("Permission Updated Successfully"),D((function(t){var n=Object(d.a)(t);return n[a]=Object(c.a)(Object(c.a)({},n[a]),{},{edit_access:e.target.checked}),n}))})).catch((function(e){N.b.error("Something Went wrong !!")})).finally((function(){W(!1)}))}})}}],Y=Object(p.useState)({data:[],loading:!0,error:""}),B=Object(m.a)(Y,2),Q=B[0],X=B[1];Object(p.useEffect)((function(){y.id&&(S.j.query({query:S.e.GET_SINGLE_ROLE,variables:{query:{id:parseInt(y.id)}},context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(e){var t,a,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleRole;n.status&&(V({data:null===n||void 0===n?void 0:n.data,loading:!1,error:""}),L(null===n||void 0===n||null===(a=n.data)||void 0===a?void 0:a.role_status))})).catch((function(e){console.log("got error loading single",e),V({data:{},loading:!1,error:"Something went worng"})})),S.j.query({query:S.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllRolesPermission;if(!(null===a||void 0===a?void 0:a.isAuth))return X((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"You Are not Authorized"})}));X((function(e){return{data:null===a||void 0===a?void 0:a.data,loading:!1,error:""}}))})).catch((function(e){X((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})))}),[]),Object(p.useEffect)((function(){if(!M.loading&&!Q.loading){var e=Q.data.map((function(e){var t,a,n=e.id,r=null===M||void 0===M||null===(t=M.data)||void 0===t||null===(a=t.permissions)||void 0===a?void 0:a.find((function(e){return e.rolesPermission.id===n})),i=Object(c.a)(Object(c.a)({},e),{},{edit_access:!1,read_access:!1});return r&&(i.read_access=r.read_access,i.edit_access=r.edit_access),i}));D(e)}}),[M,Q]);return v.a.createElement(v.a.Fragment,null,v.a.createElement(E.a,{title:"Manage Role | Edit Role ".concat(M.loading?"":"(".concat(M.data.role,")"))}),v.a.createElement(g.b,null,v.a.createElement(i.a,{gutter:25},v.a.createElement(o.a,{sm:24,xs:24},v.a.createElement(h.a,{headless:!0},M.loading||Q.loading?v.a.createElement("div",{className:"spin"},v.a.createElement(l.a,null)):v.a.createElement(v.a.Fragment,null,v.a.createElement(u.a,{style:{width:"100%"},form:J,name:"addRole",onFinish:function(e){W(!0);var t={data:Object(c.a)(Object(c.a)({},e),{},{role_status:k,id:M.data.id})};S.j.mutate({mutation:S.d.UPDATE_ROLE,variables:t,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateRole;if(!(null===n||void 0===n?void 0:n.status))return N.b.error("Something Went wrong !!");setTimeout((function(){a.push("/admin/roles/list")}),1e3),N.b.success("".concat(M.data.role," updated successfully."))})).catch((function(e){console.log("Error on update role: ",e)})).finally((function(){W(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},v.a.createElement(i.a,{gutter:25},v.a.createElement(o.a,{span:10},v.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"role",label:"Name",initialValue:M.data.role,labelCol:{style:{width:"40%"}}},v.a.createElement(i.a,null,v.a.createElement(o.a,{span:22},v.a.createElement(f.a,{defaultValue:null===M||void 0===M||null===(e=M.data)||void 0===e?void 0:e.role,placeholder:"Enter Role Name"})))))),v.a.createElement(i.a,{gutter:25},v.a.createElement(o.a,{span:18},v.a.createElement(u.a.Item,{rules:[{required:!0,message:"Please enter Role Description"}],name:"roleDescription",label:"Description",initialValue:M.data.role_description,labelCol:{style:{width:"21.5%"}}},v.a.createElement(i.a,null,v.a.createElement(o.a,{span:18},v.a.createElement(R,{rows:4,defaultValue:null===M||void 0===M||null===(t=M.data)||void 0===t?void 0:t.role_description,placeholder:"Enter Role Description"})))))),v.a.createElement(u.a.Item,{name:"role_status",label:"Status"},v.a.createElement(r.a,{checked:k,onChange:function(e){return L(e)}})),v.a.createElement(i.a,{gutter:25},v.a.createElement(o.a,{span:24},v.a.createElement("h2",{style:{fontSize:"15px",fontWeight:"600"}},"Select Or Update Permissions For This Role:"),v.a.createElement(u.a.Item,{name:"permissionsData"},v.a.createElement(n.a,{pagination:!1,columns:K,rowKey:"id",dataSource:w})))),v.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},v.a.createElement(u.a.Item,null,v.a.createElement(b.a,{loading:F,size:"default",htmlType:"submit",type:"primary",raised:!0},F?"Processing":"Save"),v.a.createElement(b.a,{style:{marginLeft:10},type:"light",size:"default",onClick:function(){a.push("/admin/roles/list")}},"Cancel"))))))))))}}}]);
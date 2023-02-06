(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[83],{1025:function(e,t,a){"use strict";a.r(t);a(150);var n=a(76),r=(a(166),a(97)),l=(a(312),a(219)),o=(a(200),a(96)),i=(a(201),a(74)),c=(a(288),a(118)),s=a(9),u=a(91),m=(a(287),a(53)),d=a(23),E=(a(148),a(45)),f=a(0),b=a.n(f),h=a(218),p=a(165),O=a(164),j=a(217),g=a(59),v=a(12),y=a(71),_=a(50),S=a(51),I=a(22),R=E.a.TextArea;t.default=function(){Object(I.f)("role");var e=Object(g.useHistory)(),t=Object(_.d)((function(e){return e.auth.token})),a=Object(f.useState)([]),A=Object(d.a)(a,2),T=A[0],x=A[1],N=Object(f.useState)(!1),w=Object(d.a)(N,2),C=w[0],P=w[1],D=Object(f.useState)(!0),L=Object(d.a)(D,2),k=L[0],z=L[1],F=Object(f.useState)({data:[],isLoading:!0,error:""}),W=Object(d.a)(F,2),q=W[0],M=W[1],H=m.a.useForm(),J=Object(d.a)(H,1)[0],G=[{title:"Permission Name",dataIndex:"roles_permission_name"},{title:"Access",dataIndex:"id",render:function(e,t,a){return b.a.createElement(c.a,{onChange:function(e){var t=e.target.checked;x((function(e){var n=Object(u.a)(e),r=Object(s.a)(Object(s.a)({},n[a]),{},{read_access:t});return n[a]=r,n}))}})}},{title:"Modify",dataIndex:"Modify",render:function(e,t,a){return b.a.createElement(c.a,{onChange:function(e){var t=e.target.checked;x((function(e){var n=Object(u.a)(e),r=Object(s.a)(Object(s.a)({},n[a]),{},{edit_access:t});return n[a]=r,n}))}})}}];Object(f.useEffect)((function(){y.j.query({query:y.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:100001,Authorization:t}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllRolesPermission;if(!(null===a||void 0===a?void 0:a.isAuth))return M((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"You Are not Authorized"})}));M((function(e){return Object(s.a)(Object(s.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})})),x((function(e){return null===a||void 0===a?void 0:a.data.map((function(e){return{permission_id:e.id,read_access:!1,edit_access:!1}}))}))})).catch((function(e){M((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){M((function(e){return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1})}))}))}),[]);return b.a.createElement(b.a.Fragment,null,b.a.createElement(h.a,{title:"Add Role"}),b.a.createElement(p.b,null,b.a.createElement(o.a,{gutter:25},b.a.createElement(i.a,{sm:24,xs:24},b.a.createElement(O.a,{headless:!0},b.a.createElement(m.a,{style:{width:"100%"},form:J,name:"addRole",onFinish:function(a){P(!0);var n=Object(s.a)(Object(s.a)({},a),{},{role_status:k,permissionsData:T});y.j.mutate({mutation:y.d.CREATE_ROLE_WITH_PERMISSION,variables:{data:n},context:{headers:{TENANTID:100001,Authorization:t}}}).then((function(t){var n,r=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.createRoleWithPermission;if(!(null===r||void 0===r?void 0:r.status))return S.b.error("Something Went wrong !!");setTimeout((function(){e.push("/admin/roles/list")}),1e3),S.b.success("".concat(a.role," Role created successfully."))})).catch((function(e){console.log("Error on add role: ",e),S.b.error("Something Went wrong !!")})).finally((function(){return P(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},b.a.createElement(o.a,{gutter:25},b.a.createElement(i.a,{span:10},b.a.createElement(m.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"role",label:"Name",labelCol:{style:{width:"40%"}}},b.a.createElement(o.a,null,b.a.createElement(i.a,{span:22},b.a.createElement(E.a,{placeholder:"Enter Role Name"})))))),b.a.createElement(o.a,{gutter:25},b.a.createElement(i.a,{span:18},b.a.createElement(m.a.Item,{rules:[{required:!0,message:"Please enter Role Description"}],name:"roleDescription",label:"Description",labelCol:{style:{width:"21.5%"}}},b.a.createElement(o.a,null,b.a.createElement(i.a,{span:18},b.a.createElement(R,{rows:4,placeholder:"Enter Role Description"})))))),b.a.createElement(m.a.Item,{name:"role_status",label:"Status"},b.a.createElement(l.a,{checked:k,onChange:function(e){return z(e)}})),b.a.createElement(o.a,{gutter:25},b.a.createElement(i.a,{span:24},b.a.createElement("h2",{style:{fontSize:"15px",fontWeight:"600"}},"Select Permissions For This Role:"),b.a.createElement(m.a.Item,{name:"permissionsData"},q.isLoading?b.a.createElement("div",{className:"spin"},b.a.createElement(r.a,null)):q.error?b.a.createElement("p",null,q.error):b.a.createElement(n.a,{pagination:!1,columns:G,rowKey:"id",dataSource:q.data})))),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},b.a.createElement(m.a.Item,null,b.a.createElement(j.a,{loading:C,size:"default",htmlType:"submit",type:"primary",raised:!0},C?"Processing":"Save"),b.a.createElement(v.b,{to:"/admin/roles/list"},b.a.createElement(j.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
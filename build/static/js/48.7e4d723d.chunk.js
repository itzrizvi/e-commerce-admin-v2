(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[48],{860:function(e,t,a){"use strict";a.r(t);a(130);var n=a(67),r=(a(131),a(43)),o=(a(281),a(132)),i=(a(197),a(121)),c=(a(256),a(147)),l=(a(258),a(104)),s=a(12),u=a(177),d=(a(280),a(59)),m=a(33),b=(a(143),a(68)),f=a(0),E=a.n(f),O=(a(25),a(146)),j=a(145),h=a(144),p=a(176),v=a(54),g=a(10),_=a(39),S=a(44),y=a(48),I=a(198),R=a.n(I),A=a(35),x=b.a.TextArea;t.default=function(){Object(A.b)("role");var e=Object(v.useHistory)(),t=Object(v.useLocation)().search,a=R.a.parse(t),I=Object(f.useState)(a.email||""),N=Object(m.a)(I,2),P=(N[0],N[1],Object(S.d)((function(e){return e.auth.token}))),T=Object(f.useState)([]),w=Object(m.a)(T,2),D=w[0],L=w[1],C=Object(f.useState)(!1),k=Object(m.a)(C,2),z=k[0],F=k[1],W=Object(f.useState)(!0),q=Object(m.a)(W,2),M=q[0],H=q[1],J=Object(f.useState)({data:[],isLoading:!0,error:""}),G=Object(m.a)(J,2),K=G[0],Y=G[1],B=d.a.useForm(),Q=Object(m.a)(B,1)[0],U=[{title:"",dataIndex:"roles_permission_name"},{title:"Access",dataIndex:"roles_permission_uuid",render:function(e,t,a){return E.a.createElement(l.a,{onChange:function(e){var t=e.target.checked;L((function(e){var n=Object(u.a)(e),r=Object(s.a)(Object(s.a)({},n[a]),{},{read_access:t});return n[a]=r,n}))}})}},{title:"Modify",dataIndex:"Modify",render:function(e,t,a){return E.a.createElement(l.a,{onChange:function(e){var t=e.target.checked;L((function(e){var n=Object(u.a)(e),r=Object(s.a)(Object(s.a)({},n[a]),{},{edit_access:t});return n[a]=r,n}))}})}}];Object(f.useEffect)((function(){_.j.query({query:_.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:100001,Authorization:P}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllRolesPermission;if(!(null===a||void 0===a?void 0:a.isAuth))return Y((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"You Are not Authorized"})}));Y((function(e){return Object(s.a)(Object(s.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})})),L((function(e){return null===a||void 0===a?void 0:a.data.map((function(e){return{permission_uuid:e.roles_permission_uuid,read_access:!1,edit_access:!1}}))}))})).catch((function(e){Y((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){Y((function(e){return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1})}))}))}),[]);return E.a.createElement(E.a.Fragment,null,E.a.createElement(O.a,{title:"Add Role"}),E.a.createElement(j.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(r.a,{sm:24,xs:24},E.a.createElement(h.a,{headless:!0},E.a.createElement(d.a,{style:{width:"100%"},form:Q,name:"addRole",onFinish:function(t){F(!0);var a=Object(s.a)(Object(s.a)({},t),{},{role_status:M,permissionsData:D});_.j.mutate({mutation:_.d.CREATE_ROLE_WITH_PERMISSION,variables:{data:a},context:{headers:{TENANTID:100001,Authorization:P}}}).then((function(a){var n;console.log("add role res",a);var r=null===a||void 0===a||null===(n=a.data)||void 0===n?void 0:n.createRoleWithPermission;if(!(null===r||void 0===r?void 0:r.status))return y.b.error("Something Went wrong !!");y.b.success("".concat(t.role," Role created successfully.")),e.push("/admin/roles/list")})).catch((function(e){console.log("add role err",e),y.b.error("Something Went wrong !!")})).finally((function(){return F(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},E.a.createElement(d.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"role",label:"Name"},E.a.createElement(b.a,{placeholder:"Enter Role Name"})),E.a.createElement(d.a.Item,{rules:[{required:!0,message:"Please enter Role Description"}],name:"roleDescription",label:"Description"},E.a.createElement(x,{rows:4,placeholder:"Enter Role Description"})),E.a.createElement(d.a.Item,{name:"role_status",label:"Status"},E.a.createElement(c.a,{checked:M,onChange:function(e){return H(e)}})),E.a.createElement(d.a.Item,{name:"permissionsData",label:"Permissions"},K.isLoading?E.a.createElement("div",{className:"spin"},E.a.createElement(i.a,null)):K.error?E.a.createElement("p",null,K.error):E.a.createElement(o.a,{pagination:!1,columns:U,rowKey:"roles_permission_uuid",dataSource:K.data})),E.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},E.a.createElement(d.a.Item,null,E.a.createElement(p.a,{loading:z,size:"default",htmlType:"submit",type:"primary",raised:!0},z?"Processing":"Save"),E.a.createElement(g.b,{to:"/admin/roles/list"},E.a.createElement(p.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
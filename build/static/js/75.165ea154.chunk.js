(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[75],{984:function(e,t,a){"use strict";a.r(t);a(143);var n=a(68),r=(a(144),a(52)),o=(a(133),a(71)),i=(a(132),a(74)),c=(a(303),a(217)),l=(a(278),a(124)),s=a(7),u=a(84),d=(a(201),a(27)),m=a(14),f=(a(115),a(39)),b=a(0),E=a.n(b),h=a(120),O=a(101),j=a(99),p=a(100),v=a(59),g=a(12),_=a(28),y=a(47),I=a(33),S=a(23),R=f.a.TextArea;t.default=function(){Object(S.c)("role");var e=Object(v.useHistory)(),t=Object(y.d)((function(e){return e.auth.token})),a=Object(b.useState)([]),A=Object(m.a)(a,2),T=A[0],x=A[1],N=Object(b.useState)(!1),w=Object(m.a)(N,2),D=w[0],L=w[1],P=Object(b.useState)(!0),C=Object(m.a)(P,2),k=C[0],z=C[1],F=Object(b.useState)({data:[],isLoading:!0,error:""}),W=Object(m.a)(F,2),q=W[0],M=W[1],H=d.a.useForm(),J=Object(m.a)(H,1)[0],G=[{title:"",dataIndex:"roles_permission_name"},{title:"Access",dataIndex:"id",render:function(e,t,a){return E.a.createElement(l.a,{onChange:function(e){var t=e.target.checked;x((function(e){var n=Object(u.a)(e),r=Object(s.a)(Object(s.a)({},n[a]),{},{read_access:t});return n[a]=r,n}))}})}},{title:"Modify",dataIndex:"Modify",render:function(e,t,a){return E.a.createElement(l.a,{onChange:function(e){var t=e.target.checked;x((function(e){var n=Object(u.a)(e),r=Object(s.a)(Object(s.a)({},n[a]),{},{edit_access:t});return n[a]=r,n}))}})}}];Object(b.useEffect)((function(){_.j.query({query:_.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:100001,Authorization:t}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllRolesPermission;if(!(null===a||void 0===a?void 0:a.isAuth))return M((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"You Are not Authorized"})}));M((function(e){return Object(s.a)(Object(s.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})})),x((function(e){return null===a||void 0===a?void 0:a.data.map((function(e){return{permission_id:e.id,read_access:!1,edit_access:!1}}))}))})).catch((function(e){M((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){M((function(e){return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1})}))}))}),[]);return E.a.createElement(E.a.Fragment,null,E.a.createElement(h.a,{title:"Add Role"}),E.a.createElement(O.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(r.a,{sm:24,xs:24},E.a.createElement(j.a,{headless:!0},E.a.createElement(d.a,{style:{width:"100%"},form:J,name:"addRole",onFinish:function(a){L(!0);var n=Object(s.a)(Object(s.a)({},a),{},{role_status:k,permissionsData:T});_.j.mutate({mutation:_.d.CREATE_ROLE_WITH_PERMISSION,variables:{data:n},context:{headers:{TENANTID:100001,Authorization:t}}}).then((function(t){var n,r=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.createRoleWithPermission;if(!(null===r||void 0===r?void 0:r.status))return I.b.error("Something Went wrong !!");setTimeout((function(){e.push("/admin/roles/list")}),1e3),I.b.success("".concat(a.role," Role created successfully."))})).catch((function(e){console.log("Error on add role: ",e),I.b.error("Something Went wrong !!")})).finally((function(){return L(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},E.a.createElement(d.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"role",label:"Name"},E.a.createElement(f.a,{placeholder:"Enter Role Name"})),E.a.createElement(d.a.Item,{rules:[{required:!0,message:"Please enter Role Description"}],name:"roleDescription",label:"Description"},E.a.createElement(R,{rows:4,placeholder:"Enter Role Description"})),E.a.createElement(d.a.Item,{name:"role_status",label:"Status"},E.a.createElement(c.a,{checked:k,onChange:function(e){return z(e)}})),E.a.createElement(d.a.Item,{name:"permissionsData",label:"Permissions"},q.isLoading?E.a.createElement("div",{className:"spin"},E.a.createElement(i.a,null)):q.error?E.a.createElement("p",null,q.error):E.a.createElement(o.a,{pagination:!1,columns:G,rowKey:"id",dataSource:q.data})),E.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},E.a.createElement(d.a.Item,null,E.a.createElement(p.a,{loading:D,size:"default",htmlType:"submit",type:"primary",raised:!0},D?"Processing":"Save"),E.a.createElement(g.b,{to:"/admin/roles/list"},E.a.createElement(p.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
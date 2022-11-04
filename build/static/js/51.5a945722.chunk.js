(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[51],{877:function(e,t,a){"use strict";a.r(t);a(126);var n=a(67),r=(a(127),a(45)),o=(a(188),a(94)),i=(a(187),a(110)),c=(a(268),a(152)),l=(a(292),a(131)),s=a(12),u=a(95),d=(a(207),a(40)),m=a(26),b=(a(109),a(31)),f=a(0),E=a.n(f),h=a(151),O=a(129),j=a(128),p=a(186),v=a(58),g=a(11),y=a(46),S=a(47),I=a(36),_=a(33),R=b.a.TextArea;t.default=function(){Object(_.b)("role");var e=Object(v.useHistory)(),t=Object(S.d)((function(e){return e.auth.token})),a=Object(f.useState)([]),A=Object(m.a)(a,2),w=A[0],x=A[1],N=Object(f.useState)(!1),P=Object(m.a)(N,2),T=P[0],D=P[1],C=Object(f.useState)(!0),L=Object(m.a)(C,2),k=L[0],z=L[1],F=Object(f.useState)({data:[],isLoading:!0,error:""}),W=Object(m.a)(F,2),q=W[0],M=W[1],H=d.a.useForm(),J=Object(m.a)(H,1)[0],G=[{title:"",dataIndex:"roles_permission_name"},{title:"Access",dataIndex:"id",render:function(e,t,a){return E.a.createElement(l.a,{onChange:function(e){var t=e.target.checked;x((function(e){var n=Object(u.a)(e),r=Object(s.a)(Object(s.a)({},n[a]),{},{read_access:t});return n[a]=r,n}))}})}},{title:"Modify",dataIndex:"Modify",render:function(e,t,a){return E.a.createElement(l.a,{onChange:function(e){var t=e.target.checked;x((function(e){var n=Object(u.a)(e),r=Object(s.a)(Object(s.a)({},n[a]),{},{edit_access:t});return n[a]=r,n}))}})}}];Object(f.useEffect)((function(){y.j.query({query:y.e.GET_ALL_ROLES_PERMISSION,context:{headers:{TENANTID:100001,Authorization:t}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllRolesPermission;if(!(null===a||void 0===a?void 0:a.isAuth))return M((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"You Are not Authorized"})}));M((function(e){return Object(s.a)(Object(s.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})})),x((function(e){return null===a||void 0===a?void 0:a.data.map((function(e){return{permission_id:e.id,read_access:!1,edit_access:!1}}))}))})).catch((function(e){M((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){M((function(e){return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1})}))}))}),[]);return E.a.createElement(E.a.Fragment,null,E.a.createElement(h.a,{title:"Add Role"}),E.a.createElement(O.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(r.a,{sm:24,xs:24},E.a.createElement(j.a,{headless:!0},E.a.createElement(d.a,{style:{width:"100%"},form:J,name:"addRole",onFinish:function(a){D(!0);var n=Object(s.a)(Object(s.a)({},a),{},{role_status:k,permissionsData:w});y.j.mutate({mutation:y.d.CREATE_ROLE_WITH_PERMISSION,variables:{data:n},context:{headers:{TENANTID:100001,Authorization:t}}}).then((function(t){var n,r=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.createRoleWithPermission;if(!(null===r||void 0===r?void 0:r.status))return I.b.error("Something Went wrong !!");e.push("/admin/roles/list"),window.location.reload(),I.b.success("".concat(a.role," Role created successfully."))})).catch((function(e){console.log("Error on add role: ",e),I.b.error("Something Went wrong !!")})).finally((function(){return D(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},E.a.createElement(d.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"role",label:"Name"},E.a.createElement(b.a,{placeholder:"Enter Role Name"})),E.a.createElement(d.a.Item,{rules:[{required:!0,message:"Please enter Role Description"}],name:"roleDescription",label:"Description"},E.a.createElement(R,{rows:4,placeholder:"Enter Role Description"})),E.a.createElement(d.a.Item,{name:"role_status",label:"Status"},E.a.createElement(c.a,{checked:k,onChange:function(e){return z(e)}})),E.a.createElement(d.a.Item,{name:"permissionsData",label:"Permissions"},q.isLoading?E.a.createElement("div",{className:"spin"},E.a.createElement(i.a,null)):q.error?E.a.createElement("p",null,q.error):E.a.createElement(o.a,{pagination:!1,columns:G,rowKey:"id",dataSource:q.data})),E.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},E.a.createElement(d.a.Item,null,E.a.createElement(p.a,{loading:T,size:"default",htmlType:"submit",type:"primary",raised:!0},T?"Processing":"Save"),E.a.createElement(g.b,{to:"/admin/roles/list"},E.a.createElement(p.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[60],{942:function(e,a,t){"use strict";t.r(a);t(150);var n=t(77),l=(t(314),t(218)),r=(t(200),t(97)),i=(t(201),t(74)),s=(t(148),t(45)),o=(t(166),t(98)),u=(t(290),t(117)),c=(t(288),t(69)),d=t(9),m=(t(289),t(52)),E=t(23),f=(t(637),t(639)),p=t(0),b=t.n(p),h=t(21),v=t.n(h),g=t(217),_=t(165),j=t(164),y=t(287),O=t(58),N=t(12),A=t(50),T=t(71),S=t(317),L=t.n(S),x=t(68),I=t.n(x),w=t(22),P=t(135),F=t(76),C=t(136);f.a.Paragraph;a.default=function(){var e,a,t,f;Object(w.f)("user");var h=Object(O.useHistory)(),S=Object(O.useLocation)().search,x=L.a.parse(S),D=Object(p.useState)(!0),z=Object(E.a)(D,2),R=z[0],q=z[1],k=Object(p.useState)([]),G=Object(E.a)(k,2),U=G[0],V=G[1],M=Object(p.useState)(!0),J=Object(E.a)(M,2),Q=J[0],W=(J[1],Object(p.useState)({data:{},isLoading:!0})),H=Object(E.a)(W,2),K=H[0],Y=H[1],B=Object(p.useState)({roles:[],isLoading:!0,error:null}),X=Object(E.a)(B,2),Z=X[0],$=X[1],ee=Object(p.useState)(!1),ae=Object(E.a)(ee,2),te=ae[0],ne=ae[1],le=Object(p.useState)(!1),re=Object(E.a)(le,2),ie=re[0],se=re[1],oe=Object(A.d)((function(e){return e.auth.token})),ue=Object(p.useState)({data:[],isLoading:!0}),ce=Object(E.a)(ue,2),de=ce[0],me=ce[1],Ee=m.a.useForm(),fe=Object(E.a)(Ee,1)[0];Object(p.useEffect)((function(){$((function(e){return Object(d.a)(Object(d.a)({},e),{},{isLoading:!0})})),T.j.query({query:T.e.GET_ALL_ROLES,context:{headers:{TENANTID:"100001",Authorization:oe}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getAllRoles;t.status&&$((function(e){return Object(d.a)(Object(d.a)({},e),{},{roles:t.data})}))})).finally((function(){$((function(e){return Object(d.a)(Object(d.a)({},e),{},{isLoading:!1})}))}))}),[]),Object(p.useEffect)((function(){x.id&&T.j.query({query:T.e.GET_SINGLE_ADMIN,variables:{query:{id:parseInt(x.id)}},context:{headers:{TENANTID:"100001",Authorization:oe}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getSingleAdmin;if(t.status){var n;Y({data:t.data,isLoading:!1});var l=(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.roles).map((function(e){return e.id}));me({data:l,isLoading:!1}),V(l)}})).finally((function(){$((function(e){return Object(d.a)(Object(d.a)({},e),{},{isLoading:!1})}))}))}),[]);var pe=[{title:"Role",dataIndex:"role",key:"role",width:100,ellipsis:!0,render:function(e,a){return b.a.createElement(u.a,{value:a.id},a.role)},sorter:function(e,a){return e.role>a.role?1:-1}},{title:"Role Descrption",dataIndex:"role_description",key:"role_description",width:120,render:function(e){return e}}];return b.a.createElement(b.a.Fragment,null,b.a.createElement(g.a,{title:x.id?"Manage User | Edit user ".concat(K.isLoading?"":"(".concat(K.data.email,")")):"Add Admin",buttons:[x.id&&b.a.createElement("div",{key:"1",className:"page-header-actions"},b.a.createElement(y.a,{disabled:K.isLoading,loading:ie,onClick:function(){se(!0),T.j.mutate({mutation:T.e.SEND_RESET_PASSWORD,variables:{data:{email:K.data.email,permissionName:"user"}},context:{headers:{TENANTID:"100001",Authorization:oe}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.resetPassword;(null===t||void 0===t?void 0:t.status)?c.b.success(t.message):Object(F.a)()})).finally((function(){return se(!1)}))},size:"small",title:"Reset Password",type:"primary"},b.a.createElement(v.a,{icon:"settings"}),te?"Processing":"Reset Password"))]}),b.a.createElement(_.b,null,b.a.createElement(r.a,{gutter:25},b.a.createElement(i.a,{sm:24,xs:24},b.a.createElement(j.a,{headless:!0},x.id&&K.isLoading?b.a.createElement("div",{div:!0,className:"spin"},b.a.createElement(o.a,null)):b.a.createElement(m.a,{style:{width:"100%"},form:fe,name:"addAdmin",onFinish:function(e){if(!U.length)return c.b.warn(C.a.ROLE_EMPTY);if(ne(!0),x.id){var a=e.first_name,t=e.last_name,n=e.phone,l=e.fax,r={data:{id:parseInt(x.id),first_name:a,phone:n,fax:l,last_name:t,role_ids:U.map((function(e){return{role_id:e}})),user_status:R,sendEmail:Q}};T.j.mutate({mutation:T.d.ADMIN_UPDATE,variables:r,refetchQueries:[{query:T.e.GET_ALL_STAFF,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}},["getAllStaff"]],context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.adminUpdate;if(!(null===t||void 0===t?void 0:t.status))return Object(F.a)();setTimeout((function(){h.push("/admin/admin/admins")}),1e3),c.b.success(t.message)})).finally((function(){return ne(!1)}))}else{var i={data:Object(d.a)(Object(d.a)({},e),{},{role_ids:U.map((function(e){return{role_id:e}})),userStatus:R,sendEmail:!0})};T.j.mutate({mutation:T.d.ADMIN_SIGN_UP,variables:i,refetchQueries:[{query:T.e.GET_ALL_STAFF,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}},["getAllStaff"]],context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(a){var t=a.data.adminSignUp;if(!(null===t||void 0===t?void 0:t.status))return Object(F.a)();setTimeout((function(){h.push("/admin/admin/admins")}),1e3),c.b.success("".concat(e.email," added successfully."))})).finally((function(){return ne(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4},initialValues:x.id?{first_name:K.data.first_name,last_name:K.data.last_name,phone:K.data.phone,fax:K.data.fax}:null},b.a.createElement(r.a,{gutter:25},b.a.createElement(i.a,{span:10},b.a.createElement(m.a.Item,{rules:[{required:!0,max:30,message:"Please enter First Name"}],name:"first_name",label:"First Name",labelCol:{style:{width:"40%"}}},b.a.createElement(r.a,null,b.a.createElement(i.a,{span:20},b.a.createElement(s.a,{defaultValue:null===K||void 0===K||null===(e=K.data)||void 0===e?void 0:e.first_name,placeholder:"Enter First Name"})))))),b.a.createElement(r.a,{gutter:25},b.a.createElement(i.a,{span:10},b.a.createElement(m.a.Item,{rules:[{required:!0,message:"Please enter Last Name"}],name:"last_name",label:"Last Name",labelCol:{style:{width:"40%"}}},b.a.createElement(r.a,null,b.a.createElement(i.a,{span:20},b.a.createElement(s.a,{defaultValue:null===K||void 0===K||null===(a=K.data)||void 0===a?void 0:a.last_name,placeholder:"Enter Last Name"})))))),!x.id&&b.a.createElement(r.a,{gutter:25},b.a.createElement(i.a,{span:10},b.a.createElement(m.a.Item,{rules:[{required:!0,message:"Please enter an email",max:30}],name:"email",label:"Email",labelCol:{style:{width:"40%"}}},b.a.createElement(r.a,null,b.a.createElement(i.a,{span:20},b.a.createElement(s.a,{type:"email",placeholder:"Enter Email Address"})))))),b.a.createElement(r.a,{gutter:25},b.a.createElement(i.a,{span:10},b.a.createElement(m.a.Item,{label:"Phone",name:"phone",labelCol:{style:{width:"40%"}}},b.a.createElement(r.a,null,b.a.createElement(i.a,{span:20},b.a.createElement(s.a,{type:"text",defaultValue:null===K||void 0===K||null===(t=K.data)||void 0===t?void 0:t.phone,placeholder:"Enter Phone Number"})))))),b.a.createElement(r.a,{gutter:25},b.a.createElement(i.a,{span:10},b.a.createElement(m.a.Item,{label:"Fax",name:"fax",labelCol:{style:{width:"40%"}}},b.a.createElement(r.a,null,b.a.createElement(i.a,{span:20},b.a.createElement(s.a,{type:"text",defaultValue:null===K||void 0===K||null===(f=K.data)||void 0===f?void 0:f.fax,placeholder:"Enter Fax Number"})))))),b.a.createElement(m.a.Item,{name:"userStatus",label:"User Status"},b.a.createElement(l.a,{checked:R,onChange:function(e){return q(e)}})),b.a.createElement(r.a,{gutter:25},b.a.createElement(i.a,{span:20,offset:2},b.a.createElement(m.a.Item,{name:"role_ids",initialValue:""},x.id&&de.isLoading||Z.isLoading?b.a.createElement("div",{className:"spin"},b.a.createElement(o.a,null)):b.a.createElement(b.a.Fragment,null,b.a.createElement(u.a.Group,{style:{width:"100%",marginTop:"1em"},defaultValue:de.data,onChange:function(e){return V(e)}},b.a.createElement("span",{className:"psp_list"},b.a.createElement("h2",{style:{fontSize:"15px",fontWeight:"600"}},"Select Roles:"),b.a.createElement(n.a,{className:"table-responsive",columns:pe,rowKey:"id",style:{borderRadius:"0px"},size:"small",dataSource:Z.roles?Z.roles:[],rowClassName:function(e,a){return a%2===0?"":"altTableClass"},pagination:{defaultPageSize:P.a.CUSTOMER_PER_PAGE,total:Z.roles?Z.roles.length:0,showTotal:function(e,a){return"".concat(a[0],"-").concat(a[1]," of ").concat(e," items")}}}))))))),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},b.a.createElement(m.a.Item,null,b.a.createElement(y.a,{loading:te,disabled:Z.isLoading,size:"default",htmlType:"submit",type:"primary",raised:!0},te?"Processing":"Save"),b.a.createElement(N.b,{to:"/admin/admin/admins"},b.a.createElement(y.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
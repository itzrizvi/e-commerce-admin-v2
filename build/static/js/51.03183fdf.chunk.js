(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[51],{959:function(e,a,t){"use strict";t.r(a);t(140);var n=t(65),r=(t(141),t(50)),i=(t(270),t(122)),s=(t(294),t(212)),l=(t(113),t(38)),o=(t(130),t(72)),c=t(7),u=(t(196),t(27)),d=t(14),m=(t(651),t(657)),f=t(0),E=t.n(f),g=t(19),b=t.n(g),p=t(118),h=t(99),v=t(97),j=t(98),_=t(57),O=t(12),y=t(45),A=t(28),N=t(33),S=t(164),L=t.n(S),T=t(70),I=t.n(T),w=t(23),D=m.a.Paragraph;a.default=function(){Object(w.c)("user");var e=Object(_.useHistory)(),a=Object(_.useLocation)().search,t=L.a.parse(a),m=Object(f.useState)(!0),g=Object(d.a)(m,2),S=g[0],T=g[1],F=Object(f.useState)([]),P=Object(d.a)(F,2),x=P[0],q=P[1],z=Object(f.useState)(!0),R=Object(d.a)(z,2),k=R[0],G=(R[1],Object(f.useState)({data:{},isLoading:!0})),C=Object(d.a)(G,2),U=C[0],M=C[1],V=Object(f.useState)({roles:[],isLoading:!0,error:null}),J=Object(d.a)(V,2),Q=J[0],W=J[1],H=Object(f.useState)(!1),B=Object(d.a)(H,2),K=B[0],X=B[1],Y=Object(f.useState)(!1),Z=Object(d.a)(Y,2),$=Z[0],ee=Z[1],ae=Object(y.d)((function(e){return e.auth.token})),te=Object(f.useState)({data:[],isLoading:!0}),ne=Object(d.a)(te,2),re=ne[0],ie=ne[1],se=u.a.useForm(),le=Object(d.a)(se,1)[0];Object(f.useEffect)((function(){W((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!0})})),A.j.query({query:A.e.GET_ALL_ROLES,context:{headers:{TENANTID:"100001",Authorization:ae}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getAllRoles;t.status&&W((function(e){return Object(c.a)(Object(c.a)({},e),{},{roles:t.data})}))})).catch((function(e){console.log("Error on get all role",e)})).finally((function(){W((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[]),Object(f.useEffect)((function(){t.id&&A.j.query({query:A.e.GET_SINGLE_ADMIN,variables:{query:{id:parseInt(t.id)}},context:{headers:{TENANTID:"100001",Authorization:ae}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getSingleAdmin;if(t.status){var n;M({data:t.data,isLoading:!1});var r=(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.roles).map((function(e){return e.id}));ie({data:r,isLoading:!1}),q(r)}})).catch((function(e){console.log("Error on loading single user",e)})).finally((function(){W((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[]);return E.a.createElement(E.a.Fragment,null,E.a.createElement(p.a,{title:t.id?"Manage User | Edit user ".concat(U.isLoading?"":"(".concat(U.data.email,")")):"Add Admin",buttons:[t.id&&E.a.createElement("div",{key:"1",className:"page-header-actions"},E.a.createElement(j.a,{disabled:U.isLoading,loading:$,onClick:function(){ee(!0),A.j.mutate({mutation:A.e.SEND_RESET_PASSWORD,variables:{data:{email:U.data.email,permissionName:"user"}},context:{headers:{TENANTID:"100001",Authorization:ae}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.resetPassword;t.status?N.b.success(t.message):N.b.error(t.message)})).catch((function(e){N.b.error("Something Went wrong !!")})).finally((function(){return ee(!1)}))},size:"small",title:"Reset Password",type:"primary"},E.a.createElement(b.a,{icon:"settings"}),K?"Processing":"Reset Password"))]}),E.a.createElement(h.b,null,E.a.createElement(n.a,{gutter:25},E.a.createElement(r.a,{sm:24,xs:24},E.a.createElement(v.a,{headless:!0},t.id&&U.isLoading?E.a.createElement("div",{div:!0,className:"spin"},E.a.createElement(o.a,null)):E.a.createElement(u.a,{style:{width:"100%"},form:le,name:"addProduct",onFinish:function(a){if(!x.length)return N.b.warn("Select At List 1 Role..");if(X(!0),t.id){var n=a.first_name,r=a.last_name,i={data:{id:parseInt(t.id),first_name:n,last_name:r,role_ids:x.map((function(e){return{role_id:e}})),user_status:S,sendEmail:k}};A.j.mutate({mutation:A.d.ADMIN_UPDATE,variables:i,refetchQueries:[{query:A.e.GET_ALL_STAFF,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}},["getAllStaff"]],context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(a){var n,r;if(!(null===a||void 0===a||null===(n=a.data)||void 0===n||null===(r=n.adminUpdate)||void 0===r?void 0:r.status))return N.b.error(data.message);setTimeout((function(){e.push("/admin/admin/admins")}),1e3),N.b.success("".concat(t.email," user Status updated successfully."))})).catch((function(e){console.log("Error on update admin",e),N.b.error("Something went wrong!!")})).finally((function(){return X(!1)}))}else{var s={data:Object(c.a)(Object(c.a)({},a),{},{role_ids:x.map((function(e){return{role_id:e}})),userStatus:S,sendEmail:!0})};A.j.mutate({mutation:A.d.ADMIN_SIGN_UP,variables:s,refetchQueries:[{query:A.e.GET_ALL_STAFF,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}},["getAllStaff"]],context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(t){var n=t.data.adminSignUp;if(!n.status)return N.b.error(n.message);setTimeout((function(){e.push("/admin/admin/admins")}),1e3),N.b.success("".concat(a.email," added successfully."))})).catch((function(e){console.log("Error on add admin",e),N.b.error("Something went wrong !!")})).finally((function(){return X(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4},initialValues:t.id?{first_name:U.data.first_name,last_name:U.data.last_name}:null},E.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please enter First Name"}],name:"first_name",label:"First Name"},E.a.createElement(l.a,{placeholder:"Enter First Name"})),E.a.createElement(u.a.Item,{rules:[{required:!0,message:"Please enter Last Name"}],name:"last_name",label:"Last Name"},E.a.createElement(l.a,{placeholder:"Enter Last Name"})),!t.id&&E.a.createElement(u.a.Item,{rules:[{required:!0,message:"Please enter an email",max:30}],name:"email",label:"Email"},E.a.createElement(l.a,{type:"email",placeholder:"Enter Email Address"})),E.a.createElement(u.a.Item,{name:"userStatus",label:"User Status"},E.a.createElement(s.a,{checked:S,onChange:function(e){return T(e)}})),E.a.createElement(u.a.Item,{name:"role_ids",initialValue:"",label:"Role"},t.id&&re.isLoading||Q.isLoading?E.a.createElement("div",{className:"spin"},E.a.createElement(o.a,null)):E.a.createElement(E.a.Fragment,null,E.a.createElement(i.a.Group,{style:{width:"100%",marginTop:"1em"},defaultValue:re.data,onChange:function(e){return q(e)}},E.a.createElement(n.a,null,Q.roles.map((function(e){return E.a.createElement(r.a,{span:12,key:e.id},E.a.createElement(i.a,{value:e.id},e.role),E.a.createElement("br",null),E.a.createElement(D,{style:{marginLeft:"2em",color:"gray",width:"calc(100% - 4em)"},ellipsis:{tooltip:e.role_description,rows:1}},e.role_description))})))))),E.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},E.a.createElement(u.a.Item,null,E.a.createElement(j.a,{loading:K,disabled:Q.isLoading,size:"default",htmlType:"submit",type:"primary",raised:!0},K?"Processing":"Save"),E.a.createElement(O.b,{to:"/admin/admin/admins"},E.a.createElement(j.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
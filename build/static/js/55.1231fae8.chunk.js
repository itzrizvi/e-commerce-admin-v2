(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[55],{982:function(e,t,r){"use strict";r.r(t);r(140);var a=r(65),o=(r(141),r(50)),n=(r(295),r(212)),u=(r(130),r(72)),s=r(7),i=(r(196),r(27)),c=r(14),l=(r(113),r(38)),m=r(0),d=r.n(m),p=r(118),g=r(99),_=r(97),E=r(98),f=r(57),h=r(12),b=r(164),v=r.n(b),O=r(28),G=r(70),T=r.n(G),j=r(33),y=r(23),A=l.a.TextArea;t.default=function(){Object(y.c)("customer-group");var e=Object(f.useLocation)().search,t=v.a.parse(e),r=Object(f.useHistory)(),b=Object(m.useState)({data:[],isLoading:!0}),G=Object(c.a)(b,2),S=G[0],C=G[1],I=Object(m.useState)(!0),N=Object(c.a)(I,2),R=N[0],U=N[1],x=Object(m.useState)(!1),L=Object(c.a)(x,2),P=L[0],D=L[1],q=i.a.useForm(),w=Object(c.a)(q,1)[0];Object(m.useEffect)((function(){t.id&&O.j.query({query:O.i.GET_SINGLE_CUSTOMER_GROUP,variables:{query:{customer_group_id:parseInt(t.id)}},context:{headers:{TENANTID:"100001",Authorization:T.a.get("psp_t")}}}).then((function(e){var t,r=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleCustomerGroup;(null===r||void 0===r?void 0:r.status)&&C((function(e){return Object(s.a)(Object(s.a)({},e),{},{data:null===r||void 0===r?void 0:r.data,error:""})}))})).catch((function(e){C((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){C((function(e){return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1})}))}))}),[]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(p.a,{title:t.id?"Manage Group | Edit ".concat(S.isLoading?"":"(".concat(S.data.customer_group_name,")")):"Add Customer Group"}),d.a.createElement(g.b,null,d.a.createElement(a.a,{gutter:25},d.a.createElement(o.a,{sm:24,xs:24},d.a.createElement(_.a,{headless:!0},t.id&&S.isLoading?d.a.createElement("div",{div:!0,className:"spin"},d.a.createElement(u.a,null)):d.a.createElement(i.a,{style:{width:"100%"},form:w,name:"addRole",onFinish:function(e){var a=e.customer_group_name,o=e.customergroup_description,n=e.customergroup_sortorder;if(t.id){var u={data:{id:parseInt(t.id),customer_group_name:a,customergroup_description:o,customergroup_sortorder:parseInt(n),customergroup_status:R}};O.j.mutate({mutation:O.h.UPDATE_CUSTOMER_GROUP,variables:u,refetchQueries:[{query:O.i.GET_ALL_CUSTOMER_GROUPS,context:{headers:{TENANTID:"100001",Authorization:T.a.get("psp_t")}}},["getAllCustomerGroups"]],context:{headers:{TENANTID:"100001",Authorization:T.a.get("psp_t")}}}).then((function(t){var a,o=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateCustomerGroup;if(!o.status)return j.b.error(o.message);setTimeout((function(){r.push("/admin/customers/group")}),1e3),j.b.success("".concat(e.customer_group_name," Group Updated successfully"))})).catch((function(e){return console.log("got error on addCustomerGroup",e),j.b.error("Something Went wrong !!")})).finally((function(){D(!1)}))}else{var s={data:{customer_group_name:a,customergroup_description:o,customergroup_sortorder:parseInt(n),customergroup_status:R}};O.j.mutate({mutation:O.h.CREATE_CUSTOMER_GROUP,variables:s,refetchQueries:[{query:O.i.GET_ALL_CUSTOMER_GROUPS,context:{headers:{TENANTID:"100001",Authorization:T.a.get("psp_t")}}},["getAllCustomerGroups"]],context:{headers:{TENANTID:"100001",Authorization:T.a.get("psp_t")}}}).then((function(t){var a,o=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.createCustomerGroup;if(!o.status)return j.b.error(o.message);setTimeout((function(){r.push("/admin/customers/group")}),1e3),j.b.success("".concat(e.customer_group_name," Group added successfully"))})).catch((function(e){return console.log("got error on addCustomerGroup",e),j.b.error("Something Went wrong !!")})).finally((function(){D(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},d.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Attribute Group Name"}],name:"customer_group_name",label:"Group Name",initialValue:t.id?S.data.customer_group_name:""},d.a.createElement(l.a,{placeholder:"Enter Attribute Group Name"})),d.a.createElement(i.a.Item,{rules:[{required:!0,message:"Please enter Group Description"}],name:"customergroup_description",label:"Description",initialValue:S.data.customergroup_description||""},d.a.createElement(A,{rows:4,placeholder:"Enter Group Description"})),d.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Sort order"}],name:"customergroup_sortorder",label:"Sort order",initialValue:S.data.customergroup_sortorder?parseInt(S.data.customergroup_sortorder):""},d.a.createElement(l.a,{type:"number",placeholder:"Enter sort order"})),d.a.createElement(i.a.Item,{label:"Group Status"},d.a.createElement(n.a,{checked:R,onChange:function(e){return U(e)}})),d.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},d.a.createElement(i.a.Item,null,d.a.createElement(E.a,{loading:P,size:"default",htmlType:"submit",type:"primary",raised:!0},P?"Processing":"Save"),d.a.createElement(h.b,{to:"/admin/customers/group"},d.a.createElement(E.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
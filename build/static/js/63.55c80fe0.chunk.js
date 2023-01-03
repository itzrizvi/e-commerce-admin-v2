(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[63],{993:function(e,t,a){"use strict";a.r(t);a(143);var r=a(68),n=(a(144),a(52)),o=(a(303),a(217)),s=(a(115),a(39)),u=(a(132),a(74)),i=(a(201),a(27)),l=a(14),c=a(0),d=a.n(c),p=a(120),m=a(101),g=a(99),_=a(100),b=a(59),f=a(12),h=a(168),E=a.n(h),A=a(28),T=a(72),v=a.n(T),y=a(33),G=a(23);t.default=function(){Object(G.c)("attribute-group");var e=Object(b.useLocation)().search,t=E.a.parse(e),a=Object(b.useHistory)(),h=Object(c.useState)(!0),T=Object(l.a)(h,2),O=T[0],j=T[1],N=Object(c.useState)(!1),I=Object(l.a)(N,2),R=I[0],S=I[1],x=i.a.useForm(),L=Object(l.a)(x,1)[0],P=Object(c.useState)({data:[],isLoading:!0}),q=Object(l.a)(P,2),z=q[0],D=q[1];Object(c.useEffect)((function(){t.id&&A.j.query({query:A.c.GET_SINGLE_ATTR_GROUP,variables:{query:{attr_group_id:parseInt(t.id)}},context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleAttrGroup;D({data:a.data,isLoading:!1}),j(a.data.attrgroup_status)})).catch((function(e){console.log(e)}))}));return d.a.createElement(d.a.Fragment,null,d.a.createElement(p.a,{title:t.id?"Manage Group | Edit ".concat(z.isLoading?"":"(".concat(z.data.attr_group_name,")")):"Add Attribute Group"}),d.a.createElement(m.b,null,d.a.createElement(r.a,{gutter:25},d.a.createElement(n.a,{sm:24,xs:24},d.a.createElement(g.a,{headless:!0},t.id&&z.isLoading?d.a.createElement("div",{style:{textAlign:"center"}},d.a.createElement(u.a,{tip:"processing..."})):d.a.createElement(i.a,{style:{width:"100%"},form:L,name:"addRole",onFinish:function(e){var r=e.attr_group_name,n=e.attrgroup_sortorder;if(S(!0),t.id){var o={data:{attr_group_id:parseInt(t.id),attr_group_name:r,attrgroup_sortorder:parseInt(n),attrgroup_status:O}};console.log(o),A.j.mutate({mutation:A.b.UPDATE_ATTR_GROUP,variables:o,refetchQueries:[{query:A.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},["getAllAttrGroups"]],context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(t){var r,n=null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.updateAttrGroup;if(!n.status)return y.b.error(n.message);setTimeout((function(){a.push("/admin/attributes/list-group")}),1e3),y.b.success("".concat(e.attr_group_name," updated successfully"))})).catch((function(e){return console.log("got error on addPermission",e),y.b.error("Something Went wrong !!")})).finally((function(){S(!1)}))}else{var s={data:{attr_group_name:r,attrgroup_sortorder:parseInt(n),attrgroup_status:O}};A.j.mutate({mutation:A.b.CREATE_ATTR_GROUP,variables:s,refetchQueries:[{query:A.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},["getAllAttrGroups"]],context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(t){var r,n=null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.createAttrGroup;if(!n.status)return y.b.error(n.message);setTimeout((function(){a.push("/admin/attributes/list-group")}),1e3),y.b.success("".concat(e.attr_group_name," updated successfully"))})).catch((function(e){return console.log("got error on addPermission",e),y.b.error("Something Went wrong !!")})).finally((function(){S(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},d.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Attribute Group Name"}],name:"attr_group_name",label:"Group Name",initialValue:t.id?z.data.attr_group_name:""},d.a.createElement(s.a,{placeholder:"Enter Attribute Group Name"})),d.a.createElement(i.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"attrgroup_sortorder",label:"Sort order",initialValue:t.id?z.data.attrgroup_sortorder:""},d.a.createElement(s.a,{type:"number",placeholder:"Enter sort order"})),d.a.createElement(i.a.Item,{name:"attrgroup_status",label:"Status"},d.a.createElement(o.a,{checked:O,onChange:function(e){return j(e)}})),d.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},d.a.createElement(i.a.Item,null,d.a.createElement(_.a,{loading:R,size:"default",htmlType:"submit",type:"primary",raised:!0},R?"Processing":"Save"),d.a.createElement(f.b,{to:"/admin/attributes/list-group"},d.a.createElement(_.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
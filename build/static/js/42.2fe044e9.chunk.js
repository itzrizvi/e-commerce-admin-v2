(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[42],{953:function(e,t,a){"use strict";a.r(t);a(129);var r=a(68),n=(a(130),a(47)),o=(a(270),a(159)),i=(a(111),a(32)),s=(a(158),a(95)),u=(a(208),a(39)),l=a(24),c=a(0),d=a.n(c),p=(a(21),a(157)),m=a(132),g=a(131),_=a(128),b=a(58),h=a(11),E=a(210),f=a.n(E),A=a(61),T=a(60),v=a.n(T),y=a(42),G=a(35);t.default=function(){Object(G.b)("attribute-group");var e=Object(b.useLocation)().search,t=f.a.parse(e),a=Object(b.useHistory)(),E=Object(c.useState)(!0),T=Object(l.a)(E,2),O=T[0],j=T[1],N=Object(c.useState)(!1),I=Object(l.a)(N,2),S=I[0],P=I[1],R=u.a.useForm(),x=Object(l.a)(R,1)[0],w=Object(c.useState)({data:[],isLoading:!0}),L=Object(l.a)(w,2),q=L[0],z=L[1];Object(c.useEffect)((function(){t.id&&A.j.query({query:A.c.GET_SINGLE_ATTR_GROUP,variables:{query:{attr_group_id:parseInt(t.id)}},context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleAttrGroup;z({data:a.data,isLoading:!1}),j(a.data.attrgroup_status)})).catch((function(e){console.log(e)}))}),[]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(p.a,{title:t.id?"Manage Group | Edit ".concat(q.isLoading?"":"(".concat(q.data.attr_group_name,")")):"Add Attribute Group"}),d.a.createElement(m.b,null,d.a.createElement(r.a,{gutter:25},d.a.createElement(n.a,{sm:24,xs:24},d.a.createElement(g.a,{headless:!0},t.id&&q.isLoading?d.a.createElement("div",{style:{textAlign:"center"}},d.a.createElement(s.a,{tip:"processing..."})):d.a.createElement(u.a,{style:{width:"100%"},form:x,name:"addRole",onFinish:function(e){var r=e.attr_group_name,n=e.attrgroup_sortorder;if(P(!0),t.id){var o={data:{attr_group_id:parseInt(t.id),attr_group_name:r,attrgroup_sortorder:parseInt(n),attrgroup_status:O}};console.log(o),A.j.mutate({mutation:A.b.UPDATE_ATTR_GROUP,variables:o,refetchQueries:[{query:A.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},"getAllAttrGroups"],context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(t){var r,n=null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.updateAttrGroup;if(!n.status)return y.b.error(n.message);a.push("/admin/attributes/list-group"),y.b.success("".concat(e.attr_group_name," updated successfully")),window.location.reload()})).catch((function(e){return console.log("got error on addPermission",e),y.b.error("Something Went wrong !!")})).finally((function(){P(!1)}))}else{var i={data:{attr_group_name:r,attrgroup_sortorder:parseInt(n),attrgroup_status:O}};A.j.mutate({mutation:A.b.CREATE_ATTR_GROUP,variables:i,refetchQueries:[{query:A.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},"getAllAttrGroups"],context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(t){var r,n=null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.createAttrGroup;if(!n.status)return y.b.error(n.message);a.push("/admin/attributes/list-group"),window.location.reload(),y.b.success("".concat(e.attr_group_name," updated successfully"))})).catch((function(e){return console.log("got error on addPermission",e),y.b.error("Something Went wrong !!")})).finally((function(){P(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},d.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please enter Attribute Group Name"}],name:"attr_group_name",label:"Group Name",initialValue:t.id?q.data.attrgroup_status:""},d.a.createElement(i.a,{placeholder:"Enter Attribute Group Name"})),d.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"attrgroup_sortorder",label:"Sort order",initialValue:t.id?q.data.attrgroup_sortorder:""},d.a.createElement(i.a,{type:"number",placeholder:"Enter sort order"})),d.a.createElement(u.a.Item,{name:"attrgroup_status",label:"Status"},d.a.createElement(o.a,{checked:O,onChange:function(e){return j(e)}})),d.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},d.a.createElement(u.a.Item,null,d.a.createElement(_.a,{loading:S,size:"default",htmlType:"submit",type:"primary",raised:!0},S?"Processing":"Save"),d.a.createElement(h.b,{to:"/admin/attributes/list-group"},d.a.createElement(_.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
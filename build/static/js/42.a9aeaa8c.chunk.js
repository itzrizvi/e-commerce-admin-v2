(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[42],{955:function(e,t,a){"use strict";a.r(t);a(113);var r=a(55),n=(a(114),a(42)),o=(a(214),a(141)),i=(a(84),a(21)),s=(a(133),a(72)),u=(a(163),a(24)),l=a(16),c=a(0),d=a.n(c),p=(a(18),a(103)),m=a(91),g=a(90),_=a(77),b=a(62),h=a(12),E=a(152),f=a.n(E),A=a(37),T=a(65),v=a.n(T),y=a(25),G=a(26);t.default=function(){Object(G.c)("attribute-group");var e=Object(b.useLocation)().search,t=f.a.parse(e),a=Object(b.useHistory)(),E=Object(c.useState)(!0),T=Object(l.a)(E,2),O=T[0],j=T[1],N=Object(c.useState)(!1),I=Object(l.a)(N,2),S=I[0],P=I[1],R=u.a.useForm(),x=Object(l.a)(R,1)[0],w=Object(c.useState)({data:[],isLoading:!0}),L=Object(l.a)(w,2),q=L[0],z=L[1];Object(c.useEffect)((function(){t.id&&A.j.query({query:A.c.GET_SINGLE_ATTR_GROUP,variables:{query:{attr_group_id:parseInt(t.id)}},context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleAttrGroup;z({data:a.data,isLoading:!1}),j(a.data.attrgroup_status)})).catch((function(e){console.log(e)}))}),[]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(p.a,{title:t.id?"Manage Group | Edit ".concat(q.isLoading?"":"(".concat(q.data.attr_group_name,")")):"Add Attribute Group"}),d.a.createElement(m.b,null,d.a.createElement(r.a,{gutter:25},d.a.createElement(n.a,{sm:24,xs:24},d.a.createElement(g.a,{headless:!0},t.id&&q.isLoading?d.a.createElement("div",{style:{textAlign:"center"}},d.a.createElement(s.a,{tip:"processing..."})):d.a.createElement(u.a,{style:{width:"100%"},form:x,name:"addRole",onFinish:function(e){var r=e.attr_group_name,n=e.attrgroup_sortorder;if(P(!0),t.id){var o={data:{attr_group_id:parseInt(t.id),attr_group_name:r,attrgroup_sortorder:parseInt(n),attrgroup_status:O}};console.log(o),A.j.mutate({mutation:A.b.UPDATE_ATTR_GROUP,variables:o,refetchQueries:[{query:A.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},"getAllAttrGroups"],context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(t){var r,n=null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.updateAttrGroup;if(!n.status)return y.b.error(n.message);a.push("/admin/attributes/list-group"),y.b.success("".concat(e.attr_group_name," updated successfully")),window.location.reload()})).catch((function(e){return console.log("got error on addPermission",e),y.b.error("Something Went wrong !!")})).finally((function(){P(!1)}))}else{var i={data:{attr_group_name:r,attrgroup_sortorder:parseInt(n),attrgroup_status:O}};A.j.mutate({mutation:A.b.CREATE_ATTR_GROUP,variables:i,refetchQueries:[{query:A.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}},"getAllAttrGroups"],context:{headers:{TENANTID:"100001",Authorization:v.a.get("psp_t")}}}).then((function(t){var r,n=null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.createAttrGroup;if(!n.status)return y.b.error(n.message);a.push("/admin/attributes/list-group"),window.location.reload(),y.b.success("".concat(e.attr_group_name," updated successfully"))})).catch((function(e){return console.log("got error on addPermission",e),y.b.error("Something Went wrong !!")})).finally((function(){P(!1)}))}},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},d.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please enter Attribute Group Name"}],name:"attr_group_name",label:"Group Name",initialValue:t.id?q.data.attrgroup_status:""},d.a.createElement(i.a,{placeholder:"Enter Attribute Group Name"})),d.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please enter Role Name"}],name:"attrgroup_sortorder",label:"Sort order",initialValue:t.id?q.data.attrgroup_sortorder:""},d.a.createElement(i.a,{type:"number",placeholder:"Enter sort order"})),d.a.createElement(u.a.Item,{name:"attrgroup_status",label:"Status"},d.a.createElement(o.a,{checked:O,onChange:function(e){return j(e)}})),d.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},d.a.createElement(u.a.Item,null,d.a.createElement(_.a,{loading:S,size:"default",htmlType:"submit",type:"primary",raised:!0},S?"Processing":"Save"),d.a.createElement(h.b,{to:"/admin/attributes/list-group"},d.a.createElement(_.a,{type:"white",size:"large"},"Cancel"))))))))))}}}]);
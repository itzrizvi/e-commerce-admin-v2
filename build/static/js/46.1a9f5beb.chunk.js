(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[46],{956:function(t,e,a){"use strict";a.r(e);a(100);var r=a(50),n=(a(101),a(40)),o=(a(102),a(54)),u=(a(74),a(17)),s=(a(121),a(69)),l=(a(200),a(127)),i=a(7),c=a(14),d=a(0),m=a.n(d),p=a(18),g=a.n(p),b=a(193),_=a(81),f=a(77),v=a(76),E=a(72),h=a(11),O=a(103),j=a.n(O),A=a(29),y=a(65),S=a.n(y),T=a(26),x=a(25);e.default=function(){Object(x.c)("attribute-group");var t=Object(d.useState)({data:[],isLoading:!0}),e=Object(c.a)(t,2),a=e[0],p=e[1],O=Object(d.useState)([]),y=Object(c.a)(O,2),N=y[0],w=y[1],C=Object(d.useState)(""),k=Object(c.a)(C,2),G=k[0],I=k[1];Object(d.useEffect)((function(){A.j.query({query:A.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getAllAttrGroups;(null===a||void 0===a?void 0:a.status)&&p((function(t){return Object(i.a)(Object(i.a)({},t),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(t){p((function(t){return Object(i.a)(Object(i.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){p((function(t){return Object(i.a)(Object(i.a)({},t),{},{isLoading:!1})}))}))}),[]);var L=[{title:"Group Name",dataIndex:"attr_group_name",key:"attr_group_name",sorter:function(t,e){return t.attr_group_name.toUpperCase()>e.attr_group_name.toUpperCase()?1:-1}},{title:"Sort Order",dataIndex:"attrgroup_sortorder",key:"attrgroup_sortorder",sorter:function(t,e){return t.attrgroup_sortorder===e.attrgroup_sortorder?0:t.attrgroup_sortorder?-1:1}},{title:"Status",dataIndex:"attrgroup_status",key:"attrgroup_status",align:"right",sorter:function(t,e){return t.attrgroup_status===e.attrgroup_status?0:t.attrgroup_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(t,e){return e.attrgroup_status===t},render:function(t,e){return m.a.createElement(l.a,{defaultChecked:t,title:"Status",onChange:function(t){return P(e,t)}})}},{title:"Action",dataIndex:"id",key:"id",width:70,align:"right",render:function(t,e){return m.a.createElement(m.a.Fragment,null,m.a.createElement(h.b,{to:"/admin/attributes/add-group?id=".concat(t)},m.a.createElement(j.a,{name:"edit",style:{margin:".5em 1em"}})))}}],P=function(t,e){var a={data:{attr_group_id:t.id,attrgroup_status:e}};console.log(a),A.j.mutate({mutation:A.b.UPDATE_ATTR_GROUP,variables:a,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(e){var a,r=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateAttrGroup;if(!r.status)return T.b.error(r.message);T.b.success("".concat(t.attr_group_name," status updated successfully"))})).catch((function(t){return console.log("got error on status update",t),T.b.error("Something Went wrong !!")}))};return m.a.createElement(m.a.Fragment,null,m.a.createElement(_.a,{title:"Attribute Groups",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(h.b,{to:"/admin/attributes/add-group"},m.a.createElement(E.a,{size:"small",title:"Add Attribute Group",type:"primary"},m.a.createElement(g.a,{icon:"file-plus"}))))]}),m.a.createElement(f.b,null,m.a.createElement(r.a,{gutter:25},m.a.createElement(n.a,{sm:24,xs:24},m.a.createElement(v.a,{headless:!0},a.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(s.a,null)):m.a.createElement(m.a.Fragment,null,m.a.createElement(u.a,{placeholder:"Search Permission...",prefix:m.a.createElement(b.a,null),onChange:function(t){var e=t.target.value;I(e),w(a.data.filter((function(t){return null===t||void 0===t?void 0:t.g_n.toLowerCase().includes(e.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(o.a,{className:"table-responsive",columns:L,rowKey:"g_s",size:"small",dataSource:G?N:a.data,rowClassName:function(t,e){return e%2==0?"":"altTableClass"}}))))))))}}}]);
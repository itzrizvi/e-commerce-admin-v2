(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[65],{978:function(t,e,a){"use strict";a.r(e);a(140);var r=a(65),n=(a(141),a(50)),o=(a(131),a(69)),u=(a(113),a(38)),s=(a(130),a(72)),l=(a(295),a(212)),i=a(7),c=a(14),d=a(0),p=a.n(d),m=a(19),g=a.n(m),_=a(190),b=a(118),f=a(99),v=a(97),E=a(98),h=a(12),A=a(101),O=a.n(A),j=a(28),y=a(70),S=a.n(y),T=a(33),x=a(23);e.default=function(){Object(x.c)("attribute-group");var t=Object(d.useState)({data:[],isLoading:!0}),e=Object(c.a)(t,2),a=e[0],m=e[1],A=Object(d.useState)([]),y=Object(c.a)(A,2),N=y[0],w=y[1],C=Object(d.useState)(""),G=Object(c.a)(C,2),k=G[0],I=G[1];Object(d.useEffect)((function(){j.j.query({query:j.c.GET_ALL_ATTR_GROUPS,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getAllAttrGroups;(null===a||void 0===a?void 0:a.status)&&m((function(t){return Object(i.a)(Object(i.a)({},t),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(t){m((function(t){return Object(i.a)(Object(i.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){m((function(t){return Object(i.a)(Object(i.a)({},t),{},{isLoading:!1})}))}))}),[]);var L=[{title:"Group Name",dataIndex:"attr_group_name",key:"attr_group_name",sorter:function(t,e){return t.attr_group_name.toUpperCase()>e.attr_group_name.toUpperCase()?1:-1}},{title:"Sort Order",dataIndex:"attrgroup_sortorder",key:"attrgroup_sortorder",sorter:function(t,e){return t.attrgroup_sortorder===e.attrgroup_sortorder?0:t.attrgroup_sortorder?-1:1}},{title:"Status",dataIndex:"attrgroup_status",key:"attrgroup_status",align:"right",sorter:function(t,e){return t.attrgroup_status===e.attrgroup_status?0:t.attrgroup_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(t,e){return e.attrgroup_status===t},render:function(t,e){return p.a.createElement(l.a,{defaultChecked:t,title:"Status",onChange:function(t){return U(e,t)}})}},{title:"Action",dataIndex:"id",key:"id",width:70,align:"right",render:function(t,e){return p.a.createElement(p.a.Fragment,null,p.a.createElement(h.b,{to:"/admin/attributes/add-group?id=".concat(t)},p.a.createElement(O.a,{name:"edit",style:{margin:".5em 1em"}})))}}],U=function(t,e){var a={data:{attr_group_id:t.id,attrgroup_status:e}};console.log(a),j.j.mutate({mutation:j.b.UPDATE_ATTR_GROUP,variables:a,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(e){var a,r=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateAttrGroup;if(!r.status)return T.b.error(r.message);T.b.success("".concat(t.attr_group_name," status updated successfully"))})).catch((function(t){return console.log("got error on status update",t),T.b.error("Something Went wrong !!")}))};return p.a.createElement(p.a.Fragment,null,p.a.createElement(b.a,{title:"Attribute Groups",buttons:[p.a.createElement("div",{key:"1",className:"page-header-actions"},p.a.createElement(h.b,{to:"/admin/attributes/add-group"},p.a.createElement(E.a,{size:"small",title:"Add Attribute Group",type:"primary"},p.a.createElement(g.a,{icon:"file-plus"}))))]}),p.a.createElement(f.b,null,p.a.createElement(r.a,{gutter:25},p.a.createElement(n.a,{sm:24,xs:24},p.a.createElement(v.a,{headless:!0},a.isLoading?p.a.createElement("div",{className:"spin"},p.a.createElement(s.a,null)):p.a.createElement(p.a.Fragment,null,p.a.createElement(u.a,{placeholder:"Search Attribute Groups...",prefix:p.a.createElement(_.a,null),onChange:function(t){var e=t.target.value;I(e),w(a.data.filter((function(t){return null===t||void 0===t?void 0:t.g_n.toLowerCase().includes(e.toLowerCase())})))}}),p.a.createElement("br",null),p.a.createElement("br",null),p.a.createElement("span",{className:"psp_list"},p.a.createElement(o.a,{className:"table-responsive",columns:L,rowKey:"g_s",size:"small",dataSource:k?N:a.data,rowClassName:function(t,e){return e%2===0?"":"altTableClass"}}))))))))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[45],{950:function(t,e,a){"use strict";a.r(e);a(128);var r=a(68),n=(a(129),a(47)),u=(a(194),a(88)),i=(a(110),a(30)),o=(a(193),a(111)),l=a(11),s=(a(271),a(157)),c=a(22),d=a(89),m=a(0),b=a.n(m),p=a(21),_=a.n(p),g=a(185),v=a(156),f=a(131),E=a(130),h=a(192),A=a(12),j=a(121),O=a.n(j),y=a(49),T=a(52),S=a.n(T),C=a(37),x=a(35);e.default=function(){Object(x.b)("attribute");var t=Object(d.a)(Array(6).keys()).map((function(t){return{a_n:"Attribute ".concat(t+1),a_g:"Group 2",g_s:t+1}})),e=Object(m.useState)({data:t,isLoading:!0}),a=Object(c.a)(e,2),p=a[0],j=a[1],T=Object(m.useState)([]),N=Object(c.a)(T,2),k=N[0],w=N[1],I=Object(m.useState)(""),L=Object(c.a)(I,2),U=L[0],P=L[1],z=[{title:"Attribute Name",dataIndex:"attribute_name",key:"attribute_name",sorter:function(t,e){return t.attribute_name.toUpperCase()>e.attribute_name.toUpperCase()?1:-1}},{title:"Attribute Group",dataIndex:"attribute_group.attr_group_name",key:"attribute_group.attr_group_name",sorter:function(t,e){return t.attribute_group.attr_group_name.toUpperCase()>e.attribute_group.attr_group_name.toUpperCase()?1:-1},render:function(t,e){var a;return null===e||void 0===e||null===(a=e.attribute_group)||void 0===a?void 0:a.attr_group_name}},{title:"Status",dataIndex:"attribute_status",key:"attribute_status",align:"right",sorter:function(t,e){return t.attribute_status===e.attribute_status?0:t.attribute_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(t,e){return e.attribute_status===t},render:function(t,e){return b.a.createElement(s.a,{defaultChecked:t,title:"Status",onChange:function(t){return F(e,t)}})}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(t,e){return b.a.createElement(b.a.Fragment,null,b.a.createElement(A.b,{to:"/admin/attributes/add?id=".concat(e.id)},b.a.createElement(O.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];Object(m.useEffect)((function(){y.j.query({query:y.c.GET_ALL_ATTRIBUTES,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getAllAttributes;(null===a||void 0===a?void 0:a.status)&&j((function(t){return Object(l.a)(Object(l.a)({},t),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(t){j((function(t){return Object(l.a)(Object(l.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){j((function(t){return Object(l.a)(Object(l.a)({},t),{},{isLoading:!1})}))}))}),[]);var F=function(t,e){var a={data:{attribute_id:t.id,attribute_status:e}};console.log(a),y.j.mutate({mutation:y.b.UPDATE_ATTRIBUTE,variables:a,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(e){var a,r=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateAttribute;if(!r.status)return C.b.error(r.message);C.b.success("".concat(t.attribute_name," attribute status updated."))})).catch((function(t){return console.log("got error on addPermission",t),C.b.error("Something Went wrong !!")}))};return b.a.createElement(b.a.Fragment,null,b.a.createElement(v.a,{title:"Attributes",buttons:[b.a.createElement("div",{key:"1",className:"page-header-actions"},b.a.createElement(A.b,{to:"/admin/attributes/add"},b.a.createElement(h.a,{size:"small",title:"Add Attribute",type:"primary"},b.a.createElement(_.a,{icon:"file-plus"}))))]}),b.a.createElement(f.b,null,b.a.createElement(r.a,{gutter:25},b.a.createElement(n.a,{sm:24,xs:24},b.a.createElement(E.a,{headless:!0},p.isLoading?b.a.createElement("div",{className:"spin"},b.a.createElement(o.a,null)):b.a.createElement(b.a.Fragment,null,b.a.createElement(i.a,{placeholder:"Search Permission...",prefix:b.a.createElement(g.a,null),onChange:function(t){var e=t.target.value;P(e),w(p.data.filter((function(t){var a;return((null===t||void 0===t?void 0:t.attribute_name)+(null===t||void 0===t||null===(a=t.attribute_group)||void 0===a?void 0:a.attr_group_name)).toLowerCase().includes(e.toLowerCase())})))}}),b.a.createElement("br",null),b.a.createElement("br",null),b.a.createElement("span",{className:"psp_list"},b.a.createElement(u.a,{className:"table-responsive",columns:z,rowKey:"g_s",size:"small",dataSource:U?k:p.data,rowClassName:function(t,e){return e%2==0?"":"altTableClass"}}))))))))}}}]);
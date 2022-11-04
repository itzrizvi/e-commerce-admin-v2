(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[25],{629:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a,r,o,i,c=n(10),d=n(20),u={CONDITION_ADD:Object(d.d)(a||(a=Object(c.a)(["\n    mutation addProductCondition($name: String!){\n        addProductCondition(data: { name: $name }) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),CONDITION_UPDATE:Object(d.d)(r||(r=Object(c.a)(["\n    mutation updateProductCondition($data: UpdateProductConditionInput){\n        updateProductCondition(data: $data) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),GET_ALL_CONDITION:Object(d.d)(o||(o=Object(c.a)(["\n    query getAllProductCondition{\n        getAllProductCondition {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n    }"]))),GET_SINGLE_CONDITION:Object(d.d)(i||(i=Object(c.a)(["\n    query getSingleProductCondition($query: GetSingleProductConditionInput){\n        getSingleProductCondition(query: $query) {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n  }"])))}},894:function(e,t,n){"use strict";n.r(t);n(126);var a=n(67),r=(n(127),n(45)),o=(n(188),n(94)),i=(n(109),n(31)),c=(n(187),n(110)),d=n(12),u=n(26),l=n(0),s=n.n(l),m=n(21),g=n.n(m),p=n(151),O=n(129),b=n(128),E=n(186),C=n(11),f=n(118),j=n.n(f),v=n(181),N=n(130),I=n(33),P=n(293),h=n.n(P),A=n(141),y=n(629),T=n(47);t.default=function(){Object(I.b)("product-condition");var e=Object(l.useState)({data:[],isLoading:!0}),t=Object(u.a)(e,2),n=t[0],m=t[1],f=Object(T.d)((function(e){return e.auth.token})),P=Object(l.useState)([]),D=Object(u.a)(P,2),S=D[0],_=D[1],w=Object(l.useState)(""),L=Object(u.a)(w,2),k=L[0],x=L[1],q=[{title:"Name",dataIndex:"name",key:"name",sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Alias",dataIndex:"slug",key:"slug",sorter:function(e,t){return e.slug.toUpperCase()>t.slug.toUpperCase()?1:-1}},{title:"Date",dataIndex:"createdAt",key:"createdAt",width:120,align:"center",render:function(e,t){return s.a.createElement("span",{className:"status-text"},s.a.createElement(h.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(e,t){return s.a.createElement(s.a.Fragment,null,s.a.createElement(C.b,{to:"/admin/product-condition/update?id=".concat(t.id)},s.a.createElement(j.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"slug"}];Object(l.useEffect)((function(){A.b.query({query:y.a.GET_ALL_CONDITION,context:{headers:{TENANTID:"100001",Authorization:f}}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllProductCondition;(null===n||void 0===n?void 0:n.status)&&m((function(e){return Object(d.a)(Object(d.a)({},e),{},{data:null===n||void 0===n?void 0:n.data,error:""})}))})).catch((function(e){m((function(e){return Object(d.a)(Object(d.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){m((function(e){return Object(d.a)(Object(d.a)({},e),{},{isLoading:!1})}))}))}),[]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(p.a,{title:"Product Condition",buttons:[s.a.createElement("div",{key:"1",className:"page-header-actions"},s.a.createElement(C.b,{to:"/admin/product-condition/add"},s.a.createElement(E.a,{size:"small",title:"Add Product Condition",type:"primary"},s.a.createElement(g.a,{icon:"user-plus"}))))]}),s.a.createElement(O.b,null,s.a.createElement(a.a,{gutter:25},s.a.createElement(r.a,{sm:24,xs:24},s.a.createElement(b.a,{headless:!0},n.isLoading?s.a.createElement("div",{className:"spin"},s.a.createElement(c.a,null)):s.a.createElement(s.a.Fragment,null,s.a.createElement(i.a,{placeholder:"Search Product Condition...",prefix:s.a.createElement(v.a,null),onChange:function(e){var t=e.target.value;x(t),_(n.data.filter((function(e){return((null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.slug)).toLowerCase().includes(t.toLowerCase())})))}}),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("span",{className:"psp_list"},s.a.createElement(o.a,{className:"table-responsive",columns:q,rowKey:"id",size:"small",dataSource:k?S:n.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:N.a.PRODUCT_CONDITION_PER_PAGE,total:k?S.length:n.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
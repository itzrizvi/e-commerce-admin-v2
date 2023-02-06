(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[53],{664:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a,r,i,o,d=n(8),c=n(16),u={CONDITION_ADD:Object(c.d)(a||(a=Object(d.a)(["\n    mutation addProductCondition($name: String!){\n        addProductCondition(data: { name: $name }) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),CONDITION_UPDATE:Object(c.d)(r||(r=Object(d.a)(["\n    mutation updateProductCondition($data: UpdateProductConditionInput){\n        updateProductCondition(data: $data) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),GET_ALL_CONDITION:Object(c.d)(i||(i=Object(d.a)(["\n    query getAllProductCondition{\n        getAllProductCondition {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n    }"]))),GET_SINGLE_CONDITION:Object(c.d)(o||(o=Object(d.a)(["\n    query getSingleProductCondition($query: GetSingleProductConditionInput){\n        getSingleProductCondition(query: $query) {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n  }"])))}},970:function(e,t,n){"use strict";n.r(t);n(200);var a=n(97),r=(n(201),n(74)),i=(n(150),n(77)),o=(n(148),n(45)),d=(n(166),n(98)),c=n(9),u=n(23),l=n(0),s=n.n(l),m=n(21),p=n.n(m),g=n(217),O=n(165),b=n(164),E=n(287),C=n(12),f=n(126),j=n.n(f),v=n(192),N=n(135),I=n(22),A=n(219),P=n.n(A),h=n(99),_=n(664),y=n(50),T=n(76);t.default=function(){Object(I.f)("product-condition");var e=Object(l.useState)({data:[],isLoading:!0}),t=Object(u.a)(e,2),n=t[0],m=t[1],f=Object(y.d)((function(e){return e.auth.token})),A=Object(l.useState)([]),D=Object(u.a)(A,2),S=D[0],L=D[1],w=Object(l.useState)(""),k=Object(u.a)(w,2),x=k[0],q=k[1],U=[{title:"Name",dataIndex:"name",key:"name",sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Alias",dataIndex:"slug",key:"slug",sorter:function(e,t){return e.slug.toUpperCase()>t.slug.toUpperCase()?1:-1}},{title:"Date",dataIndex:"createdAt",key:"createdAt",width:120,align:"center",render:function(e,t){return s.a.createElement("span",{className:"status-text"},s.a.createElement(P.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(e,t){return s.a.createElement(s.a.Fragment,null,s.a.createElement(C.b,{to:"/admin/product-condition/update?id=".concat(t.id)},s.a.createElement(j.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"slug"}];Object(l.useEffect)((function(){h.b.query({query:_.a.GET_ALL_CONDITION,context:{headers:{TENANTID:"100001",Authorization:f}}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllProductCondition;if(!(null===n||void 0===n?void 0:n.status))return Object(T.a)();m((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===n||void 0===n?void 0:n.data,error:""})}))})).finally((function(){m((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(g.a,{title:"Product Condition",buttons:[s.a.createElement("div",{key:"1",className:"page-header-actions"},s.a.createElement(C.b,{to:"/admin/product-condition/add"},s.a.createElement(E.a,{size:"small",title:"Add Product Condition",type:"primary"},s.a.createElement(p.a,{icon:"user-plus"}))))]}),s.a.createElement(O.b,null,s.a.createElement(a.a,{gutter:25},s.a.createElement(r.a,{sm:24,xs:24},s.a.createElement(b.a,{headless:!0},n.isLoading?s.a.createElement("div",{className:"spin"},s.a.createElement(d.a,null)):s.a.createElement(s.a.Fragment,null,s.a.createElement(o.a,{placeholder:"Search Product Condition...",prefix:s.a.createElement(v.a,null),onChange:function(e){var t=e.target.value;q(t),L(n.data.filter((function(e){return((null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.slug)).toLowerCase().includes(t.toLowerCase())})))}}),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("span",{className:"psp_list"},s.a.createElement(i.a,{className:"table-responsive",columns:U,rowKey:"id",size:"small",dataSource:x?S:n.data,rowClassName:function(e,t){return t%2===0?"":"altTableClass"},pagination:{defaultPageSize:N.a.PRODUCT_CONDITION_PER_PAGE,total:x?S.length:n.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
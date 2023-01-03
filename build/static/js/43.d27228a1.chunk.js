(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[43],{1006:function(t,e,a){"use strict";a.r(e);a(143);var n=a(68),i=(a(144),a(52)),l=(a(133),a(71)),r=(a(115),a(39)),u=(a(132),a(74)),c=a(7),s=a(14),d=a(0),o=a.n(d),m=a(19),A=a.n(m),b=a(120),p=a(101),g=a(99),v=a(100),S=a(12),y=a(103),E=a.n(y),f=a(195),I=a(122),T=a(23),O=a(218),_=a.n(O),j=a(102),L=a(47),h=a(641);e.default=function(){Object(T.c)("product-availability-status");var t=Object(d.useState)({data:[],isLoading:!0}),e=Object(s.a)(t,2),a=e[0],m=e[1],y=Object(L.d)((function(t){return t.auth.token})),O=Object(d.useState)([]),P=Object(s.a)(O,2),U=P[0],w=P[1],C=Object(d.useState)(""),N=Object(s.a)(C,2),Y=N[0],k=N[1],x=[{title:"Name",dataIndex:"name",key:"name",sorter:function(t,e){return t.name.toUpperCase()>e.name.toUpperCase()?1:-1}},{title:"Alias",dataIndex:"slug",key:"slug",sorter:function(t,e){return t.slug.toUpperCase()>e.slug.toUpperCase()?1:-1}},{title:"Date",dataIndex:"createdAt",key:"createdAt",width:120,align:"center",render:function(t,e){return o.a.createElement("span",{className:"status-text"},o.a.createElement(_.a,{format:"DD MMMM YYYY"},parseInt(t)))}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(t,e){return o.a.createElement(o.a.Fragment,null,o.a.createElement(S.b,{to:"/admin/product-availability-status/update?id=".concat(e.id)},o.a.createElement(E.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"slug"}];Object(d.useEffect)((function(){j.b.query({query:h.a.GET_ALL_AVAILABILITY_STATUS,context:{headers:{TENANTID:"100001",Authorization:y}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getAllProductAvailabilityStatus;(null===a||void 0===a?void 0:a.status)&&m((function(t){return Object(c.a)(Object(c.a)({},t),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(t){m((function(t){return Object(c.a)(Object(c.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){m((function(t){return Object(c.a)(Object(c.a)({},t),{},{isLoading:!1})}))}))}));return o.a.createElement(o.a.Fragment,null,o.a.createElement(b.a,{title:"Product Availability Status",buttons:[o.a.createElement("div",{key:"1",className:"page-header-actions"},o.a.createElement(S.b,{to:"/admin/product-availability-status/add"},o.a.createElement(v.a,{size:"small",title:"Add Product Availability Status",type:"primary"},o.a.createElement(A.a,{icon:"user-plus"}))))]}),o.a.createElement(p.b,null,o.a.createElement(n.a,{gutter:25},o.a.createElement(i.a,{sm:24,xs:24},o.a.createElement(g.a,{headless:!0},a.isLoading?o.a.createElement("div",{className:"spin"},o.a.createElement(u.a,null)):o.a.createElement(o.a.Fragment,null,o.a.createElement(r.a,{placeholder:"Search Product Availability Status...",prefix:o.a.createElement(f.a,null),onChange:function(t){var e=t.target.value;k(e),w(a.data.filter((function(t){return((null===t||void 0===t?void 0:t.name)+(null===t||void 0===t?void 0:t.slug)).toLowerCase().includes(e.toLowerCase())})))}}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("span",{className:"psp_list"},o.a.createElement(l.a,{className:"table-responsive",columns:x,rowKey:"id",size:"small",dataSource:Y?U:a.data,rowClassName:function(t,e){return e%2===0?"":"altTableClass"},pagination:{defaultPageSize:I.a.PRODUCT_AVAILABILITY_STATUS_PER_PAGE,total:Y?U.length:a.data.length,showTotal:function(t,e){return"".concat(e[0],"-").concat(e[1]," of ").concat(t," items")}}}))))))))}},641:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var n,i,l,r,u=a(8),c=a(17),s={AVAILABILITY_STATUS_ADD:Object(c.d)(n||(n=Object(u.a)(["\n    mutation addProductAvailabilityStatus($name: String!){\n        addProductAvailabilityStatus(data: { name: $name }) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),AVAILABILITY_STATUS_UPDATE:Object(c.d)(i||(i=Object(u.a)(["\n    mutation updateProductAvailabilityStatus($data: UpdateProductAvailabilityStatusInput){\n        updateProductAvailabilityStatus(data: $data) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),GET_ALL_AVAILABILITY_STATUS:Object(c.d)(l||(l=Object(u.a)(["\n    query getAllProductAvailabilityStatus{\n        getAllProductAvailabilityStatus {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n    }"]))),GET_SINGLE_AVAILABILITY_STATUS:Object(c.d)(r||(r=Object(u.a)(["\n    query getSingleProductAvailabilityStatus($query : GetSingleProductAvailabilityStatusInput){\n        getSingleProductAvailabilityStatus(query: $query) {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n  }"])))}}}]);
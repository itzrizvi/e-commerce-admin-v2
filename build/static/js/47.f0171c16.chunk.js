(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[47],{1021:function(t,a,e){"use strict";e.r(a);e(132);var n=e(63),i=(e(133),e(47)),l=(e(119),e(43)),u=(e(134),e(73)),r=e(8),d=(e(200),e(27)),o=e(14),s=e(0),c=e.n(s),A=e(120),m=e(101),v=e(100),b=e(99),S=e(59),y=e(10),g=e(48),T=e(32),f=e(168),p=e.n(f),I=e(102),E=e(23),h=e(650);a.default=function(){var t,a;Object(E.c)("product-availability-status");var e=Object(S.useLocation)().search,f=p.a.parse(e),j=Object(S.useHistory)(),L=Object(g.d)((function(t){return t.auth.token})),O=Object(s.useState)(!1),_=Object(o.a)(O,2),P=_[0],N=_[1],q=Object(s.useState)({data:[],isLoading:!0}),U=Object(o.a)(q,2),x=U[0],V=U[1],B=d.a.useForm(),D=Object(o.a)(B,1)[0];Object(s.useEffect)((function(){f.id&&I.b.query({query:h.a.GET_SINGLE_AVAILABILITY_STATUS,variables:{query:{id:parseInt(null===f||void 0===f?void 0:f.id)}},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(t){var a,e,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.getSingleProductAvailabilityStatus;(null===n||void 0===n?void 0:n.status)&&(V((function(t){return Object(r.a)(Object(r.a)({},t),{},{data:null===n||void 0===n?void 0:n.data,error:""})})),D.setFieldsValue({name:null===n||void 0===n||null===(e=n.data)||void 0===e?void 0:e.name}))})).catch((function(t){V((function(t){return Object(r.a)(Object(r.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){V((function(t){return Object(r.a)(Object(r.a)({},t),{},{isLoading:!1})}))}))}),[]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(A.a,{title:"Manage Product Availability Status | Edit Product Availability Status ".concat((null===x||void 0===x||null===(t=x.data)||void 0===t?void 0:t.name)?"(".concat(null===x||void 0===x||null===(a=x.data)||void 0===a?void 0:a.name,")"):"")}),c.a.createElement(m.b,null,c.a.createElement(n.a,{gutter:25},c.a.createElement(i.a,{sm:24,xs:24},c.a.createElement(v.a,{headless:!0},(null===x||void 0===x?void 0:x.isLoading)?c.a.createElement("div",{style:{textAlign:"center"}},c.a.createElement(u.a,{tip:"processing..."})):c.a.createElement(d.a,{style:{width:"100%"},form:D,name:"addProductAvailabilityStatus",onFinish:function(t){N(!0),I.b.mutate({mutation:h.a.AVAILABILITY_STATUS_UPDATE,variables:{data:{name:t.name,id:parseInt(null===f||void 0===f?void 0:f.id)}},refetchQueries:[{query:h.a.GET_ALL_AVAILABILITY_STATUS,context:{headers:{TENANTID:"100001",Authorization:L}}},["getAllProductAvailabilityStatus"]],context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(t){var a,e=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateProductAvailabilityStatus;if(!(null===e||void 0===e?void 0:e.status))return T.b.error("Something Went wrong !!");setTimeout((function(){j.push("/admin/product-availability-status/list")}),1e3),T.b.success(null===e||void 0===e?void 0:e.message)})).catch((function(t){T.b.error("Something Went wrong !!")})).finally((function(){return N(!1)}))},onFinishFailed:function(t){return console.log("form error info:\n",t)},labelCol:{span:4}},c.a.createElement(d.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Product Availability Status Name"}],name:"name",label:"Name"},c.a.createElement(l.a,{placeholder:"Enter Product Availability Status Name"})),c.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},c.a.createElement(d.a.Item,null,c.a.createElement(b.a,{loading:P,size:"default",htmlType:"submit",type:"primary",raised:!0},P?"Processing":"Save"),c.a.createElement(y.b,{to:"/admin/product-availability-status/list"},c.a.createElement(b.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},650:function(t,a,e){"use strict";e.d(a,"a",(function(){return o}));var n,i,l,u,r=e(7),d=e(17),o={AVAILABILITY_STATUS_ADD:Object(d.d)(n||(n=Object(r.a)(["\n    mutation addProductAvailabilityStatus($name: String!){\n        addProductAvailabilityStatus(data: { name: $name }) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),AVAILABILITY_STATUS_UPDATE:Object(d.d)(i||(i=Object(r.a)(["\n    mutation updateProductAvailabilityStatus($data: UpdateProductAvailabilityStatusInput){\n        updateProductAvailabilityStatus(data: $data) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),GET_ALL_AVAILABILITY_STATUS:Object(d.d)(l||(l=Object(r.a)(["\n    query getAllProductAvailabilityStatus{\n        getAllProductAvailabilityStatus {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n    }"]))),GET_SINGLE_AVAILABILITY_STATUS:Object(d.d)(u||(u=Object(r.a)(["\n    query getSingleProductAvailabilityStatus($query : GetSingleProductAvailabilityStatusInput){\n        getSingleProductAvailabilityStatus(query: $query) {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n  }"])))}}}]);
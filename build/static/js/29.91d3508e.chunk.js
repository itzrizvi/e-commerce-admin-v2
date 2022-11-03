(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[29],{629:function(t,a,e){"use strict";e.d(a,"a",(function(){return o}));var n,i,l,u,r=e(10),d=e(20),o={AVAILABILITY_STATUS_ADD:Object(d.d)(n||(n=Object(r.a)(["\n    mutation addProductAvailabilityStatus($name: String!){\n        addProductAvailabilityStatus(data: { name: $name }) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),AVAILABILITY_STATUS_UPDATE:Object(d.d)(i||(i=Object(r.a)(["\n    mutation updateProductAvailabilityStatus($data: UpdateProductAvailabilityStatusInput){\n        updateProductAvailabilityStatus(data: $data) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),GET_ALL_AVAILABILITY_STATUS:Object(d.d)(l||(l=Object(r.a)(["\n    query getAllProductAvailabilityStatus{\n        getAllProductAvailabilityStatus {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n    }"]))),GET_SINGLE_AVAILABILITY_STATUS:Object(d.d)(u||(u=Object(r.a)(["\n    query getSingleProductAvailabilityStatus($query : GetSingleProductAvailabilityStatusInput){\n        getSingleProductAvailabilityStatus(query: $query) {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n  }"])))}},900:function(t,a,e){"use strict";e.r(a);e(134);var n=e(68),i=(e(135),e(46)),l=(e(123),e(37)),u=(e(199),e(124)),r=e(12),d=(e(282),e(63)),o=e(31),s=e(0),c=e.n(s),A=e(147),v=e(146),m=e(145),b=e(179),S=e(56),y=e(11),g=e(48),T=e(53),f=e(201),I=e.n(f),p=e(284),E=e(35),h=e(629);a.default=function(){var t,a;Object(E.b)("product-availability-status");var e=Object(S.useLocation)().search,f=I.a.parse(e),j=Object(S.useHistory)(),L=Object(g.d)((function(t){return t.auth.token})),O=Object(s.useState)(!1),P=Object(o.a)(O,2),_=P[0],N=P[1],q=Object(s.useState)({data:[],isLoading:!0}),U=Object(o.a)(q,2),w=U[0],x=U[1],V=d.a.useForm(),B=Object(o.a)(V,1)[0];Object(s.useEffect)((function(){f.id&&p.b.query({query:h.a.GET_SINGLE_AVAILABILITY_STATUS,variables:{query:{id:parseInt(null===f||void 0===f?void 0:f.id)}},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(t){var a,e,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.getSingleProductAvailabilityStatus;(null===n||void 0===n?void 0:n.status)&&(x((function(t){return Object(r.a)(Object(r.a)({},t),{},{data:null===n||void 0===n?void 0:n.data,error:""})})),B.setFieldsValue({name:null===n||void 0===n||null===(e=n.data)||void 0===e?void 0:e.name}))})).catch((function(t){x((function(t){return Object(r.a)(Object(r.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){x((function(t){return Object(r.a)(Object(r.a)({},t),{},{isLoading:!1})}))}))}),[]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(A.a,{title:"Manage Product Availability Status | Edit Product Availability Status ".concat((null===w||void 0===w||null===(t=w.data)||void 0===t?void 0:t.name)?"(".concat(null===w||void 0===w||null===(a=w.data)||void 0===a?void 0:a.name,")"):"")}),c.a.createElement(v.b,null,c.a.createElement(n.a,{gutter:25},c.a.createElement(i.a,{sm:24,xs:24},c.a.createElement(m.a,{headless:!0},(null===w||void 0===w?void 0:w.isLoading)?c.a.createElement("div",{style:{textAlign:"center"}},c.a.createElement(u.a,{tip:"processing..."})):c.a.createElement(d.a,{style:{width:"100%"},form:B,name:"addProductAvailabilityStatus",onFinish:function(t){N(!0),p.b.mutate({mutation:h.a.AVAILABILITY_STATUS_UPDATE,variables:{data:{name:t.name,id:parseInt(null===f||void 0===f?void 0:f.id)}},refetchQueries:[{query:h.a.GET_ALL_AVAILABILITY_STATUS,context:{headers:{TENANTID:"100001",Authorization:L}}},"getAllProductAvailabilityStatus"],context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(t){var a,e=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateProductAvailabilityStatus;if(!(null===e||void 0===e?void 0:e.status))return T.b.error("Something Went wrong !!");j.push("/admin/product-availability-status/list"),T.b.success(null===e||void 0===e?void 0:e.message),window.location.reload()})).catch((function(t){T.b.error("Something Went wrong !!")})).finally((function(){return N(!1)}))},onFinishFailed:function(t){return console.log("form error info:\n",t)},labelCol:{span:4}},c.a.createElement(d.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Product Availability Status Name"}],name:"name",label:"Name"},c.a.createElement(l.a,{placeholder:"Enter Product Availability Status Name"})),c.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},c.a.createElement(d.a.Item,null,c.a.createElement(b.a,{loading:_,size:"default",htmlType:"submit",type:"primary",raised:!0},_?"Processing":"Save"),c.a.createElement(y.b,{to:"/admin/product-availability-status/list"},c.a.createElement(b.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[45],{1025:function(t,e,a){"use strict";a.r(e);a(131);var n=a(63),i=(a(132),a(47)),l=(a(119),a(41)),u=(a(200),a(27)),r=a(15),s=a(0),d=a.n(s),c=a(120),o=a(101),A=a(100),m=a(99),b=a(59),S=a(10),y=a(48),v=a(31),g=a(102),T=a(23),p=a(651);e.default=function(){Object(T.c)("product-availability-status");var t=Object(b.useHistory)(),e=Object(y.d)((function(t){return t.auth.token})),a=Object(s.useState)(!1),I=Object(r.a)(a,2),f=I[0],E=I[1],h=u.a.useForm(),P=Object(r.a)(h,1)[0];return d.a.createElement(d.a.Fragment,null,d.a.createElement(c.a,{title:"Add Product Availability Status"}),d.a.createElement(o.b,null,d.a.createElement(n.a,{gutter:25},d.a.createElement(i.a,{sm:24,xs:24},d.a.createElement(A.a,{headless:!0},d.a.createElement(u.a,{style:{width:"100%"},form:P,name:"addProductAvailabilityStatus",onFinish:function(a){E(!0),g.b.mutate({mutation:p.a.AVAILABILITY_STATUS_ADD,variables:{name:a.name},refetchQueries:[{query:p.a.GET_ALL_AVAILABILITY_STATUS,context:{headers:{TENANTID:"100001",Authorization:e}}},["getAllProductAvailabilityStatus"]],context:{headers:{TENANTID:"100001",Authorization:e}}}).then((function(e){var a,n=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.addProductAvailabilityStatus;if(!(null===n||void 0===n?void 0:n.status))return v.b.error("Something Went wrong !!");setTimeout((function(){t.push("/admin/product-availability-status/list")}),1e3),v.b.success(null===n||void 0===n?void 0:n.message)})).catch((function(t){v.b.error("Something Went wrong !!")})).finally((function(){return E(!1)}))},onFinishFailed:function(t){return console.log("form error info:\n",t)},labelCol:{span:4}},d.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Product Availability Status Name"}],name:"name",label:"Name"},d.a.createElement(l.a,{placeholder:"Enter Product Availability Status Name"})),d.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},d.a.createElement(u.a.Item,null,d.a.createElement(m.a,{loading:f,size:"default",htmlType:"submit",type:"primary",raised:!0},f?"Processing":"Save"),d.a.createElement(S.b,{to:"/admin/product-availability-status/list"},d.a.createElement(m.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},651:function(t,e,a){"use strict";a.d(e,"a",(function(){return d}));var n,i,l,u,r=a(8),s=a(17),d={AVAILABILITY_STATUS_ADD:Object(s.d)(n||(n=Object(r.a)(["\n    mutation addProductAvailabilityStatus($name: String!){\n        addProductAvailabilityStatus(data: { name: $name }) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),AVAILABILITY_STATUS_UPDATE:Object(s.d)(i||(i=Object(r.a)(["\n    mutation updateProductAvailabilityStatus($data: UpdateProductAvailabilityStatusInput){\n        updateProductAvailabilityStatus(data: $data) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),GET_ALL_AVAILABILITY_STATUS:Object(s.d)(l||(l=Object(r.a)(["\n    query getAllProductAvailabilityStatus{\n        getAllProductAvailabilityStatus {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n    }"]))),GET_SINGLE_AVAILABILITY_STATUS:Object(s.d)(u||(u=Object(r.a)(["\n    query getSingleProductAvailabilityStatus($query : GetSingleProductAvailabilityStatusInput){\n        getSingleProductAvailabilityStatus(query: $query) {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n  }"])))}}}]);
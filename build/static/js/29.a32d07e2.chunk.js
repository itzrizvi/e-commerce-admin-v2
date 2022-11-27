(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[29],{635:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var a,i,o,d,r=n(10),u=n(19),c={CONDITION_ADD:Object(u.d)(a||(a=Object(r.a)(["\n    mutation addProductCondition($name: String!){\n        addProductCondition(data: { name: $name }) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),CONDITION_UPDATE:Object(u.d)(i||(i=Object(r.a)(["\n    mutation updateProductCondition($data: UpdateProductConditionInput){\n        updateProductCondition(data: $data) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),GET_ALL_CONDITION:Object(u.d)(o||(o=Object(r.a)(["\n    query getAllProductCondition{\n        getAllProductCondition {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n    }"]))),GET_SINGLE_CONDITION:Object(u.d)(d||(d=Object(r.a)(["\n    query getSingleProductCondition($query: GetSingleProductConditionInput){\n        getSingleProductCondition(query: $query) {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n  }"])))}},966:function(t,e,n){"use strict";n.r(e);n(113);var a=n(55),i=(n(114),n(42)),o=(n(84),n(21)),d=(n(133),n(72)),r=n(7),u=(n(163),n(24)),c=n(16),l=n(0),s=n.n(l),m=n(103),v=n(91),b=n(90),g=n(77),O=n(62),f=n(12),p=n(45),E=n(25),C=n(152),h=n.n(C),j=n(635),I=n(121),N=n(26);e.default=function(){var t,e;Object(N.c)("product-condition");var n=Object(O.useLocation)().search,C=h.a.parse(n),P=Object(O.useHistory)(),y=Object(p.d)((function(t){return t.auth.token})),T=Object(l.useState)(!1),A=Object(c.a)(T,2),S=A[0],D=A[1],_=Object(l.useState)({data:[],isLoading:!0}),L=Object(c.a)(_,2),q=L[0],w=L[1],x=u.a.useForm(),G=Object(c.a)(x,1)[0];Object(l.useEffect)((function(){C.id&&I.b.query({query:j.a.GET_SINGLE_CONDITION,variables:{query:{id:parseInt(null===C||void 0===C?void 0:C.id)}},context:{headers:{TENANTID:"100001",Authorization:y}}}).then((function(t){var e,n,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getSingleProductCondition;(null===a||void 0===a?void 0:a.status)&&(w((function(t){return Object(r.a)(Object(r.a)({},t),{},{data:null===a||void 0===a?void 0:a.data,error:""})})),G.setFieldsValue({name:null===a||void 0===a||null===(n=a.data)||void 0===n?void 0:n.name}))})).catch((function(t){w((function(t){return Object(r.a)(Object(r.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){w((function(t){return Object(r.a)(Object(r.a)({},t),{},{isLoading:!1})}))}))}),[]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{title:"Manage Product Condition | Edit Product Condition ".concat((null===q||void 0===q||null===(t=q.data)||void 0===t?void 0:t.name)?"(".concat(null===q||void 0===q||null===(e=q.data)||void 0===e?void 0:e.name,")"):"")}),s.a.createElement(v.b,null,s.a.createElement(a.a,{gutter:25},s.a.createElement(i.a,{sm:24,xs:24},s.a.createElement(b.a,{headless:!0},(null===q||void 0===q?void 0:q.isLoading)?s.a.createElement("div",{style:{textAlign:"center"}},s.a.createElement(d.a,{tip:"processing..."})):s.a.createElement(u.a,{style:{width:"100%"},form:G,name:"addProductCondition",onFinish:function(t){D(!0),I.b.mutate({mutation:j.a.CONDITION_UPDATE,variables:{data:{name:t.name,id:parseInt(null===C||void 0===C?void 0:C.id)}},refetchQueries:[{query:j.a.GET_ALL_CONDITION,context:{headers:{TENANTID:"100001",Authorization:y}}},"getAllProductCondition"],context:{headers:{TENANTID:"100001",Authorization:y}}}).then((function(t){var e,n=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.updateProductCondition;if(!(null===n||void 0===n?void 0:n.status))return E.b.error("Something Went wrong !!");P.push("/admin/product-condition/list"),E.b.success(null===n||void 0===n?void 0:n.message),window.location.reload()})).catch((function(t){E.b.error("Something Went wrong !!")})).finally((function(){return D(!1)}))},onFinishFailed:function(t){return console.log("form error info:\n",t)},labelCol:{span:4}},s.a.createElement(u.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Product Condition Name"}],name:"name",label:"Name"},s.a.createElement(o.a,{placeholder:"Enter Product Condition Name"})),s.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},s.a.createElement(u.a.Item,null,s.a.createElement(g.a,{loading:S,size:"default",htmlType:"submit",type:"primary",raised:!0},S?"Processing":"Save"),s.a.createElement(f.b,{to:"/admin/product-condition/list"},s.a.createElement(g.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
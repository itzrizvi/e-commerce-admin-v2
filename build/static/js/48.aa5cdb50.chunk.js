(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[48],{1022:function(e,t,n){"use strict";n.r(t);n(131);var a=n(63),o=(n(132),n(47)),i=(n(119),n(41)),r=(n(200),n(27)),d=n(15),u=n(0),c=n.n(u),l=n(120),s=n(101),m=n(100),g=n(99),b=n(59),O=n(10),p=n(48),C=n(31),f=n(650),E=n(102),h=n(23);t.default=function(){Object(h.c)("product-condition");var e=Object(b.useHistory)(),t=Object(p.d)((function(e){return e.auth.token})),n=Object(u.useState)(!1),P=Object(d.a)(n,2),N=P[0],I=P[1],y=r.a.useForm(),A=Object(d.a)(y,1)[0];return c.a.createElement(c.a.Fragment,null,c.a.createElement(l.a,{title:"Add Product Condition"}),c.a.createElement(s.b,null,c.a.createElement(a.a,{gutter:25},c.a.createElement(o.a,{sm:24,xs:24},c.a.createElement(m.a,{headless:!0},c.a.createElement(r.a,{style:{width:"100%"},form:A,name:"addProductCondition",onFinish:function(n){I(!0),E.b.mutate({mutation:f.a.CONDITION_ADD,variables:{name:n.name},refetchQueries:[{query:f.a.GET_ALL_CONDITION,context:{headers:{TENANTID:"100001",Authorization:t}}},["getAllProductCondition"]],context:{headers:{TENANTID:"100001",Authorization:t}}}).then((function(t){var n,a=null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.addProductCondition;if(!(null===a||void 0===a?void 0:a.status))return C.b.error("Something Went wrong !!");setTimeout((function(){e.push("/admin/product-condition/list")}),1e3),C.b.success(null===a||void 0===a?void 0:a.message)})).catch((function(e){C.b.error("Something Went wrong !!")})).finally((function(){return I(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},c.a.createElement(r.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Product Condition Name"}],name:"name",label:"Name"},c.a.createElement(i.a,{placeholder:"Enter Product Condition Name"})),c.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},c.a.createElement(r.a.Item,null,c.a.createElement(g.a,{loading:N,size:"default",htmlType:"submit",type:"primary",raised:!0},N?"Processing":"Save"),c.a.createElement(O.b,{to:"/admin/product-condition/list"},c.a.createElement(g.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},650:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a,o,i,r,d=n(8),u=n(17),c={CONDITION_ADD:Object(u.d)(a||(a=Object(d.a)(["\n    mutation addProductCondition($name: String!){\n        addProductCondition(data: { name: $name }) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),CONDITION_UPDATE:Object(u.d)(o||(o=Object(d.a)(["\n    mutation updateProductCondition($data: UpdateProductConditionInput){\n        updateProductCondition(data: $data) {\n            message\n            status\n            tenant_id\n        }\n    }"]))),GET_ALL_CONDITION:Object(u.d)(i||(i=Object(d.a)(["\n    query getAllProductCondition{\n        getAllProductCondition {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n    }"]))),GET_SINGLE_CONDITION:Object(u.d)(r||(r=Object(d.a)(["\n    query getSingleProductCondition($query: GetSingleProductConditionInput){\n        getSingleProductCondition(query: $query) {\n            message\n            status\n            data {\n                id\n                name\n                slug\n                createdAt\n                updatedAt\n            }\n        }\n  }"])))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[32],{1015:function(e,t,a){"use strict";a.r(t);a(129);var n=a(61),r=(a(130),a(44)),d=(a(196),a(62)),s=(a(360),a(292)),i=(a(117),a(38)),u=a(90),l=a(59),c=a(7),o=(a(195),a(27)),m=a(14),p=a(0),f=a.n(p),h=a(118),g=a(99),b=a(98),y=a(97),E=a(57),A=a(10),C=a(46),_=a(33),O=a(31),j=a(23),S=a(632),v=(a(140),a(72)),I=(a(91),a(41)),x=(a(294),a(141)),D=a(22),T=a.n(D),k=function(e){var t=e.initialData,a=e.addresses,n=e.setAddresses,r=e.defaultAddressId,d=e.setDefaultAddressId,l=[{title:"Address 1",dataIndex:"address1",key:"address1",width:150,render:function(e,t){return f.a.createElement(i.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:150,render:function(e,t){return f.a.createElement(i.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"Email",dataIndex:"email",key:"email ",width:150,render:function(e,t){return f.a.createElement(i.a,{defaultValue:t.email,type:"email",placeholder:"email",onChange:function(e){return t.email=e.target.value}})}},{title:"Phone",dataIndex:"phone",key:"phone ",width:150,render:function(e,t){return f.a.createElement(i.a,{defaultValue:t.phone,type:"text",placeholder:"phone",onChange:function(e){return t.phone=e.target.value}})}},{title:"Fax",dataIndex:"fax",key:"fax",width:150,render:function(e,t){return f.a.createElement(i.a,{defaultValue:e,type:"text",placeholder:"Fax",onChange:function(e){return t.fax=e.target.value}})}},{title:"Country",dataIndex:"country ",key:"country",width:150,render:function(e,t){return f.a.createElement(i.a,{defaultValue:t.country,type:"text",placeholder:"country",onChange:function(e){return t.country=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",width:150,render:function(e,t){return f.a.createElement(i.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"state",key:"state",width:150,render:function(e,t){return f.a.createElement(i.a,{defaultValue:e,type:"text",placeholder:"State",onChange:function(e){return t.state=e.target.value}})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",width:150,render:function(e,t){return f.a.createElement(i.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Default",dataIndex:"id",key:"id",align:"right",width:90,render:function(e,t){return f.a.createElement(x.a,{checked:r===e,onChange:function(a){t.isDefault=a.target.checked,d(e)}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",width:90,render:function(e,t){return f.a.createElement(s.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Action",dataIndex:"action",key:"action",width:150,render:function(e,t){return f.a.createElement(I.a,{size:"",title:"Remove",type:"danger",onClick:function(){return o(t.id)}},f.a.createElement(T.a,{icon:"minus"}))}}],o=function(e){n((function(t){return t.filter((function(t){return t.id!==e}))}))};return f.a.createElement("div",null,f.a.createElement(v.a,{className:"table-responsive",columns:l,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:!1,rowKey:"id",size:"small",dataSource:a}),f.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},f.a.createElement(I.a,{title:"Add Address",htmlType:"button",type:"primary",onClick:function(){n((function(e){return[].concat(Object(u.a)(e),[Object(c.a)(Object(c.a)({},t),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},f.a.createElement(T.a,{icon:"plus"}))))},w=["parent_id","id"],R=["parent_id","id"];t.default=function(){Object(j.c)("customer");var e=Object(E.useHistory)(),t=Object(p.useState)(!0),a=Object(m.a)(t,2),v=a[0],I=a[1],x=Object(p.useState)(!1),D=Object(m.a)(x,2),T=D[0],U=D[1],N=Object(C.d)((function(e){return e.auth.token})),P=Object(p.useState)(!1),z=Object(m.a)(P,2),B=z[0],L=z[1],$=Object(p.useState)(null),F=Object(m.a)($,2),M=F[0],V=F[1],q=o.a.useForm(),G=Object(m.a)(q,1)[0],H=Object(p.useState)(!1),J=Object(m.a)(H,2),Z=J[0],K=J[1],Q={id:(new Date).getTime(),address1:"",address2:"",city:"",country:"",email:"",fax:"",isDefault:!1,phone:"",state:"",status:!0,zip_code:""},Y=Object(p.useState)([]),W=Object(m.a)(Y,2),X=W[0],ee=W[1],te=Object(p.useState)([]),ae=Object(m.a)(te,2),ne=ae[0],re=ae[1],de=Object(p.useState)(null),se=Object(m.a)(de,2),ie=se[0],ue=se[1],le=Object(p.useState)(null),ce=Object(m.a)(le,2),oe=ce[0],me=ce[1];return Object(p.useEffect)((function(){if(B&&M){var t=ne.map((function(e){e.parent_id,e.id;var t=Object(l.a)(e,w);return Object(c.a)({parent_id:M},t)})),a=X.map((function(e){e.parent_id,e.id;var t=Object(l.a)(e,R);return Object(c.a)({parent_id:M},t)}));["billing","shipping"].forEach((function(n){U(!0),_.j.mutate({mutation:"billing"===n?S.a.ADD_CUSTOMER_BILLING_ADDRESS:S.a.ADD_CUSTOMER_SHIPPING_ADDRESS,variables:{data:{addresses:Object(u.a)("billing"===n?t:a)}},context:{headers:{TENANTID:"100001",Authorization:N}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateVendorAddress;null===a||void 0===a||a.status})).catch((function(e){K(!0)})).finally((function(t){U(!1),"shipping"===n&&(Z||(O.b.success("User Created Successfully."),setTimeout((function(){e.push("/admin/customers/list")}),[2e3])))}))}))}}),[B,M]),f.a.createElement(f.a.Fragment,null,f.a.createElement(h.a,{title:"Add Customer"}),f.a.createElement(g.b,null,f.a.createElement(n.a,{gutter:25},f.a.createElement(r.a,{sm:24,xs:24},f.a.createElement(b.a,{headless:!0},f.a.createElement(o.a,{style:{width:"100%"},form:G,name:"addProduct",onFinish:function(e){var t=ne.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,d=e.state,s=e.zip_code,i=e.email,u=e.fax,l=e.phone;return!(t&&a&&n&&r&&d&&s&&i&&u&&l)}));if(null===t||void 0===t?void 0:t.id)return O.b.warning("Enter Billing Address Correctly!");var a=X.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,d=e.state,s=e.zip_code,i=e.email,u=e.fax,l=e.phone;return!(t&&a&&n&&r&&d&&s&&i&&u&&l)}));if(null===a||void 0===a?void 0:a.id)return O.b.warning("Enter Shipping Address Correctly!");U(!0);var n={data:Object(c.a)(Object(c.a)({},e),{},{status:v,send_mail:!0})};_.j.mutate({mutation:S.a.ADD_CUSTOMER,variables:n,context:{headers:{TENANTID:"100001",Authorization:N}},refetchQueries:[{query:S.b.GET_ALL_CUSTOMER,context:{headers:{TENANTID:"100001",Authorization:N}},fetchPolicy:"network-only"},["getAllCustomer"]]}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.addCustomer;if(!a.status)return O.b.error(a.message);L(!0),V(null===a||void 0===a?void 0:a.id)})).catch((function(e){console.log("error on adding customer",e),O.b.error("Something went wrong!!"),K(!0)})).finally((function(){return U(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},f.a.createElement(d.a,null,f.a.createElement(d.a.TabPane,{tab:"Information",key:"general"},f.a.createElement(o.a.Item,{rules:[{required:!0,max:30,message:"Please enter First Name"}],name:"first_name",label:"First Name"},f.a.createElement(i.a,{placeholder:"Enter First Name"})),f.a.createElement(o.a.Item,{rules:[{required:!0,message:"Please enter Last Name"}],name:"last_name",label:"Last Name"},f.a.createElement(i.a,{placeholder:"Enter Last Name"})),f.a.createElement(o.a.Item,{rules:[{required:!0,message:"Please enter an email",max:30}],name:"email",label:"Email"},f.a.createElement(i.a,{type:"email",placeholder:"Enter Email Address"})),f.a.createElement(o.a.Item,{label:"User Status"},f.a.createElement(s.a,{checked:v,onChange:function(e){return I(e)}}))),f.a.createElement(d.a.TabPane,{tab:"Shipping Address",key:"sAddress"},f.a.createElement(k,{initialData:Q,addresses:X,setAddresses:ee,defaultAddressId:ie,setDefaultAddressId:ue})),f.a.createElement(d.a.TabPane,{tab:"Billing Address",key:"bAddress"},f.a.createElement(k,{initialData:Q,addresses:ne,setAddresses:re,defaultAddressId:oe,setDefaultAddressId:me}))),f.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},f.a.createElement(o.a.Item,null,f.a.createElement(y.a,{loading:T,size:"default",htmlType:"submit",type:"primary",raised:!0},T?"Processing":"Save"),f.a.createElement(A.b,{to:"/admin/customers/list"},f.a.createElement(y.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},632:function(e,t,a){"use strict";a.d(t,"b",(function(){return m})),a.d(t,"a",(function(){return p}));var n,r,d,s,i,u,l,c=a(8),o=a(17),m={GET_ALL_CUSTOMER:Object(o.d)(n||(n=Object(c.a)(["\n    query {\n      getAllCustomer {\n        status\n        message\n        data {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n          addresses {\n            id\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            type\n            status\n            updatedAt\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),GET_RATING_BY_USER_ID:Object(o.d)(r||(r=Object(c.a)(["\n    query getRatingsByUserID($query: GetRatingsByUserInput) {\n      getRatingsByUserID(query: $query) {\n        message\n        status\n        data {\n          id\n          rating_description\n          rating\n          createdAt\n          updatedAt\n          product {\n            id\n            prod_name\n            prod_slug\n            prod_short_desc\n            prod_thumbnail\n            prod_sku\n            prod_regular_price\n            prod_sale_price\n            prod_status\n          }\n        }\n      }\n    }\n  "])))},p={ADD_CUSTOMER:Object(o.d)(d||(d=Object(c.a)(["\n    mutation addCustomer($data: CustomerInput) {\n      addCustomer(data: $data) {\n        message\n        status\n        id\n      }\n    }\n  "]))),ADD_CUSTOMER_BILLING_ADDRESS:Object(o.d)(s||(s=Object(c.a)(["\n    mutation addCustomerBillingAddress($data: AddCustomerBillingAddressInput) {\n      addCustomerBillingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),ADD_CUSTOMER_SHIPPING_ADDRESS:Object(o.d)(i||(i=Object(c.a)(["\n    mutation addCustomerShippingAddress($data: AddCustomerShippingAddressInput) {\n      addCustomerShippingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER:Object(o.d)(u||(u=Object(c.a)(["\n    mutation updateCustomer($data: UpdateCustomerInput) {\n      updateCustomer(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER_ADDRESSES:Object(o.d)(l||(l=Object(c.a)(["\n    mutation updateCustomerAddress($data: UpdateCustomerAddressInput) {\n      updateCustomerAddress(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}}}]);
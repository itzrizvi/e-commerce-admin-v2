(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[35],{1043:function(e,t,a){"use strict";a.r(t);a(131);var n=a(63),i=(a(132),a(47)),r=(a(201),a(65)),d=(a(374),a(302)),l=(a(119),a(41)),u=(a(133),a(73)),s=a(92),o=a(7),c=a(60),m=(a(200),a(27)),p=a(15),f=a(0),g=a.n(f),y=a(120),v=a(101),h=a(100),E=a(59),b=a(10),_=a(33),C=a(31),A=a(23),O=(a(143),a(74)),j=(a(93),a(44)),S=(a(304),a(144)),D=a(22),x=a.n(D),I=function(e){var t=e.defaultBilling,a=e.initialData,n=e.billingAddress,i=e.setBillingAddress,r=e.setDefaultBilling,u=[{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"state",key:"state",render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"State",onChange:function(e){return t.state=e.target.value}})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Country",dataIndex:"country ",key:"country ",render:function(e,t){return g.a.createElement(l.a,{defaultValue:t.country,type:"text",placeholder:"Country",onChange:function(e){return t.country=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return g.a.createElement(d.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return g.a.createElement(S.a,{checked:t===a.id,onChange:function(e){return r(a.id)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return g.a.createElement(j.a,{size:"",title:"Remove",type:"danger",onClick:function(){return c(t.id)}},g.a.createElement(x.a,{icon:"trash-2"}))}}],c=function(e){i((function(t){return t.filter((function(t){return t.id!==e}))}))};return g.a.createElement("div",null,g.a.createElement(O.a,{columns:u,pagination:!1,rowKey:"id",size:"small",dataSource:n}),g.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},g.a.createElement(j.a,{title:"Add Address",htmlType:"button",type:"primary",onClick:function(){i((function(e){return[].concat(Object(s.a)(e),[Object(o.a)(Object(o.a)({},a),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},g.a.createElement(x.a,{icon:"plus"}))))},T=function(e){var t=e.defaultShipping,a=e.initialData,n=e.shippingAddress,i=e.setShippingAddress,r=e.setDefaultShipping,u=[{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"state",key:"state",render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"State",onChange:function(e){return t.state=e.target.value}})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return g.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Country",dataIndex:"country ",key:"country ",render:function(e,t){return g.a.createElement(l.a,{defaultValue:t.country,type:"text",placeholder:"Country",onChange:function(e){return t.country=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return g.a.createElement(d.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return g.a.createElement(S.a,{name:"isDefault",checked:t===a.id,onChange:function(e){return r(a.id)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return g.a.createElement(j.a,{size:"",title:"Remove",type:"danger",onClick:function(){return c(t.id)}},g.a.createElement(x.a,{icon:"trash-2"}))}}],c=function(e){i((function(t){return t.filter((function(t){return t.id!==e}))}))};return g.a.createElement("div",null,g.a.createElement(O.a,{columns:u,pagination:!1,rowKey:"id",size:"small",dataSource:n}),g.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},g.a.createElement(j.a,{title:"Add Address",htmlType:"button",type:"primary",onClick:function(){i((function(e){return[].concat(Object(s.a)(e),[Object(o.a)(Object(o.a)({},a),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},g.a.createElement(x.a,{icon:"plus"}))))},k=a(99),N=a(48),w=a(632),R=["__typename","type","createdAt","updatedAt"],U=["parent_id","isNew","id","isDefault"],z=["parent_id","isNew","isDefault","id"];t.default=function(){var e,t,a,O,j,S;Object(A.c)("customer");var D=Object(E.useHistory)(),x=Object(E.useParams)(),B=Object(N.d)((function(e){return e.auth.token})),V=Object(f.useState)(!0),P=Object(p.a)(V,2),L=P[0],$=P[1],M=Object(f.useState)(null),q=Object(p.a)(M,2),F=q[0],G=q[1],Z=Object(f.useState)(null),H=Object(p.a)(Z,2),J=H[0],K=H[1],Q=Object(f.useState)(!1),Y=Object(p.a)(Q,2),W=Y[0],X=Y[1],ee=Object(f.useState)(!1),te=Object(p.a)(ee,2),ae=te[0],ne=te[1],ie=Object(f.useState)(!1),re=Object(p.a)(ie,2),de=re[0],le=re[1],ue=m.a.useForm(),se=Object(p.a)(ue,1)[0],oe=Object(f.useState)({data:null,isLoading:!0}),ce=Object(p.a)(oe,2),me=ce[0],pe=ce[1],fe={address1:null,address2:null,phone:null,fax:null,email:null,city:null,state:null,zip_code:null,country:null,isDefault:!1,isNew:!0},ge=Object(f.useState)([]),ye=Object(p.a)(ge,2),ve=ye[0],he=ye[1],Ee=Object(f.useState)([]),be=Object(p.a)(Ee,2),_e=be[0],Ce=be[1];Object(f.useEffect)((function(){(null===x||void 0===x?void 0:x.id)&&_.j.query({query:_.i.GET_SINGLE_CUSTOMER,variables:{customer_id:parseInt(null===x||void 0===x?void 0:x.id)},context:{headers:{TENANTID:"100001",Authorization:B}}}).then((function(e){var t,a,n,i,r,d,l,u=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleCustomer;if(null===u||void 0===u?void 0:u.status){var s=[],o=[];pe({data:null===u||void 0===u?void 0:u.data,isLoading:!1}),$(null===u||void 0===u||null===(a=u.data)||void 0===a?void 0:a.user_status),se.setFieldValue({first_name:null===u||void 0===u||null===(n=u.data)||void 0===n?void 0:n.first_name,last_name:null===u||void 0===u||null===(i=u.data)||void 0===i?void 0:i.last_name,email:null===u||void 0===u||null===(r=u.data)||void 0===r?void 0:r.email}),null===u||void 0===u||null===(d=u.data)||void 0===d||null===(l=d.addresses)||void 0===l||l.forEach((function(e){e.__typename,e.type,e.createdAt,e.updatedAt;var t=Object(c.a)(e,R);"shipping"===e.type&&(e.isDefault&&K(e.id),s.push(t)),"billing"===e.type&&(e.isDefault&&G(e.id),o.push(t))})),he(s),Ce(o)}})).catch((function(e){console.log("\ud83d\ude80 ~ file: AddAdmin.js ~ line 46 ~ useEffect ~ err",e)}))}),[null===x||void 0===x?void 0:x.id]);return Object(f.useEffect)((function(){if(W&&(null===x||void 0===x?void 0:x.id)){var e=_e.map((function(e){e.parent_id;var t=e.isNew,a=e.id,n=(e.isDefault,Object(c.a)(e,U));return Object(o.a)(Object(o.a)(Object(o.a)({isDefault:F===a,parent_id:parseInt(null===x||void 0===x?void 0:x.id)},t?{isNew:t}:{isNew:!1}),n),!t&&{id:a})})),t=ve.map((function(e){e.parent_id;var t=e.isNew,a=(e.isDefault,e.id),n=Object(c.a)(e,z);return Object(o.a)(Object(o.a)(Object(o.a)({isDefault:J===a,parent_id:parseInt(null===x||void 0===x?void 0:x.id)},t?{isNew:t}:{isNew:!1}),n),!t&&{id:a})}));["billing","shipping"].forEach((function(a){le(!0),_.j.mutate({mutation:w.a.UPDATE_CUSTOMER_ADDRESSES,variables:{data:{ref_id:parseInt(null===x||void 0===x?void 0:x.id),type:a,addresses:Object(s.a)("billing"===a?e:t)}},context:{headers:{TENANTID:"100001",Authorization:B}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateCustomerAddress;null===a||void 0===a||a.status})).catch((function(e){ne(!0)})).finally((function(e){le(!1),"shipping"===a&&(ae||(C.b.success("Customer Updated Successfully."),setTimeout((function(){D.push("/admin/customers/list")}),[2e3])))}))}))}}),[W,null===x||void 0===x?void 0:x.id]),g.a.createElement(g.a.Fragment,null,g.a.createElement(y.a,{title:"Manage Customer | Edit Customer ".concat(me.isLoading?"":"(".concat(null===me||void 0===me||null===(e=me.data)||void 0===e?void 0:e.email,")"))}),g.a.createElement(v.b,null,g.a.createElement(n.a,{gutter:25},g.a.createElement(i.a,{sm:24,xs:24},g.a.createElement(h.a,{headless:!0},me.isLoading?g.a.createElement("div",{div:!0,className:"spin"},g.a.createElement(u.a,null)):g.a.createElement(m.a,{style:{width:"100%"},form:se,name:"editUser",onFinish:function(e){var t=_e.find((function(e){var t=e.id,a=e.address1,n=e.country,i=e.city,r=e.state,d=e.zip_code,l=e.address2;return!(t&&a&&n&&i&&r&&d&&l)}));if(null===t||void 0===t?void 0:t.id)return C.b.warning("Enter Billing Address Correctly!");var a=ve.find((function(e){var t=e.id,a=e.address1,n=e.country,i=e.city,r=e.state,d=e.zip_code,l=e.address2;return!(t&&a&&n&&i&&r&&d&&l)}));if(null===a||void 0===a?void 0:a.id)return C.b.warning("Enter Shipping Address Correctly!");var n={data:Object(o.a)(Object(o.a)({},e),{},{user_status:L,send_mail:!0,id:parseInt(null===x||void 0===x?void 0:x.id)})};_.j.mutate({mutation:w.a.UPDATE_CUSTOMER,variables:n,context:{headers:{TENANTID:"100001",Authorization:B}},refetchQueries:[{query:_.i.GET_ALL_CUSTOMER,context:{headers:{TENANTID:"100001",Authorization:B}},fetchPolicy:"network-only"},["getAllCustomer"]]}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateCustomer;if(!a.status)return C.b.error(a.message);X(!0)})).catch((function(e){console.log("error on adding customer",e),C.b.error("Something went wrong!!"),ne(!0)})).finally((function(){return le(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},g.a.createElement(r.a,null,g.a.createElement(r.a.TabPane,{tab:"Information",key:"information"},g.a.createElement(m.a.Item,{rules:[{required:!0,max:30,message:"Please Enter First Name"}],name:"first_name",label:"First Name",initialValue:null===me||void 0===me||null===(t=me.data)||void 0===t?void 0:t.first_name},g.a.createElement(l.a,{placeholder:"Enter First Name",defaultValue:null===me||void 0===me||null===(a=me.data)||void 0===a?void 0:a.first_name})),g.a.createElement(m.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Last Name"}],name:"last_name",label:"Last Name",initialValue:null===me||void 0===me||null===(O=me.data)||void 0===O?void 0:O.last_name},g.a.createElement(l.a,{placeholder:"Enter Last Name",defaultValue:null===me||void 0===me||null===(j=me.data)||void 0===j?void 0:j.last_name})),g.a.createElement(m.a.Item,{label:"Email"},g.a.createElement(l.a,{type:"email",disabled:!0,defaultValue:null===me||void 0===me||null===(S=me.data)||void 0===S?void 0:S.email})),g.a.createElement(m.a.Item,{label:"User Status"},g.a.createElement(d.a,{checked:L,onChange:function(e){return $(e)}}))),g.a.createElement(r.a.TabPane,{tab:"Shipping Address",key:"shipping_address"},g.a.createElement(T,{initialData:fe,shippingAddress:ve,setShippingAddress:he,defaultShipping:J,setDefaultShipping:K})),g.a.createElement(r.a.TabPane,{tab:"Billing Address",key:"billing_address"},g.a.createElement(I,{initialData:fe,billingAddress:_e,setBillingAddress:Ce,defaultBilling:F,setDefaultBilling:G}))),g.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},g.a.createElement(m.a.Item,null,g.a.createElement(k.a,{loading:de,size:"default",htmlType:"submit",type:"primary",raised:!0},de?"Processing":"Save"),g.a.createElement(b.b,{to:"/admin/customers/list"},g.a.createElement(k.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},632:function(e,t,a){"use strict";a.d(t,"b",(function(){return m})),a.d(t,"a",(function(){return p}));var n,i,r,d,l,u,s,o=a(8),c=a(17),m={GET_ALL_CUSTOMER:Object(c.d)(n||(n=Object(o.a)(["\n    query {\n      getAllCustomer {\n        status\n        message\n        data {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n          addresses {\n            id\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            type\n            status\n            updatedAt\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),GET_RATING_BY_USER_ID:Object(c.d)(i||(i=Object(o.a)(["\n    query getRatingsByUserID($query: GetRatingsByUserInput) {\n      getRatingsByUserID(query: $query) {\n        message\n        status\n        data {\n          id\n          rating_description\n          rating\n          createdAt\n          updatedAt\n          product {\n            id\n            prod_name\n            prod_slug\n            prod_short_desc\n            prod_thumbnail\n            prod_sku\n            prod_regular_price\n            prod_sale_price\n            prod_status\n          }\n        }\n      }\n    }\n  "])))},p={ADD_CUSTOMER:Object(c.d)(r||(r=Object(o.a)(["\n    mutation addCustomer($data: CustomerInput) {\n      addCustomer(data: $data) {\n        message\n        status\n        id\n      }\n    }\n  "]))),ADD_CUSTOMER_BILLING_ADDRESS:Object(c.d)(d||(d=Object(o.a)(["\n    mutation addCustomerBillingAddress($data: AddCustomerBillingAddressInput) {\n      addCustomerBillingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),ADD_CUSTOMER_SHIPPING_ADDRESS:Object(c.d)(l||(l=Object(o.a)(["\n    mutation addCustomerShippingAddress($data: AddCustomerShippingAddressInput) {\n      addCustomerShippingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER:Object(c.d)(u||(u=Object(o.a)(["\n    mutation updateCustomer($data: UpdateCustomerInput) {\n      updateCustomer(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER_ADDRESSES:Object(c.d)(s||(s=Object(o.a)(["\n    mutation updateCustomerAddress($data: UpdateCustomerAddressInput) {\n      updateCustomerAddress(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}}}]);
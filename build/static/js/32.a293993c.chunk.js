(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[32],{1026:function(e,t,a){"use strict";a.r(t);a(143);var n=a(68),i=(a(144),a(52)),d=(a(202),a(64)),r=(a(303),a(217)),l=(a(115),a(39)),u=(a(132),a(74)),o=a(84),s=a(7),c=a(60),m=(a(201),a(27)),f=a(14),v=a(0),p=a.n(v),y=a(120),b=a(101),g=a(99),E=a(59),h=a(12),O=a(28),j=a(33),_=a(23),C=(a(133),a(71)),A=(a(93),a(44)),S=(a(278),a(124)),T=(a(145),a(30)),D=a(19),I=a.n(D),x=a(169),N=function(e){var t=e.defaultBilling,a=e.initialData,n=e.billingAddress,i=e.setBillingAddress,d=e.setDefaultBilling,r=Object(v.useState)([]),u=Object(f.a)(r,2),c=u[0],m=u[1],y=Object(v.useState)({data:[],loading:!0}),b=Object(f.a)(y,2),g=b[0],E=b[1];Object(v.useEffect)((function(){O.j.query({query:x.a.GET_COUNTRY_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t=e.data.getCountryList;if(!t.status)return!0;m(null===t||void 0===t?void 0:t.data)})),O.j.query({query:x.a.GET_STATE_LISTS,variables:{query:{code:""}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,d=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getStateList;(null===d||void 0===d?void 0:d.status)&&(E({data:Object(s.a)(Object(s.a)({},a),{},{states:null===d||void 0===d?void 0:d.data}),loading:!1}),i(n.map((function(e){var t;return Object(s.a)(Object(s.a)({},e),{},{states:null===d||void 0===d||null===(t=d.data)||void 0===t?void 0:t.filter((function(t){return t.country_code===e.countryCode.code}))})}))))})).finally((function(){E((function(e){return Object(s.a)(Object(s.a)({},e),{},{loading:!1})}))}))}),[]);var h=[{title:"Country",dataIndex:["countryCode","name"],key:"name",render:function(e,t){var a;return p.a.createElement(T.a,{onSelect:function(e){i(n.map((function(a){return a.id===t.id?Object(s.a)(Object(s.a)({},a),{},{country:e,states:g.data.states.filter((function(t){return t.country_code===e}))}):a})))},style:{width:"100%"},placeholder:"Country",defaultValue:null===t||void 0===t||null===(a=t.countryCode)||void 0===a?void 0:a.code,options:null===c||void 0===c?void 0:c.map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e.code}}))})}},{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return p.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return p.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return p.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"states",key:"states",width:150,render:function(e,t){return p.a.createElement(T.a,{style:{width:"100%"},placeholder:"State",options:null===e||void 0===e?void 0:e.map((function(e){return{label:e.state,value:e.abbreviation}})),onSelect:function(e){return t.state=e},defaultValue:t.state})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return p.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return p.a.createElement(S.a,{checked:t===a.id,onChange:function(e){return d(a.id)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return p.a.createElement(A.a,{size:"",title:"Remove",type:"danger",onClick:function(){return j(t.id)}},p.a.createElement(I.a,{icon:"trash-2"}))}}],j=function(e){i((function(t){return t.filter((function(t){return t.id!==e}))}))};return p.a.createElement("div",null,p.a.createElement(C.a,{loading:null===g||void 0===g?void 0:g.loading,className:"table-responsive",columns:h,pagination:!1,rowKey:"id",size:"small",dataSource:n}),p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},p.a.createElement(A.a,{disabled:null===g||void 0===g?void 0:g.loading,title:"Add Address",htmlType:"button",type:"primary",onClick:function(){i((function(e){return[].concat(Object(o.a)(e),[Object(s.a)(Object(s.a)({},g.data),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},p.a.createElement(I.a,{icon:"plus"}))))},k=function(e){var t=e.defaultShipping,a=e.initialData,n=e.shippingAddress,i=e.setShippingAddress,d=e.setDefaultShipping,u=Object(v.useState)([]),c=Object(f.a)(u,2),m=c[0],y=c[1],b=Object(v.useState)({data:[],loading:!0}),g=Object(f.a)(b,2),E=g[0],h=g[1];Object(v.useEffect)((function(){O.j.query({query:x.a.GET_COUNTRY_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t=e.data.getCountryList;if(!t.status)return!0;y(null===t||void 0===t?void 0:t.data)})),O.j.query({query:x.a.GET_STATE_LISTS,variables:{query:{code:""}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,d=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getStateList;(null===d||void 0===d?void 0:d.status)&&(h({data:Object(s.a)(Object(s.a)({},a),{},{states:null===d||void 0===d?void 0:d.data}),loading:!1}),i(n.map((function(e){var t;return Object(s.a)(Object(s.a)({},e),{},{states:null===d||void 0===d||null===(t=d.data)||void 0===t?void 0:t.filter((function(t){return t.country_code===e.countryCode.code}))})}))))})).finally((function(){h((function(e){return Object(s.a)(Object(s.a)({},e),{},{loading:!1})}))}))}),[]);var j=[{title:"Country",dataIndex:["countryCode","name"],key:"name",render:function(e,t){var a;return p.a.createElement(T.a,{onSelect:function(e){i(n.map((function(a){return a.id===t.id?Object(s.a)(Object(s.a)({},a),{},{country:e,states:E.data.states.filter((function(t){return t.country_code===e}))}):a})))},style:{width:"100%"},placeholder:"Country",defaultValue:null===t||void 0===t||null===(a=t.countryCode)||void 0===a?void 0:a.code,options:null===m||void 0===m?void 0:m.map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e.code}}))})}},{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return p.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return p.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return p.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"states",key:"states",width:150,render:function(e,t){return p.a.createElement(T.a,{style:{width:"100%"},placeholder:"State",options:null===e||void 0===e?void 0:e.map((function(e){return{label:e.state,value:e.abbreviation}})),onSelect:function(e){return t.state=e},defaultValue:t.state})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return p.a.createElement(l.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return p.a.createElement(r.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return p.a.createElement(S.a,{name:"isDefault",checked:t===a.id,onChange:function(e){return d(a.id)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return p.a.createElement(A.a,{size:"",title:"Remove",type:"danger",onClick:function(){return _(t.id)}},p.a.createElement(I.a,{icon:"trash-2"}))}}],_=function(e){i((function(t){return t.filter((function(t){return t.id!==e}))}))};return p.a.createElement("div",null,p.a.createElement(C.a,{className:"table-responsive",columns:j,pagination:!1,rowKey:"id",size:"small",loading:null===E||void 0===E?void 0:E.loading,dataSource:n}),p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},p.a.createElement(A.a,{disabled:null===E||void 0===E?void 0:E.loading,title:"Add Address",htmlType:"button",type:"primary",onClick:function(){i((function(e){return[].concat(Object(o.a)(e),[Object(s.a)(Object(s.a)({},E.data),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},p.a.createElement(I.a,{icon:"plus"}))))},w=a(100),R=a(47),U=a(625),L=["__typename","type","createdAt","updatedAt"],q=["parent_id","isNew","id","isDefault","countryCode","states"],z=["parent_id","isNew","isDefault","id","countryCode","states"];t.default=function(){var e,t,a,C,A,S;Object(_.c)("customer");var T=Object(E.useHistory)(),D=Object(E.useParams)(),I=Object(R.d)((function(e){return e.auth.token})),x=Object(v.useState)(!0),B=Object(f.a)(x,2),V=B[0],P=B[1],G=Object(v.useState)(null),$=Object(f.a)(G,2),M=$[0],F=$[1],Z=Object(v.useState)(null),Y=Object(f.a)(Z,2),H=Y[0],J=Y[1],K=Object(v.useState)(!1),Q=Object(f.a)(K,2),W=Q[0],X=Q[1],ee=Object(v.useState)(!1),te=Object(f.a)(ee,2),ae=te[0],ne=te[1],ie=Object(v.useState)(!1),de=Object(f.a)(ie,2),re=de[0],le=de[1],ue=m.a.useForm(),oe=Object(f.a)(ue,1)[0],se=Object(v.useState)({data:null,isLoading:!0}),ce=Object(f.a)(se,2),me=ce[0],fe=ce[1],ve={address1:null,address2:null,city:null,state:null,zip_code:null,country:null,isDefault:!1,isNew:!0},pe=Object(v.useState)([]),ye=Object(f.a)(pe,2),be=ye[0],ge=ye[1],Ee=Object(v.useState)([]),he=Object(f.a)(Ee,2),Oe=he[0],je=he[1];Object(v.useEffect)((function(){(null===D||void 0===D?void 0:D.id)&&O.j.query({query:O.i.GET_SINGLE_CUSTOMER,variables:{customer_id:parseInt(null===D||void 0===D?void 0:D.id)},context:{headers:{TENANTID:"100001",Authorization:I}},fetchPolicy:"network-only"}).then((function(e){var t,a,n,i,d,r,l,u=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleCustomer;if(null===u||void 0===u?void 0:u.status){var o=[],m=[];fe({data:null===u||void 0===u?void 0:u.data,isLoading:!1}),P(null===u||void 0===u||null===(a=u.data)||void 0===a?void 0:a.user_status),oe.setFieldsValue({first_name:null===u||void 0===u||null===(n=u.data)||void 0===n?void 0:n.first_name,last_name:null===u||void 0===u||null===(i=u.data)||void 0===i?void 0:i.last_name,email:null===u||void 0===u||null===(d=u.data)||void 0===d?void 0:d.email}),null===u||void 0===u||null===(r=u.data)||void 0===r||null===(l=r.addresses)||void 0===l||l.forEach((function(e){e.__typename,e.type,e.createdAt,e.updatedAt;var t=Object(c.a)(e,L);"shipping"===e.type&&(e.isDefault&&J(e.id),o.push(Object(s.a)(Object(s.a)({},t),{},{isNew:!1}))),"billing"===e.type&&(e.isDefault&&F(e.id),m.push(Object(s.a)(Object(s.a)({},t),{},{isNew:!1})))})),ge(o),je(m)}})).catch((function(e){console.log("\ud83d\ude80 ~ file: AddAdmin.js ~ line 85 ~ useEffect ~ err",e)}))}),[null===D||void 0===D?void 0:D.id]);return Object(v.useEffect)((function(){if(W&&(null===D||void 0===D?void 0:D.id)){var e=Oe.map((function(e){e.parent_id;var t=e.isNew,a=e.id,n=(e.isDefault,e.countryCode,e.states,Object(c.a)(e,q));return Object(s.a)(Object(s.a)(Object(s.a)({isDefault:M===a,parent_id:parseInt(null===D||void 0===D?void 0:D.id)},t?{isNew:t}:{isNew:!1}),n),!t&&{id:a})})),t=be.map((function(e){e.parent_id;var t=e.isNew,a=(e.isDefault,e.id),n=(e.countryCode,e.states,Object(c.a)(e,z));return Object(s.a)(Object(s.a)(Object(s.a)({isDefault:H===a,parent_id:parseInt(null===D||void 0===D?void 0:D.id)},t?{isNew:t}:{isNew:!1}),n),!t&&{id:a})}));["billing","shipping"].forEach((function(a){le(!0),O.j.mutate({mutation:U.a.UPDATE_CUSTOMER_ADDRESSES,variables:{data:{ref_id:parseInt(null===D||void 0===D?void 0:D.id),type:a,addresses:Object(o.a)("billing"===a?e:t)}},context:{headers:{TENANTID:"100001",Authorization:I}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateCustomerAddress;null===a||void 0===a||a.status})).catch((function(e){ne(!0)})).finally((function(e){le(!1),"shipping"===a&&(ae||(j.b.success("Customer Updated Successfully."),setTimeout((function(){T.push("/admin/customers/list")}),[2e3])))}))}))}}),[W,null===D||void 0===D?void 0:D.id]),p.a.createElement(p.a.Fragment,null,p.a.createElement(y.a,{title:"Manage Customer | Edit Customer ".concat(me.isLoading?"":"(".concat(null===me||void 0===me||null===(e=me.data)||void 0===e?void 0:e.email,")"))}),p.a.createElement(b.b,null,p.a.createElement(n.a,{gutter:25},p.a.createElement(i.a,{sm:24,xs:24},p.a.createElement(g.a,{headless:!0},me.isLoading?p.a.createElement("div",{div:!0,className:"spin"},p.a.createElement(u.a,null)):p.a.createElement(m.a,{style:{width:"100%"},form:oe,name:"editUser",onFinish:function(e){var t=Oe.find((function(e){var t=e.id,a=e.address1,n=e.country,i=e.city,d=e.state,r=e.zip_code,l=e.address2;return!(t&&a&&n&&i&&d&&r&&l)}));if(null===t||void 0===t?void 0:t.id)return j.b.warning("Enter Billing Address Correctly!");var a=be.find((function(e){var t=e.id,a=e.address1,n=e.country,i=e.city,d=e.state,r=e.zip_code,l=e.address2;return!(t&&a&&n&&i&&d&&r&&l)}));if(null===a||void 0===a?void 0:a.id)return j.b.warning("Enter Shipping Address Correctly!");var n={data:Object(s.a)(Object(s.a)({},e),{},{user_status:V,send_mail:!0,id:parseInt(null===D||void 0===D?void 0:D.id)})};O.j.mutate({mutation:U.a.UPDATE_CUSTOMER,variables:n,context:{headers:{TENANTID:"100001",Authorization:I}},refetchQueries:[{query:O.i.GET_ALL_CUSTOMER,context:{headers:{TENANTID:"100001",Authorization:I}},fetchPolicy:"no-cache"},["getAllCustomer"]]}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateCustomer;if(!a.status)return j.b.error(a.message);X(!0)})).catch((function(e){console.log("error on adding customer",e),j.b.error("Something went wrong!!"),ne(!0)})).finally((function(){return le(!1)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4}},p.a.createElement(d.a,null,p.a.createElement(d.a.TabPane,{tab:"Information",key:"information"},p.a.createElement(m.a.Item,{rules:[{required:!0,max:30,message:"Please Enter First Name"}],name:"first_name",label:"First Name",initialValue:null===me||void 0===me||null===(t=me.data)||void 0===t?void 0:t.first_name},p.a.createElement(l.a,{placeholder:"Enter First Name",defaultValue:null===me||void 0===me||null===(a=me.data)||void 0===a?void 0:a.first_name})),p.a.createElement(m.a.Item,{rules:[{required:!0,max:30,message:"Please Enter Last Name"}],name:"last_name",label:"Last Name",initialValue:null===me||void 0===me||null===(C=me.data)||void 0===C?void 0:C.last_name},p.a.createElement(l.a,{placeholder:"Enter Last Name",defaultValue:null===me||void 0===me||null===(A=me.data)||void 0===A?void 0:A.last_name})),p.a.createElement(m.a.Item,{label:"Email"},p.a.createElement(l.a,{type:"email",disabled:!0,defaultValue:null===me||void 0===me||null===(S=me.data)||void 0===S?void 0:S.email})),p.a.createElement(m.a.Item,{label:"User Status"},p.a.createElement(r.a,{checked:V,onChange:function(e){return P(e)}}))),p.a.createElement(d.a.TabPane,{tab:"Shipping Address",key:"shipping_address"},p.a.createElement(k,{initialData:ve,shippingAddress:be,setShippingAddress:ge,defaultShipping:H,setDefaultShipping:J})),p.a.createElement(d.a.TabPane,{tab:"Billing Address",key:"billing_address"},p.a.createElement(N,{initialData:ve,billingAddress:Oe,setBillingAddress:je,defaultBilling:M,setDefaultBilling:F}))),p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},p.a.createElement(m.a.Item,null,p.a.createElement(w.a,{loading:re,size:"default",htmlType:"submit",type:"primary",raised:!0},re?"Processing":"Save"),p.a.createElement(h.b,{to:"/admin/customers/list"},p.a.createElement(w.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},625:function(e,t,a){"use strict";a.d(t,"b",(function(){return m})),a.d(t,"a",(function(){return f}));var n,i,d,r,l,u,o,s=a(8),c=a(17),m={GET_ALL_CUSTOMER:Object(c.d)(n||(n=Object(s.a)(["\n    query {\n      getAllCustomer {\n        status\n        message\n        data {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n          addresses {\n            id\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            type\n            status\n            updatedAt\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),GET_RATING_BY_USER_ID:Object(c.d)(i||(i=Object(s.a)(["\n    query getRatingsByUserID($query: GetRatingsByUserInput) {\n      getRatingsByUserID(query: $query) {\n        message\n        status\n        data {\n          id\n          rating_description\n          rating\n          createdAt\n          updatedAt\n          product {\n            id\n            prod_name\n            prod_slug\n            prod_short_desc\n            prod_thumbnail\n            prod_sku\n            prod_regular_price\n            prod_sale_price\n            prod_status\n          }\n        }\n      }\n    }\n  "])))},f={ADD_CUSTOMER:Object(c.d)(d||(d=Object(s.a)(["\n    mutation addCustomer($data: CustomerInput) {\n      addCustomer(data: $data) {\n        message\n        status\n        id\n      }\n    }\n  "]))),ADD_CUSTOMER_BILLING_ADDRESS:Object(c.d)(r||(r=Object(s.a)(["\n    mutation addCustomerBillingAddress($data: AddCustomerBillingAddressInput) {\n      addCustomerBillingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),ADD_CUSTOMER_SHIPPING_ADDRESS:Object(c.d)(l||(l=Object(s.a)(["\n    mutation addCustomerShippingAddress($data: AddCustomerShippingAddressInput) {\n      addCustomerShippingAddress(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER:Object(c.d)(u||(u=Object(s.a)(["\n    mutation updateCustomer($data: UpdateCustomerInput) {\n      updateCustomer(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),UPDATE_CUSTOMER_ADDRESSES:Object(c.d)(o||(o=Object(s.a)(["\n    mutation updateCustomerAddress($data: UpdateCustomerAddressInput) {\n      updateCustomerAddress(data: $data) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}}}]);
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[80],{1040:function(e,t,a){"use strict";a.r(t);a(133);var n=a(63),r=(a(134),a(47)),i=(a(202),a(65)),d=(a(305),a(217)),l=(a(135),a(74)),o=a(84),u=a(60),c=a(7),s=(a(201),a(27)),m=a(14),f=(a(115),a(39)),p=a(0),v=a.n(p),y=a(120),b=a(101),g=a(100),h=a(99),E=a(59),j=a(10),O=a(168),_=a.n(O),A=a(28),x=a(72),I=a.n(x),C=a(33),T=a(23),S=(a(136),a(71)),D=(a(89),a(41)),N=(a(279),a(124)),V=(a(145),a(30)),k=a(19),w=a.n(k),q=a(169),P=function(e){var t=e.defaultBilling,a=e.initialAddressData,n=e.billingAddresses,r=e.setBillingAddresses,i=e.setDefaultBilling,l=Object(p.useState)([]),u=Object(m.a)(l,2),s=u[0],y=u[1],b=Object(p.useState)({data:[],loading:!0}),g=Object(m.a)(b,2),h=g[0],E=g[1];Object(p.useEffect)((function(){A.j.query({query:q.a.GET_COUNTRY_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t=e.data.getCountryList;if(!t.status)return!0;y(null===t||void 0===t?void 0:t.data)})),A.j.query({query:q.a.GET_STATE_LISTS,variables:{query:{code:""}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getStateList;(null===i||void 0===i?void 0:i.status)&&(E({data:Object(c.a)(Object(c.a)({},a),{},{states:null===i||void 0===i?void 0:i.data}),loading:!1}),r(n.map((function(e){var t;return Object(c.a)(Object(c.a)({},e),{},{states:null===i||void 0===i||null===(t=i.data)||void 0===t?void 0:t.filter((function(t){var a;return t.country_code===(null===e||void 0===e||null===(a=e.countryCode)||void 0===a?void 0:a.code)}))})}))))})).finally((function(){E((function(e){return Object(c.a)(Object(c.a)({},e),{},{loading:!1})}))}))}),[]);var j=[{title:"Country",dataIndex:["countryCode","name"],key:"name",render:function(e,t){var a;return v.a.createElement(V.a,{onSelect:function(e){r(n.map((function(a){return a.id===t.id?Object(c.a)(Object(c.a)({},a),{},{country:e,states:h.data.states.filter((function(t){return t.country_code===e}))}):a})))},style:{width:"100%"},placeholder:"Country",defaultValue:null===t||void 0===t||null===(a=t.countryCode)||void 0===a?void 0:a.code,options:null===s||void 0===s?void 0:s.map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e.code}}))})}},{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return v.a.createElement(f.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return v.a.createElement(f.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return v.a.createElement(f.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"states",key:"states",width:150,render:function(e,t){return v.a.createElement(V.a,{style:{width:"100%"},placeholder:"State",options:null===e||void 0===e?void 0:e.map((function(e){return{label:e.state,value:e.abbreviation}})),onSelect:function(e){return t.state=e},defaultValue:t.state})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return v.a.createElement(f.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Country",dataIndex:"country ",key:"country ",render:function(e,t){return v.a.createElement(f.a,{defaultValue:t.country,type:"text",placeholder:"Country",onChange:function(e){return t.country=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return v.a.createElement(d.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return v.a.createElement(N.a,{checked:t===a.id,onChange:function(e){return i(a.id)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return v.a.createElement(D.a,{size:"",title:"Remove",type:"danger",onClick:function(){return O(t.id)}},v.a.createElement(w.a,{icon:"trash-2"}))}}],O=function(e){r((function(t){return t.filter((function(t){return t.id!==e}))}))};return v.a.createElement("div",null,v.a.createElement(S.a,{loading:null===h||void 0===h?void 0:h.loading,className:"table-responsive",columns:j,pagination:!1,rowKey:"id",size:"small",dataSource:n}),v.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},v.a.createElement(D.a,{disabled:null===h||void 0===h?void 0:h.loading,title:"Add Address",htmlType:"button",type:"primary",onClick:function(){r((function(e){return[].concat(Object(o.a)(e),[Object(c.a)(Object(c.a)({},h.data),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},v.a.createElement(w.a,{icon:"plus"}))))},z=function(e){var t=e.defaultShipping,a=e.initialAddressData,n=e.shippingAddresses,r=e.setShippingAddresses,i=e.setDefaultShipping,l=Object(p.useState)([]),u=Object(m.a)(l,2),s=u[0],y=u[1],b=Object(p.useState)({data:[],loading:!0}),g=Object(m.a)(b,2),h=g[0],E=g[1];Object(p.useEffect)((function(){A.j.query({query:q.a.GET_COUNTRY_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t=e.data.getCountryList;if(!t.status)return!0;y(null===t||void 0===t?void 0:t.data)})),A.j.query({query:q.a.GET_STATE_LISTS,variables:{query:{code:""}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,i=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getStateList;(null===i||void 0===i?void 0:i.status)&&(E({data:Object(c.a)(Object(c.a)({},a),{},{states:null===i||void 0===i?void 0:i.data}),loading:!1}),r(n.map((function(e){var t;return Object(c.a)(Object(c.a)({},e),{},{states:null===i||void 0===i||null===(t=i.data)||void 0===t?void 0:t.filter((function(t){var a;return t.country_code===(null===e||void 0===e||null===(a=e.countryCode)||void 0===a?void 0:a.code)}))})}))))})).finally((function(){E((function(e){return Object(c.a)(Object(c.a)({},e),{},{loading:!1})}))}))}),[]);var j=[{title:"Country",dataIndex:["countryCode","name"],key:"name",render:function(e,t){var a;return v.a.createElement(V.a,{onSelect:function(e){r(n.map((function(a){return a.id===t.id?Object(c.a)(Object(c.a)({},a),{},{country:e,states:h.data.states.filter((function(t){return t.country_code===e}))}):a})))},style:{width:"100%"},placeholder:"Country",defaultValue:null===t||void 0===t||null===(a=t.countryCode)||void 0===a?void 0:a.code,options:null===s||void 0===s?void 0:s.map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e.code}}))})}},{title:"Address 1",dataIndex:"address1",key:"address1",width:200,render:function(e,t){return v.a.createElement(f.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",width:200,render:function(e,t){return v.a.createElement(f.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return v.a.createElement(f.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"states",key:"states",width:150,render:function(e,t){return v.a.createElement(V.a,{style:{width:"100%"},placeholder:"State",options:null===e||void 0===e?void 0:e.map((function(e){return{label:e.state,value:e.abbreviation}})),onSelect:function(e){return t.state=e},defaultValue:t.state})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return v.a.createElement(f.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return v.a.createElement(d.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return v.a.createElement(N.a,{name:"isDefault",checked:t===a.id,onChange:function(e){return i(a.id)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return v.a.createElement(D.a,{size:"",title:"Remove",type:"danger",onClick:function(){return O(t.id)}},v.a.createElement(w.a,{icon:"trash-2"}))}}],O=function(e){r((function(t){return t.filter((function(t){return t.id!==e}))}))};return v.a.createElement("div",null,v.a.createElement(S.a,{className:"table-responsive",columns:j,pagination:!1,rowKey:"id",size:"small",dataSource:n,loading:null===h||void 0===h?void 0:h.loading}),v.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},v.a.createElement(D.a,{disabled:null===h||void 0===h?void 0:h.loading,title:"Add Address",htmlType:"button",type:"primary",onClick:function(){r((function(e){return[].concat(Object(o.a)(e),[Object(c.a)(Object(c.a)({},h.data),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},v.a.createElement(w.a,{icon:"plus"}))))},L=["updatedAt","createdAt","__typename","type","isDefault"],R=["parent_id","isNew","states","id","isDefault"],F=["parent_id","isNew","states","isDefault","id"],B=f.a.TextArea;t.default=function(){Object(T.c)("vendor");var e=Object(E.useLocation)().search,t=_.a.parse(e),a=Object(E.useHistory)(),O=Object(p.useState)({data:[],isLoading:!0}),x=Object(m.a)(O,2),S=x[0],D=x[1],N=Object(p.useState)(!0),V=Object(m.a)(N,2),k=V[0],w=V[1],q=Object(p.useState)(!1),G=Object(m.a)(q,2),X=G[0],U=G[1],Z=Object(p.useState)(null),J=Object(m.a)(Z,2),K=J[0],Y=J[1],H=Object(p.useState)(null),M=Object(m.a)(H,2),Q=M[0],W=M[1],$=s.a.useForm(),ee=Object(m.a)($,1)[0],te=Object(p.useState)(!1),ae=Object(m.a)(te,2),ne=ae[0],re=ae[1],ie=Object(p.useState)(null),de=Object(m.a)(ie,2),le=de[0],oe=de[1],ue=Object(p.useState)(!1),ce=Object(m.a)(ue,2),se=ce[0],me=ce[1],fe={id:(new Date).getTime(),parent_id:"",address1:"",address2:"",country:"",city:"",state:"",zip_code:"",email:"",fax:"",phone:"",status:!0,isDefault:!1,isNew:!0},pe=Object(p.useState)([]),ve=Object(m.a)(pe,2),ye=ve[0],be=ve[1],ge=Object(p.useState)([]),he=Object(m.a)(ge,2),Ee=he[0],je=he[1];Object(p.useEffect)((function(){(null===t||void 0===t?void 0:t.id)&&A.j.query({query:A.p.GET_SINGLE_VENDOR,variables:{query:{id:parseInt(t.id)}},context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(e){var t,a,n,r=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleVendor;if(null===r||void 0===r?void 0:r.status){fe.parent_id=null===r||void 0===r||null===(a=r.data)||void 0===a?void 0:a.id,D((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===r||void 0===r?void 0:r.data,error:""})}));var i=[],d=[];null===r||void 0===r||null===(n=r.data)||void 0===n||n.addresses.forEach((function(e){e.updatedAt,e.createdAt,e.__typename,e.type;var t,a=e.isDefault,n=Object(u.a)(e,L),l=Object(c.a)({isDefault:!1,isNew:!1,parent_id:null===r||void 0===r||null===(t=r.data)||void 0===t?void 0:t.id},n);return"billing"===e.type?(a&&Y(e.id),i.push(l)):"shipping"===e.type?(a&&W(e.id),d.push(l)):void 0})),be(i),je(d)}})).catch((function(e){D((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){D((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[null===t||void 0===t?void 0:t.id]);return Object(p.useEffect)((function(){if(ne&&le){var e=ye.map((function(e){e.parent_id;var t=e.isNew,a=(e.states,e.id),n=(e.isDefault,Object(u.a)(e,R));return Object(c.a)(Object(c.a)({isDefault:K===a,parent_id:le,isNew:t},n),!t&&{id:a})})),t=Ee.map((function(e){e.parent_id;var t=e.isNew,a=(e.states,e.isDefault,e.id),n=Object(u.a)(e,F);return Object(c.a)(Object(c.a)({isDefault:Q===a,parent_id:le,isNew:t},n),!t&&{id:a})}));["billing","shipping"].forEach((function(n){U(!0),A.j.mutate({mutation:A.o.UPDATE_VENDOR_ADDRESS,variables:{data:{ref_id:le,type:n,addresses:Object(o.a)("billing"===n?e:t)}},context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateVendorAddress;null===a||void 0===a||a.status})).catch((function(e){me(!0)})).finally((function(e){U(!1),"shipping"===n&&(se||(C.b.success("Vendor Added Successfully."),setTimeout((function(){a.push("/admin/vendor/list")}),[2e3])))}))}))}}),[ne,le]),v.a.createElement(v.a.Fragment,null,v.a.createElement(y.a,{title:t.id?"Manage Vendor | Edit ".concat(S.data.company_name?"(".concat(S.data.company_name,")"):""):"Add Vendor"}),v.a.createElement(b.b,null,v.a.createElement(n.a,{gutter:25},v.a.createElement(r.a,{sm:24,xs:24},v.a.createElement(g.a,{headless:!0},t.id&&S.isLoading?v.a.createElement("div",{div:!0,className:"spin"},v.a.createElement(l.a,null)):v.a.createElement(s.a,{style:{width:"100%"},form:ee,name:"addVendor",onFinish:function(e){var a=Object(c.a)(Object(c.a)({},e),{},{status:k}),n=ye.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,i=e.state,d=e.zip_code,l=e.address2;return!(t&&a&&n&&r&&i&&d&&l)}));if(null===n||void 0===n?void 0:n.id)return C.b.warning("Enter Billing Address Correctly!");var r=Ee.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,i=e.state,d=e.zip_code,l=e.address2;return!(t&&a&&n&&r&&i&&d&&l)}));if(null===r||void 0===r?void 0:r.id)return C.b.warning("Enter Shipping Address Correctly!");U(!0),t.id?A.j.mutate({mutation:A.o.UPDATE_VENDOR,variables:{data:Object(c.a)(Object(c.a)({},a),{},{id:parseInt(t.id)})},context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(e){var a,n=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateVendor;if(!n.status)return C.b.error(n.message);oe(parseInt(null===t||void 0===t?void 0:t.id)),re(!0)})).catch((function(e){console.log("got error on update vendor",e),me(!0)})).finally((function(){U(!1)})):A.j.mutate({mutation:A.o.CREATE_VENDOR,variables:{data:a},context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}},refetchQueries:[{query:A.p.GET_ALL_VENDOR,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}},fetchPolicy:"network-only"},["getAllVendor"]]}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.createVendor;if(!a.status)return C.b.error(a.message);oe(parseInt(a.id)),re(!0)})).catch((function(e){U(!1),console.log("got error on add vendor",e),me(!0)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4},initialValues:t.id?{company_name:S.data.company_name,contact_person:S.data.contact_person,email:S.data.email,description:S.data.description,phone_number:S.data.phone_number,EIN_no:S.data.EIN_no,TAX_ID:S.data.TAX_ID,FAX_no:S.data.FAX_no}:null},v.a.createElement(i.a,null,v.a.createElement(i.a.TabPane,{tab:"General",key:"general"},v.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Vendor Company Name"}],name:"company_name",label:"Company Name"},v.a.createElement(f.a,{placeholder:"Enter Vendor Company Name"})),v.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Vendor Contact Person"}],label:"Contact Person",name:"contact_person"},v.a.createElement(f.a,{placeholder:"Enter Contact Person"})),v.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Email"}],name:"email",label:"Email"},v.a.createElement(f.a,{placeholder:"Enter Vendor Email",type:"email"})),v.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Phone Number"}],name:"phone_number",label:"Phone"},v.a.createElement(f.a,{placeholder:"Enter Vendor Phone Number"})),v.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Fax No"}],name:"FAX_no",label:"Fax"},v.a.createElement(f.a,{placeholder:"Enter Vendor Fax"})),v.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter EIN No"}],name:"EIN_no",label:"EIN"},v.a.createElement(f.a,{placeholder:"Enter Vendor EIN Number"})),v.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Fax Id"}],name:"TAX_ID",label:"Tax Id"},v.a.createElement(f.a,{placeholder:"Enter Vendor Tax Id"})),v.a.createElement(s.a.Item,{rules:[{required:!0,message:"Please enter Vendor Description"}],name:"description",label:"Description"},v.a.createElement(B,{rows:4,placeholder:"Enter Vendor Description"})),v.a.createElement(s.a.Item,{label:"Vendor Status"},v.a.createElement(d.a,{checked:k,onChange:function(e){return w(e)}}))),v.a.createElement(i.a.TabPane,{tab:"Billing Address",key:"billing_address"},v.a.createElement(P,{defaultBilling:K,initialAddressData:fe,billingAddresses:ye,setBillingAddresses:be,setDefaultBilling:Y})),v.a.createElement(i.a.TabPane,{tab:"Shipping Address",key:"shipping_address"},v.a.createElement(z,{defaultShipping:Q,initialAddressData:fe,shippingAddresses:Ee,setShippingAddresses:je,setDefaultShipping:W}))),v.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},v.a.createElement(s.a.Item,null,v.a.createElement(h.a,{loading:X,size:"default",htmlType:"submit",type:"primary",raised:!0},X?"Processing":"Save"),v.a.createElement(j.b,{to:"/admin/vendor/list"},v.a.createElement(h.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
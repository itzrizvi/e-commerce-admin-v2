(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[80],{1048:function(e,t,a){"use strict";a.r(t);a(131);var n=a(63),r=(a(132),a(47)),i=(a(201),a(65)),l=(a(374),a(302)),d=(a(133),a(73)),u=a(92),o=a(60),c=a(7),s=(a(200),a(27)),m=a(15),p=(a(119),a(39)),f=a(0),g=a.n(f),h=a(120),y=a(101),E=a(100),b=a(99),v=a(59),x=a(10),A=a(168),j=a.n(A),_=a(33),I=a(71),O=a.n(I),C=a(31),D=a(23),V=(a(143),a(74)),k=(a(93),a(44)),N=(a(304),a(144)),S=a(22),T=a.n(S),P=function(e){var t=e.defaultBilling,a=e.initialAddressData,n=e.billingAddresses,r=e.setBillingAddresses,i=e.setDefaultBilling,d=[{title:"Address 1",dataIndex:"address1",key:"address1",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"Country",dataIndex:"country ",key:"country ",render:function(e,t){return g.a.createElement(p.a,{defaultValue:t.country,type:"text",placeholder:"Country",onChange:function(e){return t.country=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"state",key:"state",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"State",onChange:function(e){return t.state=e.target.value}})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Fax",dataIndex:"fax",key:"fax",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Fax",onChange:function(e){return t.fax=e.target.value}})}},{title:"Email",dataIndex:"email",key:"email",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"email",placeholder:"Email",onChange:function(e){return t.email=e.target.value}})}},{title:"Phone",dataIndex:"phone",key:"phone",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Phone",onChange:function(e){return t.phone=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return g.a.createElement(l.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return g.a.createElement(N.a,{checked:t===a.id,onChange:function(e){return i(a.id)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return g.a.createElement(k.a,{size:"",title:"Remove",type:"danger",onClick:function(){return o(t.id)}},g.a.createElement(T.a,{icon:"minus"}))}}],o=function(e){r((function(t){return t.filter((function(t){return t.id!==e}))}))};return g.a.createElement("div",null,g.a.createElement(V.a,{columns:d,pagination:!1,rowKey:"id",size:"small",dataSource:n}),g.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},g.a.createElement(k.a,{title:"Add Address",htmlType:"button",type:"primary",onClick:function(){r((function(e){return[].concat(Object(u.a)(e),[Object(c.a)(Object(c.a)({},a),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},g.a.createElement(T.a,{icon:"plus"}))))},w=function(e){var t=e.defaultShipping,a=e.initialAddressData,n=e.shippingAddresses,r=e.setShippingAddresses,i=e.setDefaultShipping,d=[{title:"Address 1",dataIndex:"address1",key:"address1",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Address 1",onChange:function(e){return t.address1=e.target.value}})}},{title:"Address 2",dataIndex:"address2",key:"address2",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Address 2",onChange:function(e){return t.address2=e.target.value}})}},{title:"Country",dataIndex:"country ",key:"country ",render:function(e,t){return g.a.createElement(p.a,{defaultValue:t.country,type:"text",placeholder:"Country",onChange:function(e){return t.country=e.target.value}})}},{title:"City",dataIndex:"city",key:"city",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"City",onChange:function(e){return t.city=e.target.value}})}},{title:"State",dataIndex:"state",key:"state",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"State",onChange:function(e){return t.state=e.target.value}})}},{title:"Zip Code",dataIndex:"zip_code",key:"zip_code",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Zip Code",onChange:function(e){return t.zip_code=e.target.value}})}},{title:"Fax",dataIndex:"fax",key:"fax",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Fax",onChange:function(e){return t.fax=e.target.value}})}},{title:"Email",dataIndex:"email",key:"email",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"email",placeholder:"Email",onChange:function(e){return t.email=e.target.value}})}},{title:"Phone",dataIndex:"phone",key:"phone",render:function(e,t){return g.a.createElement(p.a,{defaultValue:e,type:"text",placeholder:"Phone",onChange:function(e){return t.phone=e.target.value}})}},{title:"Status",dataIndex:"status",key:"status",align:"right",render:function(e,t){return g.a.createElement(l.a,{defaultChecked:e,title:"Status",onChange:function(e){return t.status=e}})}},{title:"Default",dataIndex:"isDefault",key:"isDefault",align:"right",render:function(e,a){return g.a.createElement(N.a,{name:"isDefault",checked:t===a.id,onChange:function(e){return i(a.id)}})}},{title:"Action",dataIndex:"action",key:"action",render:function(e,t){return g.a.createElement(k.a,{size:"",title:"Remove",type:"danger",onClick:function(){return o(t.id)}},g.a.createElement(T.a,{icon:"minus"}))}}],o=function(e){r((function(t){return t.filter((function(t){return t.id!==e}))}))};return g.a.createElement("div",null,g.a.createElement(V.a,{columns:d,pagination:!1,rowKey:"id",size:"small",dataSource:n}),g.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px",marginBottom:"10px"}},g.a.createElement(k.a,{title:"Add Address",htmlType:"button",type:"primary",onClick:function(){r((function(e){return[].concat(Object(u.a)(e),[Object(c.a)(Object(c.a)({},a),{},{id:(new Date).getTime()})])}))},style:{marginRight:".5em"}},g.a.createElement(T.a,{icon:"plus"}))))},z=["updatedAt","createdAt","__typename","type","isDefault"],F=["parent_id","isNew","id","isDefault"],q=["parent_id","isNew","isDefault","id"],R=p.a.TextArea;t.default=function(){Object(D.c)("vendor");var e=Object(v.useLocation)().search,t=j.a.parse(e),a=Object(v.useHistory)(),A=Object(f.useState)({data:[],isLoading:!0}),I=Object(m.a)(A,2),V=I[0],k=I[1],N=Object(f.useState)(!0),S=Object(m.a)(N,2),T=S[0],B=S[1],L=Object(f.useState)(!1),X=Object(m.a)(L,2),G=X[0],Z=X[1],U=Object(f.useState)(null),J=Object(m.a)(U,2),K=J[0],H=J[1],M=Object(f.useState)(null),Q=Object(m.a)(M,2),W=Q[0],Y=Q[1],$=s.a.useForm(),ee=Object(m.a)($,1)[0],te=Object(f.useState)(!1),ae=Object(m.a)(te,2),ne=ae[0],re=ae[1],ie=Object(f.useState)(null),le=Object(m.a)(ie,2),de=le[0],ue=le[1],oe=Object(f.useState)(!1),ce=Object(m.a)(oe,2),se=ce[0],me=ce[1],pe={id:(new Date).getTime(),parent_id:"",address1:"",address2:"",country:"",city:"",state:"",zip_code:"",email:"",fax:"",phone:"",status:!0,isDefault:!1,isNew:!0},fe=Object(f.useState)([pe]),ge=Object(m.a)(fe,2),he=ge[0],ye=ge[1],Ee=Object(f.useState)([pe]),be=Object(m.a)(Ee,2),ve=be[0],xe=be[1];Object(f.useEffect)((function(){(null===t||void 0===t?void 0:t.id)&&_.j.query({query:_.p.GET_SINGLE_VENDOR,variables:{query:{id:parseInt(t.id)}},context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}}).then((function(e){var t,a,n,r=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSingleVendor;if(null===r||void 0===r?void 0:r.status){pe.parent_id=null===r||void 0===r||null===(a=r.data)||void 0===a?void 0:a.id,k((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===r||void 0===r?void 0:r.data,error:""})}));var i=[],l=[];null===r||void 0===r||null===(n=r.data)||void 0===n||n.addresses.forEach((function(e){e.updatedAt,e.createdAt,e.__typename,e.type;var t,a=e.isDefault,n=Object(o.a)(e,z),d=Object(c.a)({isDefault:!1,isNew:!1,parent_id:null===r||void 0===r||null===(t=r.data)||void 0===t?void 0:t.id},n);return"billing"===e.type?(a&&H(e.id),i.push(d)):"shipping"===e.type?(a&&Y(e.id),l.push(d)):void 0})),ye(i),xe(l)}})).catch((function(e){k((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){k((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[null===t||void 0===t?void 0:t.id]);return Object(f.useEffect)((function(){if(ne){var e=he.map((function(e){e.parent_id;var t=e.isNew,a=e.id,n=(e.isDefault,Object(o.a)(e,F));return Object(c.a)(Object(c.a)({isDefault:K===a,parent_id:de,isNew:t},n),!t&&{id:a})})),t=ve.map((function(e){e.parent_id;var t=e.isNew,a=(e.isDefault,e.id),n=Object(o.a)(e,q);return Object(c.a)(Object(c.a)({isDefault:W===a,parent_id:de,isNew:t},n),!t&&{id:a})}));["billing","shipping"].forEach((function(n){Z(!0),_.j.mutate({mutation:_.o.UPDATE_VENDOR_ADDRESS,variables:{data:{ref_id:de,type:n,addresses:Object(u.a)("billing"===n?e:t)}},context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.updateVendorAddress;null===a||void 0===a||a.status})).catch((function(e){me(!0)})).finally((function(e){Z(!1),"shipping"===n&&(se||(C.b.success("Vendor Updated Successfully."),setTimeout((function(){a.push("/admin/vendor/list")}),[2e3])))}))}))}}),[ne]),g.a.createElement(g.a.Fragment,null,g.a.createElement(h.a,{title:t.id?"Manage Vendor | Edit ".concat(V.data.company_name?"(".concat(V.data.company_name,")"):""):"Add Vendor"}),g.a.createElement(y.b,null,g.a.createElement(n.a,{gutter:25},g.a.createElement(r.a,{sm:24,xs:24},g.a.createElement(E.a,{headless:!0},t.id&&V.isLoading?g.a.createElement("div",{div:!0,className:"spin"},g.a.createElement(d.a,null)):g.a.createElement(s.a,{style:{width:"100%"},form:ee,name:"addVendor",onFinish:function(e){var a=Object(c.a)(Object(c.a)({},e),{},{status:T}),n=he.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,i=e.state,l=e.zip_code,d=e.email,u=e.fax,o=e.phone,c=e.address2;return!(t&&a&&n&&r&&i&&l&&d&&u&&o&&c)}));if(null===n||void 0===n?void 0:n.id)return C.b.warning("Enter Billing Address Correctly!");var r=ve.find((function(e){var t=e.id,a=e.address1,n=e.country,r=e.city,i=e.state,l=e.zip_code,d=e.email,u=e.fax,o=e.phone,c=e.address2;return!(t&&a&&n&&r&&i&&l&&d&&u&&o&&c)}));if(null===r||void 0===r?void 0:r.id)return C.b.warning("Enter Shipping Address Correctly!");Z(!0),t.id?_.j.mutate({mutation:_.o.UPDATE_VENDOR,variables:{data:Object(c.a)(Object(c.a)({},a),{},{id:parseInt(t.id)})},context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}}}).then((function(e){var a,n=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.updateVendor;if(!n.status)return C.b.error(n.message);ue(parseInt(null===t||void 0===t?void 0:t.id)),re(!0)})).catch((function(e){console.log("got error on update vendor",e),me(!0)})).finally((function(){Z(!1)})):_.j.mutate({mutation:_.o.CREATE_VENDOR,variables:{data:a},context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}},refetchQueries:[{query:_.p.GET_ALL_VENDOR,context:{headers:{TENANTID:"100001",Authorization:O.a.get("psp_t")}},fetchPolicy:"network-only"},["getAllVendor"]]}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.createVendor;if(!a.status)return C.b.error(a.message);ue(parseInt(a.id)),re(!0)})).catch((function(e){Z(!1),console.log("got error on add vendor",e),me(!0)}))},onFinishFailed:function(e){return console.log("form error info:\n",e)},labelCol:{span:4},initialValues:t.id?{company_name:V.data.company_name,contact_person:V.data.contact_person,email:V.data.email,description:V.data.description,phone_number:V.data.phone_number,EIN_no:V.data.EIN_no,TAX_ID:V.data.TAX_ID,FAX_no:V.data.FAX_no}:null},g.a.createElement(i.a,null,g.a.createElement(i.a.TabPane,{tab:"General",key:"general"},g.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Vendor Company Name"}],name:"company_name",label:"Company Name"},g.a.createElement(p.a,{placeholder:"Enter Vendor Company Name"})),g.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Vendor Contact Person"}],label:"Contact Person",name:"contact_person"},g.a.createElement(p.a,{placeholder:"Enter Contact Person"})),g.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Email"}],name:"email",label:"Email"},g.a.createElement(p.a,{placeholder:"Enter Vendor Email",type:"email"})),g.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Phone Number"}],name:"phone_number",label:"Phone"},g.a.createElement(p.a,{placeholder:"Enter Vendor Phone Number"})),g.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Fax No"}],name:"FAX_no",label:"Fax"},g.a.createElement(p.a,{placeholder:"Enter Vendor Fax"})),g.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter EIN No"}],name:"EIN_no",label:"EIN"},g.a.createElement(p.a,{placeholder:"Enter Vendor EIN Number"})),g.a.createElement(s.a.Item,{rules:[{required:!0,max:30,message:"Please enter Fax Id"}],name:"TAX_ID",label:"Tax Id"},g.a.createElement(p.a,{placeholder:"Enter Vendor Tax Id"})),g.a.createElement(s.a.Item,{rules:[{required:!0,message:"Please enter Vendor Description"}],name:"description",label:"Description"},g.a.createElement(R,{rows:4,placeholder:"Enter Vendor Description"})),g.a.createElement(s.a.Item,{label:"Vendor Status"},g.a.createElement(l.a,{checked:T,onChange:function(e){return B(e)}}))),g.a.createElement(i.a.TabPane,{tab:"Billing Address",key:"billing_address"},g.a.createElement(P,{defaultBilling:K,initialAddressData:pe,billingAddresses:he,setBillingAddresses:ye,setDefaultBilling:H})),g.a.createElement(i.a.TabPane,{tab:"Shipping Address",key:"shipping_address"},g.a.createElement(w,{defaultShipping:W,initialAddressData:pe,shippingAddresses:ve,setShippingAddresses:xe,setDefaultShipping:Y}))),g.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"3em"}},g.a.createElement(s.a.Item,null,g.a.createElement(b.a,{loading:G,size:"default",htmlType:"submit",type:"primary",raised:!0},G?"Processing":"Save"),g.a.createElement(x.b,{to:"/admin/vendor/list"},g.a.createElement(b.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
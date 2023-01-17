(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[49],{1020:function(e,t,a){"use strict";a.r(t);a(129);var n=a(60),r=(a(164),a(33)),l=(a(126),a(38)),d=(a(127),a(25)),o=(a(103),a(32)),c=(a(149),a(84)),i=(a(181),a(82)),u=a(6),s=a(13),m=(a(650),a(653)),p=a(0),f=a.n(p),b=a(22),h=a.n(b),E=a(128),y=a(109),v=a(108),O=a(47),g=a(12),j=a(110),D=a.n(j),S=a(717),_=a(208),w=a(85),I=a(26),A=a(20),T=a(54),k=a(168),x=a(234),P=a.n(x),U=a(385),C=a.n(U),N=a(331),M=m.a.RangePicker,z=!1;t.default=function(){var e;Object(A.d)("order");var t=Object(p.useState)({data:[],loading:!1,error:""}),a=Object(s.a)(t,2),m=a[0],b=a[1],j=Object(T.d)((function(e){return e.auth.token})),x=Object(p.useState)(!1),U=Object(s.a)(x,2),L=U[0],Y=U[1],R=Object(p.useState)(!1),q=Object(s.a)(R,2),F=q[0],Q=q[1],V=Object(p.useState)({data:[],loading:!1,error:""}),G=Object(s.a)(V,2),B=G[0],H=G[1],W=Object(p.useState)({data:[],loading:!1,error:""}),J=Object(s.a)(W,2),K=J[0],$=J[1],X=Object(p.useState)({data:[],loading:!1,error:""}),Z=Object(s.a)(X,2),ee=Z[0],te=Z[1],ae=Object(p.useState)(!0),ne=Object(s.a)(ae,2),re=ne[0],le=ne[1],de=Object(p.useState)(null),oe=Object(s.a)(de,2),ce=oe[0],ie=oe[1],ue=Object(p.useState)([]),se=Object(s.a)(ue,2),me=se[0],pe=se[1],fe=Object(p.useState)(null),be=Object(s.a)(fe,2),he=be[0],Ee=be[1],ye=Object(p.useState)({paymentmethods:[],productIds:[],statuses:[],updatedby:[],searchQuery:"",orderEntryStartDate:"",orderEntryEndDate:"",orderUpdatedStartDate:"",orderUpdatedEndDate:""}),ve=Object(s.a)(ye,2),Oe=ve[0],ge=ve[1],je=[{title:"Order Id",dataIndex:"id",key:"id",width:100,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Customer",dataIndex:["customer","first_name"],key:"first_name",width:150,render:function(e,t){return"".concat(e," ").concat(t.customer.last_name)},sorter:function(e,t){return e.first_name>t.first_name?1:-1}},{title:"Customer Email",dataIndex:["customer","email"],key:"email",width:200,ellipsis:!0,sorter:function(e,t){return e.email>t.email?1:-1}},{title:"Total Amount",dataIndex:"total",key:"total",align:"center",width:120,render:function(e){return"$".concat(e)},sorter:function(e,t){return e.total>t.total?1:-1}},{title:"Status",dataIndex:["orderStatus","name"],key:"name",align:"center",width:150,render:function(e){return f.a.createElement("span",{style:{borderRadius:"4em",padding:".5em 1.5em",color:"Pending"===e?"#feaf00":"Completed"===e?"#2fb083":"",background:"Pending"===e?"#fef6e6":"Completed"===e?"#ebf9f4":""}},e)},sorter:function(e,t){return e.name>t.name?1:-1}},{title:"Payment Method",dataIndex:["paymentmethod","name"],key:"name",width:150,sorter:function(e,t){return e.name>t.name?1:-1}},{title:"Date Added",dataIndex:"createdAt",key:"createdAt",align:"center",width:150,sorter:function(e,t){return e.createdAt===t.createdAt?0:e.createdAt?-1:1},render:function(e,t){return f.a.createElement("span",{className:"status-text"},f.a.createElement(P.a,{format:"DD-MMM-YYYY"},parseInt(e)))}},{title:"Date Updated",dataIndex:"updatedAt",key:"updatedAt",align:"center",width:150,sorter:function(e,t){return e.updatedAt===t.updatedAt?0:e.updatedAt?-1:1},render:function(e,t){return f.a.createElement("span",{className:"status-text"},f.a.createElement(P.a,{format:"DD-MMM-YYYY"},parseInt(e)))}},{title:"View",dataIndex:"id",width:70,align:"right",key:"id",render:function(e,t){return f.a.createElement(f.a.Fragment,null,f.a.createElement(g.b,{to:"/admin/order/view?id=".concat(e)},f.a.createElement(D.a,{name:"eye",style:{margin:".5em 1em",color:"rgb(46, 204, 113)"}})))}},{title:"Action",dataIndex:"action",width:140,align:"center",key:"createdAt",render:function(e,t){return f.a.createElement(f.a.Fragment,null,f.a.createElement(i.a,{placement:"topLeft",title:"Edit Order",color:"cyan"},f.a.createElement(g.b,{to:"/admin/order/edit/".concat(t.id)},f.a.createElement(D.a,{name:"edit",style:{margin:".5em 1em",color:"#5F63F2"}}))),f.a.createElement(i.a,{placement:"topLeft",title:"Make Purchase Order",color:"cyan"},f.a.createElement(g.b,{to:"/admin/po/add?order_id=".concat(t.id)},f.a.createElement(D.a,{name:"cart-plus",style:{margin:".5em 1em",color:"#e67e22"}}))))}}],De=function(e,t){return[C()(e,"YYYY-MM-DD"),C()(t,"YYYY-MM-DD")]};return Object(p.useEffect)((function(){I.j.query({query:N.a.GET_PAYMENT_METHOD_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getPaymentMethodListPublic;a.status&&H(a)})).catch((function(e){H((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){H((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))})),I.j.query({query:k.a.GET_ORDER_STATUS_LIST,context:{headers:{TENANTID:"100001",Authorization:j}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getOrderStatusList;a.status&&$(a)})).catch((function(e){$((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){$((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))})),I.j.query({query:k.a.GET_ORDER_UPDATE_ADMIN_LIST,context:{headers:{TENANTID:"100001",Authorization:j}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getOrderUpdateAdminList;a.status&&te(a)})).catch((function(e){te((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){te((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))})),z&&(Oe.paymentmethods.length>0||Oe.productIds.length>0||Oe.statuses.length>0||Oe.updatedby.length>0||""!==Oe.searchQuery||""!==Oe.orderEntryEndDate||""!==Oe.orderEntryStartDate||""!==Oe.orderUpdatedEndDate||""!==Oe.orderUpdatedStartDate?le(!1):le(!0)),z=!0}),[Oe]),f.a.createElement(f.a.Fragment,null,f.a.createElement(E.a,{title:"List Orders",buttons:[f.a.createElement("div",{key:"1",className:"page-header-actions"},f.a.createElement(O.a,{size:"small",type:"white",onClick:function(){return Y((function(e){return!e}))}},f.a.createElement(h.a,{icon:"filter"}),"Filter"),f.a.createElement(O.a,{size:"small",type:"white",onClick:function(){ie(null),le(!0),Ee(null),ge({paymentmethods:[],productIds:[],statuses:[],updatedby:[],searchQuery:"",orderEntryStartDate:"",orderEntryEndDate:"",orderUpdatedStartDate:"",orderUpdatedEndDate:""})}},f.a.createElement(S.a,null),"Reset Filter"),f.a.createElement(g.b,{to:"/admin/order/add"},f.a.createElement(O.a,{size:"small",title:"Add Order",type:"primary"},f.a.createElement(h.a,{icon:"plus"}))))]}),f.a.createElement(y.b,null,f.a.createElement(l.a,{gutter:25},f.a.createElement(d.a,{sm:24,xs:24},f.a.createElement(v.a,{headless:!0},m.loading?f.a.createElement("div",{className:"spin"},f.a.createElement(c.a,null)):m.error?f.a.createElement("p",null,m.error):f.a.createElement(f.a.Fragment,null,f.a.createElement(l.a,{gutter:25},f.a.createElement(d.a,{span:18},f.a.createElement(o.a,{style:{height:"42px"},placeholder:"Search Order By Customer...",prefix:f.a.createElement(_.a,null),value:null===Oe||void 0===Oe?void 0:Oe.searchQuery,onChange:function(e){e.persist();var t=e.target.value;ge((function(e){return Object(u.a)(Object(u.a)({},e),{},{searchQuery:t})}))}})),f.a.createElement(d.a,{span:6},f.a.createElement(O.a,{style:{height:"42px"},size:"large",type:"primary",disabled:re,onClick:function(){var e,t,a,n,r;b((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!0})})),I.j.query({query:k.a.GET_ALL_ORDER,variables:{query:{searchQuery:null!==(e=Oe.searchQuery)&&void 0!==e?e:"",productIds:Oe.productIds.length?Oe.productIds:null,paymentmethods:Oe.paymentmethods.length?Oe.paymentmethods:null,statuses:Oe.statuses.length?Oe.statuses:null,updatedby:Oe.updatedby.length?Oe.updatedby:null,orderEntryStartDate:null!==(t=Oe.orderEntryStartDate)&&void 0!==t?t:"",orderEntryEndDate:null!==(a=Oe.orderEntryEndDate)&&void 0!==a?a:"",orderUpdatedStartDate:null!==(n=Oe.orderUpdatedStartDate)&&void 0!==n?n:"",orderUpdatedEndDate:null!==(r=Oe.orderUpdatedEndDate)&&void 0!==r?r:""}},context:{headers:{TENANTID:"100001",Authorization:j}},fetchPolicy:"network-only"}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getOrderlistAdmin;a.status&&b(a)})).catch((function(e){b((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){b((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})})),Q(!F)}))}},"Search"))),f.a.createElement("br",null),f.a.createElement("br",null),L&&f.a.createElement("div",{style:{marginBottom:"2.5em"}},f.a.createElement(l.a,{gutter:16},f.a.createElement(d.a,{span:8},"Product: ",f.a.createElement("br",null),f.a.createElement(r.a,{style:{width:"100%"},placeholder:"Select Product",options:me,showSearch:!0,allowClear:!0,optionFilterProp:"label",size:"middle",mode:"multiple",value:null===Oe||void 0===Oe?void 0:Oe.productIds,onDeselect:function(e){return ge((function(t){return Object(u.a)(Object(u.a)({},t),{},{productIds:t.productIds.filter((function(t){return t!==e}))})}))},onSelect:function(e){ge((function(t){return Object(u.a)(Object(u.a)({},t),{},{productIds:Oe.productIds.concat(parseInt(e))})}))},onSearch:function(e){e.length>3?I.j.query({query:N.a.SEARCH_PRODUCT,variables:{query:{searchQuery:e}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSearchedProducts;a.status&&pe(a.data.map((function(e){return Object(u.a)({label:(null===e||void 0===e?void 0:e.prod_name)+(null===e||void 0===e?void 0:e.prod_slug)+(null===e||void 0===e?void 0:e.prod_sku)+(null===e||void 0===e?void 0:e.prod_partnum)+(null===e||void 0===e?void 0:e.mfg_build_part_number),value:null===e||void 0===e?void 0:e.id},e)})))})):pe([])}})),f.a.createElement(d.a,{span:8},"Payment Method: ",f.a.createElement("br",null),f.a.createElement(r.a,{style:{width:"100%"},placeholder:B.loading?"Loading..":"Select Payment Method",size:"middle",mode:"multiple",optionFilterProp:"label",value:null===Oe||void 0===Oe?void 0:Oe.paymentmethods,onDeselect:function(e){return ge((function(t){return Object(u.a)(Object(u.a)({},t),{},{paymentmethods:t.paymentmethods.filter((function(t){return t!==e}))})}))},onSelect:function(e){ge((function(t){return Object(u.a)(Object(u.a)({},t),{},{paymentmethods:Oe.paymentmethods.concat(parseInt(e))})}))},options:null===B||void 0===B?void 0:B.data.map((function(e){return{label:e.name,value:e.id}}))})),f.a.createElement(d.a,{span:8},"Order Status : ",f.a.createElement("br",null),f.a.createElement(r.a,{style:{width:"100%"},placeholder:K.loading?"Loading..":"Select Order Status",size:"middle",mode:"multiple",optionFilterProp:"label",value:null===Oe||void 0===Oe?void 0:Oe.statuses,onDeselect:function(e){return ge((function(t){return Object(u.a)(Object(u.a)({},t),{},{statuses:t.statuses.filter((function(t){return t!==e}))})}))},onSelect:function(e){ge((function(t){return Object(u.a)(Object(u.a)({},t),{},{statuses:Oe.statuses.concat(parseInt(e))})}))},options:null===K||void 0===K?void 0:K.data.map((function(e){return{label:e.name,value:e.id}}))}))),f.a.createElement(l.a,{gutter:16,style:{marginTop:".5em"}},f.a.createElement(d.a,{span:8},"Updated By: ",f.a.createElement("br",null),f.a.createElement(r.a,{style:{width:"100%"},size:"middle",mode:"multiple",value:null===Oe||void 0===Oe?void 0:Oe.updatedby,onDeselect:function(e){return ge((function(t){return Object(u.a)(Object(u.a)({},t),{},{updatedby:t.updatedby.filter((function(t){return t!==e}))})}))},placeholder:ee.loading?"Loading...":"Select Admins..",options:null===ee||void 0===ee||null===(e=ee.data)||void 0===e?void 0:e.map((function(e){return{label:e.first_name+" "+e.last_name,value:e.id}})),onSelect:function(e){ge((function(t){return Object(u.a)(Object(u.a)({},t),{},{updatedby:Oe.updatedby.concat(parseInt(e))})}))}})),f.a.createElement(d.a,{span:8},"Date Added: ",f.a.createElement("br",null),f.a.createElement(M,{style:{height:"40px",width:"100%"},size:"small",allowClear:!0,picker:"date",value:""!==ce?ce:"",onChange:function(e){e?(ge((function(t){var a,n;return Object(u.a)(Object(u.a)({},t),{},{orderEntryStartDate:null!==(a=e[0]._d)&&void 0!==a?a:"",orderEntryEndDate:null!==(n=e[1]._d)&&void 0!==n?n:""})})),ie(De(e[0],e[1]))):ie(null)}})),f.a.createElement(d.a,{span:8},"Date Updated: ",f.a.createElement("br",null),f.a.createElement(M,{style:{height:"40px",width:"100%"},size:"small",allowClear:!0,picker:"date",value:""!==he?he:"",onChange:function(e){e?(ge((function(t){var a,n;return Object(u.a)(Object(u.a)({},t),{},{orderUpdatedStartDate:null!==(a=e[0]._d)&&void 0!==a?a:"",orderUpdatedEndDate:null!==(n=e[1]._d)&&void 0!==n?n:""})})),Ee(De(e[0],e[1]))):Ee(null)}})))),f.a.createElement("span",{className:"psp_list"},f.a.createElement(n.a,{className:"table-responsive",columns:je,rowKey:"id",size:"small",dataSource:(null===m||void 0===m?void 0:m.data)?m.data:[],rowClassName:function(e,t){return t%2===0?"":"altTableClass"},pagination:{defaultPageSize:w.a.ORDER_PER_PAGE,total:(null===m||void 0===m?void 0:m.data)?m.data.length:0,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}},717:function(e,t,a){"use strict";var n=a(3),r=a(0),l={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0011.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 00-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8zm752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 00-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8z"}}]},name:"retweet",theme:"outlined"},d=a(17),o=function(e,t){return r.createElement(d.a,Object(n.a)(Object(n.a)({},e),{},{ref:t,icon:l}))};o.displayName="RetweetOutlined";t.a=r.forwardRef(o)}}]);
//# sourceMappingURL=49.e22c9b21.chunk.js.map
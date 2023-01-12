(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[28],{1013:function(e,t,a){"use strict";a.r(t);a(133);var n=a(71),r=(a(145),a(30)),d=(a(143),a(68)),l=(a(144),a(52)),o=(a(115),a(39)),c=(a(132),a(74)),u=(a(203),a(104)),i=a(7),s=a(14),m=(a(630),a(633)),p=a(0),b=a.n(p),f=a(19),h=a.n(f),y=a(120),E=a(101),g=a(99),O=a(100),v=a(12),j=a(103),S=a.n(j),_=a(703),D=a(195),I=a(122),A=a(28),w=a(23),T=a(47),P=a(308),C=a(218),M=a.n(C),q=a(370),x=a.n(q),k=a(650),U=m.a.RangePicker,L=!1;t.default=function(){var e;Object(w.c)("order");var t=Object(p.useState)({data:[],loading:!1,error:""}),a=Object(s.a)(t,2),m=a[0],f=a[1],j=Object(T.d)((function(e){return e.auth.token})),C=Object(p.useState)(!1),q=Object(s.a)(C,2),N=q[0],R=q[1],Y=Object(p.useState)(!1),z=Object(s.a)(Y,2),F=z[0],G=z[1],H=Object(p.useState)({data:[],loading:!1,error:""}),B=Object(s.a)(H,2),Q=B[0],$=B[1],V=Object(p.useState)({data:[],loading:!1,error:""}),W=Object(s.a)(V,2),J=W[0],K=W[1],X=Object(p.useState)({data:[],loading:!1,error:""}),Z=Object(s.a)(X,2),ee=Z[0],te=Z[1],ae=Object(p.useState)(!0),ne=Object(s.a)(ae,2),re=ne[0],de=ne[1],le=Object(p.useState)(null),oe=Object(s.a)(le,2),ce=oe[0],ue=oe[1],ie=Object(p.useState)([]),se=Object(s.a)(ie,2),me=se[0],pe=se[1],be=Object(p.useState)(null),fe=Object(s.a)(be,2),he=fe[0],ye=fe[1],Ee=Object(p.useState)({paymentmethods:[],productIds:[],statuses:[],updatedby:[],searchQuery:"",orderEntryStartDate:"",orderEntryEndDate:"",orderUpdatedStartDate:"",orderUpdatedEndDate:""}),ge=Object(s.a)(Ee,2),Oe=ge[0],ve=ge[1],je=[{title:"Order Id",dataIndex:"id",key:"id",width:100,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Customer",dataIndex:["customer","first_name"],key:"first_name",width:150,render:function(e,t){return"".concat(e," ").concat(t.customer.last_name)},sorter:function(e,t){return e.first_name>t.first_name?1:-1}},{title:"Customer Email",dataIndex:["customer","email"],key:"email",width:200,ellipsis:!0,sorter:function(e,t){return e.email>t.email?1:-1}},{title:"Total Amount",dataIndex:"total",key:"total",align:"center",width:120,render:function(e){return"$".concat(e)},sorter:function(e,t){return e.total>t.total?1:-1}},{title:"Status",dataIndex:["orderStatus","name"],key:"name",align:"center",width:150,render:function(e){return b.a.createElement("span",{style:{borderRadius:"4em",padding:".5em 1.5em",color:"Pending"===e?"#feaf00":"Completed"===e?"#2fb083":"",background:"Pending"===e?"#fef6e6":"Completed"===e?"#ebf9f4":""}},e)},sorter:function(e,t){return e.name>t.name?1:-1}},{title:"Payment Method",dataIndex:["paymentmethod","name"],key:"name",width:150,sorter:function(e,t){return e.name>t.name?1:-1}},{title:"Date Added",dataIndex:"createdAt",key:"createdAt",align:"center",width:150,sorter:function(e,t){return e.createdAt===t.createdAt?0:e.createdAt?-1:1},render:function(e,t){return b.a.createElement("span",{className:"status-text"},b.a.createElement(M.a,{format:"DD-MMM-YYYY"},parseInt(e)))}},{title:"Date Updated",dataIndex:"updatedAt",key:"updatedAt",align:"center",width:150,sorter:function(e,t){return e.updatedAt===t.updatedAt?0:e.updatedAt?-1:1},render:function(e,t){return b.a.createElement("span",{className:"status-text"},b.a.createElement(M.a,{format:"DD-MMM-YYYY"},parseInt(e)))}},{title:"View",dataIndex:"id",width:70,align:"right",key:"id",render:function(e,t){return b.a.createElement(b.a.Fragment,null,b.a.createElement(v.b,{to:"/admin/order/view?id=".concat(e)},b.a.createElement(S.a,{name:"eye",style:{margin:".5em 1em",color:"rgb(46, 204, 113)"}})))}},{title:"Action",dataIndex:"action",width:140,align:"center",key:"createdAt",render:function(e,t){return b.a.createElement(b.a.Fragment,null,b.a.createElement(u.a,{placement:"topLeft",title:"Edit Order",color:"cyan"},b.a.createElement(v.b,{to:"/admin/order/edit/".concat(t.id)},b.a.createElement(S.a,{name:"edit",style:{margin:".5em 1em",color:"#5F63F2"}}))),b.a.createElement(u.a,{placement:"topLeft",title:"Make Purchase Order",color:"cyan"},b.a.createElement(v.b,{to:"/admin/po/add?order_id=".concat(t.id)},b.a.createElement(S.a,{name:"cart-plus",style:{margin:".5em 1em",color:"#e67e22"}}))))}}],Se=function(e,t){return[x()(e,"YYYY-MM-DD"),x()(t,"YYYY-MM-DD")]};return Object(p.useEffect)((function(){A.j.query({query:k.a.GET_PAYMENT_METHOD_LIST,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getPaymentMethodListPublic;a.status&&$(a)})).catch((function(e){$((function(e){return Object(i.a)(Object(i.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){$((function(e){return Object(i.a)(Object(i.a)({},e),{},{loading:!1})}))})),A.j.query({query:P.a.GET_ORDER_STATUS_LIST,context:{headers:{TENANTID:"100001",Authorization:j}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getOrderStatusList;a.status&&K(a)})).catch((function(e){K((function(e){return Object(i.a)(Object(i.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){K((function(e){return Object(i.a)(Object(i.a)({},e),{},{loading:!1})}))})),A.j.query({query:P.a.GET_ORDER_UPDATE_ADMIN_LIST,context:{headers:{TENANTID:"100001",Authorization:j}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getOrderUpdateAdminList;a.status&&te(a)})).catch((function(e){te((function(e){return Object(i.a)(Object(i.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){te((function(e){return Object(i.a)(Object(i.a)({},e),{},{loading:!1})}))})),L&&(Oe.paymentmethods.length>0||Oe.productIds.length>0||Oe.statuses.length>0||Oe.updatedby.length>0||""!==Oe.searchQuery||""!==Oe.orderEntryEndDate||""!==Oe.orderEntryStartDate||""!==Oe.orderUpdatedEndDate||""!==Oe.orderUpdatedStartDate?de(!1):de(!0)),L=!0}),[Oe]),b.a.createElement(b.a.Fragment,null,b.a.createElement(y.a,{title:"List Orders",buttons:[b.a.createElement("div",{key:"1",className:"page-header-actions"},b.a.createElement(O.a,{size:"small",type:"white",onClick:function(){return R((function(e){return!e}))}},b.a.createElement(h.a,{icon:"filter"}),"Filter"),b.a.createElement(O.a,{size:"small",type:"white",onClick:function(){ue(null),de(!0),ye(null),ve({paymentmethods:[],productIds:[],statuses:[],updatedby:[],searchQuery:"",orderEntryStartDate:"",orderEntryEndDate:"",orderUpdatedStartDate:"",orderUpdatedEndDate:""})}},b.a.createElement(_.a,null),"Reset Filter"),b.a.createElement(v.b,{to:"/admin/order/add"},b.a.createElement(O.a,{size:"small",title:"Add Order",type:"primary"},b.a.createElement(h.a,{icon:"plus"}))))]}),b.a.createElement(E.b,null,b.a.createElement(d.a,{gutter:25},b.a.createElement(l.a,{sm:24,xs:24},b.a.createElement(g.a,{headless:!0},m.loading?b.a.createElement("div",{className:"spin"},b.a.createElement(c.a,null)):m.error?b.a.createElement("p",null,m.error):b.a.createElement(b.a.Fragment,null,b.a.createElement(d.a,{gutter:25},b.a.createElement(l.a,{span:18},b.a.createElement(o.a,{style:{height:"42px"},placeholder:"Search Order By Customer...",prefix:b.a.createElement(D.a,null),value:null===Oe||void 0===Oe?void 0:Oe.searchQuery,onChange:function(e){e.persist();var t=e.target.value;ve((function(e){return Object(i.a)(Object(i.a)({},e),{},{searchQuery:t})}))}})),b.a.createElement(l.a,{span:6},b.a.createElement(O.a,{style:{height:"42px"},size:"large",type:"primary",disabled:re,onClick:function(){var e,t,a,n,r;f((function(e){return Object(i.a)(Object(i.a)({},e),{},{loading:!0})})),A.j.query({query:P.a.GET_ALL_ORDER,variables:{query:{searchQuery:null!==(e=Oe.searchQuery)&&void 0!==e?e:"",productIds:Oe.productIds.length?Oe.productIds:null,paymentmethods:Oe.paymentmethods.length?Oe.paymentmethods:null,statuses:Oe.statuses.length?Oe.statuses:null,updatedby:Oe.updatedby.length?Oe.updatedby:null,orderEntryStartDate:null!==(t=Oe.orderEntryStartDate)&&void 0!==t?t:"",orderEntryEndDate:null!==(a=Oe.orderEntryEndDate)&&void 0!==a?a:"",orderUpdatedStartDate:null!==(n=Oe.orderUpdatedStartDate)&&void 0!==n?n:"",orderUpdatedEndDate:null!==(r=Oe.orderUpdatedEndDate)&&void 0!==r?r:""}},context:{headers:{TENANTID:"100001",Authorization:j}},fetchPolicy:"network-only"}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getOrderlistAdmin;a.status&&f(a)})).catch((function(e){f((function(e){return Object(i.a)(Object(i.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){f((function(e){return Object(i.a)(Object(i.a)({},e),{},{loading:!1})})),G(!F)}))}},"Search"))),b.a.createElement("br",null),b.a.createElement("br",null),N&&b.a.createElement("div",{style:{marginBottom:"2.5em"}},b.a.createElement(d.a,{gutter:16},b.a.createElement(l.a,{span:8},"Product: ",b.a.createElement("br",null),b.a.createElement(r.a,{style:{width:"100%"},placeholder:"Select Product",options:me,showSearch:!0,allowClear:!0,optionFilterProp:"label",size:"middle",mode:"multiple",value:null===Oe||void 0===Oe?void 0:Oe.productIds,onDeselect:function(e){return ve((function(t){return Object(i.a)(Object(i.a)({},t),{},{productIds:t.productIds.filter((function(t){return t!==e}))})}))},onSelect:function(e){ve((function(t){return Object(i.a)(Object(i.a)({},t),{},{productIds:Oe.productIds.concat(parseInt(e))})}))},onSearch:function(e){e.length>3?A.j.query({query:k.a.SEARCH_PRODUCT,variables:{query:{searchQuery:e}},context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getSearchedProducts;a.status&&pe(a.data.map((function(e){return Object(i.a)({label:(null===e||void 0===e?void 0:e.prod_name)+(null===e||void 0===e?void 0:e.prod_slug)+(null===e||void 0===e?void 0:e.prod_sku)+(null===e||void 0===e?void 0:e.prod_partnum)+(null===e||void 0===e?void 0:e.mfg_build_part_number),value:null===e||void 0===e?void 0:e.id},e)})))})):pe([])}})),b.a.createElement(l.a,{span:8},"Payment Method: ",b.a.createElement("br",null),b.a.createElement(r.a,{style:{width:"100%"},placeholder:Q.loading?"Loading..":"Select Payment Method",size:"middle",mode:"multiple",optionFilterProp:"label",value:null===Oe||void 0===Oe?void 0:Oe.paymentmethods,onDeselect:function(e){return ve((function(t){return Object(i.a)(Object(i.a)({},t),{},{paymentmethods:t.paymentmethods.filter((function(t){return t!==e}))})}))},onSelect:function(e){ve((function(t){return Object(i.a)(Object(i.a)({},t),{},{paymentmethods:Oe.paymentmethods.concat(parseInt(e))})}))},options:null===Q||void 0===Q?void 0:Q.data.map((function(e){return{label:e.name,value:e.id}}))})),b.a.createElement(l.a,{span:8},"Order Status : ",b.a.createElement("br",null),b.a.createElement(r.a,{style:{width:"100%"},placeholder:J.loading?"Loading..":"Select Order Status",size:"middle",mode:"multiple",optionFilterProp:"label",value:null===Oe||void 0===Oe?void 0:Oe.statuses,onDeselect:function(e){return ve((function(t){return Object(i.a)(Object(i.a)({},t),{},{statuses:t.statuses.filter((function(t){return t!==e}))})}))},onSelect:function(e){ve((function(t){return Object(i.a)(Object(i.a)({},t),{},{statuses:Oe.statuses.concat(parseInt(e))})}))},options:null===J||void 0===J?void 0:J.data.map((function(e){return{label:e.name,value:e.id}}))}))),b.a.createElement(d.a,{gutter:16,style:{marginTop:".5em"}},b.a.createElement(l.a,{span:8},"Updated By: ",b.a.createElement("br",null),b.a.createElement(r.a,{style:{width:"100%"},size:"middle",mode:"multiple",value:null===Oe||void 0===Oe?void 0:Oe.updatedby,onDeselect:function(e){return ve((function(t){return Object(i.a)(Object(i.a)({},t),{},{updatedby:t.updatedby.filter((function(t){return t!==e}))})}))},placeholder:ee.loading?"Loading...":"Select Admins..",options:null===ee||void 0===ee||null===(e=ee.data)||void 0===e?void 0:e.map((function(e){return{label:e.first_name+" "+e.last_name,value:e.id}})),onSelect:function(e){ve((function(t){return Object(i.a)(Object(i.a)({},t),{},{updatedby:Oe.updatedby.concat(parseInt(e))})}))}})),b.a.createElement(l.a,{span:8},"Date Added: ",b.a.createElement("br",null),b.a.createElement(U,{style:{height:"40px",width:"100%"},size:"small",allowClear:!0,picker:"date",value:""!==ce?ce:"",onChange:function(e){e?(ve((function(t){var a,n;return Object(i.a)(Object(i.a)({},t),{},{orderEntryStartDate:null!==(a=e[0]._d)&&void 0!==a?a:"",orderEntryEndDate:null!==(n=e[1]._d)&&void 0!==n?n:""})})),ue(Se(e[0],e[1]))):ue(null)}})),b.a.createElement(l.a,{span:8},"Date Updated: ",b.a.createElement("br",null),b.a.createElement(U,{style:{height:"40px",width:"100%"},size:"small",allowClear:!0,picker:"date",value:""!==he?he:"",onChange:function(e){e?(ve((function(t){var a,n;return Object(i.a)(Object(i.a)({},t),{},{orderUpdatedStartDate:null!==(a=e[0]._d)&&void 0!==a?a:"",orderUpdatedEndDate:null!==(n=e[1]._d)&&void 0!==n?n:""})})),ye(Se(e[0],e[1]))):ye(null)}})))),b.a.createElement("span",{className:"psp_list"},b.a.createElement(n.a,{className:"table-responsive",columns:je,rowKey:"id",size:"small",dataSource:(null===m||void 0===m?void 0:m.data)?m.data:[],rowClassName:function(e,t){return t%2===0?"":"altTableClass"},pagination:{defaultPageSize:I.a.ORDER_PER_PAGE,total:(null===m||void 0===m?void 0:m.data)?m.data.length:0,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}},650:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n,r,d,l,o,c=a(8),u=a(16),i={SEARCH_PRODUCT:Object(u.d)(n||(n=Object(c.a)(["\n    query getSearchedProducts($query: SearchProductInput) {\n      getSearchedProducts(query: $query) {\n        message\n        status\n        data {\n          id\n          prod_name\n          prod_slug\n          prod_regular_price\n          prod_sale_price\n          prod_thumbnail\n        }\n      }\n    }\n  "]))),GET_SHIPPING_METHOD_LIST:Object(u.d)(r||(r=Object(c.a)(["\n    query getShippingMethodListPublic {\n      getShippingMethodListPublic {\n        message\n        status\n        data {\n          id\n          name\n          description\n          status\n        }\n      }\n    }\n  "]))),GET_COUPON_BY_CODE:Object(u.d)(d||(d=Object(c.a)(["\n    query getSingleCouponByCode($query: GetSingleCouponByCodeInput) {\n      getSingleCouponByCode(query: $query) {\n        message\n        status\n        data {\n          id\n          coupon_amount\n          coupon_type\n        }\n      }\n    }\n  "]))),GET_PAYMENT_METHOD_LIST:Object(u.d)(l||(l=Object(c.a)(["\n    query getPaymentMethodListPublic {\n      getPaymentMethodListPublic {\n        message\n        status\n        data {\n          id\n          name\n          description\n          status\n          isDefault\n        }\n      }\n    }\n  "]))),GET_SEARCH_CUSTOMER:Object(u.d)(o||(o=Object(c.a)(["\n    query getSearchedCustomers($query: CustomerSearchInput) {\n      getSearchedCustomers(query: $query) {\n        status\n        message\n        data {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n          addresses {\n            id\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            countryCode {\n              name\n              code\n            }\n            type\n            status\n            isDefault\n            updatedAt\n            createdAt\n          }\n          contactPersons {\n            id\n            name\n            email\n            phone\n            fax\n            status\n            createdAt\n            updatedAt\n          }\n        }\n      }\n    }\n  "])))}},703:function(e,t,a){"use strict";var n=a(3),r=a(0),d={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0011.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 00-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8zm752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 00-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8z"}}]},name:"retweet",theme:"outlined"},l=a(17),o=function(e,t){return r.createElement(l.a,Object(n.a)(Object(n.a)({},e),{},{ref:t,icon:d}))};o.displayName="RetweetOutlined";t.a=r.forwardRef(o)}}]);
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[60],{994:function(e,t,a){"use strict";a.r(t);a(130);var n=a(61),r=(a(131),a(45)),l=(a(140),a(72)),o=(a(117),a(41)),i=(a(132),a(71)),c=(a(197),a(102)),d=a(8),m=a(14),u=a(0),s=a.n(u),p=a(22),f=a.n(p),E=a(118),b=a(99),g=a(98),v=a(97),y=a(10),h=a(101),_=a.n(h),O=a(189),w=a(120),j=a(29),C=(a(69),a(23)),k=a(46),S=a(297),x=a(211),A=a.n(x);t.default=function(){Object(C.c)("order");var e=Object(u.useState)({data:[],loading:!0,error:""}),t=Object(m.a)(e,2),a=t[0],p=t[1],h=Object(u.useState)([]),x=Object(m.a)(h,2),I=x[0],N=x[1],P=Object(u.useState)(!1),U=Object(m.a)(P,2),L=U[0],M=U[1],D=Object(k.d)((function(e){return e.auth.token}));Object(u.useEffect)((function(){p((function(e){return Object(d.a)(Object(d.a)({},e),{},{loading:!0})})),j.j.query({query:S.a.GET_ALL_ORDER,context:{headers:{TENANTID:"100001",Authorization:D}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getOrderlistAdmin;if(a.status){var n=a.data.map((function(e){var t,a=e.customer,n=e.id,r=e.createdAt,l=e.orderStatus,o=e.paymentmethod,i=e.total;return{id:n,customer_name:a.first_name+" "+a.last_name,customer_email:a.email,createdAt:r,orderStatus:l.name,payment_name:null!==(t=null===o||void 0===o?void 0:o.name)&&void 0!==t?t:"No Payment Method",total:i}}));p((function(e){return Object(d.a)(Object(d.a)({},e),{},{data:n,error:""})}))}})).catch((function(e){p((function(e){return Object(d.a)(Object(d.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){p((function(e){return Object(d.a)(Object(d.a)({},e),{},{loading:!1})}))}))}),[]);var R=[{title:"Order Id",dataIndex:"id",key:"id",width:100,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Customer",dataIndex:"customer_name",key:"customer_name",width:150},{title:"Customer Email",dataIndex:"customer_email",key:"customer_email",width:200,ellipsis:!0,sorter:function(e,t){return e.customer_email.toUpperCase()>t.customer_email.toUpperCase()?1:-1}},{title:"Total Amount",dataIndex:"total",key:"total",align:"center",width:120,render:function(e){return"$".concat(e)},sorter:function(e,t){return e.total>t.total?1:-1}},{title:"Status",dataIndex:"orderStatus",key:"orderStatus",align:"center",width:150,render:function(e){return s.a.createElement("span",{style:{borderRadius:"4em",padding:".5em 1.5em",color:"Pending"===e?"#feaf00":"Completed"===e?"#2fb083":"",background:"Pending"===e?"#fef6e6":"Completed"===e?"#ebf9f4":""}},e)},sorter:function(e,t){return e.orderStatus.toUpperCase()>t.orderStatus.toUpperCase()?1:-1}},{title:"Payment Method",dataIndex:"payment_name",key:"payment_name",width:150,sorter:function(e,t){return e.payment_name.toUpperCase()>t.payment_name.toUpperCase()?1:-1}},{title:"Date",dataIndex:"createdAt",key:"createdAt",align:"center",width:150,render:function(e,t){return s.a.createElement("span",{className:"status-text"},s.a.createElement(A.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"View",dataIndex:"id",width:70,align:"right",key:"id",render:function(e,t){return s.a.createElement(s.a.Fragment,null,s.a.createElement(y.b,{to:"/admin/order/view?id=".concat(e)},s.a.createElement(_.a,{name:"eye",style:{margin:".5em 1em"}})))}},{title:"Action",dataIndex:"action",width:140,align:"center",key:"createdAt",render:function(e,t){return s.a.createElement(s.a.Fragment,null,s.a.createElement(c.a,{placement:"topLeft",title:"Edit Order",color:"cyan"},s.a.createElement(y.b,{to:"/admin/order/edit/".concat(t.id)},s.a.createElement(_.a,{name:"edit",style:{margin:".5em 1em"}}))),s.a.createElement(c.a,{placement:"topLeft",title:"Make Purchase Order",color:"cyan"},s.a.createElement(y.b,{to:"/admin/po/add?order_id=".concat(t.id)},s.a.createElement(_.a,{name:"cart-plus",style:{margin:".5em 1em"}}))))}}];return s.a.createElement(s.a.Fragment,null,s.a.createElement(E.a,{title:"List Orders",buttons:[s.a.createElement("div",{key:"1",className:"page-header-actions"},s.a.createElement(y.b,{to:"/admin/order/add"},s.a.createElement(v.a,{size:"small",title:"Add Order",type:"primary"},s.a.createElement(f.a,{icon:"plus"}))))]}),s.a.createElement(b.b,null,s.a.createElement(n.a,{gutter:25},s.a.createElement(r.a,{sm:24,xs:24},s.a.createElement(g.a,{headless:!0},a.loading?s.a.createElement("div",{className:"spin"},s.a.createElement(i.a,null)):s.a.createElement(s.a.Fragment,null,s.a.createElement(o.a,{placeholder:"Search Orders..",prefix:s.a.createElement(O.a,null),onChange:function(e){var t=e.target.value;M(t),N(a.data.filter((function(e){return((null===e||void 0===e?void 0:e.id)+(null===e||void 0===e?void 0:e.customer_name)+(null===e||void 0===e?void 0:e.customer_email)+(null===e||void 0===e?void 0:e.orderStatus)+(null===e||void 0===e?void 0:e.payment_name)+(null===e||void 0===e?void 0:e.total)).toLowerCase().includes(t.toLowerCase())})))}}),s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("span",{className:"psp_list"},s.a.createElement(l.a,{className:"table-responsive",columns:R,rowKey:"id",size:"small",dataSource:L?I:a.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:w.a.ORDER_PER_PAGE,total:L?I.length:a.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
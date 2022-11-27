(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[23],{676:function(e,n,t){"use strict";t.d(n,"a",(function(){return o}));var a,r,i=t(10),d=t(19),o={GET_ALL_ORDER:Object(d.d)(a||(a=Object(i.a)(["\n  query getOrderlistAdmin{\n    getOrderlistAdmin{\n      message\n      tenant_id\n      status\n      data {\n        id\n        total\n        sub_total\n        shipping_cost\n        discount_amount\n        tax_amount\n        tax_exempt\n        createdAt\n        updatedAt\n        customer{\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n        }\n        paymentmethod {\n          id\n          name\n          slug\n          description\n          status\n          tenant_id\n        }\n        orderStatus {\n          id\n          name\n          slug\n          description\n          status\n          tenant_id\n        }\n      }\n    }\n  }\n  "]))),GET_SINGLE_ORDER_ADMIN:Object(d.d)(r||(r=Object(i.a)(["\n  query getSingleOrderAdmin($query: GetSingleOrderAdminInput) {\n    getSingleOrderAdmin(query: $query) {\n      message\n      tenant_id\n      status\n      data {\n        id\n        total\n        sub_total\n        shipping_cost\n        discount_amount\n        tax_amount\n        tax_exempt\n        tenant_id\n        createdAt\n        updatedAt\n        orderitems {\n          id\n          order_id\n          price\n          quantity\n          tenant_id\n          product {\n            id\n            prod_short_desc\n            prod_name\n            prod_slug\n            prod_sku\n            prod_partnum\n            prod_status\n            taxable\n            prod_condition\n            prod_thumbnail\n            is_featured\n            prod_sale_price\n            prod_regular_price\n            prod_outofstock_status\n            createdAt\n            updatedAt\n            tenant_id\n          }\n        }\n        paymentmethod {\n          id\n          name\n          slug\n          description\n          status\n          tenant_id\n        }\n        payment {\n          id\n          order_id\n          amount\n          provider_id\n          status\n          tenant_id\n          billingAddress {\n            id\n            ref_id\n            ref_model\n            address1\n            address2\n            phone\n            fax\n            email\n            city\n            state\n            zip_code\n            country\n            type\n            status\n            tenant_id\n          }\n        }\n        orderstatus {\n          id\n          name\n          slug\n          description\n          status\n          tenant_id\n        }\n        customer {\n          id\n          first_name\n          last_name\n          email\n          email_verified\n          user_status\n          image\n        }\n        shippingAddress {\n          id\n          ref_id\n          ref_model\n          address1\n          address2\n          phone\n          fax\n          email\n          city\n          state\n          zip_code\n          country\n          type\n          status\n          tenant_id\n        }\n        taxExemptFiles {\n          id\n          order_id\n          file_name\n          tenant_id\n        }\n        coupon {\n          id\n          coupon_name\n          coupon_code\n          coupon_description\n          coupon_type\n          coupon_amount\n          coupon_maxamount\n          coupon_minamount\n          coupon_startdate\n          coupon_enddate\n          coupon_status\n          coupon_sortorder\n          tenant_id\n          createdAt\n          updatedAt\n        }\n        added_by {\n          id\n          first_name\n          last_name\n          email\n          image\n          roles {\n            id\n            role_no\n            role\n            role_slug\n            role_status\n            role_description\n          }\n        }\n      }\n    }\n  }\n  "])))}},961:function(e,n,t){"use strict";t.r(n);t(113);var a=t(55),r=(t(114),t(42)),i=(t(140),t(71)),d=(t(84),t(21)),o=(t(133),t(72)),s=t(7),l=t(16),u=t(0),c=t.n(u),m=t(18),p=t.n(m),_=t(103),f=t(91),g=t(90),y=t(77),b=t(12),E=t(115),h=t.n(E),v=t(191),O=t(123),A=t(37),x=(t(65),t(26)),j=t(45),S=t(676),w=t(298),C=t.n(w);n.default=function(){Object(x.c)("order");var e=Object(u.useState)({data:[],loading:!0,error:""}),n=Object(l.a)(e,2),t=n[0],m=n[1],E=Object(u.useState)([]),w=Object(l.a)(E,2),k=w[0],I=w[1],N=Object(u.useState)(!1),R=Object(l.a)(N,2),D=R[0],P=R[1],q=Object(j.d)((function(e){return e.auth.token}));Object(u.useEffect)((function(){m((function(e){return Object(s.a)(Object(s.a)({},e),{},{loading:!0})})),A.j.query({query:S.a.GET_ALL_ORDER,context:{headers:{TENANTID:"100001",Authorization:q}}}).then((function(e){var n,t=null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.getOrderlistAdmin;if(t.status){var a=t.data.map((function(e){var n,t=e.customer,a=e.id,r=e.createdAt,i=e.orderStatus,d=e.payment,o=e.total;return{id:a,customer_name:t.first_name+" "+t.last_name,customer_email:t.email,createdAt:r,orderStatus:i.name,payment_name:null!==(n=null===d||void 0===d?void 0:d.name)&&void 0!==n?n:"No Payment Method",total:o}}));m((function(e){return Object(s.a)(Object(s.a)({},e),{},{data:a,error:""})}))}})).catch((function(e){m((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){m((function(e){return Object(s.a)(Object(s.a)({},e),{},{loading:!1})}))}))}),[]);var L=[{title:"Order Id",dataIndex:"id",key:"id",width:100,ellipsis:!0,sorter:function(e,n){return e.id.toUpperCase()>n.id.toUpperCase()?1:-1}},{title:"Customer",dataIndex:"customer_name",key:"customer_name",width:150},{title:"Customer Email",dataIndex:"customer_email",key:"customer_email",width:200,ellipsis:!0,sorter:function(e,n){return e.customer_email.toUpperCase()>n.customer_email.toUpperCase()?1:-1}},{title:"Total Amount",dataIndex:"total",key:"total",align:"center",width:120,render:function(e){return"$".concat(e)},sorter:function(e,n){return e.total>n.total?1:-1}},{title:"Status",dataIndex:"orderStatus",key:"orderStatus",align:"center",width:150,render:function(e){return c.a.createElement("span",{style:{borderRadius:"4em",padding:".5em 1.5em",color:"Pending"===e?"#feaf00":"Completed"===e?"#2fb083":"",background:"Pending"===e?"#fef6e6":"Completed"===e?"#ebf9f4":""}},e)},sorter:function(e,n){return e.orderStatus.toUpperCase()>n.orderStatus.toUpperCase()?1:-1}},{title:"Payment Method",dataIndex:"payment_name",key:"payment_name",width:150,sorter:function(e,n){return e.payment_name.toUpperCase()>n.payment_name.toUpperCase()?1:-1}},{title:"Date",dataIndex:"createdAt",key:"createdAt",align:"center",width:150,render:function(e,n){return c.a.createElement("span",{className:"status-text"},c.a.createElement(C.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"View",dataIndex:"id",width:70,align:"right",key:"id",render:function(e,n){return c.a.createElement(c.a.Fragment,null,c.a.createElement(b.b,{to:"/admin/order/view?id=".concat(e)},c.a.createElement(h.a,{name:"eye",style:{margin:".5em 1em"}})))}},{title:"Action",dataIndex:"action",width:70,align:"right",key:"last_name",render:function(e,n){return c.a.createElement(c.a.Fragment,null,c.a.createElement(b.b,{to:"/admin/order/add"},c.a.createElement(h.a,{name:"edit",style:{margin:".5em 1em"}})))}}];return c.a.createElement(c.a.Fragment,null,c.a.createElement(_.a,{title:"List Orders",buttons:[c.a.createElement("div",{key:"1",className:"page-header-actions"},c.a.createElement(b.b,{to:"/admin/order/add"},c.a.createElement(y.a,{size:"small",title:"Add Order",type:"primary"},c.a.createElement(p.a,{icon:"plus"}))))]}),c.a.createElement(f.b,null,c.a.createElement(a.a,{gutter:25},c.a.createElement(r.a,{sm:24,xs:24},c.a.createElement(g.a,{headless:!0},t.loading?c.a.createElement("div",{className:"spin"},c.a.createElement(o.a,null)):c.a.createElement(c.a.Fragment,null,c.a.createElement(d.a,{placeholder:"Search Orders..",prefix:c.a.createElement(v.a,null),onChange:function(e){var n=e.target.value;P(n),I(t.data.filter((function(e){return((null===e||void 0===e?void 0:e.id)+(null===e||void 0===e?void 0:e.customer_name)+(null===e||void 0===e?void 0:e.customer_email)+(null===e||void 0===e?void 0:e.orderStatus)+(null===e||void 0===e?void 0:e.payment_name)+(null===e||void 0===e?void 0:e.total)).toLowerCase().includes(n.toLowerCase())})))}}),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("span",{className:"psp_list"},c.a.createElement(i.a,{className:"table-responsive",columns:L,rowKey:"id",size:"small",dataSource:D?k:t.data,rowClassName:function(e,n){return n%2==0?"":"altTableClass"},pagination:{defaultPageSize:O.a.ORDER_PER_PAGE,total:D?k.length:t.data.length,showTotal:function(e,n){return"".concat(n[0],"-").concat(n[1]," of ").concat(e," items")}}}))))))))}}}]);
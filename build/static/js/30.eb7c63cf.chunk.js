(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[30],{688:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var n,i,u,r,d,o=a(8),l=a(16),s={GET_ALL_QUOTE_STATUS:Object(l.d)(n||(n=Object(o.a)(["\n    query getQuoteStatusList {\n    getQuoteStatusList {\n      message\n      status\n      tenant_id\n      data {\n        id\n        name\n        slug\n        status\n      }\n    }\n  }"]))),GET_ALL_QUOTE:Object(l.d)(i||(i=Object(o.a)(["\n    query getSubmittedQuoteList($query:SubmittedQuoteListInput) {\n      getSubmittedQuoteList(query:$query) {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          updatedAt\n          quotedby {\n            id\n            first_name\n            last_name\n            email\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_QUOTE:Object(l.d)(u||(u=Object(o.a)(["\n    query getSingleSubmittedQuote($query: GetSingleSubmittedQuoteInput) {\n      getSingleSubmittedQuote(query: $query) {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          submittedquoteitems {\n            id\n            submittedquote_id\n            price\n            quantity\n            total_price\n            product {\n              id\n              prod_name\n              prod_slug\n              prod_sku\n              prod_partnum\n              createdAt\n            }\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),REMOVE_QUOTE_ITEM:Object(l.d)(r||(r=Object(o.a)(["\n    mutation quoteItemDelete($data: QuoteItemDeleteInput) {\n      quoteItemDelete(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SUBMIT_QUOTE:Object(l.d)(d||(d=Object(o.a)(["\n    mutation updateSubmittedQuote($data: SubmittedQuoteUpdateInput) {\n      updateSubmittedQuote(data: $data) {\n        message\n        status\n      }\n    }\n  "])))}},855:function(t,e,a){},941:function(t,e,a){"use strict";a.r(e);a(200);var n=a(97),i=(a(201),a(74)),u=(a(150),a(77)),r=(a(202),a(63)),d=(a(166),a(98)),o=(a(148),a(45)),l=a(9),s=(a(288),a(69)),c=(a(289),a(52)),m=a(23),p=a(0),b=a.n(p),v=a(217),y=a(165),f=a(164),_=a(287),E=a(58),g=a(12),O=a(50),h=a(99),T=a(21),q=a.n(T),S=a(22),j=(a(855),a(688)),I=a(68),Q=a.n(I),x=a(76);e.default=function(){var t,e,a,T;Object(S.f)("quote");var I=Object(E.useParams)(),A=Object(E.useHistory)(),L=Object(O.d)((function(t){return t.auth.token})),k=Object(p.useState)(!1),N=Object(m.a)(k,2),U=N[0],w=N[1],G=c.a.useForm(),$=Object(m.a)(G,1)[0],z=Object(p.useState)([]),D=Object(m.a)(z,2),F=D[0],C=D[1],P=Object(p.useState)({data:{},loading:!0,error:""}),M=Object(m.a)(P,2),V=M[0],B=M[1],J=Object(p.useState)({data:[],isLoading:!0}),K=Object(m.a)(J,2),R=K[0],H=K[1],W=Object(p.useState)(0),X=Object(m.a)(W,2),Y=X[0],Z=X[1];Object(p.useEffect)((function(){h.b.query({query:j.a.GET_SINGLE_QUOTE,variables:{query:{id:parseInt(I.id)}},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(t){var e,a,n,i=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getSingleSubmittedQuote;if(!(null===i||void 0===i?void 0:i.status))return Object(x.a)();B({data:null===i||void 0===i?void 0:i.data,loading:!1,error:""});var u=null===i||void 0===i||null===(a=i.data)||void 0===a?void 0:a.submittedquoteitems.map((function(t){return{id:t.id,price:t.price,quantity:t.quantity,total_price:t.total_price,prod_name:t.product.prod_name,product_id:t.product.id,prod_sku:t.product.prod_sku,prod_partnum:t.product.prod_partnum}}));C(u),$.setFieldsValue({status:null===i||void 0===i||null===(n=i.data)||void 0===n?void 0:n.status})})),h.b.query({query:j.a.GET_ALL_QUOTE_STATUS,context:{headers:{TENANTID:"100001",Authorization:Q.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getQuoteStatusList;if(!(null===a||void 0===a?void 0:a.status))return Object(x.a)();H({data:a.data,isLoading:!1})}))}),[]);var tt=[{title:"Name",dataIndex:"prod_name",key:"prod_name",width:400,ellipsis:!0},{title:"SKU",dataIndex:"prod_sku",key:"prod_sku",width:150},{title:"Part Number",dataIndex:"prod_partnum",key:"prod_partnum",width:150},{title:"Price",dataIndex:"price",key:"price",width:100,render:function(t,e){return b.a.createElement(o.a,{type:"number",min:0,defaultValue:e.price,placeholder:"Price",onChange:function(t){t.persist(),C((function(a){return a.map((function(a){return a.id===e.id?Object(l.a)(Object(l.a)({},a),{},{price:t.target.value}):a}))}))}})}},{title:"Quantity",dataIndex:"quantity",key:"quantity",width:100,render:function(t,e){return b.a.createElement(o.a,{defaultValue:e.quantity,type:"number",min:0,placeholder:"Quantity",onChange:function(t){t.persist(),C((function(a){return a.map((function(a){return a.id===e.id?Object(l.a)(Object(l.a)({},a),{},{quantity:t.target.value}):a}))}))}})}},{title:"Total Price",dataIndex:"total_price",key:"total_price",width:150,render:function(t,e){return"$ ".concat(parseInt(e.quantity)*parseFloat(e.price))}},{title:"Action",dataIndex:"action",key:"action",render:function(t,e){return b.a.createElement(_.a,{onClick:function(){return C((function(t){return t.filter((function(t){return t.product_id!==e.product_id}))}))},size:"small",title:"Remove",type:"danger"},b.a.createElement(q.a,{icon:"minus"}))}}];return Object(p.useEffect)((function(){var t=0;F.forEach((function(e){t+=parseInt(e.quantity)*parseFloat(e.price)})),Z(t)}),[F]),b.a.createElement(b.a.Fragment,null,b.a.createElement(v.a,{title:"Manage Quote | Edit Quote ".concat((null===V||void 0===V||null===(t=V.data)||void 0===t?void 0:t.id)?"(".concat(null===V||void 0===V||null===(e=V.data)||void 0===e?void 0:e.id,")"):"")}),b.a.createElement(y.b,null,b.a.createElement(n.a,{gutter:25},b.a.createElement(i.a,{sm:24,xs:24},b.a.createElement(f.a,{headless:!0},(null===V||void 0===V?void 0:V.loading)?b.a.createElement("div",{className:"spin"},b.a.createElement(d.a,null)):b.a.createElement(c.a,{style:{width:"100%"},form:$,name:"edit-quote",onFinish:function(t){var e,a=F.map((function(t){return{product_id:t.product_id,price:t.price,quantity:t.quantity}}));w(!0);var n={status:t.status,id:null===V||void 0===V||null===(e=V.data)||void 0===e?void 0:e.id,products:a};h.b.mutate({mutation:j.a.SUBMIT_QUOTE,variables:{data:n},context:{headers:{TENANTID:"100001",Authorization:L}},refetchQueries:[{query:j.a.GET_ALL_QUOTE,context:{headers:{TENANTID:"100001",Authorization:L}}},{query:j.a.GET_SINGLE_QUOTE,variables:{query:{id:parseInt(I.id)}},context:{headers:{TENANTID:"100001",Authorization:L}}}]}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.updateSubmittedQuote;(null===a||void 0===a?void 0:a.status)||Object(x.a)(),w(!1),s.b.success(a.message),setTimeout((function(){A.push("/admin/products/quote")}),2e3)}))},onFinishFailed:function(t){return console.log("form error info:\n",t)}},b.a.createElement(c.a.Item,{name:"status",label:"Status"},b.a.createElement(r.a,{defaultValue:null===V||void 0===V||null===(a=V.data)||void 0===a?void 0:a.status,style:{width:"180px"},options:null===R||void 0===R?void 0:R.data.map((function(t){return{label:t.name,value:t.slug}}))})),b.a.createElement(u.a,{className:"table-responsive",columns:tt,pagination:!1,rowKey:"banner_id",size:"small",dataSource:F}),b.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}},b.a.createElement(u.a,{className:"table-responsive",style:{width:"100%",marginTop:"20px",marginBottom:"20px"},columns:[{key:"total",title:"Total",dataIndex:"total",render:function(t){return"$ "+t},width:100},{key:"note",title:"Note",dataIndex:"note",width:300}],dataSource:[{key:1,total:Y,note:null===V||void 0===V||null===(T=V.data)||void 0===T?void 0:T.note}],pagination:!1})),b.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},b.a.createElement(c.a.Item,null,b.a.createElement(_.a,{loading:U,size:"default",htmlType:"submit",type:"primary",raised:!0},U?"Processing":"Save"),b.a.createElement(g.b,{to:"/admin/products/quote"},b.a.createElement(_.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[31],{1017:function(t,e,a){"use strict";a.r(e);a(200);var n=a(96),i=(a(201),a(74)),u=(a(150),a(76)),r=(a(202),a(64)),o=(a(166),a(97)),d=(a(148),a(45)),l=a(9),s=(a(287),a(53)),c=a(23),m=a(0),p=a.n(m),b=a(218),v=a(165),f=a(164),y=a(217),_=a(59),E=a(12),g=a(50),O=a(51),h=a(98),T=a(21),S=a.n(T),q=a(22),j=(a(928),a(711)),I=a(69),Q=a.n(I),x=a(115);e.default=function(){var t,e,a,T;Object(q.f)("quote");var I=Object(_.useParams)(),A=Object(_.useHistory)(),L=Object(g.d)((function(t){return t.auth.token})),k=Object(m.useState)(!1),N=Object(c.a)(k,2),w=N[0],U=N[1],G=s.a.useForm(),$=Object(c.a)(G,1)[0],z=Object(m.useState)([]),D=Object(c.a)(z,2),F=D[0],C=D[1],P=Object(m.useState)({data:{},loading:!0,error:""}),M=Object(c.a)(P,2),V=M[0],B=M[1],J=Object(m.useState)({data:[],isLoading:!0}),K=Object(c.a)(J,2),R=K[0],H=K[1],W=Object(m.useState)(0),X=Object(c.a)(W,2),Y=X[0],Z=X[1];Object(m.useEffect)((function(){h.b.query({query:j.a.GET_SINGLE_QUOTE,variables:{query:{id:parseInt(I.id)}},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(t){var e,a,n,i=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getSingleSubmittedQuote;if(!i.status)return Object(x.a)();B({data:null===i||void 0===i?void 0:i.data,loading:!1,error:""});var u=null===i||void 0===i||null===(a=i.data)||void 0===a?void 0:a.submittedquoteitems.map((function(t){return{id:t.id,price:t.price,quantity:t.quantity,total_price:t.total_price,prod_name:t.product.prod_name,product_id:t.product.id,prod_sku:t.product.prod_sku,prod_partnum:t.product.prod_partnum}}));C(u),$.setFieldsValue({status:null===i||void 0===i||null===(n=i.data)||void 0===n?void 0:n.status})})).catch((function(t){console.log(t),B({data:{},loading:!1,error:"Something went wrong"})})),h.b.query({query:j.a.GET_ALL_QUOTE_STATUS,context:{headers:{TENANTID:"100001",Authorization:Q.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getQuoteStatusList;if(!a.status)return Object(x.a)();H({data:a.data,isLoading:!1})}))}),[]);var tt=[{title:"Name",dataIndex:"prod_name",key:"prod_name",width:400,ellipsis:!0},{title:"SKU",dataIndex:"prod_sku",key:"prod_sku",width:150},{title:"Part Number",dataIndex:"prod_partnum",key:"prod_partnum",width:150},{title:"Price",dataIndex:"price",key:"price",width:100,render:function(t,e){return p.a.createElement(d.a,{type:"number",min:0,defaultValue:e.price,placeholder:"Price",onChange:function(t){t.persist(),C((function(a){return a.map((function(a){return a.id===e.id?Object(l.a)(Object(l.a)({},a),{},{price:t.target.value}):a}))}))}})}},{title:"Quantity",dataIndex:"quantity",key:"quantity",width:100,render:function(t,e){return p.a.createElement(d.a,{defaultValue:e.quantity,type:"number",min:0,placeholder:"Quantity",onChange:function(t){t.persist(),C((function(a){return a.map((function(a){return a.id===e.id?Object(l.a)(Object(l.a)({},a),{},{quantity:t.target.value}):a}))}))}})}},{title:"Total Price",dataIndex:"total_price",key:"total_price",width:150,render:function(t,e){return"$ ".concat(parseInt(e.quantity)*parseFloat(e.price))}},{title:"Action",dataIndex:"action",key:"action",render:function(t,e){return p.a.createElement(y.a,{onClick:function(){return C((function(t){return t.filter((function(t){return t.product_id!==e.product_id}))}))},size:"small",title:"Remove",type:"danger"},p.a.createElement(S.a,{icon:"minus"}))}}];return Object(m.useEffect)((function(){var t=0;F.forEach((function(e){t+=parseInt(e.quantity)*parseFloat(e.price)})),Z(t)}),[F]),p.a.createElement(p.a.Fragment,null,p.a.createElement(b.a,{title:"Manage Quote | Edit Quote ".concat((null===V||void 0===V||null===(t=V.data)||void 0===t?void 0:t.id)?"(".concat(null===V||void 0===V||null===(e=V.data)||void 0===e?void 0:e.id,")"):"")}),p.a.createElement(v.b,null,p.a.createElement(n.a,{gutter:25},p.a.createElement(i.a,{sm:24,xs:24},p.a.createElement(f.a,{headless:!0},(null===V||void 0===V?void 0:V.loading)?p.a.createElement("div",{className:"spin"},p.a.createElement(o.a,null)):p.a.createElement(s.a,{style:{width:"100%"},form:$,name:"edit-quote",onFinish:function(t){var e,a=F.map((function(t){return{product_id:t.product_id,price:t.price,quantity:t.quantity}}));U(!0);var n={status:t.status,id:null===V||void 0===V||null===(e=V.data)||void 0===e?void 0:e.id,products:a};h.b.mutate({mutation:j.a.SUBMIT_QUOTE,variables:{data:n},context:{headers:{TENANTID:"100001",Authorization:L}},refetchQueries:[{query:j.a.GET_ALL_QUOTE,context:{headers:{TENANTID:"100001",Authorization:L}}},{query:j.a.GET_SINGLE_QUOTE,variables:{query:{id:parseInt(I.id)}},context:{headers:{TENANTID:"100001",Authorization:L}}}]}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.updateSubmittedQuote;a.status||Object(x.a)(),U(!1),O.b.success(a.message),setTimeout((function(){A.push("/admin/products/quote")}),2e3)})).catch((function(t){O.b.error("Something Went wrong !!!")}))},onFinishFailed:function(t){return console.log("form error info:\n",t)}},p.a.createElement(s.a.Item,{name:"status",label:"Status"},p.a.createElement(r.a,{defaultValue:null===V||void 0===V||null===(a=V.data)||void 0===a?void 0:a.status,style:{width:"180px"},options:null===R||void 0===R?void 0:R.data.map((function(t){return{label:t.name,value:t.slug}}))})),p.a.createElement(u.a,{className:"table-responsive",columns:tt,pagination:!1,rowKey:"banner_id",size:"small",dataSource:F}),p.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}},p.a.createElement(u.a,{className:"table-responsive",style:{width:"100%",marginTop:"20px",marginBottom:"20px"},columns:[{key:"total",title:"Total",dataIndex:"total",render:function(t){return"$ "+t},width:100},{key:"note",title:"Note",dataIndex:"note",width:300}],dataSource:[{key:1,total:Y,note:null===V||void 0===V||null===(T=V.data)||void 0===T?void 0:T.note}],pagination:!1})),p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},p.a.createElement(s.a.Item,null,p.a.createElement(y.a,{loading:w,size:"default",htmlType:"submit",type:"primary",raised:!0},w?"Processing":"Save"),p.a.createElement(E.b,{to:"/admin/products/quote"},p.a.createElement(y.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},711:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var n,i,u,r,o,d=a(8),l=a(16),s={GET_ALL_QUOTE_STATUS:Object(l.d)(n||(n=Object(d.a)(["\n    query getQuoteStatusList {\n    getQuoteStatusList {\n      message\n      status\n      tenant_id\n      data {\n        id\n        name\n        slug\n        status\n      }\n    }\n  }"]))),GET_ALL_QUOTE:Object(l.d)(i||(i=Object(d.a)(["\n    query getSubmittedQuoteList($query:SubmittedQuoteListInput) {\n      getSubmittedQuoteList(query:$query) {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          updatedAt\n          quotedby {\n            id\n            first_name\n            last_name\n            email\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_QUOTE:Object(l.d)(u||(u=Object(d.a)(["\n    query getSingleSubmittedQuote($query: GetSingleSubmittedQuoteInput) {\n      getSingleSubmittedQuote(query: $query) {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          submittedquoteitems {\n            id\n            submittedquote_id\n            price\n            quantity\n            total_price\n            product {\n              id\n              prod_name\n              prod_slug\n              prod_sku\n              prod_partnum\n              createdAt\n            }\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),REMOVE_QUOTE_ITEM:Object(l.d)(r||(r=Object(d.a)(["\n    mutation quoteItemDelete($data: QuoteItemDeleteInput) {\n      quoteItemDelete(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SUBMIT_QUOTE:Object(l.d)(o||(o=Object(d.a)(["\n    mutation updateSubmittedQuote($data: SubmittedQuoteUpdateInput) {\n      updateSubmittedQuote(data: $data) {\n        message\n        status\n      }\n    }\n  "])))}},928:function(t,e,a){}}]);
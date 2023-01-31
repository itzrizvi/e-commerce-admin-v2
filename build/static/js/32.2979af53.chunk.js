(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[32],{1015:function(t,e,a){"use strict";a.r(e);a(196);var n=a(95),i=(a(197),a(72)),u=(a(147),a(74)),r=(a(198),a(63)),o=(a(162),a(96)),d=(a(145),a(44)),l=a(9),s=(a(278),a(50)),c=a(23),m=a(0),p=a.n(m),b=a(213),v=a(161),y=a(160),f=a(212),_=a(56),g=a(12),E=a(48),h=a(45),O=a(97),T=a(21),S=a.n(T),q=a(22),j=(a(923),a(706)),I=a(68),Q=a.n(I);e.default=function(){var t,e,a,T;Object(q.f)("quote");var I=Object(_.useParams)(),x=Object(_.useHistory)(),A=Object(E.d)((function(t){return t.auth.token})),L=Object(m.useState)(!1),k=Object(c.a)(L,2),N=k[0],w=k[1],U=s.a.useForm(),G=Object(c.a)(U,1)[0],$=Object(m.useState)([]),z=Object(c.a)($,2),D=z[0],F=z[1],C=Object(m.useState)({data:{},loading:!0,error:""}),P=Object(c.a)(C,2),M=P[0],V=P[1],B=Object(m.useState)({data:[],isLoading:!0}),J=Object(c.a)(B,2),K=J[0],R=J[1],H=Object(m.useState)(0),W=Object(c.a)(H,2),X=W[0],Y=W[1];Object(m.useEffect)((function(){O.b.query({query:j.a.GET_SINGLE_QUOTE,variables:{query:{id:parseInt(I.id)}},context:{headers:{TENANTID:"100001",Authorization:A}}}).then((function(t){var e,a,n,i=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getSingleSubmittedQuote;if(i.status){V({data:null===i||void 0===i?void 0:i.data,loading:!1,error:""});var u=null===i||void 0===i||null===(a=i.data)||void 0===a?void 0:a.submittedquoteitems.map((function(t){return{id:t.id,price:t.price,quantity:t.quantity,total_price:t.total_price,prod_name:t.product.prod_name,product_id:t.product.id,prod_sku:t.product.prod_sku,prod_partnum:t.product.prod_partnum}}));F(u),G.setFieldsValue({status:null===i||void 0===i||null===(n=i.data)||void 0===n?void 0:n.status})}})).catch((function(t){console.log(t),V({data:{},loading:!1,error:"Something went wrong"})})),O.b.query({query:j.a.GET_ALL_QUOTE_STATUS,context:{headers:{TENANTID:"100001",Authorization:Q.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getQuoteStatusList;a.status&&R({data:a.data,isLoading:!1})}))}),[]);var Z=[{title:"Name",dataIndex:"prod_name",key:"prod_name",width:400,ellipsis:!0},{title:"SKU",dataIndex:"prod_sku",key:"prod_sku",width:150},{title:"Part Number",dataIndex:"prod_partnum",key:"prod_partnum",width:150},{title:"Price",dataIndex:"price",key:"price",width:100,render:function(t,e){return p.a.createElement(d.a,{type:"number",min:0,defaultValue:e.price,placeholder:"Price",onChange:function(t){t.persist(),F((function(a){return a.map((function(a){return a.id===e.id?Object(l.a)(Object(l.a)({},a),{},{price:t.target.value}):a}))}))}})}},{title:"Quantity",dataIndex:"quantity",key:"quantity",width:100,render:function(t,e){return p.a.createElement(d.a,{defaultValue:e.quantity,type:"number",min:0,placeholder:"Quantity",onChange:function(t){t.persist(),F((function(a){return a.map((function(a){return a.id===e.id?Object(l.a)(Object(l.a)({},a),{},{quantity:t.target.value}):a}))}))}})}},{title:"Total Price",dataIndex:"total_price",key:"total_price",width:150,render:function(t,e){return"$ ".concat(parseInt(e.quantity)*parseFloat(e.price))}},{title:"Action",dataIndex:"action",key:"action",render:function(t,e){return p.a.createElement(f.a,{onClick:function(){return F((function(t){return t.filter((function(t){return t.product_id!==e.product_id}))}))},size:"small",title:"Remove",type:"danger"},p.a.createElement(S.a,{icon:"minus"}))}}];return Object(m.useEffect)((function(){var t=0;D.forEach((function(e){t+=parseInt(e.quantity)*parseFloat(e.price)})),Y(t)}),[D]),p.a.createElement(p.a.Fragment,null,p.a.createElement(b.a,{title:"Manage Quote | Edit Quote ".concat((null===M||void 0===M||null===(t=M.data)||void 0===t?void 0:t.id)?"(".concat(null===M||void 0===M||null===(e=M.data)||void 0===e?void 0:e.id,")"):"")}),p.a.createElement(v.b,null,p.a.createElement(n.a,{gutter:25},p.a.createElement(i.a,{sm:24,xs:24},p.a.createElement(y.a,{headless:!0},(null===M||void 0===M?void 0:M.loading)?p.a.createElement("div",{className:"spin"},p.a.createElement(o.a,null)):p.a.createElement(s.a,{style:{width:"100%"},form:G,name:"edit-quote",onFinish:function(t){var e,a=D.map((function(t){return{product_id:t.product_id,price:t.price,quantity:t.quantity}}));w(!0);var n={status:t.status,id:null===M||void 0===M||null===(e=M.data)||void 0===e?void 0:e.id,products:a};O.b.mutate({mutation:j.a.SUBMIT_QUOTE,variables:{data:n},context:{headers:{TENANTID:"100001",Authorization:A}},refetchQueries:[{query:j.a.GET_ALL_QUOTE,context:{headers:{TENANTID:"100001",Authorization:A}}},{query:j.a.GET_SINGLE_QUOTE,variables:{query:{id:parseInt(I.id)}},context:{headers:{TENANTID:"100001",Authorization:A}}}]}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.updateSubmittedQuote;a.status||h.b.error(a.message),w(!1),h.b.success(a.message),setTimeout((function(){x.push("/admin/products/quote")}),2e3)})).catch((function(t){h.b.error("Something Went wrong !!!")}))},onFinishFailed:function(t){return console.log("form error info:\n",t)}},p.a.createElement(s.a.Item,{name:"status",label:"Status"},p.a.createElement(r.a,{defaultValue:null===M||void 0===M||null===(a=M.data)||void 0===a?void 0:a.status,style:{width:"180px"},options:null===K||void 0===K?void 0:K.data.map((function(t){return{label:t.name,value:t.slug}}))})),p.a.createElement(u.a,{className:"table-responsive",columns:Z,pagination:!1,rowKey:"banner_id",size:"small",dataSource:D}),p.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}},p.a.createElement(u.a,{className:"table-responsive",style:{width:"100%",marginTop:"20px",marginBottom:"20px"},columns:[{key:"total",title:"Total",dataIndex:"total",render:function(t){return"$ "+t},width:100},{key:"note",title:"Note",dataIndex:"note",width:300}],dataSource:[{key:1,total:X,note:null===M||void 0===M||null===(T=M.data)||void 0===T?void 0:T.note}],pagination:!1})),p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},p.a.createElement(s.a.Item,null,p.a.createElement(f.a,{loading:N,size:"default",htmlType:"submit",type:"primary",raised:!0},N?"Processing":"Save"),p.a.createElement(g.b,{to:"/admin/products/quote"},p.a.createElement(f.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}},706:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var n,i,u,r,o,d=a(8),l=a(16),s={GET_ALL_QUOTE_STATUS:Object(l.d)(n||(n=Object(d.a)(["\n    query getQuoteStatusList {\n    getQuoteStatusList {\n      message\n      status\n      tenant_id\n      data {\n        id\n        name\n        slug\n        status\n      }\n    }\n  }"]))),GET_ALL_QUOTE:Object(l.d)(i||(i=Object(d.a)(["\n    query getSubmittedQuoteList($query:SubmittedQuoteListInput) {\n      getSubmittedQuoteList(query:$query) {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          updatedAt\n          quotedby {\n            id\n            first_name\n            last_name\n            email\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_QUOTE:Object(l.d)(u||(u=Object(d.a)(["\n    query getSingleSubmittedQuote($query: GetSingleSubmittedQuoteInput) {\n      getSingleSubmittedQuote(query: $query) {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          submittedquoteitems {\n            id\n            submittedquote_id\n            price\n            quantity\n            total_price\n            product {\n              id\n              prod_name\n              prod_slug\n              prod_sku\n              prod_partnum\n              createdAt\n            }\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),REMOVE_QUOTE_ITEM:Object(l.d)(r||(r=Object(d.a)(["\n    mutation quoteItemDelete($data: QuoteItemDeleteInput) {\n      quoteItemDelete(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SUBMIT_QUOTE:Object(l.d)(o||(o=Object(d.a)(["\n    mutation updateSubmittedQuote($data: SubmittedQuoteUpdateInput) {\n      updateSubmittedQuote(data: $data) {\n        message\n        status\n      }\n    }\n  "])))}},923:function(t,e,a){}}]);
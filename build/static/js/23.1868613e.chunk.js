(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[23],{636:function(t,e,a){},686:function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var n,i,u,d,r=a(8),o=a(17),l={GET_ALL_QUOTE:Object(o.d)(n||(n=Object(r.a)(["\n    query getSubmittedQuoteList {\n      getSubmittedQuoteList {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          updatedAt\n          quotedby {\n            id\n            email\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_QUOTE:Object(o.d)(i||(i=Object(r.a)(["\n    query getSingleSubmittedQuote($query: GetSingleSubmittedQuoteInput) {\n      getSingleSubmittedQuote(query: $query) {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          submittedquoteitems {\n            id\n            submittedquote_id\n            price\n            quantity\n            total_price\n            product {\n              id\n              prod_name\n              prod_slug\n              prod_sku\n              prod_partnum\n              createdAt\n            }\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),REMOVE_QUOTE_ITEM:Object(o.d)(u||(u=Object(r.a)(["\n    mutation quoteItemDelete($data: QuoteItemDeleteInput) {\n      quoteItemDelete(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SUBMIT_QUOTE:Object(o.d)(d||(d=Object(r.a)(["\n    mutation updateSubmittedQuote($data: SubmittedQuoteUpdateInput) {\n      updateSubmittedQuote(data: $data) {\n        message\n        status\n      }\n    }\n  "])))}},976:function(t,e,a){"use strict";a.r(e);a(143);var n=a(68),i=(a(144),a(52)),u=(a(133),a(71)),d=(a(145),a(30)),r=(a(132),a(74)),o=(a(115),a(39)),l=a(7),s=(a(201),a(27)),c=a(14),m=a(0),p=a.n(m),v=a(120),b=a(101),f=a(99),y=a(100),_=a(59),g=a(12),E=a(47),h=a(33),O=a(102),q=a(19),I=a.n(q),S=a(23),T=(a(636),a(686));e.default=function(){var t,e,a,q,j,Q,w,x,k,N;Object(S.c)("quote");var A=Object(_.useParams)(),U=Object(_.useHistory)(),L=Object(E.d)((function(t){return t.auth.token})),G=Object(m.useState)(!1),z=Object(c.a)(G,2),F=z[0],$=z[1],C=s.a.useForm(),D=Object(c.a)(C,1)[0],P=Object(m.useState)([]),M=Object(c.a)(P,2),V=M[0],B=M[1],J=Object(m.useState)({data:{},loading:!0,error:""}),K=Object(c.a)(J,2),R=K[0],H=K[1],W=Object(m.useState)(0),X=Object(c.a)(W,2),Y=X[0],Z=X[1];Object(m.useEffect)((function(){O.b.query({query:T.a.GET_SINGLE_QUOTE,variables:{query:{id:parseInt(A.id)}},context:{headers:{TENANTID:"100001",Authorization:L}}}).then((function(t){var e,a,n,i=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getSingleSubmittedQuote;if(i.status){H({data:null===i||void 0===i?void 0:i.data,loading:!1,error:""});var u=null===i||void 0===i||null===(a=i.data)||void 0===a?void 0:a.submittedquoteitems.map((function(t){return{id:t.id,price:t.price,quantity:t.quantity,total_price:t.total_price,prod_name:t.product.prod_name,product_id:t.product.id,prod_sku:t.product.prod_sku,prod_partnum:t.product.prod_partnum}}));B(u),D.setFieldsValue({status:null===i||void 0===i||null===(n=i.data)||void 0===n?void 0:n.status})}})).catch((function(t){console.log(t),H({data:{},loading:!1,error:"Something went wrong"})}))}));var tt=[{title:"Name",dataIndex:"prod_name",key:"prod_name",width:300,ellipsis:!0},{title:"SKU",dataIndex:"prod_sku",key:"prod_sku",width:150},{title:"Part Number",dataIndex:"prod_partnum",key:"prod_partnum",width:150},{title:"Price",dataIndex:"price",key:"price",width:150,render:function(t,e){return p.a.createElement(o.a,{type:"number",min:0,defaultValue:e.price,placeholder:"Price",onChange:function(t){t.persist(),B((function(a){return a.map((function(a){return a.id===e.id?Object(l.a)(Object(l.a)({},a),{},{price:t.target.value}):a}))}))}})}},{title:"Quantity",dataIndex:"quantity",key:"quantity",width:150,render:function(t,e){return p.a.createElement(o.a,{defaultValue:e.quantity,type:"number",min:0,placeholder:"Quantity",onChange:function(t){t.persist(),B((function(a){return a.map((function(a){return a.id===e.id?Object(l.a)(Object(l.a)({},a),{},{quantity:t.target.value}):a}))}))}})}},{title:"Total Price",dataIndex:"total_price",key:"total_price",width:150,render:function(t,e){return"$ ".concat(parseInt(e.quantity)*parseFloat(e.price))}},{title:"Action",dataIndex:"action",key:"action",render:function(t,e){return p.a.createElement(y.a,{onClick:function(){return B((function(t){return t.filter((function(t){return t.product_id!==e.product_id}))}))},size:"small",title:"Remove",type:"danger"},p.a.createElement(I.a,{icon:"minus"}))}}];return Object(m.useEffect)((function(){var t=0;V.forEach((function(e){t+=parseInt(e.quantity)*parseFloat(e.price)})),Z(t)}),[V]),p.a.createElement(p.a.Fragment,null,p.a.createElement(v.a,{title:"Manage Quote | Edit Quote ".concat((null===R||void 0===R||null===(t=R.data)||void 0===t?void 0:t.id)?"(".concat(null===R||void 0===R||null===(e=R.data)||void 0===e?void 0:e.id,")"):"")}),p.a.createElement(b.b,null,p.a.createElement(n.a,{gutter:25},p.a.createElement(i.a,{sm:24,xs:24},p.a.createElement(f.a,{headless:!0},(null===R||void 0===R?void 0:R.loading)?p.a.createElement("div",{className:"spin"},p.a.createElement(r.a,null)):p.a.createElement(s.a,{style:{width:"100%"},form:D,name:"edit-quote",onFinish:function(t){var e,a=V.map((function(t){return{product_id:t.product_id,price:t.price,quantity:t.quantity}}));$(!0);var n={status:t.status,id:null===R||void 0===R||null===(e=R.data)||void 0===e?void 0:e.id,products:a};O.b.mutate({mutation:T.a.SUBMIT_QUOTE,variables:{data:n},context:{headers:{TENANTID:"100001",Authorization:L}},refetchQueries:[{query:T.a.GET_ALL_QUOTE,context:{headers:{TENANTID:"100001",Authorization:L}}},{query:T.a.GET_SINGLE_QUOTE,variables:{query:{id:parseInt(A.id)}},context:{headers:{TENANTID:"100001",Authorization:L}}}]}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.updateSubmittedQuote;a.status||h.b.error(a.message),$(!1),h.b.success(a.message),setTimeout((function(){U.push("/admin/products/quote")}),2e3)})).catch((function(t){h.b.error("Something Went wrong !!!")}))},onFinishFailed:function(t){return console.log("form error info:\n",t)},labelCol:{span:4}},p.a.createElement(s.a.Item,{name:"status",label:"Status"},p.a.createElement(d.a,{defaultValue:null===R||void 0===R||null===(a=R.data)||void 0===a?void 0:a.status,style:{width:"50%"},options:[{label:"New",value:"new",disabled:!0},{label:"In Progress",value:"in_progress",disabled:"new"!==(null===R||void 0===R||null===(q=R.data)||void 0===q?void 0:q.status)},{label:"Save",value:"save",disabled:"new"!==(null===R||void 0===R||null===(j=R.data)||void 0===j?void 0:j.status)&&"in_progress"!==(null===R||void 0===R||null===(Q=R.data)||void 0===Q?void 0:Q.status)},{label:"Submitted",value:"submitted",disabled:"new"!==(null===R||void 0===R||null===(w=R.data)||void 0===w?void 0:w.status)&&"in_progress"!==(null===R||void 0===R||null===(x=R.data)||void 0===x?void 0:x.status)&&"save"!==(null===R||void 0===R||null===(k=R.data)||void 0===k?void 0:k.status)}]})),p.a.createElement(u.a,{className:"table-responsive",columns:tt,pagination:!1,rowKey:"banner_id",size:"small",dataSource:V}),p.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px",marginBottom:"10px"}},p.a.createElement(u.a,{className:"table-responsive",style:{width:"100%",marginTop:"20px",marginBottom:"20px"},columns:[{key:"total",title:"Total",dataIndex:"total",render:function(t){return"$ "+t},width:100},{key:"note",title:"Note",dataIndex:"note",width:300}],dataSource:[{key:1,total:Y,note:null===R||void 0===R||null===(N=R.data)||void 0===N?void 0:N.note}],pagination:!1})),p.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},p.a.createElement(s.a.Item,null,p.a.createElement(y.a,{loading:F,size:"default",htmlType:"submit",type:"primary",raised:!0},F?"Processing":"Save"),p.a.createElement(g.b,{to:"/admin/products/quote"},p.a.createElement(y.a,{style:{marginLeft:10},type:"light",size:"default"},"Cancel"))))))))))}}}]);
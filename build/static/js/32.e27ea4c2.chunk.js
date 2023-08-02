(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[32],{661:function(t,e,a){"use strict";var n=a(3),u=a(0),r={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0011.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 00-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8zm752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 00-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8z"}}]},name:"retweet",theme:"outlined"},l=a(15),i=function(t,e){return u.createElement(l.a,Object(n.a)(Object(n.a)({},t),{},{ref:e,icon:r}))};i.displayName="RetweetOutlined";e.a=u.forwardRef(i)},683:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var n,u,r,l,i,o=a(8),c=a(16),s={GET_ALL_QUOTE_STATUS:Object(c.d)(n||(n=Object(o.a)(["\n    query getQuoteStatusList {\n    getQuoteStatusList {\n      message\n      status\n      tenant_id\n      data {\n        id\n        name\n        slug\n        status\n      }\n    }\n  }"]))),GET_ALL_QUOTE:Object(c.d)(u||(u=Object(o.a)(["\n    query getSubmittedQuoteList($query:SubmittedQuoteListInput) {\n      getSubmittedQuoteList(query:$query) {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          updatedAt\n          quotedby {\n            id\n            first_name\n            last_name\n            email\n          }\n        }\n      }\n    }\n  "]))),GET_SINGLE_QUOTE:Object(c.d)(r||(r=Object(o.a)(["\n    query getSingleSubmittedQuote($query: GetSingleSubmittedQuoteInput) {\n      getSingleSubmittedQuote(query: $query) {\n        message\n        status\n        data {\n          id\n          status\n          grand_total\n          note\n          createdAt\n          submittedquoteitems {\n            id\n            submittedquote_id\n            price\n            quantity\n            total_price\n            product {\n              id\n              prod_name\n              prod_slug\n              prod_sku\n              prod_partnum\n              createdAt\n            }\n            createdAt\n          }\n        }\n      }\n    }\n  "]))),REMOVE_QUOTE_ITEM:Object(c.d)(l||(l=Object(o.a)(["\n    mutation quoteItemDelete($data: QuoteItemDeleteInput) {\n      quoteItemDelete(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),SUBMIT_QUOTE:Object(c.d)(i||(i=Object(o.a)(["\n    mutation updateSubmittedQuote($data: SubmittedQuoteUpdateInput) {\n      updateSubmittedQuote(data: $data) {\n        message\n        status\n      }\n    }\n  "])))}},935:function(t,e,a){"use strict";a.r(e);a(150);var n=a(77),u=(a(202),a(63)),r=(a(200),a(97)),l=(a(201),a(74)),i=(a(148),a(45)),o=(a(166),a(98)),c=(a(100),a(38)),s=a(9),d=a(23),m=(a(640),a(643)),b=a(0),p=a.n(b),E=a(661),v=a(192),f=a(217),g=a(165),h=a(164),O=a(12),y=a(126),j=a.n(y),_=a(99),S=a(683),A=a(50),Q=a(219),q=a.n(Q),x=a(21),D=a.n(x),T=a(22),w=a(135),L=a(68),I=a.n(L),k=a(378),M=a.n(k),z=a(76),N=m.a.RangePicker,U=!1;e.default=function(){var t,e;Object(T.f)("quote");var a=Object(b.useState)({data:[],loading:!1,error:""}),m=Object(d.a)(a,2),y=m[0],Q=m[1],x=Object(b.useState)(!1),L=Object(d.a)(x,2),k=L[0],Y=L[1],F=Object(A.d)((function(t){return t.auth.token})),G=Object(b.useState)(!1),C=Object(d.a)(G,2),$=C[0],R=C[1],V=Object(b.useState)({data:[],isLoading:!0}),B=Object(d.a)(V,2),P=B[0],H=B[1],J=Object(b.useState)(null),K=Object(d.a)(J,2),W=K[0],X=K[1],Z=Object(b.useState)(!0),tt=Object(d.a)(Z,2),et=tt[0],at=tt[1],nt=Object(b.useState)({status:[],startDate:"",endDate:"",minAmount:"",maxAmount:"",searchQuery:""}),ut=Object(d.a)(nt,2),rt=ut[0],lt=ut[1];Object(b.useEffect)((function(){_.b.query({query:S.a.GET_ALL_QUOTE_STATUS,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getQuoteStatusList;if(!(null===a||void 0===a?void 0:a.status))return Object(z.a)();H({data:a.data,isLoading:!1})}))}),[]),Object(b.useEffect)((function(){U&&(rt.status.length>0||""!==rt.searchQuery||""!==rt.endDate||""!==rt.startDate||""!==rt.minAmount||""!==rt.maxAmount?at(!1):at(!0)),U=!0}),[rt]);var it=[{title:"Quoted By",dataIndex:["quotedby","first_name"],key:"first_name",width:100,ellipsis:!0,render:function(t,e){return"".concat(t," ").concat(e.quotedby.last_name)}},{title:"Email",dataIndex:["quotedby","email"],key:"email",width:150,ellipsis:!0,sorter:function(t,e){return t.email>e.email?1:-1}},{title:"Total",dataIndex:"grand_total",key:"grand_total",width:100,ellipsis:!0,sorter:function(t,e){return t.grand_total>e.grand_total?1:-1}},{title:"Status",dataIndex:"status",key:"status",align:"left",width:150,render:function(t){return p.a.createElement("span",{style:{borderRadius:".5em",padding:".5em 2.5em"}},t)},sorter:function(t,e){return t.status>e.status?1:-1}},{title:"Note",dataIndex:"note",key:"note",width:250,ellipsis:!0,sorter:function(t,e){return t.note>e.note?1:-1}},{title:"Date",dataIndex:"createdAt",key:"createdAt",width:120,align:"center",render:function(t,e){return p.a.createElement("span",{className:"status-text"},p.a.createElement(q.a,{format:"DD-MMM-YYYY"},parseInt(t)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",width:100,render:function(t,e){return p.a.createElement(p.a.Fragment,null,p.a.createElement(O.b,{to:"/admin/products/quote/edit/".concat(e.id),style:{margin:".5em",color:"#096dd9"}},p.a.createElement(j.a,{name:"edit",style:{color:"#5F63F2"}})))}}],ot=function(t,e){return[M()(t,"YYYY-MM-DD"),M()(e,"YYYY-MM-DD")]};return p.a.createElement(p.a.Fragment,null,p.a.createElement(f.a,{title:"Quote List",buttons:[p.a.createElement("div",{key:"1",className:"page-header-actions"},p.a.createElement(c.a,{size:"small",type:"white",onClick:function(){return Y((function(t){return!t}))}},p.a.createElement(D.a,{icon:"filter"}),"Filter"),p.a.createElement(c.a,{size:"small",type:"white",onClick:function(){X(null),at(!0),lt({status:[],startDate:"",endDate:"",minAmount:"",maxAmount:"",searchQuery:""})}},p.a.createElement(E.a,null),"Reset Filter"))]}),p.a.createElement(g.b,null,p.a.createElement(r.a,{gutter:25},p.a.createElement(l.a,{sm:24,xs:24},p.a.createElement(h.a,{headless:!0},y.loading?p.a.createElement("div",{className:"spin"},p.a.createElement(o.a,null)):y.error?p.a.createElement("p",null,y.error):p.a.createElement(p.a.Fragment,null,p.a.createElement(r.a,{gutter:25},p.a.createElement(l.a,{span:18},p.a.createElement(i.a,{placeholder:"Search Quotes...",prefix:p.a.createElement(v.a,null),value:null===rt||void 0===rt?void 0:rt.searchQuery,onChange:function(t){t.persist();var e=t.target.value;lt((function(t){return Object(s.a)(Object(s.a)({},t),{},{searchQuery:e})}))}})),p.a.createElement(l.a,{span:6},p.a.createElement(c.a,{size:"large",type:"primary",disabled:et,onClick:function(){var t,e,a,n,u,r;Q((function(t){return Object(s.a)(Object(s.a)({},t),{},{loading:!0})})),_.b.query({query:S.a.GET_ALL_QUOTE,variables:{query:{searchQuery:null!==(t=rt.searchQuery)&&void 0!==t?t:"",statuses:null!==(e=rt.status)&&void 0!==e?e:null,quoteEntryStartDate:null!==(a=rt.startDate)&&void 0!==a?a:"",quoteEntryEndDate:null!==(n=rt.endDate)&&void 0!==n?n:"",minAmount:null!==(u=parseFloat(rt.minAmount))&&void 0!==u?u:null,maxAmount:null!==(r=parseFloat(rt.maxAmount))&&void 0!==r?r:null}},context:{headers:{TENANTID:"100001",Authorization:F}}}).then((function(t){var e,a=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getSubmittedQuoteList;if(!(null===a||void 0===a?void 0:a.status))return Object(z.a)();Q(a)})).finally((function(){Q((function(t){return Object(s.a)(Object(s.a)({},t),{},{loading:!1})})),R(!$)}))}},"Search"))),p.a.createElement("br",null),k&&p.a.createElement("div",{style:{marginBottom:"2.5em"}},p.a.createElement(r.a,{gutter:16},p.a.createElement(l.a,{span:8},"Status: ",p.a.createElement("br",null),p.a.createElement(u.a,{style:{width:"100%"},placeholder:"Select status",size:"middle",mode:"multiple",value:null===rt||void 0===rt?void 0:rt.status,onDeselect:function(t){return lt((function(e){return Object(s.a)(Object(s.a)({},e),{},{status:e.status.filter((function(e){return e!==t}))})}))},onSelect:function(t){lt((function(e){return Object(s.a)(Object(s.a)({},e),{},{status:rt.status.concat(t)})}))},options:null===P||void 0===P?void 0:P.data.map((function(t){return{label:t.name,value:t.slug}}))})),p.a.createElement(l.a,{span:8},"Date: ",p.a.createElement("br",null),p.a.createElement(N,{style:{height:"40px",width:"100%"},size:"middle",allowClear:!0,picker:"date",value:""!==W?W:"",onChange:function(t){t?(lt((function(e){var a,n;return Object(s.a)(Object(s.a)({},e),{},{startDate:null!==(a=t[0]._d)&&void 0!==a?a:"",endDate:null!==(n=t[1]._d)&&void 0!==n?n:""})})),X(ot(t[0],t[1]))):X(null)}})),p.a.createElement(l.a,{span:8},"Amount: ",p.a.createElement("br",null),p.a.createElement(i.a.Group,{compact:!0,size:"default"},p.a.createElement(i.a,{type:"text",placeholder:"Min Amount",style:{width:"50%",height:"40px"},value:null!==(t=null===rt||void 0===rt?void 0:rt.minAmount)&&void 0!==t?t:"",onChange:function(t){t.persist(),lt((function(e){var a;return Object(s.a)(Object(s.a)({},e),{},{minAmount:null===t||void 0===t||null===(a=t.target)||void 0===a?void 0:a.value})}))}}),p.a.createElement(i.a,{type:"text",placeholder:"Max Ampunt",style:{width:"50%",height:"40px"},value:null!==(e=null===rt||void 0===rt?void 0:rt.maxAmount)&&void 0!==e?e:"",onChange:function(t){t.persist(),lt((function(e){var a;return Object(s.a)(Object(s.a)({},e),{},{maxAmount:null===t||void 0===t||null===(a=t.target)||void 0===a?void 0:a.value})}))}}))))),p.a.createElement("span",{className:"psp_list"},p.a.createElement(n.a,{className:"table-responsive",columns:it,pagination:{defaultPageSize:w.a.QUOTE_PER_PAGE,total:y.data?y.data.length:0,showTotal:function(t,e){return"".concat(e[0],"-").concat(e[1]," of ").concat(t," items")}},rowKey:"id",size:"small",dataSource:y.data?y.data:[]}))))))))}}}]);
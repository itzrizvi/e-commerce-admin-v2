(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[52],{759:function(e,t,a){"use strict";var n=a(3),r=a(0),i={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0011.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 00-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8zm752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 00-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8z"}}]},name:"retweet",theme:"outlined"},l=a(16),c=function(e,t){return r.createElement(l.a,Object(n.a)(Object(n.a)({},e),{},{ref:t,icon:i}))};c.displayName="RetweetOutlined";t.a=r.forwardRef(c)},985:function(e,t,a){"use strict";a.r(t);a(133);var n,r,i=a(71),l=(a(145),a(30)),c=(a(143),a(68)),o=(a(144),a(52)),u=(a(115),a(39)),d=(a(132),a(74)),s=(a(304),a(217)),p=a(7),m=a(8),b=a(14),f=(a(635),a(639)),v=a(0),h=a.n(v),g=a(19),E=a.n(g),y=a(120),O=a(101),j=a(99),_=a(100),A=a(759),D=a(195),S=a(12),x=a(23),P=a(28),w=a(103),I=a.n(w),T=a(72),C=a.n(T),L=a(122),k=a(157),N=a(219),z=a(17),U=a(33),Y=a(372),M=a.n(Y),q=a(218),F=a.n(q),R=f.a.RangePicker,G=!1,Q=null!==(n=C.a.get("permissions"))&&void 0!==n?n:"[]",V=JSON.parse(Q),W=!1;V.forEach((function(e){"product-all"===e.permission_name&&!0===e.read_access&&!0===e.edit_access&&(W=!0)}));t.default=function(){var e,t,a;Object(x.c)("product");var n=Object(v.useState)({data:[],isLoading:!1}),f=Object(b.a)(n,2),g=f[0],w=f[1],T=Object(v.useState)(!1),Y=Object(b.a)(T,2),q=Y[0],Q=Y[1],V=Object(v.useState)(!1),B=Object(b.a)(V,2),J=B[0],H=B[1],K=Object(v.useState)({data:[],isLoading:!0}),X=Object(b.a)(K,2),Z=X[0],$=X[1],ee=Object(v.useState)({data:[],isLoading:!0}),te=Object(b.a)(ee,2),ae=te[0],ne=te[1],re=Object(v.useState)({data:[],isLoading:!0}),ie=Object(b.a)(re,2),le=ie[0],ce=ie[1],oe=Object(v.useState)({data:[],isLoading:!0}),ue=Object(b.a)(oe,2),de=ue[0],se=ue[1],pe=Object(v.useState)(null),me=Object(b.a)(pe,2),be=me[0],fe=me[1],ve=Object(v.useState)(null),he=Object(b.a)(ve,2),ge=he[0],Ee=he[1],ye=Object(v.useState)(!0),Oe=Object(b.a)(ye,2),je=Oe[0],_e=Oe[1],Ae=Object(v.useState)({data:[],loading:!0,error:""}),De=Object(b.a)(Ae,2),Se=De[0],xe=De[1],Pe=Object(v.useState)(!1),we=Object(b.a)(Pe,2),Ie=we[0],Te=we[1],Ce=Object(v.useState)({availability:[],categories:[],condition:[],attributes:[],productrep:[],startDate:"",endDate:"",updatedStartDate:"",updatedEndDate:"",minPrice:"",maxPrice:"",searchQuery:""}),Le=Object(b.a)(Ce,2),ke=Le[0],Ne=Le[1];Object(v.useEffect)((function(){P.j.query({query:P.l.GET_ALL_CATEGORIES,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllCategories;if(a.status&&a.categories.length){var n=[];a.categories.forEach((function(e){var t=e.cat_name;n.push({cat_name:t,id:e.id}),e.subcategories&&e.subcategories.forEach((function(e){var a=e.cat_name;n.push({cat_name:"".concat(t," > ").concat(a),id:e.id}),e.subsubcategories&&e.subsubcategories.forEach((function(e){var r=e.cat_name;n.push({cat_name:"".concat(t," > ").concat(a," > ").concat(r),id:e.id})}))}))})),$({data:n,isLoading:!1})}})).catch((function(e){})),P.j.query({query:Object(z.d)(r||(r=Object(m.a)(["\n          query getAllAttributes {\n            getAllAttributes {\n              message\n              status\n              tenant_id\n              data {\n                id\n                attribute_name\n              }\n            }\n          }\n        "]))),context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllAttributes;a.status&&ne({data:a.data,isLoading:!1})})),P.j.query({query:P.m.GET_ALL_AVAILABILITY,context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllProductAvailabilityStatus;a.status&&ce({data:a.data,isLoading:!1})})),P.j.query({query:P.m.GET_ALL_CONDITIONS,context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllProductCondition;a.status&&se({data:a.data,isLoading:!1})}))}),[]);var ze=[{title:"ID",dataIndex:"id",key:"id",width:70,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Logo",dataIndex:"id",key:"id",width:70,render:function(e,t){return h.a.createElement(N.LazyLoadImage,{effect:"blur",width:"40",src:Object(k.renderImage)(t.id,t.prod_thumbnail,"product/image/thumbnail","128x128"),onError:k.errorImageSrc,alt:t.id})}},{title:"Product Name",dataIndex:"prod_name",key:"prod_name",ellipsis:!0,sorter:function(e,t){return e.prod_name.toUpperCase()>t.prod_name.toUpperCase()?1:-1}},{title:"Product SKU",dataIndex:"prod_sku",width:150,key:"prod_sku",ellipsis:!0,sorter:function(e,t){return e.prod_sku.toUpperCase()>t.prod_sku.toUpperCase()?1:-1}},{title:"Part NO",dataIndex:"prod_partnum",width:150,key:"prod_partnum",ellipsis:!0,sorter:function(e,t){return e.prod_partnum.toUpperCase()>t.prod_partnum.toUpperCase()?1:-1}},{title:"Status",dataIndex:"prod_status",key:"prod_status",width:110,align:"middle",sorter:function(e,t){return e.prod_status===t.prod_status?0:e.prod_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.prod_status===e},render:function(e,t){return h.a.createElement(s.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){P.j.mutate({mutation:P.k.UPDATE_PRODUCT,variables:{data:{prod_id:e.id,prod_status:t}},context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateProduct;if(!n.status)return U.b.error(n.message);U.b.success("".concat(e.prod_sku," status updated."))})).catch((function(e){return U.b.error("Something Went wrong !!")}))}(t,e)}})}},{title:"On Sale",dataIndex:"is_sale",key:"is_sale",align:"center",width:110,sorter:function(e,t){return e.is_sale===t.is_sale?0:e.is_sale?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.is_sale===e},render:function(e,t){return h.a.createElement(s.a,{defaultChecked:e,title:"Is Sale",onChange:function(e){return function(e,t){P.j.mutate({mutation:P.k.UPDATE_PRODUCT,variables:{data:{prod_id:e.id,is_sale:t}},context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateProduct;if(!n.status)return U.b.error(n.message);U.b.success("".concat(e.prod_sku," status updated."))})).catch((function(e){return U.b.error("Something Went wrong !!")}))}(t,e)}})}},{title:"Date of Entry",dataIndex:"createdAt",key:"createdAt",width:120,align:"center",sorter:function(e,t){return e.createdAt===t.createdAt?0:e.createdAt?-1:1},render:function(e,t){return h.a.createElement("span",{className:"status-text"},h.a.createElement(F.a,{format:"DD-MMM-YYYY"},parseInt(e)))}},{title:"Date of Update",dataIndex:"updatedAt",key:"updatedAt",width:120,align:"center",sorter:function(e,t){return e.updatedAt===t.updatedAt?0:e.updatedAt?-1:1},render:function(e,t){return h.a.createElement("span",{className:"status-text"},h.a.createElement(F.a,{format:"DD-MMM-YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",width:140,align:"center",render:function(e,t){return h.a.createElement(h.a.Fragment,null,h.a.createElement(S.b,{to:"/admin/products/view?id=".concat(t.id)},h.a.createElement(I.a,{name:"eye",style:{margin:".5em 1em",color:"rgb(46, 204, 113)"}})),h.a.createElement(S.b,{to:"/admin/products/edit?id=".concat(t.id)},h.a.createElement(I.a,{name:"edit",style:{margin:".5em 1em",color:"#5F63F2"}})))},key:"last_name"}],Ue=function(e,t){return[M()(e,"YYYY-MM-DD"),M()(t,"YYYY-MM-DD")]};return Object(v.useEffect)((function(){G&&(ke.availability.length>0||ke.categories.length>0||ke.condition.length>0||ke.attributes.length>0||""!==ke.searchQuery||""!==ke.endDate||""!==ke.startDate||""!==ke.updatedStartDate||""!==ke.updatedStartDate||""!==ke.minPrice||""!==ke.maxPrice||ke.productrep.length>0?_e(!1):_e(!0)),G=!0,P.j.query({query:P.e.GET_ALL_STAFF,context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllStaff;xe(a)})).catch((function(e){xe((function(e){return Object(p.a)(Object(p.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){xe((function(e){return Object(p.a)(Object(p.a)({},e),{},{loading:!1})}))})),W&&Te(!0)}),[ke]),h.a.createElement(h.a.Fragment,null,h.a.createElement(y.a,{title:"Products",buttons:[h.a.createElement("div",{key:"1",className:"page-header-actions"},h.a.createElement(_.a,{size:"small",type:"white",onClick:function(){return H((function(e){return!e}))}},h.a.createElement(E.a,{icon:"filter"}),"Filter"),h.a.createElement(_.a,{size:"small",type:"white",onClick:function(){fe(null),Ee(null),_e(!0),Ne({availability:[],categories:[],condition:[],attributes:[],productrep:[],startDate:"",endDate:"",minPrice:"",maxPrice:"",searchQuery:"",updatedEndDate:"",updatedStartDate:""})}},h.a.createElement(A.a,null),"Reset Filter"),h.a.createElement(S.b,{to:"/admin/products/add"},h.a.createElement(_.a,{size:"small",title:"Add Product",type:"primary"},h.a.createElement(E.a,{icon:"file-plus"}))))]}),h.a.createElement(O.b,null,h.a.createElement(c.a,{gutter:25},h.a.createElement(o.a,{sm:24,xs:24},h.a.createElement(j.a,{headless:!0},g.isLoading?h.a.createElement("div",{className:"spin"},h.a.createElement(d.a,null)):h.a.createElement(h.a.Fragment,null,h.a.createElement(c.a,{gutter:25},h.a.createElement(o.a,{span:15},h.a.createElement(u.a,{placeholder:"Search Products...",prefix:h.a.createElement(D.a,null),value:null===ke||void 0===ke?void 0:ke.searchQuery,onChange:function(e){e.persist();var t=e.target.value;Ne((function(e){return Object(p.a)(Object(p.a)({},e),{},{searchQuery:t})}))}})),h.a.createElement(o.a,{span:9},h.a.createElement(_.a,{size:"large",disabled:je,type:"primary",onClick:function(){var e,t,a,n,r,i,l;w((function(e){return Object(p.a)(Object(p.a)({},e),{},{isLoading:!0})})),P.j.query({query:P.l.GET_PRODUCT_LIST,variables:{query:{searchQuery:null!==(e=ke.searchQuery)&&void 0!==e?e:"",availability:ke.availability.length?ke.availability:null,attribute:ke.attributes.length?ke.attributes:null,category:ke.categories.length?ke.categories:null,condition:ke.condition.length?ke.condition:null,productRep:ke.productrep.length?ke.productrep:null,productEntryStartDate:null!==(t=ke.startDate)&&void 0!==t?t:"",productEntryEndDate:null!==(a=ke.endDate)&&void 0!==a?a:"",updatedStartDate:null!==(n=ke.updatedStartDate)&&void 0!==n?n:"",updatedEndDate:null!==(r=ke.updatedEndDate)&&void 0!==r?r:"",minPrice:null!==(i=parseFloat(ke.minPrice))&&void 0!==i?i:null,maxPrice:null!==(l=parseFloat(ke.maxPrice))&&void 0!==l?l:null}},context:{headers:{TENANTID:"100001",Authorization:C.a.get("psp_t")}},fetchPolicy:"cache-first"}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getProductList;(null===a||void 0===a?void 0:a.status)&&w(a)})).catch((function(e){w((function(e){return Object(p.a)(Object(p.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){w((function(e){return Object(p.a)(Object(p.a)({},e),{},{isLoading:!1})})),Q(!q)}))}},"Search"))),h.a.createElement("br",null),h.a.createElement("br",null),J&&h.a.createElement("div",{style:{marginBottom:"2.5em"}},h.a.createElement(c.a,{gutter:16},h.a.createElement(o.a,{span:8},"Availability: ",h.a.createElement("br",null),h.a.createElement(l.a,{style:{width:"100%"},placeholder:"Select status",size:"middle",mode:"multiple",value:null===ke||void 0===ke?void 0:ke.availability,onDeselect:function(e){return Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{availability:t.availability.filter((function(t){return t!==e}))})}))},onSelect:function(e){Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{availability:ke.availability.concat(parseInt(e))})}))},options:le.data.map((function(e){return{label:e.name,value:e.id}}))})),h.a.createElement(o.a,{span:8},"Category: ",h.a.createElement("br",null),h.a.createElement(l.a,{style:{width:"100%"},placeholder:Z.isLoading?"Loading..":"Select category",size:"middle",mode:"multiple",optionFilterProp:"label",value:null===ke||void 0===ke?void 0:ke.categories,onDeselect:function(e){return Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{categories:t.categories.filter((function(t){return t!==e}))})}))},onSelect:function(e){Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{categories:ke.categories.concat(parseInt(e))})}))},options:Z.data.map((function(e){return{label:e.cat_name,value:e.id}}))})),h.a.createElement(o.a,{span:8},"Date Added: ",h.a.createElement("br",null),h.a.createElement(R,{style:{height:"40px",width:"100%"},size:"small",allowClear:!0,picker:"date",value:""!==be?be:"",onChange:function(e){e?(Ne((function(t){var a,n;return Object(p.a)(Object(p.a)({},t),{},{startDate:null!==(a=e[0]._d)&&void 0!==a?a:"",endDate:null!==(n=e[1]._d)&&void 0!==n?n:""})})),fe(Ue(e[0],e[1]))):fe(null)}}))),h.a.createElement(c.a,{gutter:16,style:{marginTop:".5em"}},h.a.createElement(o.a,{span:8},"Condition: ",h.a.createElement("br",null),h.a.createElement(l.a,{style:{width:"100%"},placeholder:"Select Condition",size:"middle",mode:"multiple",value:null===ke||void 0===ke?void 0:ke.condition,onDeselect:function(e){return Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{condition:t.condition.filter((function(t){return t!==e}))})}))},onSelect:function(e){Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{condition:ke.condition.concat(parseInt(e))})}))},options:de.data.map((function(e){return{label:e.name,value:e.id}}))})),h.a.createElement(o.a,{span:8},"Attributes: ",h.a.createElement("br",null),h.a.createElement(l.a,{style:{width:"100%"},placeholder:ae.isLoading?"Loading..":"Select Attribute",size:"middle",mode:"multiple",value:null===ke||void 0===ke?void 0:ke.attributes,onDeselect:function(e){return Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{attributes:t.attributes.filter((function(t){return t!==e}))})}))},onSelect:function(e){Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{attributes:ke.attributes.concat(parseInt(e))})}))},options:ae.data.map((function(e){return{label:e.attribute_name,value:e.id}}))})),h.a.createElement(o.a,{span:8},"Price: ",h.a.createElement("br",null),h.a.createElement(u.a.Group,{compact:!0,size:"default"},h.a.createElement(u.a,{type:"number",placeholder:"Min",style:{width:"50%",height:"40px"},value:null!==(e=null===ke||void 0===ke?void 0:ke.minPrice)&&void 0!==e?e:"",onChange:function(e){e.persist(),Ne((function(t){var a;return Object(p.a)(Object(p.a)({},t),{},{minPrice:null===e||void 0===e||null===(a=e.target)||void 0===a?void 0:a.value})}))}}),h.a.createElement(u.a,{type:"number",placeholder:"Max",style:{width:"50%",height:"40px"},value:null!==(t=null===ke||void 0===ke?void 0:ke.maxPrice)&&void 0!==t?t:"",onChange:function(e){e.persist(),Ne((function(t){var a;return Object(p.a)(Object(p.a)({},t),{},{maxPrice:null===e||void 0===e||null===(a=e.target)||void 0===a?void 0:a.value})}))}})))),Ie&&h.a.createElement(c.a,{gutter:16,style:{marginTop:".5em"}},h.a.createElement(o.a,{span:8},"Product Rep: ",h.a.createElement("br",null),h.a.createElement(l.a,{style:{width:"100%"},size:"middle",mode:"multiple",value:null===ke||void 0===ke?void 0:ke.productrep,onDeselect:function(e){return Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{productrep:t.productrep.filter((function(t){return t!==e}))})}))},placeholder:Se.loading?"Loading...":"Select a Product Representative",options:null===Se||void 0===Se||null===(a=Se.data)||void 0===a?void 0:a.map((function(e){return{label:e.first_name+" "+e.last_name,value:e.id}})),onSelect:function(e){Ne((function(t){return Object(p.a)(Object(p.a)({},t),{},{productrep:ke.productrep.concat(parseInt(e))})}))}})),h.a.createElement(o.a,{span:8},"Date Updated: ",h.a.createElement("br",null),h.a.createElement(R,{style:{height:"40px",width:"100%"},size:"small",allowClear:!0,picker:"date",value:""!==ge?ge:"",onChange:function(e){e?(Ne((function(t){var a,n;return Object(p.a)(Object(p.a)({},t),{},{updatedStartDate:null!==(a=e[0]._d)&&void 0!==a?a:"",updatedEndDate:null!==(n=e[1]._d)&&void 0!==n?n:""})})),Ee(Ue(e[0],e[1]))):Ee(null)}})),h.a.createElement(o.a,{span:8},"Quantity: ",h.a.createElement("br",null),h.a.createElement(u.a.Group,{compact:!0,size:"default"},h.a.createElement(u.a,{type:"number",placeholder:"Min Amount",style:{width:"50%",height:"40px"}}),h.a.createElement(u.a,{type:"number",placeholder:"Max Amount",style:{width:"50%",height:"40px"}}))))),h.a.createElement("span",{className:"psp_list"},h.a.createElement(i.a,{className:"table-responsive",columns:ze,rowKey:"id",size:"small",dataSource:g.data?g.data:[],rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:L.a.PRODUCTS_PER_PAGE,total:g.data?g.data.length:0,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
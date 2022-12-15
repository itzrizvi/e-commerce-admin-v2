(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[67],{963:function(e,t,a){"use strict";a.r(t);a(143);var n,r=a(74),i=(a(121),a(55)),o=(a(122),a(43)),l=(a(167),a(36)),c=(a(116),a(35)),u=(a(133),a(73)),s=(a(374),a(301)),d=a(8),m=a(7),p=a(15),f=(a(631),a(634)),g=a(0),b=a.n(g),_=a(20),v=a.n(_),h=a(123),E=a(101),O=a(100),j=a(99),y=a(193),A=a(10),I=a(23),S=a(33),C=a(103),P=a.n(C),T=a(71),x=a.n(T),L=a(124),k=a(156),D=a(217),w=a(17),N=a(31),z=f.a.RangePicker;t.default=function(){Object(I.c)("product");var e=Object(g.useState)({data:[],isLoading:!0}),t=Object(p.a)(e,2),a=t[0],f=t[1],_=Object(g.useState)([]),C=Object(p.a)(_,2),T=C[0],U=C[1],q=Object(g.useState)(""),F=Object(p.a)(q,2),R=F[0],G=F[1],B=Object(g.useState)(!0),W=Object(p.a)(B,2),J=W[0],K=W[1],M=Object(g.useState)({data:[],isLoading:!0}),H=Object(p.a)(M,2),V=H[0],Y=H[1],Q=Object(g.useState)({data:[],isLoading:!0}),X=Object(p.a)(Q,2),Z=X[0],$=X[1],ee=Object(g.useState)({data:[],isLoading:!0}),te=Object(p.a)(ee,2),ae=te[0],ne=te[1],re=Object(g.useState)({data:[],isLoading:!0}),ie=Object(p.a)(re,2),oe=ie[0],le=ie[1],ce=Object(g.useState)({availability:[],categories:[],condition:[],attributes:[],startDate:"",endDate:"",minPrice:"",maxPrice:""}),ue=Object(p.a)(ce,2),se=ue[0],de=ue[1];Object(g.useEffect)((function(){S.j.query({query:S.l.GET_PRODUCT_LIST,context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getProductList;(null===a||void 0===a?void 0:a.status)&&f((function(e){return Object(m.a)(Object(m.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){f((function(e){return Object(m.a)(Object(m.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){f((function(e){return Object(m.a)(Object(m.a)({},e),{},{isLoading:!1})}))})),S.j.query({query:S.l.GET_ALL_CATEGORIES,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllCategories;if(a.status&&a.categories.length){var n=[];a.categories.forEach((function(e){var t=e.cat_name;n.push({cat_name:t,id:e.id}),e.subcategories&&e.subcategories.forEach((function(e){var a=e.cat_name;n.push({cat_name:"".concat(t," > ").concat(a),id:e.id}),e.subsubcategories&&e.subsubcategories.forEach((function(e){var r=e.cat_name;n.push({cat_name:"".concat(t," > ").concat(a," > ").concat(r),id:e.id})}))}))})),Y({data:n,isLoading:!1})}})).catch((function(e){})),S.j.query({query:Object(w.d)(n||(n=Object(d.a)(["\n          query getAllAttributes {\n            getAllAttributes {\n              message\n              status\n              tenant_id\n              data {\n                id\n                attribute_name\n              }\n            }\n          }\n        "]))),context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllAttributes;a.status&&$({data:a.data,isLoading:!1})})),S.j.query({query:S.n.GET_ALL_AVAILABILITY,context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllProductAvailabilityStatus;a.status&&ne({data:a.data,isLoading:!1})})),S.j.query({query:S.n.GET_ALL_CONDITIONS,context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllProductCondition;a.status&&le({data:a.data,isLoading:!1})}))}),[]);var me=[{title:"ID",dataIndex:"id",key:"id",width:70,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Logo",dataIndex:"id",key:"id",width:70,render:function(e,t){return b.a.createElement(D.LazyLoadImage,{effect:"blur",width:"40",src:Object(k.renderImage)(t.id,t.prod_thumbnail,"product/image/thumbnail","128x128"),onError:k.errorImageSrc,alt:t.id})}},{title:"Product Name",dataIndex:"prod_name",key:"prod_name",ellipsis:!0,sorter:function(e,t){return e.prod_name.toUpperCase()>t.prod_name.toUpperCase()?1:-1}},{title:"Product SKU",dataIndex:"prod_sku",key:"prod_sku",ellipsis:!0,sorter:function(e,t){return e.prod_sku.toUpperCase()>t.prod_sku.toUpperCase()?1:-1}},{title:"Part NO",dataIndex:"prod_partnum",key:"prod_partnum",ellipsis:!0,sorter:function(e,t){return e.prod_partnum.toUpperCase()>t.prod_partnum.toUpperCase()?1:-1}},{title:"Regular Price",dataIndex:"prod_regular_price",key:"prod_regular_price",ellipsis:!0,align:"center",sorter:function(e,t){return e.prod_regular_price>t.prod_regular_price?1:-1}},{title:"Sales Price",dataIndex:"prod_sale_price",key:"prod_sale_price",ellipsis:!0,align:"center",sorter:function(e,t){return e.prod_sale_price>t.prod_sale_price?1:-1}},{title:"Status",dataIndex:"prod_status",key:"prod_status",align:"right",sorter:function(e,t){return e.prod_status===t.prod_status?0:e.prod_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.prod_status===e},render:function(e,t){return b.a.createElement(s.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){S.j.mutate({mutation:S.k.UPDATE_PRODUCT,variables:{data:{prod_id:e.id,prod_status:t}},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateProduct;if(!n.status)return N.b.error(n.message);N.b.success("".concat(e.prod_sku," status updated."))})).catch((function(e){return N.b.error("Something Went wrong !!")}))}(t,e)}})}},{title:"Is Serial",dataIndex:"is_serial",key:"is_serial",align:"right",sorter:function(e,t){return e.is_serial===t.is_serial?0:e.is_serial?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.is_serial===e},render:function(e,t){return b.a.createElement(s.a,{defaultChecked:e,title:"Is Serial",onChange:function(e){return function(e,t){S.j.mutate({mutation:S.k.PRODUCT_IS_SERIAL_STATUS_CHANGE,variables:{data:{id:e.id,is_serial:t}},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.changeProductIsSerial;if(!n.status)return N.b.error(n.message);N.b.success("".concat(e.prod_sku," serial status updated."))})).catch((function(e){return N.b.error("Something Went wrong !!")}))}(t,e)}})}},{title:"Is Sale",dataIndex:"is_sale",key:"is_sale",align:"right",sorter:function(e,t){return e.is_sale===t.is_sale?0:e.is_sale?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.is_sale===e},render:function(e,t){return b.a.createElement(s.a,{defaultChecked:e,title:"Is Sale",onChange:function(e){return function(e,t){S.j.mutate({mutation:S.k.UPDATE_PRODUCT,variables:{data:{prod_id:e.id,is_sale:t}},context:{headers:{TENANTID:"100001",Authorization:x.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateProduct;if(!n.status)return N.b.error(n.message);N.b.success("".concat(e.prod_sku," status updated."))})).catch((function(e){return N.b.error("Something Went wrong !!")}))}(t,e)}})}},{title:"Action",dataIndex:"action",width:140,align:"center",render:function(e,t){return b.a.createElement(b.a.Fragment,null,b.a.createElement(A.b,{to:"/admin/products/view?id=".concat(t.id)},b.a.createElement(P.a,{name:"eye",style:{margin:".5em 1em"}})),b.a.createElement(A.b,{to:"/admin/products/add?id=".concat(t.id)},b.a.createElement(P.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];return Object(g.useEffect)((function(){if(!a.isLoading){var e=a.data;if(R&&(e=a.data.filter((function(e){return((null===e||void 0===e?void 0:e.prod_name)+(null===e||void 0===e?void 0:e.prod_sku)).toLowerCase().includes(R.toLowerCase())}))),se.startDate){var t=new Date(se.startDate).valueOf(),n=new Date(se.endDate).valueOf();e=e.filter((function(e){var a=parseInt(e.createdAt);return a>=t&&a<=n}))}se.attributes.length&&(e=e.filter((function(e){return se.attributes.find((function(t){return e.prod_attributes.map((function(e){return e.attribute_data.id})).includes(t)}))}))),se.categories.length&&(e=e.filter((function(e){return se.categories.includes(e.category.id)}))),se.availability.length&&(e=e.filter((function(e){return se.availability.includes(e.prod_outofstock_status)}))),se.condition.length&&(e=e.filter((function(e){return se.condition.includes(e.prod_condition)}))),se.minPrice&&(e=e.filter((function(e){return e.prod_regular_price>=parseFloat(se.minPrice)}))),se.maxPrice&&(e=e.filter((function(e){return e.prod_regular_price<=parseFloat(se.maxPrice)}))),U(e)}}),[a,R,se]),b.a.createElement(b.a.Fragment,null,b.a.createElement(h.a,{title:"Products",buttons:[b.a.createElement("div",{key:"1",className:"page-header-actions"},b.a.createElement(j.a,{size:"small",type:"white",onClick:function(){return K((function(e){return!e}))}},b.a.createElement(v.a,{icon:"filter"}),"Filter"),b.a.createElement(A.b,{to:"/admin/products/add"},b.a.createElement(j.a,{size:"small",title:"Add Product",type:"primary"},b.a.createElement(v.a,{icon:"file-plus"}))))]}),b.a.createElement(E.b,null,b.a.createElement(i.a,{gutter:25},b.a.createElement(o.a,{sm:24,xs:24},b.a.createElement(O.a,{headless:!0},a.isLoading?b.a.createElement("div",{className:"spin"},b.a.createElement(u.a,null)):b.a.createElement(b.a.Fragment,null,b.a.createElement(c.a,{placeholder:"Search Products...",prefix:b.a.createElement(y.a,null),onChange:function(e){var t=e.target.value;G(t)}}),b.a.createElement("br",null),b.a.createElement("br",null),J&&b.a.createElement("div",{style:{marginBottom:"2.5em"}},b.a.createElement(i.a,{gutter:16},b.a.createElement(o.a,{span:8},"Availability: ",b.a.createElement("br",null),b.a.createElement(l.a,{style:{width:"100%"},placeholder:"Select status",size:"middle",mode:"multiple",onChange:function(e){de((function(t){return Object(m.a)(Object(m.a)({},t),{},{availability:e})}))},options:ae.data.map((function(e){return{label:e.name,value:e.name}}))})),b.a.createElement(o.a,{span:8},"Category: ",b.a.createElement("br",null),b.a.createElement(l.a,{style:{width:"100%"},placeholder:V.isLoading?"Loading..":"Select category",size:"middle",mode:"multiple",optionFilterProp:"label",onChange:function(e){de((function(t){return Object(m.a)(Object(m.a)({},t),{},{categories:e})}))},options:V.data.map((function(e){return{label:e.cat_name,value:e.id}}))})),b.a.createElement(o.a,{span:8},"Date: ",b.a.createElement("br",null),b.a.createElement(z,{style:{height:"40px",width:"100%"},size:"small",onChange:function(e){de((function(t){return Object(m.a)(Object(m.a)({},t),{},{startDate:e[0]._d,endDate:e[1]._d})}))}}))),b.a.createElement(i.a,{gutter:16,style:{marginTop:".5em"}},b.a.createElement(o.a,{span:8},"Condition: ",b.a.createElement("br",null),b.a.createElement(l.a,{style:{width:"100%"},placeholder:"Select Condition",size:"middle",mode:"multiple",onChange:function(e){return de((function(t){return Object(m.a)(Object(m.a)({},t),{},{condition:e})}))},options:oe.data.map((function(e){return{label:e.name,value:e.name}}))})),b.a.createElement(o.a,{span:8},"Attributes: ",b.a.createElement("br",null),b.a.createElement(l.a,{style:{width:"100%"},placeholder:Z.isLoading?"Loading..":"Select Attribute",size:"middle",mode:"multiple",onChange:function(e){return de((function(t){return Object(m.a)(Object(m.a)({},t),{},{attributes:e})}))},options:Z.data.map((function(e){return{label:e.attribute_name,value:e.id}}))})),b.a.createElement(o.a,{span:8},"Price: ",b.a.createElement("br",null),b.a.createElement(c.a.Group,{compact:!0,size:"default"},b.a.createElement(c.a,{type:"number",placeholder:"Min",style:{width:"50%"},onBlur:function(e){de((function(t){var a;return Object(m.a)(Object(m.a)({},t),{},{minPrice:null===e||void 0===e||null===(a=e.target)||void 0===a?void 0:a.value})}))}}),b.a.createElement(c.a,{type:"number",placeholder:"Max",style:{width:"50%"},onBlur:function(e){de((function(t){var a;return Object(m.a)(Object(m.a)({},t),{},{maxPrice:null===e||void 0===e||null===(a=e.target)||void 0===a?void 0:a.value})}))}}))))),b.a.createElement("span",{className:"psp_list"},b.a.createElement(r.a,{className:"table-responsive",columns:me,rowKey:"id",size:"small",dataSource:T,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:L.a.PRODUCTS_PER_PAGE,total:T.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
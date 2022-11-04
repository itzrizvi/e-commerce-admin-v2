(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[44],{867:function(e,t,a){"use strict";a.r(t);a(188);var n,r=a(94),i=(a(126),a(67)),l=(a(127),a(45)),o=(a(290),a(142)),c=(a(109),a(31)),u=(a(187),a(110)),d=(a(268),a(152)),s=a(10),p=a(12),m=a(26),f=(a(620),a(622)),b=a(0),g=a.n(b),_=a(21),v=a.n(_),E=a(151),h=a(129),O=a(128),j=a(186),y=a(181),A=a(11),L=a(33),C=a(46),P=a(118),I=a.n(P),S=a(50),w=a.n(S),x=a(130),T=a(153),k=a(210),D=a(20),N=f.a.RangePicker;t.default=function(){Object(L.b)("product");var e=Object(b.useState)({data:[],isLoading:!0}),t=Object(m.a)(e,2),a=t[0],f=t[1],_=Object(b.useState)([]),P=Object(m.a)(_,2),S=P[0],z=P[1],q=Object(b.useState)(""),U=Object(m.a)(q,2),F=U[0],G=U[1],R=Object(b.useState)(!0),B=Object(m.a)(R,2),J=B[0],K=B[1],M=Object(b.useState)({data:[],isLoading:!0}),V=Object(m.a)(M,2),W=V[0],Y=V[1],H=Object(b.useState)({data:[],isLoading:!0}),Q=Object(m.a)(H,2),X=Q[0],Z=Q[1],$=Object(b.useState)({data:[],isLoading:!0}),ee=Object(m.a)($,2),te=ee[0],ae=ee[1],ne=Object(b.useState)({data:[],isLoading:!0}),re=Object(m.a)(ne,2),ie=re[0],le=re[1],oe=Object(b.useState)({availability:[],categories:[],condition:[],attributes:[],startDate:"",endDate:"",minPrice:"",maxPrice:""}),ce=Object(m.a)(oe,2),ue=ce[0],de=ce[1];Object(b.useEffect)((function(){C.j.query({query:C.l.GET_PRODUCT_LIST,context:{headers:{TENANTID:"100001",Authorization:w.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getProductList;(null===a||void 0===a?void 0:a.status)&&f((function(e){return Object(p.a)(Object(p.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){f((function(e){return Object(p.a)(Object(p.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){f((function(e){return Object(p.a)(Object(p.a)({},e),{},{isLoading:!1})}))})),C.j.query({query:C.l.GET_ALL_CATEGORIES,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllCategories;if(a.status&&a.categories.length){var n=[];a.categories.forEach((function(e){var t=e.cat_name;n.push({cat_name:t,id:e.id}),e.subcategories&&e.subcategories.forEach((function(e){var a=e.cat_name;n.push({cat_name:"".concat(t," > ").concat(a),id:e.id}),e.subsubcategories&&e.subsubcategories.forEach((function(e){var r=e.cat_name;n.push({cat_name:"".concat(t," > ").concat(a," > ").concat(r),id:e.id})}))}))})),Y({data:n,isLoading:!1})}})).catch((function(e){})),C.j.query({query:Object(D.d)(n||(n=Object(s.a)(["\n            query getAllAttributes {\n                getAllAttributes {\n                  message\n                  status\n                  tenant_id\n                  data {\n                    id\n                    attribute_name\n                  }\n                }\n              }\n            "]))),context:{headers:{TENANTID:"100001",Authorization:w.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllAttributes;a.status&&Z({data:a.data,isLoading:!1})})),C.j.query({query:C.n.GET_ALL_AVAILABILITY,context:{headers:{TENANTID:"100001",Authorization:w.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllProductAvailabilityStatus;a.status&&ae({data:a.data,isLoading:!1})})),C.j.query({query:C.n.GET_ALL_CONDITIONS,context:{headers:{TENANTID:"100001",Authorization:w.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllProductCondition;a.status&&le({data:a.data,isLoading:!1})}))}),[]);var se=[{title:"ID",dataIndex:"id",key:"id",width:70,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Logo",dataIndex:"id",key:"id",width:70,render:function(e,t){return g.a.createElement(k.LazyLoadImage,{effect:"blur",width:"40",src:Object(T.renderImage)(t.id,t.prod_thumbnail,"product/image/thumbnail","128x128"),onError:T.errorImageSrc,alt:t.id})}},{title:"Product Name",dataIndex:"prod_name",key:"prod_name",ellipsis:!0,sorter:function(e,t){return e.prod_name.toUpperCase()>t.prod_name.toUpperCase()?1:-1}},{title:"Product SKU",dataIndex:"prod_sku",key:"prod_sku",ellipsis:!0,sorter:function(e,t){return e.prod_sku.toUpperCase()>t.prod_sku.toUpperCase()?1:-1}},{title:"Part NO",dataIndex:"prod_partnum",key:"prod_partnum",ellipsis:!0,sorter:function(e,t){return e.prod_partnum.toUpperCase()>t.prod_partnum.toUpperCase()?1:-1}},{title:"Regular Price",dataIndex:"prod_regular_price",key:"prod_regular_price",ellipsis:!0,align:"center",sorter:function(e,t){return e.prod_regular_price>t.prod_regular_price?1:-1}},{title:"Sales Price",dataIndex:"prod_sale_price",key:"prod_sale_price",ellipsis:!0,align:"center",sorter:function(e,t){return e.prod_sale_price>t.prod_sale_price?1:-1}},{title:"Status",dataIndex:"prod_status",key:"prod_status",align:"right",sorter:function(e,t){return e.prod_status===t.prod_status?0:e.prod_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.prod_status===e},render:function(e,t){return g.a.createElement(d.a,{defaultChecked:e,title:"Status",onChange:function(e){}})}},{title:"Action",dataIndex:"action",width:140,align:"center",render:function(e,t){return g.a.createElement(g.a.Fragment,null,g.a.createElement(A.b,{to:"/admin/products/view?id=".concat(t.id)},g.a.createElement(j.a,{size:"default",type:"white",title:"Edit"},"view")),g.a.createElement(A.b,{to:"/admin/products/add?id=".concat(t.id,"&name=").concat(t.prod_name)},g.a.createElement(I.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];return Object(b.useEffect)((function(){if(!a.isLoading){var e=a.data;if(F&&(e=a.data.filter((function(e){return((null===e||void 0===e?void 0:e.prod_name)+(null===e||void 0===e?void 0:e.prod_sku)).toLowerCase().includes(F.toLowerCase())}))),ue.startDate){var t=new Date(ue.startDate).valueOf(),n=new Date(ue.endDate).valueOf();e=e.filter((function(e){var a=parseInt(e.createdAt);return a>=t&&a<=n}))}ue.attributes.length&&(e=e.filter((function(e){return ue.attributes.find((function(t){return e.prod_attributes.map((function(e){return e.attribute_data.id})).includes(t)}))}))),ue.categories.length&&(e=e.filter((function(e){return ue.categories.includes(e.category.id)}))),ue.availability.length&&(e=e.filter((function(e){return ue.availability.includes(e.prod_outofstock_status)}))),ue.condition.length&&(e=e.filter((function(e){return ue.condition.includes(e.prod_condition)}))),ue.minPrice&&(e=e.filter((function(e){return e.prod_regular_price>=parseFloat(ue.minPrice)}))),ue.maxPrice&&(e=e.filter((function(e){return e.prod_regular_price<=parseFloat(ue.maxPrice)}))),z(e)}}),[a,F,ue]),g.a.createElement(g.a.Fragment,null,g.a.createElement(E.a,{title:"Products",buttons:[g.a.createElement("div",{key:"1",className:"page-header-actions"},g.a.createElement(j.a,{size:"small",type:"white",onClick:function(){return K((function(e){return!e}))}},g.a.createElement(v.a,{icon:"filter"}),"Filter"),g.a.createElement(A.b,{to:"/admin/products/add"},g.a.createElement(j.a,{size:"small",title:"Add Product",type:"primary"},g.a.createElement(v.a,{icon:"file-plus"}))))]}),g.a.createElement(h.b,null,g.a.createElement(i.a,{gutter:25},g.a.createElement(l.a,{sm:24,xs:24},g.a.createElement(O.a,{headless:!0},a.isLoading?g.a.createElement("div",{className:"spin"},g.a.createElement(u.a,null)):g.a.createElement(g.a.Fragment,null,g.a.createElement(c.a,{placeholder:"Search Products...",prefix:g.a.createElement(y.a,null),onChange:function(e){var t=e.target.value;G(t)}}),g.a.createElement("br",null),g.a.createElement("br",null),J&&g.a.createElement("div",{style:{marginBottom:"2.5em"}},g.a.createElement(i.a,{gutter:16},g.a.createElement(l.a,{span:8},"Availability : ",g.a.createElement("br",null),g.a.createElement(o.a,{style:{width:"100%"},placeholder:"Select status",size:"middle",mode:"multiple",onChange:function(e){de((function(t){return Object(p.a)(Object(p.a)({},t),{},{availability:e})}))},options:te.data.map((function(e){return{label:e.name,value:e.name}}))})),g.a.createElement(l.a,{span:8},"Category: ",g.a.createElement("br",null),g.a.createElement(o.a,{style:{width:"100%"},placeholder:W.isLoading?"Loading..":"select category",size:"middle",mode:"multiple",optionFilterProp:"label",onChange:function(e){de((function(t){return Object(p.a)(Object(p.a)({},t),{},{categories:e})}))},options:W.data.map((function(e){return{label:e.cat_name,value:e.id}}))})),g.a.createElement(l.a,{span:8},"Date: ",g.a.createElement("br",null),g.a.createElement(N,{style:{height:"40px",width:"100%"},size:"small",onChange:function(e){de((function(t){return Object(p.a)(Object(p.a)({},t),{},{startDate:e[0]._d,endDate:e[1]._d})}))}}))),g.a.createElement(i.a,{gutter:16,style:{marginTop:".5em"}},g.a.createElement(l.a,{span:8},"Condition: ",g.a.createElement("br",null),g.a.createElement(o.a,{style:{width:"100%"},placeholder:"Select Condition",size:"middle",mode:"multiple",onChange:function(e){return de((function(t){return Object(p.a)(Object(p.a)({},t),{},{condition:e})}))},options:ie.data.map((function(e){return{label:e.name,value:e.name}}))})),g.a.createElement(l.a,{span:8},"Attributes: ",g.a.createElement("br",null),g.a.createElement(o.a,{style:{width:"100%"},placeholder:X.isLoading?"Loading..":"select Attribute",size:"middle",mode:"multiple",onChange:function(e){return de((function(t){return Object(p.a)(Object(p.a)({},t),{},{attributes:e})}))},options:X.data.map((function(e){return{label:e.attribute_name,value:e.id}}))})),g.a.createElement(l.a,{span:8},"Price: ",g.a.createElement("br",null),g.a.createElement(c.a.Group,{compact:!0,size:"default"},g.a.createElement(c.a,{type:"number",placeholder:"Min",style:{width:"50%"},onBlur:function(e){de((function(t){var a;return Object(p.a)(Object(p.a)({},t),{},{minPrice:null===e||void 0===e||null===(a=e.target)||void 0===a?void 0:a.value})}))}}),g.a.createElement(c.a,{type:"number",placeholder:"Max",style:{width:"50%"},onBlur:function(e){de((function(t){var a;return Object(p.a)(Object(p.a)({},t),{},{maxPrice:null===e||void 0===e||null===(a=e.target)||void 0===a?void 0:a.value})}))}}))))),g.a.createElement("span",{className:"psp_list"},g.a.createElement(r.a,{className:"table-responsive",columns:se,rowKey:"id",size:"small",dataSource:S,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:x.a.PRODUCTS_PER_PAGE,total:S.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
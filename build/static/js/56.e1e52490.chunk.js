(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[56],{973:function(e,t,a){"use strict";a.r(t);a(129);var n=a(61),r=(a(130),a(45)),c=(a(140),a(72)),i=(a(117),a(38)),s=(a(131),a(71)),o=(a(360),a(292)),u=(a(294),a(141)),l=a(14),d=a(0),m=a.n(d),g=a(20),f=a.n(g),_=a(118),v=a(99),h=a(98),E=a(97),p=a(189),b=a(10),C=a(101),y=a.n(C),j=a(33),S=a(119),A=a(212),O=a(152),F=a(69),w=a.n(F),x=a(31),I=a(23);t.default=function(){Object(I.c)("category");var e=Object(d.useState)([]),t=Object(l.a)(e,2),a=t[0],g=t[1],C=Object(d.useState)({data:[],loading:!0}),F=Object(l.a)(C,2),T=F[0],k=F[1],N=Object(d.useState)([]),L=Object(l.a)(N,2),P=L[0],z=L[1],D=Object(d.useState)(!1),G=Object(l.a)(D,2),U=(G[0],G[1],Object(d.useState)("")),R=Object(l.a)(U,2),Y=R[0],q=R[1],J=Object(d.useState)(!1),K=Object(l.a)(J,2);K[0],K[1];Object(d.useEffect)((function(){j.j.query({query:j.l.GET_ALL_CATEGORIES,context:{headers:{TENANTID:"100001"}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllCategories;a.status&&g(a.categories)})).catch((function(e){}))}),[]),Object(d.useEffect)((function(){if(a.length){var e=[];a.forEach((function(t){var a=t.cat_name,n=t.cat_sort_order;e.push({cat_name:a,id:t.id,cat_sort_order:n,cat_des:t.cat_description,cat_isFeatured:t.is_featured,cat_status:t.cat_status,img:t.image}),t.subcategories&&t.subcategories.forEach((function(t){var n=t.cat_name;e.push({cat_name:"".concat(a," > ").concat(n),id:t.id,cat_des:t.cat_description,cat_isFeatured:t.is_featured,cat_status:t.cat_status,img:t.image}),t.subsubcategories&&t.subsubcategories.forEach((function(t){var r=t.cat_name;e.push({cat_name:"".concat(a," > ").concat(n," > ").concat(r),id:t.id,cat_des:t.cat_description,cat_isFeatured:t.is_featured,cat_status:t.cat_status,img:t.image})}))}))})),k({data:e,loading:!1})}}),[a]);var B=[{title:"ID",dataIndex:"id",key:"id",width:50,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Logo",dataIndex:"id",key:"id",width:70,render:function(e,t){return m.a.createElement(A.LazyLoadImage,{effect:"blur",width:"40",src:Object(O.renderImage)(t.id,t.img,"category","128x128"),onError:O.errorImageSrc,onL:!0,alt:t.id})}},{title:"Category Name",dataIndex:"cat_name",ellipsis:!0,key:"cat_name",sorter:function(e,t){return e.cat_name.toUpperCase()>t.cat_name.toUpperCase()?1:-1}},{title:"Featured",dataIndex:"cat_isFeatured",width:110,align:"center",key:"cat_isFeatured",sorter:function(e,t){return e.cat_isFeatured===t.cat_isFeatured?0:e.cat_isFeatured?-1:1},filters:[{text:"Featured",value:!0},{text:"Not Featured",value:!1}],onFilter:function(e,t){return t.cat_isFeatured===e},render:function(e,t){return m.a.createElement(u.a,{defaultChecked:e,onChange:function(e){return function(e,t){var a={data:{cat_id:e.id,is_featured:t}};j.j.mutate({mutation:j.k.UPDATE_CATEGORY,variables:a,context:{headers:{TENANTID:"100001",Authorization:w.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateCategory;if(!(null===n||void 0===n?void 0:n.status))return x.b.error(null===n||void 0===n?void 0:n.message);x.b.success("".concat(e.cat_name," Category isFeatured Status updated."))})).catch((function(e){console.log("\ud83d\ude80 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err",e),x.b.error("Something went wrong!!")}))}(t,e.target.checked)}})}},{title:"Status",dataIndex:"cat_status",width:90,key:"cat_status",sorter:function(e,t){return e.status===t.status?0:e.status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.cat_status===e},render:function(e,t){return m.a.createElement(o.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){var a={data:{cat_id:e.id,cat_status:t}};j.j.mutate({mutation:j.k.UPDATE_CATEGORY,variables:a,context:{headers:{TENANTID:"100001",Authorization:w.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateCategory;if(!(null===n||void 0===n?void 0:n.status))return x.b.error(null===n||void 0===n?void 0:n.message);x.b.success("".concat(e.cat_name," Category Status updated successfully."))})).catch((function(e){console.log("\ud83d\ude80 ~ file: AllAdmins.js ~ line 33 ~ handleStatusChange ~ err",e),x.b.error("Something went wrong!!")}))}(t,e)}})}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(e,t){return m.a.createElement(m.a.Fragment,null,m.a.createElement(b.b,{to:"/admin/categories/add?id=".concat(t.id)},m.a.createElement(y.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];return m.a.createElement(m.a.Fragment,null,m.a.createElement(_.a,{title:"Categories",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(b.b,{to:"/admin/categories/add"},m.a.createElement(E.a,{size:"small",title:"Add Category",type:"primary"},m.a.createElement(f.a,{icon:"file-plus"}))))]}),m.a.createElement(v.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(h.a,{headless:!0},T.loading?m.a.createElement("div",{className:"spin"},m.a.createElement(s.a,null)):m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{placeholder:"Search Permission...",prefix:m.a.createElement(p.a,null),onChange:function(e){var t=e.target.value;console.log("\ud83d\ude80 ~ file: ListCategories.js ~ line 216 ~ onChangeSearch ~ value",t),q(t),z(T.data.filter((function(e){return((null===e||void 0===e?void 0:e.cat_name)+(null===e||void 0===e?void 0:e.cat_des)+(null===e||void 0===e?void 0:e.id)+(null===e||void 0===e?void 0:e.cat_sort_order)).toLowerCase().includes(t.toLowerCase())})))}})," ",m.a.createElement("br",null)," ",m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(c.a,{className:"table-responsive",columns:B,rowKey:"id",size:"small",dataSource:Y?P:T.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:S.a.CATEGORY_PER_PAGE,total:Y?P.length:T.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[31],{624:function(e,a,t){"use strict";t.d(a,"a",(function(){return b}));var n,r,d,i,s,l,u,c,o=t(7),m=t(17),b={GET_ALL_BRAND:Object(m.d)(n||(n=Object(o.a)(["\n  query getAllBrands {\n  getAllBrands {\n    message\n    status\n    data {\n      id\n      brand_name\n      brand_slug\n      brand_description\n      brand_status\n      image\n      brand_sort_order\n      createdAt\n    }\n  }\n}"]))),GET_ALL_BRAND_WITH_CATEGORY:Object(m.d)(r||(r=Object(o.a)(["\nquery getAllBrands {\n  getAllBrands {\n    message\n    status\n    data {\n      id\n      brand_name\n      brand_slug\n      brand_status\n      brand_description\n      image\n      createdAt\n      updatedAt\n      categories {\n        id\n        cat_name\n        cat_slug\n        cat_status\n        subcategories {\n          id\n          cat_name\n          cat_slug\n          cat_status\n          subsubcategories {\n            id\n            cat_name\n            cat_slug\n            cat_status\n          }\n        }\n      }\n    }\n  }\n}\n\n"]))),GET_CATEGORIES:Object(m.d)(d||(d=Object(o.a)(["\n  query getParentCategories {\n    getParentCategories {\n      message\n      status\n      categories {\n        id\n        cat_name\n      }\n    }\n  }\n"]))),GET_SINGLE_BRAND:Object(m.d)(i||(i=Object(o.a)(["\n  query getSingleBrand($query: GetSingleBrandInput){\n    getSingleBrand(query: $query) {\n      message\n      status\n      data {\n        brand_name\n        brand_description\n        brand_status\n        brand_sort_order\n        image\n        categories {\n          id\n          cat_name\n        }\n      }\n    }\n  }\n"]))),BRAND_UPDATE:Object(m.d)(s||(s=Object(o.a)(["\n  mutation updateBrand($data: UpdateBrandInput, $file:Upload){\n    updateBrand(data:$data, file: $file){\n      message\n      status\n    }\n  }"]))),BRAND_UPDATE_WI:Object(m.d)(l||(l=Object(o.a)(["\n  mutation updateBrand($data: UpdateBrandInput){\n    updateBrand(data:$data){\n      message\n      status\n    }\n  }"]))),BRAND_ADD:Object(m.d)(u||(u=Object(o.a)(["\n    mutation createBrand($data: BrandCreateInput, $file:Upload) {\n      createBrand(data: $data, file:$file) {\n        message\n        status\n      }\n    }"]))),BRAND_ADD_WI:Object(m.d)(c||(c=Object(o.a)(["\n      mutation createBrand($data: BrandCreateInput) {\n        createBrand(data: $data) {\n          message\n          status\n        }\n     }"])))}},980:function(e,a,t){"use strict";t.r(a);t(130);var n=t(61),r=(t(131),t(45)),d=(t(140),t(72)),i=(t(117),t(41)),s=(t(132),t(71)),l=(t(362),t(294)),u=t(8),c=t(14),o=t(0),m=t.n(o),b=t(189),g=t(22),_=t.n(g),p=t(118),f=t(99),E=t(98),v=t(97),A=t(10),h=t(101),O=t.n(h),j=t(100),B=t(624),I=t(46),D=t(211),y=t.n(D),N=t(32),C=t(153),w=t(212),S=t(23),T=t(120);a.default=function(){var e,a;Object(S.c)("manufacture");var t=Object(o.useState)({data:[],loading:!0,error:""}),g=Object(c.a)(t,2),h=g[0],D=g[1],x=Object(o.useState)([]),$=Object(c.a)(x,2),k=$[0],R=$[1],U=Object(o.useState)(!1),L=Object(c.a)(U,2),G=L[0],q=L[1],P=Object(I.d)((function(e){return e.auth.token}));Object(o.useEffect)((function(){j.b.query({query:B.a.GET_ALL_BRAND,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getAllBrands;D((function(e){return Object(u.a)(Object(u.a)({},e),{},{data:null===t||void 0===t?void 0:t.data,error:""})}))})).catch((function(e){D((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){D((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))}))}),[]);var M=[{title:"ID",dataIndex:"id",key:"id",width:120,ellipsis:!0,sorter:function(e,a){return e.id.toUpperCase()>a.id.toUpperCase()?1:-1}},{title:"Name",dataIndex:"brand_name",key:"brand_name",width:120,ellipsis:!0,sorter:function(e,a){return e.brand_name.toUpperCase()>a.brand_name.toUpperCase()?1:-1}},{title:"Image",dataIndex:"image",key:"image",width:150,align:"center",render:function(e,a){return m.a.createElement(w.LazyLoadImage,{effect:"blur",height:"32",src:Object(C.renderImage)(a.id,a.image,"brand","",!0),onError:C.errorImageSrc,onL:!0,alt:a.brand_name})}},{title:"Alias",dataIndex:"brand_slug",key:"brand_slug",width:120,ellipsis:!0,sorter:function(e,a){return e.brand_slug.toUpperCase()>a.brand_slug.toUpperCase()?1:-1}},{title:"Description",dataIndex:"brand_description",key:"brand_description",width:200,ellipsis:!0},{title:"Status",dataIndex:"brand_status",key:"brand_status",align:"right",width:120,render:function(e,a){return m.a.createElement(l.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,a){var t={data:{brand_id:e.id,brand_status:a}};j.b.mutate({mutation:B.a.BRAND_UPDATE,variables:t,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(a){var t,n,r,d;if(!(null===a||void 0===a||null===(t=a.data)||void 0===t||null===(n=t.updateBrand)||void 0===n?void 0:n.status))return N.b.error(null===a||void 0===a||null===(r=a.data)||void 0===r||null===(d=r.updateBrand)||void 0===d?void 0:d.message);N.b.success("".concat(e.brand_name," Status updated."))})).catch((function(e){console.log(e),N.b.error("Something went wrong!!")}))}(a,e)}})},filters:[{text:"Enable",value:!0},{text:"Disable",value:!1}],onFilter:function(e,a){return a.brand_status===e},sorter:function(e,a){return e.brand_status-a.brand_status}},{title:"Date",dataIndex:"createdAt",key:"createdAt",align:"center",width:120,render:function(e,a){return m.a.createElement("span",{className:"status-text"},m.a.createElement(y.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",width:80,render:function(e,a){return m.a.createElement(m.a.Fragment,null,m.a.createElement(A.b,{to:"/admin/brand/edit?id=".concat(a.id)},m.a.createElement(O.a,{name:"edit"})))}}];return m.a.createElement(m.a.Fragment,null,m.a.createElement(p.a,{title:"Manufacture",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(A.b,{to:"/admin/brand/add"},m.a.createElement(v.a,{size:"small",title:"Add Manufacture",type:"primary"},m.a.createElement(_.a,{icon:"plus"}))))]}),m.a.createElement(f.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(E.a,{headless:!0},h.loading?m.a.createElement("div",{className:"spin"},m.a.createElement(s.a,null)):h.error?m.a.createElement("p",null,h.error):m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{placeholder:"Search in Manufacture...",prefix:m.a.createElement(b.a,null),onChange:function(e){var a=e.target.value;q(a),R(h.data.filter((function(e){return((null===e||void 0===e?void 0:e.brand_name)+(null===e||void 0===e?void 0:e.brand_slug)+(null===e||void 0===e?void 0:e.id)).toLowerCase().includes(a.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(d.a,{className:"table-responsive",columns:M,pagination:{defaultPageSize:T.a.BRAND_PER_PAGE,total:G?null===h||void 0===h||null===(e=h.data)||void 0===e?void 0:e.length:null===h||void 0===h||null===(a=h.data)||void 0===a?void 0:a.length,showTotal:function(e,a){return"".concat(a[0],"-").concat(a[1]," of ").concat(e," items")}},rowKey:"id",size:"small",dataSource:G?k:h.data,rowClassName:function(e,a){return a%2===0?"":"altTableClass"}}))))))))}}}]);
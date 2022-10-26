(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[24],{615:function(a,e,t){"use strict";t.d(e,"a",(function(){return m}));var n,r,d,i,u,s,l,c,o=t(11),b=t(29),m={GET_ALL_BRAND:Object(b.d)(n||(n=Object(o.a)(["\n  query getAllBrands {\n  getAllBrands {\n    message\n    tenant_id\n    status\n    data {\n      brand_uuid\n      brand_name\n      brand_slug\n      brand_description\n      brand_status\n      image\n      brand_sort_order\n      createdAt\n    }\n  }\n}"]))),GET_ALL_BRAND_WITH_CATEGORY:Object(b.d)(r||(r=Object(o.a)(["\nquery getAllBrands {\n  getAllBrands {\n    message\n    tenant_id\n    status\n    data {\n      brand_uuid\n      brand_name\n      brand_slug\n      brand_status\n      brand_description\n      image\n      createdAt\n      updatedAt\n      tenant_id\n      categories {\n        cat_id\n        cat_name\n        cat_slug\n        cat_status\n        subcategories {\n          cat_id\n          cat_name\n          cat_slug\n          cat_status\n          subsubcategories {\n            cat_id\n            cat_name\n            cat_slug\n            cat_status\n          }\n        }\n      }\n    }\n  }\n}\n\n"]))),GET_CATEGORIES:Object(b.d)(d||(d=Object(o.a)(["\n  query getParentCategories {\n    getParentCategories {\n      message\n      status\n      tenant_id\n      categories {\n        cat_id\n        cat_name\n      }\n    }\n  }\n"]))),GET_SINGLE_BRAND:Object(b.d)(i||(i=Object(o.a)(["\n  query getSingleBrand($brand_uuid : UUID!){\n    getSingleBrand(query: {brand_uuid: $brand_uuid}) {\n      message\n      tenant_id\n      status\n      data {\n        brand_name\n        brand_description\n        brand_status\n        brand_sort_order\n        image\n        categories {\n          cat_id\n          cat_name\n        }\n      }\n    }\n  }\n"]))),BRAND_UPDATE:Object(b.d)(u||(u=Object(o.a)(["\n  mutation updateBrand($data: UpdateBrandInput, $file:Upload){\n    updateBrand(data:$data, file: $file){\n      message\n      status\n    }\n  }"]))),BRAND_UPDATE_WI:Object(b.d)(s||(s=Object(o.a)(["\n  mutation updateBrand($data: UpdateBrandInput){\n    updateBrand(data:$data){\n      message\n      status\n    }\n  }"]))),BRAND_ADD:Object(b.d)(l||(l=Object(o.a)(["\n    mutation createBrand($data: BrandCreateInput, $file:Upload) {\n      createBrand(data: $data, file:$file) {\n        message\n        tenant_id\n        status\n      }\n    }"]))),BRAND_ADD_WI:Object(b.d)(c||(c=Object(o.a)(["\n      mutation createBrand($data: BrandCreateInput) {\n        createBrand(data: $data) {\n          message\n          tenant_id\n          status\n        }\n     }"])))}},862:function(a,e,t){"use strict";t.r(e);t(130);var n=t(67),r=(t(131),t(43)),d=(t(281),t(132)),i=(t(143),t(68)),u=(t(197),t(121)),s=(t(256),t(147)),l=t(12),c=t(33),o=t(0),b=t.n(o),m=t(172),_=t(25),g=t.n(_),p=t(146),f=t(145),E=t(144),v=t(176),h=t(10),A=t(113),O=t.n(A),j=t(283),B=t(615),I=t(44),D=t(286),y=t.n(D),N=t(48),C=t(259),w=t(284),S=t(35);e.default=function(){var a,e;Object(S.b)("manufacture");var t=Object(o.useState)({data:[],loading:!0,error:""}),_=Object(c.a)(t,2),A=_[0],D=_[1],T=Object(o.useState)([]),x=Object(c.a)(T,2),U=x[0],$=x[1],k=Object(o.useState)(!1),L=Object(c.a)(k,2),R=L[0],G=L[1],P=Object(I.d)((function(a){return a.auth.token}));Object(o.useEffect)((function(){j.b.query({query:B.a.GET_ALL_BRAND,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(a){var e,t=null===a||void 0===a||null===(e=a.data)||void 0===e?void 0:e.getAllBrands;D((function(a){return Object(l.a)(Object(l.a)({},a),{},{data:null===t||void 0===t?void 0:t.data,error:""})}))})).catch((function(a){D((function(a){return Object(l.a)(Object(l.a)({},a),{},{error:"Something went Wrong.!! "})}))})).finally((function(){D((function(a){return Object(l.a)(Object(l.a)({},a),{},{loading:!1})}))}))}),[A.data]);var q=[{title:"ID",dataIndex:"brand_uuid",key:"brand_uuid",width:120,ellipsis:!0,sorter:function(a,e){return a.brand_uuid.toUpperCase()>e.brand_uuid.toUpperCase()?1:-1}},{title:"Name",dataIndex:"brand_name",key:"brand_name",width:120,ellipsis:!0,sorter:function(a,e){return a.brand_name.toUpperCase()>e.brand_name.toUpperCase()?1:-1}},{title:"Image",dataIndex:"image",key:"image",width:70,align:"center",render:function(a,e){return b.a.createElement(w.LazyLoadImage,{effect:"blur",height:"32",src:Object(C.renderImage)(e.brand_uuid,e.image,"brand","128x128"),onError:C.errorImageSrc,onL:!0,alt:e.brand_name})}},{title:"Alias",dataIndex:"brand_slug",key:"brand_slug",width:120,ellipsis:!0,sorter:function(a,e){return a.brand_slug.toUpperCase()>e.brand_slug.toUpperCase()?1:-1}},{title:"Description",dataIndex:"brand_description",key:"brand_description",width:200,ellipsis:!0},{title:"Status",dataIndex:"brand_status",key:"brand_status",align:"right",width:120,render:function(a,e){return b.a.createElement(s.a,{defaultChecked:a,title:"Status",onChange:function(a){return function(a,e){var t={data:{brand_uuid:a.brand_uuid,brand_status:e}};j.b.mutate({mutation:B.a.BRAND_UPDATE,variables:t,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(e){var t,n,r,d;if(!(null===e||void 0===e||null===(t=e.data)||void 0===t||null===(n=t.updateBrand)||void 0===n?void 0:n.status))return N.b.error(null===e||void 0===e||null===(r=e.data)||void 0===r||null===(d=r.updateBrand)||void 0===d?void 0:d.message);N.b.success("".concat(a.brand_name," Status updated."))})).catch((function(a){console.log(a),N.b.error("Something went wrong!!")}))}(e,a)}})},filters:[{text:"Enable",value:!0},{text:"Disable",value:!1}],onFilter:function(a,e){return e.brand_status===a},sorter:function(a,e){return a.brand_status-e.brand_status}},{title:"Date",dataIndex:"createdAt",key:"createdAt",align:"center",width:120,render:function(a,e){return b.a.createElement("span",{className:"status-text"},b.a.createElement(y.a,{format:"DD MMMM YYYY"},parseInt(a)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",width:80,render:function(a,e){return b.a.createElement(b.a.Fragment,null,b.a.createElement(h.b,{to:"/admin/brand/edit?id=".concat(e.brand_uuid)},b.a.createElement(O.a,{name:"edit"})))}}];return b.a.createElement(b.a.Fragment,null,b.a.createElement(p.a,{title:"Manufacture",buttons:[b.a.createElement("div",{key:"1",className:"page-header-actions"},b.a.createElement(h.b,{to:"/admin/brand/add"},b.a.createElement(v.a,{size:"small",title:"Add Manufacture",type:"primary"},b.a.createElement(g.a,{icon:"plus"}))))]}),b.a.createElement(f.b,null,b.a.createElement(n.a,{gutter:25},b.a.createElement(r.a,{sm:24,xs:24},b.a.createElement(E.a,{headless:!0},A.loading?b.a.createElement("div",{className:"spin"},b.a.createElement(u.a,null)):A.error?b.a.createElement("p",null,A.error):b.a.createElement(b.a.Fragment,null,b.a.createElement(i.a,{placeholder:"Search in Manufacture...",prefix:b.a.createElement(m.a,null),onChange:function(a){var e=a.target.value;G(e),$(A.data.filter((function(a){return((null===a||void 0===a?void 0:a.brand_name)+(null===a||void 0===a?void 0:a.brand_slug)+(null===a||void 0===a?void 0:a.brand_uuid)).toLowerCase().includes(e.toLowerCase())})))}}),b.a.createElement("br",null),b.a.createElement("br",null),b.a.createElement("span",{className:"psp_list"},b.a.createElement(d.a,{className:"table-responsive",columns:q,pagination:{defaultPageSize:10,total:R?null===A||void 0===A||null===(a=A.data)||void 0===a?void 0:a.length:null===A||void 0===A||null===(e=A.data)||void 0===e?void 0:e.length,showTotal:function(a,e){return"".concat(e[0],"-").concat(e[1]," of ").concat(a," items")}},rowKey:"brand_uuid",size:"small",dataSource:R?U:A.data,rowClassName:function(a,e){return e%2==0?"":"altTableClass"}}))))))))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[24],{614:function(e,a,t){"use strict";t.d(a,"a",(function(){return b}));var n,r,d,i,u,l,s,c=t(12),o=t(30),b={GET_ALL_BRAND:Object(o.d)(n||(n=Object(c.a)(["\n  query getAllBrands {\n  getAllBrands {\n    message\n    tenant_id\n    status\n    data {\n      brand_uuid\n      brand_name\n      brand_slug\n      brand_description\n      brand_status\n      image\n      brand_sort_order\n      createdAt\n    }\n  }\n}"]))),GET_CATEGORIES:Object(o.d)(r||(r=Object(c.a)(["\n  query getParentCategories {\n    getParentCategories {\n      message\n      status\n      tenant_id\n      categories {\n        cat_id\n        cat_name\n      }\n    }\n  }\n"]))),GET_SINGLE_BRAND:Object(o.d)(d||(d=Object(c.a)(["\n  query getSingleBrand($brand_uuid : UUID!){\n    getSingleBrand(query: {brand_uuid: $brand_uuid}) {\n      message\n      tenant_id\n      status\n      data {\n        brand_name\n        brand_description\n        brand_status\n        brand_sort_order\n        image\n        categories {\n          cat_id\n          cat_name\n        }\n      }\n    }\n  }\n"]))),BRAND_UPDATE:Object(o.d)(i||(i=Object(c.a)(["\n  mutation updateBrand($data: UpdateBrandInput, $file:Upload){\n    updateBrand(data:$data, file: $file){\n      message\n      status\n    }\n  }"]))),BRAND_UPDATE_WI:Object(o.d)(u||(u=Object(c.a)(["\n  mutation updateBrand($data: UpdateBrandInput){\n    updateBrand(data:$data){\n      message\n      status\n    }\n  }"]))),BRAND_ADD:Object(o.d)(l||(l=Object(c.a)(["\n    mutation createBrand($data: BrandCreateInput, $file:Upload) {\n      createBrand(data: $data, file:$file) {\n        message\n        tenant_id\n        status\n      }\n    }"]))),BRAND_ADD_WI:Object(o.d)(s||(s=Object(c.a)(["\n      mutation createBrand($data: BrandCreateInput) {\n        createBrand(data: $data) {\n          message\n          tenant_id\n          status\n        }\n     }"])))}},863:function(e,a,t){"use strict";t.r(a);t(129);var n=t(66),r=(t(130),t(41)),d=(t(279),t(131)),i=(t(142),t(67)),u=(t(196),t(119)),l=(t(254),t(146)),s=t(11),c=t(33),o=t(0),b=t.n(o),m=t(171),_=t(25),g=t.n(_),p=t(145),f=t(144),v=t(143),E=t(175),h=t(10),O=t(111),j=t.n(O),A=t(281),B=t(614),I=t(42),D=t(284),y=t.n(D),N=t(46),C=t(257),S=t(282);a.default=function(){var e,a,t=Object(o.useState)({data:[],loading:!0,error:""}),_=Object(c.a)(t,2),O=_[0],D=_[1],x=Object(o.useState)([]),w=Object(c.a)(x,2),U=w[0],T=w[1],$=Object(o.useState)(!1),k=Object(c.a)($,2),L=k[0],R=k[1],P=Object(I.d)((function(e){return e.auth.token}));Object(o.useEffect)((function(){A.b.query({query:B.a.GET_ALL_BRAND,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(e){var a,t=null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.getAllBrands;D((function(e){return Object(s.a)(Object(s.a)({},e),{},{data:null===t||void 0===t?void 0:t.data,error:""})}))})).catch((function(e){D((function(e){return Object(s.a)(Object(s.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){D((function(e){return Object(s.a)(Object(s.a)({},e),{},{loading:!1})}))}))}),[O.data]);var M=[{title:"ID",dataIndex:"brand_uuid",key:"brand_uuid",width:120,ellipsis:!0,sorter:function(e,a){return e.brand_uuid.toUpperCase()>a.brand_uuid.toUpperCase()?1:-1}},{title:"Name",dataIndex:"brand_name",key:"brand_name",width:120,ellipsis:!0,sorter:function(e,a){return e.brand_name.toUpperCase()>a.brand_name.toUpperCase()?1:-1}},{title:"Image",dataIndex:"image",key:"image",width:70,align:"center",render:function(e,a){return b.a.createElement(S.LazyLoadImage,{effect:"blur",height:"32",src:Object(C.renderImage)(a.brand_uuid,a.image,"brand","128x128"),onError:C.errorImageSrc,onL:!0,alt:a.brand_name})}},{title:"Alias",dataIndex:"brand_slug",key:"brand_slug",width:120,ellipsis:!0,sorter:function(e,a){return e.brand_slug.toUpperCase()>a.brand_slug.toUpperCase()?1:-1}},{title:"Description",dataIndex:"brand_description",key:"brand_description",width:200,ellipsis:!0},{title:"Status",dataIndex:"brand_status",key:"brand_status",align:"right",render:function(e,a){return b.a.createElement(l.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,a){var t={data:{brand_uuid:e.brand_uuid,brand_status:a}};A.b.mutate({mutation:B.a.BRAND_UPDATE,variables:t,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(a){var t,n,r,d;if(!(null===a||void 0===a||null===(t=a.data)||void 0===t||null===(n=t.updateBrand)||void 0===n?void 0:n.status))return N.b.error(null===a||void 0===a||null===(r=a.data)||void 0===r||null===(d=r.updateBrand)||void 0===d?void 0:d.message);N.b.success("".concat(e.brand_name," Status updated."))})).catch((function(e){console.log(e),N.b.error("Something went wrong!!")}))}(a,e)}})},filters:[{text:"Enable",value:!0},{text:"Disable",value:!1}],onFilter:function(e,a){return a.brand_status===e},sorter:function(e,a){return e.brand_status-a.brand_status}},{title:"Date",dataIndex:"createdAt",key:"createdAt",align:"center",render:function(e,a){return b.a.createElement("span",{className:"status-text"},b.a.createElement(y.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",render:function(e,a){return b.a.createElement(b.a.Fragment,null,b.a.createElement(h.b,{to:"/admin/brand/edit?id=".concat(a.brand_uuid)},b.a.createElement(j.a,{name:"edit"})))}}];return b.a.createElement(b.a.Fragment,null,b.a.createElement(p.a,{title:"Manufacture",buttons:[b.a.createElement("div",{key:"1",className:"page-header-actions"},b.a.createElement(h.b,{to:"/admin/brand/add"},b.a.createElement(E.a,{size:"small",title:"Add Manufacture",type:"primary"},b.a.createElement(g.a,{icon:"plus"}))))]}),b.a.createElement(f.b,null,b.a.createElement(n.a,{gutter:25},b.a.createElement(r.a,{sm:24,xs:24},b.a.createElement(v.a,{headless:!0},O.loading?b.a.createElement("div",{className:"spin"},b.a.createElement(u.a,null)):O.error?b.a.createElement("p",null,O.error):b.a.createElement(b.a.Fragment,null,b.a.createElement(i.a,{placeholder:"Search in Manufacture...",prefix:b.a.createElement(m.a,null),onChange:function(e){var a=e.target.value;R(a),T(O.data.filter((function(e){return((null===e||void 0===e?void 0:e.brand_name)+(null===e||void 0===e?void 0:e.brand_slug)+(null===e||void 0===e?void 0:e.brand_uuid)).toLowerCase().includes(a.toLowerCase())})))}}),b.a.createElement("br",null),b.a.createElement("br",null),b.a.createElement("span",{className:"psp_list"},b.a.createElement(d.a,{className:"table-responsive",columns:M,pagination:{defaultPageSize:10,total:L?null===O||void 0===O||null===(e=O.data)||void 0===e?void 0:e.length:null===O||void 0===O||null===(a=O.data)||void 0===a?void 0:a.length,showTotal:function(e,a){return"".concat(a[0],"-").concat(a[1]," of ").concat(e," items")}},rowKey:"brand_uuid",size:"small",dataSource:L?U:O.data,rowClassName:function(e,a){return a%2==0?"":"altTableClass"}}))))))))}}}]);
(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[16],{628:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a,r,i,l,d,s,u,o=n(9),c=n(19),m={BANNER_ADD:Object(c.d)(a||(a=Object(o.a)(["\n    mutation addBanner($data: BannerInput) {\n        addBanner(data: $data) {\n        message\n        status\n        data {\n            id\n        }\n      }\n    }"]))),BANNER_IMAGE_ADD:Object(c.d)(r||(r=Object(o.a)(["\n    mutation addBannerImage($data: BannerImageInput!) {\n      addBannerImage(data: $data) {\n        message\n        status\n        data {\n          id\n          title\n          link\n          sort_order\n        }\n      }\n    }"]))),GET_ALL_BANNER:Object(c.d)(i||(i=Object(o.a)(["\n    query getAllBanners{\n      getAllBanners {\n        message\n        status\n        tenant_id\n        data {\n          id\n          name\n          slug\n          status\n          createdAt\n        }\n      }\n    }"]))),GET_SINGLE_BANNER:Object(c.d)(l||(l=Object(o.a)(["\n    query getSingleBanner($banner_id : Int!){\n    getSingleBanner(query: {banner_id: $banner_id}) {\n      message\n      tenant_id\n      status\n      data {\n        id\n        name\n        status\n        banner_images {\n          id \n          image\n          link\n          sort_order\n          title\n        }\n      }\n    }\n  }"]))),BANNER_UPDATE:Object(c.d)(d||(d=Object(o.a)(["\n  mutation updateBanner($data: UpdateBannerInput){\n    updateBanner(data:$data){\n      message\n      status\n    }\n  }"]))),BANNER_IMAGE_UPDATE:Object(c.d)(s||(s=Object(o.a)(["\n    mutation updateBannerImage($data: UpdateBannerImageInput){\n    updateBannerImage(data: $data) {\n      message\n      status\n    }\n  }"]))),BANNER_IMAGE_DELETE:Object(c.d)(u||(u=Object(o.a)(["\n    mutation deleteBannerImage($banner_id: Int!) {\n      deleteBannerImage(data: {banner_id: $banner_id}) {\n        message\n        status\n        tenant_id\n      }\n    }"])))}},889:function(e,t,n){"use strict";n.r(t);n(126);var a=n(67),r=(n(127),n(45)),i=(n(188),n(94)),l=(n(109),n(31)),d=(n(187),n(110)),s=(n(268),n(152)),u=n(12),o=n(26),c=n(0),m=n.n(c),b=n(181),g=n(21),E=n.n(g),p=n(151),v=n(129),f=n(128),A=n(186),B=n(11),h=n(118),N=n.n(h),_=n(141),j=n(628),O=n(47),I=n(293),w=n.n(I),y=n(36),S=n(33),D=n(130);t.default=function(){var e,t;Object(S.b)("banner");var n=Object(c.useState)({data:[],loading:!0,error:""}),g=Object(o.a)(n,2),h=g[0],I=g[1],k=Object(c.useState)([]),x=Object(o.a)(k,2),C=x[0],T=x[1],$=Object(c.useState)(!1),R=Object(o.a)($,2),U=R[0],L=R[1],G=Object(O.d)((function(e){return e.auth.token}));Object(c.useEffect)((function(){_.b.query({query:j.a.GET_ALL_BANNER,context:{headers:{TENANTID:"100001",Authorization:G}}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllBanners;I((function(e){return Object(u.a)(Object(u.a)({},e),{},{data:null===n||void 0===n?void 0:n.data,error:""})}))})).catch((function(e){I((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){I((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))}))}),[]);var P=[{title:"ID",dataIndex:"id",key:"id",width:80,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Name",dataIndex:"name",key:"name",width:250,ellipsis:!0,sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Alias",dataIndex:"slug",key:"slug",width:250,ellipsis:!0,sorter:function(e,t){return e.slug.toUpperCase()>t.slug.toUpperCase()?1:-1}},{title:"Status",dataIndex:"status",key:"status",align:"right",width:120,render:function(e,t){return m.a.createElement(s.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){var n={data:{banner_id:e.id,status:t}};_.b.mutate({mutation:j.a.BANNER_UPDATE,variables:n,context:{headers:{TENANTID:"100001",Authorization:G}}}).then((function(t){var n,a,r,i=null===t||void 0===t||null===(n=t.data)||void 0===n||null===(a=n.updateBanner)||void 0===a?void 0:a.status;if(console.log(e),!i)return y.b.error(null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message);y.b.success("".concat(e.name," Status updated."))})).catch((function(e){console.log(e),y.b.error("Something went wrong!!")}))}(t,e)}})},filters:[{text:"Enable",value:!0},{text:"Disable",value:!1}],onFilter:function(e,t){return t.status===e},sorter:function(e,t){return e.status-t.status}},{title:"Date",dataIndex:"createdAt",key:"createdAt",width:120,align:"center",render:function(e,t){return m.a.createElement("span",{className:"status-text"},m.a.createElement(w.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",width:100,render:function(e,t){return m.a.createElement(m.a.Fragment,null,m.a.createElement(B.b,{to:"/admin/banner/edit?id=".concat(t.id)},m.a.createElement(N.a,{name:"edit"})))}}];return m.a.createElement(m.a.Fragment,null,m.a.createElement(p.a,{title:"Banner List",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(B.b,{to:"/admin/banner/add"},m.a.createElement(A.a,{size:"small",title:"Add Banner",type:"primary"},m.a.createElement(E.a,{icon:"plus"}))))]}),m.a.createElement(v.b,null,m.a.createElement(a.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(f.a,{headless:!0},h.loading?m.a.createElement("div",{className:"spin"},m.a.createElement(d.a,null)):h.error?m.a.createElement("p",null,h.error):m.a.createElement(m.a.Fragment,null,m.a.createElement(l.a,{placeholder:"Search in Banner...",prefix:m.a.createElement(b.a,null),onChange:function(e){var t=e.target.value;L(t),T(h.data.filter((function(e){return((null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.slug)+(null===e||void 0===e?void 0:e.id)).toLowerCase().includes(t.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(i.a,{className:"table-responsive",columns:P,pagination:{defaultPageSize:D.a.BANNER_PER_PAGE,total:U?null===h||void 0===h||null===(e=h.data)||void 0===e?void 0:e.length:null===h||void 0===h||null===(t=h.data)||void 0===t?void 0:t.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}},rowKey:"banner_uuid",size:"small",dataSource:U?C:h.data,rowClassName:function(e,t){return t%2===0?"":"altTableClass"}}))))))))}}}]);
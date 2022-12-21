(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[27],{633:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a,r,i,l,d,s,u,o=n(8),c=n(17),m={BANNER_ADD:Object(c.d)(a||(a=Object(o.a)(["\n    mutation addBanner($data: BannerInput) {\n      addBanner(data: $data) {\n        message\n        status\n        data {\n          id\n        }\n      }\n    }\n  "]))),BANNER_ITEM_ADD:Object(c.d)(r||(r=Object(o.a)(["\n    mutation addBannerItem($data: BannerItemInput!) {\n      addBannerItem(data: $data) {\n        message\n        status\n        data {\n          id\n        }\n      }\n    }\n  "]))),GET_ALL_BANNER:Object(c.d)(i||(i=Object(o.a)(["\n    query getAllBanners {\n      getAllBanners {\n        message\n        status\n        tenant_id\n        data {\n          id\n          name\n          slug\n          status\n          createdAt\n        }\n      }\n    }\n  "]))),GET_SINGLE_BANNER:Object(c.d)(l||(l=Object(o.a)(["\n    query getSingleBanner($banner_id: Int!) {\n      getSingleBanner(query: { banner_id: $banner_id }) {\n        message\n        tenant_id\n        status\n        data {\n          id\n          name\n          status\n          banner_items {\n            id\n            title\n            sub_title\n            link\n            price\n            sale_price\n            button_text\n            option_1\n            option_2\n            image\n            sort_order\n          }\n        }\n      }\n    }\n  "]))),BANNER_UPDATE:Object(c.d)(d||(d=Object(o.a)(["\n    mutation updateBanner($data: UpdateBannerInput) {\n      updateBanner(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),BANNER_ITEM_UPDATE:Object(c.d)(s||(s=Object(o.a)(["\n    mutation updateBannerItem($data: UpdateBannerItemInput) {\n      updateBannerItem(data: $data) {\n        message\n        status\n      }\n    }\n  "]))),BANNER_ITEM_DELETE:Object(c.d)(u||(u=Object(o.a)(["\n    mutation deleteBannerItem($banner_id: Int!) {\n      deleteBannerItem(data: { banner_id: $banner_id }) {\n        message\n        status\n        tenant_id\n      }\n    }\n  "])))}},983:function(e,t,n){"use strict";n.r(t);n(129);var a=n(61),r=(n(130),n(44)),i=(n(140),n(72)),l=(n(117),n(38)),d=(n(131),n(71)),s=(n(360),n(292)),u=n(7),o=n(14),c=n(0),m=n.n(c),b=n(189),E=n(22),p=n.n(E),g=n(118),v=n(99),f=n(98),_=n(97),B=n(10),h=n(101),N=n.n(h),A=n(100),j=n(633),O=n(46),I=n(211),w=n.n(I),y=n(31),S=n(23),T=n(119);t.default=function(){var e,t;Object(S.c)("banner");var n=Object(c.useState)({data:[],loading:!0,error:""}),E=Object(o.a)(n,2),h=E[0],I=E[1],D=Object(c.useState)([]),x=Object(o.a)(D,2),C=x[0],k=x[1],$=Object(c.useState)(!1),R=Object(o.a)($,2),U=R[0],L=R[1],P=Object(O.d)((function(e){return e.auth.token}));Object(c.useEffect)((function(){A.b.query({query:j.a.GET_ALL_BANNER,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllBanners;I((function(e){return Object(u.a)(Object(u.a)({},e),{},{data:null===n||void 0===n?void 0:n.data,error:""})}))})).catch((function(e){I((function(e){return Object(u.a)(Object(u.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){I((function(e){return Object(u.a)(Object(u.a)({},e),{},{loading:!1})}))}))}),[]);var M=[{title:"ID",dataIndex:"id",key:"id",width:80,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Name",dataIndex:"name",key:"name",width:250,ellipsis:!0,sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Alias",dataIndex:"slug",key:"slug",width:250,ellipsis:!0,sorter:function(e,t){return e.slug.toUpperCase()>t.slug.toUpperCase()?1:-1}},{title:"Status",dataIndex:"status",key:"status",align:"right",width:120,render:function(e,t){return m.a.createElement(s.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){var n={data:{banner_id:e.id,status:t}};A.b.mutate({mutation:j.a.BANNER_UPDATE,variables:n,context:{headers:{TENANTID:"100001",Authorization:P}}}).then((function(t){var n,a,r,i=null===t||void 0===t||null===(n=t.data)||void 0===n||null===(a=n.updateBanner)||void 0===a?void 0:a.status;if(console.log(e),!i)return y.b.error(null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message);y.b.success("".concat(e.name," Status updated."))})).catch((function(e){console.log(e),y.b.error("Something went wrong!!")}))}(t,e)}})},filters:[{text:"Enable",value:!0},{text:"Disable",value:!1}],onFilter:function(e,t){return t.status===e},sorter:function(e,t){return e.status-t.status}},{title:"Date",dataIndex:"createdAt",key:"createdAt",width:120,align:"center",render:function(e,t){return m.a.createElement("span",{className:"status-text"},m.a.createElement(w.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",width:100,render:function(e,t){return m.a.createElement(m.a.Fragment,null,m.a.createElement(B.b,{to:"/admin/banner/edit?id=".concat(t.id)},m.a.createElement(N.a,{name:"edit"})))}}];return m.a.createElement(m.a.Fragment,null,m.a.createElement(g.a,{title:"Banner List",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(B.b,{to:"/admin/banner/add"},m.a.createElement(_.a,{size:"small",title:"Add Banner",type:"primary"},m.a.createElement(p.a,{icon:"plus"}))))]}),m.a.createElement(v.b,null,m.a.createElement(a.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(f.a,{headless:!0},h.loading?m.a.createElement("div",{className:"spin"},m.a.createElement(d.a,null)):h.error?m.a.createElement("p",null,h.error):m.a.createElement(m.a.Fragment,null,m.a.createElement(l.a,{placeholder:"Search in Banner...",prefix:m.a.createElement(b.a,null),onChange:function(e){var t=e.target.value;L(t),k(h.data.filter((function(e){return((null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.slug)+(null===e||void 0===e?void 0:e.id)).toLowerCase().includes(t.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(i.a,{className:"table-responsive",columns:M,pagination:{defaultPageSize:T.a.BANNER_PER_PAGE,total:U?null===h||void 0===h||null===(e=h.data)||void 0===e?void 0:e.length:null===h||void 0===h||null===(t=h.data)||void 0===t?void 0:t.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}},rowKey:"id",size:"small",dataSource:U?C:h.data,rowClassName:function(e,t){return t%2===0?"":"altTableClass"}}))))))))}}}]);
(this.webpackJsonpprime_server_parts=this.webpackJsonpprime_server_parts||[]).push([[36],{1036:function(e,t,n){"use strict";n.r(t);n(196);var a=n(95),r=(n(197),n(72)),l=(n(147),n(74)),i=(n(145),n(44)),c=(n(162),n(96)),d=n(9),s=n(23),u=n(0),o=n.n(u),m=n(189),p=n(21),E=n.n(p),b=n(213),g=n(161),f=n(160),v=n(212),A=n(12),h=n(123),j=n.n(h),O=n(97),N=n(662),B=n(48),_=n(215),y=n.n(_),w=n(22),I=n(133);t.default=function(){var e,t;Object(w.f)("banner");var n=Object(u.useState)({data:[],loading:!0,error:""}),p=Object(s.a)(n,2),h=p[0],_=p[1],S=Object(u.useState)([]),k=Object(s.a)(S,2),x=k[0],C=k[1],D=Object(u.useState)(!1),L=Object(s.a)(D,2),U=L[0],R=L[1],T=Object(B.d)((function(e){return e.auth.token}));Object(u.useEffect)((function(){O.b.query({query:N.a.GET_ALL_BANNER,context:{headers:{TENANTID:"100001",Authorization:T}}}).then((function(e){var t,n=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllBanners;_((function(e){return Object(d.a)(Object(d.a)({},e),{},{data:null===n||void 0===n?void 0:n.data,error:""})}))})).catch((function(e){_((function(e){return Object(d.a)(Object(d.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){_((function(e){return Object(d.a)(Object(d.a)({},e),{},{loading:!1})}))}))}),[]);var $=[{title:"ID",dataIndex:"id",key:"id",width:80,ellipsis:!0,sorter:function(e,t){return e.id.toUpperCase()>t.id.toUpperCase()?1:-1}},{title:"Name",dataIndex:"name",key:"name",width:250,ellipsis:!0,sorter:function(e,t){return e.name.toUpperCase()>t.name.toUpperCase()?1:-1}},{title:"Alias",dataIndex:"slug",key:"slug",width:250,ellipsis:!0,sorter:function(e,t){return e.slug.toUpperCase()>t.slug.toUpperCase()?1:-1}},{title:"Date",dataIndex:"createdAt",key:"createdAt",width:120,align:"center",render:function(e,t){return o.a.createElement("span",{className:"status-text"},o.a.createElement(y.a,{format:"DD MMMM YYYY"},parseInt(e)))}},{title:"Action",dataIndex:"action",align:"right",key:"action",width:100,render:function(e,t){return o.a.createElement(o.a.Fragment,null,o.a.createElement(A.b,{to:"/admin/banner/edit/".concat(t.id)},o.a.createElement(j.a,{name:"edit"})))}}];return o.a.createElement(o.a.Fragment,null,o.a.createElement(b.a,{title:"Banner List",buttons:[o.a.createElement("div",{key:"1",className:"page-header-actions"},o.a.createElement(A.b,{to:"/admin/banner/add"},o.a.createElement(v.a,{size:"small",title:"Add Banner",type:"primary"},o.a.createElement(E.a,{icon:"plus"}))))]}),o.a.createElement(g.b,null,o.a.createElement(a.a,{gutter:25},o.a.createElement(r.a,{sm:24,xs:24},o.a.createElement(f.a,{headless:!0},h.loading?o.a.createElement("div",{className:"spin"},o.a.createElement(c.a,null)):h.error?o.a.createElement("p",null,h.error):o.a.createElement(o.a.Fragment,null,o.a.createElement(i.a,{placeholder:"Search in Banner...",prefix:o.a.createElement(m.a,null),onChange:function(e){var t=e.target.value;R(t),C(h.data.filter((function(e){return((null===e||void 0===e?void 0:e.name)+(null===e||void 0===e?void 0:e.slug)+(null===e||void 0===e?void 0:e.id)).toLowerCase().includes(t.toLowerCase())})))}}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("span",{className:"psp_list"},o.a.createElement(l.a,{className:"table-responsive",columns:$,pagination:{defaultPageSize:I.a.BANNER_PER_PAGE,total:U?null===h||void 0===h||null===(e=h.data)||void 0===e?void 0:e.length:null===h||void 0===h||null===(t=h.data)||void 0===t?void 0:t.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}},rowKey:"id",size:"small",dataSource:U?x:h.data}))))))))}},662:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a,r,l,i,c=n(8),d=n(16),s={BANNER_ADD:Object(d.d)(a||(a=Object(c.a)(["\n    mutation addBanner($data: BannerInput) {\n      addBanner(data: $data) {\n        message\n        status\n        id\n      }\n    }\n  "]))),GET_ALL_BANNER:Object(d.d)(r||(r=Object(c.a)(["\n    query getAllBanners {\n      getAllBanners {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          status\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),GET_SINGLE_BANNER:Object(d.d)(l||(l=Object(c.a)(["\n    query getSingleBanner($banner_id: Int!) {\n      getSingleBanner(query: { banner_id: $banner_id }) {\n        message\n        status\n        data {\n          id\n          name\n          slug\n          content\n          layout_type\n          status\n          createdAt\n          updatedAt\n        }\n      }\n    }\n  "]))),BANNER_UPDATE:Object(d.d)(i||(i=Object(c.a)(["\n    mutation updateBanner($data: UpdateBannerInput) {\n      updateBanner(data: $data) {\n        message\n        status\n      }\n    }\n  "])))}}}]);
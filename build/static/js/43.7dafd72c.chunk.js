(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[43],{868:function(t,e,n){"use strict";n.r(e);n(126);var a=n(67),o=(n(127),n(45)),r=(n(188),n(94)),u=(n(109),n(31)),c=(n(187),n(110)),i=(n(268),n(152)),s=n(12),l=n(95),d=n(26),p=n(0),m=n.n(p),_=n(21),f=n.n(_),g=n(181),b=n(151),E=n(129),v=n(128),y=n(186),h=n(11),O=n(118),x=n.n(O),C=n(46),j=n(50),S=n.n(j),k=n(36),A=n(130),I=n(33);e.default=function(){Object(I.b)("coupon");var t=Object(p.useState)(!1),e=Object(d.a)(t,2),n=(e[0],e[1],Object(l.a)(Array(10).keys()).map((function(t){return{n:"Coupon".concat(t+1),c:t+1,t:"aaa",aa:102,mia:100,maa:1e3,sd:"18 oct 2022",ed:"18 oct 2022",status:!0,d:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, architecto quod quidem fuga assumenda temporibus quam quae sapiente cupiditate voluptatum.",so:t+1}})),Object(p.useState)({data:[],isLoading:!0})),_=Object(d.a)(n,2),O=_[0],j=_[1],N=Object(p.useState)([]),w=Object(d.a)(N,2),U=w[0],D=w[1],L=Object(p.useState)(""),P=Object(d.a)(L,2),T=P[0],q=P[1];Object(p.useEffect)((function(){C.j.query({query:C.g.GET_ALL_COUPONS,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(t){var e,n=null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.getAllCoupons;(null===n||void 0===n?void 0:n.status)&&j((function(t){return Object(s.a)(Object(s.a)({},t),{},{data:null===n||void 0===n?void 0:n.data,error:""})}))})).catch((function(t){j((function(t){return Object(s.a)(Object(s.a)({},t),{},{error:"Something went Wrong.!! "})}))})).finally((function(){j((function(t){return Object(s.a)(Object(s.a)({},t),{},{isLoading:!1})}))}))}),[]);var z=[{title:"Name",dataIndex:"coupon_name",key:"coupon_name",sorter:function(t,e){return t.coupon_name.toUpperCase()>e.coupon_name.toUpperCase()?1:-1}},{title:"CODE",dataIndex:"coupon_code",key:"coupon_code",sorter:function(t,e){return t.coupon_code.toUpperCase()>e.coupon_code.toUpperCase()?1:-1}},{title:"Type",dataIndex:"coupon_type",key:"coupon_type",sorter:function(t,e){return t.coupon_type.toUpperCase()>e.coupon_type.toUpperCase()?1:-1}},{title:"Amount",dataIndex:"coupon_amount",key:"coupon_amount",align:"center",sorter:function(t,e){return t.coupon_amount===e.coupon_amount?0:t.coupon_amount?-1:1}},{title:"Min Amount",dataIndex:"coupon_minamount",key:"coupon_minamount",align:"center",sorter:function(t,e){return t.coupon_minamount===e.coupon_minamount?0:t.coupon_minamount?-1:1}},{title:"Max Amount",dataIndex:"coupon_maxamount",key:"coupon_maxamount",align:"center",sorter:function(t,e){return t.coupon_maxamount===e.coupon_maxamount?0:t.coupon_maxamount?-1:1}},{title:"Start Date",dataIndex:"coupon_startdate",key:"coupon_startdate",sorter:function(t,e){return t.coupon_startdate===e.coupon_startdate?0:t.coupon_startdate?-1:1},render:function(t,e){return new Date(parseInt(t)).toLocaleDateString()}},{title:"End Date",dataIndex:"coupon_enddate",key:"coupon_enddate",sorter:function(t,e){return t.coupon_enddate===e.coupon_enddate?0:t.coupon_enddate?-1:1},render:function(t,e){return new Date(parseInt(t)).toLocaleDateString()}},{title:"Sort Order",dataIndex:"coupon_sortorder",key:"coupon_sortorder",align:"center",sorter:function(t,e){return t.coupon_sortorder===e.coupon_sortorder?0:t.coupon_sortorder?-1:1}},{title:"Status",dataIndex:"coupon_status",key:"coupon_status",align:"center",sorter:function(t,e){return t.coupon_status===e.coupon_status?0:t.coupon_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(t,e){return e.attrgroup_status===t},render:function(t,e){return m.a.createElement(i.a,{defaultChecked:t,title:"Status",onChange:function(t){return F(e,t)}})}},{title:"Action",dataIndex:"id",key:"id",width:70,align:"right",render:function(t,e){return m.a.createElement(m.a.Fragment,null,m.a.createElement(h.b,{to:"/admin/products/add-coupon?id=".concat(t,"&name=").concat(e.coupon_name)},m.a.createElement(x.a,{name:"edit",style:{margin:".5em 1em"}})))}}],F=function(t,e){var n={data:{coupon_id:t.id,coupon_status:e}};console.log(n),C.j.mutate({mutation:C.f.UPDATE_COUPON,variables:n,context:{headers:{TENANTID:"100001",Authorization:S.a.get("psp_t")}}}).then((function(e){var n,a=null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.updateCoupon;if(!a.status)return k.b.error(a.message);k.b.success("".concat(t.coupon_name," status updated successfully"))})).catch((function(t){return console.log("got error on status update",t),k.b.error("Something Went wrong !!")}))};return m.a.createElement(m.a.Fragment,null,m.a.createElement(b.a,{title:"Coupons",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(h.b,{to:"/admin/products/add-coupon"},m.a.createElement(y.a,{size:"small",title:"Add Coupons",type:"primary"},m.a.createElement(f.a,{icon:"file-plus"}))))]}),m.a.createElement(E.b,null,m.a.createElement(a.a,{gutter:25},m.a.createElement(o.a,{sm:24,xs:24},m.a.createElement(v.a,{headless:!0},O.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(c.a,null)):m.a.createElement(m.a.Fragment,null,m.a.createElement(u.a,{placeholder:"Search Coupons...",prefix:m.a.createElement(g.a,null),onChange:function(t){var e=t.target.value;q(e),D(O.data.filter((function(t){return((null===t||void 0===t?void 0:t.coupon_name)+t.coupon_description+t.coupon_code).toLowerCase().includes(e.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(r.a,{scroll:{x:"max-content"},className:"table-responsive",columns:z,rowKey:"id",size:"small",dataSource:T?U:O.data,rowClassName:function(t,e){return e%2==0?"":"altTableClass"},pagination:{defaultPageSize:A.a.COUPON_GROUPS_PER_PAGE,total:T?U.length:O.data.length,showTotal:function(t,e){return"".concat(e[0],"-").concat(e[1]," of ").concat(t," items")}}}))))))))}}}]);
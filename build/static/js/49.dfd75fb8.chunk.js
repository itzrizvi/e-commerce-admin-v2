(this.webpackJsonpstrikingDash=this.webpackJsonpstrikingDash||[]).push([[49],{694:function(e,t,a){"use strict";a.r(t);a(156);var n=a(79),r=(a(157),a(37)),u=(a(545),a(544)),s=(a(300),a(218)),o=(a(220),a(159)),i=(a(521),a(522)),l=a(48),c=a(139),d=a(0),m=a.n(d),p=a(16),g=a.n(p),f=a(242),E=a(519),b=a(518),h=a(517),v=a(516),y=a(8),x=a(106),k=a.n(x),_=a(136),C=a(54),A=a.n(C),I=a(219);t.default=function(){var e=Object(c.a)(Array(10).keys()).map((function(e){return{n:"Coupon".concat(e+1),c:e+1,t:"aaa",aa:102,mia:100,maa:1e3,sd:"18 oct 2022",ed:"18 oct 2022",status:!0,d:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, architecto quod quidem fuga assumenda temporibus quam quae sapiente cupiditate voluptatum.",so:e+1}})),t=Object(d.useState)({data:e,isLoading:!1}),a=Object(l.a)(t,2),p=a[0],x=(a[1],Object(d.useState)([])),C=Object(l.a)(x,2),O=C[0],S=C[1],w=Object(d.useState)(""),N=Object(l.a)(w,2),U=N[0],j=N[1],D=[{title:"Name",dataIndex:"n",key:"n",sorter:function(e,t){return e.n.toUpperCase()>t.n.toUpperCase()?1:-1}},{title:"CODE",dataIndex:"c",key:"c",sorter:function(e,t){return e.c.toUpperCase()>t.c.toUpperCase()?1:-1}},{title:"Type",dataIndex:"t",key:"t",sorter:function(e,t){return e.t.toUpperCase()>t.t.toUpperCase()?1:-1}},{title:"Amount",dataIndex:"aa",key:"aa",sorter:function(e,t){return e.aa===t.aa?0:e.aa?-1:1}},{title:m.a.createElement("p",null,"Minimum",m.a.createElement("br",null),"Amount"),dataIndex:"mia",key:"mia",sorter:function(e,t){return e.mia===t.mia?0:e.mia?-1:1}},{title:m.a.createElement("p",null,"Maximum",m.a.createElement("br",null),"Amount"),dataIndex:"maa",key:"maa",sorter:function(e,t){return e.maa===t.maa?0:e.maa?-1:1}},{title:"Start Date",dataIndex:"sd",key:"sd",sorter:function(e,t){return e.sd===t.sd?0:e.sd?-1:1}},{title:"End Date",dataIndex:"ed",key:"ed",sorter:function(e,t){return e.ed===t.ed?0:e.ed?-1:1}},{title:"Sort Order",dataIndex:"so",key:"so",align:"center",sorter:function(e,t){return e.so===t.so?0:e.so?-1:1}},{title:"Status",dataIndex:"status",key:"status",align:"center",sorter:function(e,t){return e.status===t.status?0:e.status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.attrgroup_status===e},render:function(e,t){return m.a.createElement(i.a,{defaultChecked:e,title:"Status",onChange:function(e){return T(t,e)}})}},{title:"Action",dataIndex:"attr_group_uuid",key:"attr_group_uuid",width:70,align:"right",render:function(e,t){return m.a.createElement(m.a.Fragment,null,m.a.createElement(y.b,{to:"/admin/products/add-coupon?id=".concat(e,"&name=").concat(t.n)},m.a.createElement(k.a,{name:"edit",style:{margin:".5em 1em"}})))}}],T=function(e,t){var a={data:{attr_group_uuid:e.attr_group_uuid,attrgroup_status:t}};console.log(a),_.h.mutate({mutation:_.b.UPDATE_ATTR_GROUP,variables:a,context:{headers:{TENANTID:"100001",Authorization:A.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateAttrGroup;if(!n.status)return I.b.error(n.message);I.b.success("".concat(e.attr_group_name," status updated successfully"))})).catch((function(e){return console.log("got error on status update",e),I.b.error("Something Went wrong !!")}))};return m.a.createElement(m.a.Fragment,null,m.a.createElement(E.a,{title:"Coupons",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(y.b,{to:"/admin/products/add-coupon"},m.a.createElement(v.a,{size:"small",title:"Add Attribute Group",type:"primary"},m.a.createElement(g.a,{icon:"file-plus"}))))]}),m.a.createElement(b.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(h.a,{headless:!0},p.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(o.a,null)):m.a.createElement(m.a.Fragment,null,m.a.createElement(s.a,{placeholder:"Search Permission...",prefix:m.a.createElement(f.a,null),onChange:function(e){var t=e.target.value;j(t),S(p.data.filter((function(e){return null===e||void 0===e?void 0:e.g_n.toLowerCase().includes(t.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(u.a,{scroll:{x:"max-content"},className:"table-responsive",columns:D,rowKey:"g_s",size:"small",dataSource:U?O:p.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"}}))))))))}}}]);
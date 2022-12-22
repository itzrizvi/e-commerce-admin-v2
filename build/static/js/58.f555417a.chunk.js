(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[58],{981:function(e,t,r){"use strict";r.r(t);r(129);var a=r(61),o=(r(130),r(44)),n=(r(140),r(72)),u=(r(117),r(38)),s=(r(131),r(71)),c=r(7),i=(r(360),r(292)),l=r(14),m=r(0),d=r.n(m),p=r(22),g=r.n(p),_=r(118),f=r(99),E=r(98),v=r(97),b=r(10),h=r(101),O=r.n(h),S=r(189),C=r(119),j=r(33),y=r(69),G=r.n(y),w=r(31),U=r(23);t.default=function(){Object(U.c)("customer-group");var e=Object(m.useState)({data:[],isLoading:!0}),t=Object(l.a)(e,2),r=t[0],p=t[1],h=Object(m.useState)([]),y=Object(l.a)(h,2),x=y[0],A=y[1],T=Object(m.useState)(""),N=Object(l.a)(T,2),k=N[0],P=N[1],I=[{title:"Group Name",dataIndex:"customer_group_name",key:"customer_group_name",sorter:function(e,t){return e.customer_group_name.toUpperCase()>t.customer_group_name.toUpperCase()?1:-1}},{title:"Group Description",dataIndex:"customergroup_description",key:"customergroup_description",ellipsis:!0,sorter:function(e,t){return e.customergroup_description.toUpperCase()>t.customergroup_description.toUpperCase()?1:-1}},{title:"Sort Order",dataIndex:"customergroup_sortorder",key:"customergroup_sortorder",width:100,align:"center",sorter:function(e,t){return e.customergroup_sortorder===t.customergroup_sortorder?0:e.customergroup_sortorder?-1:1}},{title:"Status",dataIndex:"customergroup_status",key:"customergroup_status",align:"center",width:100,sorter:function(e,t){return e.customergroup_status===t.customergroup_status?0:e.customergroup_status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.customergroup_status===e},render:function(e,t){return d.a.createElement(i.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){var r={data:{id:e.id,customergroup_status:t}};j.j.mutate({mutation:j.h.UPDATE_CUSTOMER_GROUP,variables:r,context:{headers:{TENANTID:"100001",Authorization:G.a.get("psp_t")}}}).then((function(t){var r,a=null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.updateCustomerGroup;if(!a.status)return w.b.error(a.message);w.b.success("".concat(e.customer_group_name," Group Status Updated successfully"))})).catch((function(e){return console.log("got error on updateStatus",e),w.b.error("Something Went wrong !!")}))}(t,e)}})}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(e,t){return d.a.createElement(d.a.Fragment,null,d.a.createElement(b.b,{to:"/admin/customers/add-group?id=".concat(t.id)},d.a.createElement(O.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];Object(m.useEffect)((function(){j.j.query({query:j.i.GET_ALL_CUSTOMER_GROUPS,context:{headers:{TENANTID:"100001",Authorization:G.a.get("psp_t")}}}).then((function(e){var t,r=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllCustomerGroups;(null===r||void 0===r?void 0:r.status)&&p((function(e){return Object(c.a)(Object(c.a)({},e),{},{data:null===r||void 0===r?void 0:r.data,error:""})}))})).catch((function(e){p((function(e){return Object(c.a)(Object(c.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){p((function(e){return Object(c.a)(Object(c.a)({},e),{},{isLoading:!1})}))}))}),[]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(_.a,{title:"Customers Group",buttons:[d.a.createElement("div",{key:"1",className:"page-header-actions"},d.a.createElement(b.b,{to:"/admin/customers/add-group"},d.a.createElement(v.a,{size:"small",title:"Add Customer Groups",type:"primary"},d.a.createElement(g.a,{icon:"user-plus"}))))]}),d.a.createElement(f.b,null,d.a.createElement(a.a,{gutter:25},d.a.createElement(o.a,{sm:24,xs:24},d.a.createElement(E.a,{headless:!0},r.isLoading?d.a.createElement("div",{className:"spin"},d.a.createElement(s.a,null)):d.a.createElement(d.a.Fragment,null,d.a.createElement(u.a,{placeholder:"Search Group...",prefix:d.a.createElement(S.a,null),onChange:function(e){var t=e.target.value;P(t),A(r.data.filter((function(e){return((null===e||void 0===e?void 0:e.customer_group_name)+(null===e||void 0===e?void 0:e.customergroup_description)+e.customergroup_sortorder).toLowerCase().includes(t.toLowerCase())})))}}),d.a.createElement("br",null),d.a.createElement("br",null),d.a.createElement("span",{className:"psp_list"},d.a.createElement(n.a,{className:"table-responsive",columns:I,rowKey:"g_s",size:"small",dataSource:k?x:r.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:C.a.CUSTOMER_GROUPS_PER_PAGE,total:k?x.length:r.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
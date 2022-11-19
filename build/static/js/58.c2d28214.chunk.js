(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[58],{961:function(e,t,a){"use strict";a.r(t);a(129);var n=a(68),r=(a(130),a(47)),o=(a(192),a(87)),s=(a(111),a(32)),i=(a(158),a(95)),l=a(12),u=(a(270),a(159)),c=a(24),d=a(0),p=a.n(d),m=a(21),f=a.n(m),E=a(157),g=a(132),_=a(131),v=a(128),b=a(11),h=a(121),y=a.n(h),C=a(185),O=a(133),N=a(61),j=a(60),I=a.n(j),U=a(42),x=a(35);t.default=function(){Object(x.b)("vendor");var e=Object(d.useState)({data:[],isLoading:!0}),t=Object(c.a)(e,2),a=t[0],m=t[1],h=Object(d.useState)([]),j=Object(c.a)(h,2),A=j[0],S=j[1],k=Object(d.useState)(""),w=Object(c.a)(k,2),F=w[0],T=w[1],P=[{title:"Company Name",dataIndex:"company_name",key:"company_name",ellipsis:!0,sorter:function(e,t){return e.company_name.toUpperCase()>t.company_name.toUpperCase()?1:-1}},{title:"Email",dataIndex:"email",key:"email",ellipsis:!0,sorter:function(e,t){return e.email.toUpperCase()>t.email.toUpperCase()?1:-1}},{title:"Phone",dataIndex:"phone_number",key:"phone_number",ellipsis:!0,sorter:function(e,t){return e.phone_number.toUpperCase()>t.phone_number.toUpperCase()?1:-1}},{title:"EIN",dataIndex:"EIN_no",key:"EIN_no",ellipsis:!0,sorter:function(e,t){return e.EIN_no.toUpperCase()>t.EIN_no.toUpperCase()?1:-1}},{title:"Fax",dataIndex:"FAX_no",key:"FAX_no",ellipsis:!0,sorter:function(e,t){return e.FAX_no.toUpperCase()>t.FAX_no.toUpperCase()?1:-1}},{title:"Description",dataIndex:"description",key:"description",ellipsis:!0,sorter:function(e,t){return e.description.toUpperCase()>t.description.toUpperCase()?1:-1}},{title:"Status",dataIndex:"status",key:"status",align:"center",width:100,sorter:function(e,t){return e.status===t.status?0:e.status?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.status===e},render:function(e,t){return p.a.createElement(u.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){var a={data:{customer_group_uuid:e.customer_group_uuid,customergroup_status:t}};console.log(a),N.j.mutate({mutation:N.h.UPDATE_CUSTOMER_GROUP,variables:a,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateCustomerGroup;if(!n.status)return U.b.error(n.message);U.b.success("".concat(e.customer_group_name," Group Status Updated successfully"))})).catch((function(e){return console.log("got error on updateStatus",e),U.b.error("Something Went wrong !!")}))}(t,e)}})}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(e,t){return p.a.createElement(p.a.Fragment,null,p.a.createElement(b.b,{to:"/admin/vendor/add?id=".concat(t.id)},p.a.createElement(y.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];Object(d.useEffect)((function(){N.j.query({query:N.p.GET_ALL_VENDOR,context:{headers:{TENANTID:"100001",Authorization:I.a.get("psp_t")}}}).then((function(e){var t,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.getAllVendor;(null===a||void 0===a?void 0:a.status)&&m((function(e){return Object(l.a)(Object(l.a)({},e),{},{data:null===a||void 0===a?void 0:a.data,error:""})}))})).catch((function(e){m((function(e){return Object(l.a)(Object(l.a)({},e),{},{error:"Something went Wrong.!! "})}))})).finally((function(){m((function(e){return Object(l.a)(Object(l.a)({},e),{},{isLoading:!1})}))}))}),[]);return p.a.createElement(p.a.Fragment,null,p.a.createElement(E.a,{title:"Vendors",buttons:[p.a.createElement("div",{key:"1",className:"page-header-actions"},p.a.createElement(b.b,{to:"/admin/vendor/add"},p.a.createElement(v.a,{size:"small",title:"Add Vendors",type:"primary"},p.a.createElement(f.a,{icon:"plus"}))))]}),p.a.createElement(g.b,null,p.a.createElement(n.a,{gutter:25},p.a.createElement(r.a,{sm:24,xs:24},p.a.createElement(_.a,{headless:!0},a.isLoading?p.a.createElement("div",{className:"spin"},p.a.createElement(i.a,null)):p.a.createElement(p.a.Fragment,null,p.a.createElement(s.a,{placeholder:"Search Vendor...",prefix:p.a.createElement(C.a,null),onChange:function(e){var t=e.target.value;T(t),S(a.data.filter((function(e){return((null===e||void 0===e?void 0:e.customer_group_name)+(null===e||void 0===e?void 0:e.customergroup_description)+e.customergroup_sortorder).toLowerCase().includes(t.toLowerCase())})))}}),p.a.createElement("br",null),p.a.createElement("br",null),p.a.createElement("span",{className:"psp_list"},p.a.createElement(o.a,{className:"table-responsive",columns:P,rowKey:"g_s",size:"small",dataSource:F?A:a.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:O.a.VENDOR_PER_PAGE,total:F?A.length:a.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);
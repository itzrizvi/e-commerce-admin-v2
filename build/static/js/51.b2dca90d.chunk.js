(this.webpackJsonpprimeServerParts=this.webpackJsonpprimeServerParts||[]).push([[51],{877:function(e,t,a){"use strict";a.r(t);a(129);var n=a(66),r=(a(130),a(41)),o=(a(279),a(131)),s=(a(142),a(67)),c=(a(196),a(119)),i=(a(11),a(254),a(146)),l=a(33),u=a(176),d=a(0),m=a.n(d),p=a(25),v=a.n(p),_=a(145),g=a(144),f=a(143),E=a(175),b=a(10),C=a(111),h=a.n(C),y=a(171),U=a(120),S=a(40),x=a(52),k=a.n(x),O=a(46);t.default=function(){var e=Object(u.a)(Array(10).keys()).map((function(e){return{v_n:"Vendor ".concat(e+1),v_e:"Vendor".concat(e+1,"@gmail.com"),v_a:"Address, aaaa".concat(e+1,",bbb").concat(e+1),v_c:"Test Vendor City".concat(e+1),v_c1:"Vendor Country".concat(e+1),v_c_n:"Vendor Company".concat(e+1),v_d:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex unde obcaecati sed alias repellendus adipisci ullam ea eveniet quaerat voluptate dolore veniam soluta aliquam labore ratione, quidem iusto, sit aspernatur!",v_s:!0}})),t=Object(d.useState)({data:e,isLoading:!1}),a=Object(l.a)(t,2),p=a[0],C=(a[1],Object(d.useState)([])),x=Object(l.a)(C,2),w=x[0],A=x[1],I=Object(d.useState)(""),j=Object(l.a)(I,2),N=j[0],P=j[1],T=[{title:"Name",dataIndex:"v_n",key:"v_n",sorter:function(e,t){return e.v_n.toUpperCase()>t.v_n.toUpperCase()?1:-1}},{title:"Email",dataIndex:"v_e",key:"v_e",ellipsis:!0,sorter:function(e,t){return e.v_e.toUpperCase()>t.v_e.toUpperCase()?1:-1}},{title:"Address",dataIndex:"v_a",key:"v_a",ellipsis:!0,sorter:function(e,t){return e.v_a.toUpperCase()>t.v_a.toUpperCase()?1:-1}},{title:"City",dataIndex:"v_c",key:"v_c",ellipsis:!0,sorter:function(e,t){return e.v_c.toUpperCase()>t.v_c.toUpperCase()?1:-1}},{title:"Country",dataIndex:"v_c1",key:"v_c1",ellipsis:!0,sorter:function(e,t){return e.v_c1.toUpperCase()>t.v_c1.toUpperCase()?1:-1}},{title:"company Name",dataIndex:"v_c_n",key:"v_c_n",ellipsis:!0,sorter:function(e,t){return e.v_c_n.toUpperCase()>t.v_c_n.toUpperCase()?1:-1}},{title:"Status",dataIndex:"v_s",key:"v_s",align:"center",width:100,sorter:function(e,t){return e.v_s===t.v_s?0:e.v_s?-1:1},filters:[{text:"Active",value:!0},{text:"Inactive",value:!1}],onFilter:function(e,t){return t.v_s===e},render:function(e,t){return m.a.createElement(i.a,{defaultChecked:e,title:"Status",onChange:function(e){return function(e,t){var a={data:{customer_group_uuid:e.customer_group_uuid,customergroup_status:t}};console.log(a),S.j.mutate({mutation:S.h.UPDATE_CUSTOMER_GROUP,variables:a,context:{headers:{TENANTID:"100001",Authorization:k.a.get("psp_t")}}}).then((function(t){var a,n=null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.updateCustomerGroup;if(!n.status)return O.b.error(n.message);O.b.success("".concat(e.customer_group_name," Group Status Updated successfully"))})).catch((function(e){return console.log("got error on updateStatus",e),O.b.error("Something Went wrong !!")}))}(t,e)}})}},{title:"Action",dataIndex:"action",width:70,align:"right",render:function(e,t){return m.a.createElement(m.a.Fragment,null,m.a.createElement(b.b,{to:"/admin/vendor/add?id=".concat(t.customer_group_uuid,"&name=").concat(t.v_n)},m.a.createElement(h.a,{name:"edit",style:{margin:".5em 1em"}})))},key:"last_name"}];Object(d.useEffect)((function(){}),[]);return m.a.createElement(m.a.Fragment,null,m.a.createElement(_.a,{title:"Vendors",buttons:[m.a.createElement("div",{key:"1",className:"page-header-actions"},m.a.createElement(b.b,{to:"/admin/vendor/add"},m.a.createElement(E.a,{size:"small",title:"Add Vendors",type:"primary"},m.a.createElement(v.a,{icon:"plus"}))))]}),m.a.createElement(g.b,null,m.a.createElement(n.a,{gutter:25},m.a.createElement(r.a,{sm:24,xs:24},m.a.createElement(f.a,{headless:!0},p.isLoading?m.a.createElement("div",{className:"spin"},m.a.createElement(c.a,null)):m.a.createElement(m.a.Fragment,null,m.a.createElement(s.a,{placeholder:"Search Vendor...",prefix:m.a.createElement(y.a,null),onChange:function(e){var t=e.target.value;P(t),A(p.data.filter((function(e){return((null===e||void 0===e?void 0:e.customer_group_name)+(null===e||void 0===e?void 0:e.customergroup_description)+e.customergroup_sortorder).toLowerCase().includes(t.toLowerCase())})))}}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("span",{className:"psp_list"},m.a.createElement(o.a,{className:"table-responsive",columns:T,rowKey:"g_s",size:"small",dataSource:N?w:p.data,rowClassName:function(e,t){return t%2==0?"":"altTableClass"},pagination:{defaultPageSize:U.a.CUSTOMER_GROUPS_PER_PAGE,total:N?w.length:p.data.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")}}}))))))))}}}]);